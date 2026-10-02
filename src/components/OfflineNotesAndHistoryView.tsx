import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  Upload,
  Search,
  Sparkles,
  Calendar,
  Bookmark,
  CheckCircle2,
  Trash2,
  Filter,
  Layers,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Tag,
  Copy,
  Check,
  Zap,
  Clock,
  History,
  BookmarkCheck,
  FolderPlus,
  Edit3,
  X,
  PlusCircle,
  HelpCircle,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import {
  ExtractedNote,
  CurriculumCategory,
  HistoryEntry,
  UniversalBookmark,
  BookmarkCategory,
  LanguageMedium,
  UserProfile
} from '../types';
import {
  getOfflineNotes,
  saveOfflineNote,
  deleteOfflineNote,
  getHistoryEntries,
  logHistoryActivity,
  clearHistoryLogs,
  getUniversalBookmarks,
  addUniversalBookmark,
  removeUniversalBookmark,
  updateBookmarkNotes,
  extractNotesFromRawText
} from '../utils/historyAndBookmarkStorage';

interface OfflineNotesAndHistoryViewProps {
  language: LanguageMedium;
  userProfile?: UserProfile;
  initialSubTab?: 'notes-generator' | 'history' | 'bookmarks';
  onNavigateToTab?: (tab: string) => void;
}

