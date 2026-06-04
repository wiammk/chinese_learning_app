import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';
import type { Lesson, Level } from '../models';

@Injectable({ providedIn: 'root' })
export class LessonService {
  constructor(private http: HttpClient) {}

  list(filters: { level?: Level; category?: string; q?: string } = {}): Observable<Lesson[]> {
    let p = new HttpParams();
    if (filters.level) p = p.set('level', filters.level);
    if (filters.category) p = p.set('category', filters.category);
    if (filters.q) p = p.set('q', filters.q);
    return this.http.get<Lesson[]>(`${API_URL}/lessons`, { params: p });
  }

  get(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${API_URL}/lessons/${id}`);
  }

  create(payload: Partial<Lesson>): Observable<Lesson> {
    return this.http.post<Lesson>(`${API_URL}/lessons`, payload);
  }

  update(id: string, payload: Partial<Lesson>): Observable<Lesson> {
    return this.http.put<Lesson>(`${API_URL}/lessons/${id}`, payload);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/lessons/${id}`);
  }
}
