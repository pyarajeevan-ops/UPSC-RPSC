import React from 'react';
import {
  Compass,
  BookOpen,
  Award,
  BrainCircuit,
  BookmarkCheck,
  PenTool,
  MapPin,
  ExternalLink,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Flame,
  GraduationCap,
  Calendar,
  CalendarCheck,
  Library,
} from 'lucide-react';
import { UserProfile, LanguageMedium, TopicLesson, DayStudyLog } from '../types';
import { OFFICIAL_SOURCES_DIRECTORY, SYLLABUS_TOPICS } from '../data/mockSyllabus';
import { StudyProgressTracker } from './StudyProgressTracker';
import { DailyGoalSection } from './DailyGoalSection';
import { GoalReachedNotification } from './GoalReachedNotification';
import { FocusTimer } from './FocusTimer';
import { ConsistentAspirantStreak, calculateStreakStats } from './ConsistentAspirantStreak';
import { WeeklyPerformanceReport } from './WeeklyPerformanceReport';
import { TodayStudyHoursSummary } from './TodayStudyHoursSummary';
import { DailySessionNotes } from './DailySessionNotes';

interface DashboardViewProps {
  userProfile: UserProfile;
  onOpenDiagnostic: () => void;
  onSelectTab: (tab: string) => void;
  onSelectTopic: (topicId: string) => void;
  mistakeCount: number;
  language: LanguageMedium;
  completedTopicIds: string[];
  onToggleTopicCompleted: (topicId: string) => void;
  dayLogs: DayStudyLog[];
  onUpdateTodayLog: (common: number, rajasthan: number, test: number) => void;
  onUpdateDailyGoal: (newGoalHours: number) => void;
  onUpdateTodayNotes?: (notesData: { focusArea?: string; challenges?: string; notes?: string }) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  onOpenDiagnostic,
  onSelectTab,
  onSelectTopic,
  mistakeCount,
  language,
  completedTopicIds,
  onToggleTopicCompleted,
  dayLogs,
  onUpdateTodayLog,
  onUpdateDailyGoal,
  onUpdateTodayNotes,
}) => {
  const commonHours = (userProfile.studyHours * 0.7).toFixed(1);
  const rajasthanHours = (userProfile.studyHours * 0.2).toFixed(1);
  const testHours = (userProfile.studyHours * 0.1).toFixed(1);

  const todayLog = dayLogs[dayLogs.length - 1] || {
    date: new Date().toISOString().split('T')[0],
    dayLabel: 'Today',
    loggedCommonHours: 4.5,
    loggedRajasthanHours: 1.5,
    loggedTestHours: 0.8,
    completedTopicIds: [],
  };

  const streakStats = calculateStreakStats(dayLogs, userProfile.studyHours || 8);

  return (
    <div className="space-y-8 pb-12">
      {/* Daily Study Goal Reached Notification & Toast Alert */}
      <GoalReachedNotification
        userProfile={userProfile}
        todayLog={todayLog}
        onSelectTab={onSelectTab}
      />

      {/* Hero Sanctum Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-10" />
        <img
          src="/src/assets/images/hero_study_sanctum_1790483245507.jpg"
          alt="Civil Services Study Sanctum"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled graceful fallback container if asset loading fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        <div className="relative z-20 p-6 sm:p-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Dual Prelims Command Center · {userProfile.targetYear} Cycle</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight leading-tight">
            {language === 'Hindi'
              ? 'संघ लोक सेवा आयोग एवं राजस्थान प्रशासनिक सेवा की एकीकृत प्रारंभिक तैयारी'
              : 'UPSC CSE Prelims & RPSC RAS Prelims Dual Mastery'}
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'Hindi'
              ? '70% उभयनिष्ठ पाठ्यक्रम को वैचारिक गहराई से समझें, 20% राजस्थान के विशिष्ट तथ्यों पर पकड़ बनाएं, और 10% समय निरंतर परीक्षण व गलतियों के विश्लेषण में लगाएं।'
              : 'Master the 70% shared conceptual core, build the 20% state-specific Rajasthan factual fortress, and sharpen exam intuition through the 10% active test-and-error cycle.'}
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Target:</span>
              <span className="font-semibold text-amber-300">{userProfile.targetExam}</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Daily Hours:</span>
              <span className="font-semibold text-amber-300 tabular-nums">{userProfile.studyHours}h/day</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Consistency:</span>
              <span className="font-semibold text-amber-400 flex items-center gap-1 tabular-nums">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {streakStats.currentStreak}d Streak
              </span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Medium:</span>
              <span className="font-semibold text-slate-200">{userProfile.medium}</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Error Log:</span>
              <span className={`font-semibold tabular-nums ${mistakeCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {mistakeCount} entries
              </span>
            </div>

            <button
              onClick={onOpenDiagnostic}
              className="ml-auto text-amber-400 hover:text-amber-300 underline font-medium text-xs cursor-pointer"
            >
              Re-calibrate Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Visual Summary: Total Study Hours Logged Today vs Daily Target Goal with Progress Bar & Congratulatory Message */}
      <TodayStudyHoursSummary
        userProfile={userProfile}
        todayLog={todayLog}
        onUpdateTodayLog={onUpdateTodayLog}
      />

      {/* Daily Study Log Notes: Specific focus area, challenges encountered & active takeaways */}
      <DailySessionNotes
        todayLog={todayLog}
        dayLogs={dayLogs}
        userProfile={userProfile}
        onUpdateNotes={onUpdateTodayNotes || (() => {})}
      />

      {/* New UI Section: Daily Study Goal Configuration & Circular Progress Indicator */}
      <DailyGoalSection
        userProfile={userProfile}
        onUpdateDailyGoal={onUpdateDailyGoal}
        dayLogs={dayLogs}
        onUpdateTodayLog={onUpdateTodayLog}
      />

      {/* Consistent Aspirant Streak Counter: Tracking consecutive days meeting daily study goal */}
      <ConsistentAspirantStreak
        userProfile={userProfile}
        dayLogs={dayLogs}
      />

      {/* Focus Timer Component: Deep-work session tracking actual vs planned minutes */}
      <FocusTimer
        userProfile={userProfile}
        dayLogs={dayLogs}
        onUpdateTodayLog={onUpdateTodayLog}
        onSelectTopic={onSelectTopic}
      />

      {/* Weekly Performance Report: Stacked Area Chart showing study distribution (UPSC vs RPSC Core) for last 7 days */}
      <WeeklyPerformanceReport
        userProfile={userProfile}
        dayLogs={dayLogs}
      />

      {/* Visual Component: Daily Study Hours vs Target & Syllabus Topics Progress */}
      <StudyProgressTracker
        userProfile={userProfile}
        topics={SYLLABUS_TOPICS}
        completedTopicIds={completedTopicIds}
        onToggleTopicCompleted={onToggleTopicCompleted}
        onSelectTopic={onSelectTopic}
        dayLogs={dayLogs}
        onUpdateTodayLog={onUpdateTodayLog}
      />

      {/* Margdarshak 70-20-10 Preparation Architecture */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>The 70 : 20 : 10 Dual Preparation Architecture</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Scientific workload distribution balancing UPSC conceptual rigor and RPSC factual precision
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectTab('calendar')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Study Calendar</span>
              <span className="px-1.5 py-0.2 bg-purple-950 text-[10px] rounded text-purple-300 border border-purple-500/30">
                1d-30d
              </span>
            </button>

            <button
              onClick={() => onSelectTab('curriculum')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
            >
              <Library className="w-3.5 h-3.5 text-amber-400" />
              <span>Curriculum Bits Explorer</span>
              <span className="px-1.5 py-0.2 bg-amber-950 text-[10px] rounded text-amber-300 border border-amber-500/30">
                All Subjects
              </span>
            </button>

            <button
              onClick={() => onSelectTab('curriculum')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Self-Teach Track</span>
              <span className="px-1.5 py-0.2 bg-emerald-950 text-[10px] rounded text-emerald-300 border border-emerald-500/30">
                34-Wk
              </span>
            </button>

            <button
              onClick={() => onSelectTab('syllabus')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Complete Syllabus Directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Common Core */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-amber-400">Layer 1 (70%)</span>
                <span className="font-bold text-amber-300 tabular-nums">{commonHours} hrs/day</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base mb-1.5">Common UPSC-RPSC Core</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                One integrated set of notes for Polity, History, Geography, Economy, Environment, and S&T. Focus on conceptual clarity, constitutional articles, and inter-subject linkages.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Indian Polity & Governance</span>
                  <span className="text-emerald-400 font-medium">85% Overlap</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Ancient & Modern History</span>
                  <span className="text-emerald-400 font-medium">75% Overlap</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Physical & World Geography</span>
                  <span className="text-emerald-400 font-medium">65% Overlap</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('syllabus')}
              className="mt-5 w-full py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore 12-Step Core Lessons</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Rajasthan Layer */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-amber-400">Layer 2 (20%)</span>
                <span className="font-bold text-amber-300 tabular-nums">{rajasthanHours} hrs/day</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base mb-1.5">Rajasthan-Specific Layer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated state static GK, Rajasthan Economic Review, Budget, DIPR Sujas schemes, Forts & Architecture, Aravalli peak elevations, and administrative institutions (RPSC, Lokayukta).
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Rajasthan Geography & Minerals</span>
                  <span className="text-amber-400 font-medium">State Specific</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Art, Culture & Hill Forts</span>
                  <span className="text-amber-400 font-medium">State Specific</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Rajasthan Economic Review & Schemes</span>
                  <span className="text-amber-400 font-medium">State Specific</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('rajasthan-vault')}
              className="mt-5 w-full py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Open Rajasthan Knowledge Vault</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Tests & Error Analysis */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-amber-400">Layer 3 (10%)</span>
                <span className="font-bold text-amber-300 tabular-nums">{testHours} hrs/day</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base mb-1.5">Mocks, Errors & 5-3-2-1-1 Recall</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Elimination practice under timed conditions. Rigorous logging into the 8 error classifications (Misreading, Factual, Overthinking, etc.) and spaced repetition reviews.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">UPSC Mode Simulator</span>
                  <span className="text-slate-300 font-medium">Analytical / 4-Option</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">RPSC RAS Simulator</span>
                  <span className="text-slate-300 font-medium">Factual / 5-Option OMR</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Active Error Journal</span>
                  <span className="text-rose-400 font-medium">{mistakeCount} to Cure</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('test-mode')}
              className="mt-5 w-full py-2 px-3 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Launch Timed Test Simulator</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Upcoming Study Calendar & Spaced Review Radar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Upcoming Study Calendar & Spaced Review Radar</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Daily 70:20:10 slots, active recall checkpoints and countdown to preliminary exams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('calendar')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Open Full Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Tile 1: Today's Primary Focus */}
          <div
            onClick={() => onSelectTab('calendar')}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 font-semibold">
                  Today's 70% Core
                </span>
                <span className="text-slate-400 font-mono">06:30 - 09:30</span>
              </div>
              <h4 className="font-semibold text-xs text-slate-200 group-hover:text-purple-300 transition-colors">
                Constitutional Framework & Panchayati Raj
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                Articles 243 to 243-O, 11th Schedule 29 subjects, Balwant Rai Mehta to L.M. Singhvi.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-emerald-400 font-medium">✓ Completed</span>
              <span className="text-amber-400 font-semibold">3.0 hrs</span>
            </div>
          </div>

          {/* Tile 2: Rajasthan Layer Session */}
          <div
            onClick={() => onSelectTab('calendar')}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  20% Rajasthan
                </span>
                <span className="text-slate-400 font-mono">11:00 - 13:00</span>
              </div>
              <h4 className="font-semibold text-xs text-slate-200 group-hover:text-emerald-300 transition-colors">
                Rajasthan PR Act 1994 & PESA 1999
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                3-tier structure, State Election Commission (Art 243K) and State Finance Commission (Art 243I).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-amber-400 font-medium">Pending Session</span>
              <span className="text-amber-400 font-semibold">2.0 hrs</span>
            </div>
          </div>

          {/* Tile 3: Spaced Recall Checkpoint */}
          <div
            onClick={() => onSelectTab('calendar')}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/30 font-semibold">
                  Day 1 Recall
                </span>
                <span className="text-purple-400 font-mono">Tomorrow</span>
              </div>
              <h4 className="font-semibold text-xs text-slate-200 group-hover:text-purple-300 transition-colors">
                5-3-2-1-1 Active Recall Sheet
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                Recall 5 facts, 3 concepts, 2 examiner traps without consulting open notes.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-purple-400 font-medium">Spaced Interval</span>
              <span className="text-amber-400 font-semibold">1.25 hrs</span>
            </div>
          </div>

          {/* Tile 4: Exam Milestones Countdown */}
          <div
            onClick={() => onSelectTab('calendar')}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                  Exam Horizon
                </span>
                <span className="text-slate-400 text-[10px]">Official Dates</span>
              </div>
              <div className="space-y-1.5 mt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium">UPSC Prelims:</span>
                  <span className="text-blue-400 font-bold">May 24, 2026</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium">RPSC RAS Prelims:</span>
                  <span className="text-rose-400 font-bold">Aug 30, 2026</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-amber-300">Sunday Dual Mock</span>
              <span className="text-slate-500">Every 7 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Yield Topics Quick Launch */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Curated 12-Step Masterclass Topics</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any syllabus unit to study through the 12-step structured mentor sequence
            </p>
          </div>
          <button
            onClick={() => onSelectTab('syllabus')}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>View All Topics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            onClick={() => onSelectTopic('panchayati-raj-local-gov')}
            className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium mb-1.5">
              <span>[COMMON]</span>
              <span>·</span>
              <span>[RPSC EXTRA]</span>
            </div>
            <h4 className="font-semibold text-slate-200 text-xs group-hover:text-amber-300 transition-colors line-clamp-2">
              Panchayati Raj & Local Self-Government (73rd/74th CAA & Nagaur)
            </h4>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Polity & Admin</span>
              <span className="text-emerald-400 font-medium">75% Overlap</span>
            </div>
          </div>

          <div
            onClick={() => onSelectTopic('governor-and-state-executive')}
            className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium mb-1.5">
              <span>[COMMON]</span>
              <span>·</span>
              <span>[HIGH PRIORITY]</span>
            </div>
            <h4 className="font-semibold text-slate-200 text-xs group-hover:text-amber-300 transition-colors line-clamp-2">
              Governor & State Executive (Articles 153–163 & Rajasthan Nuances)
            </h4>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Constitution</span>
              <span className="text-emerald-400 font-medium">70% Overlap</span>
            </div>
          </div>

          <div
            onClick={() => onSelectTopic('rajasthan-physiography-and-drainage')}
            className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium mb-1.5">
              <span>[COMMON]</span>
              <span>·</span>
              <span>[RPSC EXTRA]</span>
            </div>
            <h4 className="font-semibold text-slate-200 text-xs group-hover:text-amber-300 transition-colors line-clamp-2">
              Physiography & River Systems (Aravalli, Thar & Chambal)
            </h4>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Geography</span>
              <span className="text-amber-400 font-medium">60% Overlap</span>
            </div>
          </div>

          <div
            onClick={() => onSelectTopic('rajasthan-minerals-and-economic-survey')}
            className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium mb-1.5">
              <span>[COMMON]</span>
              <span>·</span>
              <span>[CURRENT]</span>
            </div>
            <h4 className="font-semibold text-slate-200 text-xs group-hover:text-amber-300 transition-colors line-clamp-2">
              Minerals, Energy & Economic Survey (GSDP & Critical Mines)
            </h4>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Economy</span>
              <span className="text-amber-400 font-medium">55% Overlap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Sources Bar (Rule: Prefer Official Sources) */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-slate-200">
              Verified Official Reference Directory (Zero Hallucination Standard)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Official Gazettes & Reports</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {OFFICIAL_SOURCES_DIRECTORY.map((src) => (
            <a
              key={src.name}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 border border-slate-800/80 rounded-lg hover:border-slate-700 text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between group"
            >
              <span className="truncate">{src.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 ml-1" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
