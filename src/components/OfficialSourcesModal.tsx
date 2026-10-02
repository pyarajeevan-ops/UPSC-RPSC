import React from 'react';
import {
  X,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  FileText,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Scale,
  Award
} from 'lucide-react';
import { OFFICIAL_SOURCES_DIRECTORY } from '../data/mockSyllabus';

export interface OfficialSourceDetail {
  name: string;
  url: string;
  category: string;
  description: string;
  officialMandate: string;
  highYieldSections: string[];
  examUtilityUPSC: string;
  examUtilityRPSC: string;
}

export const DETAILED_OFFICIAL_SOURCES: OfficialSourceDetail[] = [
  {
    name: 'Union Public Service Commission (UPSC)',
    url: 'https://upsc.gov.in',
    category: 'Union Constitutional Body',
    description: 'Official notifications, CSE Prelims question papers, answer keys, annual reports.',
    officialMandate: 'Article 315 to 323 of Constitution of India for recruitment to Civil Services.',
    highYieldSections: [
      'Civil Services Examination Gazetted Notifications & Official Rule Book',
      'Previous 10 Years Prelims Paper-I & Paper-II Official Keys',
      'Annual Reports on recruitment statistics and regional representations',
      'Post-examination cut-off mark declarations'
    ],
    examUtilityUPSC: 'The golden baseline for exam pattern, framing of syllabus words, and authorized answer keys.',
    examUtilityRPSC: 'Comparative study of syllabus overlap (70% common subjects).'
  },
  {
    name: 'Rajasthan Public Service Commission (RPSC)',
    url: 'https://rpsc.rajasthan.gov.in',
    category: 'State Constitutional Body',
    description: 'Official notifications, RAS/RTS Prelims scheme, syllabus, model answer keys, 5-option OMR rules.',
    officialMandate: 'Article 315 of Constitution of India for appointments to Rajasthan state services.',
    highYieldSections: [
      'RAS/RTS Combined Competitive Examination Notified Syllabus',
      '5-Option OMR Rules (Mandatory 5th Option darkening with 1/3rd penalty)',
      'Previous Years Prelims & Mains Answer Keys with objections ledger',
      'Model Question Banks and subject-wise score benchmarks'
    ],
    examUtilityUPSC: 'N/A (State specific)',
    examUtilityRPSC: 'Primary authority for exam notification dates, syllabus changes, and official master question papers.'
  },
  {
    name: 'Press Information Bureau (PIB)',
    url: 'https://pib.gov.in',
    category: 'Union Government Communications',
    description: 'Union Government policy announcements, cabinet decisions, Ministry releases.',
    officialMandate: 'Nodal agency of the Government of India to disseminate information to print/electronic media.',
    highYieldSections: [
      'Cabinet Committee on Economic Affairs (CCEA) approved projects',
      'Union Budget, Economic Survey releases and quarterly GDP updates',
      'Ministry of Environment, Forest & Climate Change wildlife notifications',
      'ISRO & Defense Research and Development Organization (DRDO) operational achievements'
    ],
    examUtilityUPSC: 'Source of direct questions on government missions, portal launches, and statutory acts.',
    examUtilityRPSC: 'Union-state fiscal allocations and centrally sponsored schemes implemented in Rajasthan.'
  },
  {
    name: 'DIPR Rajasthan (Sujas & Bulletin)',
    url: 'https://dipr.rajasthan.gov.in',
    category: 'Rajasthan State Information Department',
    description: 'Rajasthan Government schemes, Sujas monthly magazine, Chief Minister announcements.',
    officialMandate: 'State Department of Information and Public Relations, Government of Rajasthan.',
    highYieldSections: [
      'Sujas Monthly Magazine (राजस्थान सुजस मासिक पत्रिका)',
      'Sujas E-Bulletin & Weekly Audio-Visual Summaries',
      'Mukhyamantri flagship schemes guidelines & beneficiary criteria',
      'State awards, folk festival calendars & handicraft recognitions'
    ],
    examUtilityUPSC: 'State best-practices case studies for Mains GS-II & GS-IV.',
    examUtilityRPSC: 'Accounts for 15-20 direct Prelims questions annually regarding budget schemes and welfare initiatives.'
  },
  {
    name: 'PRS Legislative Research',
    url: 'https://prsindia.org',
    category: 'Independent Legislative Research Organization',
    description: 'Unbiased parliamentary bill tracking, legislative analysis, state budget summaries.',
    officialMandate: 'Empowering citizens and legislators with transparent research and analysis on public policy.',
    highYieldSections: [
      'Vital Stats: Functioning of Parliament & State Legislative Assemblies',
      'Bill Trackers: Comprehensive summaries of newly passed parliamentary acts',
      'State Budget Analyses (including Rajasthan State Budget breakdown)',
      'Standing Committee recommendations on judicial, police & electoral reforms'
    ],
    examUtilityUPSC: 'Invaluable for GS-II Polity (Bills, Parliamentary scrutiny, Committee systems).',
    examUtilityRPSC: 'Legislative comparisons between Union acts and Rajasthan state amendment bills.'
  },
  {
    name: 'Directorate of Economics & Statistics, Rajasthan',
    url: 'https://statistics.rajasthan.gov.in',
    category: 'Directorate of Economics & Statistics',
    description: 'Official Rajasthan Economic Review (Aarthik Sameeksha) and Budget documents.',
    officialMandate: 'State nodal statistical authority responsible for computing State Domestic Product and socio-economic surveys.',
    highYieldSections: [
      'Annual Economic Review (आर्थिक समीक्षा - Rajasthan Economic Survey)',
      'Gross State Domestic Product (GSDP) at Constant (2011-12) and Current Prices',
      'Agriculture, Irrigation, Animal Husbandry & Mining extraction census',
      'SDG Rajasthan Index & District-wise performance rankings'
    ],
    examUtilityUPSC: 'Regional federal economics case studies.',
    examUtilityRPSC: 'The single highest-yield document for RPSC RAS Prelims, yielding 18 to 22 direct factual questions.'
  }
];

