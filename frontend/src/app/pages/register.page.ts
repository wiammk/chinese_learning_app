import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { I18nService } from '../services/i18n.service';
import { TPipe } from '../pipes/t.pipe';
import type { Lang } from '../models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TPipe],
  template: `
    <div class="auth-wrap container">
      <div class="card auth-card">
        <h2>{{ 'register' | t }}</h2>
        <div *ngIf="error" class="alert alert-error">{{ error }}</div>
        <form (ngSubmit)="submit()">
          <label>{{ 'name' | t }}</label>
          <input name="name" [(ngModel)]="name" required class="mb-2" />
          <label>{{ 'email' | t }}</label>
          <input type="email" name="email" [(ngModel)]="email" required class="mb-2" />
          <label>{{ 'password' | t }}</label>
          <input type="password" name="password" [(ngModel)]="password" required class="mb-2" />
          <label>{{ 'language' | t }}</label>
          <select name="lang" [(ngModel)]="language" class="mb-2">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
          <button type="submit" [disabled]="loading" style="width: 100%; margin-top: 0.5rem;">
            {{ loading ? '...' : ('register' | t) }}
          </button>
        </form>
        <p class="text-center mt-2 text-muted">
          {{ 'haveAccount' | t }} <a routerLink="/login">{{ 'login' | t }}</a>
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
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  language: Lang = 'fr';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router, private i18n: I18nService) {
    this.language = this.i18n.lang();
  }

  submit(): void {
    if (!this.name || !this.email || !this.password) { this.error = this.i18n.t('requiredFields'); return; }
    this.loading = true;
    this.error = '';
    this.auth.register(this.name, this.email, this.password, this.language).subscribe({
      next: () => { this.i18n.setLang(this.language); this.loading = false; this.router.navigate(['/dashboard']); },
      error: (e) => { this.loading = false; this.error = e?.error?.message || 'Error'; }
    });
  }
}
