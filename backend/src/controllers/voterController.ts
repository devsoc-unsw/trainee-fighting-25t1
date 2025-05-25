import { Request, Response, NextFunction } from 'express';
import * as voterServices from '../services/voter.services'
import { Ballot } from '../../../shared/interfaces';

export const submitUserVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const electionId = String(req.params.electionId);
  const votes = new Map<number, Ballot>(
    Object.entries(req.body.vote).map(([key, value]) => [parseInt(key), value as Ballot])
  );

  try {
    await voterServices.submitVote(votes, electionId);
    res.status(200).json({ message: 'Vote successfully saved.' });
  } catch (e) {
    next(e);
  }
}