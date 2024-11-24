import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate.model';
import { TestService } from './test.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidate: Candidate | null = null;
  private score: number = 0;
  private percentage: number = 0; 
  private vacancyId: number = 0; 

  constructor(private testService: TestService) {}

  setCandidate(candidate: Candidate, vacancyId: number) { 
    this.candidate = candidate;
    this.vacancyId = vacancyId;
  }

  getCandidate(): Candidate | null {
    return this.candidate;
  }

  evaluateAnswers(answers: { [questionId: number]: number }) {
    const correctAnswers = this.testService.getTestQuestions(this.vacancyId); 
    let score = 0;

    correctAnswers.forEach((question) => {
      if (answers[question.id] === question.correctOptionIndex) {
        score++;
      }
    });

    this.score = score;
    this.percentage = (score / correctAnswers.length) * 100;
  }

  getTestResults() {
    return {
      score: this.score,
      percentage: this.percentage,
    };
  }

  getScore(): number {
    return this.score;
  }

  getPercentage(): number {
    return this.percentage;
  }
}
