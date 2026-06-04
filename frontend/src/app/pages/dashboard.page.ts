import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../services/progress.service';
import { AuthService } from '../services/auth.service';
import { TPipe, LocalizedPipe } from '../pipes/t.pipe';
import { IconComponent } from '../components/icon.component';
import type { Progress } from '../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TPipe, LocalizedPipe, IconComponent],
  template: `
    <div class="container">
      <header class="page-head">
        <div>
          <span class="text-muted">{{ 'welcome' | t }}</span>
          <h2>{{ auth.user()?.name }}</h2>
        </div>
        <a routerLink="/lessons" class="btn">
          {{ 'continueLearning' | t }}
          <app-icon name="arrow-right" [size]="16"></app-icon>
        </a>
      </header>

      <div *ngIf="progress() as p" class="grid grid-4 mb-3">
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="book" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'completedLessons' | t }}</span>
          </div>
          <div class="stat-value">{{ p.stats.completed }} <span class="stat-total">/ {{ p.stats.totalLessons }}</span></div>
          <div class="progress-bar mt-1"><span [style.width.%]="p.stats.progressPercent"></span></div>
        </div>
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="star" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'avgScore' | t }}</span>
          </div>
          <div class="stat-value">{{ p.stats.avgScore }}<span class="stat-total">%</span></div>
        </div>
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="graduation" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'level' | t }}</span>
          </div>
          <div class="stat-value level-text">{{ p.stats.level | t }}</div>
        </div>
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="chart" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'progress' | t }}</span>
          </div>
          <div class="stat-value">{{ p.stats.progressPercent }}<span class="stat-total">%</span></div>
        </div>
      </div>

      <div *ngIf="progress() as p" class="grid grid-2">
        <div class="card next-lesson" *ngIf="p.stats.nextLesson">
          <span class="tag">{{ 'nextLesson' | t }}</span>
          <h3 class="chinese lesson-title">{{ p.stats.nextLesson.title | localized }}</h3>
          <p class="text-muted">{{ p.stats.nextLesson.description | localized }}</p>
          <a [routerLink]="['/lessons', p.stats.nextLesson.id]" class="btn mt-2">
            {{ 'continueLearning' | t }}
            <app-icon name="arrow-right" [size]="16"></app-icon>
          </a>
        </div>

        <div class="card">
          <div class="flex-between mb-2">
            <h3>{{ 'recentScores' | t }}</h3>
            <span class="tag">{{ 'yourAvg' | t }}: {{ p.stats.avgScore }}%</span>
          </div>
          <p class="text-muted" *ngIf="!p.quizResults.length">—</p>
          <ul class="quiz-list">
            <li *ngFor="let r of p.quizResults.slice(-5).reverse()">
              <div class="ql-left">
                <span class="ql-icon"><app-icon name="check" [size]="14"></app-icon></span>
                <span>{{ r.quizId }}</span>
              </div>
              <div class="ql-right">
                <span class="ql-bar"><span [style.width.%]="r.score"></span></span>
                <span class="ql-score">{{ r.score }}%</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
    }
    .page-head h2 { margin: 0.2rem 0 0; }
    .page-head .text-muted { font-size: 0.85rem; }

    .stat-head { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.5rem; font-size: 0.82rem; }
    .stat-icon {
      width: 28px; height: 28px;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--primary-light); color: var(--primary);
      border-radius: 8px;
    }
    .stat-value {
      font-size: 1.75rem; font-weight: 700; color: var(--text);
      display: flex; align-items: baseline; gap: 0.2rem;
    }
    .stat-total { font-size: 0.9rem; color: var(--text-muted); font-weight: 500; }
    .stat .level-text { font-size: 1.2rem; }

    .next-lesson { display: flex; flex-direction: column; align-items: flex-start; }
    .lesson-title { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0 0.4rem; color: var(--primary); }

    .quiz-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
    .quiz-list li {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.55rem 0.7rem;
      background: var(--bg-alt); border-radius: 8px; gap: 0.5rem;
    }
    .ql-left { display: flex; align-items: center; gap: 0.5rem; font-weight: 500; }
    .ql-icon {
      width: 22px; height: 22px;
      display: inline-flex; align-items: center; justify-content: center;
      background: #fff; color: var(--success); border-radius: 50%;
    }
    .ql-right { display: flex; align-items: center; gap: 0.6rem; flex: 1; max-width: 60%; }
    .ql-bar { display: block; flex: 1; height: 6px; background: #fff; border-radius: 999px; overflow: hidden; }
    .ql-bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); }
    .ql-score { font-size: 0.85rem; font-weight: 600; color: var(--text); min-width: 38px; text-align: end; }
  `]
})
export class DashboardPage implements OnInit {
  progress = signal<Progress | null>(null);
  constructor(public auth: AuthService, private progressSvc: ProgressService) {}
  ngOnInit(): void {
    this.progressSvc.get().subscribe({ next: (p) => this.progress.set(p) });
  }
}
