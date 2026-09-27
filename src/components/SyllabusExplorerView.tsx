import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileText,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
  Clock,
  Send,
  Loader2,
  Compass,
  FolderTree
} from 'lucide-react';
import { TopicLesson, ContentTag, LanguageMedium, PracticeQuestion } from '../types';
import { CompleteSyllabusExplorer } from './CompleteSyllabusExplorer';
import { SyllabusTopSearchBar } from './SyllabusTopSearchBar';
import { SyllabusTopicItem } from '../data/completeSyllabusData';

interface SyllabusExplorerViewProps {
  topics: TopicLesson[];
  selectedTopicId: string | null;
  onSelectTopicId: (id: string | null) => void;
  language: LanguageMedium;
  onAnswerPracticeQuestion?: (q: PracticeQuestion, selectedOption: string) => void;
}

const STEP_TITLES = [
  '1. Syllabus Location',
  '2. Why it Matters for UPSC',
  '3. Why it Matters for RPSC',
  '4. Core Concept',
  '5. Verified Facts & Articles',
  '6. UPSC-RPSC Overlap',
  '7. Rajasthan Additions',
  '8. Misconceptions & Traps',
  '9. PYQ Linkage',
  '10. Practice Questions',
  '11. Revision Summary',
  '12. Spaced Revision Schedule',
];

