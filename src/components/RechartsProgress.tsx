import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts';
import { DayStudyLog, TopicLesson, UserProfile } from '../types';
import { Clock, BookOpen, Layers, CheckCircle2, Award } from 'lucide-react';

interface RechartsProgressProps {
  userProfile: UserProfile;
  dayLogs: DayStudyLog[];
  topics: TopicLesson[];
  completedTopicIds: string[];
}

export const RechartsProgress: React.FC<RechartsProgressProps> = ({
  userProfile,
  dayLogs,
  topics,
  completedTopicIds,
}) => {
  const dailyTarget = userProfile.studyHours || 8;

  // 1. Data for Study Hours Line Graph
  const hoursChartData = dayLogs.map((log) => {
    const totalActual = Number(
      (log.loggedCommonHours + log.loggedRajasthanHours + log.loggedTestHours).toFixed(1)
    );
    return {
      day: log.dayLabel,
      date: log.date,
      actualHours: totalActual,
      targetHours: dailyTarget,
      commonHours: log.loggedCommonHours,
      rajasthanHours: log.loggedRajasthanHours,
      testHours: log.loggedTestHours,
    };
  });

  // 2. Data for Syllabus Topics Progress (UPSC vs RPSC modules breakdown)
  // Standard Prelims Core Modules breakdown across UPSC & RPSC
  const modulesDefinition = [
    {
      moduleKey: 'Polity & Admin',
      moduleName: 'Polity & Governance',
      upscTopics: ['panchayati-raj-local-gov', 'governor-and-state-executive'],
      rpscTopics: ['panchayati-raj-local-gov', 'governor-and-state-executive'],
    },
    {
      moduleKey: 'Geography',
      moduleName: 'Geography & Environment',
      upscTopics: ['rajasthan-physiography-and-drainage'],
      rpscTopics: ['rajasthan-physiography-and-drainage'],
    },
    {
      moduleKey: 'History & Heritage',
      moduleName: 'History & Culture',
      upscTopics: ['ancient-civilizations-kalibangan-ganeshwar'],
      rpscTopics: ['ancient-civilizations-kalibangan-ganeshwar'],
    },
    {
      moduleKey: 'Economy & Survey',
      moduleName: 'Economy & Development',
      upscTopics: ['rajasthan-minerals-and-economic-survey'],
      rpscTopics: ['rajasthan-minerals-and-economic-survey'],
    },
  ];

  // Calculate percentage of syllabus topics completed for UPSC and RPSC modules separately
  const syllabusChartData = modulesDefinition.map((mod) => {
    // UPSC topics completed
    const upscTotal = mod.upscTopics.length;
    const upscCompleted = mod.upscTopics.filter((id) => completedTopicIds.includes(id)).length;
    const upscPercent = upscTotal > 0 ? Math.round((upscCompleted / upscTotal) * 100) : 0;

    // RPSC topics completed
    const rpscTotal = mod.rpscTopics.length;
    const rpscCompleted = mod.rpscTopics.filter((id) => completedTopicIds.includes(id)).length;
    const rpscPercent = rpscTotal > 0 ? Math.round((rpscCompleted / rpscTotal) * 100) : 0;

    return {
      name: mod.moduleKey,
      fullName: mod.moduleName,
      'UPSC CSE %': upscPercent,
      'RPSC RAS %': rpscPercent,
      completedUpsc: upscCompleted,
      totalUpsc: upscTotal,
      completedRpsc: rpscCompleted,
      totalRpsc: rpscTotal,
    };
  });

  // Calculate overall summary completion
  const upscAllTopicIds = topics.filter((t) => t.tags.includes('COMMON') || t.tags.includes('UPSC EXTRA')).map(t => t.id);
  const upscCompletedAll = upscAllTopicIds.filter((id) => completedTopicIds.includes(id)).length;
  const upscOverallPercent = upscAllTopicIds.length > 0 ? Math.round((upscCompletedAll / upscAllTopicIds.length) * 100) : 0;

  const rpscAllTopicIds = topics.filter((t) => t.tags.includes('COMMON') || t.tags.includes('RPSC EXTRA')).map(t => t.id);
  const rpscCompletedAll = rpscAllTopicIds.filter((id) => completedTopicIds.includes(id)).length;
  const rpscOverallPercent = rpscAllTopicIds.length > 0 ? Math.round((rpscCompletedAll / rpscAllTopicIds.length) * 100) : 0;

  // Custom Tooltip for Hours Line Graph
  const CustomHoursTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isTargetMet = data.actualHours >= data.targetHours;
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
            <span>{data.day} ({data.date})</span>
            <span className={isTargetMet ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {isTargetMet ? 'Goal Met' : 'Under Target'}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Logged Hours:
            </span>
            <span className="font-bold text-slate-100 tabular-nums">{data.actualHours} hrs</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              Daily Target:
            </span>
            <span className="font-bold text-slate-300 tabular-nums">{data.targetHours} hrs</span>
          </div>
          <div className="pt-1 border-t border-slate-900 text-[11px] text-slate-400 grid grid-cols-3 gap-2">
            <div>Core: {data.commonHours}h</div>
            <div>Raj: {data.rajasthanHours}h</div>
            <div>Test: {data.testHours}h</div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Syllabus Bar Chart
  const CustomSyllabusTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-xl text-xs space-y-2 backdrop-blur-md">
          <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1">
            {data.fullName}
          </div>
          <div className="flex items-center justify-between gap-4 text-amber-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
              UPSC CSE Progress:
            </span>
            <span className="font-bold tabular-nums">
              {data['UPSC CSE %']}% ({data.completedUpsc}/{data.totalUpsc} units)
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-emerald-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />
              RPSC RAS Progress:
            </span>
            <span className="font-bold tabular-nums">
              {data['RPSC RAS %']}% ({data.completedRpsc}/{data.totalRpsc} units)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 2-Chart Grid: Left is Line Chart (Hours vs Target); Right is Bar Chart (UPSC vs RPSC Syllabus) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Line Graph of Total Daily Study Hours vs Target */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-100 font-serif">
                  Daily Study Hours vs. Target (Line Chart)
                </h3>
                <span className="text-[11px] text-slate-400">
                  Target goal: {dailyTarget}h/day · Past 7 recorded days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-400 rounded-full inline-block" />
                <span className="text-slate-300 font-medium text-[11px]">Logged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-rose-400 border-b border-dashed inline-block" />
                <span className="text-slate-400 font-medium text-[11px]">Target ({dailyTarget}h)</span>
              </div>
            </div>
          </div>

          {/* Recharts LineChart */}
          <div className="h-60 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hoursChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  domain={[0, Math.max(12, dailyTarget + 2)]}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `${val}h`}
                />
                <Tooltip content={<CustomHoursTooltip />} />
                <ReferenceLine
                  y={dailyTarget}
                  stroke="#f43f5e"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: `Goal ${dailyTarget}h`,
                    fill: '#fda4af',
                    fontSize: 10,
                    position: 'insideTopRight',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="actualHours"
                  name="Logged Study Hours"
                  stroke="#fbbf24"
                  strokeWidth={2.5}
                  dot={{ fill: '#fbbf24', stroke: '#1e293b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>
              Cumulative: <strong className="text-slate-200">
                {hoursChartData.reduce((acc, curr) => acc + curr.actualHours, 0).toFixed(1)} hrs
              </strong>
            </span>
            <span className="text-emerald-400 font-medium">
              Average: {(hoursChartData.reduce((acc, curr) => acc + curr.actualHours, 0) / hoursChartData.length).toFixed(1)} hrs/day
            </span>
          </div>
        </div>

        {/* CHART 2: Bar Chart showing Syllabus Completion for UPSC and RPSC modules separately */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-100 font-serif">
                  Syllabus Completion by Module (Bar Chart)
                </h3>
                <span className="text-[11px] text-slate-400">
                  Separately evaluated for UPSC CSE vs. RPSC RAS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
                <span className="text-amber-300 font-medium text-[11px]">UPSC ({upscOverallPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />
                <span className="text-emerald-300 font-medium text-[11px]">RPSC ({rpscOverallPercent}%)</span>
              </div>
            </div>
          </div>

          {/* Recharts BarChart */}
          <div className="h-60 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={syllabusChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomSyllabusTooltip />} />
                <Bar
                  dataKey="UPSC CSE %"
                  fill="#fbbf24"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="RPSC RAS %"
                  fill="#34d399"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>
              UPSC Core: <strong className="text-amber-300">{upscOverallPercent}% done</strong>
            </span>
            <span>
              RPSC State Layer: <strong className="text-emerald-300">{rpscOverallPercent}% done</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
