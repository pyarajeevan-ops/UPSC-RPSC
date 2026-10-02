import React, { useState, useMemo } from 'react';
import {
  Library,
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  BookmarkCheck,
  FolderClock,
  Sparkles,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building,
  Castle,
  Award,
  Globe,
  Download,
  Copy,
  Check,
  X,
  Target,
  Clock,
  BookMarked
} from 'lucide-react';
import {
  STANDARD_BOOKS_DIRECTORY,
  StandardBookResource,
  EXPANDED_OFFICIAL_GOVERNMENT_PORTALS,
  OfficialGovernmentPortal,
  OFFICIAL_PYQ_REPOSITORY,
  OfficialPyqArchive,
  CURRENT_AFFAIRS_MAGAZINES,
  CurrentAffairsCompendium,
  HIGH_YIELD_CHEAT_SHEETS,
  HighYieldCheatSheet
} from '../data/resourcesData';
import { LanguageMedium, UserProfile } from '../types';
import {
  addUniversalBookmark,
  removeUniversalBookmark,
  getUniversalBookmarks,
  logHistoryActivity,
  saveOfflineNote,
  extractNotesFromRawText
} from '../utils/historyAndBookmarkStorage';

interface ResourcesLibraryViewProps {
  language: LanguageMedium;
  userProfile?: UserProfile;
  onNavigateToTab?: (tab: string) => void;
  onSelectTopicLesson?: (lessonId: string) => void;
}

