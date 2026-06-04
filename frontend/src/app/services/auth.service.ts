import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from './api';
import type { User, Lang, Level } from '../models';

interface AuthResponse { token: string; user: User; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  readonly user = this._user.asReadonly();
  readonly isLogged = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, { email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  register(name: string, email: string, password: string, language: Lang): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/register`, { name, email, password, language })
      .pipe(tap((res) => this.persist(res)));
  }

  updateProfile(patch: { name?: string; language?: Lang; level?: Level }): Observable<{ user: User }> {
    return this.http.put<{ user: User }>(`${API_URL}/auth/me`, patch)
      .pipe(tap((res) => { this._user.set(res.user); localStorage.setItem('user', JSON.stringify(res.user)); }));
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private persist(res: AuthResponse): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this._user.set(res.user);
  }
}
