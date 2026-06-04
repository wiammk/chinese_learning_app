import { Component, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { I18nService } from '../services/i18n.service';
import { TPipe } from '../pipes/t.pipe';
import { IconComponent } from './icon.component';
import type { Lang } from '../models';

interface LangOption { code: Lang; label: string; native: string; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TPipe, IconComponent],
  template: `
    <nav class="nav" [class.scrolled]="scrolled()">
      <div class="nav-inner">
        <!-- Brand -->
        <a routerLink="/" class="brand" (click)="closeAll()">
          <span class="brand-mark"><span class="chinese">学</span></span>
          <span class="brand-title">{{ 'appName' | t }}</span>
        </a>

        <!-- Center: nav links (desktop) -->
        <div class="nav-links">
          <ng-container *ngIf="auth.isLogged(); else publicLinks">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
              <span>{{ 'dashboard' | t }}</span>
            </a>
            <a routerLink="/lessons" routerLinkActive="active" class="nav-link">
              <span>{{ 'lessons' | t }}</span>
            </a>
            <a routerLink="/vocabulary" routerLinkActive="active" class="nav-link">
              <span>{{ 'vocabulary' | t }}</span>
            </a>
            <a *ngIf="auth.isAdmin()" routerLink="/admin" routerLinkActive="active" class="nav-link">
              <span>{{ 'admin' | t }}</span>
            </a>
          </ng-container>
          <ng-template #publicLinks>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">
              <span>{{ 'home' | t }}</span>
            </a>
            <a routerLink="/lessons" routerLinkActive="active" class="nav-link">
              <span>{{ 'lessons' | t }}</span>
            </a>
          </ng-template>
        </div>

        <!-- Right: actions -->
        <div class="nav-actions">
          <!-- Language dropdown -->
          <div class="dropdown" [class.open]="langOpen()">
            <button class="icon-btn lang-trigger" (click)="toggleLang($event)" [attr.aria-expanded]="langOpen()">
              <app-icon name="globe" [size]="16"></app-icon>
              <span class="lang-code">{{ currentLang().code.toUpperCase() }}</span>
              <app-icon name="chevron-down" [size]="12" class="chev" [class.flip]="langOpen()"></app-icon>
            </button>
            <div class="dropdown-menu lang-menu" *ngIf="langOpen()">
              <div class="menu-label">{{ 'language' | t }}</div>
              <button *ngFor="let l of langs"
                      class="menu-item"
                      [class.active]="i18n.lang() === l.code"
                      (click)="setLang(l.code)">
                <span class="lang-tag">{{ l.code.toUpperCase() }}</span>
                <span class="menu-item-text">
                  <span class="menu-item-title">{{ l.label }}</span>
                  <span class="menu-item-sub">{{ l.native }}</span>
                </span>
                <app-icon *ngIf="i18n.lang() === l.code" name="check" [size]="14" class="check"></app-icon>
              </button>
            </div>
          </div>

          <!-- Auth state -->
          <ng-container *ngIf="auth.isLogged(); else loggedOut">
            <!-- Avatar dropdown -->
            <div class="dropdown" [class.open]="userOpen()">
              <button class="avatar-trigger" (click)="toggleUser($event)" [attr.aria-expanded]="userOpen()">
                <span class="avatar">
                  {{ initials() }}
                  <span class="avatar-dot"></span>
                </span>
                <app-icon name="chevron-down" [size]="14" class="chev" [class.flip]="userOpen()"></app-icon>
              </button>
              <div class="dropdown-menu user-menu" *ngIf="userOpen()">
                <div class="user-card">
                  <span class="avatar lg">{{ initials() }}</span>
                  <div class="user-card-text">
                    <div class="user-name">{{ auth.user()?.name }}</div>
                    <div class="user-email">{{ auth.user()?.email }}</div>
                  </div>
                  <span class="role-pill" [class.admin]="auth.isAdmin()">{{ auth.user()?.role }}</span>
                </div>
                <div class="menu-divider"></div>
                <a routerLink="/dashboard" class="menu-item" (click)="closeAll()">
                  <app-icon name="chart" [size]="16"></app-icon>
                  <span class="menu-item-text">{{ 'dashboard' | t }}</span>
                </a>
                <a routerLink="/profile" class="menu-item" (click)="closeAll()">
                  <app-icon name="user" [size]="16"></app-icon>
                  <span class="menu-item-text">{{ 'profile' | t }}</span>
                </a>
                <a *ngIf="auth.isAdmin()" routerLink="/admin" class="menu-item" (click)="closeAll()">
                  <app-icon name="shield" [size]="16"></app-icon>
                  <span class="menu-item-text">{{ 'admin' | t }}</span>
                </a>
                <div class="menu-divider"></div>
                <button class="menu-item danger" (click)="logout()">
                  <app-icon name="logout" [size]="16"></app-icon>
                  <span class="menu-item-text">{{ 'logout' | t }}</span>
                </button>
              </div>
            </div>
          </ng-container>
          <ng-template #loggedOut>
            <a routerLink="/login" class="btn-ghost btn-sm hide-sm">{{ 'login' | t }}</a>
            <a routerLink="/register" class="btn btn-sm">{{ 'register' | t }}</a>
          </ng-template>

          <!-- Mobile toggle -->
          <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-label="Menu">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" [size]="22"></app-icon>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <div class="m-backdrop" [class.show]="menuOpen()" (click)="closeMenu()"></div>
    <aside class="m-drawer" [class.open]="menuOpen()" [attr.aria-hidden]="!menuOpen()">
      <div class="m-head">
        <a routerLink="/" class="brand" (click)="closeAll()">
          <span class="brand-mark"><span class="chinese">学</span></span>
          <span class="brand-title">{{ 'appName' | t }}</span>
        </a>
        <button class="icon-btn" (click)="closeMenu()" aria-label="Close">
          <app-icon name="close" [size]="20"></app-icon>
        </button>
      </div>

      <div *ngIf="auth.isLogged()" class="m-user">
        <span class="avatar lg">{{ initials() }}</span>
        <div>
          <div class="user-name">{{ auth.user()?.name }}</div>
          <div class="user-email">{{ auth.user()?.email }}</div>
        </div>
      </div>

      <nav class="m-nav">
        <ng-container *ngIf="auth.isLogged(); else mPublic">
          <a routerLink="/dashboard" routerLinkActive="active" class="m-link" (click)="closeMenu()">
            <app-icon name="chart" [size]="18"></app-icon> <span>{{ 'dashboard' | t }}</span>
          </a>
          <a routerLink="/lessons" routerLinkActive="active" class="m-link" (click)="closeMenu()">
            <app-icon name="book" [size]="18"></app-icon> <span>{{ 'lessons' | t }}</span>
          </a>
          <a routerLink="/vocabulary" routerLinkActive="active" class="m-link" (click)="closeMenu()">
            <app-icon name="list" [size]="18"></app-icon> <span>{{ 'vocabulary' | t }}</span>
          </a>
          <a routerLink="/profile" routerLinkActive="active" class="m-link" (click)="closeMenu()">
            <app-icon name="user" [size]="18"></app-icon> <span>{{ 'profile' | t }}</span>
          </a>
          <a *ngIf="auth.isAdmin()" routerLink="/admin" routerLinkActive="active" class="m-link" (click)="closeMenu()">
            <app-icon name="shield" [size]="18"></app-icon> <span>{{ 'admin' | t }}</span>
          </a>
        </ng-container>
        <ng-template #mPublic>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="m-link" (click)="closeMenu()">
            <app-icon name="home" [size]="18"></app-icon> <span>{{ 'home' | t }}</span>
          </a>
          <a routerLink="/lessons" routerLinkActive="active" class="m-link" (click)="closeMenu()">
            <app-icon name="book" [size]="18"></app-icon> <span>{{ 'lessons' | t }}</span>
          </a>
        </ng-template>
      </nav>

      <div class="m-section">
        <div class="menu-label">{{ 'language' | t }}</div>
        <div class="lang-row">
          <button *ngFor="let l of langs"
                  class="lang-pill"
                  [class.active]="i18n.lang() === l.code"
                  (click)="setLang(l.code)">{{ l.code.toUpperCase() }}</button>
        </div>
      </div>

      <div class="m-foot">
        <ng-container *ngIf="auth.isLogged(); else mLoggedOut">
          <button class="btn-light" style="width: 100%;" (click)="logout()">
            <app-icon name="logout" [size]="16"></app-icon> {{ 'logout' | t }}
          </button>
        </ng-container>
        <ng-template #mLoggedOut>
          <a routerLink="/login" class="btn-light" style="flex:1; justify-content:center;" (click)="closeMenu()">{{ 'login' | t }}</a>
          <a routerLink="/register" class="btn" style="flex:1; justify-content:center;" (click)="closeMenu()">{{ 'register' | t }}</a>
        </ng-template>
      </div>
    </aside>
  `,
  styles: [`
    /* ─── Bar ─── */
    .nav {
      position: sticky; top: 0; z-index: 50;
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: saturate(180%) blur(14px);
      -webkit-backdrop-filter: saturate(180%) blur(14px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    .nav.scrolled {
      background: rgba(255, 255, 255, 0.92);
      border-bottom-color: var(--border);
      box-shadow: 0 1px 0 rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04);
    }
    .nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0.7rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      height: 64px;
    }

    /* ─── Brand ─── */
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--text);
      text-decoration: none;
      flex-shrink: 0;
    }
    .brand:hover { text-decoration: none; }
    .brand-mark {
      width: 36px; height: 36px;
      display: inline-flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 55%, #5d1a14 100%);
      color: #fff;
      border-radius: 10px;
      font-weight: 700;
      box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset, 0 4px 12px rgba(185, 52, 42, 0.28);
      position: relative;
      overflow: hidden;
    }
    .brand-mark::after {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 60%);
      pointer-events: none;
    }
    .brand-mark .chinese { font-size: 1.25rem; position: relative; z-index: 1; }
    .brand-title { font-weight: 700; font-size: 0.98rem; letter-spacing: -0.01em; }

    /* ─── Center nav ─── */
    .nav-links {
      display: flex;
      gap: 0.15rem;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      background: rgba(15, 23, 42, 0.03);
      border-radius: 999px;
      max-width: 540px;
      margin: 0 auto;
    }
    .nav-link {
      position: relative;
      display: inline-flex; align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-muted);
      text-decoration: none;
      border-radius: 999px;
      transition: color 0.18s, background 0.18s, transform 0.18s;
    }
    .nav-link:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.7);
      text-decoration: none;
    }
    .nav-link.active {
      color: var(--text);
      background: #fff;
      box-shadow: 0 1px 0 rgba(15, 23, 42, 0.05), 0 2px 6px rgba(15, 23, 42, 0.06);
    }
    .nav-link.active::before {
      content: '';
      position: absolute;
      bottom: -2px; left: 50%;
      width: 4px; height: 4px;
      background: var(--primary);
      border-radius: 50%;
      transform: translate(-50%, 8px);
    }

    /* ─── Actions ─── */
    .nav-actions { display: flex; gap: 0.4rem; align-items: center; flex-shrink: 0; }

    /* Icon buttons */
    .icon-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      padding: 0.5rem 0.65rem;
      background: transparent;
      color: var(--text-muted);
      border: 1px solid transparent;
      border-radius: 10px;
      font-size: 0.82rem;
      font-weight: 500;
      transition: all 0.15s;
      position: relative;
    }
    .icon-btn:hover { background: rgba(15, 23, 42, 0.05); color: var(--text); }

    /* Language trigger */
    .lang-trigger .lang-code { font-weight: 600; letter-spacing: 0.04em; color: var(--text); font-size: 0.78rem; }
    .chev { transition: transform 0.2s; opacity: 0.7; }
    .chev.flip { transform: rotate(180deg); }

    /* Avatar trigger */
    .avatar-trigger {
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0.2rem 0.4rem 0.2rem 0.2rem;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 999px;
      transition: all 0.15s;
    }
    .avatar-trigger:hover { background: rgba(15, 23, 42, 0.04); border-color: var(--border-strong); }
    .avatar {
      width: 32px; height: 32px;
      display: inline-flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #fff;
      border-radius: 50%;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      position: relative;
      flex-shrink: 0;
    }
    .avatar.lg { width: 44px; height: 44px; font-size: 0.95rem; }
    .avatar-dot {
      position: absolute;
      bottom: -1px; inset-inline-end: -1px;
      width: 10px; height: 10px;
      background: #22c55e;
      border: 2px solid #fff;
      border-radius: 50%;
    }

    /* ─── Dropdown ─── */
    .dropdown { position: relative; }
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      inset-inline-end: 0;
      min-width: 240px;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06);
      padding: 0.4rem;
      animation: dropIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 60;
    }
    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-6px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .menu-label {
      padding: 0.45rem 0.7rem 0.3rem;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--text-soft);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      width: 100%;
      padding: 0.55rem 0.7rem;
      background: transparent;
      border: 0;
      border-radius: 8px;
      color: var(--text);
      font-size: 0.88rem;
      font-weight: 500;
      text-align: start;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.12s;
    }
    .menu-item:hover { background: var(--bg-alt); color: var(--text); text-decoration: none; }
    .menu-item.active { background: var(--primary-light); color: var(--primary); }
    .menu-item.danger { color: #b91c1c; }
    .menu-item.danger:hover { background: #fee2e2; }
    .menu-item-text { flex: 1; display: flex; flex-direction: column; line-height: 1.2; }
    .menu-item-title { font-weight: 500; }
    .menu-item-sub { font-size: 0.72rem; color: var(--text-muted); margin-top: 1px; }
    .menu-divider { height: 1px; background: var(--border); margin: 0.35rem 0; }
    .check { color: var(--primary); }

    /* Lang menu specific */
    .lang-menu { min-width: 220px; }
    .lang-tag {
      width: 32px; height: 24px;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--bg-alt);
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--text);
    }
    .menu-item.active .lang-tag { background: #fff; }

    /* User menu */
    .user-menu { min-width: 280px; }
    .user-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.7rem 0.85rem;
      position: relative;
    }
    .user-card-text { flex: 1; min-width: 0; }
    .user-name { font-weight: 600; font-size: 0.92rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-email { font-size: 0.78rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .role-pill {
      position: absolute;
      top: 0.45rem; inset-inline-end: 0.5rem;
      padding: 0.15rem 0.45rem;
      background: var(--bg-alt);
      color: var(--text-muted);
      border-radius: 999px;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .role-pill.admin { background: var(--primary-light); color: var(--primary); }

    /* Buttons */
    .btn-ghost {
      background: transparent;
      color: var(--text);
      border: 1px solid transparent;
    }
    .btn-ghost:hover { background: var(--bg-alt); }

    /* Mobile toggle */
    .menu-toggle {
      display: none;
      background: transparent;
      color: var(--text);
      padding: 0.45rem;
      border: 1px solid var(--border);
      border-radius: 10px;
    }
    .menu-toggle:hover { background: var(--bg-alt); }

    /* ─── Mobile drawer ─── */
    .m-backdrop {
      position: fixed; inset: 0;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(4px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.22s;
      z-index: 70;
    }
    .m-backdrop.show { opacity: 1; pointer-events: auto; }
    .m-drawer {
      position: fixed;
      top: 0; bottom: 0;
      right: 0;
      width: 320px; max-width: 88vw;
      background: #fff;
      box-shadow: -8px 0 32px rgba(15, 23, 42, 0.12);
      transform: translateX(105%);
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 80;
      display: flex; flex-direction: column;
    }
    .m-drawer.open { transform: translateX(0); }

    /* RTL: anchor to left, slide from the left.
       :host-context is required because [dir="rtl"] sits on <html>,
       outside this component's view-encapsulation scope. */
    :host-context([dir="rtl"]) .m-drawer {
      right: auto;
      left: 0;
      transform: translateX(-105%);
      box-shadow: 8px 0 32px rgba(15, 23, 42, 0.12);
    }
    :host-context([dir="rtl"]) .m-drawer.open { transform: translateX(0); }
    .m-head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 1.1rem;
      border-bottom: 1px solid var(--border);
    }
    .m-user {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 1rem 1.1rem;
      background: var(--bg-alt);
    }
    .m-user .user-name { font-weight: 600; }
    .m-nav { padding: 0.5rem; display: flex; flex-direction: column; gap: 0.15rem; }
    .m-link {
      display: flex; align-items: center; gap: 0.7rem;
      padding: 0.7rem 0.85rem;
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
      border-radius: 10px;
      transition: all 0.15s;
    }
    .m-link:hover { background: var(--bg-alt); color: var(--text); text-decoration: none; }
    .m-link.active { background: var(--primary-light); color: var(--primary); }
    .m-section { padding: 0.5rem 1.1rem 1rem; margin-top: auto; border-top: 1px solid var(--border); }
    .lang-row { display: flex; gap: 0.4rem; margin-top: 0.4rem; }
    .lang-pill {
      flex: 1;
      padding: 0.5rem 0.65rem;
      background: var(--bg-alt);
      border: 1px solid transparent;
      color: var(--text-muted);
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .lang-pill:hover { background: #fff; border-color: var(--border-strong); color: var(--text); }
    .lang-pill.active {
      background: var(--primary-light);
      border-color: var(--primary);
      color: var(--primary);
    }
    .m-foot {
      padding: 0.85rem 1.1rem 1.1rem;
      border-top: 1px solid var(--border);
      display: flex; gap: 0.5rem;
    }

    /* ─── Responsive ─── */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .menu-toggle { display: inline-flex; }
      .lang-trigger { display: none; }
      .hide-sm { display: none; }
    }
    @media (max-width: 480px) {
      .nav-inner { padding: 0.7rem 0.9rem; gap: 0.5rem; }
      .brand-title { display: none; }
      .avatar-trigger .chev { display: none; }
    }
  `]
})
export class NavbarComponent {
  langs: LangOption[] = [
    { code: 'fr', label: 'Français', native: 'Français' },
    { code: 'en', label: 'English',  native: 'English' },
    { code: 'ar', label: 'العربية',  native: 'Arabic' }
  ];

