import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { addPosition, createCandidate, editCandidate, deleteCandidate, viewCandidates, createElection} from '../controllers/voteCreateController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/logout', logout);
router.post('/createElection', createElection);

// Routes for positions
router.post('/addPosition', addPosition);

// Routes for candidates
router.post('/createCandidate', createCandidate);
router.post('/editCandidate', editCandidate);
router.get('/votes/:voteId/positions/:positionId/candidates', viewCandidates);
router.delete('/votes/:voteId/positions/:positionId/candidates/:candidateIndex', deleteCandidate);


export default router;
