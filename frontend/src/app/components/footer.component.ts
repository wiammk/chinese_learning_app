import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TPipe } from '../pipes/t.pipe';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TPipe, IconComponent],
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-inner">
          <div class="col col-brand">
            <div class="brand">
              <span class="brand-mark chinese">学</span>
              <div>
                <div class="brand-title">{{ 'appName' | t }}</div>
                <div class="brand-sub">学习中文 — Learn Mandarin</div>
              </div>
            </div>
            <p class="text-muted mt-2">{{ 'footerAbout' | t }}</p>
            <div class="badges mt-2">
              <span class="badge"><app-icon name="globe" [size]="14"></app-icon> FR · EN · AR</span>
              <span class="badge"><app-icon name="shield" [size]="14"></app-icon> {{ 'footerSecure' | t }}</span>
            </div>
          </div>

          <div class="col">
            <h4>{{ 'footerLearn' | t }}</h4>
            <ul>
              <li><a routerLink="/lessons">{{ 'lessons' | t }}</a></li>
              <li><a routerLink="/vocabulary">{{ 'vocabulary' | t }}</a></li>
              <li><a routerLink="/dashboard">{{ 'dashboard' | t }}</a></li>
              <li><a routerLink="/profile">{{ 'profile' | t }}</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>{{ 'footerLevels' | t }}</h4>
            <ul>
              <li><a routerLink="/lessons">{{ 'beginner' | t }}</a></li>
              <li><a routerLink="/lessons">{{ 'intermediate' | t }}</a></li>
              <li><a routerLink="/lessons">{{ 'advanced' | t }}</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>{{ 'footerCategories' | t }}</h4>
            <ul>
              <li><a routerLink="/vocabulary">{{ 'greetings' | t }}</a></li>
              <li><a routerLink="/vocabulary">{{ 'family' | t }}</a></li>
              <li><a routerLink="/vocabulary">{{ 'food' | t }}</a></li>
              <li><a routerLink="/vocabulary">{{ 'travel' | t }}</a></li>
              <li><a routerLink="/vocabulary">{{ 'numbers' | t }}</a></li>
              <li><a routerLink="/vocabulary">{{ 'time' | t }}</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>{{ 'footerContact' | t }}</h4>
            <ul class="contact">
              <li><app-icon name="mail" [size]="14"></app-icon> contact&#64;chinese.app</li>
              <li><app-icon name="globe" [size]="14"></app-icon> www.chinese.app</li>
              <li><app-icon name="clock" [size]="14"></app-icon> {{ 'footerHours' | t }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-inner footer-bottom-inner">
          <span>© {{ year }} {{ 'appName' | t }}. {{ 'footerRights' | t }}.</span>
          <span class="footer-links">
            <a routerLink="/">{{ 'footerTerms' | t }}</a>
            <span class="sep">·</span>
            <a routerLink="/">{{ 'footerPrivacy' | t }}</a>
            <span class="sep">·</span>
            <a routerLink="/">{{ 'footerCookies' | t }}</a>
          </span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1f1410;
      color: #d8cfc8;
      margin-top: 4rem;
    }
    .footer-top { padding: 3rem 0 2rem; }
    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
      display: grid;
      grid-template-columns: 1.5fr repeat(4, 1fr);
      gap: 2rem;
    }
    .col-brand { max-width: 340px; }
    .brand { display: flex; align-items: center; gap: 0.65rem; }
    .brand-mark {
      width: 42px; height: 42px;
      display: inline-flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #fff;
      border-radius: 10px;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .brand-title { font-weight: 700; color: #fff; font-size: 1.05rem; }
    .brand-sub { font-size: 0.78rem; color: #9a8f87; }
    .col-brand .text-muted { color: #a89e96; font-size: 0.92rem; }

    .badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.3rem 0.65rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      font-size: 0.75rem;
      color: #d8cfc8;
    }

    h4 {
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin: 0 0 1rem;
    }
    ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
    ul a, .contact li {
      color: #a89e96;
      font-size: 0.9rem;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    ul a:hover { color: #fff; text-decoration: none; }
    .contact li { color: #a89e96; }

    .footer-bottom {
      background: #15090a;
      padding: 1.1rem 0;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .footer-bottom-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      grid-template-columns: none;
      font-size: 0.82rem;
      color: #9a8f87;
    }
    .footer-links { display: flex; gap: 0.6rem; align-items: center; }
    .footer-links a { color: #9a8f87; }
    .footer-links a:hover { color: #fff; text-decoration: none; }
    .sep { color: #4a3d37; }

    @media (max-width: 900px) {
      .footer-inner { grid-template-columns: 1fr 1fr; }
      .col-brand { grid-column: 1 / -1; max-width: none; }
    }
    @media (max-width: 520px) {
      .footer-inner { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
