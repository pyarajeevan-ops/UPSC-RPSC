import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Info,
  Calendar,
  CheckCircle2,
  PieChart,
  Flame,
} from 'lucide-react';
import { DayStudyLog, UserProfile } from '../types';

interface WeeklyPerformanceReportProps {
  userProfile: UserProfile;
  dayLogs: DayStudyLog[];
}

export const WeeklyPerformanceReport: React.FC<WeeklyPerformanceReportProps> = ({
  userProfile,
  dayLogs,
}) => {
  const [viewMode, setViewMode] = useState<'stacked-hours' | 'normalized-percentage'>('stacked-hours');
  const dailyTarget = userProfile.studyHours || 8;

  // Process last 7 days data
  const chartData = dayLogs.map((log) => {
    const common = log.loggedCommonHours;
    const rajasthan = log.loggedRajasthanHours;
    const test = log.loggedTestHours;
    const total = Number((common + rajasthan + test).toFixed(1));

    const commonPercent = total > 0 ? Number(((common / total) * 100).toFixed(1)) : 0;
    const rajasthanPercent = total > 0 ? Number(((rajasthan / total) * 100).toFixed(1)) : 0;
    const testPercent = total > 0 ? Number(((test / total) * 100).toFixed(1)) : 0;

    return {
      day: log.dayLabel,
      date: log.date,
      upscCore: common,
      rpscCore: rajasthan,
      testPractice: test,
      totalHours: total,
      targetHours: dailyTarget,
      // For normalized 100% view
      upscPercent: commonPercent,
      rpscPercent: rajasthanPercent,
      testPercent: testPercent,
    };
  });

  // Calculate 7-day totals
  const totalWeeklyHours = Number(
    dayLogs
      .reduce(
        (sum, log) => sum + log.loggedCommonHours + log.loggedRajasthanHours + log.loggedTestHours,
        0
      )
      .toFixed(1)
  );

  const totalUpscHours = Number(
    dayLogs.reduce((sum, log) => sum + log.loggedCommonHours, 0).toFixed(1)
  );

  const totalRpscHours = Number(
    dayLogs.reduce((sum, log) => sum + log.loggedRajasthanHours, 0).toFixed(1)
  );

  const totalTestHours = Number(
    dayLogs.reduce((sum, log) => sum + log.loggedTestHours, 0).toFixed(1)
  );

  const upscShare = totalWeeklyHours > 0 ? Math.round((totalUpscHours / totalWeeklyHours) * 100) : 0;
  const rpscShare = totalWeeklyHours > 0 ? Math.round((totalRpscHours / totalWeeklyHours) * 100) : 0;
  const testShare = totalWeeklyHours > 0 ? Math.round((totalTestHours / totalWeeklyHours) * 100) : 0;

  // Strategic Alignment Score (how closely candidate matches 70:20:10)
  const diffUpsc = Math.abs(upscShare - 70);
  const diffRpsc = Math.abs(rpscShare - 20);
  const diffTest = Math.abs(testShare - 10);
  const alignmentScore = totalWeeklyHours > 0
    ? Math.max(0, 100 - (diffUpsc + diffRpsc + diffTest) * 2)
    : 100;

  // Custom Chart Tooltip
  interface TooltipPayloadItem {
    name?: string;
    value?: number;
    color?: string;
    dataKey?: string;
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
  }

  const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentDayData = chartData.find((d) => d.day === label);
      if (!currentDayData) return null;

      return (
        <div className="bg-slate-950/95 border border-slate-700/80 p-3.5 rounded-xl shadow-2xl text-xs backdrop-blur-md min-w-[210px] space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-100 font-serif text-sm">
              {label} ({currentDayData.date})
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                currentDayData.totalHours >= dailyTarget
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
              }`}
            >
              {currentDayData.totalHours}h / {dailyTarget}h
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>UPSC Core (70%):</span>
              </span>
              <span className="font-mono font-semibold text-slate-100">
                {currentDayData.upscCore}h ({currentDayData.upscPercent}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>RPSC Core (20%):</span>
              </span>
              <span className="font-mono font-semibold text-slate-100">
                {currentDayData.rpscCore}h ({currentDayData.rpscPercent}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Test & Recall (10%):</span>
              </span>
              <span className="font-mono font-semibold text-slate-100">
                {currentDayData.testPractice}h ({currentDayData.testPercent}%)
              </span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Cumulative:</span>
            <span className="font-bold text-slate-200 font-mono">{currentDayData.totalHours} hrs</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Header bar with View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-100">
                Weekly Performance Report
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Last 7 Days
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Distribution of study hours across UPSC Conceptual Core vs RPSC Rajasthan Core & Mocks
            </p>
          </div>
        </div>

        {/* View Switcher: Absolute Stacked Hours vs % Distribution */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('stacked-hours')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              viewMode === 'stacked-hours'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Stacked Hours (hrs)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('normalized-percentage')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              viewMode === 'normalized-percentage'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            70:20:10 Share (%)
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Weekly Hours */}
        <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] font-medium text-slate-400 block mb-1">
            Total Weekly Output
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-slate-100 tabular-nums">
              {totalWeeklyHours}
            </span>
            <span className="text-xs text-slate-400">hrs</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Avg {(totalWeeklyHours / (dayLogs.length || 7)).toFixed(1)}h/day
          </span>
        </div>

        {/* UPSC Common Core */}
        <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-amber-400">UPSC Core</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">
              Target 70%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-amber-300 tabular-nums">
              {totalUpscHours}
            </span>
            <span className="text-xs text-slate-400">h ({upscShare}%)</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (upscShare / 70) * 100)}%` }}
            />
          </div>
        </div>

        {/* RPSC Rajasthan Layer */}
        <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-emerald-400">RPSC Core</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
              Target 20%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-400 tabular-nums">
              {totalRpscHours}
            </span>
            <span className="text-xs text-slate-400">h ({rpscShare}%)</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (rpscShare / 20) * 100)}%` }}
            />
          </div>
        </div>

        {/* 70-20-10 Ratio Alignment Score */}
        <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-300">70:20:10 Balance</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-400 tabular-nums">
              {alignmentScore}%
            </span>
            <span className="text-xs text-slate-400">Aligned</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block truncate">
            {alignmentScore >= 90
              ? 'Optimal Prelims Equilibrium'
              : alignmentScore >= 75
              ? 'Sound balance, refine mocks'
              : 'Re-align towards 70% core'}
          </span>
        </div>
      </div>

      {/* Main Stacked Area Chart */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>
              {viewMode === 'stacked-hours'
                ? 'Daily Cumulative Hours Distribution (Stacked)'
                : 'Proportional Share Across Preparation Layers (100% Stacked)'}
            </span>
          </span>

          {/* Legend indicator */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="w-3 h-2 rounded bg-amber-400"></span>
              <span>UPSC Common Core (70%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span className="w-3 h-2 rounded bg-emerald-400"></span>
              <span>RPSC Rajasthan Core (20%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-300">
              <span className="w-3 h-2 rounded bg-indigo-400"></span>
              <span>Mock & Recall (10%)</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
              <defs>
                {/* Gradient for UPSC Core */}
                <linearGradient id="colorUpscWeekly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>

                {/* Gradient for RPSC Core */}
                <linearGradient id="colorRpscWeekly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>

                {/* Gradient for Test Practice */}
                <linearGradient id="colorTestWeekly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />

              <XAxis
                dataKey="day"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
              />

              <YAxis
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
                unit={viewMode === 'stacked-hours' ? 'h' : '%'}
                domain={viewMode === 'stacked-hours' ? [0, 'dataMax + 2'] : [0, 100]}
              />

              <Tooltip content={<CustomChartTooltip />} />

              {viewMode === 'stacked-hours' && (
                <ReferenceLine
                  y={dailyTarget}
                  stroke="#fbbf24"
                  strokeDasharray="4 4"
                  label={{
                    value: `Daily Target: ${dailyTarget}h`,
                    fill: '#fbbf24',
                    fontSize: 10,
                    position: 'insideTopRight',
                  }}
                />
              )}

              {/* Area 1: UPSC Core */}
              <Area
                type="monotone"
                dataKey={viewMode === 'stacked-hours' ? 'upscCore' : 'upscPercent'}
                stackId="weekly-stack"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUpscWeekly)"
                name="UPSC Common Core"
              />

              {/* Area 2: RPSC Core */}
              <Area
                type="monotone"
                dataKey={viewMode === 'stacked-hours' ? 'rpscCore' : 'rpscPercent'}
                stackId="weekly-stack"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRpscWeekly)"
                name="RPSC Rajasthan Core"
              />

              {/* Area 3: Test & Recall Practice */}
              <Area
                type="monotone"
                dataKey={viewMode === 'stacked-hours' ? 'testPractice' : 'testPercent'}
                stackId="weekly-stack"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTestWeekly)"
                name="Test & Recall"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategic Takeaway Note */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start gap-3 text-slate-300">
        <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-slate-200">
            Margdarshak Dual-Preparation Strategy Check
          </h4>
          <p className="text-slate-400 leading-relaxed">
            Your 7-day study distribution reflects a{' '}
            <strong className="text-amber-300">{upscShare}% UPSC Core</strong>,{' '}
            <strong className="text-emerald-300">{rpscShare}% RPSC Layer</strong>, and{' '}
            <strong className="text-indigo-300">{testShare}% Testing & Error Logging</strong> profile.
            This adheres closely to the Margdarshak 70:20:10 architecture, ensuring conceptual parity in
            Polity, Geography, and History while systematically committing high-yield Rajasthan factual tables to long-term memory.
          </p>
        </div>
      </div>
    </div>
  );
};
