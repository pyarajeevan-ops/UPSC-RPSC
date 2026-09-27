import React, { useState, useRef, useEffect } from 'react';
import {
  BookmarkCheck,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Filter,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  BookOpen,
  FileDown,
  FileText,
  Download,
  ChevronDown
} from 'lucide-react';
import { ErrorLogEntry, ErrorCategory } from '../types';
import { exportMistakesAsPdf, exportMistakesAsText } from '../utils/exportMistakes';

interface MistakeNotebookViewProps {
  mistakes: ErrorLogEntry[];
  onRemoveMistake: (id: string) => void;
  onSelectTopic: (topicId: string) => void;
}

const ERROR_CATEGORIES: ErrorCategory[] = [
  'Conceptual error',
  'Factual error',
  'Misreading',
  'Guessing error',
  'Poor elimination',
  'Time-management error',
  'Overthinking',
  'Current-affairs gap',
];

export const MistakeNotebookView: React.FC<MistakeNotebookViewProps> = ({
  mistakes,
  onRemoveMistake,
  onSelectTopic,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportScope, setExportScope] = useState<'filtered' | 'all'>('filtered');
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    if (isExportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExportMenuOpen]);

  // Category counts
  const categoryCounts: Record<string, number> = {};
  ERROR_CATEGORIES.forEach((cat) => {
    categoryCounts[cat] = 0;
  });
  mistakes.forEach((m) => {
    categoryCounts[m.errorCategory] = (categoryCounts[m.errorCategory] || 0) + 1;
  });

  // Identify highest repeated error
  let highestCategory = '';
  let highestCount = 0;
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > highestCount) {
      highestCount = count;
      highestCategory = cat;
    }
  });

  const filteredMistakes = mistakes.filter((m) => {
    if (selectedCategoryFilter === 'ALL') return true;
    return m.errorCategory === selectedCategoryFilter;
  });

  const targetMistakesForExport =
    exportScope === 'filtered' && selectedCategoryFilter !== 'ALL'
      ? filteredMistakes
      : mistakes;

  const handleExportPdf = () => {
    if (targetMistakesForExport.length === 0) return;
    try {
      exportMistakesAsPdf(targetMistakesForExport, mistakes.length, {
        filterName: exportScope === 'filtered' ? selectedCategoryFilter : 'ALL',
        scope: exportScope,
      });
      setExportFeedback(`Exported ${targetMistakesForExport.length} error(s) as PDF for offline review`);
      setIsExportMenuOpen(false);
      setTimeout(() => setExportFeedback(null), 4000);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    }
  };

  const handleExportText = () => {
    if (targetMistakesForExport.length === 0) return;
    try {
      exportMistakesAsText(targetMistakesForExport, mistakes.length, {
        filterName: exportScope === 'filtered' ? selectedCategoryFilter : 'ALL',
        scope: exportScope,
      });
      setExportFeedback(`Exported ${targetMistakesForExport.length} error(s) as plain text (.txt)`);
      setIsExportMenuOpen(false);
      setTimeout(() => setExportFeedback(null), 4000);
    } catch (err) {
      console.error('Failed to export text:', err);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Toast Feedback Notification */}
      {exportFeedback && (
        <div className="p-3 bg-emerald-950/90 border border-emerald-600/50 rounded-xl flex items-center justify-between text-xs text-emerald-200 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{exportFeedback}</span>
          </div>
          <span className="text-[11px] text-emerald-400/80">File downloaded to your device</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-amber-400" />
            <span>Active Mistake Notebook & Error Taxonomy</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Classified across the 8 specific civil services cognitive failure modes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-400 hidden sm:block">
            Total Logged: <span className="text-rose-400 tabular-nums">{mistakes.length} errors</span>
          </div>

          {/* Export Dropdown Menu */}
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setIsExportMenuOpen((prev) => !prev)}
              disabled={mistakes.length === 0}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                mistakes.length === 0
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 border-slate-700 hover:border-amber-500/60 hover:bg-slate-800 text-slate-200 shadow-xs'
              }`}
              title={mistakes.length === 0 ? 'No mistakes to export' : 'Export error log for offline review'}
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Log</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2.5 z-50 text-xs space-y-2">
                <div className="px-2 py-1 border-b border-slate-800">
                  <div className="font-semibold text-slate-200">Export for Offline Review</div>
                  <div className="text-[11px] text-slate-400">Download formatted study notes</div>
                </div>

                {/* Scope selector if filter is active */}
                {selectedCategoryFilter !== 'ALL' && (
                  <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800/80 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 block">Export Scope:</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setExportScope('filtered')}
                        className={`flex-1 px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          exportScope === 'filtered'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                        Filtered ({filteredMistakes.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setExportScope('all')}
                        className={`flex-1 px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          exportScope === 'all'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                        All ({mistakes.length})
                      </button>
                    </div>
                  </div>
                )}

                {/* Export Options */}
                <div className="space-y-1">
                  <button
                    onClick={handleExportPdf}
                    className="w-full p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950/40 hover:border-rose-600/40 border border-transparent text-left transition-colors flex items-start gap-2.5 cursor-pointer group"
                  >
                    <FileDown className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-rose-300">
                        Export as PDF (.pdf)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Styled offline sheet with trap autopsy, memory aids & error stats
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleExportText}
                    className="w-full p-2 rounded-lg bg-slate-800/80 hover:bg-amber-950/40 hover:border-amber-600/40 border border-transparent text-left transition-colors flex items-start gap-2.5 cursor-pointer group"
                  >
                    <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-amber-300">
                        Export as Text (.txt)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Clean ASCII revision log for note apps, e-readers & printing
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Repeated Weakness Diagnostics Alert */}
      {mistakes.length > 0 && highestCount > 0 && (
        <div className="p-4 bg-rose-950/20 border border-rose-600/40 rounded-xl flex items-start gap-3 text-xs text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-rose-300 font-bold">
              Cognitive Weakness Alert: High Frequency of &quot;{highestCategory}&quot; ({highestCount} occurrences)
            </strong>
            <p className="leading-relaxed text-slate-300">
              {highestCategory === 'Factual error' &&
                'Your errors stem from exact dates, articles, or Rajasthan local names. Increase daily flashcard drills and avoid guessing in negative marking zones.'}
              {highestCategory === 'Misreading' &&
                'You are falling for inverted stems like "Which is NOT correct" or confusing similar-sounding terms. Underline qualifiers on paper before picking options.'}
              {highestCategory === 'Conceptual error' &&
                'Revisit foundational NCERT and standard reference texts before attempting more practice tests.'}
              {highestCategory === 'Overthinking' &&
                'You are adding unstated assumptions to straightforward facts. Stick strictly to what is stated in the premise.'}
              {highestCategory === 'Poor elimination' &&
                'Always eliminate the impossible extreme statements (all, none, universally) before evaluating nuanced statements.'}
              {highestCategory === 'Guessing error' &&
                'Limit blind guesses! In UPSC (-0.66) and RPSC (-0.44), uncontrolled guessing erodes the cut-off margin.'}
            </p>
          </div>
        </div>
      )}

      {/* Category Distribution Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {ERROR_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isSelected = selectedCategoryFilter === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(isSelected ? 'ALL' : cat)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/60 shadow-xs'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium truncate">{cat}</span>
                <span
                  className={`font-bold tabular-nums px-1.5 py-0.5 rounded text-[11px] ${
                    count > 0 ? 'bg-rose-950/80 text-rose-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Showing {filteredMistakes.length} entries</span>
            {selectedCategoryFilter !== 'ALL' && (
              <button
                onClick={() => setSelectedCategoryFilter('ALL')}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          {filteredMistakes.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 mr-1 hidden sm:inline">Quick export:</span>
              <button
                onClick={handleExportPdf}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 border border-slate-700/80 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                title="Quick export current list as PDF"
              >
                <FileDown className="w-3 h-3 text-rose-400" />
                <span>PDF</span>
              </button>
              <button
                onClick={handleExportText}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/80 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                title="Quick export current list as plain text file"
              >
                <FileText className="w-3 h-3 text-amber-400" />
                <span>TXT</span>
              </button>
            </div>
          )}
        </div>

        {filteredMistakes.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-semibold text-slate-200 text-sm">Mistake Notebook is Clear!</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Any question you miss or tag as an error during Test Mode or Mentorship Evaluation will be preserved here for spaced revision.
            </p>
          </div>
        ) : (
          filteredMistakes.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-950/80 border border-rose-600/40 text-rose-300 font-semibold">
                    {item.errorCategory}
                  </span>
                  <span className="text-slate-400">{item.subject}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[11px]">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onRemoveMistake(item.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Mark resolved and remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-line bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                {item.questionText}
              </div>

              {/* Selections breakdown */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Your Pick:</span>
                  <span className="font-bold text-rose-400">Option {item.selectedOption}</span>
                </div>
                <span className="text-slate-700">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Official Key:</span>
                  <span className="font-bold text-emerald-400">Option {item.correctOption}</span>
                </div>
              </div>

              {/* Trap & Memory Aid */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/60 space-y-2 text-xs">
                <div className="text-rose-300">
                  <strong>Examiner Trap: </strong>
                  {item.trapIdentified}
                </div>
                <div className="text-amber-300">
                  <strong>Cure / Mnemonic: </strong>
                  {item.mnemonic}
                </div>
                {item.candidateNotes && (
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                    <strong>Aspirant Note: </strong>
                    {item.candidateNotes}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
