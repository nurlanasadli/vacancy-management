import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzButtonModule],
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  vacancyId!: number;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.applicationForm.valid) {
      this.candidateService.setCandidate({
        ...this.applicationForm.value,
        answers: {},
      });
      this.router.navigate(['/test', this.vacancyId]);
    } else {
      Object.values(this.applicationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
