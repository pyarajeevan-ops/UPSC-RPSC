export interface SelfTeachModule {
  id: string;
  phaseId: 'phase-1' | 'phase-2' | 'phase-3' | 'phase-4';
  title: string;
  titleHindi: string;
  subject: string;
  weekRange: string;
  targetExam: 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'UPSC_EXCLUSIVE';
  importance: 'CRITICAL_HIGH_YIELD' | 'CORE_FOUNDATION' | 'RANK_DETERMINER';
  estimatedHours: number;
  overview: string;
  requiredReadings: Array<{
    book: string;
    chapters: string;
    priority: 'Must Read' | 'Reference';
  }>;
  dailyBreakdown: Array<{
    dayNumber: number;
    focus: string;
    actionableTask: string;
    pyqTarget: string;
  }>;
  selfAssessmentChecklist: string[];
  dualStrategyNote: string;
  linkedSyllabusCode?: string;
  linkedLessonId?: string;
}

export interface SelfTeachPhase {
  id: 'phase-1' | 'phase-2' | 'phase-3' | 'phase-4';
  number: number;
  title: string;
  titleHindi: string;
  subtitle: string;
  duration: string;
  totalHoursEst: number;
  modulesCount: number;
  description: string;
  targetOutcome: string;
  modules: SelfTeachModule[];
}

