import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { I18nService } from '../services/i18n.service';
import { TPipe } from '../pipes/t.pipe';
import type { Lang, Level } from '../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TPipe],
  template: `
    <div class="container" style="max-width: 560px;">
      <h2>{{ 'profile' | t }}</h2>
      <div class="card">
        <div *ngIf="message" class="alert alert-success">{{ message }}</div>
        <label>{{ 'name' | t }}</label>
        <input [(ngModel)]="name" class="mb-2" />
        <label>{{ 'email' | t }}</label>
        <input [value]="auth.user()?.email || ''" disabled class="mb-2" />
        <label>{{ 'language' | t }}</label>
        <select [(ngModel)]="language" class="mb-2">
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
        <label>{{ 'level' | t }}</label>
        <select [(ngModel)]="level" class="mb-2">
          <option value="beginner">{{ 'beginner' | t }}</option>
          <option value="intermediate">{{ 'intermediate' | t }}</option>
          <option value="advanced">{{ 'advanced' | t }}</option>
        </select>
        <button (click)="save()" [disabled]="loading">{{ 'save' | t }}</button>
      </div>
    </div>
  `,
  styles: [`label { display: block; margin-bottom: 0.25rem; font-size: 0.85rem; font-weight: 500; }`]
})
export class ProfilePage implements OnInit {
  name = '';
  language: Lang = 'fr';
  level: Level = 'beginner';
  loading = false;
  message = '';

  constructor(public auth: AuthService, private i18n: I18nService) {}
  ngOnInit(): void {
    const u = this.auth.user();
    if (u) { this.name = u.name; this.language = u.language; this.level = u.level; }
  }
  save(): void {
    this.loading = true;
    this.auth.updateProfile({ name: this.name, language: this.language, level: this.level }).subscribe({
      next: () => { this.loading = false; this.i18n.setLang(this.language); this.message = this.i18n.t('save'); setTimeout(() => this.message = '', 2000); },
      error: () => { this.loading = false; }
    });
  }
}
