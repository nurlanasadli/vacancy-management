import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vacancy } from '../models/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  constructor(private http: HttpClient) {}

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>('/assets/mock-vacancies.json').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching vacancies:', error);
        return of([]); 
      })
    );
  }

  getVacancyById(id: number): Observable<Vacancy | undefined> {
    return this.http.get<Vacancy[]>('/assets/mock-vacancies.json').pipe(
      map((vacancies: Vacancy[]) =>
        vacancies.find((vacancy) => vacancy.id === id)
      )
    );
  }
}