import { getData, setData } from './voteSessionData';
import { dataStore, question, voteSession } from './interface';
// this function should create the voting session and add it to the dataStore
export const hostCreateVoteSession = (  
  hostZid: number,
  id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  status: string,
) => {

  // add some basic checks to validate inputs
  const data = getData();

  if (!data) {
    throw new Error('Failed to load data store');
  }  

  const questions: question[] = [];
  const newVoteSession: voteSession = {
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    questions,
    hostZid,
  };

  data?.voteSessions.push(newVoteSession);
  setData(data);
  // idk if i should return the ID of the new voting session
}