interface OfficialSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSource?: OfficialSourceDetail | null;
}

export const OfficialSourceModal: React.FC<OfficialSourceModalProps> = ({
  isOpen,
  onClose,
  initialSource
}) => {
  const [selectedSource, setSelectedSource] = React.useState<OfficialSourceDetail>(
    initialSource || DETAILED_OFFICIAL_SOURCES[0]
  );

  React.useEffect(() => {
    if (initialSource) {
      setSelectedSource(initialSource);
    }
  }, [initialSource]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Official Reference Source Directory</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                  Zero Hallucination
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Verified government repositories, authorized syllabus gazettes, and official economic surveys
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left source selector & Right deep inspection */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left Selector List */}
          <div className="md:col-span-4 p-4 space-y-2 bg-slate-950/40 overflow-y-auto max-h-[70vh]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
              Select Official Portal:
            </span>
            {DETAILED_OFFICIAL_SOURCES.map((src) => {
              const isSelected = selectedSource.name === src.name;
              return (
                <button
                  key={src.name}
                  onClick={() => setSelectedSource(src)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm line-clamp-1">{src.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{src.category}</div>
                </button>
              );
            })}
          </div>

          {/* Right Details Panel */}
          <div className="md:col-span-8 p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {selectedSource.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">{selectedSource.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedSource.description}</p>
              </div>

              <a
                href={selectedSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 self-start shrink-0 shadow-lg shadow-amber-500/15"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Mandate & Authority */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                Constitutional & Administrative Mandate:
              </span>
              <p>{selectedSource.officialMandate}</p>
            </div>

            {/* High-Yield Sections */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Must-Read Portions for Dual Aspirants</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSource.highYieldSections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Utility Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/30 space-y-1">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>UPSC CSE Prelims Role:</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedSource.examUtilityUPSC}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>RPSC RAS Prelims Role:</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedSource.examUtilityRPSC}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
