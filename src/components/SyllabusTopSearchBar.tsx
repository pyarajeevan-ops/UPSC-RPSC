import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  X,
  BookOpen,
  Building,
  Castle,
  Layers,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Tag,
  CheckCircle2
} from 'lucide-react';
import {
  COMPLETE_EXAM_SYLLABUS_DATA,
  SyllabusTopicItem
} from '../data/completeSyllabusData';
import { TopicLesson } from '../types';

export interface SearchMatchItem {
  id: string;
  sourceType: 'UPSC_SYLLABUS' | 'RPSC_SYLLABUS' | 'MASTERCLASS_LESSON';
  title: string;
  titleHindi?: string;
  subtitle: string;
  stageName?: string;
  paperName?: string;
  sectionName?: string;
  overlapCategory?: 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'UPSC_EXCLUSIVE';
  overlapPercentage?: number;
  descriptionSnippet: string;
  originalTopic?: SyllabusTopicItem;
  lessonId?: string;
}

interface SyllabusTopSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  masterclassTopics: TopicLesson[];
  onSelectMasterclassLesson: (lessonId: string) => void;
  onSelectSyllabusTopic: (topic: SyllabusTopicItem, examId: 'UPSC_CSE' | 'RPSC_RAS') => void;
  onViewAllInDirectory?: () => void;
}

const POPULAR_SEARCH_PRESETS = [
  { label: 'Panchayati Raj & SEC', query: 'Panchayati' },
  { label: 'Aravalli & Drainage', query: 'Aravalli' },
  { label: 'Governor & Art 200', query: 'Governor' },
  { label: 'Ethics & Gita', query: 'Gita' },
  { label: '1857-1947 Freedom Struggle', query: 'National Movement' },
  { label: 'Rajasthan Forts & Prajamandal', query: 'Prajamandal' },
  { label: 'Biodiversity & WPA 1972', query: 'Wildlife Protection' },
  { label: 'Monetary Policy & Inflation', query: 'Monetary' },
  { label: 'MSP & Subsidies', query: 'MSP' },
];