  menuOpen = signal(false);
  langOpen = signal(false);
  userOpen = signal(false);
  scrolled = signal(false);

  constructor(
    public auth: AuthService,
    public i18n: I18nService,
    private router: Router,
    private host: ElementRef
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeAll());
  }

  currentLang(): LangOption {
    return this.langs.find((l) => l.code === this.i18n.lang()) || this.langs[0];
  }

  initials(): string {
    const n = this.auth.user()?.name || '';
    return n.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  }

  toggleMenu(): void { this.menuOpen.update((v) => !v); }
  closeMenu(): void { this.menuOpen.set(false); }

  toggleLang(e: Event): void { e.stopPropagation(); this.userOpen.set(false); this.langOpen.update((v) => !v); }
  toggleUser(e: Event): void { e.stopPropagation(); this.langOpen.set(false); this.userOpen.update((v) => !v); }
  closeAll(): void { this.menuOpen.set(false); this.langOpen.set(false); this.userOpen.set(false); }

  setLang(l: Lang): void {
    this.i18n.setLang(l);
    this.langOpen.set(false);
    this.menuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.closeAll();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target)) {
      this.langOpen.set(false);
      this.userOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.closeAll(); }

  @HostListener('window:scroll')
  onScroll(): void { this.scrolled.set(window.scrollY > 8); }
}
