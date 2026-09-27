import React, { useEffect, useState, useRef } from 'react';
import {
  Trophy,
  CheckCircle2,
  Sparkles,
  X,
  ArrowRight,
  Flame,
  Award,
  BellRing,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { UserProfile, DayStudyLog } from '../types';

interface GoalReachedNotificationProps {
  userProfile: UserProfile;
  todayLog: DayStudyLog;
  onSelectTab: (tab: string) => void;
}

export const GoalReachedNotification: React.FC<GoalReachedNotificationProps> = ({
  userProfile,
  todayLog,
  onSelectTab,
}) => {
  const goalHours = userProfile.studyHours || 8;
  const todayActualHours = Number(
    (todayLog.loggedCommonHours + todayLog.loggedRajasthanHours + todayLog.loggedTestHours).toFixed(1)
  );

  const isGoalReached = todayActualHours >= goalHours;
  const [showToast, setShowToast] = useState<boolean>(false);
  const [hasDismissed, setHasDismissed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const prevHoursRef = useRef<number>(todayActualHours);
  const prevGoalRef = useRef<number>(goalHours);

  // Gentle acoustic chime synthesizer using Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Note 2: A5 (880 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.12);
      gain2.gain.setValueAtTime(0.08, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.7);
    } catch {
      // AudioContext unallowed before user interaction, ignore gracefully
    }
  };

  // Trigger toast when target is reached or updated
  useEffect(() => {
    const wasReached = prevHoursRef.current >= prevGoalRef.current;
    const nowReached = todayActualHours >= goalHours;

    // Trigger if transition from unreached to reached, or if goal changed to a reachable value
    if (nowReached && (!wasReached || todayActualHours > prevHoursRef.current)) {
      setShowToast(true);
      setHasDismissed(false);
      playChime();
    } else if (nowReached && !hasDismissed && !showToast) {
      // First render where goal is already reached
      setShowToast(true);
    }

    prevHoursRef.current = todayActualHours;
    prevGoalRef.current = goalHours;
  }, [todayActualHours, goalHours]);

  const handleDismissToast = () => {
    setShowToast(false);
    setHasDismissed(true);
  };

  const handleReopenToast = () => {
    setShowToast(true);
    setHasDismissed(false);
    playChime();
  };

  const surplusHours = Number((todayActualHours - goalHours).toFixed(1));

  return (
    <>
      {/* 1. In-Page Goal Met Alert Banner (Visible at top of Dashboard) */}
      {isGoalReached && (
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/40 p-4 sm:p-5 shadow-lg shadow-emerald-950/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Sparkles className="w-3 h-3" />
                    Daily Target Accomplished
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {todayActualHours}h logged / {goalHours}h target
                  </span>
                </div>
                <h3 className="font-serif font-bold text-slate-100 text-sm sm:text-base">
                  Daily Study Goal Achieved · Full 70:20:10 Allocation Fulfilled
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Congratulations! You have completed today&apos;s planned syllabus quota for{' '}
                  <strong className="text-amber-300">{userProfile.targetExam}</strong>. You logged{' '}
                  <strong className="text-emerald-300">{todayLog.loggedCommonHours}h</strong> Common Core (70%),{' '}
                  <strong className="text-emerald-300">{todayLog.loggedRajasthanHours}h</strong> Rajasthan Layer (20%), and{' '}
                  <strong className="text-emerald-300">{todayLog.loggedTestHours}h</strong> Mocks & Active Recall (10%).
                  {surplusHours > 0 && (
                    <span className="ml-1 text-amber-300 font-medium">
                      (+{surplusHours}h surplus logged!)
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={handleReopenToast}
                className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>View Toast Alert</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('mistakes')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Mistake Log</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Toast Notification (Appears prominently when goal is reached) */}
      {showToast && isGoalReached && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="relative rounded-2xl border-2 border-emerald-500/50 bg-slate-900/98 backdrop-blur-xl p-5 shadow-2xl shadow-emerald-950/60 text-slate-100 ring-1 ring-emerald-500/20">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 rounded-t-2xl" />

            {/* Header row with controls */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Goal Reached!
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                      100%+ Done
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-100 text-base">
                    Daily Study Target Achieved
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleDismissToast}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Dismiss Toast"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body copy */}
            <div className="mt-3 text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                You have reached your target of <strong className="text-amber-300">{goalHours}.0 hours</strong> with{' '}
                <strong className="text-emerald-300 font-semibold">{todayActualHours} hours</strong> logged today for{' '}
                <span className="text-slate-200">{userProfile.targetExam}</span>.
              </p>

              {/* Sub-allocations grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-center text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Common (70%)</span>
                  <span className="font-bold text-amber-300">{todayLog.loggedCommonHours}h</span>
                </div>
                <div className="border-x border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Rajasthan (20%)</span>
                  <span className="font-bold text-emerald-400">{todayLog.loggedRajasthanHours}h</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mocks (10%)</span>
                  <span className="font-bold text-slate-200">{todayLog.loggedTestHours}h</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300/90 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Prelims discipline verified. Take a rest or engage in low-stress active recall.</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  handleDismissToast();
                  onSelectTab('revision');
                }}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer text-center"
              >
                5-3-2-1-1 Recall
              </button>
              <button
                type="button"
                onClick={handleDismissToast}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
