import React, { useState } from 'react';
import {
  PenTool,
  Clock,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { SYLLABUS_TOPICS } from '../data/mockSyllabus';

export const SpacedRevisionView: React.FC = () => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [revealedSections, setRevealedSections] = useState<Record<string, boolean>>({});

  const topic = SYLLABUS_TOPICS[selectedTopicIndex] || SYLLABUS_TOPICS[0];

  const toggleReveal = (sectionKey: string) => {
    setRevealedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const handleRevealAll = () => {
    setRevealedSections({
      facts: true,
      concepts: true,
      traps: true,
      upsc: true,
      rpsc: true,
    });
  };

  const handleHideAll = () => {
    setRevealedSections({});
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-100 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-amber-400" />
            <span>Daily 5-3-2-1-1 Active Recall & Spaced Repetition</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            5 Facts · 3 Concepts · 2 Traps · 1 Probable UPSC Question · 1 Probable RPSC Question
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleHideAll}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Hide All (Active Recall Mode)
          </button>
          <button
            onClick={handleRevealAll}
            className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-lg text-xs text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
          >
            Reveal All
          </button>
        </div>
      </div>

      {/* Spaced Repetition Stage Indicator Strip */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">Margdarshak Spaced Repetition Intervals</span>
          <span className="text-amber-400 font-bold">1d → 3d → 7d → 15d → 30d Cumulative Rule</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <div className="font-bold text-sm">Day 1</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Immediate Recall</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <div className="font-bold text-sm">Day 3</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Closed MCQs</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <div className="font-bold text-sm">Day 7</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Interleaving</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <div className="font-bold text-sm">Day 15</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Speed Drills</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <div className="font-bold text-sm">Day 30</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Full Mock Test</div>
          </div>
        </div>
      </div>

      {/* Topic Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-slate-500 font-medium text-[11px] shrink-0">Select Topic:</span>
        {SYLLABUS_TOPICS.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTopicIndex(idx);
              setRevealedSections({});
            }}
            className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-colors cursor-pointer ${
              selectedTopicIndex === idx
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Active Recall Card Deck */}
      <div className="space-y-4">
        {/* Section 1: 5 Key Facts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                5
              </span>
              <h3 className="font-bold text-slate-100 text-sm">Key Facts (Recall Before Looking)</h3>
            </div>
            <button
              onClick={() => toggleReveal('facts')}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              {revealedSections.facts ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{revealedSections.facts ? 'Hide' : 'Reveal Answer'}</span>
            </button>
          </div>

          {!revealedSections.facts ? (
            <div className="p-8 bg-slate-950/70 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-400">
              Can you state 5 exact articles, numbers, or dates for {topic.title.split('(')[0]}?
              <div className="mt-2 text-amber-400 font-medium">Click \'Reveal Answer\' to check your retention.</div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              {topic.importantFacts.slice(0, 5).map((f, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                  <span className="font-bold text-amber-400 mr-2">Fact {i + 1}:</span>
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: 3 Core Concepts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h3 className="font-bold text-slate-100 text-sm">Key Concepts</h3>
            </div>
            <button
              onClick={() => toggleReveal('concepts')}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              {revealedSections.concepts ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{revealedSections.concepts ? 'Hide' : 'Reveal Answer'}</span>
            </button>
          </div>

          {!revealedSections.concepts ? (
            <div className="p-8 bg-slate-950/70 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-400">
              Recall: 1. Core rationale 2. Constitutional or physical mechanism 3. Overlap boundary.
            </div>
          ) : (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
              <p>
                <strong>Concept 1 (Mechanism): </strong>
                {topic.coreConcept}
              </p>
              <p>
                <strong>Concept 2 (UPSC Angle): </strong>
                {topic.whyMattersUPSC}
              </p>
              <p>
                <strong>Concept 3 (State Overlap): </strong>
                {topic.upscRpscOverlap}
              </p>
            </div>
          )}
        </div>

        {/* Section 3: 2 Common Traps */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="font-bold text-slate-100 text-sm">Examiner Traps to Avoid</h3>
            </div>
            <button
              onClick={() => toggleReveal('traps')}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              {revealedSections.traps ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{revealedSections.traps ? 'Hide' : 'Reveal Answer'}</span>
            </button>
          </div>

          {!revealedSections.traps ? (
            <div className="p-8 bg-slate-950/70 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-400">
              What are the 2 traps that lead candidates to pick the wrong option here?
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              {topic.commonMisconceptionsAndTraps.slice(0, 2).map((t, i) => (
                <div key={i} className="p-3 bg-rose-950/20 border border-rose-600/30 rounded-lg text-rose-200">
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4 & 5: 1 Probable UPSC Question & 1 Probable RPSC Question */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* UPSC Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <h4 className="font-bold text-slate-100 text-xs">Probable UPSC Question</h4>
              </div>
              <button
                onClick={() => toggleReveal('upsc')}
                className="text-xs text-amber-400 hover:text-amber-300"
              >
                {revealedSections.upsc ? 'Hide' : 'Reveal'}
              </button>
            </div>

            {revealedSections.upsc ? (
              <div className="text-xs text-slate-300 space-y-2">
                <p className="font-medium text-slate-200">
                  {topic.practiceQuestions.find((q) => q.examType === 'UPSC')?.text || topic.practiceQuestions[0]?.text}
                </p>
                <div className="text-amber-400 font-semibold pt-1">
                  Answer Key: {topic.practiceQuestions[0]?.correctOption} · Mnemonic: {topic.practiceQuestions[0]?.mnemonic}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-950/70 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-500">
                Click Reveal to see the high-yield analytical question
              </div>
            )}
          </div>

          {/* RPSC Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <h4 className="font-bold text-slate-100 text-xs">Probable RPSC Question</h4>
              </div>
              <button
                onClick={() => toggleReveal('rpsc')}
                className="text-xs text-amber-400 hover:text-amber-300"
              >
                {revealedSections.rpsc ? 'Hide' : 'Reveal'}
              </button>
            </div>

            {revealedSections.rpsc ? (
              <div className="text-xs text-slate-300 space-y-2">
                <p className="font-medium text-slate-200">
                  {topic.practiceQuestions.find((q) => q.examType === 'RPSC')?.text || topic.practiceQuestions[1]?.text || topic.practiceQuestions[0]?.text}
                </p>
                <div className="text-amber-400 font-semibold pt-1">
                  Answer Key: {topic.practiceQuestions[1]?.correctOption || topic.practiceQuestions[0]?.correctOption} · 5th Option Rule
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-950/70 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-500">
                Click Reveal to see the state-specific factual question
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
