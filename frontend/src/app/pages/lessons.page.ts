import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { TPipe, LocalizedPipe } from '../pipes/t.pipe';
import type { Lesson, Level } from '../models';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TPipe, LocalizedPipe],
  template: `
    <div class="container">
      <h2>{{ 'lessons' | t }}</h2>
      <div class="filters card mb-3">
        <input [(ngModel)]="q" (ngModelChange)="reload()" [placeholder]="'search' | t" />
        <select [(ngModel)]="level" (ngModelChange)="reload()">
          <option value="">{{ 'allLevels' | t }}</option>
          <option value="beginner">{{ 'beginner' | t }}</option>
          <option value="intermediate">{{ 'intermediate' | t }}</option>
          <option value="advanced">{{ 'advanced' | t }}</option>
        </select>
      </div>

      <div class="grid grid-2">
        <a *ngFor="let l of lessons()" [routerLink]="['/lessons', l.id]" class="card lesson-card">
          <div class="flex-between">
            <span class="tag">{{ l.level | t }}</span>
            <span class="text-muted">#{{ l.order }}</span>
          </div>
          <h3 class="chinese">{{ l.title | localized }}</h3>
          <p class="text-muted">{{ l.description | localized }}</p>
          <div class="words-preview">
            <span *ngFor="let w of l.words.slice(0, 3)" class="word-chip">{{ w.chinese }}</span>
          </div>
        </a>
      </div>

      <p *ngIf="!lessons().length" class="text-center text-muted mt-3">—</p>
    </div>
  `,
  styles: [`
    .filters { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .filters input { flex: 1; min-width: 200px; }
    .filters select { width: auto; min-width: 160px; }
    .lesson-card { text-decoration: none; color: inherit; display: block; transition: transform 0.15s; }
    .lesson-card:hover { transform: translateY(-2px); }
    .lesson-card h3 { margin: 0.5rem 0; }
    .words-preview { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
    .word-chip { background: #fdf2e9; padding: 0.25rem 0.6rem; border-radius: 6px; font-family: 'Noto Sans SC', sans-serif; }
  `]
})
export class LessonsPage implements OnInit {
  lessons = signal<Lesson[]>([]);
  q = '';
  level: Level | '' = '';

  constructor(private svc: LessonService) {}
  ngOnInit(): void { this.reload(); }
  reload(): void {
    this.svc.list({ q: this.q || undefined, level: (this.level || undefined) as Level | undefined })
      .subscribe((res) => this.lessons.set(res));
  }
}
