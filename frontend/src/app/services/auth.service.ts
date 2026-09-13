import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'bookapp_jwt_token';
  private usernameKey = 'bookapp_username';

  private currentUserSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (response && response.token) {
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem(this.usernameKey, response.username);
      this.currentUserSubject.next(response.username);
    }
  }

  private getStoredUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
}
