import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate.model';
import { TestService } from './test.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidate: Candidate | null = null;
  private score: number = 0;

  constructor(private testService: TestService) {}

  setCandidate(candidate: Candidate) {
    this.candidate = candidate;
  }

  getCandidate(): Candidate | null {
    return this.candidate;
  }

  evaluateAnswers(answers: { [questionId: number]: number }) {
    const questions = this.testService.getTestQuestions();
    let score = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctOptionIndex) {
        score += 1;
      }
    });

    this.score = score;
  }

  getScore(): number {
    return this.score;
  }

  getPercentage(): number {
    const totalQuestions = this.testService.getTestQuestions().length;
    return (this.score / totalQuestions) * 100;
  }
}
