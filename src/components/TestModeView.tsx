import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  BookmarkCheck,
  ChevronRight,
  Filter,
  BarChart3,
  Flag,
  Sparkles,
  Calendar
} from 'lucide-react';
import { PracticeQuestion, ErrorCategory, ErrorLogEntry, LanguageMedium } from '../types';
import { COMPREHENSIVE_QUESTIONS_BANK } from '../data/questionsBank';

interface TestModeViewProps {
  onAddMistake: (mistake: ErrorLogEntry) => void;
  language: LanguageMedium;
}

export const TestModeView: React.FC<TestModeViewProps> = ({ onAddMistake, language }) => {
  // Test Setup States
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'UPSC' | 'RPSC' | 'MIXED'>('MIXED');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(10);

  // Active Test States
  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [guessedQuestions, setGuessedQuestions] = useState<Record<string, boolean>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600);

  // Post Test Review & Error Tagging States
  const [taggedErrors, setTaggedErrors] = useState<Record<string, ErrorCategory>>({});
  const [savedMistakes, setSavedMistakes] = useState<Record<string, boolean>>({});
  const [scheduledCalendar, setScheduledCalendar] = useState<boolean>(false);
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  const handleScheduleMistakeAutopsy = async (incorrectCount: number) => {
    try {
      setScheduledCalendar(true);
      const res = await fetch('/api/calendar/auto-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mistake-review',
          count: incorrectCount || 1,
          examTag: selectedMode,
          subject: `${selectedMode} Test Diagnostics`,
        }),
      });
      if (res.ok) {
        setCalendarToast('Error Autopsy & 3-Day Test Retake scheduled in Study Calendar!');
        setTimeout(() => setCalendarToast(null), 4500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!testStarted || testFinished) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTestFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testFinished]);

  const handleStartTest = () => {
    let pool = [...COMPREHENSIVE_QUESTIONS_BANK];
    if (selectedMode !== 'MIXED') {
      pool = pool.filter((q) => q.examType === selectedMode);
    }
    // If pool is small, duplicate or take all
    const questions = pool.slice(0, questionCount);
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setGuessedQuestions({});
    setFlaggedQuestions({});
    setTaggedErrors({});
    setSavedMistakes({});
    setTimeLeftSeconds(timeLimitMinutes * 60);
    setTestStarted(true);
    setTestFinished(false);
  };

  const handleSelectOption = (letter: string) => {
    const q = activeQuestions[currentIndex];
    setUserAnswers((prev) => ({ ...prev, [q.id]: letter }));
  };

  const toggleGuess = (qId: string) => {
    setGuessedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleFinishTest = () => {
    setTestFinished(true);
  };

  // Performance calculations
  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let rpscECount = 0;

    activeQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        unattempted++;
      } else if (ans === 'E' && selectedMode === 'RPSC') {
        rpscECount++;
      } else if (ans === q.correctOption) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Official scoring formulas
    // UPSC: +2.0, -0.66 per wrong
    // RPSC: +1.33, -0.44 per wrong
    let score = 0;
    if (selectedMode === 'UPSC') {
      score = correct * 2.0 - incorrect * 0.66;
    } else if (selectedMode === 'RPSC') {
      score = correct * 1.33 - incorrect * 0.44;
    } else {
      score = correct * 2.0 - incorrect * 0.66;
    }

    const accuracy = correct + incorrect > 0 ? (correct / (correct + incorrect)) * 100 : 0;

    return {
      correct,
      incorrect,
      unattempted,
      rpscECount,
      score: Math.max(0, score).toFixed(2),
      accuracy: accuracy.toFixed(1),
    };
  };

  const handleSaveToErrorLog = (q: PracticeQuestion, category: ErrorCategory) => {
    const entry: ErrorLogEntry = {
      id: `err-${Date.now()}-${q.id}`,
      questionId: q.id,
      questionText: q.text,
      selectedOption: userAnswers[q.id] || 'Unattempted',
      correctOption: q.correctOption,
      errorCategory: category,
      topicTitle: q.subject,
      subject: q.subject,
      timestamp: new Date().toISOString(),
      trapIdentified: q.trap,
      mnemonic: q.mnemonic,
    };
    onAddMistake(entry);
    setSavedMistakes((prev) => ({ ...prev, [q.id]: true }));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Pre-Test Setup Screen */}
      {!testStarted && (
        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-100">
              Official Pattern Prelims Simulator
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Simulate actual examination pressure with strict negative marking rules and 5th-option OMR compliance
            </p>
          </div>

          {/* Mode Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Select Examination Pattern
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedMode('UPSC')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedMode === 'UPSC'
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs">UPSC CSE Pattern</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  4 options · -0.66 penalty · Analytical elimination
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('RPSC')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedMode === 'RPSC'
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs">RPSC RAS Pattern</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  5 options (Option E mandatory if skipping) · Factual
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('MIXED')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedMode === 'MIXED'
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs">Integrated Dual Mode</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  70% Common Core + 20% Rajasthan Layer
                </div>
              </button>
            </div>
          </div>

          {/* Question Count & Time Limit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value={3}>3 Questions (Micro-Quiz)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={7}>7 Questions (Full Section)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Time Limit
              </label>
              <select
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value={5}>5 Minutes (Sprint)</option>
                <option value={10}>10 Minutes (Standard)</option>
                <option value={15}>15 Minutes (Relaxed)</option>
              </select>
            </div>
          </div>

          {/* RPSC 5th Option Notice */}
          {selectedMode === 'RPSC' && (
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block">RPSC 5th Option Rule Notice:</strong>
                If you do not wish to attempt a question, you must darken option \'E\' (Question not attempted). Leaving all 5 options blank attracts 1/3rd negative marking in the actual exam!
              </div>
            </div>
          )}

          <button
            onClick={handleStartTest}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg cursor-pointer"
          >
            Start Timed Examination
          </button>
        </div>
      )}

      {/* 2. Active Test Examination Screen */}
      {testStarted && !testFinished && activeQuestions.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Top Bar: Timer, Question Counter & Controls */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {selectedMode} Mode
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-300">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
            </div>

            {/* Countdown Clock */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold ${
                timeLeftSeconds < 120
                  ? 'bg-rose-950/60 text-rose-400 border border-rose-600/40 animate-pulse'
                  : 'bg-slate-950 text-amber-300 border border-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>

            {/* End Exam Early button */}
            <button
              onClick={handleFinishTest}
              className="text-xs px-3 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-600/40 rounded-lg transition-colors cursor-pointer"
            >
              Submit Paper
            </button>
          </div>

          {/* Question Body */}
          {(() => {
            const currentQ = activeQuestions[currentIndex];
            const currentAnswer = userAnswers[currentQ.id];
            const isGuessed = !!guessedQuestions[currentQ.id];
            const isFlagged = !!flaggedQuestions[currentQ.id];

            return (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span className="font-semibold text-amber-400">{currentQ.subject}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleGuess(currentQ.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                        isGuessed
                          ? 'bg-purple-950/50 border-purple-500 text-purple-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isGuessed ? '★ Marked as 50:50 Guess' : 'Mark as Guess'}
                    </button>
                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`p-1.5 rounded-md border transition-colors ${
                        isFlagged
                          ? 'bg-amber-950/50 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed whitespace-pre-line">
                  {currentQ.text}
                </div>

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((optionText, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = currentAnswer === letter;

                    return (
                      <button
                        key={letter}
                        onClick={() => handleSelectOption(letter)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="leading-snug pt-0.5">{optionText}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls: Prev, Palette, Next */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                  >
                    Previous
                  </button>

                  {/* Question Palette mini dots */}
                  <div className="flex items-center gap-1.5">
                    {activeQuestions.map((q, idx) => {
                      const answered = !!userAnswers[q.id];
                      const isCurrent = idx === currentIndex;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-6 h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'ring-2 ring-amber-400 bg-amber-500 text-slate-950'
                              : answered
                              ? 'bg-emerald-950 border border-emerald-600/60 text-emerald-300'
                              : 'bg-slate-950 border border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {currentIndex < activeQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishTest}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 3. Post-Test Detailed Evaluation & Error Log Screen */}
      {testFinished && (
        <div className="max-w-4xl mx-auto space-y-6">
          {(() => {
            const results = calculateResults();

            return (
              <>
                {/* Score Banner */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Official Exam Performance Report
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                        Evaluation & Diagnostic Breakdown
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleScheduleMistakeAutopsy(results.incorrect)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                          scheduledCalendar
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : 'bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border-purple-500/30'
                        }`}
                        title="Schedule Error Autopsy for tomorrow and 3-Day Test Retake in Study Calendar"
                      >
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{scheduledCalendar ? 'Autopsy Scheduled ✓' : 'Schedule Error Autopsy in Calendar'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setTestStarted(false);
                          setTestFinished(false);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Take Another Test</span>
                      </button>
                    </div>
                  </div>

                  {calendarToast && (
                    <div className="mt-4 p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl text-xs text-purple-200 flex items-center gap-2 animate-fade-in">
                      <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{calendarToast}</span>
                    </div>
                  )}

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Net Marks</div>
                      <div className="text-2xl font-bold text-amber-400 font-serif mt-0.5 tabular-nums">
                        {results.score}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">With Negative Marking</div>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Accuracy</div>
                      <div className="text-2xl font-bold text-emerald-400 font-serif mt-0.5 tabular-nums">
                        {results.accuracy}%
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Attempted Precision</div>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Correct / Wrong</div>
                      <div className="text-2xl font-bold text-slate-200 font-serif mt-0.5 tabular-nums">
                        <span className="text-emerald-400">{results.correct}</span> /{' '}
                        <span className="text-rose-400">{results.incorrect}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {results.unattempted} Unattempted
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Option E Count</div>
                      <div className="text-2xl font-bold text-slate-300 font-serif mt-0.5 tabular-nums">
                        {results.rpscECount}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">RPSC Rule Compliant</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Question Review & 8-Point Error Classification */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <BookmarkCheck className="w-5 h-5 text-amber-400" />
                      <span>Question Review & Error Logging</span>
                    </h3>
                    <span className="text-xs text-slate-400">
                      Classify each mistake into one of the 8 error categories
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeQuestions.map((q, idx) => {
                      const userAns = userAnswers[q.id];
                      const isCorrect = userAns === q.correctOption;
                      const isGuess = !!guessedQuestions[q.id];
                      const selectedCategory = taggedErrors[q.id] || 'Factual error';
                      const isSaved = !!savedMistakes[q.id];

                      return (
                        <div
                          key={q.id}
                          className={`p-6 rounded-2xl border bg-slate-900/90 space-y-4 ${
                            isCorrect
                              ? 'border-emerald-500/40'
                              : 'border-rose-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-amber-400">
                              Q{idx + 1} · {q.subject} ({q.examType})
                            </span>
                            <div className="flex items-center gap-2">
                              {isGuess && (
                                <span className="px-2 py-0.5 bg-purple-950/60 text-purple-300 border border-purple-500/40 rounded text-[11px]">
                                  ★ Guessed
                                </span>
                              )}
                              <span
                                className={`px-2.5 py-0.5 rounded font-bold ${
                                  isCorrect
                                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                                }`}
                              >
                                {isCorrect ? 'Correct (+)' : 'Incorrect (-)'}
                              </span>
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                            {q.text}
                          </div>

                          {/* Options display with results */}
                          <div className="space-y-1.5 text-xs">
                            {q.options.map((opt, oIdx) => {
                              const letter = String.fromCharCode(65 + oIdx);
                              const isUsers = userAns === letter;
                              const isKey = q.correctOption === letter;

                              let style = 'bg-slate-950/60 border-slate-800 text-slate-400';
                              if (isKey) {
                                style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                              } else if (isUsers && !isCorrect) {
                                style = 'bg-rose-950/40 border-rose-500 text-rose-200 font-semibold';
                              }

                              return (
                                <div key={letter} className={`p-2.5 rounded-lg border flex items-center justify-between ${style}`}>
                                  <span>
                                    <strong className="mr-2">{letter}.</strong> {opt}
                                  </span>
                                  {isKey && <span className="text-emerald-400 text-[11px]">Correct Answer</span>}
                                  {isUsers && !isCorrect && (
                                    <span className="text-rose-400 text-[11px]">Your Selection</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Pedagogical Breakdown */}
                          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                            <div>
                              <strong className="text-slate-100">Core Concept: </strong>
                              {q.concept}
                            </div>
                            <div>
                              <strong className="text-rose-400">Examiner Trap Exposed: </strong>
                              {q.trap}
                            </div>
                            <div>
                              <strong className="text-emerald-400">Elimination Strategy: </strong>
                              {q.eliminationTactic}
                            </div>
                            <div className="text-amber-300">
                              <strong>Memory Aid: </strong>
                              {q.mnemonic}
                            </div>
                          </div>

                          {/* Error Classification & Save to Mistake Notebook */}
                          {!isCorrect && (
                            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Error Classification:</span>
                                <select
                                  value={selectedCategory}
                                  onChange={(e) =>
                                    setTaggedErrors((prev) => ({
                                      ...prev,
                                      [q.id]: e.target.value as ErrorCategory,
                                    }))
                                  }
                                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                                >
                                  <option value="Conceptual error">Conceptual error</option>
                                  <option value="Factual error">Factual error</option>
                                  <option value="Misreading">Misreading</option>
                                  <option value="Guessing error">Guessing error</option>
                                  <option value="Poor elimination">Poor elimination</option>
                                  <option value="Time-management error">Time-management error</option>
                                  <option value="Overthinking">Overthinking</option>
                                  <option value="Current-affairs gap">Current-affairs gap</option>
                                </select>
                              </div>

                              <button
                                onClick={() => handleSaveToErrorLog(q, selectedCategory)}
                                disabled={isSaved}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                  isSaved
                                    ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                                }`}
                              >
                                <BookmarkCheck className="w-3.5 h-3.5" />
                                <span>{isSaved ? 'Logged in Mistake Notebook' : 'Add to Mistake Notebook'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
