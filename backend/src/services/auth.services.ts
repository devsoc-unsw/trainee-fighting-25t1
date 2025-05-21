import {
  getData,
  setData,
  getSessions,
  setSessions,
  getHashOf,
  createAndStoreSession,
} from '../data/dataStore';
import { StatusCodes } from 'http-status-codes';
import { decryptData } from '../../../shared/src/encryptionBackend';
import { Question, Election, Session, User, ElectionSession } from '../../../shared/interfaces';
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
    console.log("what the freak!!!");
    console.log(db);
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


/**
 * User creates a vote session.
 * @param userSessionId 
 * @param title 
 * @param description
 * @param images
 * @param startDate
 * @param endDate
 * @param zid_requirement
 * @param locationOfVote
 * @returns
 */


interface authcreateElectionProps {
  userSessionId: string,
  title: string,
  description: string,
  images: string[],
  startDate: Date,
  endDate: Date,
  zid_requirement: boolean,
  locationOfVote?: string,
}

export const authCreateElection = (props: authcreateElectionProps) : number => {
  const db = getData();
  const sessions = getSessions();

  console.log("creating session");

  if (!db) {
    throw new Error('Failed to load data store');
  }

  console.log("received database: " + JSON.stringify(db));

  // find userId:
  const session = sessions.find((session) => session.sessionId === props.userSessionId);
  
  console.log("current sessions:")
  console.log(sessions)
  console.log("Found sessions:")
  console.log(session)
  console.log("User sessions:")
  console.log(props.userSessionId)
  

  if (!session) throw new Error('Invalid session ID');

  const userId = session.userId; // changed this from zId to id bc we store hashed zids not the raw zid. 


  if (props.title.length <= 0) {
    throw new Error('Title cannot be empty');
  }

  const questions: Question[] = [];

  const newElection: Election = {
    id: db.elections.length + 1, // temporary
    authUserId: userId, // changed authUserZid to authUserId bc again we store hashed zids not raw zids
    name: props.title,
    description: props.description,
    images: props.images,
    location: props.locationOfVote,
    requires_zid: props.zid_requirement,
    questions,
    startTime: props.startDate,
    endTime: props.endDate,
  };

  db.elections.push(newElection);
  setData(db);

  return newElection.id;
}