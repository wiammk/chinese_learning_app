import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { LessonService } from '../services/lesson.service';
import { VocabularyService } from '../services/vocabulary.service';
import { TPipe, LocalizedPipe } from '../pipes/t.pipe';
import { IconComponent } from '../components/icon.component';
import type { User, Lesson, VocabularyItem } from '../models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, TPipe, LocalizedPipe, IconComponent],
  template: `
    <div class="container">
      <header class="page-head">
        <h2>{{ 'admin' | t }}</h2>
        <span class="text-muted">{{ 'stats' | t }}</span>
      </header>

      <div *ngIf="stats() as s" class="grid grid-4 mb-3">
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="users" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'totalUsers' | t }}</span>
          </div>
          <div class="stat-value">{{ s.totalUsers }}</div>
        </div>
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="book" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'totalLessons' | t }}</span>
          </div>
          <div class="stat-value">{{ s.totalLessons }}</div>
        </div>
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="list" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'totalVocabulary' | t }}</span>
          </div>
          <div class="stat-value">{{ s.totalVocabulary }}</div>
        </div>
        <div class="card stat">
          <div class="stat-head">
            <span class="stat-icon"><app-icon name="bar-chart" [size]="18"></app-icon></span>
            <span class="text-muted">{{ 'totalQuizAttempts' | t }}</span>
          </div>
          <div class="stat-value">{{ s.totalQuizAttempts }}</div>
        </div>
      </div>

      <div class="tabs mb-2">
        <button (click)="tab='users'" [class]="tab==='users' ? 'tab active' : 'tab'">
          <app-icon name="users" [size]="16"></app-icon>
          {{ 'users' | t }}
        </button>
        <button (click)="tab='lessons'" [class]="tab==='lessons' ? 'tab active' : 'tab'">
          <app-icon name="book" [size]="16"></app-icon>
          {{ 'lessons' | t }}
        </button>
        <button (click)="tab='vocab'" [class]="tab==='vocab' ? 'tab active' : 'tab'">
          <app-icon name="list" [size]="16"></app-icon>
          {{ 'vocabulary' | t }}
        </button>
      </div>

      <div *ngIf="tab==='users'" class="card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>{{ 'language' | t }}</th><th>{{ 'level' | t }}</th></tr></thead>
          <tbody>
            <tr *ngFor="let u of users()">
              <td>
                <div class="user-cell">
                  <span class="mini-avatar">{{ initials(u.name) }}</span>
                  <span>{{ u.name }}</span>
                </div>
              </td>
              <td>{{ u.email }}</td>
              <td><span class="tag" [class.tag-accent]="u.role==='admin'">{{ u.role }}</span></td>
              <td>{{ u.language | uppercase }}</td>
              <td>{{ u.level | t }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="tab==='lessons'" class="card">
        <table>
          <thead><tr><th>Title</th><th>{{ 'level' | t }}</th><th>{{ 'category' | t }}</th><th></th></tr></thead>
          <tbody>
            <tr *ngFor="let l of lessons()">
              <td class="chinese">{{ l.title | localized }}</td>
              <td><span class="tag">{{ l.level | t }}</span></td>
              <td>{{ l.category | t }}</td>
              <td class="actions-cell">
                <button class="btn-light btn-sm" (click)="deleteLesson(l.id)" [title]="'delete' | t">
                  <app-icon name="trash" [size]="14"></app-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="tab==='vocab'" class="card">
        <table>
          <thead><tr><th>Chinese</th><th>Pinyin</th><th>{{ 'category' | t }}</th><th>{{ 'translation' | t }}</th><th></th></tr></thead>
          <tbody>
            <tr *ngFor="let v of vocab()">
              <td class="chinese vocab-han">{{ v.chinese }}</td>
              <td class="pinyin-cell">{{ v.pinyin }}</td>
              <td>{{ v.category | t }}</td>
              <td>{{ v.translation.fr }}</td>
              <td class="actions-cell">
                <button class="btn-light btn-sm" (click)="deleteVocab(v.id)" [title]="'delete' | t">
                  <app-icon name="trash" [size]="14"></app-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-head {
      display: flex; align-items: baseline; justify-content: space-between;
      gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
    }
    .page-head h2 { margin: 0; }
    .stat-head { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.5rem; font-size: 0.82rem; }
    .stat-icon {
      width: 28px; height: 28px;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--primary-light); color: var(--primary);
      border-radius: 8px;
    }
    .stat-value { font-size: 1.75rem; font-weight: 700; color: var(--text); }

    .tabs { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .tab {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: var(--surface); color: var(--text-muted);
      border: 1px solid var(--border); padding: 0.55rem 0.95rem;
      font-size: 0.9rem;
    }
    .tab:hover { background: var(--bg-alt); color: var(--text); }
    .tab.active { background: var(--primary); color: #fff; border-color: var(--primary); }

    .user-cell { display: flex; align-items: center; gap: 0.5rem; }
    .mini-avatar {
      width: 30px; height: 30px;
      display: inline-flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #fff; border-radius: 50%;
      font-size: 0.72rem; font-weight: 600;
    }

    .vocab-han { font-size: 1.2rem; font-weight: 700; color: var(--primary); }
    .pinyin-cell { font-style: italic; color: var(--text-muted); }
    .actions-cell { text-align: end; }
  `]
})
export class AdminPage implements OnInit {
  tab: 'users' | 'lessons' | 'vocab' = 'users';
  stats = signal<{ totalUsers: number; totalLessons: number; totalVocabulary: number; totalQuizzes: number; totalQuizAttempts: number; avgScore: number } | null>(null);
  users = signal<User[]>([]);
  lessons = signal<Lesson[]>([]);
  vocab = signal<VocabularyItem[]>([]);

  constructor(private admin: AdminService, private lessonSvc: LessonService, private vocabSvc: VocabularyService) {}

  ngOnInit(): void {
    this.admin.stats().subscribe((s) => this.stats.set(s));
    this.admin.users().subscribe((u) => this.users.set(u));
    this.lessonSvc.list().subscribe((l) => this.lessons.set(l));
    this.vocabSvc.list().subscribe((v) => this.vocab.set(v));
  }

  initials(name: string): string {
    return (name || '').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  }

  deleteLesson(id: string): void {
    if (!confirm('Delete this lesson?')) return;
    this.lessonSvc.remove(id).subscribe(() => this.lessonSvc.list().subscribe((l) => this.lessons.set(l)));
  }
  deleteVocab(id: string): void {
    if (!confirm('Delete this word?')) return;
    this.vocabSvc.remove(id).subscribe(() => this.vocabSvc.list().subscribe((v) => this.vocab.set(v)));
  }
}
