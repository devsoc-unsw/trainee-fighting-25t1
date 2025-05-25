import { Router } from 'express';
import { submitUserVote } from 'src/controllers/voterController';
const router = Router();

router.post('/submitVote/:electionId', submitUserVote);


export default router;
