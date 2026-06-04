import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TPipe } from '../pipes/t.pipe';
import { AuthService } from '../services/auth.service';
import { IconComponent } from '../components/icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TPipe, IconComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="hero-badge">
            <app-icon name="sparkle" [size]="14"></app-icon>
            {{ 'heroBadge' | t }}
          </span>
          <h1>
            <span class="chinese hero-chinese">学中文</span>
            <span class="hero-title">{{ 'learnProgressively' | t }}</span>
          </h1>
          <p class="hero-sub">{{ 'heroSubtitle' | t }}</p>

          <div class="cta">
            <a *ngIf="!auth.isLogged()" routerLink="/register" class="btn btn-lg">
              {{ 'getStarted' | t }}
              <app-icon name="arrow-right" [size]="18"></app-icon>
            </a>
            <a *ngIf="auth.isLogged()" routerLink="/dashboard" class="btn btn-lg">
              {{ 'dashboard' | t }}
              <app-icon name="arrow-right" [size]="18"></app-icon>
            </a>
            <a routerLink="/lessons" class="btn-light btn-lg">{{ 'exploreLessons' | t }}</a>
          </div>

          <div class="trust">
            <span><strong>FR</strong> Français</span>
            <span class="dot"></span>
            <span><strong>EN</strong> English</span>
            <span class="dot"></span>
            <span><strong>AR</strong> العربية</span>
          </div>
        </div>

        <div class="hero-card-wrap">
          <div class="hero-card">
            <div class="hc-head">
              <span class="hc-tag">{{ 'lessons' | t }} · 01</span>
              <span class="tag tag-success">{{ 'beginner' | t }}</span>
            </div>
            <div class="hc-word">
              <div class="hc-chinese chinese">你好</div>
              <div class="hc-pinyin">nǐ hǎo</div>
              <div class="hc-trans">{{ helloLabel() }}</div>
            </div>
            <div class="hc-example">
              <span class="chinese">你好,朋友。</span>
              <span class="text-muted">— {{ helloExample() }}</span>
            </div>
            <div class="hc-foot">
              <span class="hc-meta"><app-icon name="speaker" [size]="14"></app-icon> {{ 'listen' | t }}</span>
              <span class="hc-meta"><app-icon name="check" [size]="14"></app-icon> {{ 'completed' | t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="section section-tight stats-section">
      <div class="container">
        <h2 class="section-title">{{ 'statsTitle' | t }}</h2>
        <p class="section-subtitle">{{ 'statsSubtitle' | t }}</p>
        <div class="grid grid-4">
          <div class="card stat-card">
            <div class="stat-num">6+</div>
            <div class="text-muted">{{ 'statLessonsLabel' | t }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-num">18+</div>
            <div class="text-muted">{{ 'statWordsLabel' | t }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-num">3+</div>
            <div class="text-muted">{{ 'statQuizLabel' | t }}</div>
          </div>
          <div class="card stat-card">
            <div class="stat-num">3</div>
            <div class="text-muted">{{ 'statLangLabel' | t }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section features-section">
      <div class="container">
        <h2 class="section-title">{{ 'featuresTitle' | t }}</h2>
        <p class="section-subtitle">{{ 'featuresSubtitle' | t }}</p>

        <div class="grid grid-2 features">
          <div class="card card-hover feature">
            <div class="feature-icon"><app-icon name="book" [size]="22"></app-icon></div>
            <h3>{{ 'featLessonsTitle' | t }}</h3>
            <p class="text-muted">{{ 'featLessonsDesc' | t }}</p>
          </div>
          <div class="card card-hover feature">
            <div class="feature-icon"><app-icon name="list" [size]="22"></app-icon></div>
            <h3>{{ 'featVocabTitle' | t }}</h3>
            <p class="text-muted">{{ 'featVocabDesc' | t }}</p>
          </div>
          <div class="card card-hover feature">
            <div class="feature-icon"><app-icon name="check" [size]="22"></app-icon></div>
            <h3>{{ 'featQuizTitle' | t }}</h3>
            <p class="text-muted">{{ 'featQuizDesc' | t }}</p>
          </div>
          <div class="card card-hover feature">
            <div class="feature-icon"><app-icon name="chart" [size]="22"></app-icon></div>
            <h3>{{ 'featProgressTitle' | t }}</h3>
            <p class="text-muted">{{ 'featProgressDesc' | t }}</p>
          </div>
          <div class="card card-hover feature">
            <div class="feature-icon"><app-icon name="speaker" [size]="22"></app-icon></div>
            <h3>{{ 'featAudioTitle' | t }}</h3>
            <p class="text-muted">{{ 'featAudioDesc' | t }}</p>
          </div>
          <div class="card card-hover feature">
            <div class="feature-icon"><app-icon name="translate" [size]="22"></app-icon></div>
            <h3>{{ 'featMultilangTitle' | t }}</h3>
            <p class="text-muted">{{ 'featMultilangDesc' | t }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section how-section">
      <div class="container">
        <h2 class="section-title">{{ 'howTitle' | t }}</h2>
        <p class="section-subtitle">{{ 'howSubtitle' | t }}</p>

        <div class="how-grid">
          <div class="how-step">
            <div class="step-num">01</div>
            <h3>{{ 'howStep1Title' | t }}</h3>
            <p class="text-muted">{{ 'howStep1Desc' | t }}</p>
          </div>
          <div class="how-arrow"><app-icon name="arrow-right" [size]="22"></app-icon></div>
          <div class="how-step">
            <div class="step-num">02</div>
            <h3>{{ 'howStep2Title' | t }}</h3>
            <p class="text-muted">{{ 'howStep2Desc' | t }}</p>
          </div>
          <div class="how-arrow"><app-icon name="arrow-right" [size]="22"></app-icon></div>
          <div class="how-step">
            <div class="step-num">03</div>
            <h3>{{ 'howStep3Title' | t }}</h3>
            <p class="text-muted">{{ 'howStep3Desc' | t }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEVELS -->
    <section class="section levels-section">
      <div class="container">
        <h2 class="section-title">{{ 'levelsTitle' | t }}</h2>
        <p class="section-subtitle">{{ 'levelsSubtitle' | t }}</p>

        <div class="grid grid-3">
          <a routerLink="/lessons" class="card card-hover level-card">
            <span class="tag tag-success">{{ 'beginner' | t }}</span>
            <div class="level-icon"><app-icon name="compass" [size]="24"></app-icon></div>
            <h3>{{ 'beginner' | t }}</h3>
            <p class="text-muted">{{ 'levelBegDesc' | t }}</p>
            <span class="level-link">{{ 'exploreLessons' | t }} <app-icon name="arrow-right" [size]="14"></app-icon></span>
          </a>
          <a routerLink="/lessons" class="card card-hover level-card">
            <span class="tag tag-accent">{{ 'intermediate' | t }}</span>
            <div class="level-icon"><app-icon name="target" [size]="24"></app-icon></div>
            <h3>{{ 'intermediate' | t }}</h3>
            <p class="text-muted">{{ 'levelIntDesc' | t }}</p>
            <span class="level-link">{{ 'exploreLessons' | t }} <app-icon name="arrow-right" [size]="14"></app-icon></span>
          </a>
          <a routerLink="/lessons" class="card card-hover level-card">
            <span class="tag">{{ 'advanced' | t }}</span>
            <div class="level-icon"><app-icon name="graduation" [size]="24"></app-icon></div>
            <h3>{{ 'advanced' | t }}</h3>
            <p class="text-muted">{{ 'levelAdvDesc' | t }}</p>
            <span class="level-link">{{ 'exploreLessons' | t }} <app-icon name="arrow-right" [size]="14"></app-icon></span>
          </a>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="section categories-section">
      <div class="container">
        <h2 class="section-title">{{ 'categoriesTitle' | t }}</h2>
        <p class="section-subtitle">{{ 'categoriesSubtitle' | t }}</p>

        <div class="cat-grid">
          <a routerLink="/vocabulary" class="cat-tile">
            <span class="chinese cat-chinese">您好</span>
            <span class="cat-name">{{ 'greetings' | t }}</span>
          </a>
          <a routerLink="/vocabulary" class="cat-tile">
            <span class="chinese cat-chinese">家</span>
            <span class="cat-name">{{ 'family' | t }}</span>
          </a>
          <a routerLink="/vocabulary" class="cat-tile">
            <span class="chinese cat-chinese">饭</span>
            <span class="cat-name">{{ 'food' | t }}</span>
          </a>
          <a routerLink="/vocabulary" class="cat-tile">
            <span class="chinese cat-chinese">飞机</span>
            <span class="cat-name">{{ 'travel' | t }}</span>
          </a>
          <a routerLink="/vocabulary" class="cat-tile">
            <span class="chinese cat-chinese">一二三</span>
            <span class="cat-name">{{ 'numbers' | t }}</span>
          </a>
          <a routerLink="/vocabulary" class="cat-tile">
            <span class="chinese cat-chinese">时间</span>
            <span class="cat-name">{{ 'time' | t }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-card">
          <span class="chinese cta-mark">开始</span>
          <h2>{{ 'ctaTitle' | t }}</h2>
          <p>{{ 'ctaSubtitle' | t }}</p>
          <a *ngIf="!auth.isLogged()" routerLink="/register" class="btn btn-lg cta-btn">
            {{ 'ctaButton' | t }}
            <app-icon name="arrow-right" [size]="18"></app-icon>
          </a>
          <a *ngIf="auth.isLogged()" routerLink="/dashboard" class="btn btn-lg cta-btn">
            {{ 'dashboard' | t }}
            <app-icon name="arrow-right" [size]="18"></app-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* HERO */
    .hero { position: relative; overflow: hidden; padding: 4rem 0 5rem; }
    .hero-bg {
      position: absolute; inset: 0;
      background:
        radial-gradient(circle at 85% 10%, rgba(212, 160, 23, 0.18), transparent 45%),
        radial-gradient(circle at 10% 90%, rgba(185, 52, 42, 0.15), transparent 50%),
        linear-gradient(180deg, var(--bg) 0%, var(--bg) 100%);
      z-index: 0;
    }
    .hero-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1.1fr 1fr;
      gap: 3rem; align-items: center;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 999px;
      font-size: 0.78rem; font-weight: 600;
      margin-bottom: 1rem;
    }
    .hero h1 {
      margin: 0 0 1rem;
      display: flex; flex-direction: column; gap: 0.4rem;
      font-size: 2.6rem;
    }
    .hero-chinese {
      font-size: 3.4rem; line-height: 1;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 800;
    }
    .hero-title { font-size: 1.9rem; font-weight: 700; color: var(--text); }
    .hero-sub { font-size: 1.05rem; color: var(--text-muted); max-width: 540px; margin: 0 0 1.5rem; }
    .cta { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .trust { display: flex; gap: 0.75rem; align-items: center; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap; }
    .trust strong { color: var(--text); margin-inline-end: 0.25rem; font-weight: 700; }
    .dot { width: 4px; height: 4px; background: var(--border-strong); border-radius: 50%; }

    .hero-card-wrap { display: flex; justify-content: center; }
    .hero-card {
      width: 100%; max-width: 360px;
      background: var(--surface);
      border-radius: 18px;
      padding: 1.5rem;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      transform: rotate(-1.2deg);
      transition: transform 0.3s;
    }
    .hero-card:hover { transform: rotate(0) translateY(-4px); }
    .hc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .hc-tag { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
    .hc-word { text-align: center; padding: 1rem 0 1.25rem; border-bottom: 1px solid var(--border); }
    .hc-chinese { font-size: 3.5rem; font-weight: 700; color: var(--primary); line-height: 1; }
    .hc-pinyin { color: var(--text-muted); font-style: italic; margin: 0.4rem 0 0.2rem; }
    .hc-trans { font-size: 1.05rem; font-weight: 500; color: var(--text); }
    .hc-example { padding: 1rem 0; font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.25rem; border-bottom: 1px solid var(--border); }
    .hc-foot { display: flex; justify-content: space-between; padding-top: 0.85rem; font-size: 0.8rem; color: var(--text-muted); }
    .hc-meta { display: inline-flex; align-items: center; gap: 0.3rem; }

    /* STATS */
    .stats-section { background: var(--surface); border-bottom: 1px solid var(--border); border-top: 1px solid var(--border); }
    .stat-card { text-align: center; }
    .stat-num {
      font-size: 2.2rem; font-weight: 800;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      line-height: 1;
      margin-bottom: 0.4rem;
    }

    /* FEATURES */
    .feature .feature-icon {
      width: 44px; height: 44px;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 10px;
      margin-bottom: 0.85rem;
    }
    .feature h3 { margin: 0 0 0.4rem; }

    /* HOW */
    .how-section { background: var(--bg-alt); }
    .how-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr auto 1fr;
      gap: 1.25rem;
      align-items: stretch;
    }
    .how-step {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      text-align: center;
    }
    .step-num {
      display: inline-flex;
      width: 48px; height: 48px;
      align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: #fff;
      font-weight: 800;
      font-size: 1.05rem;
      border-radius: 50%;
      margin-bottom: 0.85rem;
      letter-spacing: 0.02em;
    }
    .how-step h3 { margin: 0 0 0.4rem; }
    .how-arrow { display: flex; align-items: center; justify-content: center; color: var(--text-soft); }
    [dir="rtl"] .how-arrow svg { transform: scaleX(-1); }

    /* LEVELS */
    .level-card {
      display: flex; flex-direction: column; align-items: flex-start; gap: 0.65rem;
      color: inherit; text-decoration: none;
    }
    .level-card:hover { text-decoration: none; }
    .level-card .level-icon {
      width: 44px; height: 44px;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--accent-soft);
      color: #7a5a0a;
      border-radius: 10px;
    }
    .level-card h3 { margin: 0; }
    .level-card .level-link {
      margin-top: auto;
      display: inline-flex; align-items: center; gap: 0.35rem;
      color: var(--primary); font-weight: 600; font-size: 0.9rem;
    }
    [dir="rtl"] .level-card .level-link svg { transform: scaleX(-1); }

    /* CATEGORIES */
    .cat-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;
    }
    .cat-tile {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem 1rem;
      text-align: center;
      color: var(--text);
      text-decoration: none;
      transition: all 0.2s;
      display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
    }
    .cat-tile:hover {
      border-color: var(--primary);
      background: var(--primary-light);
      transform: translateY(-2px);
      text-decoration: none;
    }
    .cat-chinese { font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1; }
    .cat-name { font-weight: 600; font-size: 0.95rem; }

    /* CTA */
    .cta-section { padding-bottom: 5rem; }
    .cta-card {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark) 75%, #5d1a14);
      color: #fff;
      border-radius: 20px;
      padding: 3rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .cta-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 80% 20%, rgba(212, 160, 23, 0.3), transparent 50%);
    }
    .cta-mark {
      font-size: 4rem;
      font-weight: 800;
      opacity: 0.15;
      position: absolute;
      top: 50%; inset-inline-start: 6%;
      transform: translateY(-50%);
      line-height: 1;
    }
    .cta-card h2 { color: #fff; margin: 0 0 0.5rem; position: relative; }
    .cta-card p { opacity: 0.92; max-width: 520px; margin: 0 auto 1.5rem; position: relative; }
    .cta-btn { background: var(--accent); color: #1f1410; position: relative; }
    .cta-btn:hover { background: #c79513; }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; gap: 2rem; }
      .hero-card { transform: none; max-width: 100%; }
      .how-grid { grid-template-columns: 1fr; }
      .how-arrow { transform: rotate(90deg); }
      [dir="rtl"] .how-arrow { transform: rotate(90deg); }
      [dir="rtl"] .how-arrow svg { transform: none; }
    }
    @media (max-width: 600px) {
      .hero { padding: 2.5rem 0 3rem; }
      .hero h1 { font-size: 2rem; }
      .hero-chinese { font-size: 2.8rem; }
      .hero-title { font-size: 1.5rem; }
      .cta-card { padding: 2rem 1.25rem; }
    }
  `]
})
export class HomePage {
  constructor(public auth: AuthService) {}

  helloLabel(): string {
    const lang = (localStorage.getItem('lang') || 'fr') as 'fr' | 'en' | 'ar';
    return { fr: 'Bonjour', en: 'Hello', ar: 'مرحبا' }[lang];
  }
  helloExample(): string {
    const lang = (localStorage.getItem('lang') || 'fr') as 'fr' | 'en' | 'ar';
    return { fr: 'Bonjour, ami.', en: 'Hello, friend.', ar: 'مرحبا يا صديقي.' }[lang];
  }
}
