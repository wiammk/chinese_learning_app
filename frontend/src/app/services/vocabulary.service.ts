import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';
import type { VocabularyItem } from '../models';

@Injectable({ providedIn: 'root' })
export class VocabularyService {
  constructor(private http: HttpClient) {}

  list(filters: { category?: string; q?: string } = {}): Observable<VocabularyItem[]> {
    let p = new HttpParams();
    if (filters.category) p = p.set('category', filters.category);
    if (filters.q) p = p.set('q', filters.q);
    return this.http.get<VocabularyItem[]>(`${API_URL}/vocabulary`, { params: p });
  }

  categories(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/vocabulary/categories`);
  }

  create(payload: Partial<VocabularyItem>): Observable<VocabularyItem> {
    return this.http.post<VocabularyItem>(`${API_URL}/vocabulary`, payload);
  }

  update(id: string, payload: Partial<VocabularyItem>): Observable<VocabularyItem> {
    return this.http.put<VocabularyItem>(`${API_URL}/vocabulary/${id}`, payload);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/vocabulary/${id}`);
  }
}
