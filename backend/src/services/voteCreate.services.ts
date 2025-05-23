import { v4 as uuidv4 } from 'uuid';
import {
  getData,
  setData,
  getSessions,
} from '../data/dataStore';
import { Position, Election, Session, User, Candidate, VoteAnswer, QuestionType } from '../../../shared/interfaces';

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
 * @returns new election ID
 */

interface CreateElectionProps {
  userSessionId: string;
  title: string;
  description: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  zid_requirement: boolean;
  locationOfVote?: string;
}

export const CreateElection = (
  props: CreateElectionProps
): string => {
  const db = getData();
  const sessions = getSessions();

  console.log('creating session');

  if (!db) {
    throw new Error('Failed to load data store');
  }

  // Find userId from session
  const session = sessions.find(
    (session) => session.sessionId === props.userSessionId
  );

  console.log('current sessions:');
  console.log(sessions);
  console.log('Found session:');
  console.log(session);
  console.log('User session ID:');
  console.log(props.userSessionId);

  if (!session) throw new Error('Invalid session ID');

  const userId = session.userId; // we store hashed zids, not raw zids

  if (props.title.trim().length === 0) {
    throw new Error('Title cannot be empty');
  }

  const questions: Position[] = [];

  const newElection: Election = {
    id: uuidv4(), // subject to change
      OwnerId: userId,
    name: props.title,
    description: props.description,
    images: props.images,
    location: props.locationOfVote,
    date_time_start: props.startDate,
    date_time_end: props.endDate,
    requires_zid: props.zid_requirement,
    questions,
  };

  db.elections.push(newElection);
  setData(db);

  return newElection.id;
};

/**
 * User creates a vote session.
 * @param electionId 
 * @param roleTitle 
 * @returns new election ID
 */
interface addPositionProps {
  userSessionId: string,
  electionId: string,
  roleTitle: string
}

export const addPostion = (props: addPositionProps): void => {
  const db = getData();
  const sessions = getSessions();
  const session = sessions.find(
    (session) => session.sessionId === props.userSessionId
  );
  console.log('creating session');

  const election = db.elections.find(e => props.electionId == e.id);

  // check 1. if election exist
  if (election == undefined) {
    throw new Error('Election does not exist');
  }

  // check 2. if user exist
  if (!session) throw new Error('Invalid session ID');


  // check 3. if user is owner of election
  if (election.OwnerId !== session.userId) {
    throw new Error('User does not have access');
  }

  const candidates: Candidate[] = [];
  const voteAnswers: VoteAnswer[] = [];

  const newPostion: Position = {
    id: uuidv4(),
    title: props.roleTitle,
    candidates: candidates,
    vote_answers: voteAnswers,
    questionType:  QuestionType.SelectOne,
  }

  election.questions.push(newPostion);
}


// functionality for creating voting sessions is already done
// gonna add the functionality for:
// - viewing voting sessions, corresponding to the "Create Vote - View Voting Sessions"  page
// - viewing positions in a vote, corresponding to the "Create Vote - Add Positions"  page
// - adding a position to a vote, corresponding to the "Create Vote - Add Position"  page