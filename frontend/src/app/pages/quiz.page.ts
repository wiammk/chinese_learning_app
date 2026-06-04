import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { TPipe, LocalizedPipe } from '../pipes/t.pipe';
import type { Quiz } from '../models';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink, TPipe, LocalizedPipe],
  template: `
    <div class="container" *ngIf="quiz() as q">
      <h2>{{ q.title | localized }}</h2>

      <div *ngIf="!result()" class="grid">
        <div *ngFor="let question of q.questions; let i = index" class="card question">
          <div class="q-prompt">
            <span class="q-num">Q{{ i + 1 }}.</span>
            {{ question.prompt | localized }}
          </div>
          <div class="options">
            <label *ngFor="let opt of question.options; let j = index" class="opt"
                   [class.selected]="answers[i] === j">
              <input type="radio" [name]="'q' + i" [value]="j" (change)="answers[i] = j" />
              <span>{{ opt }}</span>
            </label>
          </div>
        </div>

        <button (click)="submit()" [disabled]="loading || answers.length !== q.questions.length">
          {{ 'submit' | t }}
        </button>
      </div>

      <div *ngIf="result() as r" class="card result text-center">
        <div class="score-circle" [class.passing]="r.score >= 60">{{ r.score }}%</div>
        <h3>{{ 'correctAnswers' | t }}: {{ r.correct }} / {{ r.total }}</h3>
        <div class="flex" style="justify-content: center;">
          <button (click)="retry()" class="btn-outline">{{ 'retry' | t }}</button>
          <a [routerLink]="['/lessons', q.lessonId]" class="btn">{{ 'lastLesson' | t }}</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .question .q-prompt { font-weight: 500; margin-bottom: 0.75rem; }
    .q-num { color: var(--primary); margin-right: 0.4rem; }
    .options { display: grid; gap: 0.5rem; }
    .opt { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.9rem; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; transition: all 0.15s; }
    .opt:hover { background: #faf4f3; border-color: var(--primary); }
    .opt.selected { background: #fdecea; border-color: var(--primary); }
    .opt input { width: auto; margin: 0; }
    .result .score-circle {
      width: 120px; height: 120px;
      margin: 1rem auto;
      display: flex; align-items: center; justify-content: center;
      border-radius: 50%;
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      font-size: 1.6rem;
      font-weight: 700;
    }
    .result .score-circle.passing {
      background: linear-gradient(135deg, #27ae60, #1e8449);
    }
  `]
})
export class QuizPage implements OnInit {
  quiz = signal<Quiz | null>(null);
  answers: number[] = [];
  result = signal<{ score: number; correct: number; total: number } | null>(null);
  loading = false;

  constructor(private route: ActivatedRoute, private svc: QuizService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.svc.get(id).subscribe((q) => {
      this.quiz.set(q);
      this.answers = new Array(q.questions.length).fill(-1);
    });
  }

  submit(): void {
    const q = this.quiz();
    if (!q) return;
    this.loading = true;
    this.svc.submit(q.id, this.answers).subscribe({
      next: (r) => { this.result.set(r); this.loading = false; window.scrollTo({ top: 0, behavior: 'smooth' }); },
      error: () => { this.loading = false; }
    });
  }

  retry(): void {
    const q = this.quiz();
    if (!q) return;
    this.answers = new Array(q.questions.length).fill(-1);
    this.result.set(null);
  }
}
