import React, { useState, useEffect } from 'react';
import { Target, Clock, CheckCircle2, Flame, Sparkles, Plus, Minus, ArrowRight, ShieldCheck, BellRing, Trophy } from 'lucide-react';
import { UserProfile, DayStudyLog } from '../types';

interface DailyGoalSectionProps {
  userProfile: UserProfile;
  onUpdateDailyGoal: (newGoalHours: number) => void;
  dayLogs: DayStudyLog[];
  onUpdateTodayLog: (common: number, rajasthan: number, test: number) => void;
}

export const DailyGoalSection: React.FC<DailyGoalSectionProps> = ({
  userProfile,
  onUpdateDailyGoal,
  dayLogs,
  onUpdateTodayLog,
}) => {
  const currentGoal = userProfile.studyHours || 8;
  const [goalInput, setGoalInput] = useState<number>(currentGoal);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);

  useEffect(() => {
    setGoalInput(userProfile.studyHours || 8);
  }, [userProfile.studyHours]);

  // Today's log
  const todayLog = dayLogs[dayLogs.length - 1] || {
    date: new Date().toISOString().split('T')[0],
    dayLabel: 'Today',
    loggedCommonHours: 4.5,
    loggedRajasthanHours: 1.5,
    loggedTestHours: 0.8,
    completedTopicIds: [],
  };

  const todayActualHours = Number(
    (todayLog.loggedCommonHours + todayLog.loggedRajasthanHours + todayLog.loggedTestHours).toFixed(1)
  );

  // Circular calculations
  // Radius = 64, circumference = 2 * PI * 64 = ~402.12
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const rawPercentage = currentGoal > 0 ? (todayActualHours / currentGoal) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, rawPercentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  const hoursRemaining = Math.max(0, Number((currentGoal - todayActualHours).toFixed(1)));
  const isGoalMet = todayActualHours >= currentGoal;

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const validated = Math.min(16, Math.max(2, goalInput));
    onUpdateDailyGoal(validated);
    setIsEditingGoal(false);
  };

  const handleQuickAdd = (additionalHours: number) => {
    // Distribute according to 70:20:10
    const addCommon = Number((additionalHours * 0.7).toFixed(1));
    const addRajasthan = Number((additionalHours * 0.2).toFixed(1));
    const addTest = Number((additionalHours * 0.1).toFixed(1));

    onUpdateTodayLog(
      Number((todayLog.loggedCommonHours + addCommon).toFixed(1)),
      Number((todayLog.loggedRajasthanHours + addRajasthan).toFixed(1)),
      Number((todayLog.loggedTestHours + addTest).toFixed(1))
    );
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Left Section: Circular Progress Indicator & Metrics */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full lg:w-auto">
          {/* Circular Progress Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1e293b"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={isGoalMet ? '#34d399' : '#fbbf24'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Inner Content inside Circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <span className="text-2xl sm:text-3xl font-bold font-serif text-slate-100 tabular-nums">
                {todayActualHours}
                <span className="text-xs font-sans text-slate-400 font-normal">h</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                of {currentGoal}.0h goal
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${
                  isGoalMet
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                }`}
              >
                {Math.round(rawPercentage)}% Completed
              </span>
            </div>
          </div>

          {/* Goal Status & Discipline Insight */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="p-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Target className="w-4 h-4" />
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-100">
                Today&apos;s Study Target Status
              </h3>
              {isGoalMet && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                  <BellRing className="w-3 h-3 text-emerald-400" />
                  Target Alert Active
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              {isGoalMet ? (
                <span className="text-emerald-300 font-medium">
                  🎉 Outstanding discipline! You have reached your {currentGoal}h daily target as set in your profile ({todayActualHours}h logged). The goal reached toast alert has been generated.
                </span>
              ) : (
                <span>
                  You have logged <strong className="text-amber-300">{todayActualHours}h</strong>. Stay steady for{' '}
                  <strong className="text-amber-300">{hoursRemaining} more hours</strong> to hit your {currentGoal}h daily goal and trigger your milestone alert.
                </span>
              )}
            </p>

            {/* Horizontal Progress Bar */}
            <div className="w-full max-w-sm space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Progress: {todayActualHours}h of {currentGoal}h goal</span>
                <span className={`font-semibold ${isGoalMet ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {Math.round(rawPercentage)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isGoalMet
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                      : 'bg-gradient-to-r from-amber-500 to-amber-300'
                  }`}
                  style={{ width: `${clampedPercentage}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">Quick Log:</span>
              <button
                type="button"
                onClick={() => handleQuickAdd(0.5)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
              >
                +30m Study
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(1.0)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
              >
                +1h Study
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(2.0)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
              >
                +2h Deep Session
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Set / Modify Daily Goal Controller */}
        <div className="w-full lg:w-80 bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Configuration</span>
            </span>
            <button
              type="button"
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer font-medium"
            >
              {isEditingGoal ? 'Cancel' : 'Change Goal'}
            </button>
          </div>

          {!isEditingGoal ? (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Current Daily Goal:</span>
                <span className="text-xl font-bold font-serif text-amber-300 tabular-nums">
                  {currentGoal} Hours
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-snug bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80">
                Core (70%): <strong className="text-slate-200">{(currentGoal * 0.7).toFixed(1)}h</strong> · Rajasthan (20%): <strong className="text-slate-200">{(currentGoal * 0.2).toFixed(1)}h</strong> · Mocks (10%): <strong className="text-slate-200">{(currentGoal * 0.1).toFixed(1)}h</strong>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveGoal} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Adjust Daily Study Goal (2h – 16h):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={2}
                    max={16}
                    step={1}
                    value={goalInput}
                    onChange={(e) => setGoalInput(Number(e.target.value))}
                    className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="w-12 text-right font-bold text-amber-400 font-serif text-sm">
                    {goalInput}h
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Set New Goal
                </button>
              </div>
            </form>
          )}

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => {
                onUpdateDailyGoal(6);
                setGoalInput(6);
                setIsEditingGoal(false);
              }}
              className="py-1 px-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-center transition-colors border border-slate-800/80 cursor-pointer"
            >
              6h (Working)
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateDailyGoal(8);
                setGoalInput(8);
                setIsEditingGoal(false);
              }}
              className="py-1 px-1.5 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 text-center font-medium transition-colors border border-slate-800/80 cursor-pointer"
            >
              8h (Full-time)
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateDailyGoal(10);
                setGoalInput(10);
                setIsEditingGoal(false);
              }}
              className="py-1 px-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-center transition-colors border border-slate-800/80 cursor-pointer"
            >
              10h (Intensive)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
