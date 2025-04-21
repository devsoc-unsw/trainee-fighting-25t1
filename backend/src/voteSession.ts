import { getData, setData } from './dataStore';
import { dataStore, question, voteSession } from './interface';
// this function should create the voting session and add it to the dataStore
export const hostCreateVoteSession = (  
  HostToken: string, // probs dont need this then
  // id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
) => {

  // add some basic checks to validate inputs
  const data = getData();

  // validate user token method

  if (!data) {
    throw new Error('Failed to load data store');
  }
  
  if (title.length <= 0) {
    throw new Error('Title cannot be empty');
  }

  const questions: question[] = [];
  const newVoteSession: voteSession = {
    hostToken: HostToken,
    id: 32, // can be auto generated
    title,
    description,
    startDate,
    endDate,
    status: "Open",
    questions,
  };

  data.voteSessions.push(newVoteSession);
  setData(data);
  return { newVoteSession: newVoteSession.id };
  // idk if i should return the ID of the new voting session
}