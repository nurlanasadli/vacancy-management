import { Injectable } from '@angular/core';
import { Vacancy } from '../models/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private vacancies: Vacancy[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'We are looking for a skilled Angular developer.',
    },
    // Add more vacancies as needed
  ];

  constructor() {}

  getVacancies(): Vacancy[] {
    return this.vacancies;
  }

  getVacancyById(id: number): Vacancy | undefined {
    return this.vacancies.find((vacancy) => vacancy.id === id);
  }
}
