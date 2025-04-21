import app from './app';
import config from './config/config';
import { hostCreateVoteSession } from './voteSession';
import { Request, Response } from 'express';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

const handleHostCreateVoteSession = (req: Request, res: Response) => {
  const {title, description, startDate, endDate} = req.body;
  const token = req.headers.token as string;

  try {
    const result = hostCreateVoteSession(
      token,
      title,
      description,
      startDate,
      endDate);
      return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: "Cannot create voting session" });

  }
}

app.post('/vote/session/create', handleHostCreateVoteSession);

