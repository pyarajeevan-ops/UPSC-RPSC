import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Bookmark,
  ExternalLink,
  BookMarked,
  FileText,
  Clock,
  HelpCircle,
  X,
  Compass,
  Building,
  Castle,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import {
  COMPLETE_EXAM_SYLLABUS_DATA,
  ExamSyllabus,
  SyllabusPaper,
  SyllabusSection,
  SyllabusTopicItem,
  SyllabusSubtopic
} from '../data/completeSyllabusData';
import { LanguageMedium } from '../types';

interface CompleteSyllabusExplorerProps {
  language: LanguageMedium;
  onSelectTopicLesson?: (lessonId: string) => void;
  externalSearchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  externalDeepDiveTopic?: SyllabusTopicItem | null;
  onCloseExternalDeepDive?: () => void;
  selectedExamId?: 'UPSC_CSE' | 'RPSC_RAS';
  onSelectExamId?: (examId: 'UPSC_CSE' | 'RPSC_RAS') => void;
}

export const CompleteSyllabusExplorer: React.FC<CompleteSyllabusExplorerProps> = ({
  language,
  onSelectTopicLesson,
  externalSearchQuery,
  onSearchQueryChange,
  externalDeepDiveTopic,
  onCloseExternalDeepDive,
  selectedExamId: propSelectedExamId,
  onSelectExamId,
}) => {
  // Navigation State (Hierarchical Drilldown)
  const [internalExamId, setInternalExamId] = useState<'UPSC_CSE' | 'RPSC_RAS'>('UPSC_CSE');
  const selectedExamId = propSelectedExamId !== undefined ? propSelectedExamId : internalExamId;
  const setSelectedExamId = (examId: 'UPSC_CSE' | 'RPSC_RAS') => {
    if (onSelectExamId) onSelectExamId(examId);
    setInternalExamId(examId);
  };

  const [selectedStageName, setSelectedStageName] = useState<'Prelims' | 'Mains'>('Prelims');
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const [internalDeepDiveTopic, setInternalDeepDiveTopic] = useState<SyllabusTopicItem | null>(null);
  const activeDeepDiveTopic = externalDeepDiveTopic !== undefined ? externalDeepDiveTopic : internalDeepDiveTopic;
  const setActiveDeepDiveTopic = (topic: SyllabusTopicItem | null) => {
    if (!topic && onCloseExternalDeepDive) {
      onCloseExternalDeepDive();
    }
    setInternalDeepDiveTopic(topic);
  };

  // Search filter across the entire syllabus
  const [internalSearchQuery, setInternalSearchQuery] = useState<string>('');
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = (q: string) => {
    if (onSearchQueryChange) onSearchQueryChange(q);
    setInternalSearchQuery(q);
  };

  const [overlapFilter, setOverlapFilter] = useState<'ALL' | 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'UPSC_EXCLUSIVE'>('ALL');

  // Currently selected Exam data
  const currentExam = COMPLETE_EXAM_SYLLABUS_DATA[selectedExamId];

  // Currently selected Stage
  const currentStage = currentExam.selectionStages.find(
    (s) => s.stageName === selectedStageName
  ) || currentExam.selectionStages[0];

  // Auto-select first paper if none selected or if stage changed
  const effectivePaperId = selectedPaperId || currentStage.papers[0]?.id;
  const currentPaper = currentStage.papers.find((p) => p.id === effectivePaperId) || currentStage.papers[0];

  // Auto-select first section of the current paper if none selected
  const effectiveSectionId = selectedSectionId || currentPaper?.sections[0]?.id;
  const currentSection = currentPaper?.sections.find((s) => s.id === effectiveSectionId) || currentPaper?.sections[0];

  // Filtered topics based on search & overlap filter
  const displayedTopics = useMemo(() => {
    if (!currentSection) return [];
    return currentSection.topics.filter((topic) => {
      // Overlap filter
      if (overlapFilter !== 'ALL' && topic.overlapCategory !== overlapFilter) {
        return false;
      }
      // Search query filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(query) ||
        topic.titleHindi.toLowerCase().includes(query) ||
        topic.officialDescription.toLowerCase().includes(query) ||
        topic.deepDiveAnalysis.toLowerCase().includes(query) ||
        topic.subtopics.some(
          (sub) =>
            sub.name.toLowerCase().includes(query) ||
            sub.details.toLowerCase().includes(query) ||
            sub.keyPoints.some((kp) => kp.toLowerCase().includes(query))
        )
      );
    });
  }, [currentSection, overlapFilter, searchQuery]);

  // Global search match count across the active exam
  const globalSearchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<{
      stageName: string;
      paperName: string;
      sectionName: string;
      topic: SyllabusTopicItem;
    }> = [];

    currentExam.selectionStages.forEach((stage) => {
      stage.papers.forEach((paper) => {
        paper.sections.forEach((sec) => {
          sec.topics.forEach((top) => {
            const matches =
              top.title.toLowerCase().includes(query) ||
              top.titleHindi.toLowerCase().includes(query) ||
              top.officialDescription.toLowerCase().includes(query) ||
              top.subtopics.some(
                (s) =>
                  s.name.toLowerCase().includes(query) ||
                  s.details.toLowerCase().includes(query) ||
                  s.keyPoints.some((k) => k.toLowerCase().includes(query))
              );
            if (matches) {
              results.push({
                stageName: stage.stageName,
                paperName: paper.paperNumber,
                sectionName: sec.name,
                topic: top,
              });
            }
          });
        });
      });
    });

    return results;
  }, [currentExam, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Exam Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
              Interactive Multi-Level Drill-Down
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">· Official UPSC & RPSC Notified Syllabus</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-400" />
            <span>Complete Exam Syllabus Directory</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Click into stages, papers, subjects, and specific topics to read detailed sub-topics, PYQ trends, and examiner traps inside
          </p>
        </div>

        {/* Exam Segmented Selector */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => {
              setSelectedExamId('UPSC_CSE');
              setSelectedPaperId(null);
              setSelectedSectionId(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedExamId === 'UPSC_CSE'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>UPSC CSE Syllabus</span>
          </button>

          <button
            onClick={() => {
              setSelectedExamId('RPSC_RAS');
              setSelectedPaperId(null);
              setSelectedSectionId(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedExamId === 'RPSC_RAS'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Castle className="w-4 h-4" />
            <span>RPSC RAS Syllabus</span>
          </button>
        </div>
      </div>

      {/* Global Instant Search Bar & Overlap Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across entire syllabus: e.g. Panchayati Raj, Aravalli, Ethics, Monetary Policy, Forts, High Court..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Overlap Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setOverlapFilter('ALL')}
              className={`px-3 py-2 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                overlapFilter === 'ALL'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-950'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setOverlapFilter('COMMON_CORE')}
              className={`px-3 py-2 rounded-xl font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                overlapFilter === 'COMMON_CORE'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:bg-slate-950'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>70% Common Core</span>
            </button>
            <button
              onClick={() => setOverlapFilter('RAJASTHAN_EXCLUSIVE')}
              className={`px-3 py-2 rounded-xl font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                overlapFilter === 'RAJASTHAN_EXCLUSIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:bg-slate-950'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Rajasthan Exclusive (20%)</span>
            </button>
            <button
              onClick={() => setOverlapFilter('UPSC_EXCLUSIVE')}
              className={`px-3 py-2 rounded-xl font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                overlapFilter === 'UPSC_EXCLUSIVE'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:bg-slate-950'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>UPSC Exclusive</span>
            </button>
          </div>
        </div>

        {/* Global Search Results Alert if active */}
        {searchQuery.trim().length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
            <div>
              Found <strong className="text-amber-400">{globalSearchMatches.length} matching topics</strong> in {currentExam.title} for &quot;{searchQuery}&quot;
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Global Search Results Dropdown/List when search is active */}
      {searchQuery.trim().length > 0 && globalSearchMatches.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Search Results Across All Stages & Papers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
            {globalSearchMatches.map((res, i) => (
              <div
                key={`${res.topic.id}-${i}`}
                onClick={() => setActiveDeepDiveTopic(res.topic)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 hover:border-amber-500/40 transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-semibold">
                    {res.stageName} • {res.paperName}
                  </span>
                  <span className="text-amber-400 font-medium group-hover:underline flex items-center gap-1">
                    <span>Read inside</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className="font-semibold text-slate-200 text-xs sm:text-sm group-hover:text-amber-300">
                  {res.topic.title}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {res.topic.officialDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs overflow-x-auto text-slate-400">
        <button
          onClick={() => {
            setSelectedPaperId(null);
            setSelectedSectionId(null);
          }}
          className="font-semibold text-amber-400 hover:text-amber-300 cursor-pointer whitespace-nowrap"
        >
          {selectedExamId === 'UPSC_CSE' ? '🏛️ UPSC CSE' : '🏰 RPSC RAS'}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

        <button
          onClick={() => {
            setSelectedPaperId(null);
            setSelectedSectionId(null);
          }}
          className="font-medium text-slate-300 hover:text-white cursor-pointer whitespace-nowrap"
        >
          {selectedStageName} Stage
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

        <button
          onClick={() => setSelectedSectionId(null)}
          className="font-medium text-slate-300 hover:text-white cursor-pointer whitespace-nowrap"
        >
          {currentPaper?.paperNumber} ({currentPaper?.paperName.split('(')[0]})
        </button>

        {currentSection && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="font-semibold text-slate-200 whitespace-nowrap">
              {currentSection.name}
            </span>
          </>
        )}
      </div>

      {/* Stage Selector (Prelims vs Mains) */}
      <div className="grid grid-cols-2 gap-3">
        {currentExam.selectionStages.map((stg) => {
          const isSelected = selectedStageName === stg.stageName;
          return (
            <button
              key={stg.stageName}
              onClick={() => {
                setSelectedStageName(stg.stageName as 'Prelims' | 'Mains');
                setSelectedPaperId(null);
                setSelectedSectionId(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? selectedExamId === 'UPSC_CSE'
                    ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-950/20'
                    : 'bg-emerald-500/10 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-base font-serif font-bold ${isSelected ? 'text-slate-100' : 'text-slate-300'}`}>
                  {stg.stageName} Examination
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold tabular-nums">
                  {stg.totalMarks} Marks
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{stg.description}</p>
              <div className="mt-2 text-[11px] text-amber-400/90 font-medium">
                {stg.papers.length} Papers Included • Click to explore
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Layout: Left Paper & Section Sidebar + Right Topics & Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Papers & Sections (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Papers Accordion */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Papers in {selectedStageName}</span>
              <span className="text-[10px] text-slate-500">{currentStage.papers.length} Papers</span>
            </div>

            <div className="space-y-2">
              {currentStage.papers.map((paper) => {
                const isPaperSelected = paper.id === effectivePaperId;
                return (
                  <div key={paper.id} className="space-y-1.5">
                    <button
                      onClick={() => {
                        setSelectedPaperId(paper.id);
                        setSelectedSectionId(null);
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isPaperSelected
                          ? 'bg-slate-800/90 border-amber-500/50 shadow-xs'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-400">{paper.paperNumber}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            paper.nature.includes('Merit')
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          }`}>
                            {paper.nature}
                          </span>
                        </div>
                        <div className="font-semibold text-slate-200 text-xs sm:text-sm mt-0.5 leading-snug">
                          {paper.paperName}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold tabular-nums shrink-0 mt-0.5">
                        {paper.totalMarks}M
                      </span>
                    </button>

                    {/* Nested Sections inside selected paper */}
                    {isPaperSelected && (
                      <div className="pl-3 border-l-2 border-amber-500/40 space-y-1 pt-1 pb-1">
                        <div className="text-[11px] font-semibold text-slate-400 px-2 py-0.5">
                          Subject Sections:
                        </div>
                        {paper.sections.map((sec) => {
                          const isSecSelected = sec.id === effectiveSectionId;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => setSelectedSectionId(sec.id)}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                                isSecSelected
                                  ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                              }`}
                            >
                              <span className="truncate">{sec.name}</span>
                              <span className="text-[10px] px-1.5 rounded bg-slate-900 text-slate-500 tabular-nums">
                                {sec.topics.length}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Topics List & Deep-Dive Trigger (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {currentSection && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
              {/* Section Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {currentPaper.paperNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Weightage: <strong className="text-slate-200">{currentSection.weightageEstimated}</strong>
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Showing <strong className="text-amber-400 tabular-nums">{displayedTopics.length}</strong> syllabus topics
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 mt-2">
                  {currentSection.name}
                </h3>
                {currentSection.nameHindi && (
                  <p className="text-xs text-slate-400 font-serif mt-0.5">{currentSection.nameHindi}</p>
                )}
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentSection.description}
                </p>
              </div>

              {/* Topics Grid */}
              <div className="space-y-3">
                {displayedTopics.map((topic) => {
                  return (
                    <div
                      key={topic.id}
                      className="p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/90 hover:border-amber-500/40 rounded-xl transition-all shadow-sm space-y-3 group"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {topic.code}
                            </span>
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                                topic.overlapCategory === 'COMMON_CORE'
                                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                  : topic.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                              }`}
                            >
                              {topic.overlapCategory === 'COMMON_CORE'
                                ? `Common Core (${topic.overlapPercentage}%)`
                                : topic.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
                                ? 'Rajasthan Exclusive'
                                : 'UPSC Exclusive'}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {topic.stage}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-1.5 group-hover:text-amber-300 transition-colors">
                            {topic.title}
                          </h4>
                          {topic.titleHindi && (
                            <div className="text-xs text-slate-400 font-serif">{topic.titleHindi}</div>
                          )}
                        </div>

                        {/* Read More Inside Button */}
                        <button
                          onClick={() => setActiveDeepDiveTopic(topic)}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
                        >
                          <span>Read More Inside</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Official Scope Brief */}
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                        {topic.officialDescription}
                      </p>

                      {/* Micro Subtopics Preview */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="text-slate-500 font-semibold">Contains {topic.subtopics.length} Sub-modules:</span>
                        {topic.subtopics.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setActiveDeepDiveTopic(topic)}
                            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
                          >
                            • {sub.name}
                          </button>
                        ))}
                      </div>

                      {/* Footer tags */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                        <span>Weightage: <strong className="text-slate-400">{topic.weightage}</strong></span>
                        <span className="text-amber-400/80 font-medium">Click &quot;Read More Inside&quot; for complete notes & traps</span>
                      </div>
                    </div>
                  );
                })}

                {displayedTopics.length === 0 && (
                  <div className="text-center py-12 text-slate-400 space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
                    <div className="font-semibold text-slate-300">No topics match current filter</div>
                    <p className="text-xs text-slate-500">Try switching your overlap category or clearing the search query.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DEEP DIVE MODAL / DRAWER ("READ MORE INSIDE... AND INSIDE OF MORE AND MORE") */}
      {/* ========================================================================= */}
      {activeDeepDiveTopic && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    {activeDeepDiveTopic.code}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold ${
                      activeDeepDiveTopic.overlapCategory === 'COMMON_CORE'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : activeDeepDiveTopic.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {activeDeepDiveTopic.overlapCategory === 'COMMON_CORE'
                      ? `70% Common Core Overlap`
                      : activeDeepDiveTopic.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
                      ? 'Rajasthan Exclusive (20%)'
                      : 'UPSC Exclusive'}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {activeDeepDiveTopic.stage}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 mt-2">
                  {activeDeepDiveTopic.title}
                </h3>
                {activeDeepDiveTopic.titleHindi && (
                  <p className="text-xs text-slate-400 font-serif mt-0.5">
                    {activeDeepDiveTopic.titleHindi}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveDeepDiveTopic(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable Deep Dive Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {/* Official Syllabus Scope */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Official Notified Syllabus Scope</span>
                </span>
                <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                  {activeDeepDiveTopic.officialDescription}
                </p>
              </div>

              {/* Strategic Deep Dive Analysis */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strategic Civil Services Pedagogical Breakdown</span>
                </span>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {activeDeepDiveTopic.deepDiveAnalysis}
                </p>
              </div>

              {/* Inside of Inside: Nested Sub-topics with Key Points & PYQs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Inside of More and More: Micro Sub-Modules ({activeDeepDiveTopic.subtopics.length})</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Detailed conceptual points</span>
                </div>

                <div className="space-y-3">
                  {activeDeepDiveTopic.subtopics.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-amber-300 text-xs sm:text-sm flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[11px] font-bold">
                            {idx + 1}
                          </span>
                          <span>{sub.name}</span>
                        </div>
                        {sub.nameHindi && (
                          <span className="text-[11px] text-slate-400 font-serif hidden sm:inline">
                            {sub.nameHindi}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed pl-7">
                        {sub.details}
                      </p>

                      {/* Key Constitutional Articles / Facts Bullet Points */}
                      {sub.keyPoints.length > 0 && (
                        <div className="pl-7 space-y-1 pt-1">
                          <span className="text-[11px] font-semibold text-slate-400 block">
                            Essential Facts & Provisions:
                          </span>
                          <ul className="space-y-1">
                            {sub.keyPoints.map((kp, kIdx) => (
                              <li
                                key={kIdx}
                                className="text-xs text-slate-300 flex items-start gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* PYQ Real Examples if available */}
                      {sub.pyqExamples && sub.pyqExamples.length > 0 && (
                        <div className="pl-7 pt-1">
                          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] space-y-1">
                            <span className="font-bold text-amber-400 flex items-center gap-1">
                              <Bookmark className="w-3 h-3" />
                              <span>Actual Exam PYQ Question Linkage:</span>
                            </span>
                            {sub.pyqExamples.map((pyq, pIdx) => (
                              <p key={pIdx} className="text-slate-300 italic">
                                &ldquo;{pyq}&rdquo;
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Examiner Traps & Negative Marking Warnings */}
              <div className="p-4 bg-rose-950/20 border border-rose-600/40 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Examiner Traps & Common Cognitive Failure Modes</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeDeepDiveTopic.examinerTraps.map((trap, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Official Standard Books & Sources */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  <span>Must-Read Standard Textbooks & Official Reports</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDeepDiveTopic.mustReadSources.map((src, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium"
                    >
                      📖 {src}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weightage & Frequency Stat Card */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">PYQ Frequency Trend:</span>
                  <span className="text-slate-300 font-medium">{activeDeepDiveTopic.pyqFrequency}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-semibold block">Expected Marks:</span>
                  <span className="text-amber-400 font-bold">{activeDeepDiveTopic.weightage}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Syllabus Code: <strong className="text-slate-200">{activeDeepDiveTopic.code}</strong>
              </span>

              <div className="flex items-center gap-2">
                {activeDeepDiveTopic.lessonIdLink && onSelectTopicLesson && (
                  <button
                    onClick={() => {
                      onSelectTopicLesson(activeDeepDiveTopic.lessonIdLink!);
                      setActiveDeepDiveTopic(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-amber-500/20 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open 12-Step Masterclass Lesson</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveDeepDiveTopic(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