export const SELF_TEACH_PHASES_DATA: SelfTeachPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Common Core Foundations (70% Overlap)',
    titleHindi: 'साझा आधारभूत पाठ्यक्रम (70% ओवरलैप)',
    subtitle: 'High-Yield UPSC Conceptual Rigor & RPSC Core Alignment',
    duration: 'Weeks 1 – 10 (10 Weeks)',
    totalHoursEst: 320,
    modulesCount: 5,
    description: 'Master the macro conceptual subjects that form the bedrock of both UPSC CSE and RPSC RAS Prelims and Mains. Dual-learning strategy ensures zero duplication of effort.',
    targetOutcome: 'Score 85+ marks in UPSC GS 1 Prelims and 60+ marks in RPSC RAS General Studies paper right from the core foundation.',
    modules: [
      {
        id: 'mod-polity-core',
        phaseId: 'phase-1',
        title: 'Constitutional Architecture, Fundamental Rights & Governance',
        titleHindi: 'संवैधानिक ढांचा, मौलिक अधिकार एवं शासन व्यवस्था',
        subject: 'Indian Polity & Constitution',
        weekRange: 'Weeks 1 – 3',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 65,
        overview: 'Complete reading of Indian Constitution from Historical Evolution, Preamble, Fundamental Rights (Articles 12-35), DPSPs, Fundamental Duties to Federalism and Emergency.',
        requiredReadings: [
          { book: 'M. Laxmikanth (Indian Polity 7th/8th Ed.)', chapters: 'Chapters 1 to 17 (Constitutional Framework & Rights)', priority: 'Must Read' },
          { book: 'NCERT Class 11: Indian Constitution at Work', chapters: 'Chapters 1, 2, 6, 8 (Constitution as Living Document)', priority: 'Must Read' },
          { book: 'Official Bare Act (Constitution of India)', chapters: 'Articles 1 to 51A verbatim memorization', priority: 'Reference' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Historical Underpinnings & Preamble', actionableTask: 'Compare 1919 and 1935 Acts; analyze Kesavananda Bharati basic structure doctrine.', pyqTarget: 'Solve 15 UPSC & 10 RPSC PYQs on Preamble' },
          { dayNumber: 2, focus: 'Fundamental Rights (Articles 14–18 & 19)', actionableTask: 'Chart reasonable restrictions under 19(2); Right to Privacy (Puttaswamy 9-judge bench).', pyqTarget: 'Solve 20 UPSC Prelims PYQs on Art 14, 19, 21' },
          { dayNumber: 3, focus: 'Writs Jurisdiction & Emergency Articles', actionableTask: 'Draft comparative matrix: Article 32 vs 226; Article 352 vs 356 vs 360.', pyqTarget: 'Analyze 5 mains questions on Judicial Review' }
        ],
        selfAssessmentChecklist: [
          'Can recite all 6 Fundamental Rights and their exact constitutional exceptions.',
          'Understand why the Preamble is non-justiciable yet an integral part of the Basic Structure.',
          'Differentiate between Quo-Warranto and Mandamus with regards to private entities.',
          'Know how the 44th Constitutional Amendment Act (1978) strengthened Article 20 and 21 during Emergency.'
        ],
        dualStrategyNote: 'UPSC questions test judicial interpretations and analytical checks & balances; RPSC tests the exact article number, clause numbers (e.g. 19(1)(a) vs 19(2)), and committee names.',
        linkedSyllabusCode: 'UPSC-PRE-POL-01',
        linkedLessonId: 'panchayati-raj-local-gov'
      },
      {
        id: 'mod-polity-panchayat',
        phaseId: 'phase-1',
        title: 'Democratic Decentralization: 73rd/74th CAA & Local Governance',
        titleHindi: 'पंचायती राज एवं स्थानीय स्वशासन (73वां/74वां संशोधन)',
        subject: 'Indian Polity & Rajasthan Governance',
        weekRange: 'Weeks 3 – 4',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 35,
        overview: 'In-depth study of Part IX, Part IX-A, PESA Act 1996, and the Rajasthan Panchayati Raj Act 1994 with 6th State Finance Commission recommendations.',
        requiredReadings: [
          { book: 'M. Laxmikanth', chapters: 'Chapter 38 (Panchayati Raj) & Chapter 39 (Municipalities)', priority: 'Must Read' },
          { book: 'Rajasthan Adhyayan Class 10 / Economic Survey', chapters: 'Rural Development & Panchayati Raj in Rajasthan', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Articles 243A to 243O Analysis', actionableTask: 'Categorize mandatory provisions vs discretionary provisions of 73rd CAA.', pyqTarget: 'UPSC 2016, 2018, 2020, 2021 Panchayati Raj questions' },
          { dayNumber: 2, focus: 'PESA Act 1996 & Rajasthan Model', actionableTask: 'Master Gram Sabha powers in Scheduled Areas and Nagaur 1959 historical milestones.', pyqTarget: 'RPSC 2021 & 2023 PRI boundary delimitation questions' }
        ],
        selfAssessmentChecklist: [
          'Know that the State Election Commissioner is appointed by Governor but removed ONLY like a High Court Judge by President.',
          'Memorize the 29 subjects under 11th Schedule and 18 under 12th Schedule.',
          'Know that Rajasthan provides 50% reservation for women in PRIs (amended in 2008).'
        ],
        dualStrategyNote: 'Rajasthan is the pioneer state (Nagaur, 2 Oct 1959). RPSC treats this as a core scoring unit every single exam year.',
        linkedSyllabusCode: 'UPSC-PRE-POL-02',
        linkedLessonId: 'panchayati-raj-local-gov'
      },
      {
        id: 'mod-modern-history',
        phaseId: 'phase-1',
        title: 'Modern Indian Freedom Struggle (1857 – 1947)',
        titleHindi: 'आधुनिक भारत का स्वतंत्रता संघर्ष (1857 - 1947)',
        subject: 'Modern Indian History',
        weekRange: 'Weeks 5 – 7',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 70,
        overview: 'Chronological mastery of Early Nationalist Phase, Swadeshi Movement (1905), Gandhian Satyagrahas, Revolutionary Phase, British Acts (1909, 1919, 1935), and Independence/Partition.',
        requiredReadings: [
          { book: 'Spectrum: A Brief History of Modern India (Rajiv Ahir)', chapters: 'Chapters 8 to 28 (Freedom Struggle & British Policies)', priority: 'Must Read' },
          { book: 'NCERT Class 12: Themes in Indian History Part III', chapters: 'Colonialism and Gandhi and the Nationalist Movement', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: '1857 Revolt & Early Phase', actionableTask: 'Tabulate leaders, centres of 1857, British commanders; Moderates vs Extremists ideological differences.', pyqTarget: '15 UPSC Prelims PYQs on early Congress' },
          { dayNumber: 2, focus: 'Swadeshi & Revolutionary Nationalism', actionableTask: 'Analyse Partition of Bengal, Surat Split 1907, Ghadar Party, and Home Rule Movement.', pyqTarget: 'UPSC 2017 & 2019 Swadeshi movement questions' },
          { dayNumber: 3, focus: 'Non-Cooperation, Civil Disobedience & 1935 Act', actionableTask: 'Chart Round Table Conferences, Poona Pact 1932, Dyarchy vs Provincial Autonomy.', pyqTarget: 'UPSC & RPSC questions on 1935 Act' }
        ],
        selfAssessmentChecklist: [
          'Can chronologically order Cabinet Mission, Cripps Mission, August Offer, and Wavell Plan without confusion.',
          'Understand the difference between Provincial Dyarchy (1919) and Dyarchy at the Centre (1935).',
          'Identify role of peasant and tribal movements (Moplah, Bardoli, Tebhaga, Santhal).'
        ],
        dualStrategyNote: 'UPSC questions focus on socio-economic impact and ideological factions; RPSC directly asks dates, publication names of newspapers, and founder names.',
        linkedSyllabusCode: 'UPSC-PRE-HIST-01'
      },
      {
        id: 'mod-physical-geography',
        phaseId: 'phase-1',
        title: 'Physical Geography & Indian Monsoon Dynamics',
        titleHindi: 'भौतिक भूगोल एवं भारतीय मानसून तंत्र',
        subject: 'Geography of India & World',
        weekRange: 'Weeks 8 – 9',
        targetExam: 'COMMON_CORE',
        importance: 'CORE_FOUNDATION',
        estimatedHours: 50,
        overview: 'Geomorphology, Plate tectonics, Climatology (Pressure belts, Jet streams, Monsoons, ENSO, IOD), and Indian drainage basins.',
        requiredReadings: [
          { book: 'NCERT Class 11: Fundamentals of Physical Geography', chapters: 'Unit II (Earth), Unit IV (Climate), Unit V (Water)', priority: 'Must Read' },
          { book: 'NCERT Class 11: India Physical Environment', chapters: 'Structure & Physiography, Drainage System, Climate', priority: 'Must Read' },
          { book: 'Oxford Student Atlas for India', chapters: 'Indian River Basins & Mountain Passes', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Earth Structure & Geomorphic Processes', actionableTask: 'Diagram P-wave and S-wave shadow zones; continental drift and plate boundaries.', pyqTarget: 'UPSC physical geography questions' },
          { dayNumber: 2, focus: 'Indian Monsoon Mechanisms', actionableTask: 'Explain Tibetan heating, Somali jet, ITCZ shifts, positive vs negative Indian Ocean Dipole.', pyqTarget: 'UPSC 2017 & 2022 Monsoon and IOD questions' },
          { dayNumber: 3, focus: 'Indian River Tributaries Matrix', actionableTask: 'Map left-bank and right-bank tributaries of Indus, Ganga, Godavari, and Krishna.', pyqTarget: 'UPSC river tributaries map questions' }
        ],
        selfAssessmentChecklist: [
          'Able to locate all major Peninsular river origins (Trimbak, Mahabaleshwar, Brahmagiri, Amarkantak).',
          'Understand why El Niño suppresses the Indian monsoon while positive IOD bolsters it.',
          'Explain why tropical cyclones do not form near the equator.'
        ],
        dualStrategyNote: 'Mastering Indian drainage and climatology builds 80% of the foundation needed for Rajasthan drainage (which connects to Arabian Sea and Bay of Bengal).',
        linkedSyllabusCode: 'UPSC-PRE-GEO-01'
      },
      {
        id: 'mod-macro-economics',
        phaseId: 'phase-1',
        title: 'Macroeconomics, Monetary Policy & Fiscal System',
        titleHindi: 'समष्टि अर्थशास्त्र, मौद्रिक नीति एवं राजकोषीय प्रणाली',
        subject: 'Indian Economy & Banking',
        weekRange: 'Weeks 9 – 10',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 50,
        overview: 'National Income calculation, Inflation indices (CPI vs WPI), RBI monetary policy tools (Repo, SDF, CRR, SLR), Balance of Payments, and Union Budget deficits.',
        requiredReadings: [
          { book: 'NCERT Class 12: Introductory Macroeconomics', chapters: 'National Income Accounting, Money and Banking, Government Budget', priority: 'Must Read' },
          { book: 'Mrunal Patel Economy Notes / Ramesh Singh', chapters: 'Pillar 1 (Money Banking), Pillar 2 (Budget), Pillar 3 (BoP)', priority: 'Must Read' },
          { book: 'Union Budget & Economic Survey Highlights', chapters: 'Key Macro Indicators & Deficit targets', priority: 'Reference' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'RBI Tools & Inflation Targeting', actionableTask: 'Understand MPC structure, Headline vs Core inflation, Standing Deposit Facility (SDF).', pyqTarget: 'UPSC 2020-2023 RBI monetary policy questions' },
          { dayNumber: 2, focus: 'Fiscal Deficit & Government Debt', actionableTask: 'Differentiate Revenue Deficit, Fiscal Deficit, Primary Deficit; FRBM Act targets.', pyqTarget: 'UPSC & RPSC budget conceptual questions' },
          { dayNumber: 3, focus: 'Balance of Payments & Forex', actionableTask: 'Analyze Current Account Deficit, NEER vs REER, Foreign Portfolio Investment vs FDI.', pyqTarget: 'BoP and exchange rate PYQs' }
        ],
        selfAssessmentChecklist: [
          'Understand why money multiplier decreases when CRR is hiked.',
          'Know that CPI Combined is the official metric for RBI inflation targeting (4% ± 2%).',
          'Explain difference between Capital Account convertibility and Current Account convertibility.'
        ],
        dualStrategyNote: 'Concepts of fiscal deficit and inflation apply directly to understanding the Rajasthan State Budget and FRBM compliance.',
        linkedSyllabusCode: 'UPSC-PRE-ECON-01'
      }
    ]
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Rajasthan Substantive Vault (20% High-Scoring Layer)',
    titleHindi: 'राजस्थान विशेष ज्ञान कोष (20% उच्च अंकदायी स्तर)',
    subtitle: 'RPSC RAS Rank Determiner & Rajasthan Factual Vault',
    duration: 'Weeks 11 – 18 (8 Weeks)',
    totalHoursEst: 260,
    modulesCount: 4,
    description: 'The exclusive 20% Rajasthan syllabus is the make-or-break differentiator for clearing RPSC RAS Prelims and dominating Mains Papers 1, 2, and 3. Factual retention and standard state sources are paramount.',
    targetOutcome: 'Score 45+ marks from the 50+ Rajasthan-specific questions in RPSC RAS Prelims, securing guaranteed qualification.',
    modules: [
      {
        id: 'mod-raj-geo-phys',
        phaseId: 'phase-2',
        title: 'Rajasthan Physical Divisions, Aravalli & 3 Drainage Systems',
        titleHindi: 'राजस्थान के भौतिक प्रदेश, अरावली एवं त्रिविध अपवाह तंत्र',
        subject: 'Geography of Rajasthan',
        weekRange: 'Weeks 11 – 13',
        targetExam: 'RAJASTHAN_EXCLUSIVE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 65,
        overview: '4 Physical divisions (Western Sandy Desert, Aravalli Mountain Range, Eastern Plains, Hadoti Plateau), 3 River Drainage systems (Bay of Bengal, Arabian Sea, Inland Drainage), and Major Minerals.',
        requiredReadings: [
          { book: 'Dr. Hari Mohan Saxena (Rajasthan Ka Bhugol - Rajasthan Hindi Granth Akademi)', chapters: 'Physical Divisions, Drainage, Climate & Soils', priority: 'Must Read' },
          { book: 'Rajasthan Adhyayan Class 9 (Bhugol)', chapters: 'Complete Book', priority: 'Must Read' },
          { book: 'Rajasthan Economic Survey (Current Year)', chapters: 'Mining and Oil & Gas Sector', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Aravalli Range & Peak Heights', actionableTask: 'Memorize order of peaks: Guru Shikhar (1722m), Ser (1597m), Dilwara (1442m), Jarga (1431m), Achalgarh (1380m).', pyqTarget: 'RPSC 2018, 2021, 2023 Aravalli peak elevation questions' },
          { dayNumber: 2, focus: '3 River Drainage Systems', actionableTask: 'Classify rivers: Arabian Sea (Luni, Mahi, Sabarmati, West Banas), Bay of Bengal (Chambal, Banas, Banganga), Inland (Ghaggar, Kantli, Sabi).', pyqTarget: 'RPSC river origin and tributary matching questions' },
          { dayNumber: 3, focus: 'Monopoly Minerals of Rajasthan', actionableTask: 'Note locations of Wollastonite, Lead-Zinc (Zawar, Rampura Agucha), Gypsum, and Rock Phosphate (Jhamarkotra).', pyqTarget: 'RPSC mineral and district pairing questions' }
        ],
        selfAssessmentChecklist: [
          'Can list top 8 Aravalli peaks in descending order of elevation with their districts.',
          'Understand that Chambal forms the inter-state boundary between Rajasthan and Madhya Pradesh.',
          'Know that Rajasthan has 100% near-monopoly in Wollastonite and Jasper production.'
        ],
        dualStrategyNote: 'UPSC rarely asks Rajasthan physical geography, but RPSC asks at least 8 to 10 direct factual questions every year.',
        linkedSyllabusCode: 'RPSC-PRE-RAJ-02'
      },
      {
        id: 'mod-raj-hist-forts',
        phaseId: 'phase-2',
        title: '6 UNESCO Hill Forts, Major Dynasties & Folk Deities',
        titleHindi: 'राजस्थान के 6 यूनेस्को दुर्ग, राजवंश एवं लोक देवता',
        subject: 'History, Art & Culture of Rajasthan',
        weekRange: 'Weeks 13 – 15',
        targetExam: 'RAJASTHAN_EXCLUSIVE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 70,
        overview: 'In-depth study of Chittorgarh, Kumbhalgarh, Ranthambore, Gagron (water fort), Amer, Jaisalmer; Major Dynasties (Mewar, Rathores, Kachwahas); Panchpir and Folk Deities (Ramdevji, Pabuji, Tejaji, Gogaji).',
        requiredReadings: [
          { book: 'Dr. Jai Singh Neeraj / Dr. Hukum Chand Jain (Rajasthan Ka Itihas, Sanskriti)', chapters: 'Forts, Temples, Folk Deities & Paintings', priority: 'Must Read' },
          { book: 'Rajasthan Adhyayan Class 10 (Sanskriti)', chapters: 'Folk deities, Fairs, Festivals & Architecture', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: '6 UNESCO Hill Forts Architecture', actionableTask: 'Analyze architectural features: Kumbhalgarh wall (36km), Gagron Jhalawar water fort, Chittorgarh Vijay Stambh.', pyqTarget: 'RPSC 2013-2023 Fort and architectural questions' },
          { dayNumber: 2, focus: 'Panchpir & Lokdevtas of Rajasthan', actionableTask: 'Tabulate: Ramdevji (Runecha, Kamadiya panth), Pabuji (Camel protector, Kolu), Gogaji (Dadrrewa, Gogamedi).', pyqTarget: 'RPSC folk deity and main shrine questions' },
          { dayNumber: 3, focus: 'Mewar & Marwar Resistance', actionableTask: 'Study Maharana Kumbha cultural achievements (Sangeet Raj) and Maharana Pratap battles (Haldighati 1576, Dewair 1582).', pyqTarget: 'RPSC dynasty and literary patron questions' }
        ],
        selfAssessmentChecklist: [
          'Can name the 6 UNESCO hill forts inscribed in 2013 without missing one.',
          'Know the 5 Panchpir (Ramdevji, Pabuji, Gogaji, Mehaji Mangaliya, Harbhuji).',
          'Differentiate between Gagron (Water Fort / Audak Durg) and Jaisalmer (Desert Fort / Dhanvan Durg).'
        ],
        dualStrategyNote: 'UPSC tests Art & Culture conceptually (Nagara vs Dravida); RPSC tests specific local architectural elements, local names, and patron rulers.',
        linkedSyllabusCode: 'RPSC-PRE-RAJ-01'
      },
      {
        id: 'mod-raj-admin-bodies',
        phaseId: 'phase-2',
        title: 'Rajasthan Administrative Setup & Constitutional Statutory Bodies',
        titleHindi: 'राजस्थान प्रशासनिक व्यवस्था एवं संवैधानिक/सांविधिक आयोग',
        subject: 'Administrative Setup of Rajasthan',
        weekRange: 'Weeks 15 – 17',
        targetExam: 'RAJASTHAN_EXCLUSIVE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 65,
        overview: 'Governor of Rajasthan (constitutional powers and state precedents), Chief Minister, State Secretariat (CS role), High Court of Rajasthan, RPSC, State Human Rights Commission, Lokayukta, and State Information Commission.',
        requiredReadings: [
          { book: 'Dr. Janak Singh Meena (Rajasthan Ki Rajvyavastha)', chapters: 'Complete Book on State Administration', priority: 'Must Read' },
          { book: 'Official Websites of RPSC, SHRC, Lokayukta', chapters: 'Mandates, Composition & Annual Reports', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Governor Precedents & Article 163', actionableTask: 'Tabulate all Presidents Rule instances in Rajasthan (1967, 1977, 1980, 1992); Governors in office.', pyqTarget: 'RPSC 2021 & 2023 Governor questions' },
          { dayNumber: 2, focus: 'RPSC Composition & Article 316', actionableTask: 'Study 1 Chairman + 7 Members structure; first Chairman (Sir S.K. Ghosh); removal procedure under Article 317.', pyqTarget: 'RPSC questions on its own establishment' },
          { dayNumber: 3, focus: 'SHRC, Lokayukta & Public Services Act', actionableTask: 'Analyze Rajasthan Guaranteed Delivery of Public Services Act 2011; Lokayukta jurisdiction and exclusions.', pyqTarget: 'RPSC questions on statutory bodies' }
        ],
        selfAssessmentChecklist: [
          'Understand that RPSC members are appointed by Governor but removed ONLY by the President upon SC inquiry.',
          'Know that the Chief Minister is excluded from the jurisdiction of the Rajasthan Lokayukta.',
          'Recall all 4 instances of President Rule in Rajasthan with year and sitting Governor.'
        ],
        dualStrategyNote: 'Governor is common to UPSC and RPSC, but RPSC asks who was the Governor during specific political events or specific constitutional crises in Rajasthan history.',
        linkedSyllabusCode: 'RPSC-PRE-RAJ-03'
      },
      {
        id: 'mod-raj-econ-survey',
        phaseId: 'phase-2',
        title: 'Rajasthan Economic Survey & Flagship Welfare Schemes',
        titleHindi: 'राजस्थान आर्थिक समीक्षा एवं प्रमुख फ्लैगशिप योजनाएं',
        subject: 'Economy of Rajasthan & Current Schemes',
        weekRange: 'Weeks 17 – 18',
        targetExam: 'RAJASTHAN_EXCLUSIVE',
        importance: 'RANK_DETERMINER',
        estimatedHours: 60,
        overview: 'Gross State Domestic Product (GSDP), Sectoral contributions (Agriculture, Industry, Services), 10 Agro-Climatic Zones, Sujas welfare schemes, and Sustainable Development Goals (SDG) district rankings.',
        requiredReadings: [
          { book: 'Government of Rajasthan: Economic Survey (Latest Year)', chapters: 'Chapters 1 to 8 (Executive Summary, Agriculture, Industry, Social Services)', priority: 'Must Read' },
          { book: 'DIPR Rajasthan: Sujas Monthly Magazine', chapters: 'Last 6 Months issues on flagship schemes', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Macro Indicators of Rajasthan Economy', actionableTask: 'Note exact GSDP at current & constant prices; per capita income; sectoral growth rates.', pyqTarget: 'RPSC 2021 & 2023 Economic Survey data questions' },
          { dayNumber: 2, focus: '10 Agro-Climatic Zones of Rajasthan', actionableTask: 'Map all 10 zones: Ia to V, noting major crops (Bajra, Mustard, Guar, Isabgol) and districts.', pyqTarget: 'RPSC agro-climatic zone questions' },
          { dayNumber: 3, focus: 'Flagship Social Welfare Schemes', actionableTask: 'Summarize eligibility, benefits, and launching dates of key health, pension, and education schemes.', pyqTarget: 'RPSC scheme provisions and budget allocation questions' }
        ],
        selfAssessmentChecklist: [
          'Recall exact sectoral share of Agriculture, Industry, and Services in Rajasthan GSDP.',
          'Identify Zone Ic (Hyper Arid Partially Irrigated) and Zone IVb (Sub-Humid Southern Plains).',
          'Know the district ranking order in Rajasthan SDG Index.'
        ],
        dualStrategyNote: 'Economic Survey provides up to 15-18 direct questions in RPSC RAS Prelims. It must be revised at least 3 times before the exam.',
        linkedSyllabusCode: 'RPSC-PRE-RAJ-04'
      }
    ]
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Mains Specialization, Ethics & Language (Rank Deciders)',
    titleHindi: 'मुख्य परीक्षा विशिष्टीकरण, नीतिशास्त्र एवं भाषा (रैंक निर्धारक)',
    subtitle: 'Descriptive Writing, Case Studies & RAS Paper 4 Domination',
    duration: 'Weeks 19 – 26 (8 Weeks)',
    totalHoursEst: 250,
    modulesCount: 3,
    description: 'Prepare the high-scoring descriptive papers that decide the final merit list: Administrative Ethics (UPSC GS 4 + RAS Paper 2), Public Administration, and RAS Paper 4 (General Hindi 120M & English 80M).',
    targetOutcome: 'Score 120+ in UPSC Ethics and 110+ in RAS Paper 4 (Hindi/English), ensuring top-50 rank positioning.',
    modules: [
      {
        id: 'mod-ethics-case',
        phaseId: 'phase-3',
        title: 'Ethics, Integrity, Aptitude & Nishkama Karma',
        titleHindi: 'नीतिशास्त्र, सत्यनिष्ठा, अभिरुचि एवं निष्काम कर्म',
        subject: 'General Studies Paper IV (Ethics) & RAS Paper 2',
        weekRange: 'Weeks 19 – 21',
        targetExam: 'COMMON_CORE',
        importance: 'RANK_DETERMINER',
        estimatedHours: 80,
        overview: 'Human Values, Attitude, Emotional Intelligence, Probity in Governance, Gita Nishkama Karma philosophy, Lokpal, RTI, and solving complex administrative case studies.',
        requiredReadings: [
          { book: 'Subba Rao & P.N. Roy Chowdhury (Ethics, Integrity and Aptitude)', chapters: 'Foundations of Ethics, Public Service Values & Case Studies', priority: 'Must Read' },
          { book: '2nd Administrative Reforms Commission (ARC)', chapters: '4th Report: Ethics in Governance', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Moral Thinkers & Gita Philosophy', actionableTask: 'Compare Western deontology (Kant) vs Indian Nishkama Karma; Gandhian Seven Sins.', pyqTarget: 'UPSC 2018-2022 Ethics thinkers questions' },
          { dayNumber: 2, focus: 'Emotional Intelligence in Administration', actionableTask: 'Write model answers on handling public agitation, communal tension, and stress.', pyqTarget: 'UPSC & RAS administrative ethics questions' },
          { dayNumber: 3, focus: 'Case Study Solving Framework', actionableTask: 'Apply stakeholder matrix, legal compliance, moral dilemmas, and long-term recommendations.', pyqTarget: 'Solve 6 UPSC GS 4 case studies under timed conditions' }
        ],
        selfAssessmentChecklist: [
          'Can write a 150-word answer on Nishkama Karma in modern civil service.',
          'Mastered the 6-step framework for resolving administrative case studies.',
          'Memorized key quotes from Gandhi, Swami Vivekananda, and Dr. B.R. Ambedkar for ethics answers.'
        ],
        dualStrategyNote: 'RAS Paper 2 contains a dedicated 65-mark unit on Ethics that closely mirrors UPSC GS 4, offering 100% synergy.',
        linkedSyllabusCode: 'UPSC-MAINS-GS4-01'
      },
      {
        id: 'mod-ras-paper4-lang',
        phaseId: 'phase-3',
        title: 'RAS Paper 4: General Hindi Grammar & General English',
        titleHindi: 'RAS प्रश्नपत्र 4: सामान्य हिंदी व्याकरण एवं सामान्य अंग्रेजी',
        subject: 'RPSC RAS Mains Paper 4 (200 Marks Total)',
        weekRange: 'Weeks 22 – 24',
        targetExam: 'RAJASTHAN_EXCLUSIVE',
        importance: 'RANK_DETERMINER',
        estimatedHours: 90,
        overview: 'Hindi Grammar (50M: Sandhi, Samas, Upsarg, Pratyay, Vilom, Paryayvachi, Muhavare), Composition (50M: Sankshiptikaran, Pallavan, Patra Lekhan, Nibandh), English Grammar & Composition (80M).',
        requiredReadings: [
          { book: 'Dr. Raghav Prakash (Samanya Hindi)', chapters: 'Vyakaran (Grammar), Patra Lekhan & Nibandh', priority: 'Must Read' },
          { book: 'Wren & Martin / B.K. Rastogi (English for RAS)', chapters: 'Grammar, Précis Writing, Elaboration & Translation', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Hindi Sandhi, Upsarg & Pratyay', actionableTask: 'Practice 50 Sandhi split examples and identify Sanskrit vs Hindi vs Urdu prefixes.', pyqTarget: 'Solve RAS 2013-2021 Hindi grammar questions' },
          { dayNumber: 2, focus: 'Official Letter Writing & Noting', actionableTask: 'Draft formats for Karyalaya Gyapan (Office Memo), Paripatra (Circular), and Adhisuchna (Notification).', pyqTarget: 'Write 3 official letters as per Rajasthan Government secretariat manual' },
          { dayNumber: 3, focus: 'English Précis & Comprehension', actionableTask: 'Write a 1/3rd precis with suitable title; translate a 100-word paragraph from English to Hindi.', pyqTarget: 'RAS Paper 4 previous year English sections' }
        ],
        selfAssessmentChecklist: [
          'Accurately identify all 10 types of official government correspondence formats.',
          'Able to write error-free Sandhi rules for Visarga and Vyanjan Sandhi.',
          'Secure 70+ accuracy in RAS English grammar section (Articles, Prepositions, Phrasal Verbs).'
        ],
        dualStrategyNote: 'Paper 4 is the single highest scoring paper in RAS Mains (averages 120+ for toppers). It has no UPSC equivalent and requires dedicated daily practice.',
        linkedSyllabusCode: 'RPSC-MAINS-P4-01'
      },
      {
        id: 'mod-env-biodiversity',
        phaseId: 'phase-3',
        title: 'Environment, Biodiversity, Climate & Acts (WPA 1972 / EPA 1986)',
        titleHindi: 'पर्यावरण, जैव विविधता, जलवायु एवं प्रमुख अधिनियम',
        subject: 'Ecology & Environmental Legislation',
        weekRange: 'Weeks 25 – 26',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 80,
        overview: 'Ecosystem trophic levels, IUCN Red List status of key species, Wildlife Protection Act 1972 (2022 amendment schedules), UNFCCC COP decisions, Ramsar sites, and Rajasthan Protected Areas (Ranthambore, Sariska, Mukundra, Ramgarh Vishdhari).',
        requiredReadings: [
          { book: 'Shankar IAS Environment / PMF IAS', chapters: 'Ecology, Biodiversity, Protected Area Network & Legislation', priority: 'Must Read' },
          { book: 'MoEFCC Annual Compendium & Down To Earth', chapters: 'Climate Change Summits & Project Tiger 50 Years', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'WPA 1972 Amendment (2022) & CITES', actionableTask: 'Note reduction from 6 schedules to 4; powers of Chief Wildlife Warden; CITES specimen regulations.', pyqTarget: 'UPSC 2023 environment legislation questions' },
          { dayNumber: 2, focus: 'Protected Area Network in Rajasthan', actionableTask: 'Map Rajasthan 5 Tiger Reserves (including Dholpur-Karauli 5th Tiger Reserve); Keoladeo & Sambhar Ramsar sites.', pyqTarget: 'RPSC and UPSC wildlife sanctuary questions' },
          { dayNumber: 3, focus: 'Climate Change Conventions & NDCs', actionableTask: 'Analyze Paris Agreement targets; India updated NDCs (45% emissions intensity reduction by 2030, Net Zero by 2070).', pyqTarget: 'UPSC prelims international treaties questions' }
        ],
        selfAssessmentChecklist: [
          'Understand the difference between National Parks, Wildlife Sanctuaries, and Conservation Reserves.',
          'Know why Keoladeo National Park is on the Montreux Record.',
          'Explain why Indian Forest Service (IFS) integration with UPSC Prelims makes environment questions 18-20% of the entire paper.'
        ],
        dualStrategyNote: 'Environment is a giant component of UPSC Prelims (18-22 questions). In RPSC, focus on Rajasthan Tiger Reserves, Great Indian Bustard (Godawan), and Bishnoi conservation tradition.',
        linkedSyllabusCode: 'UPSC-PRE-ENV-01'
      }
    ]
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Test Drills, Elimination Mastery & 5-3-2-1-1 Recall',
    titleHindi: 'मॉक टेस्ट अभ्यास, एलिमिनेशन तकनीक एवं 5-3-2-1-1 पुनरावृत्ति',
    subtitle: 'Exam-Hall Conditioning, 5th Option Discipline & Error Remediation',
    duration: 'Weeks 27 – 34 (8 Weeks)',
    totalHoursEst: 240,
    modulesCount: 2,
    description: 'Transition from passive learning to active combat conditioning. Master the 4-tier elimination protocol for UPSC and the 5th Option negative-marking avoidance discipline for RPSC.',
    targetOutcome: 'Minimize negative marks to below 5 per paper, achieve 110+ in UPSC mock simulations and 95+ in RPSC full-length mocks.',
    modules: [
      {
        id: 'mod-elimination-drills',
        phaseId: 'phase-4',
        title: 'Cognitive Traps, Inverted Stems & RPSC 5th Option Mastery',
        titleHindi: 'एग्जामिनर ट्रैप, विपरीत प्रश्न एवं आरपीएससी 5वां विकल्प अनुशासन',
        subject: 'Exam Strategy & Test Tactics',
        weekRange: 'Weeks 27 – 30',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 120,
        overview: 'Systematic elimination drill: Inverted stems ("Which of the following is NOT correct"), extreme word qualifiers ("Only", "Drastically", "All"), paired matching questions, and the mandatory 5th Option in RPSC OMR.',
        requiredReadings: [
          { book: 'Official RPSC RAS Notification Guidelines', chapters: 'OMR 5th Option Rule (Negative marking penalty for unbubbled questions)', priority: 'Must Read' },
          { book: 'Margdarshak Error Log Notebook', chapters: 'Review of past mistake entries & recurring cognitive failures', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Extreme Word Traps Identification', actionableTask: 'Analyze 50 previous UPSC questions with extreme words; distinguish true absolutes from trap absolutes.', pyqTarget: 'UPSC 2019-2023 prelims analysis' },
          { dayNumber: 2, focus: 'RPSC 5th Option Timed Simulation', actionableTask: 'Take a 150-question mock adhering to the 10-minute OMR bubbling rule for Option 5.', pyqTarget: 'RPSC RAS full mock test' }
        ],
        selfAssessmentChecklist: [
          'Never leave an unattempted question unbubbled in RPSC (avoids 1/3rd penalty or disqualification if >10% left unbubbled).',
          'Highlight negative words in question stems ("NOT", "INCORRECT", "EXCEPT") with pen before reading options.',
          'Consistently execute the 2-Round Test Strategy (Round 1: 100% sure; Round 2: 50-50 elimination).'
        ],
        dualStrategyNote: 'UPSC penalizes incorrect guesses; RPSC additionally penalizes leaving questions blank without bubbling option 5. Margdarshak Test Mode enforces both natively.',
        linkedSyllabusCode: 'UPSC-PRE-POL-01'
      },
      {
        id: 'mod-spaced-recall-final',
        phaseId: 'phase-4',
        title: '5-3-2-1-1 Spaced Recall Consolidation & Final Lap',
        titleHindi: '5-3-2-1-1 अंतराल पुनरावृत्ति एवं अंतिम समीक्षा',
        subject: 'Active Recall & Quick Revision',
        weekRange: 'Weeks 31 – 34',
        targetExam: 'COMMON_CORE',
        importance: 'CRITICAL_HIGH_YIELD',
        estimatedHours: 120,
        overview: 'Execute spaced repetition intervals (5 days, 3 days, 2 days, 1 day, 1 day before exam). Quick review of mnemonics, constitutional amendment numbers, Rajasthan schemes, and budget tables.',
        requiredReadings: [
          { book: 'Personal Concise Study Notes & Flashcards', chapters: 'Core formula sheets, landmark cases, Aravalli peak tables', priority: 'Must Read' },
          { book: 'Margdarshak Spaced Recall System', chapters: 'Review scheduled recall items across all 70:20:10 layers', priority: 'Must Read' }
        ],
        dailyBreakdown: [
          { dayNumber: 1, focus: 'Polity & Governance Flash Recall', actionableTask: 'Run through all 25 parts, 12 schedules, and key articles (Articles 1-51A, 72, 110, 123, 142, 243, 280, 356).', pyqTarget: 'Quick 30-question diagnostic quiz' },
          { dayNumber: 2, focus: 'Rajasthan Vault Flash Recall', actionableTask: 'Review all 6 UNESCO forts, 10 Agro-climatic zones, and latest Economic Survey statistics.', pyqTarget: 'Quick 30-question Rajasthan quiz' }
        ],
        selfAssessmentChecklist: [
          'Able to recall key constitutional articles in under 5 seconds.',
          'Confident in eliminating 2 options on at least 70% of ambiguous questions.',
          'Error log reviewed with zero repeat mistakes on identical conceptual traps.'
        ],
        dualStrategyNote: 'In the final 4 weeks, zero new resources should be touched. Strictly consolidate what has already been self-taught.',
        linkedSyllabusCode: 'RPSC-PRE-RAJ-01'
      }
    ]
  }
];

export interface DailyTimetableGuide {
  studyHours: number;
  label: string;
  schedule: Array<{
    timeSlot: string;
    activity: string;
    layerType: 'CORE_70' | 'RAJASTHAN_20' | 'TEST_10';
    description: string;
  }>;
}

export const DAILY_TIMETABLE_PRESETS: Record<number, DailyTimetableGuide> = {
  6: {
    studyHours: 6,
    label: '6-Hour Working Professional / Lean Track',
    schedule: [
      { timeSlot: '06:00 - 08:30 (2.5h)', activity: 'Deep Conceptual Reading (UPSC Core)', layerType: 'CORE_70', description: 'Fresh morning mind: Polity, Modern History, or Economics core text.' },
      { timeSlot: '13:00 - 14:00 (1.0h)', activity: 'Current Affairs & Editorials', layerType: 'CORE_70', description: 'National issues, PIB releases, and Supreme Court rulings.' },
      { timeSlot: '19:30 - 21:00 (1.5h)', activity: 'Rajasthan Vault Factual Revision', layerType: 'RAJASTHAN_20', description: 'Rajasthan geography, forts, dynasties, or Sujas schemes.' },
      { timeSlot: '21:30 - 22:30 (1.0h)', activity: 'PYQ Drill & Mistake Journaling', layerType: 'TEST_10', description: 'Solve 20 MCQs, log traps in Margdarshak Error Log, review flashcards.' }
    ]
  },
  8: {
    studyHours: 8,
    label: '8-Hour Standard Full-Time Aspirant Track (Recommended)',
    schedule: [
      { timeSlot: '07:00 - 10:00 (3.0h)', activity: 'Block 1: Core Conceptual Discipline', layerType: 'CORE_70', description: 'Heavy analytical conceptual study: Laxmikanth, Spectrum, or NCERTs.' },
      { timeSlot: '11:00 - 13:30 (2.5h)', activity: 'Block 2: Second Subject / Economy / Geography', layerType: 'CORE_70', description: 'Macroeconomics, Physical Geography, or Environmental ecology.' },
      { timeSlot: '15:30 - 17:00 (1.5h)', activity: 'Block 3: Rajasthan Substantive Vault', layerType: 'RAJASTHAN_20', description: 'Rajasthan Adhyayan, 10 agro-climatic zones, or administrative bodies.' },
      { timeSlot: '19:00 - 20:00 (1.0h)', activity: 'Block 4: Mock Questions & OMR Simulation', layerType: 'TEST_10', description: 'Timed practice with 5th option rules and elimination analysis.' }
    ]
  },
  10: {
    studyHours: 10,
    label: '10-Hour Advanced Full-Throttle Track',
    schedule: [
      { timeSlot: '06:30 - 10:00 (3.5h)', activity: 'Block 1: Primary Conceptual Rigor', layerType: 'CORE_70', description: 'Prime cognitive window: Indian Polity & Modern History core books.' },
      { timeSlot: '11:00 - 14:00 (3.0h)', activity: 'Block 2: Secondary Conceptual & Mains Answer Practice', layerType: 'CORE_70', description: 'Economy / Geography + 2 Mains answer writing questions.' },
      { timeSlot: '15:30 - 17:30 (2.0h)', activity: 'Block 3: Rajasthan Specialization Vault', layerType: 'RAJASTHAN_20', description: 'Rajasthan History, Culture, Administrative Setup, or Economic Survey.' },
      { timeSlot: '19:00 - 20:30 (1.5h)', activity: 'Block 4: Full Test Drill & Error Log Autopsy', layerType: 'TEST_10', description: '30-40 MCQs under real exam pressure; dissect reasons for wrong options.' }
    ]
  }
};

export const SELF_TEACH_STRATEGY_RULES = [
  {
    title: 'The "One Book, Ten Revisions" Doctrine',
    description: 'Never read 5 books on the same topic. Read Laxmikanth for Polity, Spectrum for Modern History, and Hari Mohan Saxena for Rajasthan Geography 10 times each until structural memory is built.'
  },
  {
    title: 'Dual 70:20:10 Synergy Architecture',
    description: 'Never study UPSC and RPSC in silos. When you study Governor in Indian Polity, immediately study Governor precedents in Rajasthan. When studying River Systems of India, immediately study the Luni and Chambal drainage basins.'
  },
  {
    title: 'The Elimination-First Mindset',
    description: 'In UPSC and RPSC Prelims, topper candidates do not know the answer directly to all 100 questions. They eliminate 2 wrong options through constitutional logic and extreme qualifier recognition.'
  },
  {
    title: 'Zero Repeat Mistakes Rule',
    description: 'Logging mistakes in your Error Log is 3x more productive than reading new theory. Every wrong option encountered during mocks must be diagnosed and filed with its specific failure trigger.'
  }
];
