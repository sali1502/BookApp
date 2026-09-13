import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'bookapp_theme';
  private isDarkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.isDarkModeSubject.value);
  }

  toggleTheme(): void {
    const newMode = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newMode);
    localStorage.setItem(this.themeKey, newMode ? 'dark' : 'light');
    this.applyTheme(newMode);
  }

  private applyTheme(isDark: boolean): void {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem(this.themeKey);
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
