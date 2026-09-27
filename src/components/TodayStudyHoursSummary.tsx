import React from 'react';
import {
  Target,
  Trophy,
  Sparkles,
  Clock,
  CheckCircle2,
  Flame,
  Award,
  BookOpen,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { UserProfile, DayStudyLog } from '../types';

interface TodayStudyHoursSummaryProps {
  userProfile: UserProfile;
  todayLog: DayStudyLog;
  onUpdateTodayLog?: (common: number, rajasthan: number, test: number) => void;
}

export const TodayStudyHoursSummary: React.FC<TodayStudyHoursSummaryProps> = ({
  userProfile,
  todayLog,
  onUpdateTodayLog,
}) => {
  const targetGoalHours = userProfile.studyHours || 8;
  const commonLogged = todayLog.loggedCommonHours || 0;
  const rajasthanLogged = todayLog.loggedRajasthanHours || 0;
  const testLogged = todayLog.loggedTestHours || 0;

  const totalLoggedHours = Number((commonLogged + rajasthanLogged + testLogged).toFixed(1));
  const rawPercentage = targetGoalHours > 0 ? (totalLoggedHours / targetGoalHours) * 100 : 0;
  const percentage = Math.round(rawPercentage);
  const clampedProgressWidth = Math.min(100, Math.max(0, rawPercentage));

  const isGoalMet = totalLoggedHours >= targetGoalHours;
  const hoursRemaining = Math.max(0, Number((targetGoalHours - totalLoggedHours).toFixed(1)));
  const surplusHours = Number((totalLoggedHours - targetGoalHours).toFixed(1));

  const handleQuickAdd = (hoursToAdd: number) => {
    if (!onUpdateTodayLog) return;
    // Distribute according to 70:20:10 architecture
    const addCommon = Number((hoursToAdd * 0.7).toFixed(1));
    const addRajasthan = Number((hoursToAdd * 0.2).toFixed(1));
    const addTest = Number((hoursToAdd * 0.1).toFixed(1));

    onUpdateTodayLog(
      Number((commonLogged + addCommon).toFixed(1)),
      Number((rajasthanLogged + addRajasthan).toFixed(1)),
      Number((testLogged + addTest).toFixed(1))
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 p-5 sm:p-6 shadow-xl ${
        isGoalMet
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/50 shadow-emerald-950/20'
          : 'bg-slate-900/95 border-slate-800'
      }`}
    >
      {/* Top Header: Title & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl border ${
              isGoalMet
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
          >
            {isGoalMet ? <Trophy className="w-5 h-5 text-emerald-400 animate-bounce" /> : <Target className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-slate-100">
                Today&apos;s Study Hours vs Target
              </h3>
              {isGoalMet ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Target Met
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Clock className="w-3 h-3 text-amber-400" />
                  In Progress
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily goal calibrated for {userProfile.targetExam} ({userProfile.targetYear})
            </p>
          </div>
        </div>

        {/* Big Counter Stat */}
        <div className="flex items-baseline gap-2 self-start sm:self-auto bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 tabular-nums">
            {totalLoggedHours}
            <span className="text-xs font-sans font-normal text-slate-400 ml-0.5">h</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">
            / {targetGoalHours}h Goal
          </span>
          <span
            className={`ml-1 text-xs font-bold tabular-nums px-2 py-0.5 rounded-md ${
              isGoalMet
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
            }`}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Visual Progress Bar Section */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Daily Goal Completion</span>
          </span>
          <span className="text-slate-400 tabular-nums">
            {isGoalMet ? (
              <span className="text-emerald-400 font-semibold">
                {surplusHours > 0 ? `+${surplusHours}h surplus study time` : 'Exact target accomplished'}
              </span>
            ) : (
              <span>
                <strong className="text-amber-300">{hoursRemaining}h</strong> remaining to reach goal
              </span>
            )}
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="relative w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out relative ${
              isGoalMet
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-sm shadow-emerald-500/50'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-sm shadow-amber-500/30'
            }`}
            style={{ width: `${clampedProgressWidth}%` }}
          >
            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-white/15 rounded-full" />
          </div>

          {/* Tick markers at 25%, 50%, 75% */}
          <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-slate-700/60 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-slate-700/60 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-slate-700/60 pointer-events-none" />
        </div>

        {/* Sub-bar Markers & Distribution Summary */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span>0h</span>
          <span>{(targetGoalHours * 0.25).toFixed(1)}h (25%)</span>
          <span>{(targetGoalHours * 0.5).toFixed(1)}h (50%)</span>
          <span>{(targetGoalHours * 0.75).toFixed(1)}h (75%)</span>
          <span className={isGoalMet ? 'text-emerald-400 font-bold' : ''}>
            {targetGoalHours}h (100%)
          </span>
        </div>
      </div>

      {/* Congratulatory Banner when Goal is Met */}
      {isGoalMet && (
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/40 border border-emerald-500/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-spin-slow" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                <span>🎉 Congratulations! Daily Target Successfully Completed!</span>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-xl">
                You have reached your goal of <strong className="text-emerald-300">{targetGoalHours} hours</strong> ({totalLoggedHours} hours logged today).
                Maintaining this level of daily consistency is what transforms candidates into rank holders in civil services.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Daily Goal Achieved
                </span>
                <span className="text-slate-600">·</span>
                <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Streak Preserved
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">
                  Ready for tomorrow&apos;s spaced recall
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 self-end sm:self-center">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-300" />
              Goal Met
            </span>
          </div>
        </div>
      )}

      {/* In-Progress Encouragement Banner when Goal is NOT Met */}
      {!isGoalMet && (
        <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Stay Focused: {hoursRemaining} hours remaining today</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Log focused sessions in Core Concepts, Rajasthan Vault, or Test Mode to hit your {targetGoalHours}h target and unlock your daily achievement milestone.
            </p>
          </div>

          {onUpdateTodayLog && (
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Quick Log:</span>
              <button
                type="button"
                onClick={() => handleQuickAdd(0.5)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                title="Log 30 minutes of study"
              >
                +30m
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(1.0)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 hover:border-amber-500/40 text-xs font-medium transition-colors cursor-pointer"
                title="Log 1 hour of study"
              >
                +1h
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(2.0)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/40 text-xs font-medium transition-colors cursor-pointer"
                title="Log 2 hours of study"
              >
                +2h
              </button>
            </div>
          )}
        </div>
      )}

      {/* 70:20:10 Layer Breakdown of Today's Hours */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[11px] block">UPSC Core (70%)</span>
              <span className="font-semibold text-slate-200">{commonLogged}h</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Goal: {(targetGoalHours * 0.7).toFixed(1)}h
          </span>
        </div>

        <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[11px] block">Rajasthan (20%)</span>
              <span className="font-semibold text-slate-200">{rajasthanLogged}h</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Goal: {(targetGoalHours * 0.2).toFixed(1)}h
          </span>
        </div>

        <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[11px] block">Tests & Mocks (10%)</span>
              <span className="font-semibold text-slate-200">{testLogged}h</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Goal: {(targetGoalHours * 0.1).toFixed(1)}h
          </span>
        </div>
      </div>

      {/* Today's Focus & Challenges Snippet */}
      {(todayLog.focusArea || todayLog.challenges || todayLog.notes) && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {todayLog.focusArea && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 font-medium text-[11px]">
                <Target className="w-3 h-3 text-amber-400" />
                <span>{todayLog.focusArea}</span>
              </span>
            )}
            {todayLog.challenges && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-950/40 border border-rose-600/30 text-rose-300 text-[11px] max-w-sm truncate">
                <span className="font-semibold text-rose-400">Trap:</span>
                <span className="truncate">{todayLog.challenges}</span>
              </span>
            )}
          </div>
          {todayLog.notes && (
            <span className="text-[11px] text-slate-400 italic max-w-md truncate">
              &ldquo;{todayLog.notes}&rdquo;
            </span>
          )}
        </div>
      )}
    </div>
  );
};
