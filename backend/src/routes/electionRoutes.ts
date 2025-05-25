import { Router } from 'express';
import { activateElection, getResults, deactivateElection } from '../../src/controllers/voteCreateController';
const router = Router();

router.post('/activateSession/:electionId', activateElection);
router.post('/deactivateElection/:electionId', deactivateElection);

router.get('/results/:electionId', getResults);


export default router;
