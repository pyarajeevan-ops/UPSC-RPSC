import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Compass,
  GraduationCap,
  BookOpen,
  Award,
  BrainCircuit,
  BookmarkCheck,
  PenTool,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Globe,
  Sliders,
  CheckCircle2,
  X,
  Keyboard,
  Calendar,
  Library
} from 'lucide-react';
import { COMPLETE_EXAM_SYLLABUS_DATA, SyllabusTopicItem } from '../data/completeSyllabusData';
import { COMPLETE_CURRICULUM_DOMAINS } from '../data/curriculumKnowledgeData';
import { LanguageMedium, UserProfile } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onSelectSyllabusTopic?: (topicId: string, examId: 'UPSC_CSE' | 'RPSC_RAS') => void;
  language: LanguageMedium;
  setLanguage: (lang: LanguageMedium) => void;
  onOpenDiagnostic: () => void;
}

interface PaletteAction {
  id: string;
  category: 'NAVIGATION' | 'SYLLABUS_TOPIC' | 'QUICK_ACTION';
  title: string;
  titleHindi?: string;
  subtitle: string;
  icon: React.ElementType;
  badge?: string;
  run: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectSyllabusTopic,
  language,
  setLanguage,
  onOpenDiagnostic,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keyboard listener for Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Primary Navigation Actions
  const navActions: PaletteAction[] = [
    {
      id: 'nav-dashboard',
      category: 'NAVIGATION',
      title: 'Roadmap & Daily Dual Architecture',
      titleHindi: 'दैनिक अध्ययन रोडमैप',
      subtitle: '70:20:10 workload balance, study streaks & session focus notes',
      icon: Compass,
      badge: 'Main',
      run: () => {
        onSelectTab('dashboard');
        onClose();
      },
    },
    {
      id: 'nav-curriculum',
      category: 'NAVIGATION',
      title: 'Self-Teach Curriculum Track',
      titleHindi: 'स्व-अध्ययन पाठ्यक्रम (34 सप्ताह)',
      subtitle: '34-week dual masterplan, textbook chapters, daily timetable & strategy rules',
      icon: GraduationCap,
      badge: '34-Wk Plan',
      run: () => {
        onSelectTab('curriculum');
        onClose();
      },
    },
    {
      id: 'nav-syllabus',
      category: 'NAVIGATION',
      title: 'Complete Syllabus Directory',
      titleHindi: 'सम्पूर्ण यूपीएससी व आरपीएससी पाठ्यक्रम',
      subtitle: 'Official notified topics, recursive drill-down, quizzes & PYQ autopsy',
      icon: BookOpen,
      badge: 'Directory',
      run: () => {
        onSelectTab('syllabus');
        onClose();
      },
    },
    {
      id: 'nav-calendar',
      category: 'NAVIGATION',
      title: 'Study Calendar & Spaced Scheduler',
      titleHindi: 'अध्ययन कैलेंडर व आवर्ती स्मरण योजना',
      subtitle: '70:20:10 workload schedule, spaced revisions & prelims milestones',
      icon: Calendar,
      badge: 'Calendar',
      run: () => {
        onSelectTab('calendar');
        onClose();
      },
    },
    {
      id: 'nav-test-mode',
      category: 'NAVIGATION',
      title: 'Test Mode & Prelims Simulator',
      titleHindi: 'प्रारंभिक परीक्षा अभ्यास टेस्ट',
      subtitle: 'Timed multi-choice questions with 8-category error autopsy',
      icon: Award,
      badge: 'Practice',
      run: () => {
        onSelectTab('test-mode');
        onClose();
      },
    },
    {
      id: 'nav-mentor',
      category: 'NAVIGATION',
      title: 'Margdarshak AI Mentor Sanctum',
      titleHindi: 'मार्गदर्शक एआई मेंटर संवाद',
      subtitle: 'PYQ analysis, 12-step deepdives & answer evaluation',
      icon: BrainCircuit,
      badge: 'AI Coach',
      run: () => {
        onSelectTab('mentor');
        onClose();
      },
    },
    {
      id: 'nav-mistakes',
      category: 'NAVIGATION',
      title: 'Mistake Notebook / Error Log',
      titleHindi: 'त्रुटि रजिस्टर व पुनरावृत्ति',
      subtitle: 'Analyze cognitive traps, misreadings & recurring factual errors',
      icon: BookmarkCheck,
      badge: 'Error Log',
      run: () => {
        onSelectTab('mistakes');
        onClose();
      },
    },
    {
      id: 'nav-revision',
      category: 'NAVIGATION',
      title: '5-3-2-1-1 Active Recall Sanctuary',
      titleHindi: 'सक्रिय स्मरण व संशोधन',
      subtitle: 'Spaced review intervals preventing memory decay before exam day',
      icon: PenTool,
      badge: 'Recall',
      run: () => {
        onSelectTab('revision');
        onClose();
      },
    },
    {
      id: 'nav-rajasthan',
      category: 'NAVIGATION',
      title: 'Rajasthan Vault & Knowledge Layer',
      titleHindi: 'राजस्थान विशेष ज्ञान कोष (20%)',
      subtitle: 'Forts, dynasties, Prajamandal, geography, budget & Sujas schemes',
      icon: MapPin,
      badge: '20% Layer',
      run: () => {
        onSelectTab('rajasthan-vault');
        onClose();
      },
    },
  ];

