import React, { useState, useEffect } from 'react';
import {
  PenLine,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  ChevronDown,
  ChevronUp,
  History,
  BookOpen,
  Calendar,
  Save,
  Edit3,
  Bookmark
} from 'lucide-react';
import { DayStudyLog, UserProfile } from '../types';

interface DailySessionNotesProps {
  todayLog: DayStudyLog;
  dayLogs: DayStudyLog[];
  userProfile: UserProfile;
  onUpdateNotes: (notesData: { focusArea?: string; challenges?: string; notes?: string }) => void;
}

const QUICK_FOCUS_PRESETS = [
  'Polity: Panchayati Raj & SEC',
  'Rajasthan: Aravalli Drainage & Lakes',
  'Modern History: 1919 vs 1935 Acts',
  'Economy: Fiscal Deficit & Inflation',
  'Environment: Wildlife Protection Act',
  'Prelims Sectional Mock Test',
];

const QUICK_CHALLENGE_PRESETS = [
  'Elimination traps in extreme statements',
  'Retention of exact constitutional articles',
  'Time pressure during final 25 questions',
  'Distinguishing UPSC conceptual vs RPSC factual style',
  'Hesitation between 50:50 eliminated options',
  'Current affairs factual gaps in recent schemes',
];

export const DailySessionNotes: React.FC<DailySessionNotesProps> = ({
  todayLog,
  dayLogs,
  userProfile,
  onUpdateNotes,
}) => {
  const [focusArea, setFocusArea] = useState<string>(todayLog.focusArea || '');
  const [challenges, setChallenges] = useState<string>(todayLog.challenges || '');
  const [notes, setNotes] = useState<string>(todayLog.notes || '');
  const [isEditing, setIsEditing] = useState<boolean>(!todayLog.notes && !todayLog.focusArea);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync state if todayLog updates externally
  useEffect(() => {
    setFocusArea(todayLog.focusArea || '');
    setChallenges(todayLog.challenges || '');
    setNotes(todayLog.notes || '');
  }, [todayLog.focusArea, todayLog.challenges, todayLog.notes]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateNotes({
      focusArea: focusArea.trim(),
      challenges: challenges.trim(),
      notes: notes.trim(),
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleAppendFocusPreset = (preset: string) => {
    setFocusArea((prev) => {
      if (!prev) return preset;
      if (prev.includes(preset)) return prev;
      return `${prev}, ${preset}`;
    });
  };

  const handleAppendChallengePreset = (preset: string) => {
    setChallenges((prev) => {
      if (!prev) return preset;
      if (prev.includes(preset)) return prev;
      return `${prev}. ${preset}`;
    });
  };

  const hasAnyNotes = Boolean(
    (todayLog.focusArea && todayLog.focusArea.trim().length > 0) ||
    (todayLog.challenges && todayLog.challenges.trim().length > 0) ||
    (todayLog.notes && todayLog.notes.trim().length > 0)
  );

  const pastLogsWithNotes = dayLogs
    .slice(0, dayLogs.length - 1)
    .filter((log) => log.focusArea || log.challenges || log.notes)
    .reverse();

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <PenLine className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-slate-100">
                Daily Study Log & Reflection Notes
              </h3>
              {hasAnyNotes && !isEditing && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Notes Logged
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Record your specific focus area, cognitive hurdles, and active takeaways from today&apos;s session
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {pastLogsWithNotes.length > 0 && (
            <button
              type="button"
              onClick={() => setShowHistory((prev) => !prev)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="View reflection history from earlier days"
            >
              <History className="w-3.5 h-3.5 text-slate-400" />
              <span>Past Notes ({pastLogsWithNotes.length})</span>
              {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {!isEditing && hasAnyNotes && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-600/40 rounded-xl flex items-center gap-2 text-xs text-emerald-200 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Daily session notes saved and synced to your study log!</span>
        </div>
      )}

      {/* History Accordion if opened */}
      {showHistory && pastLogsWithNotes.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Recent Days&apos; Study Log Notes</span>
            </span>
            <span className="text-[11px] text-slate-500">Stored in offline progress journal</span>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {pastLogsWithNotes.map((pastLog) => (
              <div
                key={pastLog.date}
                className="p-3 bg-slate-900/90 rounded-lg border border-slate-800/70 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400">
                    {pastLog.dayLabel} ({pastLog.date})
                  </span>
                  <span className="text-slate-500">
                    {(pastLog.loggedCommonHours + pastLog.loggedRajasthanHours + pastLog.loggedTestHours).toFixed(1)}h logged
                  </span>
                </div>

                {pastLog.focusArea && (
                  <div>
                    <span className="text-slate-500 font-medium">Focus: </span>
                    <span className="text-slate-300">{pastLog.focusArea}</span>
                  </div>
                )}

                {pastLog.challenges && (
                  <div>
                    <span className="text-rose-400 font-medium">Challenge: </span>
                    <span className="text-slate-300">{pastLog.challenges}</span>
                  </div>
                )}

                {pastLog.notes && (
                  <p className="text-slate-400 italic bg-slate-950/60 p-2 rounded border border-slate-800/50">
                    &ldquo;{pastLog.notes}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Area: View Mode or Edit Mode */}
      {!isEditing && hasAnyNotes ? (
        <div className="mt-4 space-y-3.5">
          {/* Specific Focus Area Card */}
          {todayLog.focusArea && (
            <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Target className="w-3.5 h-3.5" />
                <span>Specific Focus Area Today</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed pl-5">
                {todayLog.focusArea}
              </p>
            </div>
          )}

          {/* Challenges Faced Card */}
          {todayLog.challenges && (
            <div className="p-3.5 bg-rose-950/20 border border-rose-600/30 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Challenges & Traps Encountered</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5">
                {todayLog.challenges}
              </p>
            </div>
          )}

          {/* Personal Reflection Notes */}
          {todayLog.notes && (
            <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Personal Session Takeaways & Strategy Anchor</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 whitespace-pre-line bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 font-sans">
                {todayLog.notes}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Edit / Input Form Mode */
        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Focus Area Field */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Today&apos;s Specific Focus Area</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">Topic, chapter, or subject layer</span>
            </label>
            <input
              type="text"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              placeholder="e.g. Laxmikanth Ch. 38 (Panchayati Raj), Rajasthan Mineral Resources, Sectional Test #3"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500/80 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
            />
            {/* Quick focus suggestion chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 font-medium mr-1">Quick Suggestions:</span>
              {QUICK_FOCUS_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleAppendFocusPreset(preset)}
                  className="px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-800/80 text-[11px] text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  + {preset.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Challenges Faced Field */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Challenges & Cognitive Traps Encountered</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">What felt tricky or caused hesitation</span>
            </label>
            <input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="e.g. Inverted questions ('Which is NOT correct'), confusing Article 243K with 324, time pressure on math/CSAT"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-rose-500/80 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
            />
            {/* Quick challenge suggestion chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 font-medium mr-1">Common Pitfalls:</span>
              {QUICK_CHALLENGE_PRESETS.slice(0, 4).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleAppendChallengePreset(preset)}
                  className="px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-800/80 text-[11px] text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  + {preset.split(' ')[0]} {preset.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Brief Personal Notes Textarea */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Brief Personal Reflection & Revision Notes</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {notes.length} characters
              </span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down key memory formulas, tricky exam traps to review tomorrow, or your overall self-assessment of today's study discipline..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500/80 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors resize-y leading-relaxed"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-500">
              Notes automatically link to today&apos;s study session log ({todayLog.date})
            </div>

            <div className="flex items-center gap-2">
              {hasAnyNotes && (
                <button
                  type="button"
                  onClick={() => {
                    setFocusArea(todayLog.focusArea || '');
                    setChallenges(todayLog.challenges || '');
                    setNotes(todayLog.notes || '');
                    setIsEditing(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
