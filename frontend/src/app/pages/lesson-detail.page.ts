import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { ProgressService } from '../services/progress.service';
import { QuizService } from '../services/quiz.service';
import { TPipe, LocalizedPipe } from '../pipes/t.pipe';
import { IconComponent } from '../components/icon.component';
import type { Lesson, Quiz } from '../models';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TPipe, LocalizedPipe, IconComponent],
  template: `
    <div class="container" *ngIf="lesson() as l">
      <a routerLink="/lessons" class="back">
        <app-icon name="arrow-left" [size]="16"></app-icon>
        {{ 'lessons' | t }}
      </a>

      <div class="lesson-head card mb-3">
        <div class="lh-text">
          <span class="tag">{{ l.level | t }}</span>
          <h2 class="chinese">{{ l.title | localized }}</h2>
          <p class="text-muted">{{ l.description | localized }}</p>
        </div>
        <div class="lh-actions">
          <button *ngIf="quiz()" class="btn-outline" [routerLink]="['/quiz', quiz()?.id]">
            <app-icon name="play" [size]="16"></app-icon>
            {{ 'startQuiz' | t }}
          </button>
          <button (click)="markComplete()" [disabled]="completed">
            <app-icon name="check" [size]="16"></app-icon>
            {{ completed ? ('completed' | t) : ('markComplete' | t) }}
          </button>
        </div>
      </div>

      <div class="grid grid-2">
        <div *ngFor="let w of l.words" class="card word">
          <div class="chinese big">{{ w.chinese }}</div>
          <div class="pinyin">{{ w.pinyin }}</div>
          <div class="trans">{{ w.translation | localized }}</div>
          <div class="example">
            <span class="chinese">{{ w.example.chinese }}</span>
            <span class="text-muted">— {{ w.example | localized }}</span>
          </div>
          <button *ngIf="w.audio" class="btn-light btn-sm listen" (click)="play(w.audio || '')">
            <app-icon name="speaker" [size]="14"></app-icon>
            {{ 'listen' | t }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back {
      display: inline-flex; align-items: center; gap: 0.4rem;
      margin-bottom: 1rem; color: var(--text-muted);
      font-size: 0.9rem;
    }
    [dir="rtl"] .back svg { transform: scaleX(-1); }
    .back:hover { color: var(--text); text-decoration: none; }
    .lesson-head {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 1.5rem; flex-wrap: wrap;
    }
    .lh-text h2 { margin: 0.4rem 0 0.3rem; font-size: 1.6rem; color: var(--primary); }
    .lh-text p { margin: 0; }
    .lh-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .word .big { font-size: 3rem; font-weight: 700; color: var(--primary); line-height: 1.1; }
    .word .pinyin { color: var(--text-muted); font-style: italic; margin: 0.4rem 0 0.5rem; }
    .word .trans { font-size: 1.1rem; font-weight: 500; margin-bottom: 0.6rem; }
    .example { font-size: 0.9rem; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.2rem; }
  `]
})
export class LessonDetailPage implements OnInit {
  lesson = signal<Lesson | null>(null);
  quiz = signal<Quiz | null>(null);
  completed = false;

  constructor(
    private route: ActivatedRoute,
    private lessonSvc: LessonService,
    private quizSvc: QuizService,
    private progress: ProgressService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.lessonSvc.get(id).subscribe((l) => this.lesson.set(l));
    this.quizSvc.byLesson(id).subscribe({ next: (q) => this.quiz.set(q), error: () => {} });
  }

  markComplete(): void {
    const id = this.lesson()?.id;
    if (!id) return;
    this.progress.completeLesson(id).subscribe(() => this.completed = true);
  }

  play(src: string): void {
    if (!src) return;
    new Audio(src).play().catch(() => {});
  }
}
