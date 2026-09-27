import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Volume2,
  VolumeX,
  Target,
  Sparkles,
  BookOpen,
  ArrowRight,
  Maximize2,
  Minimize2,
  ShieldAlert,
} from 'lucide-react';
import { TopicLesson, DayStudyLog, UserProfile } from '../types';
import { SYLLABUS_TOPICS } from '../data/mockSyllabus';

interface FocusTimerProps {
  userProfile: UserProfile;
  dayLogs: DayStudyLog[];
  onUpdateTodayLog: (common: number, rajasthan: number, test: number) => void;
  onSelectTopic?: (topicId: string) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({
  userProfile,
  dayLogs,
  onUpdateTodayLog,
  onSelectTopic,
}) => {
  // Preset durations in minutes
  const PRESET_DURATIONS = [
    { label: '25m Pomodoro', minutes: 25 },
    { label: '45m Core Block', minutes: 45 },
    { label: '60m Deep Dive', minutes: 60 },
    { label: '90m Masterclass', minutes: 90 },
    { label: '120m Prelims Mock', minutes: 120 },
  ];

  // Selected topic
  const [selectedTopicId, setSelectedTopicId] = useState<string>(SYLLABUS_TOPICS[0]?.id || 'custom');
  const [customTopicName, setCustomTopicName] = useState<string>('');
  const [targetLayer, setTargetLayer] = useState<'Common Core (70%)' | 'Rajasthan Layer (20%)' | 'Test & Error Analysis (10%)'>('Common Core (70%)');

  // Timer states
  const [plannedMinutes, setPlannedMinutes] = useState<number>(45);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(45 * 60);
  const [actualSecondsSpent, setActualSecondsSpent] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [shortSessionWarning, setShortSessionWarning] = useState<boolean>(false);
  const [lastLoggedSession, setLastLoggedSession] = useState<{
    topic: string;
    plannedMinutes: number;
    actualMinutes: number;
    hoursCredited: number;
    layer: string;
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Derive active topic info
  const activeSyllabusTopic = SYLLABUS_TOPICS.find((t) => t.id === selectedTopicId);
  const displayTopicTitle = selectedTopicId === 'custom'
    ? (customTopicName.trim() || 'Custom Study Session')
    : (activeSyllabusTopic?.title || 'Selected Topic');

  // Sync layer when syllabus topic changes
  useEffect(() => {
    if (activeSyllabusTopic) {
      if (activeSyllabusTopic.tags.includes('RPSC EXTRA') && !activeSyllabusTopic.tags.includes('COMMON')) {
        setTargetLayer('Rajasthan Layer (20%)');
      } else if (activeSyllabusTopic.subject.toLowerCase().includes('rajasthan')) {
        setTargetLayer('Rajasthan Layer (20%)');
      } else {
        setTargetLayer('Common Core (70%)');
      }
    }
  }, [selectedTopicId, activeSyllabusTopic]);

  // Audio synthesizer for completion chime
  const playFocusChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Soft bell chime sequence (C5 -> G5 -> C6)
      const freqs = [523.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);
        gain.gain.setValueAtTime(0.08, now + idx * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.18 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.6);
      });
    } catch {
      // AudioContext blocked before interaction
    }
  };

  // Timer Tick Hook
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setActualSecondsSpent((prev) => prev + 1);
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setIsCompleted(true);
            playFocusChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  // Controls
  const handleStartPause = () => {
    if (remainingSeconds === 0) {
      // Restart
      setRemainingSeconds(plannedMinutes * 60);
      setActualSecondsSpent(0);
      setIsCompleted(false);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(plannedMinutes * 60);
    setActualSecondsSpent(0);
    setIsCompleted(false);
  };

  const handleSetPlannedMinutes = (mins: number) => {
    if (isRunning) return;
    setPlannedMinutes(mins);
    setRemainingSeconds(mins * 60);
    setActualSecondsSpent(0);
    setIsCompleted(false);
  };

  // Finish and Log Study Hours into Today's Log
  const handleFinishAndLog = () => {
    setIsRunning(false);
    if (actualSecondsSpent < 60) {
      // Minimum 1 min to log
      setShortSessionWarning(true);
      setTimeout(() => setShortSessionWarning(false), 4000);
      return;
    }
    setShortSessionWarning(false);

    // Convert seconds to hours with 1 decimal place (minimum 0.1h)
    const hoursToCredit = Math.max(0.1, Number((actualSecondsSpent / 3600).toFixed(1)));

    const todayLog = dayLogs[dayLogs.length - 1] || {
      date: new Date().toISOString().split('T')[0],
      dayLabel: 'Today',
      loggedCommonHours: 4.5,
      loggedRajasthanHours: 1.5,
      loggedTestHours: 0.8,
      completedTopicIds: [],
    };

    let newCommon = todayLog.loggedCommonHours;
    let newRajasthan = todayLog.loggedRajasthanHours;
    let newTest = todayLog.loggedTestHours;

    if (targetLayer === 'Common Core (70%)') {
      newCommon = Number((newCommon + hoursToCredit).toFixed(1));
    } else if (targetLayer === 'Rajasthan Layer (20%)') {
      newRajasthan = Number((newRajasthan + hoursToCredit).toFixed(1));
    } else {
      newTest = Number((newTest + hoursToCredit).toFixed(1));
    }

    onUpdateTodayLog(newCommon, newRajasthan, newTest);

    setLastLoggedSession({
      topic: displayTopicTitle,
      plannedMinutes,
      actualMinutes: Math.round(actualSecondsSpent / 60),
      hoursCredited: hoursToCredit,
      layer: targetLayer,
    });

    // Reset for next session
    setIsCompleted(false);
    setRemainingSeconds(plannedMinutes * 60);
    setActualSecondsSpent(0);
  };

  // Format Time Helper
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Circular gauge calculations
  const totalPlannedSeconds = plannedMinutes * 60;
  const progressRatio = totalPlannedSeconds > 0
    ? Math.min(1, actualSecondsSpent / totalPlannedSeconds)
    : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const actualMinutes = Math.floor(actualSecondsSpent / 60);
  const adherencePercent = Math.min(150, Math.round((actualSecondsSpent / (totalPlannedSeconds || 1)) * 100));

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 shadow-xl ${
        isZenMode
          ? 'fixed inset-4 sm:inset-10 z-50 bg-slate-950/98 border-amber-500/50 backdrop-blur-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto'
          : 'bg-slate-900/95 border-slate-800 p-6 sm:p-7'
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-100">
                Deep Work Focus Timer
              </h2>
              {isRunning && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Active Focus
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Track actual deep-study seconds against planned session targets for UPSC & RPSC topics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title={soundEnabled ? 'Chime Enabled' : 'Chime Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsZenMode(!isZenMode)}
            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title={isZenMode ? 'Exit Zen View' : 'Distraction-Free Zen View'}
          >
            {isZenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">{isZenMode ? 'Exit Zen' : 'Zen Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 items-center">
        {/* Left: Interactive Circular Timer Clock */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* SVG Circle Gauge */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#1e293b"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke={isCompleted ? '#34d399' : isRunning ? '#fbbf24' : '#64748b'}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Inner Content Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight tabular-nums">
                {formatTime(remainingSeconds)}
              </span>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <span>Spent:</span>
                <span className="font-semibold text-amber-300 font-mono">
                  {formatTime(actualSecondsSpent)}
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400 font-mono">{plannedMinutes}m</span>
              </div>

              <div className="mt-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : isRunning
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? 'Target Reached!' : `${adherencePercent}% Adherence`}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Controls Strip */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={handleStartPause}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Pause Deep Work' : remainingSeconds === 0 ? 'Restart Session' : 'Start Focus'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {actualSecondsSpent >= 60 && (
              <button
                type="button"
                onClick={handleFinishAndLog}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-500/40 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Credit actual minutes to daily dashboard tally"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Log Actual Time</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Topic Selection, Planned Duration & Session Config */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Target Banner */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>Target Study Topic</span>
            </label>

            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              disabled={isRunning}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer disabled:opacity-60"
            >
              <optgroup label="Syllabus Masterclasses">
                {SYLLABUS_TOPICS.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </optgroup>
              <option value="custom">-- Custom Study Topic --</option>
            </select>

            {selectedTopicId === 'custom' && (
              <input
                type="text"
                placeholder="Enter custom focus topic (e.g. Modern History Tribal Uprisings)"
                value={customTopicName}
                onChange={(e) => setCustomTopicName(e.target.value)}
                disabled={isRunning}
                className="mt-2 w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            )}

            {/* Target Layer Selector */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Credit To Layer:</span>
              <div className="flex items-center gap-1">
                {(['Common Core (70%)', 'Rajasthan Layer (20%)', 'Test & Error Analysis (10%)'] as const).map(
                  (layer) => (
                    <button
                      key={layer}
                      type="button"
                      disabled={isRunning}
                      onClick={() => setTargetLayer(layer)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-60 ${
                        targetLayer === layer
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      {layer.split(' ')[0]}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Planned Session Duration Presets */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Planned Session Duration</span>
              </label>
              <span className="text-xs font-bold font-serif text-amber-300 tabular-nums">
                {plannedMinutes} Minutes
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {PRESET_DURATIONS.map((preset) => (
                <button
                  key={preset.minutes}
                  type="button"
                  disabled={isRunning}
                  onClick={() => handleSetPlannedMinutes(preset.minutes)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium text-center transition-all cursor-pointer disabled:opacity-60 ${
                    plannedMinutes === preset.minutes
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {preset.minutes}m
                </button>
              ))}
            </div>

            {/* Custom slider */}
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={5}
                  max={180}
                  step={5}
                  value={plannedMinutes}
                  disabled={isRunning}
                  onChange={(e) => handleSetPlannedMinutes(Number(e.target.value))}
                  className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-60"
                />
                <span className="text-[11px] text-slate-400 font-mono w-10 text-right">
                  {plannedMinutes}m
                </span>
              </div>
            </div>
          </div>

          {/* Session Metrics & Link to 12-Step Lesson */}
          {activeSyllabusTopic && onSelectTopic && selectedTopicId !== 'custom' && (
            <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 px-3.5 py-2.5 rounded-lg text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[200px] sm:max-w-xs">{activeSyllabusTopic.title}</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectTopic(activeSyllabusTopic.id)}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer shrink-0 ml-2"
              >
                <span>Read Notes</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Short session warning banner */}
          {shortSessionWarning && (
            <div className="p-3 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Session duration too short (minimum 1 minute required) to log into daily quota. Continue focusing!
                </span>
              </div>
            </div>
          )}

          {/* Last Logged Feedback Toast / Pill */}
          {lastLoggedSession && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Credited <strong>+{lastLoggedSession.hoursCredited}h</strong> ({lastLoggedSession.actualMinutes}m actual) to{' '}
                  <span className="text-slate-200 font-medium">{lastLoggedSession.layer}</span>
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Quota Updated</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
