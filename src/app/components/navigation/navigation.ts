import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [TranslateModule, CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class NavigationComponent implements OnInit {
  activeSection = 'home';
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(
    public translate: TranslateService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.updateActiveSection();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.translate.use(lang);
    console.log('Current language after switch:', this.translate.currentLang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  private updateActiveSection() {
    const sections = ['home', 'about', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 150;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }
}
