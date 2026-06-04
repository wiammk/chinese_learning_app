import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';
import type { Progress } from '../models';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private http: HttpClient) {}

  get(): Observable<Progress> { return this.http.get<Progress>(`${API_URL}/progress`); }
  completeLesson(lessonId: string): Observable<Progress> {
    return this.http.post<Progress>(`${API_URL}/progress/complete/${lessonId}`, {});
  }
}
