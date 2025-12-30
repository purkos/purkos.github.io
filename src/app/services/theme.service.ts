import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = signal<boolean>(true);

  constructor() {
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark.set(savedTheme === 'dark');
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark.update(value => !value);
    this.applyTheme();
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
  }

  private applyTheme() {
    if (this.isDark()) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }
}
