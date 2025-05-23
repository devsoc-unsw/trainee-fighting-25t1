import { getData } from "../data/dataStore";
import { User, Election, Candidate, Position } from "../../../shared/interfaces";
import { StatusCodes } from 'http-status-codes';

// util file for helper functions
export function validateUserId(authuserId: string) {
  // console.log("the auth userid we are trying to find is... " + authuserId);
  const db = getData();
  const user = db.users.find(u => u.userId === authuserId);

  if (!user) {
    return { error: 'User not registered', status: StatusCodes.NOT_FOUND };
  }

  return { user };
}

export function validateElectionId(
  ElectionId: string,
  authuserId: string
) {
  const db = getData();
  const election = db.elections.find(e => e.id === ElectionId);

  if (!election) {
    return { error: 'Election not found', status: StatusCodes.NOT_FOUND };
  }

  if (election.OwnerId !== authuserId) {
    return { error: 'You do not own this election', status: StatusCodes.FORBIDDEN };
  }

  return { election };
}


export function validatePositionId(
  election: Election,
  positionId: string
): { position: Position } | { error: string; status: number } {
  const position = election.questions.find(q => q.id === positionId);

  if (!position) {
    return { error: 'Position not found in election', status: StatusCodes.NOT_FOUND };
  }

  return { position };
}