import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ProjectsComponent {
  selectedFilter = 'all';

  filters = [
    { key: 'all', label: 'projects.filters.all' },
    { key: 'configurators', label: 'projects.filters.configurators' },
    { key: 'crm', label: 'projects.filters.crm' },
    { key: 'web', label: 'projects.filters.web' }
  ];

  projects = [
    {
      id: 'garage',
      technologies: ['Three.js', 'React', 'Node.js', 'MongoDB'],
      category: 'configurators',
      image: 'assets/images/garage.png'
    },
    {
      id: 'pergola',
      technologies: ['Three.js', 'Angular', 'Express', 'PostgreSQL', 'CRM'],
      category: 'configurators',
      image: 'assets/images/pakuma.png'
    }
  ];

  selectFilter(filter: string) {
    this.selectedFilter = filter;
  }

  filteredProjects() {
    if (this.selectedFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedFilter);
  }
}
