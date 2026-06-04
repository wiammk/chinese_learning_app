import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VocabularyService } from '../services/vocabulary.service';
import { TPipe, LocalizedPipe } from '../pipes/t.pipe';
import type { VocabularyItem } from '../models';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule, FormsModule, TPipe, LocalizedPipe],
  template: `
    <div class="container">
      <h2>{{ 'vocabulary' | t }}</h2>
      <div class="filters card mb-3">
        <input [(ngModel)]="q" (ngModelChange)="reload()" [placeholder]="'search' | t" />
        <select [(ngModel)]="category" (ngModelChange)="reload()">
          <option value="">{{ 'allCategories' | t }}</option>
          <option *ngFor="let c of categories()" [value]="c">{{ c | t }}</option>
        </select>
      </div>

      <div class="grid grid-3">
        <div *ngFor="let v of items()" class="card vocab">
          <div class="flex-between mb-1">
            <span class="chinese big">{{ v.chinese }}</span>
            <span class="tag">{{ v.category | t }}</span>
          </div>
          <div class="pinyin">{{ v.pinyin }}</div>
          <div class="trans">{{ v.translation | localized }}</div>
          <div class="example mt-1">
            <span class="chinese">{{ v.example.chinese }}</span>
            <div class="text-muted">{{ v.example | localized }}</div>
          </div>
        </div>
      </div>

      <p *ngIf="!items().length" class="text-center text-muted mt-3">—</p>
    </div>
  `,
  styles: [`
    .filters { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .filters input { flex: 1; min-width: 200px; }
    .filters select { width: auto; min-width: 160px; }
    .vocab .big { font-size: 2rem; font-weight: 700; color: var(--primary); }
    .vocab .pinyin { color: var(--text-muted); font-style: italic; }
    .vocab .trans { font-weight: 500; margin-top: 0.25rem; }
    .example { font-size: 0.9rem; }
  `]
})
export class VocabularyPage implements OnInit {
  items = signal<VocabularyItem[]>([]);
  categories = signal<string[]>([]);
  q = '';
  category = '';

  constructor(private svc: VocabularyService) {}
  ngOnInit(): void {
    this.svc.categories().subscribe((c) => this.categories.set(c));
    this.reload();
  }
  reload(): void {
    this.svc.list({ q: this.q || undefined, category: this.category || undefined })
      .subscribe((v) => this.items.set(v));
  }
}
