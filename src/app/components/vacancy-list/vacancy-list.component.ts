import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VacancyService } from '../../services/vacancy.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Vacancy } from '../../models/vacancy.model';

@Component({
  selector: 'app-vacancy-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NzListModule, NzButtonModule],
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css'],
})
export class VacancyListComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(private vacancyService: VacancyService, private router: Router) {}

  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe({
      next: (data) => {
        this.vacancies = data;
      },
      error: (err) => {
        console.error('Error fetching vacancies:', err);
      },
    });
  }

  apply(vacancyId: number) {
    this.router.navigate(['/apply', vacancyId]);
    
  }  
}
