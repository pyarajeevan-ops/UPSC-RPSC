import React, { useState } from 'react';
import {
  MapPin,
  Shield,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Compass,
  Sparkles
} from 'lucide-react';
import { LanguageMedium } from '../types';

interface RajasthanVaultViewProps {
  language: LanguageMedium;
}

export const RajasthanVaultView: React.FC<RajasthanVaultViewProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<'heritage' | 'geography' | 'admin' | 'economy' | 'symbols'>('heritage');

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Visual Header with generated cartography */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-10" />
        <img
          src="/src/assets/images/rajasthan_heritage_map_1790483257623.jpg"
          alt="Rajasthan Cartography & Heritage Map"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 mix-blend-luminosity"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        <div className="relative z-20 p-6 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Dedicated 20% RPSC RAS Layer</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
            {language === 'Hindi'
              ? 'राजस्थान सामान्य ज्ञान एवं प्रशासनिक ज्ञानकोष'
              : 'Rajasthan Special Knowledge Vault'}
          </h2>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Continuously updated state-specific repository for Rajasthan History, Art, Culture, Geography, Polity, Budget, and Schemes.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
        {[
          { id: 'heritage', label: '1. Art, Forts & History' },
          { id: 'geography', label: '2. Geography & Minerals' },
          { id: 'admin', label: '3. Polity & State Institutions' },
          { id: 'economy', label: '4. Economy & Schemes' },
          { id: 'symbols', label: '5. Symbols & Demographics' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category 1: Art, Forts & History */}
      {activeCategory === 'heritage' && (
        <div className="space-y-4">
          {/* UNESCO Hill Forts Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
              <span>6 UNESCO World Heritage Hill Forts of Rajasthan (Inscribed 2013)</span>
              <span className="text-xs text-amber-400 font-mono">Mnemonic: Chikoo Gajar Aam</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mnemonic trick: <strong>Chi</strong> (Chittorgarh) + <strong>Koo</strong> (Kumbhalgarh) + <strong>Ga</strong> (Gagron) + <strong>Ja</strong> (Jaisalmer) + <strong>R</strong> (Ranthambore) + <strong>Aam</strong> (Amer).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-300 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">1. Chittorgarh Fort</span>
                Situated on Mesa plateau; largest fort in India; 3 historic Saka/Jauhar (1303, 1535, 1568); Vijay Stambha and Kirti Stambha.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">2. Kumbhalgarh Fort</span>
                Built by Maharana Kumbha in Rajsamand; second longest wall in the world (36 km); birthplace of Maharana Pratap; Katargarh inner citadel.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">3. Ranthambore Fort</span>
                Sawai Madhopur; situated amidst 7 hills; Hammir Dev Chauhan\'s valor (1301 siege by Alauddin Khalji); Trinetra Ganesha temple.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">4. Gagron Fort (Jhalawar)</span>
                Premier Jal Durg (Water Fort) of Rajasthan; situated at the confluence of Ahu and Kali Sindh rivers; no foundation base rock.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">5. Amer Fort (Jaipur)</span>
                Raja Man Singh I and Mirza Raja Jai Singh; fusion of Mughal and Rajput architecture; Sheesh Mahal, Diwan-i-Aam, Shila Devi temple.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">6. Sonar Qila / Jaisalmer Fort</span>
                Golden yellow sandstone; built by Rawal Jaisal in 1156 AD on Trikuta hill; Dhanvan Durg (Desert fort); Jain temples and Laxminath temple.
              </div>
            </div>
          </div>

          {/* Bhakti Saints & Folk Deities */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">
              Saints, Folk Deities & Mass Movements
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Guru Jambhoji & Bishnoi Sampradaya (1485 AD):</strong>
                Formulated 29 rules emphasizing environmental conservation and wildlife protection. Historic Khejarli sacrifice on Shukla Dashami of Bhadrapada 1730 led by Amrita Devi Bishnoi against Maharaja Abhai Singh\'s tree-felling.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Sant Dadu Dayal (1544–1603 AD):</strong>
                Known as the "Kabir of Rajasthan"; preached Nirguna Bhakti in Dhundhari dialect; established Dadu Panth with main seat at Naraina (Jaipur); met Akbar at Fatehpur Sikri in 1585.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Bijolia Peasant Movement (1897–1941):</strong>
                Longest non-violent peasant movement in world history (44 years); opposed 84 types of taxes (Lag-Bagh); led in stages by Sadhu Sitaram Das, Vijay Singh Pathik (Bhup Singh), and Manikya Lal Verma.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Mangarh Dham Massacre (17 Nov 1913):</strong>
                Bhil uprising led by Govind Giri (Samp Sabha founded 1883); British and princely troops fired on Mangarh hill (Banswara), martyring ~1,500 tribal people ("Jallianwala Bagh of Rajasthan").
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category 2: Geography & Minerals */}
      {activeCategory === 'geography' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Aravalli Mountain Range & Drainage Hierarchy</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">Aravalli Peak Elevation Order:</strong>
                Guru Shikhar (1722m, Sirohi) &gt; Ser (1597m, Sirohi) &gt; Dilwara (1442m, Sirohi) &gt; Jarga (1431m, Udaipur) &gt; Achalgarh (1380m, Sirohi) &gt; Kumbhalgarh (1224m, Rajsamand) &gt; Raghunathgarh (1055m, Sikar - highest in North Aravalli).
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">Drainage Systems Split:</strong>
                Inland Drainage (~60.2% - Ghaggar, Kantli, Kakney, Sabi, Ruparel) · Bay of Bengal (~22.4% - Chambal, Banas, Berach, Kali Sindh, Parbati) · Arabian Sea (~17.1% - Luni, Mahi, Sabarmati, West Banas).
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Mineral Monopolies of Rajasthan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-0.5">100% Monopoly Minerals:</span>
                Wollastonite, Jasper, Selenite, Lead & Zinc concentrates, primary Silver.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-0.5">Major Critical Mines:</span>
                Rampura Agucha (Bhilwara - Zinc), Zawar (Udaipur - Zinc/Silver), Jhamarkotra (Udaipur - Rock Phosphate), Degana (Nagaur - Tungsten).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category 3: Polity & State Institutions */}
      {activeCategory === 'admin' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">State Constitutional & Statutory Bodies</h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">Rajasthan Public Service Commission (RPSC):</strong>
                Constitutional body under Part XIV (Articles 315–323). Established at Jaipur on 20 August 1949, shifted to Ajmer (Satyanarayan Rao Committee). Composition: 1 Chairman + 7 Members. Tenure: 6 years or 62 years of age. Appointed by Governor, but removable ONLY by the President under Article 317.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">Rajasthan Lokayukta (1973 Act):</strong>
                Statutory anti-corruption body. First Lokayukta: Justice I.D. Dua (August 1973). Appointed by Governor on recommendation of a committee (CM, Leader of Opposition, CJ of HC). Investigates corruption allegations against ministers, MLAs, and public servants (Exemptions: Chief Minister, HC Judges, RPSC Chairman/Members).
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">State Human Rights Commission (SHRC):</strong>
                Constituted on 18 January 1999, became operational in March 2000 (First Chairperson: Justice Kanta Bhatnagar). Under the 2019 amendment, composition is 1 Chairperson + 2 Members (Chairperson can be former CJ or Judge of a High Court).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category 4: Economy & Schemes */}
      {activeCategory === 'economy' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Key Flagship Schemes & Projects</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">ERCP (Eastern Rajasthan Canal Project):</strong>
                Interlinks rivers in southern/eastern Rajasthan (Chambal, Kunnu, Kul, Parbati, Kalisindh) to transfer surplus monsoon water to 21 water-deficit districts (including Jaipur, Alwar, Dausa, Bharatpur, Kota, Ajmer).
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Mukhyamantri Ayushman Arogya Yojana:</strong>
                Comprehensive cashless health insurance coverage for all eligible families of Rajasthan in empanelled government and private hospitals.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Pachpadra Refinery (HRRL):</strong>
                9 MMTPA capacity petroleum refinery-cum-petrochemical complex at Pachpadra (Balotra district); joint venture 74:26 between HPCL and Government of Rajasthan.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category 5: Symbols & Demographics */}
      {activeCategory === 'symbols' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Official State Symbols & Census 2011 Data</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">State Tree:</span>
                Khejri (<em>Prosopis cineraria</em>) - Declared 1983; "Kalpvriksha of Thar"; revered by Bishnois.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">State Flower:</span>
                Rohida (<em>Tecomella undulata</em>) - "Maru Shobha" / Desert Teak; blooms in March-April.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">State Bird:</span>
                Godawan / Great Indian Bustard (<em>Ardeotis nigriceps</em>) - Critically Endangered; Desert National Park.
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">State Animals:</span>
                Chinkara (Wildlife category, 1981) and Camel (Domestic category, declared 2014).
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 col-span-1 sm:col-span-2">
                <span className="font-bold text-amber-400 block mb-0.5">Census 2011 Key Demographic Facts:</span>
                Total Population: 6.85 Crore (~5.66% of India) · Sex Ratio: 928 (Child Sex Ratio: 888) · Literacy Rate: 66.1% (Male: 79.2%, Female: 52.1% - second lowest in India after Bihar) · Highest Density: Jaipur (595), Lowest: Jaisalmer (17).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