export const OfflineNotesAndHistoryView: React.FC<OfflineNotesAndHistoryViewProps> = ({
  language,
  userProfile,
  initialSubTab = 'notes-generator',
  onNavigateToTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'notes-generator' | 'history' | 'bookmarks'>(
    initialSubTab
  );

  // -------------------------------------------------------------------------
  // Sub-Tab 1: Offline PDF Note Generator State
  // -------------------------------------------------------------------------
  const [notes, setNotes] = useState<ExtractedNote[]>(() => getOfflineNotes());
  const [notesSearch, setNotesSearch] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  // Manual Paste or PDF Input
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('Indian_History_Chapter.pdf');
  const [documentPage, setDocumentPage] = useState<string>('1');
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------------------------------------------------------
  // Sub-Tab 2: Granular History Tracker State
  // -------------------------------------------------------------------------
  const [historyLogs, setHistoryLogs] = useState<HistoryEntry[]>(() => getHistoryEntries());
  const [historySearch, setHistorySearch] = useState<string>('');
  const [historyTypeFilter, setHistoryTypeFilter] = useState<string>('ALL');

  // -------------------------------------------------------------------------
  // Sub-Tab 3: Universal Bookmarks State
  // -------------------------------------------------------------------------
  const [bookmarks, setBookmarks] = useState<UniversalBookmark[]>(() => getUniversalBookmarks());
  const [bookmarksSearch, setBookmarksSearch] = useState<string>('');
  const [selectedBookmarkCatFilter, setSelectedBookmarkCatFilter] = useState<string>('ALL');
  const [editingBookmarkId, setEditingBookmarkId] = useState<string | null>(null);
  const [editNotesContent, setEditNotesContent] = useState<string>('');
  const [editCategorySelect, setEditCategorySelect] = useState<BookmarkCategory>('High-Yield Revision');
  const [isAddBookmarkModalOpen, setIsAddBookmarkModalOpen] = useState<boolean>(false);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState<string>('');
  const [newBookmarkSnippet, setNewBookmarkSnippet] = useState<string>('');
  const [newBookmarkCategory, setNewBookmarkCategory] = useState<BookmarkCategory>('Custom');
  const [newBookmarkSubject, setNewBookmarkSubject] = useState<string>('General Studies');

  // Toast
  const [actionToast, setActionToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  };

  // -------------------------------------------------------------------------
  // PDF / Text Processing Logic (100% Offline, Deterministic Local Parsing)
  // -------------------------------------------------------------------------
  const handleProcessText = (text: string, docName: string, pageNum?: number) => {
    if (!text || text.trim().length < 20) {
      showToast('Please provide substantial text from the document (at least a paragraph).');
      return;
    }

    setProcessingStatus('Extracting concepts & auto-categorizing offline...');
    setTimeout(() => {
      const generatedNote = extractNotesFromRawText(text, docName, pageNum);
      saveOfflineNote(generatedNote);
      setNotes(getOfflineNotes());
      setHistoryLogs(getHistoryEntries());
      setProcessingStatus(null);
      setIsInputModalOpen(false);
      setManualText('');
      setExpandedNoteId(generatedNote.id);
      showToast(`Note synthesized and categorized into "${generatedNote.category}"!`);
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    // Check if plain text, markdown or PDF
    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        handleProcessText(content, fileName);
      };
      reader.readAsText(file);
    } else {
      // For binary PDF or other files in pure client-side JS:
      // Read as text to extract text streams (PDFs contain ASCII stream chunks)
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const uint8 = new Uint8Array(arrayBuffer);
        // Simple fast string decoding to capture uncompressed textual blocks
        let rawStr = '';
        for (let i = 0; i < Math.min(uint8.length, 300000); i++) {
          const charCode = uint8[i];
          if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
            rawStr += String.fromCharCode(charCode);
          } else {
            rawStr += ' ';
          }
        }
        // Clean up extracted stream
        const cleaned = rawStr.replace(/\s+/g, ' ').trim();
        if (cleaned.length > 50) {
          handleProcessText(cleaned, fileName);
        } else {
          // Open manual paste fallback with informative prompt
          setDocumentName(fileName);
          setIsInputModalOpen(true);
          showToast('Please paste the copied text from this PDF into the box below.');
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteOfflineNote(id);
    setNotes(getOfflineNotes());
    showToast('Note removed from local storage.');
  };

  const handleCopyNote = (note: ExtractedNote) => {
    const text = `[MARGDARSHAK CIVIL SERVICES NOTE]\nTitle: ${note.title}\nCategory: ${note.category} (${note.targetExam})\nSource: ${note.sourceDocName} (Page ${note.pageNumber || 'N/A'})\n\nCore Highlights:\n${note.bulletPoints.map((b) => `• ${b}`).join('\n')}\n\nKey Terms: ${note.keyTerms.join(', ')}\n\nExam Angles:\n${note.examAngles.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedNoteId(note.id);
    setTimeout(() => setCopiedNoteId(null), 2500);
    showToast('Note copied to clipboard!');
  };

  const handleBookmarkNote = (note: ExtractedNote) => {
    addUniversalBookmark({
      itemType: 'EXTRACTED_NOTE',
      itemId: note.id,
      title: note.title,
      contentSnippet: note.bulletPoints.slice(0, 2).join(' '),
      category: note.category === 'Indian Polity' ? 'Polity & Constitution' : 'High-Yield Revision',
      targetExam: note.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
      sourceTag: `PDF Note: ${note.sourceDocName}`,
      subject: note.category
    });
    setBookmarks(getUniversalBookmarks());
    setHistoryLogs(getHistoryEntries());
    showToast('Saved to Universal Bookmarks!');
  };

  // -------------------------------------------------------------------------
  // Filtering Calculations
  // -------------------------------------------------------------------------
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const q = notesSearch.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        n.title.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.sourceDocName.toLowerCase().includes(q) ||
        n.bulletPoints.some((b) => b.toLowerCase().includes(q)) ||
        n.keyTerms.some((k) => k.toLowerCase().includes(q));

      const matchesCat = selectedCategoryFilter === 'ALL' || n.category === selectedCategoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [notes, notesSearch, selectedCategoryFilter]);

  const filteredHistory = useMemo(() => {
    return historyLogs.filter((h) => {
      const q = historySearch.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        h.title.toLowerCase().includes(q) ||
        h.subtitle.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q);

      const matchesType = historyTypeFilter === 'ALL' || h.type === historyTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [historyLogs, historySearch, historyTypeFilter]);

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((b) => {
      const q = bookmarksSearch.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        b.title.toLowerCase().includes(q) ||
        b.contentSnippet.toLowerCase().includes(q) ||
        (b.notes && b.notes.toLowerCase().includes(q)) ||
        b.sourceTag.toLowerCase().includes(q);

      const matchesCat =
        selectedBookmarkCatFilter === 'ALL' || b.category === selectedBookmarkCatFilter;

      return matchesSearch && matchesCat;
    });
  }, [bookmarks, bookmarksSearch, selectedBookmarkCatFilter]);

  const allAvailableCategories: CurriculumCategory[] = [
    'Ancient History',
    'Medieval History',
    'Modern History',
    'Art & Culture',
    'Physical Geography',
    'Indian Geography',
    'Environment & Ecology',
    'Indian Polity',
    'Indian Economy',
    'General Science',
    'Rajasthan Special',
    'Defense & Security',
    'General Knowledge'
  ];

  const allBookmarkCategories: BookmarkCategory[] = [
    'High-Yield Revision',
    'Mistake Trap',
    'Polity & Constitution',
    'Geography & Environment',
    'History & Culture',
    'Economy & Schemes',
    'Rajasthan Special',
    'General Science',
    'Custom'
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Local-First Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero-Server • 100% Privacy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {language === 'Hindi'
                ? 'ऑफलाइन नोट्स, पठन इतिहास एवं सार्वभौमिक बुकमार्क्स'
                : 'Offline PDF Notes, Reading History & Universal Bookmarks'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Drop any syllabus PDF or study text to auto-synthesize exam-ready notes, track every read topic in granular timestamped history, and organize universal bookmarks into categorized revision folders.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setIsInputModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/15"
            >
              <Upload className="w-4 h-4 text-slate-950" />
              <span>Import / Paste PDF Notes</span>
            </button>
          </div>
        </div>

        {/* 3 Main Navigation Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveSubTab('notes-generator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'notes-generator'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Extracted Notes</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'notes-generator' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {notes.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Reading History</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'history' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {historyLogs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('bookmarks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'bookmarks'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Universal Bookmarks</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === 'bookmarks' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {bookmarks.length}
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            {activeSubTab === 'notes-generator' && 'Categorizes text snippets & extracts bullet points'}
            {activeSubTab === 'history' && 'Tracks what was read, what was added & quiz attempts'}
            {activeSubTab === 'bookmarks' && 'Stores cross-app highlights with custom annotations'}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          SUB-TAB 1: OFFLINE PDF NOTES GENERATOR & BITS REPOSITORY
         --------------------------------------------------------------------- */}
      {activeSubTab === 'notes-generator' && (
        <div className="space-y-5 animate-fade-in">
          {/* Notes Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={notesSearch}
                onChange={(e) => setNotesSearch(e.target.value)}
                placeholder="Search extracted notes by title, keyword, bullet point, or source..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {notesSearch && (
                <button
                  type="button"
                  onClick={() => setNotesSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="ALL">All Categories ({notes.length})</option>
                {allAvailableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} ({notes.filter((n) => n.category === cat).length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-300">No matching notes found</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Try another search term or click "Import / Paste PDF Notes" above to add new content from your syllabus readings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInputModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Synthesize First PDF Note</span>
                </button>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isExpanded = expandedNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    className={`bg-slate-900/80 border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isExpanded ? 'border-amber-500/50 shadow-xl' : 'border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    {/* Note Card Header */}
                    <div
                      onClick={() => {
                        setExpandedNoteId(isExpanded ? null : note.id);
                        if (!isExpanded) {
                          logHistoryActivity({
                            type: 'READ_NOTE',
                            title: `Read Note: ${note.title}`,
                            subtitle: `Source: ${note.sourceDocName} • Category: ${note.category}`,
                            category: note.category,
                            targetExam: note.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL'
                          });
                          setHistoryLogs(getHistoryEntries());
                        }
                      }}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/25">
                            {note.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                            <FileText className="w-3 h-3 text-slate-400" />
                            <span>{note.sourceDocName}</span>
                            {note.pageNumber && <span>(p. {note.pageNumber})</span>}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                            note.targetExam === 'RAJASTHAN_EXCLUSIVE'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                              : 'bg-blue-500/10 text-blue-300 border-blue-500/25'
                          }`}>
                            {note.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC Layer' : 'Common Core'}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {note.title}
                        </h3>

                        <p className="text-xs text-slate-300 line-clamp-2">
                          {note.bulletPoints[0] || note.rawSnippet}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkNote(note);
                          }}
                          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                          title="Bookmark to Universal Bookmarks"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyNote(note);
                          }}
                          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                          title="Copy Note Text"
                        >
                          {copiedNoteId === note.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
                          title="Delete Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="p-2 text-slate-400">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Note Details */}
                    {isExpanded && (
                      <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-4 animate-fade-in">
                        {/* High-Yield Bullet Points */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Core Extracted Points ({note.bulletPoints.length})</span>
                          </div>
                          <ul className="space-y-2">
                            {note.bulletPoints.map((bp, idx) => (
                              <li
                                key={idx}
                                className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-2.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Key Terms */}
                        {note.keyTerms.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap pt-1">
                            <span className="text-xs text-slate-400">Extracted Concepts:</span>
                            {note.keyTerms.map((term, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/60 text-[11px] text-amber-200 font-medium"
                              >
                                #{term}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Exam Angles */}
                        <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-800/30 space-y-1">
                          <span className="text-xs font-bold text-blue-300">Exam Question Angle:</span>
                          <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                            {note.examAngles.map((ea, idx) => (
                              <li key={idx}>{ea}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Raw Snippet Accordion */}
                        <details className="text-xs text-slate-400 cursor-pointer pt-1">
                          <summary className="hover:text-slate-200">View Source Raw Snippet</summary>
                          <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
                            {note.rawSnippet}
                          </div>
                        </details>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUB-TAB 2: READING & ACTIVITY HISTORY
         --------------------------------------------------------------------- */}
      {activeSubTab === 'history' && (
        <div className="space-y-5 animate-fade-in">
          {/* History Search & Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search history by activity title, topic, or subject category..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {historySearch && (
                <button
                  type="button"
                  onClick={() => setHistorySearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              <select
                value={historyTypeFilter}
                onChange={(e) => setHistoryTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="ALL">All Event Types</option>
                <option value="READ_CURRICULUM_BIT">Curriculum Bits Read</option>
                <option value="READ_NOTE">PDF Notes Read</option>
                <option value="ADDED_PDF_NOTE">PDF Notes Added</option>
                <option value="BOOKMARKED_ITEM">Items Bookmarked</option>
                <option value="SCHEDULED_CALENDAR">Calendar Schedules</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear all recorded history logs?')) {
                    clearHistoryLogs();
                    setHistoryLogs([]);
                    showToast('History logs cleared.');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-medium transition-colors cursor-pointer shrink-0"
                title="Clear All History"
              >
                Clear History
              </button>
            </div>
          </div>

          {/* History Timeline */}
          <div className="space-y-2.5">
            {filteredHistory.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
                <History className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-300">No history events found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Every topic you explore in the Knowledge Vault, note you generate from PDFs, or question you attempt will be timestamped here.
                </p>
              </div>
            ) : (
              filteredHistory.map((item) => {
                const dateObj = new Date(item.timestamp);
                const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

                const badgeColor =
                  item.type === 'ADDED_PDF_NOTE'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : item.type === 'BOOKMARKED_ITEM'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : item.type === 'SCHEDULED_CALENDAR'
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    : 'bg-blue-500/10 text-blue-300 border-blue-500/30';

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-amber-400 shrink-0 mt-0.5">
                        {item.type === 'ADDED_PDF_NOTE' ? (
                          <Upload className="w-4 h-4 text-emerald-400" />
                        ) : item.type === 'BOOKMARKED_ITEM' ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-400" />
                        ) : item.type === 'SCHEDULED_CALENDAR' ? (
                          <Calendar className="w-4 h-4 text-purple-400" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-blue-400" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                            {item.type.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-300">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-medium text-slate-300">{timeStr}</div>
                      <div className="text-[10px] text-slate-500">{dateStr}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUB-TAB 3: UNIVERSAL CATEGORIZED BOOKMARKS
         --------------------------------------------------------------------- */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-5 animate-fade-in">
          {/* Bookmarks Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={bookmarksSearch}
                onChange={(e) => setBookmarksSearch(e.target.value)}
                placeholder="Search bookmarks by title, notes, concepts, or source..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {bookmarksSearch && (
                <button
                  type="button"
                  onClick={() => setBookmarksSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              <select
                value={selectedBookmarkCatFilter}
                onChange={(e) => setSelectedBookmarkCatFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="ALL">All Folders ({bookmarks.length})</option>
                {allBookmarkCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} ({bookmarks.filter((b) => b.category === cat).length})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setIsAddBookmarkModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Custom Bookmark</span>
              </button>
            </div>
          </div>

          {/* Bookmarks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBookmarks.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
                <BookmarkCheck className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-300">No bookmarks found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click the bookmark icon on any Curriculum Bit, Syllabus Topic, or PDF Note to collect and organize them here into categorized revision folders.
                </p>
              </div>
            ) : (
              filteredBookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3 transition-colors shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                        {bm.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {bm.sourceTag}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {bm.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {bm.contentSnippet}
                    </p>

                    {bm.notes && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-amber-200/90 italic">
                        "{bm.notes}"
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBookmarkId(bm.id);
                        setEditNotesContent(bm.notes || '');
                        setEditCategorySelect(bm.category);
                      }}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Note / Move Folder</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        removeUniversalBookmark(bm.id);
                        setBookmarks(getUniversalBookmarks());
                        showToast('Bookmark removed.');
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 1: IMPORT / PASTE PDF EXTRACTOR
         --------------------------------------------------------------------- */}
      {isInputModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Offline PDF Note Synthesizer</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsInputModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                You can upload a document file or directly paste text from any UPSC/RPSC PDF. The offline engine will deterministically categorize it, extract key terms, and construct revision points.
              </p>

              {/* Upload trigger */}
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Choose PDF / Text File</span>
                </button>
                <span className="text-xs text-slate-500">or paste content directly below</span>
              </div>

              {/* Document metadata inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Document / Book Name:
                  </label>
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="e.g. NCERT_Class_11_Polity.pdf"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Page Number (Optional):
                  </label>
                  <input
                    type="number"
                    value={documentPage}
                    onChange={(e) => setDocumentPage(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Raw Text Input */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Text Content from PDF:
                </label>
                <textarea
                  rows={6}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Paste text excerpt here (e.g. Indus Valley sites, 73rd Amendment, Monsoons, RBI monetary policy instruments)..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {processingStatus && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{processingStatus}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsInputModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleProcessText(manualText, documentName, Number(documentPage) || undefined)}
                disabled={!manualText.trim()}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Synthesize & Categorize Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2: EDIT BOOKMARK NOTES / CATEGORY
         --------------------------------------------------------------------- */}
      {editingBookmarkId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Edit Bookmark Annotations & Folder</h3>
              <button
                type="button"
                onClick={() => setEditingBookmarkId(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Folder Category:
                </label>
                <select
                  value={editCategorySelect}
                  onChange={(e) => setEditCategorySelect(e.target.value as BookmarkCategory)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  {allBookmarkCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Personal Study Notes / Memory Triggers:
                </label>
                <textarea
                  rows={4}
                  value={editNotesContent}
                  onChange={(e) => setEditNotesContent(e.target.value)}
                  placeholder="Add your personal notes or mnemonic here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingBookmarkId(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateBookmarkNotes(editingBookmarkId, editNotesContent, editCategorySelect);
                  setBookmarks(getUniversalBookmarks());
                  setEditingBookmarkId(null);
                  showToast('Bookmark updated successfully.');
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 3: ADD CUSTOM BOOKMARK
         --------------------------------------------------------------------- */}
      {isAddBookmarkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Create Custom Universal Bookmark</h3>
              <button
                type="button"
                onClick={() => setIsAddBookmarkModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Bookmark Title:
                </label>
                <input
                  type="text"
                  value={newBookmarkTitle}
                  onChange={(e) => setNewBookmarkTitle(e.target.value)}
                  placeholder="e.g. Fundamental Rights vs DPSP Harmonious Construction"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Folder Category:
                </label>
                <select
                  value={newBookmarkCategory}
                  onChange={(e) => setNewBookmarkCategory(e.target.value as BookmarkCategory)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  {allBookmarkCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Content / Key Formula / Mnemonic:
                </label>
                <textarea
                  rows={4}
                  value={newBookmarkSnippet}
                  onChange={(e) => setNewBookmarkSnippet(e.target.value)}
                  placeholder="Write the core takeaway, fact, or high-yield summary..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddBookmarkModalOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newBookmarkTitle.trim()) return;
                  addUniversalBookmark({
                    itemType: 'CUSTOM_SNIPPET',
                    itemId: `custom-${Date.now()}`,
                    title: newBookmarkTitle,
                    contentSnippet: newBookmarkSnippet,
                    category: newBookmarkCategory,
                    targetExam: 'DUAL',
                    sourceTag: 'Personal Note Vault',
                    subject: newBookmarkSubject
                  });
                  setBookmarks(getUniversalBookmarks());
                  setIsAddBookmarkModalOpen(false);
                  setNewBookmarkTitle('');
                  setNewBookmarkSnippet('');
                  showToast('Custom bookmark stored in vault.');
                }}
                disabled={!newBookmarkTitle.trim()}
                className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 disabled:opacity-50"
              >
                Save to Bookmarks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
