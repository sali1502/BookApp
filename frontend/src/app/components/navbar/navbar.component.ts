import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser$;
  isDarkMode$;
  isMenuCollapsed = true;
  private readonly router: Router = inject(Router);

  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {
    this.currentUser$ = authService.currentUser$;
    this.isDarkMode$ = themeService.isDarkMode$;
  }

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
