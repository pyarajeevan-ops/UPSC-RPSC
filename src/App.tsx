import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { SyllabusExplorerView } from './components/SyllabusExplorerView';
import { TestModeView } from './components/TestModeView';
import { MentorChatView } from './components/MentorChatView';
import { MistakeNotebookView } from './components/MistakeNotebookView';
import { SpacedRevisionView } from './components/SpacedRevisionView';
import { RajasthanVaultView } from './components/RajasthanVaultView';
import { SelfTeachCurriculum } from './components/SelfTeachCurriculum';
import { StudyCalendarView } from './components/StudyCalendarView';
import { DiagnosticModal } from './components/DiagnosticModal';
import { CommandPalette } from './components/CommandPalette';
import { ArrowLeft, Keyboard, HelpCircle, X, Compass, GraduationCap, BookOpen, Calendar, Award, BrainCircuit } from 'lucide-react';
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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [tabHistory, setTabHistory] = useState<string[]>([]);

  // Smooth Navigation: transition to tab while tracking history
  const navigateToTab = (newTab: string) => {
    if (newTab !== activeTab) {
      setTabHistory((prev) => [...prev.slice(-10), activeTab]);
      setActiveTab(newTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoBack = () => {
    if (tabHistory.length > 0) {
      const prev = tabHistory[tabHistory.length - 1];
      setTabHistory((old) => old.slice(0, -1));
      setActiveTab(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('dashboard');
    }
  };

  // Global Keyboard Shortcuts for ultra-smooth app navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, select or contenteditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Command palette: Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Alt + Left Arrow for Back
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoBack();
        return;
      }

      // Number keys for instant tab switching
      switch (e.key) {
        case '1':
          e.preventDefault();
          navigateToTab('dashboard');
          break;
        case '2':
          e.preventDefault();
          navigateToTab('curriculum');
          break;
        case '3':
          e.preventDefault();
          navigateToTab('syllabus');
          break;
        case '4':
          e.preventDefault();
          navigateToTab('calendar');
          break;
        case '5':
          e.preventDefault();
          navigateToTab('test-mode');
          break;
        case '6':
          e.preventDefault();
          navigateToTab('mentor');
          break;
        case '7':
          e.preventDefault();
          navigateToTab('mistakes');
          break;
        case '8':
          e.preventDefault();
          navigateToTab('revision');
          break;
        case '9':
          e.preventDefault();
          navigateToTab('rajasthan-vault');
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          navigateToTab('calendar');
          break;
        case '?':
          e.preventDefault();
          setIsShortcutsOpen((prev) => !prev);
          break;
        case 'Escape':
          if (isShortcutsOpen) {
            e.preventDefault();
            setIsShortcutsOpen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, tabHistory, isShortcutsOpen]);

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
        setActiveTab={navigateToTab}
        language={language}
        setLanguage={setLanguage}
        userProfile={userProfile}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        mistakeCount={mistakes.length}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Study Sanctum Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            userProfile={userProfile}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onSelectTab={navigateToTab}
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

        {activeTab === 'curriculum' && (
          <SelfTeachCurriculum
            language={language}
            userProfile={userProfile}
            onSelectTopicLesson={(lessonId) => {
              setSelectedTopicId(lessonId);
              navigateToTab('syllabus');
            }}
            onOpenSyllabusTopic={() => {
              navigateToTab('syllabus');
            }}
            onOpenCalendar={() => {
              navigateToTab('calendar');
            }}
            onOpenTestMode={() => {
              navigateToTab('test-mode');
            }}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusExplorerView
            topics={SYLLABUS_TOPICS}
            selectedTopicId={selectedTopicId}
            onSelectTopicId={setSelectedTopicId}
            language={language}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'calendar' && (
          <StudyCalendarView
            language={language}
            userProfile={userProfile}
            onSelectTopic={(topicId) => {
              setSelectedTopicId(topicId);
              navigateToTab('syllabus');
            }}
            onStartPractice={() => {
              navigateToTab('test-mode');
            }}
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

      {/* Floating Smooth Navigation Pill & Back History Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-2xl text-xs">
        {tabHistory.length > 0 && (
          <button
            onClick={handleGoBack}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-300 font-semibold transition-colors cursor-pointer group"
            title="Go back to previous view (Alt + ←)"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="capitalize">{tabHistory[tabHistory.length - 1]}</span>
          </button>
        )}

        <div className="h-3.5 w-px bg-slate-800 mx-0.5" />

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Search / Jump to view (⌘K)"
        >
          <span className="text-[11px] font-mono">⌘K</span>
        </button>

        <button
          onClick={() => setIsShortcutsOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          title="Keyboard Navigation Shortcuts (?)"
        >
          <Keyboard className="w-3.5 h-3.5 text-amber-400/80" />
          <span className="text-[11px] hidden sm:inline">Shortcuts</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      {isShortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2 font-serif text-base font-bold text-slate-100">
                <Keyboard className="w-5 h-5 text-amber-400" />
                <span>Instant Navigation Shortcuts</span>
              </div>
              <button
                onClick={() => setIsShortcutsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-400">
                Navigate between all Civil Services modules with single keystrokes without touching the mouse:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Roadmap</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">1</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Curriculum</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">2</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Syllabus Directory</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">3</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-amber-300 font-medium">Study Calendar</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">4 or C</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Test Simulator</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">5</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Mentor AI</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">6</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Error Log</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">7</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">5-3-2-1-1 Recall</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">8</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Rajasthan Layer</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">9</kbd>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Previous View</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">Alt+←</kbd>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">Quick Command Palette</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">⌘K or Ctrl+K</kbd>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsShortcutsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aspirant Diagnostic Intake Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        currentProfile={userProfile}
        onSaveProfile={(updated) => setUserProfile(updated)}
      />

      {/* Global Command Palette & Fast Navigation Modal (Ctrl+K or Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onSelectSyllabusTopic={(topicId) => {
          setSelectedTopicId(topicId);
          setActiveTab('syllabus');
        }}
        language={language}
        setLanguage={setLanguage}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
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
