import { error } from "node:console";
import { electionDatabase, getElectionData, saveElectionDatabaseToFile } from "../data/dataStore";
import { validatePositionId, validateSessionId } from "./servicesUtil";
import { Election, Question } from "../../../shared/interfaces";



export const viewPositions = async (
  userSessionId: string, sessionCode: string
): Promise<{ positions: Question[] }> => {
        const sessionValidation = await validateSessionId(userSessionId);
      //          console.log("HEllow owrld ")
        console.log(userSessionId)
        console.log(sessionCode)

        if ('error' in sessionValidation) {
        throw new Error(sessionValidation.error);
        }
         let foundElection: Election | undefined;

  await getElectionData((map) => {
    for (const election of map.values()) {
      if (election.sessionCode === sessionCode) {
        foundElection = election;
        break;
      }
    }
  });

  if (foundElection) {
    return { positions: foundElection.questions };
  }

  throw new Error("Could not find election");
};
/**
 * Voting
 */
export interface voteProps {
  userSessionId: string;
  sessionCode: string;
  positionId: number;
  preferences: number[]
}

export const vote = async (
  props: voteProps
): Promise<{ error?: string; status?: number } | 0> => {
        // Validate session/user
        const sessionCheck = await validateSessionId(props.userSessionId);
        if ('error' in sessionCheck) return sessionCheck;
        const userId = sessionCheck.userId;

        //Finds elections
        let foundElection: Election | undefined;
        await getElectionData((map) => {
        for (const election of map.values()) {
        if (election.sessionCode === props.sessionCode) {
                foundElection = election;
                break;
        }
        }
        });

        if (!foundElection) {
                throw new Error("Could not find election");
        }
        console.log("HEllow owrld in vote ")
        console.log(props.preferences)

        //Checks the question exists
     //   const positionCheck = validatePositionId(foundElection, props.positionId);
      //  if ('error' in positionCheck) return positionCheck;



          await getElectionData(map => {
                const storedElection = map.get(String(foundElection?.id));
                 if (!storedElection) throw new Error('Election unexpectedly missing');
                if (storedElection.questions.length <= props.positionId) {
                        throw new Error('Position unexpectedly missing');
                } else {
                        const storedPosition = storedElection.questions[props.positionId];
                        const existingBallotIndex = storedPosition.ballot.findIndex(b => b.userid === userId);
        if (existingBallotIndex !== -1) {
                storedPosition.ballot[existingBallotIndex] = {
                userid: userId,
                preferences: props.preferences,
                };
                console.log('Updated existing ballot.');
        } else {
                storedPosition.ballot.push({
                userid: userId,
                preferences: props.preferences,
                });
                console.log('Added new ballot.');
        }
                }
      
        });

  await saveElectionDatabaseToFile();
  return 0;
};

