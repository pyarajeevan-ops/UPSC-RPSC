import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  Plus,
  Minus,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Flame,
  Check
} from 'lucide-react';
import { UserProfile, TopicLesson, DayStudyLog } from '../types';
import { RechartsProgress } from './RechartsProgress';

interface StudyProgressTrackerProps {
  userProfile: UserProfile;
  topics: TopicLesson[];
  completedTopicIds: string[];
  onToggleTopicCompleted: (topicId: string) => void;
  onSelectTopic: (topicId: string) => void;
  dayLogs: DayStudyLog[];
  onUpdateTodayLog: (common: number, rajasthan: number, test: number) => void;
}

export const StudyProgressTracker: React.FC<StudyProgressTrackerProps> = ({
  userProfile,
  topics,
  completedTopicIds,
  onToggleTopicCompleted,
  onSelectTopic,
  dayLogs,
  onUpdateTodayLog,
}) => {
  // Target daily hours and layer breakdowns
  const targetTotal = userProfile.studyHours || 8;
  const targetCommon = Number((targetTotal * 0.7).toFixed(1));
  const targetRajasthan = Number((targetTotal * 0.2).toFixed(1));
  const targetTest = Number((targetTotal * 0.1).toFixed(1));

  // Today's log is the last entry in dayLogs
  const todayLog = dayLogs[dayLogs.length - 1] || {
    date: new Date().toISOString().split('T')[0],
    dayLabel: 'Today',
    loggedCommonHours: 4.0,
    loggedRajasthanHours: 1.5,
    loggedTestHours: 0.8,
    completedTopicIds: [],
  };

  const todayTotalLogged = Number(
    (todayLog.loggedCommonHours + todayLog.loggedRajasthanHours + todayLog.loggedTestHours).toFixed(1)
  );

  const percentHoursAchieved = Math.min(100, Math.round((todayTotalLogged / targetTotal) * 100));

  // Topics progress calculation
  const totalTopics = topics.length;
  const completedCount = completedTopicIds.length;
  const percentTopicsCompleted = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Breakdown by layer
  const commonTopics = topics.filter((t) => t.tags.includes('COMMON'));
  const completedCommon = commonTopics.filter((t) => completedTopicIds.includes(t.id)).length;
  const commonProgressPercent = commonTopics.length > 0 ? Math.round((completedCommon / commonTopics.length) * 100) : 0;

  const rajasthanTopics = topics.filter((t) => t.tags.includes('RPSC EXTRA'));
  const completedRajasthan = rajasthanTopics.filter((t) => completedTopicIds.includes(t.id)).length;
  const rajasthanProgressPercent = rajasthanTopics.length > 0 ? Math.round((completedRajasthan / rajasthanTopics.length) * 100) : 0;

  // Active view: 'overview' | 'charts' | 'syllabus_breakdown'
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'syllabus_breakdown'>('overview');

  const handleAdjustHours = (layer: 'common' | 'rajasthan' | 'test', delta: number) => {
    let newCommon = todayLog.loggedCommonHours;
    let newRajasthan = todayLog.loggedRajasthanHours;
    let newTest = todayLog.loggedTestHours;

    if (layer === 'common') {
      newCommon = Math.max(0, Number((newCommon + delta).toFixed(1)));
    } else if (layer === 'rajasthan') {
      newRajasthan = Math.max(0, Number((newRajasthan + delta).toFixed(1)));
    } else if (layer === 'test') {
      newTest = Math.max(0, Number((newTest + delta).toFixed(1)));
    }

    onUpdateTodayLog(newCommon, newRajasthan, newTest);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Top Header of Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2 font-serif">
              <span>Aspirant Progress & Daily Discipline Tracker</span>
            </h2>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-600/40 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>7-Day Streak</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time tracking of actual hours logged versus your target {targetTotal}h goal & verified syllabus coverage
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs self-start sm:self-auto gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Daily Hours & Velocity
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'charts'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Progress Charts</span>
          </button>
          <button
            onClick={() => setActiveTab('syllabus_breakdown')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'syllabus_breakdown'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Syllabus Units ({completedCount}/{totalTopics})
          </button>
        </div>
      </div>

      {/* Recharts Analytics Section in Overview or Dedicated Charts Tab */}
      {activeTab === 'charts' && (
        <RechartsProgress
          userProfile={userProfile}
          dayLogs={dayLogs}
          topics={topics}
          completedTopicIds={completedTopicIds}
        />
      )}

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Direct Recharts Progress Visualizer inside Overview */}
          <RechartsProgress
            userProfile={userProfile}
            dayLogs={dayLogs}
            topics={topics}
            completedTopicIds={completedTopicIds}
          />
          {/* Main 2-Column Gauge: Left is Today's Hours vs Target; Right is 7-Day Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 cols: Today's Hours Tracker with live increment buttons */}
            <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Today&apos;s Study Dedication</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold font-serif text-slate-100 tabular-nums">
                      {todayTotalLogged}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ {targetTotal}.0 target hrs</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ml-2 ${
                        todayTotalLogged >= targetTotal
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                          : 'bg-amber-950/70 text-amber-300 border border-amber-600/40'
                      }`}
                    >
                      {percentHoursAchieved}% Achieved
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Today&apos;s Status</span>
                  <span className="text-xs font-semibold text-amber-300">
                    {todayTotalLogged >= targetTotal
                      ? 'Target Completed! ✓'
                      : `${(targetTotal - todayTotalLogged).toFixed(1)} hrs remaining`}
                  </span>
                </div>
              </div>

              {/* Progress Bar of Total Daily Target */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${percentHoursAchieved}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>0 hrs</span>
                  <span>Margdarshak Ideal: {targetTotal} hrs</span>
                  <span>Surplus</span>
                </div>
              </div>

              {/* 3 Interactive Layer Increments (70 : 20 : 10 Rule) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/60">
                {/* 1. Common Core (70%) */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Core (70%)</span>
                    <span className="font-bold text-amber-400 tabular-nums">
                      {todayLog.loggedCommonHours}h <span className="text-slate-600">/{targetCommon}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.round((todayLog.loggedCommonHours / targetCommon) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustHours('common', -0.5)}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-slate-800 cursor-pointer"
                      title="Subtract 30 min"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] text-slate-500">± 30m</span>
                    <button
                      type="button"
                      onClick={() => handleAdjustHours('common', 0.5)}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors border border-slate-800 cursor-pointer"
                      title="Add 30 min"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 2. Rajasthan Layer (20%) */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Rajasthan (20%)</span>
                    <span className="font-bold text-amber-400 tabular-nums">
                      {todayLog.loggedRajasthanHours}h <span className="text-slate-600">/{targetRajasthan}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.round((todayLog.loggedRajasthanHours / targetRajasthan) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustHours('rajasthan', -0.5)}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-slate-800 cursor-pointer"
                      title="Subtract 30 min"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] text-slate-500">± 30m</span>
                    <button
                      type="button"
                      onClick={() => handleAdjustHours('rajasthan', 0.5)}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors border border-slate-800 cursor-pointer"
                      title="Add 30 min"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 3. Test & Recall (10%) */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Mocks & Recall</span>
                    <span className="font-bold text-amber-400 tabular-nums">
                      {todayLog.loggedTestHours}h <span className="text-slate-600">/{targetTest}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.round((todayLog.loggedTestHours / targetTest) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustHours('test', -0.2)}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-slate-800 cursor-pointer"
                      title="Subtract 15 min"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] text-slate-500">± 15m</span>
                    <button
                      type="button"
                      onClick={() => handleAdjustHours('test', 0.2)}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors border border-slate-800 cursor-pointer"
                      title="Add 15 min"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: 7-Day Cumulative History Strip & Quick Stats */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>7-Day Consistency Histogram</span>
                  </span>
                  <span className="text-slate-500 text-[11px]">Daily Target: {targetTotal}h</span>
                </div>

                {/* Vertical Bar chart representation */}
                <div className="h-32 flex items-end justify-between gap-2 pt-2 px-1 border-b border-slate-800">
                  {dayLogs.map((log, i) => {
                    const totalDay = Number(
                      (log.loggedCommonHours + log.loggedRajasthanHours + log.loggedTestHours).toFixed(1)
                    );
                    const barHeightPercent = Math.min(100, Math.round((totalDay / (targetTotal * 1.25)) * 100));
                    const isTargetMet = totalDay >= targetTotal;
                    const isCurrent = i === dayLogs.length - 1;

                    return (
                      <div key={log.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                        <span className="text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {totalDay}h
                        </span>
                        <div
                          className={`w-full rounded-t transition-all ${
                            isCurrent
                              ? 'bg-amber-400 shadow-sm shadow-amber-500/20'
                              : isTargetMet
                              ? 'bg-emerald-500/80'
                              : 'bg-slate-700/80'
                          }`}
                          style={{ height: `${Math.max(12, barHeightPercent)}%` }}
                        />
                        <span
                          className={`text-[10px] font-medium mt-1 truncate ${
                            isCurrent ? 'text-amber-300 font-bold' : 'text-slate-500'
                          }`}
                        >
                          {log.dayLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly cumulative totals & recommendation */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 text-xs flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[11px]">7-Day Cumulative Volume</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">
                    {dayLogs.reduce((acc, d) => acc + d.loggedCommonHours + d.loggedRajasthanHours + d.loggedTestHours, 0).toFixed(1)} hrs logged
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-[11px]">Syllabus Completion</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    {percentTopicsCompleted}% Completed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Syllabus Coverage Bar */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-200">Integrated Syllabus Mastery Progress</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">
                  {completedCount} of {totalTopics} high-yield units verified
                </span>
              </div>
              <button
                onClick={() => setActiveTab('syllabus_breakdown')}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>View Full Topic Checklist</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Segmented Dual Layer progress bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden flex border border-slate-800">
                <div
                  className="bg-amber-400 h-full transition-all duration-500"
                  style={{ width: `${percentTopicsCompleted}%` }}
                  title={`${completedCount} of ${totalTopics} topics completed`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Common Core: {commonProgressPercent}% ({completedCommon}/{commonTopics.length})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  Rajasthan Layer: {rajasthanProgressPercent}% ({completedRajasthan}/{rajasthanTopics.length})
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Syllabus Units Breakdown & Interactive Check-Off */}
      {activeTab === 'syllabus_breakdown' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>
              Mark topics completed as you finish reading the 12-step masterclass and solve practice questions:
            </span>
            <span className="text-amber-300 font-semibold">{percentTopicsCompleted}% Complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((t) => {
              const isDone = completedTopicIds.includes(t.id);
              const isCommon = t.tags.includes('COMMON');
              const isRajasthan = t.tags.includes('RPSC EXTRA');

              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-600/40 text-slate-300'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => onToggleTopicCompleted(t.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'border border-slate-700 hover:border-amber-400 bg-slate-900'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  {/* Topic Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] mb-1">
                      {isCommon && (
                        <span className="text-amber-400 font-medium">[COMMON 70%]</span>
                      )}
                      {isRajasthan && (
                        <span className="text-emerald-400 font-medium">[RAJASTHAN 20%]</span>
                      )}
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400 truncate">{t.subject}</span>
                    </div>

                    <h4
                      onClick={() => onSelectTopic(t.id)}
                      className={`text-xs font-semibold hover:text-amber-300 cursor-pointer transition-colors leading-snug line-clamp-2 ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-100'
                      }`}
                    >
                      {t.title}
                    </h4>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                      <span>Est: {t.estimatedHours} hours</span>
                      <button
                        onClick={() => onSelectTopic(t.id)}
                        className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-0.5"
                      >
                        <span>Study 12 Steps</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