export const SyllabusExplorerView: React.FC<SyllabusExplorerViewProps> = ({
  topics,
  selectedTopicId,
  onSelectTopicId,
  language,
}) => {
  const [viewMode, setViewMode] = useState<'DIRECTORY' | 'MASTERCLASS'>('DIRECTORY');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [activeExternalTopic, setActiveExternalTopic] = useState<SyllabusTopicItem | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<'UPSC_CSE' | 'RPSC_RAS'>('UPSC_CSE');

  const [filterTag, setFilterTag] = useState<string>('ALL');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // AI Deep-dive state
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [isGeneratingDeepdive, setIsGeneratingDeepdive] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<TopicLesson | null>(null);

  const allTopics = generatedLesson ? [generatedLesson, ...topics] : topics;

  const currentTopic = allTopics.find((t) => t.id === selectedTopicId) || allTopics[0];

  const filteredTopics = allTopics.filter((t) => {
    if (filterTag !== 'ALL' && !t.tags.includes(filterTag as ContentTag)) {
      return false;
    }
    if (globalSearchQuery.trim().length > 0) {
      const q = globalSearchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.titleHindi.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.upscRpscOverlap.toLowerCase().includes(q) ||
        t.coreConcept.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectOption = (questionId: string, optionLetter: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionLetter }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleGenerateCustomDeepdive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopicInput.trim()) return;

    setIsGeneratingDeepdive(true);
    try {
      const res = await fetch('/api/mentor/topic-deepdive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: customTopicInput,
          subject: 'Integrated UPSC & RPSC Prelims',
          language,
        }),
      });
      const data = await res.json();
      if (data.deepdive) {
        const newLesson: TopicLesson = {
          id: `custom-${Date.now()}`,
          title: customTopicInput,
          titleHindi: customTopicInput,
          subject: 'Custom AI Masterclass',
          tags: ['HIGH PRIORITY', 'COMMON', 'RPSC EXTRA'],
          estimatedHours: 6,
          overlapPercentage: 70,
          ...data.deepdive,
        };
        setGeneratedLesson(newLesson);
        onSelectTopicId(newLesson.id);
        setActiveStep(0);
        setCustomTopicInput('');
        setViewMode('MASTERCLASS');
      }
    } catch (err) {
      console.error('Failed to generate deep dive:', err);
    } finally {
      setIsGeneratingDeepdive(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Universal Integrated Syllabus Search Bar */}
      <SyllabusTopSearchBar
        searchQuery={globalSearchQuery}
        onSearchChange={setGlobalSearchQuery}
        masterclassTopics={allTopics}
        onSelectMasterclassLesson={(lessonId) => {
          onSelectTopicId(lessonId);
          setViewMode('MASTERCLASS');
        }}
        onSelectSyllabusTopic={(topic, examId) => {
          setSelectedExamId(examId);
          setActiveExternalTopic(topic);
          setViewMode('DIRECTORY');
        }}
        onViewAllInDirectory={() => {
          setViewMode('DIRECTORY');
        }}
      />

      {/* Primary Top View Mode Navigation: Full Directory vs 12-Step Masterclass */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setViewMode('DIRECTORY')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'DIRECTORY'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Full Syllabus Directory (UPSC & RPSC)</span>
          </button>

          <button
            onClick={() => setViewMode('MASTERCLASS')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'MASTERCLASS'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>12-Step Pedagogical Lessons</span>
            {globalSearchQuery.trim() && (
              <span className="px-1.5 py-0.2 bg-slate-900 text-[10px] rounded text-amber-300 font-bold">
                {filteredTopics.length}
              </span>
            )}
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden md:flex items-center gap-2 pr-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Interactive multi-tier drill-down with official notified topics</span>
        </div>
      </div>

      {/* View Mode 1: Comprehensive Multi-Level Syllabus Explorer */}
      {viewMode === 'DIRECTORY' && (
        <CompleteSyllabusExplorer
          language={language}
          onSelectTopicLesson={(lessonId) => {
            onSelectTopicId(lessonId);
            setViewMode('MASTERCLASS');
          }}
          externalSearchQuery={globalSearchQuery}
          onSearchQueryChange={setGlobalSearchQuery}
          externalDeepDiveTopic={activeExternalTopic}
          onCloseExternalDeepDive={() => setActiveExternalTopic(null)}
          selectedExamId={selectedExamId}
          onSelectExamId={setSelectedExamId}
        />
      )}

      {/* View Mode 2: Guided 12-Step Topic Masterclasses */}
      {viewMode === 'MASTERCLASS' && (
        <div className="space-y-6">
          {/* Top Controls: Filter Tags & Custom Topic Generator */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950 rounded-lg text-xs">
          {['ALL', 'COMMON', 'RPSC EXTRA', 'UPSC EXTRA', 'HIGH PRIORITY', 'CURRENT'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                filterTag === tag
                  ? 'bg-slate-800 text-amber-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tag === 'ALL' ? 'All Topics' : `[${tag}]`}
            </button>
          ))}
        </div>

        {/* Custom AI Deepdive search / generation */}
        <form onSubmit={handleGenerateCustomDeepdive} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Generate 12-step masterclass for any topic (e.g., Lokayukta, Mangarh Dham)..."
            value={customTopicInput}
            onChange={(e) => setCustomTopicInput(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={isGeneratingDeepdive}
            className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            {isGeneratingDeepdive ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Generate Lesson</span>
          </button>
        </form>
      </div>

      {/* Main Grid: Topic Selector Column & 12-Step Lesson Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Topics List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-wider flex items-center justify-between">
            <span>Syllabus Units ({filteredTopics.length})</span>
            <span className="text-[11px] text-amber-400">12-Step Structured</span>
          </div>

          <div className="space-y-2 max-h-[800px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === currentTopic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    onSelectTopicId(topic.id);
                    setActiveStep(0);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 mb-1">
                    {topic.tags.map((t) => (
                      <span key={t}>[{t}]</span>
                    ))}
                  </div>

                  <h3 className={`font-semibold text-xs leading-snug ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                    {language === 'Hindi' && topic.titleHindi ? topic.titleHindi : topic.title}
                  </h3>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                    <span className="truncate max-w-[140px]">{topic.subject}</span>
                    <span className="text-emerald-400 font-medium tabular-nums">{topic.overlapPercentage}% Overlap</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 12-Step Masterclass Lesson Reader (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Header of Lesson */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/70">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 mb-2">
              {currentTopic.tags.map((tag) => (
                <span key={tag} className="font-semibold tracking-wide">
                  [{tag}]
                </span>
              ))}
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{currentTopic.subject}</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">{currentTopic.overlapPercentage}% Shared Core</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              {language === 'Hindi' && currentTopic.titleHindi ? currentTopic.titleHindi : currentTopic.title}
            </h2>

            {/* 12-Step Horizontal Selector Strip */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
              {STEP_TITLES.map((title, idx) => (
                <button
                  key={title}
                  onClick={() => setActiveStep(idx)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-medium transition-colors ${
                    activeStep === idx
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content Body */}
          <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-300 min-h-[460px]">
            {/* Step 1: Syllabus Location */}
            {activeStep === 0 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 1: Exact Syllabus Mapping
                </div>
                <h3 className="text-base font-bold text-slate-100">Official Notification Mapping</h3>
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                  <p className="leading-relaxed text-slate-300">{currentTopic.syllabusLocation}</p>
                </div>
                <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-semibold block mb-1">Mentor Strategy Rule:</span>
                  Never study a topic in isolation. Always visualize where the question will sit in the UPSC Prelims GS-I Paper (Paper Code: CSP) and RPSC RAS General Knowledge & General Science Paper.
                </div>
              </div>
            )}

            {/* Step 2: Why it matters for UPSC */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 2: The UPSC Lens
                </div>
                <h3 className="text-base font-bold text-slate-100">Why UPSC Tests This Topic</h3>
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl leading-relaxed">
                  {currentTopic.whyMattersUPSC}
                </div>
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">UPSC Question Archetype:</span> Statement-based elimination, multi-clause constitutional provisions, and interdisciplinary conceptual synthesis.
                </div>
              </div>
            )}

            {/* Step 3: Why it matters for RPSC */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 3: The RPSC RAS Lens
                </div>
                <h3 className="text-base font-bold text-slate-100">Why RPSC RAS Tests This Topic</h3>
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl leading-relaxed">
                  {currentTopic.whyMattersRPSC}
                </div>
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">RPSC Question Archetype:</span> Direct dates, specific personalities, exact section numbers in State Acts, and 5-option OMR matching.
                </div>
              </div>
            )}

            {/* Step 4: Core Concept */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 4: Fundamental Explanation
                </div>
                <h3 className="text-base font-bold text-slate-100">Core Concept in Simple Language</h3>
                <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl text-base leading-relaxed text-slate-200 font-sans">
                  {currentTopic.coreConcept}
                </div>
              </div>
            )}

            {/* Step 5: Important Facts, Terms & Articles */}
            {activeStep === 4 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 5: Verified Facts & Articles
                </div>
                <h3 className="text-base font-bold text-slate-100">Crucial Facts, Sections & Institutions</h3>
                <div className="space-y-2.5">
                  {currentTopic.importantFacts.map((fact, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs leading-relaxed text-slate-300"
                    >
                      {fact}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: UPSC-RPSC Overlap */}
            {activeStep === 5 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 6: Syllabus Overlap Matrix
                </div>
                <h3 className="text-base font-bold text-slate-100">Overlap Breakdown & Workload Division</h3>
                <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl leading-relaxed text-slate-300">
                  {currentTopic.upscRpscOverlap}
                </div>
                <div className="p-3 bg-emerald-950/30 border border-emerald-600/40 rounded-lg text-xs text-emerald-300">
                  <span className="font-semibold">Honest Workload Audit:</span> Prepare the common base once; do not make two separate binders for the 70% shared subjects!
                </div>
              </div>
            )}

            {/* Step 7: Rajasthan Specific Additions */}
            {activeStep === 6 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 7: Rajasthan State Layer
                </div>
                <h3 className="text-base font-bold text-slate-100">Rajasthan-Specific Facts & Local Provisions</h3>
                <div className="space-y-2">
                  {currentTopic.rajasthanSpecificAdditions.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950/90 border border-amber-500/20 rounded-lg text-xs text-slate-300 leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Common Misconceptions & Traps */}
            {activeStep === 7 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Step 8: Examiner Traps & Misconceptions</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">Pitfalls That Cost -0.66 or -1/3rd Marks</h3>
                <div className="space-y-3">
                  {currentTopic.commonMisconceptionsAndTraps.map((trap, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-rose-950/20 border border-rose-600/30 rounded-lg text-xs text-rose-200 leading-relaxed"
                    >
                      {trap}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: PYQ Linkage */}
            {activeStep === 8 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 9: Previous Year Examination Connection
                </div>
                <h3 className="text-base font-bold text-slate-100">Past Year Questions Analysis</h3>
                <div className="space-y-4">
                  {currentTopic.pyqLinkage.map((pyq, i) => (
                    <div key={i} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-400">{pyq.exam} ({pyq.year})</span>
                        {pyq.correctAnswer && (
                          <span className="text-emerald-400 font-medium">Answer: {pyq.correctAnswer}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{pyq.questionBrief}</p>
                      <div className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-300 font-medium">Key Takeaway: </span>
                        {pyq.takeaway}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 10: Practice Questions */}
            {activeStep === 9 && (
              <div className="space-y-6">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 10: High-Yield Practice Drills
                </div>
                <h3 className="text-base font-bold text-slate-100">Test Your Grasp Before Moving Forward</h3>

                <div className="space-y-6">
                  {currentTopic.practiceQuestions.map((q, qIndex) => {
                    const chosen = selectedAnswers[q.id];
                    const isAnswered = showExplanation[q.id];

                    return (
                      <div key={q.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-semibold">
                            {q.examType} Style · Question {qIndex + 1}
                          </span>
                          <span className="text-slate-400 text-xs">Skill: {q.cognitiveSkill}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                          {q.text}
                        </p>

                        {/* Options */}
                        <div className="space-y-2">
                          {q.options.map((opt, optIndex) => {
                            const letter = String.fromCharCode(65 + optIndex);
                            const isSelected = chosen === letter;
                            const isCorrect = letter === q.correctOption;

                            let optStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';
                            if (isAnswered) {
                              if (isCorrect) {
                                optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                              } else if (isSelected) {
                                optStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                              }
                            }

                            return (
                              <button
                                key={letter}
                                onClick={() => handleSelectOption(q.id, letter)}
                                className={`w-full text-left p-3 rounded-lg border text-xs flex items-start gap-2.5 transition-all cursor-pointer ${optStyle}`}
                              >
                                <span className="font-bold text-amber-400 shrink-0">{letter}.</span>
                                <span className="leading-snug">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box when Answered */}
                        {isAnswered && (
                          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2.5 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold ${
                                  chosen === q.correctOption ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                              >
                                {chosen === q.correctOption ? 'Correct!' : 'Incorrect.'}
                              </span>
                              <span className="text-slate-400">Correct Answer: {q.correctOption}</span>
                            </div>

                            <p className="leading-relaxed text-slate-300">
                              <strong className="text-slate-100">Elimination Tactic: </strong>
                              {q.eliminationTactic}
                            </p>

                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-300">
                              <span>Mnemonic: {q.mnemonic}</span>
                              <span>Trap: {q.trap}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 11: Revision Summary */}
            {activeStep === 10 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 11: Quick Revision Capsule
                </div>
                <h3 className="text-base font-bold text-slate-100">Micro-Notes & Comparison Table</h3>

                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="text-xs font-semibold text-slate-200">Micro-Notes for 5-Minute Recall:</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentTopic.revisionSummary.microNotes}
                  </p>
                </div>

                {/* Comparison Table */}
                {currentTopic.revisionSummary.comparisonTable.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">Parameter</th>
                          <th className="py-2.5 px-3">Common UPSC Core</th>
                          <th className="py-2.5 px-3">Rajasthan State Layer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {currentTopic.revisionSummary.comparisonTable.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/30">
                            <td className="py-2.5 px-3 font-semibold text-slate-200">{row.parameter}</td>
                            <td className="py-2.5 px-3 text-slate-300">{row.upscCore}</td>
                            <td className="py-2.5 px-3 text-amber-300">{row.rajasthanLayer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200">
                  <span className="font-bold">Memory Anchor / Mnemonic: </span>
                  {currentTopic.revisionSummary.memoryAid}
                </div>
              </div>
            )}

            {/* Step 12: Spaced Revision Schedule */}
            {activeStep === 11 && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Step 12: Scientific Spaced Repetition (1d - 3d - 7d - 15d - 30d)
                </div>
                <h3 className="text-base font-bold text-slate-100">Revision Timetable for Long-Term Memory</h3>

                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 w-24">Day 1 Review</span>
                    <span className="text-slate-300 flex-1">{currentTopic.spacedRevisionSchedule.day1}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 w-24">Day 3 Review</span>
                    <span className="text-slate-300 flex-1">{currentTopic.spacedRevisionSchedule.day3}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 w-24">Day 7 Review</span>
                    <span className="text-slate-300 flex-1">{currentTopic.spacedRevisionSchedule.day7}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 w-24">Day 15 Review</span>
                    <span className="text-slate-300 flex-1">{currentTopic.spacedRevisionSchedule.day15}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 w-24">Day 30 Review</span>
                    <span className="text-slate-300 flex-1">{currentTopic.spacedRevisionSchedule.day30}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Step Nav Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Previous Step
            </button>

            <span className="text-xs text-slate-500">
              Step {activeStep + 1} of 12
            </span>

            <button
              onClick={() => setActiveStep((prev) => Math.min(11, prev + 1))}
              disabled={activeStep === 11}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans disabled:opacity-40 transition-colors cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
