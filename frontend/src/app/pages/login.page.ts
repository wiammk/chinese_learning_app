import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TPipe } from '../pipes/t.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TPipe],
  template: `
    <div class="auth-wrap container">
      <div class="card auth-card">
        <h2>{{ 'login' | t }}</h2>
        <p class="text-muted mb-2">Demo: admin&#64;chinese.app / password123</p>
        <div *ngIf="error" class="alert alert-error">{{ error }}</div>
        <form (ngSubmit)="submit()">
          <label>{{ 'email' | t }}</label>
          <input type="email" name="email" [(ngModel)]="email" required class="mb-2" />
          <label>{{ 'password' | t }}</label>
          <input type="password" name="password" [(ngModel)]="password" required class="mb-2" />
          <button type="submit" [disabled]="loading" style="width: 100%; margin-top: 0.5rem;">
            {{ loading ? '...' : ('login' | t) }}
          </button>
        </form>
        <p class="text-center mt-2 text-muted">
          {{ 'noAccount' | t }} <a routerLink="/register">{{ 'register' | t }}</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrap { max-width: 460px; padding-top: 3rem; }
    .auth-card { padding: 2rem; }
    label { display: block; margin-bottom: 0.25rem; font-size: 0.85rem; font-weight: 500; }
    h2 { margin-top: 0; }
  `]
})
export class LoginPage {
  email = 'admin@chinese.app';
  password = 'password123';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.email || !this.password) { this.error = 'Required fields'; return; }
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/dashboard']); },
      error: (e) => { this.loading = false; this.error = e?.error?.message || 'Invalid credentials'; }
    });
  }
}
