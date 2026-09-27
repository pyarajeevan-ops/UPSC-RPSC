export type ExamType = 'UPSC' | 'RPSC' | 'MIXED';

export type LanguageMedium = 'English' | 'Hindi' | 'Bilingual';

export type ContentTag = 'COMMON' | 'UPSC EXTRA' | 'RPSC EXTRA' | 'CURRENT' | 'HIGH PRIORITY' | 'REVISION';

export type ErrorCategory =
  | 'Conceptual error'
  | 'Factual error'
  | 'Misreading'
  | 'Guessing error'
  | 'Poor elimination'
  | 'Time-management error'
  | 'Overthinking'
  | 'Current-affairs gap';

export interface UserProfile {
  targetExam: 'UPSC CSE' | 'RPSC RAS' | 'Dual (UPSC + RPSC)';
  targetYear: '2026' | '2027';
  attemptNumber: number;
  studyHours: number;
  medium: LanguageMedium;
  prepLevel: 'Beginner' | 'Intermediate' | 'Advanced (Given Prelims)';
  strongSubjects: string[];
  weakSubjects: string[];
  mainsIntegrated: boolean;
  preferredSchedule: 'Early Morning' | 'Regular Day' | 'Night Owl' | 'Working Professional Modular';
  isDiagnosticComplete: boolean;
}

export interface PyqItem {
  exam: string;
  year: number;
  questionBrief: string;
  takeaway: string;
  optionsSummary?: string;
  correctAnswer?: string;
}

export interface PracticeQuestion {
  id: string;
  examType: 'UPSC' | 'RPSC' | 'MIXED';
  subject: string;
  topicId: string;
  text: string;
  textHindi?: string;
  options: string[];
  optionsHindi?: string[];
  correctOption: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  explanations: string[];
  concept: string;
  trap: string;
  eliminationTactic: string;
  mnemonic: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  cognitiveSkill: 'Analytical' | 'Factual' | 'Chronology' | 'Elimination' | 'Assertion-Reason';
}

export interface StepRevisionSummary {
  microNotes: string;
  comparisonTable: Array<{ parameter: string; upscCore: string; rajasthanLayer: string }>;
  memoryAid: string;
}

export interface SpacedScheduleStage {
  day1: string;
  day3: string;
  day7: string;
  day15: string;
  day30: string;
}

export interface TopicLesson {
  id: string;
  title: string;
  titleHindi: string;
  subject: string;
  tags: ContentTag[];
  estimatedHours: number;
  overlapPercentage: number; // e.g. 70 means 70% common core
  
  // The 12 mandatory teaching steps
  syllabusLocation: string;
  whyMattersUPSC: string;
  whyMattersRPSC: string;
  coreConcept: string;
  importantFacts: string[];
  upscRpscOverlap: string;
  rajasthanSpecificAdditions: string[];
  commonMisconceptionsAndTraps: string[];
  pyqLinkage: PyqItem[];
  practiceQuestions: PracticeQuestion[];
  revisionSummary: StepRevisionSummary;
  spacedRevisionSchedule: SpacedScheduleStage;
}

export interface ErrorLogEntry {
  id: string;
  questionId: string;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  errorCategory: ErrorCategory;
  topicTitle: string;
  subject: string;
  timestamp: string;
  candidateNotes?: string;
  trapIdentified: string;
  mnemonic: string;
}

export interface ActiveRecallCard {
  id: string;
  topicId: string;
  topicTitle: string;
  subject: string;
  intervalDays: 1 | 3 | 7 | 15 | 30;
  dueDate: string;
  completed: boolean;
  recallContent: {
    fiveFacts: string[];
    threeConcepts: string[];
    twoTraps: string[];
    probableUPSCQuestion: string;
    probableRPSCQuestion: string;
  };
}

export interface StudyPlanSlot {
  time: string;
  subject: string;
  layer: 'Common Core (70%)' | 'Rajasthan Layer (20%)' | 'Test & Error Analysis (10%)';
  topic: string;
  primarySource: string;
  activeRecallTask: string;
  mcqTarget: number;
}

export interface DayStudyLog {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  loggedCommonHours: number;
  loggedRajasthanHours: number;
  loggedTestHours: number;
  completedTopicIds: string[];
  focusArea?: string;
  challenges?: string;
  notes?: string;
}
