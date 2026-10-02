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

export type CalendarEventType =
  | 'UPSC_CORE'
  | 'RPSC_RAJASTHAN'
  | 'SPACED_REVISION'
  | 'MOCK_TEST'
  | 'EXAM_COUNTDOWN'
  | 'CURRENT_AFFAIRS';

export interface CalendarEvent {
  id: string;
  title: string;
  titleHindi?: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  type: CalendarEventType;
  topicId?: string;
  subject?: string;
  targetHours: number;
  completed: boolean;
  notes?: string;
  spacedInterval?: 1 | 3 | 7 | 15 | 30;
  examTag?: 'UPSC' | 'RPSC' | 'DUAL';
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}

// ---------------------------------------------------------------------------
// Offline PDF Notes, Reading History & Universal Bookmarks Systems
// ---------------------------------------------------------------------------

export type CurriculumCategory =
  | 'Ancient History'
  | 'Medieval History'
  | 'Modern History'
  | 'Art & Culture'
  | 'Physical Geography'
  | 'Indian Geography'
  | 'Environment & Ecology'
  | 'Indian Polity'
  | 'Indian Economy'
  | 'General Science'
  | 'Rajasthan Special'
  | 'Defense & Security'
  | 'General Knowledge'
  | 'Uncategorized';

export interface ExtractedNote {
  id: string;
  title: string;
  sourceDocName: string;
  category: CurriculumCategory;
  targetExam: 'UPSC_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'COMMON_CORE';
  bulletPoints: string[];
  keyTerms: string[];
  examAngles: string[];
  rawSnippet: string;
  pageNumber?: number;
  createdAt: string; // ISO string
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
}

export type HistoryActivityType =
  | 'READ_NOTE'
  | 'READ_CURRICULUM_BIT'
  | 'READ_SYLLABUS_TOPIC'
  | 'ADDED_PDF_NOTE'
  | 'ATTEMPTED_QUIZ'
  | 'BOOKMARKED_ITEM'
  | 'SCHEDULED_CALENDAR';

export interface HistoryEntry {
  id: string;
  type: HistoryActivityType;
  title: string;
  subtitle: string;
  category: string;
  timestamp: string; // ISO string
  targetExam?: 'UPSC' | 'RPSC' | 'DUAL';
  metadata?: {
    topicId?: string;
    sourceName?: string;
    score?: number;
    scoreMax?: number;
    tags?: string[];
  };
}

export type BookmarkCategory =
  | 'High-Yield Revision'
  | 'Mistake Trap'
  | 'Polity & Constitution'
  | 'Geography & Environment'
  | 'History & Culture'
  | 'Economy & Schemes'
  | 'Rajasthan Special'
  | 'General Science'
  | 'Custom';

export interface UniversalBookmark {
  id: string;
  itemType: 'CURRICULUM_BIT' | 'SYLLABUS_TOPIC' | 'EXTRACTED_NOTE' | 'MISTAKE_LOG' | 'CUSTOM_SNIPPET' | 'BOOK_RESOURCE' | 'OFFICIAL_SOURCE' | 'PYQ_RESOURCE';
  itemId: string;
  title: string;
  contentSnippet: string;
  category: BookmarkCategory;
  customFolder?: string;
  subject?: string;
  targetExam: 'UPSC' | 'RPSC' | 'DUAL';
  sourceTag: string;
  notes?: string;
  bookmarkedAt: string; // ISO string
}
