import { Injectable } from '@angular/core';
import { TestQuestion } from '../models/test-question.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private testQuestions: TestQuestion[] = [
    {
      id: 1,
      question: 'What is Angular?',
      options: ['A frontend framework', 'A backend framework', 'A database'],
      correctOptionIndex: 0,
    },
    // Add more questions as needed
  ];

  constructor() {}

  getTestQuestions(): TestQuestion[] {
    return this.testQuestions;
  }
}
