import { Router } from 'express';
import { activateElection, deactivateElection } from '../../src/controllers/voteCreateController';
const router = Router();

router.post('/activateSession/:electionId', activateElection);
router.post('/deactivateElection/:electionId', deactivateElection);

export default router;