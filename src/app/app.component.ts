import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  activeVacancies: boolean = false;
  showHeader: boolean = true; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeVacancies = this.isVacanciesRoute();
        this.showHeader = !this.isConfirmationRoute(); 
      });
  }

  isVacanciesRoute(): boolean {
    const currentRoute = this.router.url;
    return (
      currentRoute.startsWith('/vacancies') ||
      currentRoute.startsWith('/apply') ||
      currentRoute.startsWith('/test') ||
      currentRoute.startsWith('/cv-upload') ||
      currentRoute.startsWith('/confirmation')
    );
  }

  isConfirmationRoute(): boolean {
    return this.router.url.startsWith('/confirmation');
  }

  menuOpen: boolean = false;

toggleMenu(): void {
  this.menuOpen = !this.menuOpen;
}

}