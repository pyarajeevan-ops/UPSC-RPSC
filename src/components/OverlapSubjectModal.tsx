import React from 'react';
import {
  X,
  Layers,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { LanguageMedium } from '../types';

export interface OverlapSubjectDetail {
  id: string;
  name: string;
  nameHindi: string;
  overlapPercentage: number;
  layer: 'Common Core (70%)' | 'Rajasthan Layer (20%)' | 'Test & Error Analysis (10%)';
  commonCoreFocus: string[];
  upscSpecificNuances: string[];
  rpscSpecificNuances: string[];
  recommendedSyllabusTarget: string;
  recommendedVaultCategory: string;
  recommendedBooks: string[];
}

export const OVERLAP_SUBJECTS_CATALOG: OverlapSubjectDetail[] = [
  {
    id: 'polity-governance',
    name: 'Indian Polity & Governance',
    nameHindi: 'भारतीय राजव्यवस्था एवं शासन',
    overlapPercentage: 85,
    layer: 'Common Core (70%)',
    commonCoreFocus: [
      'Preamble, Fundamental Rights (Art 12-35), Directive Principles (Art 36-51), Fundamental Duties (Art 51A)',
      'Union Executive: President (Art 52-62), Vice-President, Prime Minister & Council of Ministers',
      'Parliament: Lok Sabha, Rajya Sabha, Money Bill (Art 110), Joint Sitting (Art 108), Parliamentary Committees',
      'Judiciary: Supreme Court (Art 124-147) & High Courts (Art 214-231)',
      'Emergency Provisions (Art 352, 356, 360) and Constitutional Amendments (Art 368)',
      'Local Self-Government: 73rd and 74th Constitutional Amendment Acts (Articles 243-243ZG)'
    ],
    upscSpecificNuances: [
      'Constitutional morality, Basic Structure doctrine (Kesavananda Bharati, Minerva Mills)',
      'Comparative constitutionalism (India vs USA/UK/France models)',
      'Judicial review vs Judicial overreach, Article 142 complete justice power',
      'Writ jurisdictions under Article 32 vs Article 226'
    ],
    rpscSpecificNuances: [
      'Rajasthan State Administration: Governor appointment & tenure dates (Sardar Gurmukh Nihal Singh)',
      'Rajasthan High Court history: Establishment in Jaipur (1949) and shifting to Jodhpur (Satyanarayan Rao Committee)',
      'Rajasthan State Election Commission (Art 243K) and 6th State Finance Commission (Pradyuman Singh)',
      'State Human Rights Commission (SHRC), Lokayukta (Justice ID Dua first Lokayukta), State Information Commission'
    ],
    recommendedSyllabusTarget: 'panchayati-raj-local-gov',
    recommendedVaultCategory: 'Indian Polity',
    recommendedBooks: ['M. Laxmikanth (Indian Polity)', 'DD Basu (Introduction to Constitution)', 'Rajasthan Administrative Law']
  },
  {
    id: 'ancient-modern-history',
    name: 'Ancient & Modern Indian History',
    nameHindi: 'प्राचीन एवं आधुनिक भारतीय इतिहास',
    overlapPercentage: 75,
    layer: 'Common Core (70%)',
    commonCoreFocus: [
      'Indus Valley Civilisation: Urban planning, drainage, seals, absence of structural temples',
      'Vedic Period, Buddhism & Jainism philosophies, Mauryan Empire & Ashokan Edicts',
      'Gupta Golden Age, Delhi Sultanate administration, Mughal Empire agrarian reforms',
      '1857 Revolt: Causes, leaders (Bahadur Shah, Kunwar Singh, Nana Saheb, Lakshmibai) & peel commission',
      'Socio-Religious Reform Movements: Brahmo Samaj, Arya Samaj, Satyashodhak Samaj',
      'Indian National Congress: Moderates, Extremists, Swadeshi (1905), Non-Cooperation, Civil Disobedience, Quit India'
    ],
    upscSpecificNuances: [
      'Art & architecture evolution: Stupas, rock-cut caves (Ajanta, Ellora), Nagara/Dravida temples',
      'Economic impact of British rule: Drain of Wealth (Dadabhai Naoroji), de-industrialization',
      'Subaltern and peasant/tribal uprisings: Santhal, Munda, Birsa, Indigo Revolt'
    ],
    rpscSpecificNuances: [
      'Pre-historic sites of Rajasthan: Kalibangan (Ghaggar river), Ganeshwar (Kantli river), Ahar/Gilund (Banas basin)',
      'Dynasties of Rajasthan: Guhilas/Sisodias of Mewar (Kumbha, Sanga, Pratap), Rathores of Marwar, Chauhans of Ajmer',
      '1857 Revolt in Rajasthan: 6 Military Cantonments (Naseerabad spark 28 May 1857, Neemuch, Erinpura, Kota revolt)',
      'Peasant Movements (Bijolia, Begun) & Prajamandal movements for integration of 19 princely states'
    ],
    recommendedSyllabusTarget: 'indus-valley-civilisation',
    recommendedVaultCategory: 'Ancient History',
    recommendedBooks: ['NCERT Class 11-12 History', 'Spectrum Modern India (Rajiv Ahir)', 'Dr. Hukam Chand Jain (Rajasthan History)']
  },
  {
    id: 'physical-world-geography',
    name: 'Physical & World Geography',
    nameHindi: 'भौतिक एवं विश्व भूगोल',
    overlapPercentage: 65,
    layer: 'Common Core (70%)',
    commonCoreFocus: [
      'Geomorphology: Earth structure, Plate Tectonics, Earthquakes, Volcanism, Continental Drift',
      'Climatology: Atmosphere structure, Insolation, Pressure belts, Monsoons, Cyclones, Jet Streams',
      'Oceanography: Ocean floor topography, Currents (Gulf Stream, Kuroshio), Tides, Salinity',
      'Indian Physiography: Himalayas, Northern Plains, Peninsular Plateau, Coastal Plains, Islands',
      'Indian Drainage: Himalayan rivers (Ganga, Indus, Brahmaputra) vs Peninsular (Godavari, Krishna, Narmada)'
    ],
    upscSpecificNuances: [
      'Global climate change, IPCC reports, ENSO (El Niño / La Niña / Indian Ocean Dipole)',
      'Biomes, Ramsar wetlands, Coral bleaching, Deep ocean mineral exploration'
    ],
    rpscSpecificNuances: [
      'Four Physiographic Divisions of Rajasthan: Western Sandy Plains, Aravalli Range, Eastern Plains, Hadoti Plateau',
      'Aravalli Peaks elevation hierarchy: Guru Shikhar (1,722m), Ser (1,597m), Dilwara (1,442m), Jarga (1,431m)',
      'Inland drainage river systems: Kantli, Sabi, Kakni, Ruparel; Luni river basin (sweet till Balotra)',
      'Indira Gandhi Canal Project (IGNP) feeder length (204 km) and main canal command area'
    ],
    recommendedSyllabusTarget: 'rajasthan-physiography-and-drainage',
    recommendedVaultCategory: 'Physical Geography',
    recommendedBooks: ['NCERT Class 11 (Fundamentals of Physical Geography)', 'GC Leong (Certificate Physical Geography)', 'Dr. Bhalla (Rajasthan Geography)']
  },
  {
    id: 'rajasthan-minerals-economy',
    name: 'Rajasthan Geography & Minerals',
    nameHindi: 'राजस्थान का भूगोल एवं खनिज संपदा',
    overlapPercentage: 100,
    layer: 'Rajasthan Layer (20%)',
    commonCoreFocus: [
      'Mineral distribution in India vs Rajasthan mineral wealth ("Museum of Minerals")',
      'Lead-Zinc (Zawar, Rajpura Dariba), Copper (Khetri, Chandmari), Rock Phosphate (Jhamarkotra)'
    ],
    upscSpecificNuances: [
      'Critical and strategic mineral policy, renewable energy potential in Thar desert (solar insolation)'
    ],
    rpscSpecificNuances: [
      'Sole producer monopoly minerals: Wollastonite, Jasper, Selenite',
      'Major oilfields in Barmer-Sanchore basin (Mangala, Bhagyam, Aishwarya) and Pachpadra Refinery (HPCL Rajasthan)',
      'Rajasthan Industrial Development Policy, RIICO industrial areas, DMIC corridor coverage'
    ],
    recommendedSyllabusTarget: 'rajasthan-minerals-and-economic-survey',
    recommendedVaultCategory: 'Rajasthan Special',
    recommendedBooks: ['Rajasthan Economic Review', 'Dr. Hari Mohan Saxena (Geography of Rajasthan)']
  },
  {
    id: 'art-culture-forts',
    name: 'Art, Culture & Hill Forts',
    nameHindi: 'कला, संस्कृति एवं दुर्ग स्थापत्य',
    overlapPercentage: 100,
    layer: 'Rajasthan Layer (20%)',
    commonCoreFocus: [
      'UNESCO World Heritage monuments, classical and folk dance traditions of India'
    ],
    upscSpecificNuances: [
      'Temple architecture styles (Nagara, Dravida, Vesara), miniature painting schools'
    ],
    rpscSpecificNuances: [
      '6 UNESCO Hill Forts of Rajasthan (Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer, Jaisalmer - Chikoo Gaajar Aam)',
      'Folk deities (Panch Pir: Pabuji, Harbuji, Ramdevji, Mangaliya Mehaji, Gogaji)',
      'Folk dances (Ghoomar, Kalbeliya UNESCO list 2010, Gair, Chari, Terah Taali)',
      'Miniature painting sub-schools (Mewar, Kishangarh Bani Thani, Bundi Chitrashala, Dhundhar)'
    ],
    recommendedSyllabusTarget: 'indus-valley-civilisation',
    recommendedVaultCategory: 'Rajasthan Special',
    recommendedBooks: ['Jai Singh Neeraj (Cultural Heritage of Rajasthan)', 'Dr. Hukam Chand Jain']
  },
  {
    id: 'rajasthan-economic-schemes',
    name: 'Rajasthan Economic Review & Schemes',
    nameHindi: 'राजस्थान आर्थिक समीक्षा एवं फ्लैगशिप योजनाएं',
    overlapPercentage: 100,
    layer: 'Rajasthan Layer (20%)',
    commonCoreFocus: [
      'National macroeconomic aggregates (GDP, inflation, fiscal deficit, NITI Aayog SDGs)'
    ],
    upscSpecificNuances: [
      'Fiscal federalism, Finance Commission criteria, Centrally Sponsored Schemes architecture'
    ],
    rpscSpecificNuances: [
      'Rajasthan GSDP growth rate, sector-wise contribution (Agriculture, Industry, Services)',
      'Mukhyamantri Chiranjeevi / Ayushman Bharat Rajasthan health coverage',
      'Indira Rasoi / Annapurna Rasoi (subsidized nutritious meals)',
      'PM-KUSUM Component-A installations (Bhadla Solar Park Phalodi ~2,245 MW capacity)'
    ],
    recommendedSyllabusTarget: 'rajasthan-minerals-and-economic-survey',
    recommendedVaultCategory: 'Indian Economy',
    recommendedBooks: ['Directorate of Economics & Statistics (Aarthik Sameeksha)', 'DIPR Sujas Bulletin']
  }
];

interface OverlapSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectDetail: OverlapSubjectDetail | null;
  onExploreSyllabusTopic: (topicId: string) => void;
  onExploreKnowledgeVault: () => void;
}

