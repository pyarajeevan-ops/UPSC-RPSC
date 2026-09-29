import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Compass,
  Clock,
  Calendar,
  Layers,
  Award,
  ArrowRight,
  BookMarked,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Target,
  FileText,
  RotateCcw,
  CheckSquare,
  Square,
  Search,
  X,
  Bookmark,
  Library
} from 'lucide-react';
import {
  SELF_TEACH_PHASES_DATA,
  SelfTeachPhase,
  SelfTeachModule,
  DAILY_TIMETABLE_PRESETS,
  SELF_TEACH_STRATEGY_RULES
} from '../data/selfTeachCurriculumData';
import { CurriculumKnowledgeVault } from './CurriculumKnowledgeVault';
import { LanguageMedium, UserProfile } from '../types';

interface SelfTeachCurriculumProps {
  language: LanguageMedium;
  userProfile?: UserProfile;
  onSelectTopicLesson?: (lessonId: string) => void;
  onOpenSyllabusTopic?: (topicCode: string) => void;
  onOpenCalendar?: () => void;
  onOpenTestMode?: () => void;
}

export const SelfTeachCurriculum: React.FC<SelfTeachCurriculumProps> = ({
  language,
  userProfile,
  onSelectTopicLesson,
  onOpenSyllabusTopic,
  onOpenCalendar,
  onOpenTestMode,
}) => {
  // Curriculum Mode: 'roadmap' (34-week phase breakdown) vs 'knowledge-vault' (deep micro-bits explorer)
  const [curriculumViewMode, setCurriculumViewMode] = useState<'roadmap' | 'knowledge-vault'>('knowledge-vault');

  // Active Phase Selector
  const [selectedPhaseId, setSelectedPhaseId] = useState<'phase-1' | 'phase-2' | 'phase-3' | 'phase-4'>('phase-1');
  // Expanded module details accordion
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('mod-polity-core');
  // Timetable hours preset (default based on userProfile or 8h)
  const defaultHours = userProfile?.studyHours ? (userProfile.studyHours >= 10 ? 10 : userProfile.studyHours >= 8 ? 8 : 6) : 8;
  const [selectedTimetableHours, setSelectedTimetableHours] = useState<number>(defaultHours);

  // Completed modules tracking with localStorage persistence
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('margdarshak_self_teach_modules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse completed self-teach modules:', e);
      }
    }
    return ['mod-polity-core'];
  });

  // Completed checklist items tracking
  const [completedChecklistItems, setCompletedChecklistItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('margdarshak_self_teach_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse checklist items:', e);
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('margdarshak_self_teach_modules', JSON.stringify(completedModuleIds));
  }, [completedModuleIds]);

  useEffect(() => {
    localStorage.setItem('margdarshak_self_teach_checklist', JSON.stringify(completedChecklistItems));
  }, [completedChecklistItems]);

  // Calendar auto-schedule tracking
  const [scheduledModuleIds, setScheduledModuleIds] = useState<string[]>([]);
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  const handleScheduleModuleInCalendar = async (mod: SelfTeachModule) => {
    try {
      setScheduledModuleIds((prev) => [...prev, mod.id]);
      const res = await fetch('/api/calendar/auto-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'curriculum-module',
          moduleTitle: mod.title,
          subject: mod.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'Rajasthan Layer' : 'Common Core',
          examTag: mod.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
          days: mod.dailyBreakdown.map((d) => ({
            dayNumber: d.dayNumber,
            focus: d.focus,
            actionableTask: d.actionableTask,
          })),
        }),
      });
      if (res.ok) {
        setCalendarToast(`Scheduled 5-Day Study Plan for "${mod.title}" into your Study Calendar!`);
        setTimeout(() => setCalendarToast(null), 4500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleModuleCompleted = (moduleId: string) => {
    setCompletedModuleIds((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const toggleChecklistItem = (itemKey: string) => {
    setCompletedChecklistItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const currentPhase = SELF_TEACH_PHASES_DATA.find((p) => p.id === selectedPhaseId) || SELF_TEACH_PHASES_DATA[0];

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'COMPLETED'>('ALL');
  const [showMasterguide, setShowMasterguide] = useState(false);

  // Filtered modules for the active phase or global search
  const displayedModules = React.useMemo(() => {
    let mods = currentPhase.modules;
    if (categoryFilter === 'COMMON_CORE') {
      mods = mods.filter((m) => m.targetExam === 'COMMON_CORE');
    } else if (categoryFilter === 'RAJASTHAN_EXCLUSIVE') {
      mods = mods.filter((m) => m.targetExam === 'RAJASTHAN_EXCLUSIVE');
    } else if (categoryFilter === 'COMPLETED') {
      mods = mods.filter((m) => completedModuleIds.includes(m.id));
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      mods = mods.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.titleHindi.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q) ||
          m.requiredReadings.some((r) => r.book.toLowerCase().includes(q) || r.chapters.toLowerCase().includes(q))
      );
    }
    return mods;
  }, [currentPhase, categoryFilter, searchQuery, completedModuleIds]);

  // Total modules calculation
  const totalModulesCount = SELF_TEACH_PHASES_DATA.reduce((acc, p) => acc + p.modules.length, 0);
  const totalCompletedCount = completedModuleIds.length;
  const overallProgressPercentage = Math.round((totalCompletedCount / totalModulesCount) * 100);

  const activeTimetable = DAILY_TIMETABLE_PRESETS[selectedTimetableHours] || DAILY_TIMETABLE_PRESETS[8];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Calendar Scheduled Toast Banner */}
      {calendarToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-purple-500 text-slate-950 font-semibold shadow-2xl border border-purple-400 text-xs animate-fade-in">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{calendarToast}</span>
        </div>
      )}

      {/* Top Banner: Self-Teach Curriculum Mission */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Self-Taught Civil Services Roadmap
              </span>
              <span className="text-xs text-slate-500">· Zero Coaching Dependency</span>
              <span className="text-xs text-slate-500">· 34-Week Dual Masterplan</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
              The Self-Teach Curriculum & Study Syllabus Track
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              A comprehensive, week-by-week self-study curriculum engineered specifically for simultaneous UPSC CSE & RPSC RAS preparation.
              Master the exact textbooks, standard chapters, daily breakdowns, and self-assessment milestones without coaching confusion.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Target className="w-4 h-4 text-amber-400" />
                <span>34 Weeks Total</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>14 Comprehensive Modules</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>~1,070 Hours Total Self-Study</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shrink-0 min-w-[240px] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Curriculum Progress</span>
              <span className="text-base font-bold text-amber-400 tabular-nums">
                {overallProgressPercentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{totalCompletedCount} of {totalModulesCount} Modules Mastered</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Knowledge Vault (Every bit explorer) vs 34-Week Timeline Track */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setCurriculumViewMode('knowledge-vault')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                curriculumViewMode === 'knowledge-vault'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>Explore Every Bit (Knowledge Vault)</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                curriculumViewMode === 'knowledge-vault' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                Deep Dive
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurriculumViewMode('roadmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                curriculumViewMode === 'roadmap'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>34-Week Curriculum Track</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                curriculumViewMode === 'roadmap' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                4 Phases
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            {curriculumViewMode === 'knowledge-vault'
              ? 'Micro-synthesized knowledge modules, exam traps & 1-click spaced repetition'
              : 'Full 34-week textbook syllabus progression & daily timetables'}
          </div>
        </div>
      </div>

      {curriculumViewMode === 'knowledge-vault' ? (
        <CurriculumKnowledgeVault
          language={language}
          userProfile={userProfile}
          onOpenCalendar={onOpenCalendar}
          onOpenTestMode={onOpenTestMode}
          onOpenSyllabus={onOpenSyllabusTopic ? () => onOpenSyllabusTopic('panchayati-raj-local-gov') : undefined}
        />
      ) : (
        <>
          {/* 4-Phase Stepper Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SELF_TEACH_PHASES_DATA.map((phase) => {
          const isSelected = selectedPhaseId === phase.id;
          const completedInPhase = phase.modules.filter((m) => completedModuleIds.includes(m.id)).length;
          const phaseProgress = Math.round((completedInPhase / phase.modules.length) * 100);

          return (
            <button
              key={phase.id}
              onClick={() => {
                setSelectedPhaseId(phase.id);
                setExpandedModuleId(phase.modules[0]?.id || null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/40'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    Phase {phase.number} • {phase.duration.split(' ')[0]} {phase.duration.split(' ')[1]}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                    {completedInPhase}/{phase.modules.length}
                  </span>
                </div>

                <div className={`font-serif font-bold text-sm sm:text-base leading-snug ${
                  isSelected ? 'text-slate-100' : 'text-slate-300'
                }`}>
                  {phase.title}
                </div>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {phase.subtitle}
                </p>
              </div>

              {/* Phase Progress Bar */}
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-amber-400' : 'bg-slate-700'
                  }`}
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Phase Overview & Module List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Phase Modules (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Phase {currentPhase.number} Syllabus Curriculum
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-100 mt-0.5">
                  {currentPhase.title}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 tabular-nums">
                {currentPhase.duration} • {currentPhase.totalHoursEst} Hours
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentPhase.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs flex items-start gap-2.5">
              <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Phase Target Outcome: </span>
                <span className="text-slate-300">{currentPhase.targetOutcome}</span>
              </div>
            </div>

            {/* Masterguide Toggle Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowMasterguide(!showMasterguide)}
                className="w-full p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>The Self-Taught Aspirant Strategy Blueprint (NCERTs, Newspaper & 1-3-7-30 Formula)</span>
                </div>
                {showMasterguide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Collapsible Strategy Masterguide */}
            {showMasterguide && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3.5 text-xs animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>1-3-7-30 Spaced Retention Method</span>
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Revise on Day 1 (15m before bed), Day 3 (solve 10 PYQs), Day 7 (write 1 model answer), and Day 30 (flashcards). Prevents cognitive decay without hours of re-reading.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>45-Min Strict Newspaper Filter</span>
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Read strictly for GS Paper alignment: SC judgements, Parliamentary bills, RBI policy, Sujas Rajasthan magazine. Skip political squabbles and crime blotters.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                      <BookMarked className="w-3.5 h-3.5" />
                      <span>NCERT Foundation Principle</span>
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Never take notes on 1st read. 2nd read: highlight syllabus terms. 3rd read: consolidate into a single index card per chapter.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Dual Answer Writing Formula</span>
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      RPSC RAS rewards bullet points, dates, act numbers, and geographical facts. UPSC CSE rewards multi-dimensional constitutional analysis and balanced way-forward.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search curriculum modules..."
                className="w-full pl-9 pr-8 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none text-xs">
              {[
                { id: 'ALL', label: 'All Units' },
                { id: 'COMMON_CORE', label: 'Common Core 70%' },
                { id: 'RAJASTHAN_EXCLUSIVE', label: 'Rajasthan 20%' },
                { id: 'COMPLETED', label: 'Completed' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setCategoryFilter(pill.id as any)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    categoryFilter === pill.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modules Accordion / List */}
          <div className="space-y-3">
            {displayedModules.map((mod, index) => {
              const isExpanded = expandedModuleId === mod.id;
              const isCompleted = completedModuleIds.includes(mod.id);

              return (
                <div
                  key={mod.id}
                  className={`bg-slate-900 border rounded-2xl transition-all overflow-hidden ${
                    isCompleted
                      ? 'border-emerald-500/40 bg-slate-900/90'
                      : isExpanded
                      ? 'border-amber-500/50 shadow-md'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Module Card Header */}
                  <div
                    onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleCompleted(mod.id);
                        }}
                        className={`mt-1 p-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          isCompleted
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : 'text-slate-500 hover:text-slate-300 bg-slate-950'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {isCompleted ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <span className="font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            Unit {index + 1} • {mod.weekRange}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              mod.targetExam === 'COMMON_CORE'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {mod.targetExam === 'COMMON_CORE' ? 'Common Core 70%' : 'Rajasthan Layer 20%'}
                          </span>

                          <span className="text-slate-400 font-medium">
                            ~{mod.estimatedHours}h Estimated
                          </span>
                        </div>

                        <h4 className={`text-sm sm:text-base font-bold ${
                          isCompleted ? 'text-slate-300 line-through decoration-emerald-500/60' : 'text-slate-100'
                        }`}>
                          {mod.title}
                        </h4>

                        {mod.titleHindi && (
                          <div className="text-xs text-slate-400 font-serif">{mod.titleHindi}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCompleted && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mastered
                        </span>
                      )}
                      <div className="p-1 rounded-lg text-slate-400 hover:text-slate-200">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Module Details */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 space-y-5 border-t border-slate-800/80 pt-4 text-xs sm:text-sm">
                      {/* Overview */}
                      <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                        {mod.overview}
                      </p>

                      {/* Required Standard Reading Chapters */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                        <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                          <BookMarked className="w-4 h-4 text-amber-400" />
                          <span>Exact Standard Books & Chapters to Read</span>
                        </div>

                        <div className="space-y-2">
                          {mod.requiredReadings.map((reading, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                            >
                              <div className="space-y-0.5">
                                <span className="font-bold text-slate-200 block">{reading.book}</span>
                                <span className="text-slate-400">{reading.chapters}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold self-start sm:self-auto ${
                                reading.priority === 'Must Read'
                                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {reading.priority}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Daily Actionable Task Plan */}
                      <div className="space-y-2">
                        <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                          <Calendar className="w-4 h-4 text-emerald-400" />
                          <span>Suggested Daily Self-Study Action Plan</span>
                        </div>

                        <div className="space-y-2">
                          {mod.dailyBreakdown.map((day) => (
                            <div
                              key={day.dayNumber}
                              className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-amber-400 font-bold text-[11px]">
                                <span>Day {day.dayNumber}: {day.focus}</span>
                                <span className="text-slate-500 font-normal">Target PYQs: {day.pyqTarget}</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed pl-1">
                                {day.actionableTask}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Self-Assessment Checklist */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                        <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                          <span>Self-Assessment Checklist (Verify Before Moving Forward)</span>
                        </div>

                        <div className="space-y-1.5">
                          {mod.selfAssessmentChecklist.map((item, cIdx) => {
                            const itemKey = `${mod.id}-check-${cIdx}`;
                            const isItemDone = Boolean(completedChecklistItems[itemKey]);

                            return (
                              <button
                                key={cIdx}
                                type="button"
                                onClick={() => toggleChecklistItem(itemKey)}
                                className="w-full text-left p-2 rounded-lg hover:bg-slate-900 transition-colors flex items-start gap-2.5 cursor-pointer"
                              >
                                {isItemDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                )}
                                <span className={`text-xs ${isItemDone ? 'text-slate-400 line-through' : 'text-slate-300'}`}>
                                  {item}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dual Strategy Caveat */}
                      <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs flex items-start gap-2.5 text-amber-300">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-200">Dual UPSC-RPSC Synergy Tip: </span>
                          <span className="leading-relaxed">{mod.dualStrategyNote}</span>
                        </div>
                      </div>

                      {/* Action Links: Open Syllabus Topic or 12-Step Masterclass */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => toggleModuleCompleted(mod.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isCompleted
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isCompleted ? 'Mark Unit Incomplete' : 'Mark Unit Mastered'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {mod.linkedLessonId && onSelectTopicLesson && (
                            <button
                              type="button"
                              onClick={() => onSelectTopicLesson(mod.linkedLessonId!)}
                              className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Start 12-Step Lesson</span>
                            </button>
                          )}

                          {mod.linkedSyllabusCode && onOpenSyllabusTopic && (
                            <button
                              type="button"
                              onClick={() => onOpenSyllabusTopic(mod.linkedSyllabusCode!)}
                              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <span>View in Syllabus</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleScheduleModuleInCalendar(mod)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                              scheduledModuleIds.includes(mod.id)
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
                            }`}
                            title="Schedule the 5-day daily action plan for this unit into your Study Calendar"
                          >
                            <Calendar className="w-3.5 h-3.5 text-purple-400" />
                            <span>{scheduledModuleIds.includes(mod.id) ? 'Unit Scheduled ✓' : 'Schedule Unit in Calendar'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {displayedModules.length === 0 && (
              <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
                <Search className="w-8 h-8 text-slate-500 mx-auto" />
                <div className="font-semibold text-slate-300 text-sm">No curriculum modules found</div>
                <p className="text-xs text-slate-500">
                  No modules match &quot;{searchQuery}&quot; with filter &quot;{categoryFilter}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('ALL');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 text-xs font-semibold cursor-pointer hover:bg-slate-700"
                >
                  Reset Search & Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Daily Timetable & Golden Rules (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Daily Timetable Generator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Self-Study Schedule
                </span>
                <h4 className="font-serif text-base font-bold text-slate-100">
                  Daily Timetable Generator
                </h4>
              </div>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>

            {/* Hours Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              {[6, 8, 10].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setSelectedTimetableHours(hours)}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                    selectedTimetableHours === hours
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {hours}h / Day
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400">
              {activeTimetable.label} using the 70:20:10 workload balance:
            </p>

            {/* Time Slot Cards */}
            <div className="space-y-2.5">
              {activeTimetable.schedule.map((slot, sIdx) => {
                const isCore = slot.layerType === 'CORE_70';
                const isRaj = slot.layerType === 'RAJASTHAN_20';

                return (
                  <div
                    key={sIdx}
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      isCore
                        ? 'bg-slate-950/80 border-amber-500/25'
                        : isRaj
                        ? 'bg-slate-950/80 border-emerald-500/25'
                        : 'bg-slate-950/80 border-indigo-500/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{slot.timeSlot}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          isCore
                            ? 'bg-amber-500/15 text-amber-300'
                            : isRaj
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-indigo-500/15 text-indigo-300'
                        }`}
                      >
                        {isCore ? '70% Core' : isRaj ? '20% Rajasthan' : '10% Mocks'}
                      </span>
                    </div>

                    <div className="font-semibold text-slate-100">{slot.activity}</div>
                    <p className="text-[11px] text-slate-400">{slot.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Self-Teaching Golden Rules */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4" />
              <span>Self-Teaching Golden Doctrines</span>
            </div>

            <div className="space-y-3">
              {SELF_TEACH_STRATEGY_RULES.map((rule, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{rule.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pl-5.5">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
