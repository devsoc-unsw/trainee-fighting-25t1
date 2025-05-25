import { error } from "node:console";
import { electionDatabase, getElectionData, saveElectionDatabaseToFile } from "../data/dataStore";
import { Ballot } from "../../../shared/interfaces";
/**
 * Authenticate a voter - alr created
 */

/**
 * Start voter's session --> user session id?
 */

/**
 * Record vote for a specific position. Should accept an ordered list of candidates
 * or an abstention.
 * 
 * take userSessionId, hashmap:
 * 
 * sanity check:
 *  if election is an active session 
 *  if userSessionId's userId exist in election.voters[]
 *  check that user hasn't already voted
 * 
 * when user submit vote
 * pushes their ballot into question.ballot array
 * 
 */

// input is a hashmap
export const submitVote = async (votes: Map<number, Ballot>, electionId: string): Promise<void> => {
  // check if sesId is invalid -> throw error 

  await getElectionData(
    electionDatabase => {
      // e.g. {0: {preferences: [1, 2, 3, 4]}, 1: {preferences: [1, 2, 3, 4]}}
      const election = electionDatabase.get(electionId);
      if (!election) {
        throw new Error('election is invalid');      
      }
      
      // loop thru votes and add user's ballot to question object
      for (const [key, values] of votes) {
        election.questions[key].ballot.push(values);
      }
    }
  );

  await saveElectionDatabaseToFile();
}

/**
 * Other functions such as:
 * Moving to another position or getting the current position a voter is at
 * probably isn't required because the frontend handles moving between voting positions.
 * As a result, we just need to record the candidates a voter has voted for, for each position.
 */