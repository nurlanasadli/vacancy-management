import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { Router } from '@angular/router';
import { VacancyService } from '../../services/vacancy.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Vacancy } from '../../models/vacancy.model';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css'],
  standalone: true,
  imports: [CommonModule, NzListModule, NzButtonModule], // Add CommonModule here
})
export class VacancyListComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(private vacancyService: VacancyService, private router: Router) {}

  ngOnInit(): void {
    this.vacancies = this.vacancyService.getVacancies();
  }

  apply(vacancyId: number) {
    this.router.navigate(['/apply', vacancyId]);
  }
}
