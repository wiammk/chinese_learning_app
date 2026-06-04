import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';
import type { Quiz } from '../models';

interface QuizResultResponse {
  score: number;
  correct: number;
  total: number;
  details: { questionId: string; correctAnswer: number; given: number; correct: boolean }[];
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private http: HttpClient) {}

  list(): Observable<Quiz[]> { return this.http.get<Quiz[]>(`${API_URL}/quizzes`); }
  get(id: string): Observable<Quiz> { return this.http.get<Quiz>(`${API_URL}/quizzes/${id}`); }
  byLesson(lessonId: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${API_URL}/quizzes/by-lesson/${lessonId}`);
  }
  submit(id: string, answers: number[]): Observable<QuizResultResponse> {
    return this.http.post<QuizResultResponse>(`${API_URL}/quizzes/${id}/submit`, { answers });
  }
}
