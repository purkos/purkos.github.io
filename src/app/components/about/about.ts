import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
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
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-50px)', opacity: 0 }),
        animate('500ms 200ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(50px)', opacity: 0 }),
        animate('500ms 200ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
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
export class AboutComponent {
  stats = [
    { value: '5+', label: 'Lat doświadczenia' },
    { value: '50+', label: 'Zrealizowanych projektów' },
    { value: '30+', label: 'Zadowolonych klientów' },
    { value: '100%', label: 'Zaangażowania' }
  ];

  experience = [
    {
      position: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2022 - obecnie',
      description: 'Rozwój zaawansowanych aplikacji webowych w Angular. Mentoring juniorów, code review, optymalizacja wydajności.'
    },
    {
      position: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Tworzenie kompletnych rozwiązań webowych. Praca z Angular, Node.js, MongoDB.'
    },
    {
      position: 'Frontend Developer',
      company: 'Startup Tech',
      period: '2019 - 2020',
      description: 'Rozwój interfejsów użytkownika. Implementacja responsywnych layoutów i animacji.'
    }
  ];

  education = [
    {
      degree: 'Informatyka - tytuł magistra',
      school: 'Politechnika',
      period: '2017 - 2019',
      description: 'Specjalizacja: Inżynieria oprogramowania'
    },
    {
      degree: 'Informatyka - tytuł inżyniera',
      school: 'Politechnika',
      period: '2014 - 2017',
      description: 'Podstawy programowania i technologii webowych'
    }
  ];
}
