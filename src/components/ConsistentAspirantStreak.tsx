import React from 'react';
import {
  Flame,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { DayStudyLog, UserProfile } from '../types';

interface ConsistentAspirantStreakProps {
  userProfile: UserProfile;
  dayLogs: DayStudyLog[];
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  isTodayMet: boolean;
  todayActualHours: number;
  targetHours: number;
  status: 'ACTIVE_TODAY' | 'PENDING_TODAY' | 'BROKEN';
  dayStatuses: {
    date: string;
    dayLabel: string;
    actualHours: number;
    targetHours: number;
    isMet: boolean;
    isToday: boolean;
  }[];
}

export function calculateStreakStats(dayLogs: DayStudyLog[] = [], targetHours: number): StreakStats {
  const goal = targetHours || 8;

  if (!dayLogs || dayLogs.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      isTodayMet: false,
      todayActualHours: 0,
      targetHours: goal,
      status: 'BROKEN',
      dayStatuses: [],
    };
  }

  const dayStatuses = dayLogs.map((log, index) => {
    const isToday = index === dayLogs.length - 1;
    const actualHours = Number(
      (log.loggedCommonHours + log.loggedRajasthanHours + log.loggedTestHours).toFixed(1)
    );
    const isMet = actualHours >= goal;
    return {
      date: log.date,
      dayLabel: log.dayLabel || (isToday ? 'Today' : log.date.slice(-5)),
      actualHours,
      targetHours: goal,
      isMet,
      isToday,
    };
  });

  const todayItem = dayStatuses[dayStatuses.length - 1];
  const isTodayMet = todayItem ? todayItem.isMet : false;
  const todayActualHours = todayItem ? todayItem.actualHours : 0;

  // Calculate current streak backwards from today
  let currentStreak = 0;
  let status: 'ACTIVE_TODAY' | 'PENDING_TODAY' | 'BROKEN' = 'BROKEN';

  if (isTodayMet) {
    status = 'ACTIVE_TODAY';
    currentStreak = 1;
    for (let i = dayStatuses.length - 2; i >= 0; i--) {
      if (dayStatuses[i].isMet) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    // Today not yet met. Check yesterday
    const yesterdayItem = dayStatuses[dayStatuses.length - 2];
    if (yesterdayItem && yesterdayItem.isMet) {
      status = 'PENDING_TODAY';
      currentStreak = 1;
      for (let i = dayStatuses.length - 3; i >= 0; i--) {
        if (dayStatuses[i].isMet) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      status = 'BROKEN';
      currentStreak = 0;
    }
  }

  // Calculate longest streak in entire logs
  let longestStreak = 0;
  let running = 0;
  for (const day of dayStatuses) {
    if (day.isMet) {
      running++;
      if (running > longestStreak) {
        longestStreak = running;
      }
    } else {
      running = 0;
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    isTodayMet,
    todayActualHours,
    targetHours: goal,
    status,
    dayStatuses,
  };
}

export const ConsistentAspirantStreak: React.FC<ConsistentAspirantStreakProps> = ({
  userProfile,
  dayLogs,
}) => {
  const targetGoal = userProfile.studyHours || 8;
  const stats = calculateStreakStats(dayLogs, targetGoal);

  // Determine Badge Tier based on streak
  const getStreakTier = (streak: number) => {
    if (streak >= 14) return { title: 'Prelims Legend Cadre', color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (streak >= 7) return { title: 'Disciplined Ranker', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (streak >= 3) return { title: 'Consistent Aspirant', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (streak >= 1) return { title: 'Rising Contender', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
    return { title: 'Initiating Consistency', color: 'text-slate-400', bg: 'bg-slate-800 border-slate-700' };
  };

  const tier = getStreakTier(stats.currentStreak);

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Flame Streak Badge & Summary */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative flex items-center justify-center shrink-0">
            {/* Glowing flame aura */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border transition-all ${
              stats.currentStreak > 0
                ? 'bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-emerald-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <Flame
                className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                  stats.currentStreak > 0
                    ? 'text-amber-400 fill-amber-400 animate-pulse'
                    : 'text-slate-600'
                }`}
              />
            </div>
            {/* Streak Number Pill */}
            <div className="absolute -bottom-2 -right-1 bg-amber-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full border border-amber-300 shadow">
              {stats.currentStreak}d
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${tier.bg} ${tier.color} flex items-center gap-1`}>
                <Sparkles className="w-3 h-3" />
                {tier.title}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Goal: {targetGoal}h/day
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-100 flex items-center gap-2">
              <span>{stats.currentStreak} Day Consistency Streak</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              {stats.status === 'ACTIVE_TODAY' ? (
                <span className="text-emerald-300 font-medium">
                  🔥 Streak extended! You logged {stats.todayActualHours}h today, surpassing your {targetGoal}h quota.
                </span>
              ) : stats.status === 'PENDING_TODAY' ? (
                <span>
                  🔥 Active {stats.currentStreak}-day streak preserved from yesterday. Log{' '}
                  <strong className="text-amber-300">
                    {Math.max(0, Number((targetGoal - stats.todayActualHours).toFixed(1)))} more hours
                  </strong>{' '}
                  today to advance to a {stats.currentStreak + 1}-day streak!
                </span>
              ) : (
                <span>
                  Start your daily streak by completing today&apos;s {targetGoal}h study goal across UPSC Core and Rajasthan layers.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Longest streak metric & 7-Day Day-by-day Ribbon */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          {/* Streak Stats Column */}
          <div className="space-y-1 pr-0 sm:pr-4 sm:border-r border-slate-800 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Record Streak</span>
            </div>
            <div className="font-serif font-bold text-lg text-slate-100 tabular-nums">
              {stats.longestStreak} <span className="text-xs font-normal text-slate-400 font-sans">Days</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Consistency Rate: {stats.dayStatuses.length > 0 ? Math.round((stats.dayStatuses.filter(d => d.isMet).length / stats.dayStatuses.length) * 100) : 0}%
            </div>
          </div>

          {/* 7-Day Visual Timeline Ribbon */}
          <div className="space-y-1.5 w-full sm:w-auto">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Last 7 Days Tracking</span>
              </span>
              <span className="text-[10px] text-slate-500">
                {stats.dayStatuses.filter((d) => d.isMet).length}/{stats.dayStatuses.length || 7} Target Met
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {stats.dayStatuses.map((day, idx) => {
                const isMet = day.isMet;
                const isToday = day.isToday;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-between py-1.5 px-2 rounded-lg border text-center transition-all min-w-[36px] sm:min-w-[42px] ${
                      isMet
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                        : isToday
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 animate-pulse'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                    title={`${day.date} (${day.dayLabel}): ${day.actualHours}h logged vs ${day.targetHours}h goal`}
                  >
                    <span className="text-[10px] font-semibold">{day.dayLabel}</span>
                    <div className="my-1">
                      {isMet ? (
                        <Flame className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      ) : isToday ? (
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <span className="text-slate-600 font-mono text-[10px]">—</span>
                      )}
                    </div>
                    <span className="text-[9px] font-mono tabular-nums">{day.actualHours}h</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
