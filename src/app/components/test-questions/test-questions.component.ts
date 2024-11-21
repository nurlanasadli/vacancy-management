import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TestService } from '../../services/test.service';
import { TestQuestion } from '../../models/test-question.model';
import { CandidateService } from '../../services/candidate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, NzButtonModule], // Add CommonModule
})
export class TestQuestionsComponent implements OnInit {
  questions: TestQuestion[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion!: TestQuestion;
  selectedOptionIndex: number | null = null;
  timeLeft: number = 60;
  timerSubscription!: Subscription;
  totalTimeLeft: number;
  vacancyId!: number;

  constructor(
    private testService: TestService,
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.questions = this.testService.getTestQuestions();
    this.totalTimeLeft = this.questions.length * 60;
  }

  ngOnInit(): void {
    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;
    this.startTest();
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  }

  startTest() {
    if (!this.candidateService.getCandidate()) {
      this.router.navigate(['/']);
      return;
    }
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.startTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeLeft--;
      this.totalTimeLeft--;
      if (this.timeLeft === 0 || this.totalTimeLeft === 0) {
        this.submitAnswer();
      }
    });
  }

  submitAnswer() {
    if (this.selectedOptionIndex !== null) {
      const candidate = this.candidateService.getCandidate();
      if (candidate) {
        candidate.answers[this.currentQuestion.id] = this.selectedOptionIndex;
        this.candidateService.setCandidate(candidate);
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

  selectOption(index: number) {
    this.selectedOptionIndex = index;
  }

  beforeUnloadListener = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    window.removeEventListener('beforeunload', this.beforeUnloadListener);
  }
}
