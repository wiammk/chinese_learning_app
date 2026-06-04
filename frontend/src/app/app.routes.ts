import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.page').then(m => m.HomePage) },
  { path: 'login', loadComponent: () => import('./pages/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register.page').then(m => m.RegisterPage) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/dashboard.page').then(m => m.DashboardPage) },
  { path: 'lessons', canActivate: [authGuard], loadComponent: () => import('./pages/lessons.page').then(m => m.LessonsPage) },
  { path: 'lessons/:id', canActivate: [authGuard], loadComponent: () => import('./pages/lesson-detail.page').then(m => m.LessonDetailPage) },
  { path: 'vocabulary', canActivate: [authGuard], loadComponent: () => import('./pages/vocabulary.page').then(m => m.VocabularyPage) },
  { path: 'quiz/:id', canActivate: [authGuard], loadComponent: () => import('./pages/quiz.page').then(m => m.QuizPage) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile.page').then(m => m.ProfilePage) },
  { path: 'admin', canActivate: [authGuard, adminGuard], loadComponent: () => import('./pages/admin.page').then(m => m.AdminPage) },
  { path: '**', redirectTo: '' }
];
