import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegisterMode = false;
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  returnUrl = '/';
  private readonly router = inject(Router);

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Fyll i både användarnamn och lösenord.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isRegisterMode) {
      this.authService.register({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registreringen misslyckades.';
        }
      });
    } else {
      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Inloggningen misslyckades. Kontrollera dina uppgifter.';
        }
      });
    }
  }
}