  // Quick Utility Actions
  const quickActions: PaletteAction[] = [
    {
      id: 'act-diagnostic',
      category: 'QUICK_ACTION',
      title: 'Configure Aspirant Diagnostic Profile',
      subtitle: 'Adjust target year, daily hours, weak/strong subjects & medium',
      icon: Sliders,
      badge: 'Profile',
      run: () => {
        onOpenDiagnostic();
        onClose();
      },
    },
    {
      id: 'act-open-calendar',
      category: 'QUICK_ACTION',
      title: 'Open Study Calendar & Daily Spaced Planner',
      subtitle: 'View today schedule, timetable, countdowns and spaced repetition logs',
      icon: Calendar,
      badge: 'Calendar',
      run: () => {
        onSelectTab('calendar');
        onClose();
      },
    },
    {
      id: 'act-lang-english',
      category: 'QUICK_ACTION',
      title: 'Switch Medium to English',
      subtitle: 'Standard civil services English medium terminology',
      icon: Globe,
      badge: language === 'English' ? 'Active' : undefined,
      run: () => {
        setLanguage('English');
        onClose();
      },
    },
    {
      id: 'act-lang-hindi',
      category: 'QUICK_ACTION',
      title: 'Switch Medium to हिन्दी (Hindi)',
      subtitle: 'मानक सिविल सेवा हिन्दी माध्यम शब्दावली',
      icon: Globe,
      badge: language === 'Hindi' ? 'सक्रिय' : undefined,
      run: () => {
        setLanguage('Hindi');
        onClose();
      },
    },
    {
      id: 'act-lang-bilingual',
      category: 'QUICK_ACTION',
      title: 'Switch Medium to Hinglish / Bilingual',
      subtitle: 'Integrated English with Hindi conceptual terms',
      icon: Globe,
      badge: language === 'Bilingual' ? 'Active' : undefined,
      run: () => {
        setLanguage('Bilingual');
        onClose();
      },
    },
  ];

