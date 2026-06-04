import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({ name: 't', standalone: true, pure: false })
export class TPipe implements PipeTransform {
  constructor(private i18n: I18nService) {}
  transform(key: string): string { return this.i18n.t(key); }
}

@Pipe({ name: 'localized', standalone: true, pure: false })
export class LocalizedPipe implements PipeTransform {
  constructor(private i18n: I18nService) {}
  transform(value: { fr: string; en: string; ar: string } | null | undefined): string {
    if (!value) return '';
    return this.i18n.pick(value);
  }
}