export const OverlapSubjectModal: React.FC<OverlapSubjectModalProps> = ({
  isOpen,
  onClose,
  subjectDetail,
  onExploreSyllabusTopic,
  onExploreKnowledgeVault
}) => {
  if (!isOpen || !subjectDetail) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {subjectDetail.layer}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {subjectDetail.overlapPercentage}% Synergy
              </span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{subjectDetail.name}</span>
            </h2>
            <p className="text-xs text-slate-400 font-serif">{subjectDetail.nameHindi}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 1: Common Core Pillars */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Common Core Syllabus Pillars (70% Overlap)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subjectDetail.commonCoreFocus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: UPSC vs RPSC Exam Nuances Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPSC Column */}
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <Award className="w-4 h-4 text-blue-400" />
                <span>UPSC CSE Conceptual Nuances</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {subjectDetail.upscSpecificNuances.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RPSC Column */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>RPSC RAS Factual Nuances</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {subjectDetail.rpscSpecificNuances.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Recommended Standard Textbooks */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Standard Textbooks for This Module (Zero Coaching Dependency):</span>
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {subjectDetail.recommendedBooks.map((book, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-medium"
                >
                  📖 {book}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              onClose();
              onExploreKnowledgeVault();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Open in Curriculum Vault</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onExploreSyllabusTopic(subjectDetail.recommendedSyllabusTarget);
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>Launch Masterclass Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