  // Search through all syllabus topics in UPSC & RPSC
  const syllabusTopicActions: PaletteAction[] = [];
  if (query.trim().length > 1) {
    const q = query.toLowerCase();

    // UPSC CSE Topics
    COMPLETE_EXAM_SYLLABUS_DATA.UPSC_CSE.selectionStages.forEach((stage) => {
      stage.papers.forEach((paper) => {
        paper.sections.forEach((sec) => {
          sec.topics.forEach((topic) => {
            if (
              topic.title.toLowerCase().includes(q) ||
              topic.titleHindi?.toLowerCase().includes(q) ||
              topic.officialDescription.toLowerCase().includes(q) ||
              topic.code.toLowerCase().includes(q) ||
              topic.subtopics.some((s) => s.name.toLowerCase().includes(q))
            ) {
              syllabusTopicActions.push({
                id: `top-upsc-${topic.id}`,
                category: 'SYLLABUS_TOPIC',
                title: topic.title,
                titleHindi: topic.titleHindi,
                subtitle: `UPSC CSE ${stage.stageName} • ${paper.paperNumber} (${sec.name})`,
                icon: BookOpen,
                badge: topic.code,
                run: () => {
                  onSelectTab('syllabus');
                  if (onSelectSyllabusTopic) {
                    onSelectSyllabusTopic(topic.id, 'UPSC_CSE');
                  }
                  onClose();
                },
              });
            }
          });
        });
      });
    });

    // RPSC RAS Topics
    COMPLETE_EXAM_SYLLABUS_DATA.RPSC_RAS.selectionStages.forEach((stage) => {
      stage.papers.forEach((paper) => {
        paper.sections.forEach((sec) => {
          sec.topics.forEach((topic) => {
            if (
              topic.title.toLowerCase().includes(q) ||
              topic.titleHindi?.toLowerCase().includes(q) ||
              topic.officialDescription.toLowerCase().includes(q) ||
              topic.code.toLowerCase().includes(q) ||
              topic.subtopics.some((s) => s.name.toLowerCase().includes(q))
            ) {
              syllabusTopicActions.push({
                id: `top-rpsc-${topic.id}`,
                category: 'SYLLABUS_TOPIC',
                title: topic.title,
                titleHindi: topic.titleHindi,
                subtitle: `RPSC RAS ${stage.stageName} • ${paper.paperNumber} (${sec.name})`,
                icon: MapPin,
                badge: topic.code,
                run: () => {
                  onSelectTab('syllabus');
                  if (onSelectSyllabusTopic) {
                    onSelectSyllabusTopic(topic.id, 'RPSC_RAS');
                  }
                  onClose();
                },
              });
            }
          });
        });
      });
    });

    // Also match Knowledge Curriculum Bits
    COMPLETE_CURRICULUM_DOMAINS.forEach((domain) => {
      domain.bits.forEach((bit) => {
        if (
          bit.topic.toLowerCase().includes(q) ||
          bit.subtopic.toLowerCase().includes(q) ||
          bit.keyFactOrConcept.toLowerCase().includes(q) ||
          bit.highYieldTags.some((t) => t.toLowerCase().includes(q))
        ) {
          syllabusTopicActions.push({
            id: `bit-${bit.id}`,
            category: 'SYLLABUS_TOPIC',
            title: `${bit.topic}: ${bit.subtopic}`,
            subtitle: `${domain.domainName} • ${bit.referencePage} • ${bit.subject}`,
            icon: Library,
            badge: bit.subject,
            run: () => {
              onSelectTab('curriculum');
              onClose();
            },
          });
        }
      });
    });
  }

  // Combine and filter items based on search query
  const filteredActions = (() => {
    if (!query.trim()) {
      return [...navActions, ...quickActions];
    }
    const q = query.toLowerCase();
    const matchedNav = navActions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.titleHindi?.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q)
    );
    const matchedQuick = quickActions.filter(
      (a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
    );
    return [...matchedNav, ...syllabusTopicActions.slice(0, 12), ...matchedQuick];
  })();

  // Handle arrow keys and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredActions[selectedIndex];
      if (current) {
        current.run();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/90 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a topic, view, or command (e.g., 'Polity', 'Curriculum', 'Rajasthan', 'Timer')..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              <kbd>Esc</kbd>
            </div>
          )}
        </div>

        {/* Action List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-800/60 max-h-[60vh] scrollbar-none">
          {filteredActions.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-7 h-7 text-slate-600 mx-auto" />
              <div className="font-semibold text-slate-300 text-sm">No commands or topics found</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Try searching for general keywords like &quot;Curriculum&quot;, &quot;Polity&quot;, &quot;History&quot;, or &quot;Test&quot;.
              </p>
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={action.id}
                  onClick={() => action.run()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 shadow-sm'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-slate-100 truncate">
                          {action.title}
                        </span>
                        {action.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-slate-950 text-amber-400 border border-slate-800 shrink-0">
                            {action.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px]">↓</kbd>
              <span className="text-slate-500">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px]">Enter</kbd>
              <span className="text-slate-500">Select</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Margdarshak Quick Navigation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
