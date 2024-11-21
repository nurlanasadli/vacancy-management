export interface Candidate {
    name: string;
    email: string;
    phone: string;
    answers: { [questionId: number]: number };
  }
  