export const ResourcesLibraryView: React.FC<ResourcesLibraryViewProps> = ({
  language,
  userProfile,
  onNavigateToTab,
  onSelectTopicLesson
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'books' | 'portals' | 'pyqs' | 'magazines' | 'cheatsheets'>('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('ALL');
  const [selectedExamScope, setSelectedExamScope] = useState<'ALL' | 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE'>('ALL');

  // Interactive Book Modal
  const [selectedBookModal, setSelectedBookModal] = useState<StandardBookResource | null>(null);
  // Interactive Portal Modal
  const [selectedPortalModal, setSelectedPortalModal] = useState<OfficialGovernmentPortal | null>(null);
  // Interactive PYQ Modal
  const [selectedPyqModal, setSelectedPyqModal] = useState<OfficialPyqArchive | null>(null);
  // Interactive Cheat Sheet Modal
  const [selectedCheatSheetModal, setSelectedCheatSheetModal] = useState<HighYieldCheatSheet | null>(null);

  // Universal Bookmarks state
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<string[]>(() => {
    try {
      return getUniversalBookmarks().map((b) => b.itemId);
    } catch {
      return [];
    }
  });

  // Action toast state
  const [actionToast, setActionToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  };

  // Toggle Bookmark Handler
  const handleToggleBookmark = (
    itemId: string,
    title: string,
    snippet: string,
    category: any,
    targetExam: 'UPSC' | 'RPSC' | 'DUAL',
    sourceTag: string,
    subject?: string
  ) => {
    const isBookmarked = bookmarkedItemIds.includes(itemId);
    if (isBookmarked) {
      const match = getUniversalBookmarks().find((b) => b.itemId === itemId);
      if (match) removeUniversalBookmark(match.id);
      setBookmarkedItemIds((prev) => prev.filter((id) => id !== itemId));
      showToast(`Removed "${title.substring(0, 30)}..." from Bookmarks.`);
    } else {
      addUniversalBookmark({
        itemType: 'BOOK_RESOURCE',
        itemId,
        title,
        contentSnippet: snippet,
        category,
        targetExam,
        sourceTag,
        subject
      });
      setBookmarkedItemIds((prev) => [...prev, itemId]);
      showToast(`Saved "${title.substring(0, 30)}..." to Universal Bookmarks!`);
    }
  };

  // Log Resource Reading
  const handleLogResourceStudy = (title: string, subtitle: string, category: string, exam: 'UPSC' | 'RPSC' | 'DUAL') => {
    logHistoryActivity({
      type: 'READ_CURRICULUM_BIT',
      title: `Consulted: ${title}`,
      subtitle,
      category,
      targetExam: exam
    });
    showToast(`Logged study session for "${title}" in History!`);
  };

  // Send resource summary to Offline PDF Notes Synthesizer
  const handleSynthesizeIntoOfflineNotes = (title: string, categoryStr: string, textSnippet: string) => {
    const generated = extractNotesFromRawText(textSnippet, `${title.replace(/\s+/g, '_')}.pdf`);
    saveOfflineNote(generated);
    showToast(`Synthesized & saved structured notes into "${generated.category}" in Offline Vault!`);
  };

  // Filter calculations
  const filteredBooks = useMemo(() => {
    return STANDARD_BOOKS_DIRECTORY.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.mustReadChapters.some((c) => c.toLowerCase().includes(q)) ||
        b.keyTopicsCovered.some((k) => k.toLowerCase().includes(q));

      const matchesSubject = selectedSubjectFilter === 'ALL' || b.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
      const matchesScope =
        selectedExamScope === 'ALL' ||
        (selectedExamScope === 'COMMON_CORE' && (b.category === 'UPSC_CORE' || b.category === 'DUAL_OVERLAP')) ||
        (selectedExamScope === 'RAJASTHAN_EXCLUSIVE' && b.category === 'RAJASTHAN_EXCLUSIVE');

      return matchesSearch && matchesSubject && matchesScope;
    });
  }, [searchQuery, selectedSubjectFilter, selectedExamScope]);

  const filteredPortals = useMemo(() => {
    return EXPANDED_OFFICIAL_GOVERNMENT_PORTALS.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.highYieldReports.some((r) => r.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  const filteredPyqs = useMemo(() => {
    return OFFICIAL_PYQ_REPOSITORY.filter((pyq) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        q === '' ||
        pyq.exam.toLowerCase().includes(q) ||
        pyq.year.toString().includes(q) ||
        pyq.paper.toLowerCase().includes(q) ||
        pyq.strategicAnalysis.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const filteredCheatSheets = useMemo(() => {
    return HIGH_YIELD_CHEAT_SHEETS.filter((cs) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        cs.title.toLowerCase().includes(q) ||
        (cs.titleHindi && cs.titleHindi.toLowerCase().includes(q)) ||
        cs.subject.toLowerCase().includes(q) ||
        cs.summary.toLowerCase().includes(q) ||
        cs.tags.some((t) => t.toLowerCase().includes(q)) ||
        (cs.keyMnemonicOrRule && cs.keyMnemonicOrRule.toLowerCase().includes(q)) ||
        cs.quickFacts.some((f) => f.label.toLowerCase().includes(q) || f.value.toLowerCase().includes(q));

      const matchesSubject = selectedSubjectFilter === 'ALL' || cs.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
      const matchesScope =
        selectedExamScope === 'ALL' ||
        (selectedExamScope === 'COMMON_CORE' && (cs.category === 'UPSC_CORE' || cs.category === 'DUAL_OVERLAP')) ||
        (selectedExamScope === 'RAJASTHAN_EXCLUSIVE' && cs.category === 'RAJASTHAN_EXCLUSIVE');

      return matchesSearch && matchesSubject && matchesScope;
    });
  }, [searchQuery, selectedSubjectFilter, selectedExamScope]);

  const allSubjects = [
    'Polity',
    'History',
    'Geography',
    'Economy',
    'Art & Culture',
    'Environment',
    'Science',
    'Rajasthan'
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Toast */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold shadow-2xl border border-amber-300 text-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-wide">
              <Library className="w-3.5 h-3.5 text-amber-400" />
              <span>Vetted Civil Services Knowledge Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Zero-Hallucination Vetted Sources</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {language === 'Hindi'
                ? 'प्रामाणिक अध्ययन सामग्री, मानक पुस्तकें व सरकारी पोर्टल'
                : 'Verified Resources, Standard Books & Official Portals'}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Explore the curated master library of standard textbooks (NCERTs, Laxmikanth, Spectrum, Rajasthan Granth Academy), official government portals, 10-year PYQ archives, and monthly policy digests with one-click bookmarking and note synthesis.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onNavigateToTab && (
              <button
                type="button"
                onClick={() => onNavigateToTab('notes-history')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <FolderClock className="w-4 h-4 text-emerald-400" />
                <span>Open Offline Notes Vault</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Main Resource Sub-Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveSubTab('books')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'books'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Standard Books & NCERTs</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'books' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {STANDARD_BOOKS_DIRECTORY.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('portals')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'portals'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Official Government Portals</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'portals' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {EXPANDED_OFFICIAL_GOVERNMENT_PORTALS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('pyqs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'pyqs'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Official PYQs & Keys</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'pyqs' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {OFFICIAL_PYQ_REPOSITORY.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('magazines')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'magazines'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Magazines & Compendiums</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'magazines' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {CURRENT_AFFAIRS_MAGAZINES.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('cheatsheets')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'cheatsheets'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Revision Cheat Sheets</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'cheatsheets' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {HIGH_YIELD_CHEAT_SHEETS.length}
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-400 hidden lg:block">
            {activeSubTab === 'books' && 'Must-read chapters, reading roadmap & chapter guides'}
            {activeSubTab === 'portals' && 'Authoritative gazettes, survey data & policy releases'}
            {activeSubTab === 'pyqs' && 'Official question papers, cutoffs & answer key status'}
            {activeSubTab === 'magazines' && 'Yojana, Kurukshetra, Sujas & India Year Book'}
            {activeSubTab === 'cheatsheets' && 'High-yield revision matrices, constitutional tables & mnemonics'}
          </div>
        </div>
      </div>

      {/* Global Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search across ${activeSubTab}... (e.g. Laxmikanth, NCERT, Sujas, Bhadla, Wildlife, Aravalli, 2024)`}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {(activeSubTab === 'books' || activeSubTab === 'cheatsheets') && (
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="ALL">All Subjects</option>
              {allSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedExamScope}
              onChange={(e) => setSelectedExamScope(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="ALL">All Scopes</option>
              <option value="COMMON_CORE">70% Common Core</option>
              <option value="RAJASTHAN_EXCLUSIVE">20% Rajasthan Layer</option>
            </select>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------
          SUB-TAB 1: STANDARD BOOKS & NCERTS
         --------------------------------------------------------------------- */}
      {activeSubTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No books found</h3>
              <p className="text-xs text-slate-400">Try changing your search terms or subject filter.</p>
            </div>
          ) : (
            filteredBooks.map((book) => {
              const isBookmarked = bookmarkedItemIds.includes(book.id);
              const isCommon = book.category === 'UPSC_CORE' || book.category === 'DUAL_OVERLAP';

              return (
                <div
                  key={book.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 transition-all shadow-sm group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isCommon
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {isCommon ? '70% Common Core' : '20% Rajasthan Exclusive'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {book.level}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {book.title}
                      </h3>
                      <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                        By {book.author} • {book.edition}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {book.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 block">
                        Must-Read Focus Chapters ({book.mustReadChapters.length}):
                      </span>
                      <div className="space-y-1">
                        {book.mustReadChapters.slice(0, 3).map((chap, cIdx) => (
                          <div key={cIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span className="line-clamp-1">{chap}</span>
                          </div>
                        ))}
                        {book.mustReadChapters.length > 3 && (
                          <div className="text-[10px] text-slate-500 font-medium">
                            + {book.mustReadChapters.length - 3} more critical chapters
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedBookModal(book)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Read Study Guide →
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(
                          book.id,
                          book.title,
                          book.description,
                          book.category === 'RAJASTHAN_EXCLUSIVE' ? 'Rajasthan Special' : 'High-Yield Revision',
                          book.category === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
                          book.author,
                          book.subject
                        )}
                        className={`p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                        }`}
                        title="Bookmark Book"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>

                      {book.officialOrPdfLink && (
                        <a
                          href={book.officialOrPdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                          title="Open Official Publisher Portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUB-TAB 2: VERIFIED OFFICIAL GOVERNMENT PORTALS
         --------------------------------------------------------------------- */}
      {activeSubTab === 'portals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortals.map((portal) => {
            const isBookmarked = bookmarkedItemIds.includes(portal.id);
            return (
              <div
                key={portal.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 transition-all shadow-sm group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {portal.category}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {portal.name}
                    </h3>
                    {portal.nameHindi && (
                      <p className="text-xs text-slate-400 font-serif mt-0.5">{portal.nameHindi}</p>
                    )}
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{portal.organization}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {portal.description}
                  </p>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <span className="text-[11px] font-bold text-amber-300 block">Prelims Examination Utility:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {portal.keyPrelimsUtility}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedPortalModal(portal)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-all cursor-pointer border border-slate-700"
                  >
                    View Gazetted Mandate →
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(
                        portal.id,
                        portal.name,
                        portal.description,
                        'Polity & Constitution',
                        portal.category.includes('State') ? 'RPSC' : 'DUAL',
                        portal.organization,
                        'Official Portal'
                      )}
                      className={`p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                      }`}
                      title="Bookmark Official Portal"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
                      title="Open Verified Official Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUB-TAB 3: OFFICIAL PYQS & ANSWER KEYS REPOSITORY
         --------------------------------------------------------------------- */}
      {activeSubTab === 'pyqs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPyqs.map((pyq) => {
              const isUPSC = pyq.exam.includes('UPSC');
              return (
                <div
                  key={pyq.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 transition-all shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isUPSC
                            ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {pyq.exam}
                        </span>
                        <span className="font-mono font-bold text-amber-400 text-xs">
                          {pyq.year}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {pyq.negativeMarking}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {pyq.paper} • {pyq.totalQuestions} Questions ({pyq.totalMarks} Marks)
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pyq.strategicAnalysis}
                    </p>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Official Master Key:</span>
                        <span className="text-emerald-400 font-semibold">{pyq.officialKeyStatus}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Cutoff Score Reference:</span>
                        <span className="text-amber-300 font-mono font-bold">{pyq.cutoffScoreEstimate}</span>
                      </div>
                    </div>

                    {/* Weightage pill tags */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block">Question Distribution Highlights:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(pyq.weightageBreakdown).slice(0, 4).map(([subj, count]) => (
                          <span
                            key={subj}
                            className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300 border border-slate-700/60 font-medium"
                          >
                            {subj}: <strong className="text-amber-300">{count}Q</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedPyqModal(pyq)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                    >
                      View Detailed Autopsy →
                    </button>

                    <div className="flex items-center gap-2">
                      {onNavigateToTab && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('test-mode')}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          Practice in Simulator
                        </button>
                      )}
                      {pyq.officialQuestionPaperUrl && (
                        <a
                          href={pyq.officialQuestionPaperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700"
                          title="Open Official Commission Repository"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUB-TAB 4: MAGAZINES & ANNUAL COMPENDIUMS
         --------------------------------------------------------------------- */}
      {activeSubTab === 'magazines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRENT_AFFAIRS_MAGAZINES.map((mag) => {
            const isBookmarked = bookmarkedItemIds.includes(mag.id);
            return (
              <div
                key={mag.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 transition-all shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {mag.frequency} Digest • {mag.languageAvailability}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {mag.targetExam === 'RPSC' ? 'RPSC Specific' : 'UPSC & RPSC Dual'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {mag.title}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      Published by {mag.publisher}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mag.description}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 block">High-Yield Subject Themes:</span>
                    <div className="space-y-1">
                      {mag.highYieldThemes.map((thm, tIdx) => (
                        <div key={tIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{thm}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <span className="text-[11px] font-bold text-amber-300 block">How to Extract Notes Efficiently:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {mag.howToMakeNotes}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleSynthesizeIntoOfflineNotes(mag.title, 'Current Affairs', `${mag.title}\nPublisher: ${mag.publisher}\nThemes: ${mag.highYieldThemes.join(', ')}\nStrategy: ${mag.howToMakeNotes}`)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Extract to Offline Notes
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(
                        mag.id,
                        mag.title,
                        mag.description,
                        'Economy & Schemes',
                        mag.targetExam,
                        mag.publisher
                      )}
                      className={`p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                      }`}
                      title="Bookmark Journal"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    <a
                      href={mag.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700"
                      title="Open Official Journal Archive"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUB-TAB 5: HIGH-YIELD REVISION CHEAT SHEETS & HANDOUTS
         --------------------------------------------------------------------- */}
      {activeSubTab === 'cheatsheets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCheatSheets.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
              <Layers className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No cheat sheets found</h3>
              <p className="text-xs text-slate-400">Try changing your search terms or subject filter.</p>
            </div>
          ) : (
            filteredCheatSheets.map((cs) => {
              const isBookmarked = bookmarkedItemIds.includes(cs.id);
              const isCommon = cs.category === 'UPSC_CORE' || cs.category === 'DUAL_OVERLAP';

              return (
                <div
                  key={cs.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 transition-all shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isCommon
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {isCommon ? '70% Common Core' : '20% Rajasthan Exclusive'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {cs.subject}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {cs.title}
                      </h3>
                      {cs.titleHindi && (
                        <p className="text-xs text-amber-400/90 font-serif mt-0.5">{cs.titleHindi}</p>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {cs.summary}
                    </p>

                    {cs.keyMnemonicOrRule && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-[11px] text-amber-200">
                          <strong className="text-amber-300 font-semibold">Mnemonic / Rule:</strong> {cs.keyMnemonicOrRule}
                        </div>
                      </div>
                    )}

                    {/* Quick Facts Preview */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 block">
                        Key Points ({cs.quickFacts.length}):
                      </span>
                      <div className="space-y-1">
                        {cs.quickFacts.slice(0, 3).map((f, fIdx) => (
                          <div key={fIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span className="line-clamp-1">
                              <strong className="text-slate-200">{f.label}:</strong> {f.value}
                            </span>
                          </div>
                        ))}
                        {cs.quickFacts.length > 3 && (
                          <div className="text-[10px] text-slate-500 font-medium">
                            + {cs.quickFacts.length - 3} more master facts
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cs.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedCheatSheetModal(cs)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      View Master Matrix →
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const noteText = `${cs.title}\n${cs.titleHindi || ''}\nSubject: ${cs.subject}\n\nSummary:\n${cs.summary}\n\nMnemonic / Rule:\n${cs.keyMnemonicOrRule || 'N/A'}\n\nKey Facts:\n${cs.quickFacts.map((q) => `• ${q.label}: ${q.value}${q.note ? ` (${q.note})` : ''}`).join('\n')}\n\nExam Strategy:\n${cs.examApplicationTip}`;
                          handleSynthesizeIntoOfflineNotes(cs.title, cs.subject, noteText);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                        title="Extract to Offline Notes"
                      >
                        Extract
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(
                          cs.id,
                          cs.title,
                          cs.summary,
                          cs.category === 'RAJASTHAN_EXCLUSIVE' ? 'Rajasthan Special' : 'High-Yield Revision',
                          cs.category === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
                          'Cheat Sheet',
                          cs.subject
                        )}
                        className={`p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                        }`}
                        title="Bookmark Cheat Sheet"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 1: DETAILED STANDARD BOOK STUDY GUIDE
         --------------------------------------------------------------------- */}
      {selectedBookModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {selectedBookModal.level} • {selectedBookModal.subject}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedBookModal.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  By {selectedBookModal.author} ({selectedBookModal.edition}) • ~{selectedBookModal.estimatedReadingHours} Hours Required
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                {selectedBookModal.description}
              </p>

              {/* Must-Read Chapters */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  <span>Non-Negotiable Must-Read Chapters:</span>
                </div>
                <div className="space-y-1.5">
                  {selectedBookModal.mustReadChapters.map((chap, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800/80 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">{idx + 1}.</span>
                      <span>{chap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Strategy Comparison (UPSC vs RPSC) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-blue-950/20 border border-blue-500/30 rounded-2xl space-y-1.5">
                  <div className="font-bold text-blue-300 flex items-center gap-1.5">
                    <Building className="w-4 h-4" />
                    <span>UPSC CSE Strategy:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {selectedBookModal.upscStrategy}
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-1.5">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Castle className="w-4 h-4" />
                    <span>RPSC RAS Strategy:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {selectedBookModal.rpscStrategy}
                  </p>
                </div>
              </div>

              {/* Key Concept Terms */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 block">Core Syllabus Terms to Master:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBookModal.keyTopicsCovered.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-amber-300 font-medium border border-slate-700">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(
                    selectedBookModal.id,
                    selectedBookModal.title,
                    selectedBookModal.description,
                    selectedBookModal.category === 'RAJASTHAN_EXCLUSIVE' ? 'Rajasthan Special' : 'High-Yield Revision',
                    selectedBookModal.category === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
                    selectedBookModal.author,
                    selectedBookModal.subject
                  )}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmark Book</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLogResourceStudy(
                    selectedBookModal.title,
                    `Studied Chapters: ${selectedBookModal.mustReadChapters.slice(0, 2).join(', ')}`,
                    selectedBookModal.subject,
                    selectedBookModal.category === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL'
                  )}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
                >
                  <FolderClock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Log in History</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBookModal(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2: OFFICIAL GOVERNMENT PORTAL DETAILS
         --------------------------------------------------------------------- */}
      {selectedPortalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {selectedPortalModal.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedPortalModal.name}
                </h3>
                {selectedPortalModal.nameHindi && (
                  <p className="text-xs text-slate-400 font-serif mt-0.5">{selectedPortalModal.nameHindi}</p>
                )}
                <p className="text-xs text-amber-400/90 font-medium mt-0.5">{selectedPortalModal.organization}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPortalModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">Constitutional / Statutory Mandate:</span>
                <p className="text-slate-300 leading-relaxed">{selectedPortalModal.officialMandate}</p>
              </div>

              {/* High-yield reports */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>High-Yield Official Reports to Track:</span>
                </div>
                <div className="space-y-1.5">
                  {selectedPortalModal.highYieldReports.map((rep, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800/80 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{rep}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Pattern Sample */}
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-1">
                <span className="font-bold text-amber-300 block">Typical Question Formulation Pattern:</span>
                <p className="text-slate-300 italic">{selectedPortalModal.sampleQuestionPattern}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
              <a
                href={selectedPortalModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setSelectedPortalModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 3: OFFICIAL PYQ DETAILED BREAKDOWN
         --------------------------------------------------------------------- */}
      {selectedPyqModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {selectedPyqModal.exam} • Year {selectedPyqModal.year}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedPyqModal.paper}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedPyqModal.totalQuestions} Questions • {selectedPyqModal.totalMarks} Marks • Negative: {selectedPyqModal.negativeMarking}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPyqModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">Strategic Exam Autopsy:</span>
                <p className="text-slate-300 leading-relaxed">{selectedPyqModal.strategicAnalysis}</p>
              </div>

              {/* Weightage Grid */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Subject-wise Question Breakdown:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(selectedPyqModal.weightageBreakdown).map(([subj, count]) => (
                    <div key={subj} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-300 truncate pr-1">{subj}</span>
                      <span className="text-amber-400 font-bold font-mono">{count}Q</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
              {onNavigateToTab && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPyqModal(null);
                    onNavigateToTab('test-mode');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Start Practice in Simulator →
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedPyqModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 4: HIGH-YIELD CHEAT SHEET & MASTER MATRIX VIEWER
         --------------------------------------------------------------------- */}
      {selectedCheatSheetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    selectedCheatSheetModal.category === 'RAJASTHAN_EXCLUSIVE'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}>
                    {selectedCheatSheetModal.category === 'RAJASTHAN_EXCLUSIVE' ? '20% Rajasthan Exclusive' : '70% Common Core'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{selectedCheatSheetModal.subject}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedCheatSheetModal.title}
                </h3>
                {selectedCheatSheetModal.titleHindi && (
                  <p className="text-sm text-amber-400/90 font-serif mt-0.5">{selectedCheatSheetModal.titleHindi}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedCheatSheetModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mnemonic / Rule Banner */}
            {selectedCheatSheetModal.keyMnemonicOrRule && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-amber-300 block">Master Mnemonic / Formula Rule:</span>
                  <p className="text-xs text-amber-100 font-medium leading-relaxed font-mono">
                    {selectedCheatSheetModal.keyMnemonicOrRule}
                  </p>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-200 block mb-1">Architecture & Syllabus Linkage:</strong>
              {selectedCheatSheetModal.summary}
            </div>

            {/* Structured Facts Matrix */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>High-Yield Knowledge Points ({selectedCheatSheetModal.quickFacts.length}):</span>
                </div>
                <span className="text-[11px] text-slate-500">Memorize verbatim for Prelims</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedCheatSheetModal.quickFacts.map((qf, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 block">{qf.label}</span>
                    <p className="text-xs text-slate-200 leading-relaxed">{qf.value}</p>
                    {qf.note && (
                      <p className="text-[10px] text-slate-400 italic pt-0.5 border-t border-slate-800/50">
                        Note: {qf.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Strategy Tip */}
            <div className="p-3.5 bg-blue-950/30 rounded-2xl border border-blue-900/50 space-y-1 text-xs">
              <span className="text-blue-300 font-bold flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Exam Application & Trap Avoidance:</span>
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {selectedCheatSheetModal.examApplicationTip}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedCheatSheetModal.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    const noteText = `${selectedCheatSheetModal.title}\n${selectedCheatSheetModal.titleHindi || ''}\nSubject: ${selectedCheatSheetModal.subject}\n\nSummary:\n${selectedCheatSheetModal.summary}\n\nMnemonic / Rule:\n${selectedCheatSheetModal.keyMnemonicOrRule || 'N/A'}\n\nKey Facts:\n${selectedCheatSheetModal.quickFacts.map((q) => `• ${q.label}: ${q.value}${q.note ? ` (${q.note})` : ''}`).join('\n')}\n\nExam Strategy:\n${selectedCheatSheetModal.examApplicationTip}`;
                    handleSynthesizeIntoOfflineNotes(selectedCheatSheetModal.title, selectedCheatSheetModal.subject, noteText);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Save to Offline Notes Vault →
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const text = `${selectedCheatSheetModal.title}\n${selectedCheatSheetModal.quickFacts.map((q) => `${q.label}: ${q.value}`).join('\n')}`;
                    navigator.clipboard.writeText(text);
                    showToast('Copied cheat sheet points to clipboard!');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Facts</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleBookmark(
                    selectedCheatSheetModal.id,
                    selectedCheatSheetModal.title,
                    selectedCheatSheetModal.summary,
                    selectedCheatSheetModal.category === 'RAJASTHAN_EXCLUSIVE' ? 'Rajasthan Special' : 'High-Yield Revision',
                    selectedCheatSheetModal.category === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
                    'Cheat Sheet',
                    selectedCheatSheetModal.subject
                  )}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarkedItemIds.includes(selectedCheatSheetModal.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{bookmarkedItemIds.includes(selectedCheatSheetModal.id) ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCheatSheetModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
