import { Injectable, signal } from '@angular/core';
import type { Lang } from '../models';
import { TRANSLATIONS } from '../assets-inline/translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>((localStorage.getItem('lang') as Lang) || 'fr');

  setLang(l: Lang): void {
    this.lang.set(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }

  t(key: string): string {
    const dict = TRANSLATIONS[this.lang()] || TRANSLATIONS['fr'];
    return dict[key] || key;
  }

  pick<T extends { fr: string; en: string; ar: string }>(obj: T): string {
    return obj[this.lang()] || obj.fr;
  }

  constructor() {
    document.documentElement.lang = this.lang();
    document.documentElement.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
  }
}
