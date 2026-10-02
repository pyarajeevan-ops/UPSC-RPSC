import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Calendar,
  CheckCircle2,
  Bookmark,
  Share2,
  ChevronRight,
  ChevronDown,
  Layers,
  Award,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Filter,
  Flame,
  Globe,
  Scale,
  TrendingUp,
  Atom,
  Shield,
  GraduationCap,
  Copy,
  Check,
  Zap,
  RotateCcw,
  Eye,
  EyeOff,
  X,
  FileText,
  FolderClock
} from 'lucide-react';
import {
  COMPLETE_CURRICULUM_DOMAINS,
  CurriculumDomain,
  KnowledgeBit
} from '../data/curriculumKnowledgeData';
import { LanguageMedium, UserProfile } from '../types';
import {
  logHistoryActivity,
  addUniversalBookmark,
  removeUniversalBookmark,
  getUniversalBookmarks
} from '../utils/historyAndBookmarkStorage';

interface CurriculumKnowledgeVaultProps {
  language: LanguageMedium;
  userProfile?: UserProfile;
  onOpenCalendar?: () => void;
  onOpenTestMode?: () => void;
  onOpenSyllabus?: () => void;
  onOpenNotesHistory?: () => void;
}

export const CurriculumKnowledgeVault: React.FC<CurriculumKnowledgeVaultProps> = ({
  language,
  userProfile,
  onOpenCalendar,
  onOpenTestMode,
  onOpenSyllabus,
  onOpenNotesHistory,
}) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ancient-medieval-history');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [examFilter, setExamFilter] = useState<'ALL' | 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE'>('ALL');
  const [expandedBitId, setExpandedBitId] = useState<string | null>('hist-02');
  const [savedBitIds, setSavedBitIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('margdarshak_saved_knowledge_bits');
    return saved ? JSON.parse(saved) : ['hist-02', 'pol-01'];
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scheduleToast, setScheduleToast] = useState<string | null>(null);

  // Completed micro-bits tracker
  const [masteredBitIds, setMasteredBitIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('margdarshak_mastered_knowledge_bits');
    return saved ? JSON.parse(saved) : ['hist-01'];
  });

  // Interactive Modals: Flashcard Deck or Quick Concept Drill
  const [activeFlashcardBit, setActiveFlashcardBit] = useState<KnowledgeBit | null>(null);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);
  const [activeQuizBit, setActiveQuizBit] = useState<KnowledgeBit | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const toggleMasteredBit = (bitId: string) => {
    setMasteredBitIds((prev) => {
      const next = prev.includes(bitId) ? prev.filter((id) => id !== bitId) : [...prev, bitId];
      localStorage.setItem('margdarshak_mastered_knowledge_bits', JSON.stringify(next));
      return next;
    });
  };

  const toggleSaveBit = (bit: KnowledgeBit) => {
    const isCurrentlySaved = savedBitIds.includes(bit.id);
    const next = isCurrentlySaved ? savedBitIds.filter((id) => id !== bit.id) : [...savedBitIds, bit.id];
    setSavedBitIds(next);
    localStorage.setItem('margdarshak_saved_knowledge_bits', JSON.stringify(next));

    if (!isCurrentlySaved) {
      // Map to Universal Bookmark Category
      let cat: 'Polity & Constitution' | 'History & Culture' | 'Geography & Environment' | 'Economy & Schemes' | 'General Science' | 'Rajasthan Special' | 'High-Yield Revision' = 'High-Yield Revision';
      if (bit.subject.includes('History')) cat = 'History & Culture';
      else if (bit.subject.includes('Polity')) cat = 'Polity & Constitution';
      else if (bit.subject.includes('Geography') || bit.subject.includes('Environment')) cat = 'Geography & Environment';
      else if (bit.subject.includes('Economy')) cat = 'Economy & Schemes';
      else if (bit.subject.includes('Science')) cat = 'General Science';
      else if (bit.targetExam === 'RAJASTHAN_EXCLUSIVE') cat = 'Rajasthan Special';

      addUniversalBookmark({
        itemType: 'CURRICULUM_BIT',
        itemId: bit.id,
        title: `${bit.topic}: ${bit.subtopic}`,
        contentSnippet: bit.keyFactOrConcept,
        category: cat,
        targetExam: bit.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
        subject: bit.subject,
        sourceTag: `Knowledge Vault (${bit.referencePage})`,
        notes: bit.trapAlert ? `Exam Trap: ${bit.trapAlert}` : undefined
      });
      setScheduleToast(`Bookmarked to "${cat}" folder & logged in History!`);
      setTimeout(() => setScheduleToast(null), 3500);
    }
  };

  const handleCopyBit = (bit: KnowledgeBit) => {
    const textToCopy = `[MARGDARSHAK CIVIL SERVICES KNOWLEDGE BIT]\nTopic: ${bit.topic} (${bit.subtopic})\nTarget: ${bit.targetExam}\n\nCore Concept:\n${bit.keyFactOrConcept}\n\nDeepdive:\n${bit.detailedExplanation}\n\nExam Trap:\n${bit.trapAlert || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(bit.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleScheduleBitInCalendar = async (bit: KnowledgeBit) => {
    try {
      const res = await fetch('/api/calendar/auto-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'spaced-revision',
          topicId: bit.id,
          topicTitle: `${bit.topic}: ${bit.subtopic}`,
          subject: bit.subject,
          examTag: bit.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
        }),
      });
      if (res.ok) {
        setScheduleToast(`Scheduled 5 Spaced Revisions for "${bit.topic}" into Study Calendar!`);
        setTimeout(() => setScheduleToast(null), 4500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeDomain = useMemo(() => {
    return COMPLETE_CURRICULUM_DOMAINS.find((d) => d.id === selectedDomainId) || COMPLETE_CURRICULUM_DOMAINS[0];
  }, [selectedDomainId]);

  // Filtered bits across either current domain or global search
  const filteredBits = useMemo(() => {
    let sourceBits = activeDomain.bits;
    if (searchQuery.trim().length > 1) {
      // Search across ALL domains when searching!
      sourceBits = COMPLETE_CURRICULUM_DOMAINS.flatMap((d) => d.bits);
    }

    return sourceBits.filter((bit) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        bit.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bit.subtopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bit.keyFactOrConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bit.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bit.highYieldTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesExam =
        examFilter === 'ALL' ||
        (examFilter === 'COMMON_CORE' && bit.targetExam === 'COMMON_CORE') ||
        (examFilter === 'RAJASTHAN_EXCLUSIVE' && bit.targetExam === 'RAJASTHAN_EXCLUSIVE');

      return matchesSearch && matchesExam;
    });
  }, [activeDomain, searchQuery, examFilter]);

  const domainIcons: Record<string, React.ElementType> = {
    'ancient-medieval-history': Flame,
    'modern-india-national-movement': Award,
    'geography-world-india': Globe,
    'indian-polity-constitution': Scale,
    'indian-economy-development': TrendingUp,
    'general-science-physics-chem-bio': Atom,
    'general-knowledge-superlatives': Shield,
  };

  const totalBitsCountAll = useMemo(() => {
    return COMPLETE_CURRICULUM_DOMAINS.reduce((acc, d) => acc + d.bits.length, 0);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Toast Notification */}
      {scheduleToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-purple-500 text-slate-950 font-semibold shadow-2xl border border-purple-400 text-xs animate-fade-in">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{scheduleToast}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Full-Spectrum Integrated Curriculum Vault</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{totalBitsCountAll} Core Micro-Bits</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {language === 'Hindi'
                ? 'पाठ्यक्रम ज्ञान निधि (Curriculum Bits Explorer)'
                : 'Comprehensive Integrated Curriculum & Knowledge Vault'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every critical topic across <strong className="text-amber-300">Ancient & Medieval History, Modern India, World & Indian Geography, Indian Polity, Macroeconomics, General Science, and Defense GK</strong> synthesized with exam traps, official citations, and 1-click spaced review scheduling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenCalendar && (
              <button
                type="button"
                onClick={onOpenCalendar}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Study Calendar</span>
              </button>
            )}
            {onOpenNotesHistory && (
              <button
                type="button"
                onClick={onOpenNotesHistory}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <FolderClock className="w-4 h-4 text-blue-400" />
                <span>PDF Notes & History</span>
              </button>
            )}
            {onOpenTestMode && (
              <button
                type="button"
                onClick={onOpenTestMode}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/15"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>Test Simulator</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Search and Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all curriculum bits (e.g. 'Pashupati', '1857', 'Article 243', 'TIR', 'Repo Rate')..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            <div className="flex bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setExamFilter('ALL')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  examFilter === 'ALL'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setExamFilter('COMMON_CORE')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  examFilter === 'COMMON_CORE'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Common Core (70%)
              </button>
              <button
                onClick={() => setExamFilter('RAJASTHAN_EXCLUSIVE')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  examFilter === 'RAJASTHAN_EXCLUSIVE'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Rajasthan Layer (20%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {COMPLETE_CURRICULUM_DOMAINS.map((domain) => {
          const Icon = domainIcons[domain.id] || BookOpen;
          const isActive = domain.id === selectedDomainId && !searchQuery.trim();
          return (
            <button
              key={domain.id}
              onClick={() => {
                setSelectedDomainId(domain.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/70 hover:bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{language === 'Hindi' ? domain.domainNameHindi : domain.domainName}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                {domain.bits.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Knowledge Bits List Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-amber-300">{filteredBits.length}</strong> knowledge modules
            {searchQuery.trim() && ` matching "${searchQuery}"`}
          </span>
          <span className="text-slate-400">
            Saved to Vault: <strong className="text-emerald-400">{savedBitIds.length}</strong>
          </span>
        </div>

        {filteredBits.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-300">No matching curriculum bits found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try adjusting your search keyword or clear filters to view the full spectrum of modules.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setExamFilter('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredBits.map((bit) => {
            const isExpanded = expandedBitId === bit.id;
            const isSaved = savedBitIds.includes(bit.id);

            return (
              <div
                key={bit.id}
                className={`bg-slate-900/80 border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-amber-500/50 shadow-xl' : 'border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Module Summary Header */}
                <div
                  onClick={() => {
                    const willExpand = !isExpanded;
                    setExpandedBitId(willExpand ? bit.id : null);
                    if (willExpand) {
                      logHistoryActivity({
                        type: 'READ_CURRICULUM_BIT',
                        title: `${bit.topic}: ${bit.subtopic}`,
                        subtitle: `${bit.subject} • ${bit.referencePage}`,
                        category: bit.subject,
                        targetExam: bit.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
                        metadata: { topicId: bit.id, tags: bit.highYieldTags }
                      });
                    }
                  }}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/25">
                        {bit.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {bit.referencePage}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                        bit.targetExam === 'COMMON_CORE'
                          ? 'bg-blue-500/10 text-blue-300 border-blue-500/25'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                      }`}>
                        {bit.targetExam === 'COMMON_CORE' ? '70% Common Core' : '20% Rajasthan Layer'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                      <span>{bit.topic}</span>
                      <span className="text-slate-400 font-normal text-xs">— {bit.subtopic}</span>
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {bit.keyFactOrConcept}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMasteredBit(bit.id);
                      }}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        masteredBitIds.includes(bit.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 border-slate-700'
                      }`}
                      title={masteredBitIds.includes(bit.id) ? 'Mastered ✓' : 'Mark as Mastered'}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${masteredBitIds.includes(bit.id) ? 'text-amber-400' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveBit(bit);
                      }}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 border-slate-700'
                      }`}
                      title={isSaved ? 'Saved in Personal Vault' : 'Bookmark to Vault'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFlashcardBit(bit);
                        setIsFlashcardFlipped(false);
                      }}
                      className="p-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-colors cursor-pointer"
                      title="Open Active Recall Flashcard"
                    >
                      <Zap className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleBitInCalendar(bit);
                      }}
                      className="p-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-colors cursor-pointer"
                      title="Schedule Spaced Revision in Study Calendar"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>

                    <div className="p-2 text-slate-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Breakdown */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-5 animate-fade-in">
                    {/* Deepdive Explanation */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Exhaustive Syllabus Knowledge Extraction</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                        {bit.detailedExplanation}
                      </div>
                    </div>

                    {/* Dual Exam Angle & Trap Alerts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/30 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                          <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
                          <span>UPSC & RPSC Exam Question Angle</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {bit.examAngle}
                        </p>
                      </div>

                      {bit.trapAlert && (
                        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/30 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Examiner Trap & Misconception Alert</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {bit.trapAlert}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* High-Yield Tags */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-xs text-slate-400">High-Yield Concepts:</span>
                      {bit.highYieldTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-amber-200/90 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyBit(bit)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                        >
                          {copiedId === bit.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Micro-Notes</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleScheduleBitInCalendar(bit)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Schedule in Calendar (1d, 3d, 7d, 15d, 30d)</span>
                        </button>
                      </div>

                      {onOpenSyllabus && (
                        <button
                          type="button"
                          onClick={onOpenSyllabus}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                        >
                          <span>Explore in Full Syllabus Directory</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Interactive Active Recall Flashcard Modal */}
      {activeFlashcardBit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Active Recall Flashcard</span>
                </span>
                <span className="text-xs text-slate-400">
                  {activeFlashcardBit.subject} • {activeFlashcardBit.referencePage}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveFlashcardBit(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flashcard Body */}
            <div
              onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
              className="min-h-[220px] p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/80 cursor-pointer flex flex-col justify-between hover:border-amber-400/50 transition-all select-none shadow-inner"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <span>{isFlashcardFlipped ? 'Revealed Concept & Deep-Dive' : 'Prompt / Recall Trigger'}</span>
                  <span className="text-[11px] text-slate-400 font-normal">Click or Tap to Flip ↻</span>
                </div>

                {!isFlashcardFlipped ? (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xl font-bold text-white">
                      {activeFlashcardBit.topic}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300">
                      Subtopic: {activeFlashcardBit.subtopic}
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-amber-200/90">
                      Question angle: {activeFlashcardBit.examAngle}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 animate-fade-in">
                    <p className="text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-line leading-relaxed">
                      {activeFlashcardBit.detailedExplanation}
                    </p>
                    {activeFlashcardBit.trapAlert && (
                      <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-300">
                        <strong>Trap Alert:</strong> {activeFlashcardBit.trapAlert}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 mt-4">
                <span>{isFlashcardFlipped ? 'Answer Displayed' : 'Try testing your memory before flipping'}</span>
                <span className="text-blue-400 font-medium">
                  {isFlashcardFlipped ? 'Tap to hide' : 'Tap to reveal'}
                </span>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  toggleMasteredBit(activeFlashcardBit.id);
                  setActiveFlashcardBit(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{masteredBitIds.includes(activeFlashcardBit.id) ? 'Mastered in Deck ✓' : 'Mark as Mastered'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleScheduleBitInCalendar(activeFlashcardBit)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule 5-3-2-1-1 Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
