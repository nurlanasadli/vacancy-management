import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyListComponent } from './components/vacancy-list/vacancy-list.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { TestQuestionsComponent } from './components/test-questions/test-questions.component';
import { CvUploadComponent } from './components/cv-upload/cv-upload.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: VacancyListComponent },
  { path: 'apply/:id', component: ApplicationFormComponent },
  { path: 'test/:id', component: TestQuestionsComponent },
  { path: 'cv-upload/:id', component: CvUploadComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
