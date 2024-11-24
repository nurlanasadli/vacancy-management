import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { TestQuestion } from '../../models/test-question.model';
import { CandidateService } from '../../services/candidate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-test-questions',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css'],
})


export class TestQuestionsComponent implements OnInit {
  questions: TestQuestion[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion!: TestQuestion;
  selectedOptionIndex: number | null = null;
  timeLeft: number = 60;
  timerSubscription!: Subscription;
  totalTimeLeft: number = 0;
  vacancyId!: number;

  constructor(
    private testService: TestService,
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;
    this.questions = this.testService.getTestQuestions(this.vacancyId);
    this.totalTimeLeft = this.questions.length * 60;
    this.startTest();
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  }

  beforeUnloadListener = (event: BeforeUnloadEvent): void => {
    event.preventDefault();
    event.returnValue = '';
  };

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeLeft--;
      this.totalTimeLeft--;
      if (this.timeLeft === 0) {
        this.submitAnswer();
      }
    });
  }
  
  

  startTest() {
    if (!this.candidateService.getCandidate()) {
      this.router.navigate(['/']);
      return;
    }
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.startTimer();
  }

  selectOption(index: number): void {
    this.selectedOptionIndex = index;
  }  

  submitAnswer(): void {
    if (this.selectedOptionIndex !== null) {
      const candidate = this.candidateService.getCandidate();
      if (candidate) {
        candidate.answers[this.currentQuestion.id] = this.selectedOptionIndex;
        this.candidateService.setCandidate(candidate, this.vacancyId);
      }
    }
  
    this.selectedOptionIndex = null;
    this.timeLeft = 60;
    this.currentQuestionIndex++;
  
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.timerSubscription.unsubscribe();
      this.candidateService.evaluateAnswers(
        this.candidateService.getCandidate()!.answers
      );
      this.router.navigate(['/cv-upload', this.vacancyId]);
    }
  }
}
