
export enum AgencyId {
  NSCDC = 'nscdc',
  NCOS = 'ncos',
  NIS = 'nis',
  FFS = 'ffs',
}

export enum Subject {
  ENGLISH = 'English Language',
  MATH = 'Mathematics',
  CURRENT_AFFAIRS = 'Current Affairs',
  LOGICAL_REASONING = 'Logical Reasoning',
  AGENCY_KNOWLEDGE = 'Agency Knowledge',
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  subject: Subject;
  explanation?: string;
}

export interface Agency {
  id: AgencyId;
  name: string;
  fullName: string;
  themeColor: string;
  logo: React.ReactNode;
  isLocked: boolean;
  questionBank: Question[];
  resources: {
    title: string;
    content: string;
  }[];
}

export interface UserAnswer {
  questionId: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface PerformanceData {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  answers: UserAnswer[];
  bySubject: {
    [key in Subject]?: {
      total: number;
      correct: number;
    };
  };
}
