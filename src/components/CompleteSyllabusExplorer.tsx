import React, { useState, useMemo, useEffect } from 'react';
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
  ChevronLeft,
  Copy,
  Check,
  RotateCw,
  Lightbulb,
  CheckSquare,
  Square,
  ChevronUp,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Calendar
} from 'lucide-react';
import {
  COMPLETE_EXAM_SYLLABUS_DATA,
  ExamSyllabus,
  SyllabusPaper,
  SyllabusSection,
  SyllabusTopicItem,
  SyllabusSubtopic
} from '../data/completeSyllabusData';
import {
  getInteractiveQuizForTopic,
  getFlashcardsForTopic,
  TopicQuizQuestion,
  TopicFlashcard
} from '../data/topicInteractiveData';
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

  // Deep Dive Topic State - FIXED: Fall back to internal state cleanly
  const [internalDeepDiveTopic, setInternalDeepDiveTopic] = useState<SyllabusTopicItem | null>(null);
  const activeDeepDiveTopic = externalDeepDiveTopic || internalDeepDiveTopic;

  const handleOpenDeepDive = (topic: SyllabusTopicItem) => {
    setInternalDeepDiveTopic(topic);
    setModalTab('OVERVIEW');
    setUserQuizAnswers({});
    setShowQuizExplanations({});
    setFlippedFlashcards({});
  };

  const handleCloseDeepDive = () => {
    setInternalDeepDiveTopic(null);
    if (onCloseExternalDeepDive) {
      onCloseExternalDeepDive();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDeepDiveTopic) {
        handleCloseDeepDive();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDeepDiveTopic]);

  // Modal Interactive Tabs
  const [modalTab, setModalTab] = useState<'OVERVIEW' | 'SUBTOPICS' | 'QUIZ' | 'FLASHCARDS'>('OVERVIEW');
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<string, boolean>>({});
  const [flippedFlashcards, setFlippedFlashcards] = useState<Record<string, boolean>>({});
  const [copiedNote, setCopiedNote] = useState(false);

  // Mastered / Studied Topic Tracking in LocalStorage
  const [masteredTopics, setMasteredTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('margdarshak_completed_topics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse mastered topics', e);
      }
    }
    return ['panchayati-raj-local-gov', 'upsc-polity-panchayati-raj'];
  });

  // Mastered Sub-Modules Tracking
  const [masteredSubtopics, setMasteredSubtopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('margdarshak_mastered_subtopics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse mastered subtopics', e);
      }
    }
    return ['sub-pr-1'];
  });

  // Inline topic card expansion state ("read more inside, and than inside of more and more")
  const [expandedTopicIds, setExpandedTopicIds] = useState<string[]>(['panchayati-raj-local-gov', 'upsc-polity-panchayati-raj']);
  // Nested micro-subtopic drilldown expansion state
  const [expandedSubtopicIds, setExpandedSubtopicIds] = useState<string[]>(['sub-pr-1']);
  // Active inline tabs for expanded topics
  const [inlineTopicTabs, setInlineTopicTabs] = useState<Record<string, 'OVERVIEW' | 'SUBTOPICS' | 'QUIZ' | 'FLASHCARDS'>>({});
  // Audio Speech Synthesis state (Web Speech API)
  const [playingAudioTopicId, setPlayingAudioTopicId] = useState<string | null>(null);
  // Clipboard copy state per topic
  const [copiedTopicId, setCopiedTopicId] = useState<string | null>(null);
  // Calendar scheduled state per topic
  const [scheduledTopicIds, setScheduledTopicIds] = useState<string[]>([]);
  const [calendarToastMessage, setCalendarToastMessage] = useState<string | null>(null);

  const handleScheduleSpacedRevision = async (topic: SyllabusTopicItem) => {
    try {
      setScheduledTopicIds((prev) => [...prev, topic.id]);
      const res = await fetch('/api/calendar/auto-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'spaced-revision',
          topicId: topic.id,
          topicTitle: topic.title,
          subject: topic.stage || 'General Studies Core',
          examTag:
            topic.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
              ? 'RPSC'
              : topic.overlapCategory === 'UPSC_EXCLUSIVE'
              ? 'UPSC'
              : 'DUAL',
        }),
      });
      if (res.ok) {
        setCalendarToastMessage(`Day 1, 3, 7, 15, 30 Spaced Revisions scheduled in Calendar for "${topic.title}"!`);
        setTimeout(() => setCalendarToastMessage(null), 4500);
      }
    } catch (e) {
      console.error('Failed to schedule spaced revision in calendar', e);
    }
  };

  useEffect(() => {
    localStorage.setItem('margdarshak_completed_topics', JSON.stringify(masteredTopics));
  }, [masteredTopics]);

  useEffect(() => {
    localStorage.setItem('margdarshak_mastered_subtopics', JSON.stringify(masteredSubtopics));
  }, [masteredSubtopics]);

  const toggleMasteredTopic = (topicId: string) => {
    setMasteredTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleMasteredSubtopic = (subId: string) => {
    setMasteredSubtopics((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  const toggleExpandTopic = (topicId: string) => {
    setExpandedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleExpandSubtopic = (subId: string) => {
    setExpandedSubtopicIds((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  const getInlineTab = (topicId: string): 'OVERVIEW' | 'SUBTOPICS' | 'QUIZ' | 'FLASHCARDS' => {
    return inlineTopicTabs[topicId] || 'OVERVIEW';
  };

  const setInlineTab = (topicId: string, tab: 'OVERVIEW' | 'SUBTOPICS' | 'QUIZ' | 'FLASHCARDS') => {
    setInlineTopicTabs((prev) => ({ ...prev, [topicId]: tab }));
  };

  const handlePlayAudioSummary = (topic: SyllabusTopicItem) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (playingAudioTopicId === topic.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioTopicId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const trapText = topic.examinerTraps.length > 0 ? `Key examiner trap to avoid: ${topic.examinerTraps[0]}.` : '';
    const textToSpeak = `${topic.title}. Official Syllabus Requirement: ${topic.officialDescription}. Strategic Analysis: ${topic.deepDiveAnalysis}. ${trapText}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setPlayingAudioTopicId(null);
    utterance.onerror = () => setPlayingAudioTopicId(null);
    window.speechSynthesis.speak(utterance);
    setPlayingAudioTopicId(topic.id);
  };

  const handleCopyTopicMarkdown = (topic: SyllabusTopicItem) => {
    const text = `# ${topic.title} (${topic.code})
${topic.titleHindi ? `## ${topic.titleHindi}\n` : ''}
- Stage: ${topic.stage}
- Overlap Category: ${topic.overlapCategory} (${topic.overlapPercentage}%)
- Weightage: ${topic.weightage}

### Official Syllabus Description:
${topic.officialDescription}

### Strategic Breakdown:
${topic.deepDiveAnalysis}

### Examiner Traps:
${topic.examinerTraps.map((t) => `- ⚠️ ${t}`).join('\n')}

### Must-Read Sources:
${topic.mustReadSources.map((s) => `- 📖 ${s}`).join('\n')}

### Sub-Modules Breakdown:
${topic.subtopics
  .map(
    (s) =>
      `#### ${s.name}\n${s.details}\n${s.keyPoints.map((k) => `  * ${k}`).join('\n')}${
        s.pyqExamples ? '\n  PYQs: ' + s.pyqExamples.join(', ') : ''
      }`
  )
  .join('\n\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedTopicId(topic.id);
    setTimeout(() => setCopiedTopicId(null), 2500);
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

  // Computed Quiz & Flashcards for active modal topic
  const activeQuizQuestions = useMemo<TopicQuizQuestion[]>(() => {
    if (!activeDeepDiveTopic) return [];
    return getInteractiveQuizForTopic(activeDeepDiveTopic);
  }, [activeDeepDiveTopic]);

  const activeFlashcards = useMemo<TopicFlashcard[]>(() => {
    if (!activeDeepDiveTopic) return [];
    return getFlashcardsForTopic(activeDeepDiveTopic);
  }, [activeDeepDiveTopic]);

  const handleCopyNotes = () => {
    if (!activeDeepDiveTopic) return;
    const textToCopy = `=== ${activeDeepDiveTopic.code}: ${activeDeepDiveTopic.title} ===\nOfficial Scope: ${activeDeepDiveTopic.officialDescription}\n\nKey Sub-Topics:\n${activeDeepDiveTopic.subtopics.map(s => `- ${s.name}: ${s.details}`).join('\n')}\n\nExaminer Traps:\n${activeDeepDiveTopic.examinerTraps.map(t => `! ${t}`).join('\n')}\n\nMust-Read Sources: ${activeDeepDiveTopic.mustReadSources.join(', ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Calendar Scheduled Notification Banner */}
      {calendarToastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-purple-500 text-slate-950 font-semibold shadow-2xl border border-purple-400 text-xs animate-fade-in">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{calendarToastMessage}</span>
        </div>
      )}

      {/* Top Header & Exam Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
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
            Click into stages, papers, subjects, and specific topics to read detailed sub-topics, interactive mini-quizzes, and active recall flashcards inside
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
                onClick={() => handleOpenDeepDive(res.topic)}
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

        {/* Right Column: Topics List (8 Cols) */}
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
                  const isMastered = masteredTopics.includes(topic.id) || (topic.lessonIdLink && masteredTopics.includes(topic.lessonIdLink));
                  const isExpanded = expandedTopicIds.includes(topic.id);
                  const activeTab = getInlineTab(topic.id);
                  const topicQuiz = getInteractiveQuizForTopic(topic);
                  const topicFlashcards = getFlashcardsForTopic(topic);
                  const isAudioPlaying = playingAudioTopicId === topic.id;
                  const isCopied = copiedTopicId === topic.id;

                    return (
                      <div
                        key={topic.id}
                        className={`rounded-2xl transition-all shadow-sm group border overflow-hidden ${
                          isExpanded
                            ? 'bg-slate-950 border-amber-500/70 shadow-xl shadow-amber-950/20 ring-1 ring-amber-500/30'
                            : isMastered
                            ? 'bg-slate-950/90 border-emerald-500/40 hover:border-emerald-500/60'
                            : 'bg-slate-950/80 hover:bg-slate-950 border-slate-800/90 hover:border-amber-500/40'
                        }`}
                      >
                        {/* Topic Header Card */}
                        <div className="p-4 sm:p-5 space-y-3">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex-1 min-w-[240px]">
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
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {topic.stage}
                                </span>

                                {isMastered && (
                                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Studied
                                  </span>
                                )}
                              </div>

                              <h4
                                onClick={() => toggleExpandTopic(topic.id)}
                                className="text-base sm:text-lg font-bold text-slate-100 mt-1.5 group-hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-2"
                              >
                                <span>{topic.title}</span>
                              </h4>
                              {topic.titleHindi && (
                                <div className="text-xs text-slate-400 font-serif">{topic.titleHindi}</div>
                              )}
                            </div>

                            {/* Action Buttons: Read More Inside & Fullscreen Modal */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleExpandTopic(topic.id)}
                                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                                  isExpanded
                                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                                }`}
                                title={isExpanded ? 'Collapse this topic' : 'Expand full interactive breakdown inside this card'}
                              >
                                <span>{isExpanded ? 'Collapse Inside' : 'Read More Inside'}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenDeepDive(topic)}
                                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors cursor-pointer"
                                title="Open Fullscreen Focus Mode [Esc]"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Official Scope Brief */}
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            {topic.officialDescription}
                          </p>

                          {/* Micro Subtopics Preview Pills */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                            <span className="text-slate-500 font-semibold">Contains {topic.subtopics.length} Sub-modules:</span>
                            {topic.subtopics.map((sub) => {
                              const isSubMastered = masteredSubtopics.includes(sub.id);
                              return (
                                <button
                                  key={sub.id}
                                  type="button"
                                  onClick={() => {
                                    if (!isExpanded) toggleExpandTopic(topic.id);
                                    setInlineTab(topic.id, 'SUBTOPICS');
                                    if (!expandedSubtopicIds.includes(sub.id)) toggleExpandSubtopic(sub.id);
                                  }}
                                  className={`px-2 py-0.5 rounded-lg border text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
                                    isSubMastered
                                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                                  }`}
                                  title="Click to drill down into this sub-module"
                                >
                                  {isSubMastered && <Check className="w-3 h-3 text-emerald-400" />}
                                  <span>• {sub.name}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Footer Info & Expand Toggle Hint */}
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                            <span>Weightage: <strong className="text-slate-400">{topic.weightage}</strong></span>
                            <button
                              type="button"
                              onClick={() => toggleExpandTopic(topic.id)}
                              className="text-amber-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Collapse interactive view' : 'Read notes, subtopics, quiz & flashcards inside →'}</span>
                            </button>
                          </div>
                        </div>

                        {/* ========================================================================= */}
                        {/* INLINE EXPANDED SANCTUM ("READ MORE INSIDE... AND INSIDE OF MORE AND MORE") */}
                        {/* ========================================================================= */}
                        {isExpanded && (
                          <div className="border-t border-slate-800 bg-slate-950/95 space-y-4 animate-in fade-in duration-200">
                            {/* Toolbar Header: Audio narration, Copy Notes, Fullscreen & Masterclass */}
                            <div className="px-4 sm:px-6 py-2.5 bg-slate-900/80 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
                              {/* Left toolbar: Audio Narrator & Copy */}
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handlePlayAudioSummary(topic)}
                                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                                    isAudioPlaying
                                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                                  }`}
                                  title="Listen to topic audio summary via Web Speech API"
                                >
                                  {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                                  <span>{isAudioPlaying ? 'Stop Audio' : 'Listen to Summary'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleCopyTopicMarkdown(topic)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                                  title="Copy formatted markdown study notes"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{isCopied ? 'Notes Copied!' : 'Copy Notes'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleScheduleSpacedRevision(topic)}
                                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                                    scheduledTopicIds.includes(topic.id)
                                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                      : 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-slate-700'
                                  }`}
                                  title="Schedule 1d, 3d, 7d, 15d, 30d spaced revisions in Study Calendar"
                                >
                                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                                  <span>{scheduledTopicIds.includes(topic.id) ? 'Revisions Scheduled' : 'Schedule Revisions'}</span>
                                </button>
                              </div>

                              {/* Right toolbar: Launch Masterclass, Mark Studied & Fullscreen */}
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleMasteredTopic(topic.id)}
                                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                                    isMastered
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{isMastered ? 'Marked Studied' : 'Mark as Studied'}</span>
                                </button>

                                {topic.lessonIdLink && onSelectTopicLesson && (
                                  <button
                                    type="button"
                                    onClick={() => onSelectTopicLesson(topic.lessonIdLink!)}
                                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                    title="Open 12-Step Pedagogical Masterclass for this topic"
                                  >
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>12-Step Masterclass</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleOpenDeepDive(topic)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                                  title="Expand into distraction-free reading room"
                                >
                                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Fullscreen Mode</span>
                                </button>
                              </div>
                            </div>

                            {/* Inline Tabs Strip */}
                            <div className="flex items-center gap-1 px-4 sm:px-6 border-b border-slate-800 text-xs overflow-x-auto scrollbar-none">
                              <button
                                type="button"
                                onClick={() => setInlineTab(topic.id, 'OVERVIEW')}
                                className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                  activeTab === 'OVERVIEW'
                                    ? 'border-amber-400 text-amber-300'
                                    : 'border-transparent text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Overview & Traps</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setInlineTab(topic.id, 'SUBTOPICS')}
                                className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                  activeTab === 'SUBTOPICS'
                                    ? 'border-amber-400 text-amber-300'
                                    : 'border-transparent text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Micro-Modules ({topic.subtopics.length})</span>
                                <span className="px-1.5 py-0.2 bg-slate-900 rounded text-[10px] text-emerald-400 font-bold border border-slate-800">
                                  Drill Down
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setInlineTab(topic.id, 'QUIZ')}
                                className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                  activeTab === 'QUIZ'
                                    ? 'border-amber-400 text-amber-300'
                                    : 'border-transparent text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Topic Quiz ({topicQuiz.length} MCQs)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setInlineTab(topic.id, 'FLASHCARDS')}
                                className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                  activeTab === 'FLASHCARDS'
                                    ? 'border-amber-400 text-amber-300'
                                    : 'border-transparent text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Active Recall Flashcards ({topicFlashcards.length})</span>
                              </button>
                            </div>

                            {/* Inline Tab Content */}
                            <div className="px-4 pb-5 sm:px-6 space-y-4 text-xs sm:text-sm">
                              {/* TAB 1: OVERVIEW & STRATEGIC BREAKDOWN */}
                              {activeTab === 'OVERVIEW' && (
                                <div className="space-y-4">
                                  {/* Strategic Civil Services Pedagogical Breakdown */}
                                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1.5">
                                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                                      <Compass className="w-4 h-4 text-amber-400" />
                                      <span>Strategic Civil Services Pedagogical Breakdown</span>
                                    </span>
                                    <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                                      {topic.deepDiveAnalysis}
                                    </p>
                                  </div>

                                  {/* Examiner Traps & Negative Marking Warnings */}
                                  <div className="p-4 bg-rose-950/20 border border-rose-600/40 rounded-2xl space-y-2">
                                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                                      <span>Examiner Traps & Common Cognitive Failure Modes</span>
                                    </span>
                                    <ul className="space-y-1.5 text-xs text-slate-300">
                                      {topic.examinerTraps.map((trap, tIdx) => (
                                        <li key={tIdx} className="flex items-start gap-2">
                                          <span className="text-rose-400 font-bold">•</span>
                                          <span>{trap}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Recommended Standard Books & Sources */}
                                  <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                                      <BookMarked className="w-4 h-4 text-amber-400" />
                                      <span>Must-Read Standard Textbooks & Chapters</span>
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {topic.mustReadSources.map((src, sIdx) => (
                                        <span
                                          key={sIdx}
                                          className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium"
                                        >
                                          📖 {src}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Weightage & Frequency Stat Card */}
                                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                                    <div>
                                      <span className="text-slate-500 font-semibold block">PYQ Frequency Trend:</span>
                                      <span className="text-slate-300 font-medium">{topic.pyqFrequency}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-slate-500 font-semibold block">Expected Exam Weightage:</span>
                                      <span className="text-amber-400 font-bold">{topic.weightage}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* TAB 2: MICRO SUB-MODULES ("DRILL DOWN INSIDE OF MORE AND MORE") */}
                              {activeTab === 'SUBTOPICS' && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-xs text-slate-400">
                                    <span>Click any sub-module below to read deep notes, key constitutional articles, and real PYQ linkages:</span>
                                    <span className="text-emerald-400 font-bold shrink-0">
                                      {topic.subtopics.filter((s) => masteredSubtopics.includes(s.id)).length} of {topic.subtopics.length} Mastered
                                    </span>
                                  </div>

                                  <div className="space-y-3">
                                    {topic.subtopics.map((sub, sIdx) => {
                                      const isSubMastered = masteredSubtopics.includes(sub.id);
                                      const isSubExpanded = expandedSubtopicIds.includes(sub.id);

                                      return (
                                        <div
                                          key={sub.id}
                                          className={`rounded-xl border transition-all overflow-hidden ${
                                            isSubExpanded
                                              ? 'bg-slate-900 border-amber-500/40 shadow-md'
                                              : isSubMastered
                                              ? 'bg-slate-900/90 border-emerald-500/40'
                                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                                          }`}
                                        >
                                          {/* Subtopic Header */}
                                          <div
                                            onClick={() => toggleExpandSubtopic(sub.id)}
                                            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                                          >
                                            <div className="flex items-center gap-2.5">
                                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[11px] font-bold shrink-0">
                                                {sIdx + 1}
                                              </span>
                                              <div>
                                                <h5 className="font-bold text-slate-100 text-xs sm:text-sm">
                                                  {sub.name}
                                                </h5>
                                                {sub.nameHindi && (
                                                  <div className="text-[11px] text-slate-400 font-serif">
                                                    {sub.nameHindi}
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleMasteredSubtopic(sub.id);
                                                }}
                                                className={`px-2 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                                                  isSubMastered
                                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                                                }`}
                                              >
                                                {isSubMastered ? (
                                                  <>
                                                    <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span>Mastered</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Square className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>Mark Done</span>
                                                  </>
                                                )}
                                              </button>

                                              <div className="p-1 rounded-lg text-slate-400 hover:text-slate-200">
                                                {isSubExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                              </div>
                                            </div>
                                          </div>

                                          {/* Nested Sub-Module Deep Content ("Inside of more and more") */}
                                          {isSubExpanded && (
                                            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/80 text-xs bg-slate-950/70">
                                              <p className="text-slate-300 leading-relaxed font-sans">
                                                {sub.details}
                                              </p>

                                              {/* Key Provisions */}
                                              {sub.keyPoints.length > 0 && (
                                                <div className="space-y-1.5">
                                                  <span className="font-semibold text-slate-400 block text-[11px]">
                                                    Essential Testable Provisions:
                                                  </span>
                                                  <ul className="space-y-1">
                                                    {sub.keyPoints.map((kp, kIdx) => (
                                                      <li key={kIdx} className="text-slate-300 flex items-start gap-2">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                                        <span>{kp}</span>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              )}

                                              {/* PYQ Real Examples */}
                                              {sub.pyqExamples && sub.pyqExamples.length > 0 && (
                                                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] space-y-1">
                                                  <span className="font-bold text-amber-400 flex items-center gap-1">
                                                    <Bookmark className="w-3 h-3" />
                                                    <span>Actual Exam PYQ Linkage:</span>
                                                  </span>
                                                  {sub.pyqExamples.map((pyq, pIdx) => (
                                                    <p key={pIdx} className="text-slate-300 italic">
                                                      &ldquo;{pyq}&rdquo;
                                                    </p>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* TAB 3: INTERACTIVE TOPIC QUIZ */}
                              {activeTab === 'QUIZ' && (
                                <div className="space-y-4">
                                  <div className="border-b border-slate-800 pb-2">
                                    <h5 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                                      <HelpCircle className="w-4 h-4 text-amber-400" />
                                      <span>Topic Knowledge Check ({topic.code})</span>
                                    </h5>
                                    <p className="text-[11px] text-slate-400">
                                      Click an option below to get immediate answer evaluation, official reason, and elimination tip:
                                    </p>
                                  </div>

                                  <div className="space-y-4">
                                    {topicQuiz.map((q, qIdx) => {
                                      const selected = userQuizAnswers[q.id];
                                      const isAnswered = selected !== undefined;
                                      const isCorrect = selected === q.correctLetter;

                                      return (
                                        <div
                                          key={q.id}
                                          className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3"
                                        >
                                          <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-amber-400">Question {qIdx + 1} ({q.examType} Pattern)</span>
                                            {isAnswered && (
                                              <span
                                                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                                                  isCorrect
                                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                                }`}
                                              >
                                                {isCorrect ? '✓ Correct Answer' : '✗ Incorrect'}
                                              </span>
                                            )}
                                          </div>

                                          <p className="text-xs sm:text-sm text-slate-200 font-medium whitespace-pre-line leading-relaxed">
                                            {q.questionText}
                                          </p>

                                          {/* Options */}
                                          <div className="space-y-2 pt-1">
                                            {q.options.map((opt) => {
                                              const isThisSelected = selected === opt.letter;
                                              const isThisCorrect = opt.letter === q.correctLetter;

                                              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                                              if (isAnswered) {
                                                if (isThisCorrect) {
                                                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                                                } else if (isThisSelected) {
                                                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                                                } else {
                                                  optionStyle = 'bg-slate-950/60 border-slate-800/60 text-slate-500 opacity-60';
                                                }
                                              }

                                              return (
                                                <button
                                                  key={opt.letter}
                                                  type="button"
                                                  onClick={() => {
                                                    if (!isAnswered) {
                                                      setUserQuizAnswers((prev) => ({ ...prev, [q.id]: opt.letter }));
                                                      setShowQuizExplanations((prev) => ({ ...prev, [q.id]: true }));
                                                    }
                                                  }}
                                                  disabled={isAnswered}
                                                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                                                >
                                                  <span className="font-bold shrink-0">{opt.letter}.</span>
                                                  <span>{opt.text}</span>
                                                </button>
                                              );
                                            })}
                                          </div>

                                          {/* Explanation Drawer when answered */}
                                          {isAnswered && (
                                            <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs animate-in fade-in duration-200">
                                              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                                                <Lightbulb className="w-3.5 h-3.5" />
                                                <span>Official Explanation & Reason:</span>
                                              </div>
                                              <p className="text-slate-300 leading-relaxed font-sans">
                                                {q.explanation}
                                              </p>
                                              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-amber-300/90">
                                                <strong>Elimination Strategy:</strong> {q.eliminationTip}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* TAB 4: ACTIVE RECALL FLASHCARDS */}
                              {activeTab === 'FLASHCARDS' && (
                                <div className="space-y-4">
                                  <div className="border-b border-slate-800 pb-2">
                                    <h5 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                                      <Sparkles className="w-4 h-4 text-amber-400" />
                                      <span>Active Recall Flashcards for {topic.code}</span>
                                    </h5>
                                    <p className="text-[11px] text-slate-400">
                                      Click any card below to flip between front (question) and back (answer & memory trigger):
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {topicFlashcards.map((card) => {
                                      const isFlipped = Boolean(flippedFlashcards[card.id]);

                                      return (
                                        <div
                                          key={card.id}
                                          onClick={() =>
                                            setFlippedFlashcards((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
                                          }
                                          className={`p-4 rounded-2xl border transition-all cursor-pointer min-h-[150px] flex flex-col justify-between select-none ${
                                            isFlipped
                                              ? 'bg-amber-950/20 border-amber-500/50 shadow-md'
                                              : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
                                          }`}
                                        >
                                          <div>
                                            <div className="flex items-center justify-between text-[11px] mb-2">
                                              <span className="font-mono font-bold text-amber-400">
                                                {card.category}
                                              </span>
                                              <span className="text-slate-500 text-[10px] flex items-center gap-1">
                                                <RotateCw className="w-3 h-3" />
                                                {isFlipped ? 'Click to flip back' : 'Click to reveal'}
                                              </span>
                                            </div>

                                            <p className="font-semibold text-slate-200 text-xs sm:text-sm leading-snug">
                                              {isFlipped ? card.back : card.front}
                                            </p>
                                          </div>

                                          {card.mnemonic && (
                                            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-amber-300/80 italic">
                                              💡 Mnemonic: {card.mnemonic}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseDeepDive();
          }}
        >
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
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

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleMasteredTopic(activeDeepDiveTopic.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    masteredTopics.includes(activeDeepDiveTopic.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                  title="Mark topic as completed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{masteredTopics.includes(activeDeepDiveTopic.id) ? 'Mastered' : 'Mark as Studied'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseDeepDive}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close modal [Esc]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Interactive Navigation Tabs */}
            <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 bg-slate-950 border-b border-slate-800 text-xs overflow-x-auto">
              <button
                type="button"
                onClick={() => setModalTab('OVERVIEW')}
                className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  modalTab === 'OVERVIEW'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Overview & Blueprint</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('SUBTOPICS')}
                className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  modalTab === 'SUBTOPICS'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Micro Sub-Modules ({activeDeepDiveTopic.subtopics.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('QUIZ')}
                className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  modalTab === 'QUIZ'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Interactive Quiz ({activeQuizQuestions.length} MCQs)</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('FLASHCARDS')}
                className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  modalTab === 'FLASHCARDS'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active Recall Flashcards ({activeFlashcards.length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm flex-1">
              {/* TAB 1: OVERVIEW & BLUEPRINT */}
              {modalTab === 'OVERVIEW' && (
                <div className="space-y-5">
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
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Strategic Civil Services Pedagogical Breakdown</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {activeDeepDiveTopic.deepDiveAnalysis}
                    </p>
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
              )}

              {/* TAB 2: MICRO SUB-MODULES ("INSIDE OF MORE AND MORE") */}
              {modalTab === 'SUBTOPICS' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-emerald-400" />
                        <span>Interactive Sub-Modules & Testable Articles</span>
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Check off each sub-module as you master its concepts
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      {activeDeepDiveTopic.subtopics.filter(s => masteredSubtopics.includes(s.id)).length} of {activeDeepDiveTopic.subtopics.length} Mastered
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeDeepDiveTopic.subtopics.map((sub, idx) => {
                      const isSubMastered = masteredSubtopics.includes(sub.id);

                      return (
                        <div
                          key={sub.id}
                          className={`p-4 rounded-xl border transition-all space-y-3 ${
                            isSubMastered
                              ? 'bg-slate-950/90 border-emerald-500/40'
                              : 'bg-slate-950/70 border-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <div>
                                <h5 className="font-bold text-slate-100 text-xs sm:text-sm">
                                  {sub.name}
                                </h5>
                                {sub.nameHindi && (
                                  <div className="text-[11px] text-slate-400 font-serif">
                                    {sub.nameHindi}
                                  </div>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleMasteredSubtopic(sub.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
                                isSubMastered
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {isSubMastered ? (
                                <>
                                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Mastered</span>
                                </>
                              ) : (
                                <>
                                  <Square className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Mark Understood</span>
                                </>
                              )}
                            </button>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed pl-7 font-sans">
                            {sub.details}
                          </p>

                          {/* Key Constitutional Articles / Facts Bullet Points */}
                          {sub.keyPoints.length > 0 && (
                            <div className="pl-7 space-y-1.5 pt-1">
                              <span className="text-[11px] font-semibold text-slate-400 block">
                                Essential Testable Provisions:
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
                              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] space-y-1">
                                <span className="font-bold text-amber-400 flex items-center gap-1">
                                  <Bookmark className="w-3 h-3" />
                                  <span>Actual Exam PYQ Linkage:</span>
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
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: INTERACTIVE MINI QUIZ */}
              {modalTab === 'QUIZ' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span>Interactive Knowledge Check for {activeDeepDiveTopic.code}</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Test your conceptual grasp & elimination skills with immediate feedback
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeQuizQuestions.map((q, qIdx) => {
                      const selected = userQuizAnswers[q.id];
                      const isAnswered = selected !== undefined;
                      const isCorrect = selected === q.correctLetter;

                      return (
                        <div
                          key={q.id}
                          className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-amber-400">Question {qIdx + 1} ({q.examType} Style)</span>
                            {isAnswered && (
                              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              }`}>
                                {isCorrect ? '✓ Correct Answer' : '✗ Incorrect'}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 font-medium whitespace-pre-line leading-relaxed">
                            {q.questionText}
                          </p>

                          {/* Options */}
                          <div className="space-y-2 pt-1">
                            {q.options.map((opt) => {
                              const isThisSelected = selected === opt.letter;
                              const isThisCorrect = opt.letter === q.correctLetter;

                              let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                              if (isAnswered) {
                                if (isThisCorrect) {
                                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                                } else if (isThisSelected) {
                                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                                } else {
                                  optionStyle = 'bg-slate-900/60 border-slate-800/60 text-slate-500 opacity-60';
                                }
                              }

                              return (
                                <button
                                  key={opt.letter}
                                  type="button"
                                  onClick={() => {
                                    if (!isAnswered) {
                                      setUserQuizAnswers((prev) => ({ ...prev, [q.id]: opt.letter }));
                                      setShowQuizExplanations((prev) => ({ ...prev, [q.id]: true }));
                                    }
                                  }}
                                  disabled={isAnswered}
                                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                                >
                                  <span className="font-bold shrink-0">{opt.letter}.</span>
                                  <span>{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation Drawer when answered */}
                          {isAnswered && (
                            <div className="mt-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 text-xs animate-in fade-in duration-200">
                              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5" />
                                <span>Official Explanation & Reason:</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed font-sans">
                                {q.explanation}
                              </p>
                              <div className="p-2 bg-slate-950 rounded border border-slate-800/80 text-[11px] text-amber-300/90">
                                <strong>Elimination Tip:</strong> {q.eliminationTip}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ACTIVE RECALL FLASHCARDS */}
              {modalTab === 'FLASHCARDS' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Active Recall Flashcards for {activeDeepDiveTopic.code}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Click any card to reveal its back and test your memory retention
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeFlashcards.map((card) => {
                      const isFlipped = Boolean(flippedFlashcards[card.id]);

                      return (
                        <div
                          key={card.id}
                          onClick={() => setFlippedFlashcards((prev) => ({ ...prev, [card.id]: !prev[card.id] }))}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer min-h-[160px] flex flex-col justify-between select-none ${
                            isFlipped
                              ? 'bg-amber-950/20 border-amber-500/50 shadow-md'
                              : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] mb-2">
                              <span className="font-mono font-bold text-amber-400">
                                {card.category}
                              </span>
                              <span className="text-slate-500 text-[10px] flex items-center gap-1">
                                <RotateCw className="w-3 h-3" />
                                {isFlipped ? 'Click to flip back' : 'Click to reveal'}
                              </span>
                            </div>

                            <p className="font-semibold text-slate-200 text-xs sm:text-sm leading-snug">
                              {isFlipped ? card.back : card.front}
                            </p>
                          </div>

                          {card.mnemonic && (
                            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-amber-300/80 italic">
                              💡 Mnemonic: {card.mnemonic}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePlayAudioSummary(activeDeepDiveTopic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    playingAudioTopicId === activeDeepDiveTopic.id
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                  title="Listen to topic audio summary via Web Speech API"
                >
                  {playingAudioTopicId === activeDeepDiveTopic.id ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{playingAudioTopicId === activeDeepDiveTopic.id ? 'Stop Audio' : 'Listen to Audio'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyNotes}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedNote ? 'Copied to Clipboard!' : 'Copy Topic Notes'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScheduleSpacedRevision(activeDeepDiveTopic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    scheduledTopicIds.includes(activeDeepDiveTopic.id)
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-slate-700'
                  }`}
                  title="Schedule 1d, 3d, 7d, 15d, 30d spaced revisions in Study Calendar"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{scheduledTopicIds.includes(activeDeepDiveTopic.id) ? 'Revisions Scheduled' : 'Schedule in Calendar'}</span>
                </button>

                <span className="text-xs text-slate-500 hidden sm:inline">
                  Code: <strong className="text-slate-300">{activeDeepDiveTopic.code}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeDeepDiveTopic.lessonIdLink && onSelectTopicLesson && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTopicLesson(activeDeepDiveTopic.lessonIdLink!);
                      handleCloseDeepDive();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-amber-500/20 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open 12-Step Masterclass Lesson</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCloseDeepDive}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close [Esc]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
