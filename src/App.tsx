import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { SyllabusExplorerView } from './components/SyllabusExplorerView';
import { TestModeView } from './components/TestModeView';
import { MentorChatView } from './components/MentorChatView';
import { MistakeNotebookView } from './components/MistakeNotebookView';
import { SpacedRevisionView } from './components/SpacedRevisionView';
import { RajasthanVaultView } from './components/RajasthanVaultView';
import { DiagnosticModal } from './components/DiagnosticModal';
import { UserProfile, LanguageMedium, ErrorLogEntry, DayStudyLog } from './types';
import { SYLLABUS_TOPICS } from './data/mockSyllabus';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<LanguageMedium>('English');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(SYLLABUS_TOPICS[0].id);

  // User Diagnostic Profile with sensible default for a serious full-time dual aspirant
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('margdarshak_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user profile:', e);
      }
    }
    return {
      targetExam: 'Dual (UPSC + RPSC)',
      targetYear: '2026',
      attemptNumber: 1,
      studyHours: 8,
      medium: 'English',
      prepLevel: 'Intermediate',
      strongSubjects: ['Indian Polity & Constitution', 'Modern Indian History'],
      weakSubjects: ['Rajasthan Geography', 'Rajasthan Economy & Budget'],
      mainsIntegrated: true,
      preferredSchedule: 'Regular Day',
      isDiagnosticComplete: false,
    };
  });

  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(() => {
    return !userProfile.isDiagnosticComplete;
  });

  // Completed syllabus topic IDs
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('margdarshak_completed_topics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse completed topics:', e);
      }
    }
    return ['panchayati-raj-local-gov'];
  });

  // 7-day study logs
  const [dayLogs, setDayLogs] = useState<DayStudyLog[]>(() => {
    const saved = localStorage.getItem('margdarshak_day_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse day logs:', e);
      }
    }
    return [
      { date: '2026-09-20', dayLabel: 'Mon', loggedCommonHours: 5.5, loggedRajasthanHours: 1.5, loggedTestHours: 1.0, completedTopicIds: [] },
      { date: '2026-09-21', dayLabel: 'Tue', loggedCommonHours: 6.0, loggedRajasthanHours: 1.5, loggedTestHours: 0.8, completedTopicIds: [] },
      { date: '2026-09-22', dayLabel: 'Wed', loggedCommonHours: 5.0, loggedRajasthanHours: 1.8, loggedTestHours: 0.7, completedTopicIds: [] },
      { date: '2026-09-23', dayLabel: 'Thu', loggedCommonHours: 5.6, loggedRajasthanHours: 1.6, loggedTestHours: 0.8, completedTopicIds: [] },
      { date: '2026-09-24', dayLabel: 'Fri', loggedCommonHours: 6.2, loggedRajasthanHours: 1.5, loggedTestHours: 0.9, completedTopicIds: [] },
      { date: '2026-09-25', dayLabel: 'Sat', loggedCommonHours: 4.8, loggedRajasthanHours: 2.0, loggedTestHours: 1.2, completedTopicIds: [] },
      {
        date: '2026-09-26',
        dayLabel: 'Today',
        loggedCommonHours: 4.5,
        loggedRajasthanHours: 1.5,
        loggedTestHours: 0.8,
        completedTopicIds: ['panchayati-raj-local-gov'],
        focusArea: 'Panchayati Raj & State Election Commission (73rd Amendment)',
        challenges: 'Distinguishing Article 243K removal procedure (High Court Judge parity) vs appointment by Governor.',
        notes: 'Completed core Laxmikanth reading + 25 PYQs. Focus on Rajasthan 5-tier local governance structure tomorrow.',
      },
    ];
  });

  // Mistake Notebook / Error Log state with local storage persistence
  const [mistakes, setMistakes] = useState<ErrorLogEntry[]>(() => {
    const saved = localStorage.getItem('margdarshak_mistakes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse mistakes:', e);
      }
    }
    // Pre-populate with one classic example so the student understands the 8-category taxonomy immediately
    return [
      {
        id: 'initial-err-1',
        questionId: 'q-demo-1',
        questionText:
          'Consider whether the State Election Commissioner of Rajasthan can be removed by the Governor on recommendations of the Council of Ministers.',
        selectedOption: 'A (Can be removed by Governor)',
        correctOption: 'B (Only like a High Court Judge / President)',
        errorCategory: 'Factual error',
        topicTitle: 'Panchayati Raj & State Election Commission',
        subject: 'Polity & Governance',
        timestamp: new Date().toISOString(),
        candidateNotes: 'Assumed appointing authority (Governor) is also the removing authority.',
        trapIdentified: 'Article 243K(2) judicial removal safeguards.',
        mnemonic: 'SEC = High Court Judge removal security.',
      },
    ];
  });

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('margdarshak_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Sync mistakes to localStorage
  useEffect(() => {
    localStorage.setItem('margdarshak_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  // Sync completed topics to localStorage
  useEffect(() => {
    localStorage.setItem('margdarshak_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  // Sync day logs to localStorage
  useEffect(() => {
    localStorage.setItem('margdarshak_day_logs', JSON.stringify(dayLogs));
  }, [dayLogs]);

  const handleToggleTopicCompleted = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleUpdateTodayLog = (common: number, rajasthan: number, test: number) => {
    setDayLogs((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      if (lastIndex >= 0) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          loggedCommonHours: common,
          loggedRajasthanHours: rajasthan,
          loggedTestHours: test,
        };
      }
      return updated;
    });
  };

  const handleUpdateTodayNotes = (notesData: { focusArea?: string; challenges?: string; notes?: string }) => {
    setDayLogs((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      if (lastIndex >= 0) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          ...notesData,
        };
      }
      return updated;
    });
  };

  const handleUpdateDailyGoal = (newGoalHours: number) => {
    setUserProfile((prev) => ({
      ...prev,
      studyHours: newGoalHours,
    }));
  };

  const handleAddMistake = (newMistake: ErrorLogEntry) => {
    setMistakes((prev) => [newMistake, ...prev]);
  };

  const handleRemoveMistake = (id: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSelectTopicFromDashboard = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('syllabus');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/25 selection:text-amber-200">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        userProfile={userProfile}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        mistakeCount={mistakes.length}
      />

      {/* Main Study Sanctum Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            userProfile={userProfile}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onSelectTab={setActiveTab}
            onSelectTopic={handleSelectTopicFromDashboard}
            mistakeCount={mistakes.length}
            language={language}
            completedTopicIds={completedTopicIds}
            onToggleTopicCompleted={handleToggleTopicCompleted}
            dayLogs={dayLogs}
            onUpdateTodayLog={handleUpdateTodayLog}
            onUpdateDailyGoal={handleUpdateDailyGoal}
            onUpdateTodayNotes={handleUpdateTodayNotes}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusExplorerView
            topics={SYLLABUS_TOPICS}
            selectedTopicId={selectedTopicId}
            onSelectTopicId={setSelectedTopicId}
            language={language}
          />
        )}

        {activeTab === 'test-mode' && (
          <TestModeView
            onAddMistake={handleAddMistake}
            language={language}
          />
        )}

        {activeTab === 'mentor' && (
          <MentorChatView
            userProfile={userProfile}
            language={language}
            onAddMistake={handleAddMistake}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeNotebookView
            mistakes={mistakes}
            onRemoveMistake={handleRemoveMistake}
            onSelectTopic={handleSelectTopicFromDashboard}
          />
        )}

        {activeTab === 'revision' && (
          <SpacedRevisionView />
        )}

        {activeTab === 'rajasthan-vault' && (
          <RajasthanVaultView language={language} />
        )}
      </main>

      {/* Aspirant Diagnostic Intake Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        currentProfile={userProfile}
        onSaveProfile={(updated) => setUserProfile(updated)}
      />

      {/* Scholarly Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            मार्गदर्शक Margdarshak · Integrated UPSC CSE & RPSC RAS Prelims Mentorship
          </div>
          <div className="text-[11px] text-slate-400">
            Syllabus Standards: upsc.gov.in · rpsc.rajasthan.gov.in · PIB · Rajasthan Economic Review
          </div>
        </div>
      </footer>
    </div>
  );
}
