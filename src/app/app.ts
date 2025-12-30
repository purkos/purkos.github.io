import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, HomeComponent, AboutComponent, ProjectsComponent, ContactComponent, AnimatedBackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pl');
    translate.use('pl');
  }

  ngOnInit() {
    console.log('Available languages:', this.translate.getLangs());
    console.log('Current language:', this.translate.currentLang);
    console.log('Default language:', this.translate.defaultLang);
  }
}
