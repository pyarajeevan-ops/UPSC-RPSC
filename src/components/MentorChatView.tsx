import React, { useState } from 'react';
import {
  BrainCircuit,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  BookmarkCheck,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { UserProfile, LanguageMedium, ErrorLogEntry, ErrorCategory } from '../types';

interface MentorChatViewProps {
  userProfile: UserProfile;
  language: LanguageMedium;
  onAddMistake: (mistake: ErrorLogEntry) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const MentorChatView: React.FC<MentorChatViewProps> = ({
  userProfile,
  language,
  onAddMistake,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'evaluator'>('chat');

  // Chat States
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        language === 'Hindi'
          ? `नमस्ते! मैं आपका यूपीएससी (UPSC CSE) एवं राजस्थान प्रशासनिक सेवा (RPSC RAS) एकीकृत मेंटर हूँ।\n\nआपकी प्रोफाइल (${userProfile.targetExam}, ${userProfile.studyHours} घंटे/दिन, ${userProfile.medium}) के अनुसार, हम 70% उभयनिष्ठ पाठ्यक्रम एवं 20% राजस्थान-विशिष्ट तथ्यों को साथ लेकर चलेंगे।\n\nआज आप किस विषय पर मार्गदर्शन, सक्रिय स्मरण (Active Recall), या परीक्षा-उन्मुख प्रश्न विश्लेषण चाहते हैं?`
          : `Greetings! I am your dedicated UPSC CSE Prelims & RPSC RAS Prelims mentor and question evaluator.\n\nBased on your calibrated roadmap (${userProfile.targetExam}, ${userProfile.studyHours}h/day, ${userProfile.medium}), we strictly operate on the 70:20:10 architecture: mastering the shared core conceptually while keeping Rajasthan state facts razor-sharp.\n\nWould you like today's 5-3-2-1-1 active recall drill, a concept breakdown, or an evaluation of your answer?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Evaluator States
  const [evalQuestionText, setEvalQuestionText] = useState(
    'With reference to the State Finance Commission in Rajasthan, consider the following statements:\n1. It is constituted by the Governor every five years under Article 243I.\n2. The 6th State Finance Commission of Rajasthan was chaired by Pradyuman Singh.\nWhich of the statements given above is/are correct?'
  );
  const [evalOptions, setEvalOptions] = useState([
    '1 only',
    '2 only',
    'Both 1 and 2',
    'Neither 1 nor 2',
  ]);
  const [candidateSelectedOption, setCandidateSelectedOption] = useState('C');
  const [candidateNotes, setCandidateNotes] = useState('I recalled Pradyuman Singh from the 6th SFC report.');
  const [evalResult, setEvalResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSavedToMistakes, setIsSavedToMistakes] = useState(false);

  const handleSendChat = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim() || isSendingChat) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    if (!textToSend) setChatInput('');
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userProfile,
          language,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      console.error('Chat failed:', err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            '[Mentor Offline Protocol] Remember: Always substantiate your answers with exact constitutional articles (e.g., Article 243I for SFC, Article 243K for SEC). Keep your error log updated after every mock session!',
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalQuestionText.trim()) return;

    setIsEvaluating(true);
    setIsSavedToMistakes(false);

    try {
      const res = await fetch('/api/mentor/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: {
            text: evalQuestionText,
            options: evalOptions,
            correctOption: 'C',
            concept: 'State Finance Commission under Article 243I and Rajasthan 6th SFC setup.',
            trap: 'Confusing 5th vs 6th SFC Chairpersons or Article 243I (PRIs) vs 243Y (Municipalities).',
            mnemonic: 'SFC = Article 243-I (Income / Finance).',
          },
          candidateAnswer: candidateSelectedOption,
          explanationNote: candidateNotes,
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvalResult(data.evaluation);
      }
    } catch (err) {
      console.error('Evaluation failed:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSaveEvalMistake = () => {
    if (!evalResult) return;
    const entry: ErrorLogEntry = {
      id: `err-${Date.now()}`,
      questionId: `custom-eval-${Date.now()}`,
      questionText: evalQuestionText,
      selectedOption: candidateSelectedOption,
      correctOption: evalResult.correctAnswer || 'C',
      errorCategory: (evalResult.errorCategory as ErrorCategory) || 'Factual error',
      topicTitle: 'Evaluated Question Drill',
      subject: 'Polity / Economy Drill',
      timestamp: new Date().toISOString(),
      candidateNotes: candidateNotes,
      trapIdentified: evalResult.identifiedTrap || 'Factual confusion',
      mnemonic: evalResult.memoryAid || 'Review notes',
    };
    onAddMistake(entry);
    setIsSavedToMistakes(true);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Segmented Mode: Mentorship Dialogue vs 8-Point Answer Evaluator */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold font-serif text-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-amber-400" />
            <span>Prelims AI Mentor & Answer Evaluator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Trained on official UPSC CSE & RPSC RAS notification standards and syllabus blueprints
          </p>
        </div>

        {/* Segmented Switcher */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mentorship Chat
          </button>
          <button
            onClick={() => setActiveTab('evaluator')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'evaluator'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            8-Point Answer Evaluator
          </button>
        </div>
      </div>

      {/* Mode A: Mentorship Dialogue */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* Quick High-Yield Query Chips */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
            <span className="text-slate-500 font-medium text-[11px] shrink-0">Quick Consults:</span>
            {[
              'Give me today’s 5-3-2-1-1 active recall drill for Rajasthan Polity',
              'Compare 73rd CAA vs Rajasthan Panchayati Raj Act 1994',
              'Break down 6 UNESCO Hill Forts of Rajasthan with traps',
              'How to eliminate extreme options in UPSC statements?',
              'Outline the 90-day final revision plan for dual attempt',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendChat(chip)}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 text-xs shrink-0 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Stream Window */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 h-[520px] overflow-y-auto space-y-4 shadow-xl">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-1">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-xl max-w-2xl whitespace-pre-line font-sans ${
                    m.role === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium ml-12'
                      : 'bg-slate-950 border border-slate-800 text-slate-200'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isSendingChat && (
              <div className="flex gap-3 text-xs text-slate-400 items-center">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <span>Margdarshak Mentor is formulating exam guidance...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything on UPSC syllabus, RPSC GK, error classification, or strategy..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
            />
            <button
              onClick={() => handleSendChat()}
              disabled={isSendingChat || !chatInput.trim()}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Ask Guru</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode B: 8-Point Question Evaluator */}
      {activeTab === 'evaluator' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Submit Any Prelims Question & Your Answer For Deep Evaluation</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                The evaluator follows the strict 8-point post-answer protocol: Correctness, Answer key, Option analysis, Underlying concept, Trap identification, Elimination method, Memory aid, and Error log categorization.
              </p>
            </div>

            <form onSubmit={handleEvaluateAnswer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Question Text:
                </label>
                <textarea
                  rows={3}
                  value={evalQuestionText}
                  onChange={(e) => setEvalQuestionText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {evalOptions.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <div key={letter} className="flex items-center gap-2">
                      <span className="font-bold text-amber-400 text-xs w-4">{letter}:</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...evalOptions];
                          updated[idx] = e.target.value;
                          setEvalOptions(updated);
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Candidate Selection & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Selected Option:
                  </label>
                  <select
                    value={candidateSelectedOption}
                    onChange={(e) => setCandidateSelectedOption(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                    <option value="E">Option E (Question not attempted)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Thought Process / Elimination Reasoning (Optional):
                  </label>
                  <input
                    type="text"
                    value={candidateNotes}
                    onChange={(e) => setCandidateNotes(e.target.value)}
                    placeholder="e.g. Ruled out A because I thought Pradyuman Singh was 5th SFC..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isEvaluating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>Run 8-Point Diagnostic Evaluation</span>
              </button>
            </form>
          </div>

          {/* Evaluation Results Card */}
          {evalResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-bold text-sm px-2.5 py-1 rounded-lg ${
                      evalResult.isCorrect
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                        : 'bg-rose-950 border border-rose-500 text-rose-300'
                    }`}
                  >
                    {evalResult.isCorrect ? '1. Answer Verdict: Correct' : '1. Answer Verdict: Incorrect'}
                  </span>
                  <span className="text-xs text-slate-400">
                    2. Correct Key: <strong>Option {evalResult.correctAnswer}</strong>
                  </span>
                </div>

                {evalResult.errorCategory && (
                  <span className="text-xs font-semibold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-md border border-rose-600/40">
                    Error Category: {evalResult.errorCategory}
                  </span>
                )}
              </div>

              {/* 3. Option by Option Analysis */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-200">3. Option-by-Option Analysis:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {evalResult.optionAnalysis?.map((opt: any, i: number) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400">Option {opt.option}</span>
                        <span
                          className={`text-[11px] font-semibold ${
                            opt.verdict === 'Correct' ? 'text-emerald-400' : 'text-slate-400'
                          }`}
                        >
                          {opt.verdict}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{opt.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Underlying Concept */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="font-bold text-slate-200">4. Underlying Concept:</div>
                <p className="text-slate-300 leading-relaxed">{evalResult.underlyingConcept}</p>
              </div>

              {/* 5. Identified Trap & 6. Elimination Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-rose-950/20 border border-rose-600/30 rounded-xl space-y-1">
                  <div className="font-bold text-rose-300">5. Examiner Trap Exposed:</div>
                  <p className="text-rose-200 leading-relaxed text-[11px]">{evalResult.identifiedTrap}</p>
                </div>

                <div className="p-3.5 bg-emerald-950/20 border border-emerald-600/30 rounded-xl space-y-1">
                  <div className="font-bold text-emerald-300">6. Best Elimination Method:</div>
                  <p className="text-emerald-200 leading-relaxed text-[11px]">{evalResult.eliminationMethod}</p>
                </div>
              </div>

              {/* 7. Memory Aid & 8. Mistake Notebook Logger */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-xs text-amber-300">
                  <strong>7. Memory Aid / Mnemonic: </strong> {evalResult.memoryAid}
                </div>

                {!evalResult.isCorrect && (
                  <button
                    onClick={handleSaveEvalMistake}
                    disabled={isSavedToMistakes}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isSavedToMistakes
                        ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    }`}
                  >
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>{isSavedToMistakes ? 'Added to Error Log' : '8. Add to Mistake Notebook'}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