export const SyllabusTopSearchBar: React.FC<SyllabusTopSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  masterclassTopics,
  onSelectMasterclassLesson,
  onSelectSyllabusTopic,
  onViewAllInDirectory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Compute live search matches across UPSC, RPSC, and Masterclass lessons
  const searchResults = useMemo<SearchMatchItem[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const matches: SearchMatchItem[] = [];

    // 1. Search in 12-Step Masterclasses
    masterclassTopics.forEach((lesson) => {
      const isMatch =
        lesson.title.toLowerCase().includes(q) ||
        lesson.titleHindi.toLowerCase().includes(q) ||
        lesson.subject.toLowerCase().includes(q) ||
        lesson.coreConcept.toLowerCase().includes(q) ||
        lesson.upscRpscOverlap.toLowerCase().includes(q);

      if (isMatch) {
        matches.push({
          id: `masterclass-${lesson.id}`,
          sourceType: 'MASTERCLASS_LESSON',
          title: lesson.title,
          titleHindi: lesson.titleHindi,
          subtitle: `12-Step Masterclass • ${lesson.subject}`,
          descriptionSnippet: lesson.coreConcept.slice(0, 140) + '...',
          lessonId: lesson.id,
          overlapPercentage: lesson.overlapPercentage,
        });
      }
    });

    // 2. Search in UPSC CSE Complete Syllabus
    const upsc = COMPLETE_EXAM_SYLLABUS_DATA.UPSC_CSE;
    upsc.selectionStages.forEach((stage) => {
      stage.papers.forEach((paper) => {
        paper.sections.forEach((sec) => {
          sec.topics.forEach((topic) => {
            const isMatch =
              topic.title.toLowerCase().includes(q) ||
              topic.titleHindi.toLowerCase().includes(q) ||
              topic.officialDescription.toLowerCase().includes(q) ||
              topic.deepDiveAnalysis.toLowerCase().includes(q) ||
              topic.subtopics.some(
                (sub) =>
                  sub.name.toLowerCase().includes(q) ||
                  sub.details.toLowerCase().includes(q) ||
                  sub.keyPoints.some((k) => k.toLowerCase().includes(q))
              );

            if (isMatch) {
              matches.push({
                id: `upsc-${topic.id}`,
                sourceType: 'UPSC_SYLLABUS',
                title: topic.title,
                titleHindi: topic.titleHindi,
                subtitle: `UPSC ${stage.stageName} • ${paper.paperNumber} (${sec.name})`,
                stageName: stage.stageName,
                paperName: paper.paperNumber,
                sectionName: sec.name,
                overlapCategory: topic.overlapCategory,
                overlapPercentage: topic.overlapPercentage,
                descriptionSnippet: topic.officialDescription,
                originalTopic: topic,
                lessonId: topic.lessonIdLink,
              });
            }
          });
        });
      });
    });

    // 3. Search in RPSC RAS Complete Syllabus
    const rpsc = COMPLETE_EXAM_SYLLABUS_DATA.RPSC_RAS;
    rpsc.selectionStages.forEach((stage) => {
      stage.papers.forEach((paper) => {
        paper.sections.forEach((sec) => {
          sec.topics.forEach((topic) => {
            const isMatch =
              topic.title.toLowerCase().includes(q) ||
              topic.titleHindi.toLowerCase().includes(q) ||
              topic.officialDescription.toLowerCase().includes(q) ||
              topic.deepDiveAnalysis.toLowerCase().includes(q) ||
              topic.subtopics.some(
                (sub) =>
                  sub.name.toLowerCase().includes(q) ||
                  sub.details.toLowerCase().includes(q) ||
                  sub.keyPoints.some((k) => k.toLowerCase().includes(q))
              );

            if (isMatch) {
              matches.push({
                id: `rpsc-${topic.id}`,
                sourceType: 'RPSC_SYLLABUS',
                title: topic.title,
                titleHindi: topic.titleHindi,
                subtitle: `RPSC ${stage.stageName} • ${paper.paperNumber} (${sec.name})`,
                stageName: stage.stageName,
                paperName: paper.paperNumber,
                sectionName: sec.name,
                overlapCategory: topic.overlapCategory,
                overlapPercentage: topic.overlapPercentage,
                descriptionSnippet: topic.officialDescription,
                originalTopic: topic,
                lessonId: topic.lessonIdLink,
              });
            }
          });
        });
      });
    });

    return matches;
  }, [searchQuery, masterclassTopics]);

  const handleSelectPreset = (presetQuery: string) => {
    onSearchChange(presetQuery);
    setIsDropdownOpen(true);
  };

  const handleClear = () => {
    onSearchChange('');
    setIsDropdownOpen(false);
  };

  return (
    <div ref={searchContainerRef} className="relative z-40 space-y-2">
      {/* Top Search Bar Input Card */}
      <div className="bg-slate-900/95 border border-slate-700/80 focus-within:border-amber-500/80 rounded-2xl p-2.5 sm:p-3 shadow-xl transition-all">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 shrink-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (!isDropdownOpen) setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (searchQuery.trim().length > 0) setIsDropdownOpen(true);
              }}
              placeholder="Search across integrated UPSC & RPSC syllabi: e.g. Panchayati Raj, Aravalli, Governor, Ethics, Lokdevtas..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none pr-8 py-1"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 rounded-md transition-colors cursor-pointer"
                title="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Counter or Status Badge */}
          {searchQuery.trim().length > 0 ? (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs shrink-0 tabular-nums">
              <span>{searchResults.length}</span>
              <span className="font-normal text-slate-400">found</span>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-500 shrink-0 font-medium">
              <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">UPSC</span>
              <span>+</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">RPSC</span>
              <span>Search</span>
            </div>
          )}
        </div>

        {/* Popular Preset Topic Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 border-t border-slate-800/80 mt-2 text-[11px] scrollbar-none">
          <span className="text-slate-500 font-semibold shrink-0 flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3 text-amber-400" />
            <span>Popular:</span>
          </span>
          {POPULAR_SEARCH_PRESETS.map((preset) => {
            const isCurrent = searchQuery.toLowerCase() === preset.query.toLowerCase();
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSelectPreset(preset.query)}
                className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all cursor-pointer shrink-0 font-medium ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Search Results Dropdown Tray */}
      {isDropdownOpen && searchQuery.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Results Summary Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">
                Found {searchResults.length} topics matching &quot;{searchQuery}&quot;
              </span>
              <span className="text-slate-500 hidden sm:inline">across UPSC CSE, RPSC RAS & Masterclasses</span>
            </div>

            {onViewAllInDirectory && searchResults.length > 0 && (
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  onViewAllInDirectory();
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Filter in Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-800/80 p-2 space-y-1">
            {searchResults.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Search className="w-7 h-7 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No syllabus topics found</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try searching for general keywords like &quot;Polity&quot;, &quot;Rajasthan&quot;, &quot;Drainage&quot;, &quot;Ethics&quot;, or &quot;Economy&quot;.
                </p>
              </div>
            ) : (
              searchResults.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-950/60 hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer space-y-1.5 group border border-transparent hover:border-slate-700"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (item.sourceType === 'MASTERCLASS_LESSON' && item.lessonId) {
                        onSelectMasterclassLesson(item.lessonId);
                      } else if (item.originalTopic) {
                        const exam = item.sourceType === 'UPSC_SYLLABUS' ? 'UPSC_CSE' : 'RPSC_RAS';
                        onSelectSyllabusTopic(item.originalTopic, exam);
                      }
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        {item.sourceType === 'UPSC_SYLLABUS' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] bg-amber-500/15 border border-amber-500/30 text-amber-300">
                            <Building className="w-3 h-3" />
                            UPSC CSE
                          </span>
                        ) : item.sourceType === 'RPSC_SYLLABUS' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                            <Castle className="w-3 h-3" />
                            RPSC RAS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                            <BookOpen className="w-3 h-3" />
                            12-Step Masterclass
                          </span>
                        )}

                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.subtitle}
                        </span>
                      </div>

                      {item.overlapCategory && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            item.overlapCategory === 'COMMON_CORE'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : item.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                              : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                          }`}
                        >
                          {item.overlapCategory === 'COMMON_CORE'
                            ? `70% Common Core`
                            : item.overlapCategory === 'RAJASTHAN_EXCLUSIVE'
                            ? 'Rajasthan Exclusive'
                            : 'UPSC Exclusive'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-100 text-xs sm:text-sm group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </div>
                        {item.titleHindi && (
                          <div className="text-[11px] text-slate-400 font-serif">
                            {item.titleHindi}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-amber-400 opacity-90 group-hover:translate-x-1 transition-all">
                        <span>Read inside</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">
                      {item.descriptionSnippet}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer of search dropdown */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Click any result to read detailed topic breakdown, PYQ links & examiner traps</span>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
