import { Injectable } from '@angular/core';
import { TestQuestion } from '../models/test-question.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private questions: { [key: number]: TestQuestion[] } = {
    1: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Frontend Question ${i + 1}`,
      options: ['HTML', 'CSS', 'JavaScript'],
      correctOptionIndex: 2,
    })),
    2: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Backend Question ${i + 1}`,
      options: ['Node.js', 'Python', 'Java'],
      correctOptionIndex: 1,
    })),
    3: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Data Analyst Question ${i + 1}`,
      options: ['Excel', 'Power BI', 'SQL'],
      correctOptionIndex: 2,
    })),
    4: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Project Manager Question ${i + 1}`,
      options: ['Agile', 'Scrum', 'Kanban'],
      correctOptionIndex: 0,
    })),
    5: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `DevOps Engineer Question ${i + 1}`,
      options: ['CI/CD', 'Docker', 'Kubernetes'],
      correctOptionIndex: 1,
    })),
    6: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Mobile Developer Question ${i + 1}`,
      options: ['Flutter', 'Swift', 'React Native'],
      correctOptionIndex: 2,
    })),
    7: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `UI/UX Designer Question ${i + 1}`,
      options: ['Figma', 'Sketch', 'Adobe XD'],
      correctOptionIndex: 0,
    })),
    8: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `QA Engineer Question ${i + 1}`,
      options: ['Selenium', 'Cypress', 'JIRA'],
      correctOptionIndex: 1,
    })),
    9: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Cybersecurity Specialist Question ${i + 1}`,
      options: ['Firewall', 'Penetration Testing', 'Encryption'],
      correctOptionIndex: 2,
    })),
    10: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      question: `Business Analyst Question ${i + 1}`,
      options: ['Use Cases', 'Diagrams', 'Reports'],
      correctOptionIndex: 0,
    })),
  };

  getTestQuestions(vacancyId: number): TestQuestion[] {
    const allQuestions = this.questions[vacancyId] || [];
    return this.shuffleArray(allQuestions).slice(0, 5); 
  }

  private shuffleArray(array: TestQuestion[]): TestQuestion[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
