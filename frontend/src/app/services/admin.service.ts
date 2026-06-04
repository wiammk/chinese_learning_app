import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';
import type { User } from '../models';

interface AdminStats {
  totalUsers: number;
  totalLessons: number;
  totalVocabulary: number;
  totalQuizzes: number;
  totalQuizAttempts: number;
  avgScore: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}
  users(): Observable<User[]> { return this.http.get<User[]>(`${API_URL}/admin/users`); }
  stats(): Observable<AdminStats> { return this.http.get<AdminStats>(`${API_URL}/admin/stats`); }
}
