import {
  getData,
  setData,
  getSessions,
  setSessions,
  createAndStoreSession,
} from '../data/dataStore';
import { getHashOf, generateUserId } from '../data/dataUtil';
import { StatusCodes } from 'http-status-codes';
import { decryptData } from '../../../shared/src/encryptionBackend';
import { Position, Election, Session, User } from '../../../shared/interfaces';
////////////// Util function(s) //////////////
/**
 * Uses the CSESoc zId + zPass verification API endpoint, returns the user's name on success 
 * @param zId 
 * @param zPass 
 * @returns 
 */
async function verifyZidCredentials(zId: string, zPass: string): Promise<{ displayName?: string; error?: string; status?: number }> {
  const payload = { zid: zId, zpass: zPass };

  const response = await fetch('https://verify.csesoc.unsw.edu.au/v1', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (response.status === StatusCodes.UNAUTHORIZED) {
    return { error: 'Incorrect password', status: StatusCodes.UNAUTHORIZED };
  }

  if (!response.ok) {
    return {
      error: `Verification failed with status ${response.status}`,
      status: StatusCodes.BAD_GATEWAY,
    };
  }

  const data = await response.json();
  if (!data.displayName) {
    return { error: 'Malformed verification response', status: StatusCodes.INTERNAL_SERVER_ERROR };
  }

  return { displayName: data.displayName };
}

////////////// Main logic functions //////////////

// Notice that we decrypt the inputted zId and zPass, since they are encrypted from the frontend

/**
 * Registers a user and logs then in, returns the assigned sessionId
 * @param zId 
 * @param zPass 
 * @returns 
 */
export async function authRegister(zId: string, zPass: string): Promise<{ sessionId?: string; error?: string; status?: number }> {
  // decrypt first
  const decryptedZID = decryptData(zId);
  const decryptedZPass = decryptData(zPass);

  const result = await verifyZidCredentials(decryptedZID, decryptedZPass);
  if (result.error) return result;

  const userId = getHashOf(decryptedZID);
  const db = getData();

  if (db.users.find((u) => u.userId === userId)) {
    return { error: 'User already registered', status: StatusCodes.CONFLICT };
  }

  const hashedName = getHashOf(result.displayName!);
  db.users.push({ userId: userId, name: hashedName });
  setData(db);
  
  const sessionId = createAndStoreSession(userId);

  return { sessionId };
}


/**
 * Logs in an existing user and returns a session ID.
 * @param zId 
 * @param zPass 
 * @returns 
 */
export async function authLogin(zId: string, zPass: string): Promise<{ sessionId?: string; error?: string; status?: number }> {
  // decrypt first
  const decryptedZID = decryptData(zId);
  const decryptedZPass = decryptData(zPass);

  const result = await verifyZidCredentials(decryptedZID, decryptedZPass);
  if (result.error) return result;

  const userId = getHashOf(decryptedZID);
  const db = getData();
  const user = db.users.find((u) => u.userId === userId);

  if (!user) {
    return { error: 'User not registered', status: StatusCodes.NOT_FOUND };
  }

  const sessionId = createAndStoreSession(userId);

  return { sessionId };
}

/**
 * @param sessionId
 * Logs out the user by removing their session.
 */
export function authLogout(sessionId: string): { error?: string; status?: number } | void {
  const sessions = getSessions();
  const sessionExists = sessions.some(s => s.sessionId === sessionId);

  if (!sessionExists) {
    return {
      error: 'Invalid session token',
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  const updatedSessions = sessions.filter(s => s.sessionId !== sessionId);
  setSessions(updatedSessions);
}