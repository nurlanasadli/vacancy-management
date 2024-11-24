import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HomeOutline, FileDoneOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzLayoutModule, NzMenuModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})



export class HomeComponent {
  @ViewChild('findJobSection') findJobSection!: ElementRef;
  @ViewChild('jobOpportunitiesContainer') jobOpportunitiesContainer!: ElementRef;
  @ViewChild('careerPathsContainer') careerPathsContainer!: ElementRef;

  selectedSection: string = 'Family Member Employment';
  selectedCareerPath: string = 'Internships and Fellowships';
  title = 'vacancy-management';
  isCollapsed = false;

  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(...[HomeOutline, FileDoneOutline]);
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  selectCareerPath(path: string): void {
    this.selectedCareerPath = path;
  }

  scrollToSection(section: string): void {
    switch (section) {
      case 'findJobSection':
        this.findJobSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jobOpportunitiesContainer':
        this.jobOpportunitiesContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'careerPathsContainer':
        this.careerPathsContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
}
