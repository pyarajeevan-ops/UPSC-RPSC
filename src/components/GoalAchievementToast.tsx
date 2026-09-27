import React, { useState, useEffect } from 'react';
import { Award, Flame, CheckCircle2, X, Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface GoalAchievementToastProps {
  isGoalReached: boolean;
  actualHours: number;
  targetGoal: number;
  onSelectTab?: (tab: string) => void;
}

export const GoalAchievementToast: React.FC<GoalAchievementToastProps> = ({
  isGoalReached,
  actualHours,
  targetGoal,
  onSelectTab,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [prevGoalReached, setPrevGoalReached] = useState(false);

  useEffect(() => {
    // When goal becomes reached or target changes such that it's reached
    if (isGoalReached && !hasDismissed) {
      setIsVisible(true);
    } else if (!isGoalReached) {
      // If user lowered logged hours or increased goal, reset dismissal so next time it reaches, toast shows again
      setHasDismissed(false);
      setIsVisible(false);
    }
  }, [isGoalReached, hasDismissed, targetGoal, actualHours]);

  if (!isVisible || !isGoalReached) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-slate-900/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Trophy Icon & Congratulatory Message */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-400 p-0.5 shrink-0 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Daily Target Achieved!</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Streak Protected</span>
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-100 font-serif">
              Outstanding consistency! You logged {actualHours}h of your {targetGoal}h daily quota.
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your preparation volume is firmly on track for the dual UPSC CSE & RPSC RAS Prelims syllabus. Any further session today will count as surplus active recall!
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action & Dismiss Button */}
        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
          {onSelectTab && (
            <button
              onClick={() => onSelectTab('revision')}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-sm shadow-emerald-500/20"
            >
              <span>5-3-2-1-1 Recall</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => {
              setIsVisible(false);
              setHasDismissed(true);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
