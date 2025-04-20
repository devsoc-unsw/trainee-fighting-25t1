export interface dataStore {
  voteSessions: voteSession[];
  voters: voter[]; // idk if we should kee this
  hosts: host[]; // idk about this either
}

export interface voteSession {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  questions: question[];
  hostZid: number;
}

export interface question {
  id: number;
  title: string;
  description: string;
  type: string;
  options: candidate[];
}

export interface candidate {
  zId: number; // can be either zid or our own generated id
  name: string;
  description: string;
  image: string;
  votes: number;
}

// idk if we should store the voter's choices in the database
export interface voter {
  zId: number;
  name: string;
  email: string;
  password: string;
}

// idk about this one tho
export interface vote {
  voterId: number;
  questionId: number;
  candidateId: number;
}

export interface host {
  zId: number;
  name: string;
  email: string;
  password: string;
}