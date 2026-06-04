export type Lang = 'fr' | 'en' | 'ar';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type LocalizedText = { fr: string; en: string; ar: string };

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  language: Lang;
  level: Level;
  createdAt: string;
}

export interface Word {
  chinese: string;
  pinyin: string;
  translation: LocalizedText;
  example: { chinese: string; pinyin?: string } & LocalizedText;
  audio?: string;
}

export interface Lesson {
  id: string;
  level: Level;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  category: string;
  words: Word[];
  createdAt: string;
}

export interface VocabularyItem {
  id: string;
  chinese: string;
  pinyin: string;
  category: string;
  translation: LocalizedText;
  example: { chinese: string } & LocalizedText;
}

export interface QuizQuestion {
  id: string;
  prompt: LocalizedText;
  options: string[];
  answer: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: LocalizedText;
  type: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  takenAt: string;
}

export interface ProgressStats {
  completed: number;
  totalLessons: number;
  progressPercent: number;
  avgScore: number;
  level: Level;
  nextLesson: Lesson | null;
}

export interface Progress {
  completedLessons: string[];
  quizResults: QuizResult[];
  lastLessonId: string | null;
  stats: ProgressStats;
}
