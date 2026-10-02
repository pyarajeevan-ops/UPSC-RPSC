export interface StandardBookResource {
  id: string;
  title: string;
  author: string;
  edition: string;
  subject: string;
  category: 'UPSC_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'DUAL_OVERLAP';
  level: 'Basic Foundation (NCERT)' | 'Standard Core (Must Read)' | 'Supplementary Advanced';
  officialOrPdfLink?: string;
  description: string;
  mustReadChapters: string[];
  skimmableChapters: string[];
  upscStrategy: string;
  rpscStrategy: string;
  estimatedReadingHours: number;
  keyTopicsCovered: string[];
}

export interface OfficialGovernmentPortal {
  id: string;
  name: string;
  nameHindi?: string;
  organization: string;
  url: string;
  category: 'Union Constitutional' | 'State Constitutional' | 'Economic & Statistical' | 'Environmental' | 'Policy & Legislative' | 'Scientific & Defense';
  description: string;
  officialMandate: string;
  highYieldReports: string[];
  keyPrelimsUtility: string;
  sampleQuestionPattern: string;
}

export interface OfficialPyqArchive {
  id: string;
  exam: 'UPSC CSE Prelims' | 'RPSC RAS Prelims';
  year: number;
  paper: 'Paper-I (General Studies)' | 'Paper-II (CSAT / Aptitude)';
  totalQuestions: number;
  totalMarks: number;
  timeAllowed: string;
  negativeMarking: string;
  officialKeyStatus: string;
  cutoffScoreEstimate: string;
  weightageBreakdown: Record<string, number>;
  officialQuestionPaperUrl?: string;
  officialAnswerKeyUrl?: string;
  strategicAnalysis: string;
}

export interface CurrentAffairsCompendium {
  id: string;
  title: string;
  publisher: string;
  frequency: 'Monthly' | 'Annual' | 'Bi-Monthly';
  languageAvailability: 'Hindi & English' | 'English' | 'Hindi';
  targetExam: 'DUAL' | 'UPSC' | 'RPSC';
  officialUrl: string;
  description: string;
  highYieldThemes: string[];
  howToMakeNotes: string;
}

export interface HighYieldCheatSheet {
  id: string;
  title: string;
  titleHindi?: string;
  subject: string;
  category: 'UPSC_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'DUAL_OVERLAP';
  summary: string;
  quickFacts: { label: string; value: string; note?: string }[];
  keyMnemonicOrRule?: string;
  examApplicationTip: string;
  tags: string[];
}

// ---------------------------------------------------------------------------
// 1. Comprehensive Standard Books & NCERT Compendium
// ---------------------------------------------------------------------------
export const STANDARD_BOOKS_DIRECTORY: StandardBookResource[] = [
  {
    id: 'book-laxmikanth-polity',
    title: 'Indian Polity for Civil Services & State Services',
    author: 'M. Laxmikanth',
    edition: '7th Edition (McGraw Hill)',
    subject: 'Indian Polity & Governance',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.mheducation.co.in',
    description: 'The indisputable bible for Indian Polity across UPSC and RPSC RAS. Contains statutory provisions, articles, constitutional amendments, and landmark Supreme Court verdicts.',
    mustReadChapters: [
      'Preamble & Historical Background (1919, 1935 Acts)',
      'Part III: Fundamental Rights (Articles 12 to 35) & Writs',
      'Part IV & IVA: DPSP & Fundamental Duties (Art 51A)',
      'Parliament: Motions, Bills, Budget, Committees (PAC, Estimates, COPU)',
      'Judiciary: Supreme Court & High Courts (Appointments, Collegium, NJAC, Writs)',
      'Panchayati Raj & Municipalities (73rd & 74th Amendments, Articles 243 to 243ZG)',
      'Emergency Provisions (Articles 352, 356, 360 & safeguards)',
      'Constitutional & Non-Constitutional Bodies (Election Commission, CAG, Finance Commission, UPSC, NITI Aayog)'
    ],
    skimmableChapters: [
      'Foreign Policy (handled dynamically via current affairs)',
      'National Commission for Minorities / Backward Classes (read only constitutional status)'
    ],
    upscStrategy: 'Focus on constitutional intent, comparative federalism, parliamentary checks-and-balances, and inter-article harmony (e.g. Art 14 vs 19 vs 21).',
    rpscStrategy: 'Memorize exact Article numbers, sub-clauses, tenure of state officials, and statutory provisions of State Election Commission and Lokayukta.',
    estimatedReadingHours: 45,
    keyTopicsCovered: ['Basic Structure Doctrine', 'Money Bill vs Financial Bill', 'Writ Jurisdictions', 'Panchayati Raj Finance Commission', 'Governor Discretionary Powers']
  },
  {
    id: 'book-ncert-polity-11',
    title: 'NCERT Class 11: Indian Constitution at Work',
    author: 'NCERT',
    edition: 'Latest Revised Edition',
    subject: 'Indian Polity & Governance',
    category: 'DUAL_OVERLAP',
    level: 'Basic Foundation (NCERT)',
    officialOrPdfLink: 'https://ncert.nic.in/textbook.php?keps2=0-10',
    description: 'Foundational textbook elucidating the philosophical core and institutional balances of Indian democracy.',
    mustReadChapters: [
      'Chapter 1: Constitution: Why and How?',
      'Chapter 2: Rights in the Indian Constitution',
      'Chapter 3: Election and Representation (First-Past-The-Post vs PR)',
      'Chapter 4: Executive (Presidential vs Parliamentary systems)',
      'Chapter 5: Legislature (Need for Bicameralism)',
      'Chapter 6: Judiciary (Independence and Judicial Activism)',
      'Chapter 7: Federalism (Asymmetrical Federalism & Special Provisions)'
    ],
    skimmableChapters: [
      'Chapter 10: The Philosophy of the Constitution (useful for Mains essay)'
    ],
    upscStrategy: 'Essential for conceptual Prelims questions like "Which of the following is the true meaning of Liberty/Equality in the Indian context?".',
    rpscStrategy: 'Provides bedrock clarity on election mechanisms and federal division of powers.',
    estimatedReadingHours: 14,
    keyTopicsCovered: ['First Past The Post', 'Judicial Review', 'Asymmetric Federalism', 'Constitutional Morality']
  },
  {
    id: 'book-spectrum-modern-history',
    title: 'A Brief History of Modern India',
    author: 'Rajiv Ahir, IPS (Spectrum Publications)',
    edition: 'Latest Revised Edition',
    subject: 'Modern Indian History',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://spectrumbooks.in',
    description: 'Point-wise, chronological compendium of modern Indian history from the decline of Mughals through Independence and consolidation.',
    mustReadChapters: [
      'British Expansion & Treaties (Subsidiary Alliance, Doctrine of Lapse)',
      'Revolt of 1857: Causes, Centers, Leaders and Aftermath (Act of 1858)',
      'Socio-Religious Reform Movements (Brahmo Samaj, Arya Samaj, Satyasodhak Samaj)',
      'Growth of Militant Nationalism & Swadeshi Movement (1905–1911)',
      'Gandhian Phase: Non-Cooperation, Civil Disobedience, Quit India Movement',
      'Constitutional Developments (Morley-Minto 1909, Montagu-Chelmsford 1919, 1935 Act)',
      'Governor-Generals and Viceroys (Significant policies and educational charters)'
    ],
    skimmableChapters: [
      'Post-independence state reorganization (more relevant for Mains)'
    ],
    upscStrategy: 'Focus on ideological divergence (Moderates vs Extremists, Gandhi vs Ambedkar, Swarajists vs No-Changers).',
    rpscStrategy: 'Focus on chronological order of events, dates, press acts, and national movements linkage with Rajasthan Prajamandals.',
    estimatedReadingHours: 35,
    keyTopicsCovered: ['Poona Pact 1932', 'Cabinet Mission 1946', 'Permanent Settlement vs Ryotwari', 'Rowlatt Satyagraha', 'Ilbert Bill Controversy']
  },
  {
    id: 'book-ncert-ancient-history',
    title: 'Ancient India (Old NCERT)',
    author: 'Prof. R.S. Sharma',
    edition: 'Oxford University Press / NCERT Reprint',
    subject: 'Ancient History',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://ncert.nic.in',
    description: 'Authoritative socioeconomic history of ancient Indian civilization, early state formations, religions, and material cultures.',
    mustReadChapters: [
      'Chapter 6: The Harappan Civilization (Town planning, trade, crafts, seals)',
      'Chapter 7: Advent of Aryans & Rig Vedic Phase',
      'Chapter 8: Later Vedic Phase (Transition to iron, Janapadas, Varna system)',
      'Chapter 9: Jainism and Buddhism (Doctrines, Councils, Royal Patronage)',
      'Chapter 11: The Age of the Mauryas (Arthashastra, Ashokan Edicts, Dhamma)',
      'Chapter 14: Central Asian Contacts (Kushanas, Gandhara Art, Kanishka)',
      'Chapter 18: Life in the Gupta Age (Golden Age debate, land grants, literature)'
    ],
    skimmableChapters: [
      'Chapter 25: Sequence of Social Changes (Read summary points)'
    ],
    upscStrategy: 'Heavy focus on terminology (e.g. Gahapati, Agrahara, Vishti, Sarthavaha) and Buddhist archaeological sites.',
    rpscStrategy: 'Trace archaeological linkages with Rajasthan sites (Kalibangan, Ganeshwar, Bairat, Ahar).',
    estimatedReadingHours: 20,
    keyTopicsCovered: ['Boustrophedon Script', 'Ashoka Rock Edicts', 'Hinayana vs Mahayana', 'Gupta Coins and Inscriptions']
  },
  {
    id: 'book-ncert-physical-geography',
    title: 'NCERT Class 11: Fundamentals of Physical Geography',
    author: 'NCERT',
    edition: 'Latest Revised Edition',
    subject: 'Physical Geography',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://ncert.nic.in/textbook.php?kegy2=0-14',
    description: 'The foundation for geomorphology, climatology, oceanography, and global climate classifications.',
    mustReadChapters: [
      'Unit II: The Earth (Structure of the Earth, Continental Drift & Plate Tectonics)',
      'Unit III: Landforms (Rocks, Geomorphic Processes, Weathering, River & Karst landforms)',
      'Unit IV: Climate (Solar Radiation, Atmospheric Circulation, Fronts, Cyclones, Köppen Climate)',
      'Unit V: Water (Oceans) (Submarine Relief, Salinity, Tides & Ocean Currents)'
    ],
    skimmableChapters: [
      'Unit I: Geography as a Discipline'
    ],
    upscStrategy: 'UPSC tests process-based conceptual questions: Coriolis force, adiabatic cooling, thermohaline circulation, inversion of temperature.',
    rpscStrategy: 'RPSC tests definitions, landform types (e.g. Cirque, Barchan, Inselberg), and Köppen codes (BWhw, BShw for Rajasthan).',
    estimatedReadingHours: 22,
    keyTopicsCovered: ['Plate Boundaries', 'Extra-Tropical Cyclones', 'Oceanic Trenches', 'Paleomagnetism', 'Rain Shadow Effect']
  },
  {
    id: 'book-ncert-indian-geography',
    title: 'NCERT Class 11: India - Physical Environment',
    author: 'NCERT',
    edition: 'Latest Revised Edition',
    subject: 'Indian Geography',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://ncert.nic.in/textbook.php?kegy1=0-7',
    description: 'Exhaustive textbook covering Indian physiography, rivers, monsoon mechanisms, natural vegetation, and soils.',
    mustReadChapters: [
      'Chapter 1: India - Location (Latitudinal extent, Standard Meridian 82°30\'E, Frontiers)',
      'Chapter 2: Structure and Physiography (Himalayan Arc, Northern Plains, Peninsular Plateau)',
      'Chapter 3: Drainage System (Himalayan vs Peninsular Rivers, West-flowing vs East-flowing)',
      'Chapter 4: Climate (South-West Monsoon Mechanism, El Niño, Southern Oscillation, Western Disturbances)',
      'Chapter 5: Natural Vegetation (Tropical Evergreen, Deciduous, Thorn Forests)',
      'Chapter 6: Soils (Alluvial, Black/Regur, Red & Yellow, Laterite, Saline)'
    ],
    skimmableChapters: [
      'Chapter 7: Natural Hazards (Disasters are tested in Mains GS-III)'
    ],
    upscStrategy: 'Practice map locations of river tributaries (e.g. Left vs Right bank tributaries of Ganga, Godavari, Brahmaputra).',
    rpscStrategy: 'Link river systems with Rajasthan drainage (Chambal, Banas, Luni, Sabarmati, Mahi) and Thar desert saline soils.',
    estimatedReadingHours: 20,
    keyTopicsCovered: ['ITCZ Migration', 'Western Ghats Passes', 'Black Soil Moisture Capacity', 'Sundarbans Mangroves']
  },
  {
    id: 'book-nitin-singhania-art-culture',
    title: 'Indian Art and Culture',
    author: 'Nitin Singhania',
    edition: '4th Edition (McGraw Hill)',
    subject: 'Art & Culture',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.mheducation.co.in',
    description: 'Comprehensive encyclopedia covering Indian visual and performing arts, literature, UNESCO intangible heritage, and philosophy.',
    mustReadChapters: [
      'Chapter 1: Indian Architecture, Sculpture and Pottery (Harappan, Mauryan, Post-Mauryan, Gupta)',
      'Chapter 2: Indian Temple Architecture (Nagara, Dravida, Vesara, Nayaka, Hoysala)',
      'Chapter 3: Indian Paintings (Mural, Miniature: Mughal, Rajasthani schools - Mewar, Kishangarh, Bundi)',
      'Chapter 5: Indian Classical Dance Forms (8 classical dances and key mudras)',
      'Chapter 6: Indian Music (Carnatic vs Hindustani systems, Ragas, Gharanas)',
      'Chapter 13: UNESCO List of World Heritage Sites in India'
    ],
    skimmableChapters: [
      'Chapter 18: Fairs and Festivals of India (Focus only on national and Rajasthan festivals)'
    ],
    upscStrategy: 'Pay attention to differences between Gandhara, Mathura, and Amravati school of arts, and temple mandapas.',
    rpscStrategy: 'Deep dive into Rajasthan painting schools (Bani Thani of Kishangarh, hunting scenes of Kota) and Haveli architecture of Shekhawati.',
    estimatedReadingHours: 32,
    keyTopicsCovered: ['Panchayatana Temple Style', 'Dravidian Gopuram', 'Kishangarh Bani Thani', 'Bhakti Saints (Mirabai, Dadu Dayal)']
  },
  {
    id: 'book-shankar-ias-environment',
    title: 'Environment & Ecology Compendium',
    author: 'Shankar IAS / PMFIAS',
    edition: '9th Edition / PMFIAS 2nd Edition',
    subject: 'Environment & Ecology',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.shankariasacademy.com',
    description: 'The standard text for environmental principles, biodiversity, pollution, protected areas, climate negotiations, and environmental acts.',
    mustReadChapters: [
      'Ecology Concepts: Food Chain, Food Web, Trophic Levels, Ecological Pyramids',
      'Functions of Ecosystem: Ecological Succession, Biogeochemical Cycles (Carbon, Nitrogen)',
      'Biodiversity: Hotspots (Western Ghats, Indo-Burma, Himalayas, Sundaland), IUCN Red List Criteria',
      'Protected Area Network: National Parks, Wildlife Sanctuaries, Biosphere Reserves, Tiger Reserves',
      'Pollution & Climate Change: Photochemical Smog, Acid Rain, Ocean Acidification, Coral Bleaching',
      'Conventions & Treaties: UNFCCC, CBD, Ramsar Convention, CITES, CMS (Bonn Convention), Montreal Protocol'
    ],
    skimmableChapters: [
      'State-wise detailed list of all sanctuaries (study only Rajasthan sanctuaries in detail)'
    ],
    upscStrategy: 'Accounts for 15-20 questions in UPSC Prelims due to Indian Forest Service (IFoS) shared prelims. Focus on species endangerment criteria.',
    rpscStrategy: 'Focus on Rajasthan Tiger Reserves (Ranthambore, Sariska, Mukundra Hills, Ramgarh Vishdhari) and Ramsar sites (Sambhar Lake, Keoladeo Ghana).',
    estimatedReadingHours: 30,
    keyTopicsCovered: ['Biomagnification', 'Kyoto Protocol vs Paris Agreement', 'Keoladeo National Park', 'Desert National Park Godawan']
  },
  {
    id: 'book-hm-saxena-rajasthan-geography',
    title: 'Geography of Rajasthan (राजस्थान का भूगोल)',
    author: 'Dr. H.M. Saxena',
    edition: 'Rajasthan Hindi Granth Academy, Jaipur',
    subject: 'Rajasthan Geography',
    category: 'RAJASTHAN_EXCLUSIVE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://hindigranthacademy.rajasthan.gov.in',
    description: 'The definitive government-sanctioned reference for Rajasthan physiography, Aravali elevations, river drainages, agro-climatic zones, and mineral basins.',
    mustReadChapters: [
      'Physiographic Divisions: Western Sandy Plain (Thar), Aravalli Range, Eastern Plain, Hadoti Plateau',
      'Aravalli Peaks & Passes: Guru Shikhar, Ser, Dilwara, Jarga, Achalgarh, Desuri Pass, Someshwar',
      'Drainage Systems: Bay of Bengal (Chambal, Banas), Arabian Sea (Luni, Mahi, Sabarmati), Inland Drainage (Ghaggar, Kantli)',
      'Climate & Rainfall: Isohyets (50cm dividing line), Monsoon arrival, Loo, Mawat (Winter rain)',
      'Canal Irrigation: Indira Gandhi Canal Project (IGNP) - Harike Barrage, Main Canal, Lift Canals',
      'Mineral Wealth: Lead-Zinc (Zawar, Rampura-Agucha), Rock Phosphate (Jhamarkotra), Tungsten (Degana), Marble & Granite'
    ],
    skimmableChapters: [
      'Minor village-level road networks'
    ],
    upscStrategy: 'N/A (Useful primarily for Mains GS-I Geography questions on desertification and arid zones).',
    rpscStrategy: 'Essential for 15-18 direct questions in RPSC RAS Prelims. Every single peak elevation and lift canal name is tested.',
    estimatedReadingHours: 28,
    keyTopicsCovered: ['IGNP Lift Canals', 'Chambal Badland Topography', 'Ghirna & Churu Hot Zones', 'Ghebar Lake / Jaisamand']
  },
  {
    id: 'book-hukam-chand-jain-rajasthan-history',
    title: 'History, Art, Culture & Heritage of Rajasthan (राजस्थान का इतिहास, कला एवं संस्कृति)',
    author: 'Dr. Hukum Chand Jain & Dr. Narayan Lal Mali',
    edition: 'Rajasthan Hindi Granth Academy, Jaipur',
    subject: 'Rajasthan History & Art-Culture',
    category: 'RAJASTHAN_EXCLUSIVE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://hindigranthacademy.rajasthan.gov.in',
    description: 'Official academic sourcebook for Rajput dynasties, freedom movements, peasant revolts (Bijolia), Prajamandals, folk deities, and architectural monuments.',
    mustReadChapters: [
      'Ancient Civilizations: Kalibangan (Ghaggar), Ganeshwar (Kantli), Ahar (Berach), Bairat (Banganga)',
      'Dynasties & Battles: Guhilas/Sisodias of Mewar (Kumbha, Sanga, Pratap), Rathores of Marwar (Chandrasen), Chauhans of Ajmer & Ranthambore',
      'Hill Forts of Rajasthan (UNESCO 6 Forts: Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer, Jaisalmer)',
      'Folk Deities (Panch Pir: Pabuji, Harbuji, Ramdevji, Mangalia Mehaji, Gogaji) & Tejaji',
      'Folk Dances & Theaters: Ghoomar, Kalbeliya, Terah Tali, Khayal (Kuchamani, Shekhawati), Rammat',
      'Peasant Movements & Integration of Rajasthan: Bijolia (1897-1941), Begun, 7 Stages of Integration (1948-1956)'
    ],
    skimmableChapters: [
      'Minor clan genealogies'
    ],
    upscStrategy: 'Provides high-yield examples for UPSC Art & Culture questions on medieval fortifications and Bhakti poetry.',
    rpscStrategy: 'The backbone of RPSC RAS Paper-I. Accounts for 20-25 questions in Prelims with high factual precision.',
    estimatedReadingHours: 35,
    keyTopicsCovered: ['UNESCO 6 Hill Forts', 'Bijolia Movement Sadhu Sitaram', '7 Stages of Rajasthan Integration', 'Panch Pir']
  },
  {
    id: 'book-rajasthan-economic-review',
    title: 'Rajasthan Economic Review (राजस्थान आर्थिक समीक्षा 2024-25)',
    author: 'Directorate of Economics & Statistics, Government of Rajasthan',
    edition: 'Latest Annual Official Edition',
    subject: 'Rajasthan Economy',
    category: 'RAJASTHAN_EXCLUSIVE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://statistics.rajasthan.gov.in',
    description: 'The highest single-document yielding source in RPSC RAS Prelims. Contains official macro-indicators, sectoral growth, welfare schemes, and budget allocations.',
    mustReadChapters: [
      'Chapter 1: Macro-Economic Aggregates (GSDP at Constant 2011-12 & Current Prices, Per Capita Income)',
      'Chapter 2: Agriculture and Allied Sector (Foodgrain production, Krishi Vigyan Kendra, Livestock census)',
      'Chapter 3: Rural Development and Panchayati Raj (MGNREGA wage rates, RGAVP, PMGSY)',
      'Chapter 4: Industrial Development (RIICO industrial areas, DMIC, MSME Policy 2022, Export trends)',
      'Chapter 5: Infrastructure (Road density, Thermal, Solar & Wind capacity: Bhadla Solar Park)',
      'Chapter 8: Social Services & Flagship Welfare Schemes (Mukhyamantri Chiranjeevi / Ayushman, Annapurna, Indira Rasoi)'
    ],
    skimmableChapters: [
      'Annexure tables with district-by-district minute telemetry'
    ],
    upscStrategy: 'Sub-national economic case studies for federal fiscal health and renewable energy expansion.',
    rpscStrategy: 'Generates 18 to 22 direct Prelims questions. You must memorize exact GSDP growth percentage, agricultural share, and scheme financial limits.',
    estimatedReadingHours: 20,
    keyTopicsCovered: ['GSDP Constant vs Current', 'Bhadla Solar Park Capacity', 'Rajasthan Export Basket', 'Pachpadra Refinery 74:26 Equity']
  },
  {
    id: 'book-ramesh-singh-economy',
    title: 'Indian Economy for Civil Services',
    author: 'Ramesh Singh',
    edition: '15th Edition (McGraw Hill)',
    subject: 'Indian Economy',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.mheducation.co.in',
    description: 'Authoritative macro-economic reference book breaking down concepts of national income, monetary policy, public finance, external sector, and banking.',
    mustReadChapters: [
      'Introduction: GDP, GNP, NDP, NNP, Factor Cost vs Market Price, GVA',
      'Evolution of the Indian Economy & Planning: Five Year Plans, NITI Aayog',
      'Monetary and Credit Policy: RBI, Repo, Reverse Repo, SDF, CRR, SLR, Open Market Operations (OMO)',
      'Inflation and Business Cycle: CPI vs WPI, Headline vs Core Inflation, Cost-Push vs Demand-Pull',
      'Banking in India: NPA, Basel III norms, Insolvency & Bankruptcy Code (IBC), Prompt Corrective Action (PCA)',
      'Public Finance: Union Budget, Revenue vs Capital Account, Fiscal Deficit, Primary Deficit, FRBM Act',
      'External Sector: Balance of Payments (BoP), Current Account Deficit (CAD), FOREX reserves, NEER & REER'
    ],
    skimmableChapters: [
      'Historic detailed planning models (Mahalanobis model summary is sufficient)'
    ],
    upscStrategy: 'UPSC tests operational mechanics (e.g. "If RBI reduces Repo Rate, what happens to bond yields and currency valuation?").',
    rpscStrategy: 'RPSC tests definitions, economic committee heads, and statutory reserve percentages.',
    estimatedReadingHours: 35,
    keyTopicsCovered: ['Fiscal Deficit Formula', 'Sterilization by RBI', 'BoP Capital Account Items', 'Twin Balance Sheet Problem']
  },
  {
    id: 'book-satish-chandra-medieval',
    title: 'History of Medieval India (800–1700)',
    author: 'Prof. Satish Chandra',
    edition: 'Orient Blackswan / Old NCERT',
    subject: 'Medieval Indian History',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://orientblackswan.com',
    description: 'The seminal academic textbook covering the Delhi Sultanate, Vijayanagara Empire, Bhakti & Sufi traditions, Mughal administration (Mansabdari, Zabt system), and Maratha ascendancy.',
    mustReadChapters: [
      'Chapter 6: Delhi Sultanate: Administration, Market Reforms of Alauddin Khalji, Muhammad bin Tughlaq Projects',
      'Chapter 9: The Vijayanagara and Bahmani Kingdoms (Nayankara system, Krishnadeva Raya, Hampi architecture)',
      'Chapter 11: Religious & Cultural Developments: Bhakti and Sufi Movements (Kabir, Nanak, Mirabai, Chaitanya, Chishti Silsila)',
      'Chapter 13: The Age of Akbar (Ibadat Khana, Sulh-i-Kul, Mansabdari rank system, Dahsala/Zabt land revenue)',
      'Chapter 17: Climax and Crisis of the Mughal Empire (Jagirdari Crisis, Aurangzeb Deccan campaigns)',
      'Chapter 19: Shivaji and the Rise of the Marathas (Ashta Pradhan, Chauth and Sardeshmukhi)'
    ],
    skimmableChapters: [
      'Chapter 2: Northern India: Age of the Three Empires (Pratiharas, Palas, Rashtrakutas - read political overview only)'
    ],
    upscStrategy: 'UPSC questions focus heavily on administrative terminology: Amil, Muqaddam, Patwari, Mansab/Zat/Sawar, Madad-i-Maash, Hundi, and Iqtadari devolution.',
    rpscStrategy: 'Connect Mughal relations with Rajput states: Treaty of Purandar, Battle of Haldighati (1576), Rathore revolt of 1679, and Mansab ranks granted to Man Singh & Jaswant Singh.',
    estimatedReadingHours: 24,
    keyTopicsCovered: ['Mansabdari System', 'Nayankara System of Vijayanagara', 'Chishti & Suhrawardi Silsilas', 'Chauth & Sardeshmukhi', 'Zabt Revenue Assessment']
  },
  {
    id: 'book-bipan-chandra-struggle',
    title: "India's Struggle for Independence (1857–1947)",
    author: 'Prof. Bipan Chandra, Mridula Mukherjee, Aditya Mukherjee',
    edition: 'Penguin Random House',
    subject: 'Modern Indian History',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.penguin.co.in',
    description: 'The classic narrative history of the Indian freedom movement, detailing ideological streams, mass mobilizations, constitutional negotiations, and peasant uprisings.',
    mustReadChapters: [
      'Chapter 1: The First Major Challenge: The Revolt of 1857',
      'Chapter 4: Foundation of the Indian National Congress: The Myth and the Reality (Safety Valve thesis)',
      'Chapter 10: The Swadeshi Movement (1903–1908) & Split at Surat (1907)',
      'Chapter 14: The Non-Cooperation Movement (1920–22) & Khilafat Question',
      'Chapter 21: Civil Disobedience Movement (1930–31) & Gandhi-Irwin Pact',
      'Chapter 34: Quit India Movement (1942) and the INA Revolt',
      'Chapter 39: Freedom and Partition: The Long-Term Perspective'
    ],
    skimmableChapters: [
      'Chapter 25: Working Class Movements in 1930s (read summary notes)'
    ],
    upscStrategy: 'Essential for analytical questions: Moderates vs Extremists, Gandhi vs Ambedkar on the 1932 Poona Pact, and economic critique of colonialism (Dadabhai Naoroji, R.C. Dutt).',
    rpscStrategy: 'Connect national satyagrahas with Rajasthan Prajamandals (Mewar, Marwar, Jaipur Prajamandals) and Bijolia Kisan Andolan timelines.',
    estimatedReadingHours: 32,
    keyTopicsCovered: ['Safety Valve Theory', 'Surat Split 1907', 'Gandhi-Irwin Pact 1931', 'August Offer 1940 & Cripps Mission', 'Cabinet Mission 1946']
  },
  {
    id: 'book-gc-leong-geography',
    title: 'Certificate Physical and Human Geography',
    author: 'Goh Cheng Leong',
    edition: 'Oxford University Press (New Impression)',
    subject: 'Physical Geography',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://india.oup.com',
    description: 'The global standard for understanding world climate types, atmospheric weather systems, and distinctive landform morphology.',
    mustReadChapters: [
      'Chapter 3: Vulcanism and Earthquakes (Intrusive: Batholith, Laccolith, Dyke, Sill; Extrusive cones)',
      'Chapter 5: Landforms of Glaciation (Cirque, U-shaped valley, Moraines, Eskers, Drumlins)',
      'Chapter 6: Arid or Desert Landforms (Barchans, Seif dunes, Yardangs, Zeugen, Inselbergs, Bajada, Playa)',
      'Chapter 7: Limestone and Chalk Landforms (Karst: Sinkholes, Dolines, Poljes, Stalactites, Stalagmites)',
      'Chapter 15: The Hot, Wet Equatorial Climate (Convectional rain, Selvas, shifting cultivation)',
      'Chapter 17: The Savanna or Sudan Climate (Big Game country, alternating wet/dry seasons, grass species)',
      'Chapter 19: The Warm Temperate Western Margin (Mediterranean) Climate (Winter rainfall under Westerlies, citrus fruits)',
      'Chapter 22: The Cool Temperate Continental (Siberian / Taiga) Climate (Softwood lumbering, Podzols)'
    ],
    skimmableChapters: [
      'Chapter 1: The Earth and the Universe (Basic astronomical units)'
    ],
    upscStrategy: 'Direct questions on climate characteristics (e.g. "Which climate zone receives winter precipitation through Westerly depressions?" - Mediterranean).',
    rpscStrategy: 'Helps in understanding arid Thar landforms, barchan dunes of Churu/Jaisalmer, pediments, and desertification mechanics.',
    estimatedReadingHours: 20,
    keyTopicsCovered: ['Mediterranean Winter Rain', 'Savanna Sudan Climate', 'Karst Topography', 'Barchan & Seif Dunes', 'Batholith & Dyke Structures']
  },
  {
    id: 'book-ncert-macroeconomics',
    title: 'NCERT Class 12: Introductory Macroeconomics',
    author: 'NCERT',
    edition: 'Latest Revised Edition',
    subject: 'Indian Economy',
    category: 'DUAL_OVERLAP',
    level: 'Basic Foundation (NCERT)',
    officialOrPdfLink: 'https://ncert.nic.in/textbook.php?leec1=0-6',
    description: 'Bedrock conceptual textbook on macroeconomic theory, circular flow of income, aggregate demand, fiscal multiplier, money creation, and foreign exchange.',
    mustReadChapters: [
      'Chapter 2: National Income Accounting (GDP, GNP, NDP, NNP, Gross Value Added, Real vs Nominal GDP, GDP Deflator)',
      'Chapter 3: Money and Banking (High-Powered Money, Money Multiplier, Fractional Reserve Banking, Central Bank Tools)',
      'Chapter 4: Determination of Income and Employment (Marginal Propensity to Consume, Investment Multiplier, Paradox of Thrift)',
      'Chapter 5: Government Budget and the Economy (Revenue vs Capital Receipts, Fiscal Deficit, Primary Deficit, Automatic Stabilizers)',
      'Chapter 6: Open Economy Macroeconomics (Balance of Payments, Current Account, Capital Account, Fixed vs Floating Exchange Rates, NEER & REER)'
    ],
    skimmableChapters: [
      'Mathematical proofs in Chapter 4 appendices'
    ],
    upscStrategy: 'Essential for conceptual Prelims questions like "Which of the following constitutes High Powered Money (M0) / Broad Money (M3)?".',
    rpscStrategy: 'Helps in solving standard formula-based questions on Gross State Domestic Product (GSDP), revenue deficit, and primary deficit.',
    estimatedReadingHours: 16,
    keyTopicsCovered: ['Real vs Nominal GDP', 'Money Multiplier Formula', 'Fiscal Deficit Calculation', 'Current Account Deficit', 'GDP Deflator']
  },
  {
    id: 'book-ravi-agrahari-science-tech',
    title: 'Science and Technology for Civil Services',
    author: 'Dr. Ravi P. Agrahari',
    edition: '7th Edition (McGraw Hill)',
    subject: 'Science & Technology',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.mheducation.co.in',
    description: 'Exhaustive reference for cutting-edge technologies: Biotechnology, Space research, Nuclear energy, Defense platforms, Information technology, and Nanotechnology.',
    mustReadChapters: [
      'Biotechnology: Recombinant DNA, CRISPR-Cas9, Stem Cells, mRNA Vaccines, CAR-T Cell Therapy, Somatic Cell Nuclear Transfer',
      'Space Technology: Orbits (LEO, MEO, GEO, Sun-Synchronous, Lagrange Points L1/L2), Launch Vehicles (PSLV, GSLV Mk-III/LVM3, SSLV), Gaganyaan, Chandrayaan-3, Aditya-L1',
      'Information & Communication Tech: 5G/6G, Quantum Computing (Qubits, Superposition, Entanglement), GenAI, Large Language Models, Blockchain',
      'Defense Technology: Missiles (Agni-V with MIRV, BrahMos, Astra), Air Defense (S-400 Triumf), Aircraft Carriers (INS Vikrant), Nuclear Submarines (Arihant class)',
      'Nanotechnology & Advanced Materials: Carbon Nanotubes, Graphene, Metamaterials, Quantum Dots'
    ],
    skimmableChapters: [
      'Basic school physics definitions (focus on contemporary application areas)'
    ],
    upscStrategy: 'High-scoring section in UPSC Prelims: 10-14 questions on emerging tech concepts (e.g. CRISPR, Web 3.0, Quantum Key Distribution).',
    rpscStrategy: 'RPSC tests defense missile ranges, ISRO launch sites, and biotechnology applications in agriculture (Bt cotton, GM mustard DMH-11).',
    estimatedReadingHours: 28,
    keyTopicsCovered: ['CRISPR-Cas9 Gene Editing', 'Lagrange Point L1', 'Quantum Entanglement', 'MIRV Missile Technology', 'mRNA Vaccine Mechanism']
  },
  {
    id: 'book-economic-survey-india',
    title: 'Economic Survey of India 2024-25',
    author: 'Department of Economic Affairs, Ministry of Finance (Chief Economic Adviser)',
    edition: 'Annual Official Government Report',
    subject: 'Indian Economy',
    category: 'UPSC_CORE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.indiabudget.gov.in/economicsurvey/',
    description: 'The authoritative economic document outlining macroeconomic trajectory, inflation dynamics, banking balance sheets, agricultural output, and external trade.',
    mustReadChapters: [
      'State of the Economy: Steady as She Goes (GDP Growth Forecast, Real vs Nominal, Drivers of Growth)',
      'Monetary Management & Financial Intermediation (Bank Credit Growth, GNPA trends, Insolvency resolution)',
      'Prices & Inflation: Retaining the Anchors (CPI headline vs core inflation, food inflation dynamics)',
      'External Sector: Watching the Horizons (Current account balance, FDI vs FPI, Services exports)',
      'Agriculture & Food Management (Gross Capital Formation in Agriculture, Millets, Natural Farming)',
      'Climate Change & Environment: Transitioning to Clean Energy (Panchamrit targets, Renewable capacity, Sovereign Green Bonds)'
    ],
    skimmableChapters: [
      'Sectoral micro-statistics in statistical appendices'
    ],
    upscStrategy: 'Mandatory source for 6-8 direct questions on economic indicators, trends in tax-to-GDP ratio, and foodgrain buffer stocks.',
    rpscStrategy: 'Provides comparative federal perspective when contrasting Rajasthan economic metrics with national averages.',
    estimatedReadingHours: 22,
    keyTopicsCovered: ['Twin Balance Sheet Advantage', 'Tax-to-GDP Ratio Trends', 'Gross Non-Performing Assets (GNPA)', 'Panchamrit Climate Commitments', 'Capital Expenditure (Capex) Multiplier']
  },
  {
    id: 'book-janak-singh-meena-rajasthan-polity',
    title: 'State Administration & Political System of Rajasthan (राजस्थान की प्रशासनिक एवं राजनीतिक व्यवस्था)',
    author: 'Dr. Janak Singh Meena',
    edition: 'Rajasthan Hindi Granth Academy, Jaipur',
    subject: 'Rajasthan Polity',
    category: 'RAJASTHAN_EXCLUSIVE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://hindigranthacademy.rajasthan.gov.in',
    description: 'The authoritative state academy book on the constitutional architecture of Rajasthan: Governor powers, Chief Minister, Chief Secretary, RPSC, State Human Rights Commission, Lokayukta, and Panchayati Raj.',
    mustReadChapters: [
      'Chapter 1: Constitutional Head of State: Governor of Rajasthan (Discretionary Powers, Ordinance, List of Governors & Presidents Rule)',
      'Chapter 2: State Executive: Chief Minister & Council of Ministers',
      'Chapter 3: State Secretariat & Chief Secretary: Role, Hierarchy, Powers, and Administrative Reforms',
      'Chapter 4: Rajasthan Public Service Commission (RPSC): Composition, Article 315-323, Chairperson & Members Tenure',
      'Chapter 5: Statutory & Oversight Bodies: Rajasthan State Human Rights Commission (RSHRC - 1 Chairperson + 2 Members), Lokayukta (1973 Act), State Election Commission (Article 243K), State Information Commission (RTI 2005)',
      'Chapter 6: Democratic Decentralization: Panchayati Raj in Rajasthan (First Gram Panchayat Nagaur Oct 2, 1959, Rajasthan Panchayati Raj Act 1994, 5-year State Finance Commissions)'
    ],
    skimmableChapters: [
      'Routine office manual procedures'
    ],
    upscStrategy: 'N/A (Except comparative state governance in GS-II).',
    rpscStrategy: 'Essential for 12-14 direct questions in RPSC RAS Prelims. Every single member count, tenure rule, and former Chief Secretary name is rigorously examined.',
    estimatedReadingHours: 22,
    keyTopicsCovered: ['RSHRC Composition (1+2)', 'Lokayukta Jurisdiction (Chief Minister excluded)', 'Nagaur Panchayati Raj 1959', 'State Election Commissioner Article 243K', 'First Chief Secretary K. Radhakrishnan']
  },
  {
    id: 'book-raghav-prakash-hindi',
    title: 'General Hindi for RAS & Civil Services (सामान्य हिन्दी)',
    author: 'Dr. Raghav Prakash & Dr. Savita Paiwal',
    edition: 'Pink City Publishers, Jaipur (Expanded Edition)',
    subject: 'General Hindi',
    category: 'RAJASTHAN_EXCLUSIVE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://pinkcitypublishers.com',
    description: 'The absolute undisputed benchmark for RPSC RAS Mains Paper-IV (120 marks out of 200). Covers complete Hindi grammar, vocabulary, administrative translation, precis, expansion, and official drafting.',
    mustReadChapters: [
      'Unit 1: Sandhi & Sandhi-Vichhed (स्वर, व्यंजन, विसर्ग सन्धि नियम)',
      'Unit 2: Samas & Vigrah (अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वन्द्व, बहुव्रीहि)',
      'Unit 3: Upasarg & Pratyay (संस्कृत, हिन्दी व विदेशी उपसर्ग एवं कृत्/तद्धित प्रत्यय)',
      'Unit 4: Shabd Shuddhi & Vakya Shuddhi (वर्तनी शुद्धि व व्याकरणिक वाक्य अशुद्धियाँ)',
      'Unit 5: Paryayvachi, Vilom & Samashruti Bhinnarthak Shabd',
      'Unit 6: Muhavare & Lokoktiyan (लोकोक्तियाँ एवं प्रशासनिक मुहावरे)',
      'Unit 7: Administrative Terminology (प्रशासनिक पारिभाषिक शब्दावली - English to Hindi translation)',
      'Unit 8: Drafting: Pallavan (भाव पल्लवन), Samkshepan (संक्षेपण 1/3rd), Patra Lekhan (निविदा, परिपत्र, अधिसूचना, ज्ञापन)'
    ],
    skimmableChapters: [
      'Complex poetical meters (Chhand) not in RAS syllabus'
    ],
    upscStrategy: 'Useful for qualifying compulsory Indian Language paper (Paper-A, 300 marks, 25% qualifying threshold).',
    rpscStrategy: 'The kingmaker of RPSC RAS Mains! Scoring 95-105 out of 120 in Hindi in Paper-IV is what guarantees top SDM/RPS ranks.',
    estimatedReadingHours: 40,
    keyTopicsCovered: ['Shabd Shuddhi Rules', 'Administrative Terminology Glossary', 'Pallavan Expansion Principles', 'Nivida (Tender) Format', 'Paripatra (Circular) Drafting']
  },
  {
    id: 'book-lexicon-ethics',
    title: 'Lexicon for Ethics, Integrity & Aptitude (GS-IV)',
    author: 'Niraj Kumar / Chronicle Books',
    edition: 'Latest Revised Edition',
    subject: 'Ethics & Integrity',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://chronicleindia.in',
    description: 'Definitive lexicon explaining ethical philosophies, psychological attitudes, emotional intelligence, moral thinkers, probity in governance, and case study resolution frameworks.',
    mustReadChapters: [
      'Chapter 1: Ethics and Human Interface (Essence, Determinants, Consequences of Ethics in Human Action)',
      'Chapter 2: Attitude: Content, Structure, Function; Moral and Political Attitudes; Social Influence and Persuasion',
      'Chapter 3: Aptitude and Foundational Values for Civil Service (Integrity, Impartiality, Non-Partisanship, Objectivity, Empathy for Weaker Sections)',
      'Chapter 4: Emotional Intelligence: Concepts, Utilities and Application in Administration',
      'Chapter 5: Contributions of Moral Thinkers & Philosophers (Socrates, Plato, Aristotle, Kant, Utilitarianism of Bentham/Mill, Gandhi, Rawls Theory of Justice)',
      'Chapter 6: Public/Civil Service Values & Ethics in Public Administration (Nolan Committee 7 Principles, Code of Conduct vs Code of Ethics)',
      'Chapter 7: Probity in Governance (Citizen\'s Charter, Right to Information, Work Culture, Quality of Service Delivery)',
      'Chapter 8: Case Study Solving Frameworks (Stakeholder matrix, Ethical Dilemmas, Short-term vs Long-term actions)'
    ],
    skimmableChapters: [
      'Abstract metaphysical debates not linked with public governance'
    ],
    upscStrategy: 'Crucial for UPSC Mains GS-IV (250 marks). Provides clear terminology and philosophers to quote in Section A and actionable frameworks for Section B case studies.',
    rpscStrategy: 'Essential for RPSC RAS Mains Paper-II Unit 1 (Ethics, 65 marks). RPSC asks direct 2-mark definitions and 5-mark short notes on Western and Indian ethics.',
    estimatedReadingHours: 25,
    keyTopicsCovered: ['Nolan Committee 7 Principles', 'Categorical Imperative of Immanuel Kant', 'Rawls Theory of Justice (Veil of Ignorance)', 'Citizen\'s Charter Principles', 'Conflict of Interest Resolution']
  },
  {
    id: 'book-pmfias-physical-geography',
    title: 'Physical & Indian Geography Compendium',
    author: 'Manjunath Thamminidi (PMFIAS)',
    edition: '2nd Color Edition',
    subject: 'Physical Geography',
    category: 'DUAL_OVERLAP',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://www.pmfias.com',
    description: 'Detailed, visually rich geographical compendium explaining plate tectonics, climatology, oceanography, Indian monsoons (El Niño Modoki, IOD, MJO), and biogeography.',
    mustReadChapters: [
      'Geomorphology: Plate Tectonic Theory, Paleomagnetism, Seafloor Spreading, Volcanism, Earthquakes, Faulting & Folding',
      'Climatology: Atmospheric Pressure Belts, Tri-cellular Circulation (Hadley, Ferrel, Polar cells), Jet Streams, Tropical vs Extra-tropical Cyclones',
      'Monsoon Teleconnections: Indian Ocean Dipole (IOD - Positive vs Negative), Madden-Julian Oscillation (MJO), El Niño & La Niña, Western Disturbances',
      'Oceanography: Submarine Relief, Salinity distribution, Ocean Currents (Gulf Stream, Kuroshio, Benguela, Humboldt), Thermohaline Circulation',
      'Biogeography: Soil formation, Soil profiles, Biomes of the World, Mangrove ecosystems'
    ],
    skimmableChapters: [
      'Detailed regional micro-landforms of minor continents'
    ],
    upscStrategy: 'Top resource for solving tough process-oriented questions in UPSC Prelims on weather systems and ocean phenomena.',
    rpscStrategy: 'Clarifies Western Disturbances bringing "Mawat" winter rainfall to Rajasthan crops (Gram, Mustard, Wheat).',
    estimatedReadingHours: 26,
    keyTopicsCovered: ['Indian Ocean Dipole (IOD)', 'El Niño Modoki', 'Walker Circulation', 'Thermohaline Conveyor Belt', 'Mawat Winter Rainfall']
  },
  {
    id: 'book-upinder-singh-ancient',
    title: 'A History of Ancient and Early Medieval India',
    author: 'Prof. Upinder Singh',
    edition: 'Pearson Education',
    subject: 'Ancient History',
    category: 'DUAL_OVERLAP',
    level: 'Supplementary Advanced',
    officialOrPdfLink: 'https://in.pearson.com',
    description: 'Comprehensive, scholarly tour-de-force exploring Paleolithic hunter-gatherers, Harappan urbanism, Vedic literature, Mauryan polity, and early medieval regional states.',
    mustReadChapters: [
      'Chapter 3: The Harappan Civilization (Site distribution, drainage systems, craft production, external trade with Dilmun/Magan/Meluhha)',
      'Chapter 6: Cities, Kings, and Renouncers: North India c. 600–300 BCE (Mahajanapadas, second urbanization, Shramana traditions)',
      'Chapter 7: The Maurya Empire: Ashoka, Dhamma, Inscriptions (Major Rock Edicts, Pillar Edicts, Minor Rock Edicts)',
      'Chapter 8: Interaction and Innovation: c. 200 BCE – 300 CE (Indo-Greeks, Shakas, Satavahanas, Kushanas, Sangam Age literature)',
      'Chapter 9: Aesthetics and Empire: The Guptas and Vakatakas (Epigraphy, Sanskrit literature, Ajanta paintings)'
    ],
    skimmableChapters: [
      'Detailed technical pottery stratigraphy in prehistoric site appendices'
    ],
    upscStrategy: 'Invaluable for solving recent tough UPSC questions on obscure ancient terminology, port sites (e.g. Korkai, Poompuhar, Muchiri), and edicts (e.g. Sannati).',
    rpscStrategy: 'Connects ancient sites of Rajasthan (Bairat Ashokan inscription, Ganeshwar chalcolithic copper tools, Ahar black-and-red ware).',
    estimatedReadingHours: 35,
    keyTopicsCovered: ['Ashokan Major Rock Edict XIII (Kalinga)', 'Shramana vs Brahmana Tradition', 'Sangam Tinai Landscapes', 'Gupta Land Grants (Agrahara)', 'Meluhha Harappan Identification']
  },
  {
    id: 'book-dr-bhalla-rajasthan-district-gk',
    title: 'District-wise Rajasthan Factbook (राजस्थान जिला दर्शन - पुनर्गठित 50 जिले)',
    author: 'Dr. B.L. Bhalla & Dr. K.R. Sharma',
    edition: 'Latest Reorganized 50-District Edition',
    subject: 'Rajasthan Geography',
    category: 'RAJASTHAN_EXCLUSIVE',
    level: 'Standard Core (Must Read)',
    officialOrPdfLink: 'https://rajasthan.gov.in',
    description: 'Essential compendium covering the reorganized 50 administrative districts of Rajasthan: physical boundaries, newly carved tehsils, historical forts, temple architecture, and Geographical Indication (GI) tags.',
    mustReadChapters: [
      'Newly Created Districts: Anupgarh, Balotra, Beawar, Deeg, Didwana-Kuchaman, Dudu, Gangapur City, Jaipur Rural, Jodhpur Rural, Kekri, Kotputli-Behror, Khairthal-Tijara, Neem Ka Thana, Phalodi, Salumber, Sanchore, Shahpura',
      'Geographical Indication (GI) Tags of Rajasthan: Pokhran Pottery, Sanganeri Hand Block Print, Bagru Print, Blue Pottery of Jaipur, Thewa Art of Pratapgarh, Molela Clay Work, Kota Doria, Nathdwara Pichhwai Painting',
      'Major Mineral Belts by District: Barmer-Sanchore Petroleum Basin, Jhamarkotra Rock Phosphate (Udaipur), Rampura-Agucha Lead-Zinc (Bhilwara), Degana Tungsten (Nagaur)',
      'Historic Fairs & Melas: Pushkar Mela (Ajmer), Ramdevra (Jaisalmer), Sheetla Mata (Chaksu, Jaipur), Beneshwar Dham (Dungarpur Tribal Kumbh)'
    ],
    skimmableChapters: [
      'Sub-tehsil patwari circle listings'
    ],
    upscStrategy: 'N/A',
    rpscStrategy: 'Critical for 10-15 direct questions in upcoming RPSC exams. Questions test newly created boundaries, district headquarters, and mineral deposits.',
    estimatedReadingHours: 20,
    keyTopicsCovered: ['50 Reorganized Districts', 'Rajasthan GI Tags (Pichhwai, Thewa, Blue Pottery)', 'Beneshwar Dham Som-Mahi-Anas Confluence', 'Barmer-Sanchore Cairn Oilfields']
  }
];

// ---------------------------------------------------------------------------
// 2. Comprehensive Official Government Portals & Gazettes
// ---------------------------------------------------------------------------
export const EXPANDED_OFFICIAL_GOVERNMENT_PORTALS: OfficialGovernmentPortal[] = [
  {
    id: 'gov-upsc',
    name: 'Union Public Service Commission (UPSC)',
    nameHindi: 'संघ लोक सेवा आयोग',
    organization: 'Union Constitutional Body (Article 315-323)',
    url: 'https://upsc.gov.in',
    category: 'Union Constitutional',
    description: 'Apex constitutional recruiting agency for the Civil Services of the Union. The golden source for official CSE notifications, question papers, and answer keys.',
    officialMandate: 'Conduct examinations for appointment to the services of the Union under Article 320 of the Indian Constitution.',
    highYieldReports: [
      'Civil Services Examination Gazetted Notifications & Rulebook',
      'Previous 10 Years Prelims Paper-I & Paper-II Official Master Answer Keys',
      'UPSC Annual Reports on applicant demographics and optional subject performance',
      'Cut-Off Marks and Minimum Qualifying Criteria declarations'
    ],
    keyPrelimsUtility: 'Primary authority for interpreting the authentic boundaries of the UPSC CSE Prelims syllabus.',
    sampleQuestionPattern: 'Direct standard for multivariable analytical questions with "Which of the statements given above is/are correct?"'
  },
  {
    id: 'gov-rpsc',
    name: 'Rajasthan Public Service Commission (RPSC)',
    nameHindi: 'राजस्थान लोक सेवा आयोग',
    organization: 'State Constitutional Body (Article 315)',
    url: 'https://rpsc.rajasthan.gov.in',
    category: 'State Constitutional',
    description: 'Premier constitutional commission conducting the Rajasthan State and Subordinate Services (RAS/RTS) Combined Competitive Examination.',
    officialMandate: 'Advise the State Government on recruitment rules and conduct civil service selection for Rajasthan under Article 320.',
    highYieldReports: [
      'RAS/RTS Combined Competitive Examination Scheme & Notified Syllabus',
      'Official 5-Option OMR Guidelines & Penalty Regulations (1/3rd negative deduction)',
      'Master Question Papers & Final Revised Answer Keys with Expert Committee revisions',
      'Model Press Notes on exam calendar and district examination centers'
    ],
    keyPrelimsUtility: 'The sole legal reference for RPSC RAS paper pattern, eligibility criteria, and syllabus updates.',
    sampleQuestionPattern: 'Exact factual verification testing dates, district locations, acts, and statutory office-holders.'
  },
  {
    id: 'gov-pib',
    name: 'Press Information Bureau (PIB)',
    nameHindi: 'पत्र सूचना कार्यालय',
    organization: 'Ministry of Information and Broadcasting, Govt of India',
    url: 'https://pib.gov.in',
    category: 'Policy & Legislative',
    description: 'Nodal official communications agency disseminating all Union cabinet decisions, ministry initiatives, and gazetted welfare missions.',
    officialMandate: 'Authorize and release official press communiques on behalf of all Union ministries, Prime Minister Office, and Cabinet Secretariat.',
    highYieldReports: [
      'Cabinet Committee on Economic Affairs (CCEA) approved project clearances',
      'Ministry of Environment, Forest & Climate Change notifications on Ramsar sites & National Parks',
      'ISRO, DRDO and Department of Atomic Energy technological mission briefs',
      'Year-End Reviews (Ministry-wise summary releases in December-January)'
    ],
    keyPrelimsUtility: 'Direct source for 8-12 questions every year in UPSC Prelims on newly christened government portals, statutory boards, and flagship schemes.',
    sampleQuestionPattern: '"Consider the following statements regarding the PM-PRANAM scheme recently seen in the news..."'
  },
  {
    id: 'gov-dipr-sujas',
    name: 'DIPR Rajasthan (Sujas & Bulletin)',
    nameHindi: 'सूचना एवं जनसम्पर्क विभाग, राजस्थान सरकार',
    organization: 'Department of Information and Public Relations, Rajasthan',
    url: 'https://dipr.rajasthan.gov.in',
    category: 'Policy & Legislative',
    description: 'Official publicity and communication arm of the Government of Rajasthan. Publishes the indispensable monthly "Rajasthan Sujas" magazine.',
    officialMandate: 'Communicate state government policies, public welfare schemes, cultural events, and executive achievements to the populace.',
    highYieldReports: [
      'Rajasthan Sujas Monthly Magazine (राजस्थान सुजस मासिक पत्रिका)',
      'Daily Sujas E-Bulletin (दैनिक ई-बुलेटिन)',
      'Mukhyamantri Flagship Welfare Schemes Reference Compendium',
      'State Handicraft & Folk Culture Festival Calendar'
    ],
    keyPrelimsUtility: 'Accounts for 15-20 direct Prelims questions in RPSC RAS regarding state budget initiatives, subsidy limits, and beneficiary criteria.',
    sampleQuestionPattern: '"Under the Indira Rasoi Yojana / Annapurna Rasoi, what is the subsidized meal cost provided to beneficiaries?"'
  },
  {
    id: 'gov-prs-india',
    name: 'PRS Legislative Research',
    nameHindi: 'पीआरएस लेजिस्लेटिव रिसर्च',
    organization: 'Centre for Policy Research / Independent Legislative Body',
    url: 'https://prsindia.org',
    category: 'Policy & Legislative',
    description: 'Independent research institution providing non-partisan, comprehensive analysis of every parliamentary bill, ordinance, and state budget.',
    officialMandate: 'Enhance the legislative process by providing high-quality, transparent research to Members of Parliament and civil society.',
    highYieldReports: [
      'Monthly Policy Review & Parliament Session Wrap-ups',
      'Legislative Briefs on major reform bills (e.g. Criminal Law Acts, Digital Personal Data Protection Act)',
      'State of State Finances & Annual Rajasthan Budget Analysis',
      'Parliamentary Standing Committee Summaries and Recommendations'
    ],
    keyPrelimsUtility: 'The cleanest, most authoritative summary of parliamentary bills and statutory amendments tested in UPSC GS-II.',
    sampleQuestionPattern: '"With reference to the Mediation Act / Data Protection Act, consider the following statutory provisions..."'
  },
  {
    id: 'gov-niti-aayog',
    name: 'NITI Aayog (National Institution for Transforming India)',
    nameHindi: 'नीति आयोग',
    organization: 'Union Policy Think Tank (Replaced Planning Commission in 2015)',
    url: 'https://niti.gov.in',
    category: 'Policy & Legislative',
    description: 'Apex public policy think tank of the Government of India, driving cooperative federalism and evidence-based governance.',
    officialMandate: 'Foster cooperative federalism through structured support initiatives with States, serving as a knowledge and innovation repository.',
    highYieldReports: [
      'SDG India Index & Dashboard (State and UT rankings on 17 SDG goals)',
      'National Multidimensional Poverty Index (MPI) Reports',
      'Aspirational Districts Programme (ADP) & Aspirational Blocks performance metrics',
      'Composite Water Management Index (CWMI)'
    ],
    keyPrelimsUtility: 'Essential for indices, poverty calculation methodologies, and state-wise performance rankings in both UPSC and RPSC.',
    sampleQuestionPattern: '"Which of the following organizations releases the SDG India Index / National Multidimensional Poverty Index?"'
  },
  {
    id: 'gov-rbi',
    name: 'Reserve Bank of India (RBI)',
    nameHindi: 'भारतीय रिज़र्व बैंक',
    organization: 'India\'s Central Bank & Monetary Authority (RBI Act 1934)',
    url: 'https://rbi.org.in',
    category: 'Economic & Statistical',
    description: 'Central monetary authority regulating banking, currency issuance, foreign exchange management, and macroeconomic stability in India.',
    officialMandate: 'Regulate the issue of Bank notes and keeping of reserves with a view to securing monetary stability under the RBI Act 1934.',
    highYieldReports: [
      'Bi-monthly Monetary Policy Committee (MPC) Statements and Resolution Minutes',
      'Financial Stability Report (FSR) - published bi-annually',
      'Report on Currency and Finance (RCF)',
      'Weekly Statistical Supplement (Forex reserves, broad money M3, bank credit)'
    ],
    keyPrelimsUtility: 'Unlocks clarity on monetary policy tools (Repo, SDF, MSF, OMO) and foreign exchange management tested rigorously in UPSC.',
    sampleQuestionPattern: '"If the Reserve Bank of India adopts an expansionary monetary policy, which of the following would it NOT do?"'
  },
  {
    id: 'gov-mospi',
    name: 'Ministry of Statistics & Programme Implementation (MoSPI)',
    nameHindi: 'सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय',
    organization: 'Central Statistical Office & NSSO Authority',
    url: 'https://mospi.gov.in',
    category: 'Economic & Statistical',
    description: 'Nodal statistical ministry responsible for National Accounts Statistics, Consumer Price Index (CPI), Index of Industrial Production (IIP), and Periodic Labour Force Survey.',
    officialMandate: 'Collect, compile, and release official statistics on national economic aggregates and socio-demographic indicators.',
    highYieldReports: [
      'Quarterly Gross Domestic Product (GDP) & Gross Value Added (GVA) Estimates',
      'Consumer Price Index (CPI - Rural, Urban, Combined) Monthly Bulletins',
      'Index of Industrial Production (IIP) - Mining, Manufacturing, Electricity',
      'Annual Periodic Labour Force Survey (PLFS) Reports'
    ],
    keyPrelimsUtility: 'Source of base years, basket weightages, and statistical calculation methodologies tested in economy prelims.',
    sampleQuestionPattern: '"With reference to Consumer Price Index (CPI) and Wholesale Price Index (WPI), consider the following..."'
  },
  {
    id: 'gov-moefcc',
    name: 'Ministry of Environment, Forest & Climate Change (MoEFCC)',
    nameHindi: 'पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय',
    organization: 'Union Environmental Ministry & Wildlife Authority',
    url: 'https://moef.gov.in',
    category: 'Environmental',
    description: 'Central ministry overseeing environmental protection, biodiversity conservation, afforestation, climate treaties, and wildlife preservation.',
    officialMandate: 'Implement the Environment (Protection) Act 1986, Forest (Conservation) Act 1980, and Wildlife (Protection) Act 1972.',
    highYieldReports: [
      'India State of Forest Report (ISFR) - published biennially by Forest Survey of India (FSI)',
      'National Tiger Conservation Authority (NTCA) Status of Tigers in India Census',
      'Central Pollution Control Board (CPCB) National Air Quality Index (AQI) reports',
      'Notifications on Coastal Regulation Zones (CRZ) and Eco-Sensitive Zones (ESZ)'
    ],
    keyPrelimsUtility: 'Critical for questions regarding forest cover percentages, tree cover, carbon stock, and tiger population distributions.',
    sampleQuestionPattern: '"According to the India State of Forest Report, which state has the largest forest cover in terms of area?"'
  },
  {
    id: 'gov-bhuvan-isro',
    name: 'Bhuvan ISRO Geo-Portal & Survey of India',
    nameHindi: 'भुवन इसरो भू-पोर्टल एवं भारतीय सर्वेक्षण विभाग',
    organization: 'National Remote Sensing Centre (NRSC) / ISRO & Department of Science and Technology',
    url: 'https://bhuvan.nrsc.gov.in',
    category: 'Scientific & Defense',
    description: 'Indian geoportal showcasing 2D and 3D satellite imagery, spatial thematic maps of natural resources, wetlands, and water bodies.',
    officialMandate: 'Provide spatial data infrastructure, Earth observation products, and geographic information services across India.',
    highYieldReports: [
      'National Wetland Atlas & Desertification and Land Degradation Atlas of India',
      'Wasteland Atlas of India (depicting arid zones of Rajasthan and Gujarat)',
      'Disaster Management Support (Flood inundation & cyclone tracking maps)',
      'Solar Radiation Resource Maps for India (Bhadla, Pavagada, Dholera)'
    ],
    keyPrelimsUtility: 'Invaluable for geographic physical visualization of river basins, land degradation zones, and solar hotspots in Rajasthan.',
    sampleQuestionPattern: '"Which of the following states in India has the highest percentage of land undergoing desertification / land degradation?"'
  },
  {
    id: 'gov-vidhansabha-rajasthan',
    name: 'Rajasthan Legislative Assembly (राजस्थान विधानसभा)',
    nameHindi: 'राजस्थान विधान सभा',
    organization: 'State Legislature of Rajasthan',
    url: 'https://assembly.rajasthan.gov.in',
    category: 'Policy & Legislative',
    description: 'Official repository of Rajasthan State Legislative Assembly proceedings, enacted state acts, committee reports, and statutory rules.',
    officialMandate: 'Enact legislation for the state of Rajasthan under List II (State List) and List III (Concurrent List) of the Seventh Schedule.',
    highYieldReports: [
      'Full Compendium of Acts Passed by Rajasthan Legislative Assembly',
      'Rules of Procedure and Conduct of Business in Rajasthan Legislative Assembly',
      'State Public Accounts Committee (PAC) and Estimates Committee Reports',
      'Assembly Session Debates and Historical Speaker Roster'
    ],
    keyPrelimsUtility: 'RPSC RAS frequently tests questions on former Speakers, Pro-tem Speakers, Leader of Opposition, and assembly seat distributions.',
    sampleQuestionPattern: '"Who among the following was the first Speaker of Rajasthan Legislative Assembly?" (Answer: Narottam Lal Joshi)'
  },
  {
    id: 'gov-van-rajasthan',
    name: 'Rajasthan Forest Department (वन विभाग, राजस्थान)',
    nameHindi: 'वन विभाग, राजस्थान सरकार',
    organization: 'Forest Department, Government of Rajasthan',
    url: 'https://forest.rajasthan.gov.in',
    category: 'Environmental',
    description: 'Official department managing the 32,863 sq. km recorded forest area in Rajasthan, wildlife sanctuaries, and desert ecology preservation.',
    officialMandate: 'Conserve forest ecosystems, combat desertification, and manage protected wildlife reserves in Rajasthan.',
    highYieldReports: [
      'Rajasthan State Forest Report & Administrative Annual Progress Report',
      'Status of Tiger Reserves in Rajasthan (Ranthambore, Sariska, Mukundra, Ramgarh Vishdhari, Kumbhalgarh)',
      'State Animal (Chinkara & Camel), State Bird (Godawan / Great Indian Bustard), State Tree (Khejri) Conservation Projects',
      'Wetlands and Bird Sanctuaries Status (Keoladeo Ghana Bharatpur & Tal Chhapar Churu)'
    ],
    keyPrelimsUtility: 'Direct source for questions on Rajasthan forest types (Tropical Dry Deciduous, Anogeissus pendula/Dhok), and wildlife census.',
    sampleQuestionPattern: '"Which tree species occupies the largest percentage of forest area in Rajasthan?" (Answer: Dhokra / Dhok - Anogeissus pendula)'
  },
  {
    id: 'gov-cgwb-jalshakti',
    name: 'Central Ground Water Board (CGWB) & Ministry of Jal Shakti',
    nameHindi: 'केन्द्रीय भूमि जल बोर्ड एवं जल शक्ति मंत्रालय',
    organization: 'Ministry of Jal Shakti, Government of India',
    url: 'https://cgwb.gov.in',
    category: 'Environmental',
    description: 'National apex agency for groundwater assessment, dynamic water resources mapping, rainwater harvesting standards, and river basin management.',
    officialMandate: 'Provide scientific inputs for sustainable management and regulation of country’s groundwater resources under Jal Jeevan Mission and National Water Policy.',
    highYieldReports: [
      'National Dynamic Ground Water Resources of India Assessment',
      'National Aquifer Mapping and Management Programme (NAQUIM) Atlas',
      'Atal Bhujal Yojana (ABHY) Annual Progress Report (Priority implementation in 7 states including Rajasthan)',
      'Eastern Rajasthan Canal Project (ERCP) / Modified Parbati-Kalisindh-Chambal (PKC) Link MoU Updates'
    ],
    keyPrelimsUtility: 'Direct source for questions regarding over-exploited vs critical groundwater assessment blocks in Rajasthan and inter-linking of rivers.',
    sampleQuestionPattern: '"Under Atal Bhujal Yojana, which institutional mechanism is mandated at the Gram Panchayat level for community water budgeting?"'
  },
  {
    id: 'gov-eci',
    name: 'Election Commission of India (ECI)',
    nameHindi: 'भारत निर्वाचन आयोग',
    organization: 'Union Constitutional Body (Article 324)',
    url: 'https://eci.gov.in',
    category: 'Union Constitutional',
    description: 'Autonomous constitutional authority administering Union and State election processes in India, voter registrations, and political party recognition.',
    officialMandate: 'Superintendence, direction, and control of elections to Parliament, State Legislatures, and the offices of President and Vice-President of India under Article 324.',
    highYieldReports: [
      'Model Code of Conduct (MCC) for Guidance of Political Parties and Candidates Compendium',
      'Conditions for Recognition as a National Party or State Party under Election Symbols Order 1968',
      'Manual on Electronic Voting Machines (EVM) and Voter Verifiable Paper Audit Trail (VVPAT)',
      'Delimitation of Parliamentary and Assembly Constituencies Orders'
    ],
    keyPrelimsUtility: 'Indispensable for exact statutory questions on Representation of the People Act 1950 & 1951, election petitions, and national party criteria.',
    sampleQuestionPattern: '"Which of the following conditions must be fulfilled by a political party to be recognized as a National Party in India?"'
  },
  {
    id: 'gov-law-min',
    name: 'Ministry of Law and Justice (Legislative Dept & Law Commission)',
    nameHindi: 'विधि एवं न्याय मंत्रालय (विधायी विभाग)',
    organization: 'Union Ministry for Legal Affairs & Statutory Reform',
    url: 'https://lawmin.gov.in',
    category: 'Policy & Legislative',
    description: 'Central custodian of the Indian Statute Book, constitutional amendment acts, legal reforms, and reports of the Law Commission of India.',
    officialMandate: 'Draft government bills, advise ministries on legal and constitutional interpretations, and manage statutory codifications.',
    highYieldReports: [
      'Official Gazetted Texts of Bharatiya Nyaya Sanhita (BNS), BNSS, and Bharatiya Sakshya Adhiniyam (BSA)',
      '106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam - Women’s Reservation)',
      'Law Commission of India Reports on Simultaneous Elections & Electoral Reforms',
      'Digital Personal Data Protection Act (DPDP Act 2023) Gazette Notification'
    ],
    keyPrelimsUtility: 'Authoritative baseline for testing newly enacted central criminal statutes and constitutional amendments in UPSC & RPSC.',
    sampleQuestionPattern: '"The 106th Constitutional Amendment Act provides reservation for women in which of the following bodies?"'
  },
  {
    id: 'gov-trifed-tribal',
    name: 'Ministry of Tribal Affairs & TRIFED',
    nameHindi: 'जनजातीय कार्य मंत्रालय एवं ट्राइफेड',
    organization: 'Union Ministry for Tribal Development & Tribal Co-operative Marketing Federation',
    url: 'https://tribal.nic.in',
    category: 'Policy & Legislative',
    description: 'Nodal ministry for the overall socio-economic development of Scheduled Tribes (STs) in India and preservation of tribal culture and customary forest rights.',
    officialMandate: 'Implement the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act 2006 and Panchayats (Extension to Scheduled Areas) Act 1996 (PESA).',
    highYieldReports: [
      'Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan (PM-JANMAN) Guidelines for 75 PVTG communities',
      'Implementation Status of Forest Rights Act (FRA 2006) - Individual and Community Forest Rights',
      'Pradhan Mantri Van Dhan Vikas Yojana & Minor Forest Produce (MFP) Minimum Support Price List',
      'Eklavya Model Residential Schools (EMRS) National Evaluation'
    ],
    keyPrelimsUtility: 'Directly tested in UPSC & RPSC questions on Particularly Vulnerable Tribal Groups (PVTGs) (e.g. Sahariya of Baran district in Rajasthan) and PESA rules.',
    sampleQuestionPattern: '"Which is the only Particularly Vulnerable Tribal Group (PVTG) officially recognized in Rajasthan?" (Answer: Sahariya)'
  },
  {
    id: 'gov-board-of-revenue-raj',
    name: 'Board of Revenue for Rajasthan, Ajmer (राजस्व मण्डल, राजस्थान)',
    nameHindi: 'राजस्व मण्डल, अजमेर',
    organization: 'Apex Revenue Court of Rajasthan',
    url: 'https://landrecords.rajasthan.gov.in',
    category: 'State Constitutional',
    description: 'The highest court of appeal, revision, and reference in revenue and tenancy matters in Rajasthan, established in 1949 with its headquarters at Ajmer.',
    officialMandate: 'Superintendence of all subordinate revenue courts (Divisional Commissioners, District Collectors, SDOs, Tehsildars) and publication of Agricultural Census.',
    highYieldReports: [
      'Compendium of Rajasthan Tenancy Act 1955 and Rajasthan Land Revenue Act 1956',
      'Rajasthan Quinquennial Agricultural & Livestock Census Reports',
      'Apna Khata (E-Dharti) Digital Land Records & Jamabandi Operations Guidelines',
      'Land Mutation and Girdawari Procedures Manual'
    ],
    keyPrelimsUtility: 'Vital for RPSC RAS questions on Rajasthan land tenure systems (Khatedari rights), revenue court hierarchies, and livestock census figures.',
    sampleQuestionPattern: '"Under the Rajasthan Tenancy Act 1955, who among the following is the final appellate court for revenue disputes?" (Answer: Board of Revenue, Ajmer)'
  },
  {
    id: 'gov-rrecl',
    name: 'Rajasthan Renewable Energy Corporation Limited (RRECL)',
    nameHindi: 'राजस्थान अक्षय ऊर्जा निगम लिमिटेड',
    organization: 'State Nodal Agency for Renewable Energy (Govt of Rajasthan)',
    url: 'https://energy.rajasthan.gov.in/rrecl',
    category: 'Scientific & Defense',
    description: 'Premier state nodal corporation driving Rajasthan\'s leadership as India\'s #1 solar state, spearheading mega solar parks, rooftop installations, and wind-solar hybrid projects.',
    officialMandate: 'Promote renewable energy sources, facilitate private developer clearances, and implement state solar and wind policies.',
    highYieldReports: [
      'Rajasthan Solar Energy Policy 2019 & Rajasthan Wind and Hybrid Energy Policy 2019',
      'Status Report on World’s Largest Bhadla Solar Park (2,245 MW) in Phalodi/Jodhpur',
      'Ultra Mega Renewable Energy Solar Parks (UMRESP) under development in Bikaner and Jaisalmer',
      'PM-KUSUM Scheme Component-A, B & C Progress in Rajasthan'
    ],
    keyPrelimsUtility: 'Source of exact capacity figures, developer names, and solar park locations tested routinely in RPSC RAS Prelims.',
    sampleQuestionPattern: '"What is the total operational capacity of the Bhadla Solar Park in Rajasthan?" (Answer: 2,245 MW)'
  },
  {
    id: 'gov-gsi-mines',
    name: 'Geological Survey of India (GSI) & Ministry of Mines',
    nameHindi: 'भारतीय भूवैज्ञानिक सर्वेक्षण एवं खान मंत्रालय',
    organization: 'Department of Mines, Govt of India',
    url: 'https://gsi.gov.in',
    category: 'Scientific & Defense',
    description: 'Premier geoscientific organization conducting systematic geological mapping, mineral explorations, offshore surveys, and disaster mitigation.',
    officialMandate: 'Create and update national geoscientific data, conduct baseline mineral investigations, and manage National Mineral Exploration Trust (NMET).',
    highYieldReports: [
      'Critical and Strategic Minerals of India List (24 Critical Minerals identified in 2023)',
      'Lithium Mineralization Exploration Reports (Reasi J&K and Degana Nagaur Rajasthan)',
      'National Mineral Policy & Mines and Minerals (Development and Regulation) Amendment Acts',
      'Rare Earth Elements (REE) and Heavy Mineral Placers in India'
    ],
    keyPrelimsUtility: 'Topical questions in both UPSC and RPSC on critical mineral supply chains, auction rules, and recent geological finds in Rajasthan.',
    sampleQuestionPattern: '"Which mineral exploration site in Rajasthan has recently been investigated for potential Lithium and Tungsten occurrences?" (Answer: Degana, Nagaur)'
  },
  {
    id: 'gov-isro',
    name: 'Indian Space Research Organisation (ISRO)',
    nameHindi: 'भारतीय अंतरिक्ष अनुसंधान संगठन',
    organization: 'Department of Space, Government of India',
    url: 'https://isro.gov.in',
    category: 'Scientific & Defense',
    description: 'Pioneering civil space agency of India, executing national missions for satellite telecommunications, Earth observation, lunar exploration, and human spaceflight.',
    officialMandate: 'Harness space technology for national development while pursuing space science research and planetary exploration.',
    highYieldReports: [
      'Chandrayaan-3 Mission Overview & Shiv Shakti Point Designation at Lunar South Pole',
      'Aditya-L1 Solar Mission (Payloads: VELC, SUIT, ASPEX, PAPA at Sun-Earth L1 point)',
      'Gaganyaan Human Spaceflight Mission Architecture & Vyommitra humanoid test flights',
      'Small Satellite Launch Vehicle (SSLV) & LVM3 Commercial Launch Capabilities'
    ],
    keyPrelimsUtility: 'Accounts for 3-5 direct questions in both UPSC and RPSC Prelims regarding orbit mechanics, payload instrumentation, and space policy.',
    sampleQuestionPattern: '"Which of the following payloads onboard Aditya-L1 is designed to image the solar corona in visible light?" (Answer: VELC)'
  }
];

// ---------------------------------------------------------------------------
// 3. Official Previous Years' Question Papers & Keys Repository
// ---------------------------------------------------------------------------
export const OFFICIAL_PYQ_REPOSITORY: OfficialPyqArchive[] = [
  {
    id: 'pyq-upsc-pre-2024',
    exam: 'UPSC CSE Prelims',
    year: 2024,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 100,
    totalMarks: 200,
    timeAllowed: '2 Hours (120 Minutes)',
    negativeMarking: '1/3rd (0.66 marks deducted per wrong answer)',
    officialKeyStatus: 'Released by UPSC in June 2024',
    cutoffScoreEstimate: 'Expected around 88 - 92 marks for General category',
    weightageBreakdown: {
      'Polity & Constitution': 15,
      'Economy & Banking': 16,
      'Environment & Ecology': 18,
      'Geography & Agriculture': 17,
      'Ancient & Medieval History': 8,
      'Modern Indian History': 6,
      'Art & Culture': 5,
      'Science & Technology': 10,
      'International Affairs': 5
    },
    officialQuestionPaperUrl: 'https://upsc.gov.in/examinations/previous-question-papers',
    officialAnswerKeyUrl: 'https://upsc.gov.in/examinations/answer-keys',
    strategicAnalysis: 'Shifted back to standard elimination tactics after the extreme pair-based formats of 2023. Strong emphasis on constitutional nuances, critical minerals, space missions, and biodiversity conventions.'
  },
  {
    id: 'pyq-upsc-pre-2023',
    exam: 'UPSC CSE Prelims',
    year: 2023,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 100,
    totalMarks: 200,
    timeAllowed: '2 Hours',
    negativeMarking: '1/3rd negative deduction',
    officialKeyStatus: 'Final Official Answer Key Published',
    cutoffScoreEstimate: '75.41 Marks (Lowest in CSE history for General category)',
    weightageBreakdown: {
      'Polity & Constitution': 15,
      'Economy & Social Dev': 17,
      'Environment & Ecology': 19,
      'Geography & Maps': 16,
      'History & Art-Culture': 14,
      'Science & Technology': 11,
      'Current Affairs & Summits': 8
    },
    officialQuestionPaperUrl: 'https://upsc.gov.in',
    officialAnswerKeyUrl: 'https://upsc.gov.in',
    strategicAnalysis: 'Famous for introduction of "Only one pair / Only two pairs / All three pairs" options that neutralized standard elimination techniques. Demonstrated the need for absolute conceptual accuracy.'
  },
  {
    id: 'pyq-upsc-pre-2022',
    exam: 'UPSC CSE Prelims',
    year: 2022,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 100,
    totalMarks: 200,
    timeAllowed: '2 Hours',
    negativeMarking: '1/3rd negative deduction',
    officialKeyStatus: 'Official Answer Key Available',
    cutoffScoreEstimate: '88.22 Marks for General category',
    weightageBreakdown: {
      'Polity & Governance': 11,
      'Economy & Banking': 17,
      'Environment & Ecology': 16,
      'Geography': 13,
      'Ancient & Medieval History': 10,
      'Modern History': 6,
      'Science & Technology': 14,
      'International Bodies': 13
    },
    officialQuestionPaperUrl: 'https://upsc.gov.in',
    officialAnswerKeyUrl: 'https://upsc.gov.in',
    strategicAnalysis: 'High focus on Indian economy (inflation, bond yields, NEER/REER) and international treaties. Science & Tech focused on Web 3.0, NFTs, and DNA barcoding.'
  },
  {
    id: 'pyq-rpsc-ras-2023',
    exam: 'RPSC RAS Prelims',
    year: 2023,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 150,
    totalMarks: 200,
    timeAllowed: '3 Hours (180 Minutes)',
    negativeMarking: '1/3rd deduction for wrong answer or failure to darken 5th option',
    officialKeyStatus: 'Final Master Key Published by RPSC',
    cutoffScoreEstimate: '100.69 Marks for General Male / Female',
    weightageBreakdown: {
      'Rajasthan History, Art & Culture': 26,
      'Rajasthan Geography & Resources': 18,
      'Rajasthan Economy & Schemes': 21,
      'Rajasthan Polity & Institutions': 12,
      'Indian Polity & Constitution': 14,
      'Indian & World Geography': 13,
      'Indian Economy': 11,
      'General Science & Technology': 20,
      'Logical Reasoning & Mental Ability': 15
    },
    officialQuestionPaperUrl: 'https://rpsc.rajasthan.gov.in/previous-question-papers',
    officialAnswerKeyUrl: 'https://rpsc.rajasthan.gov.in/answer-keys',
    strategicAnalysis: 'First examination to enforce the mandatory 5-Option OMR rule. 77 out of 150 questions (51.3%) came strictly from Rajasthan-specific syllabus, proving the indispensability of the 20% Rajasthan Fortress Layer.'
  },
  {
    id: 'pyq-rpsc-ras-2021',
    exam: 'RPSC RAS Prelims',
    year: 2021,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 150,
    totalMarks: 200,
    timeAllowed: '3 Hours',
    negativeMarking: '1/3rd deduction',
    officialKeyStatus: 'Final Answer Key Published',
    cutoffScoreEstimate: '84.72 Marks for General Category',
    weightageBreakdown: {
      'Rajasthan History, Art & Culture': 25,
      'Rajasthan Geography': 16,
      'Rajasthan Economy (Survey)': 19,
      'Rajasthan Polity': 10,
      'Indian Polity': 15,
      'Indian & World Geography': 14,
      'Indian Economy': 12,
      'General Science': 19,
      'Mental Ability & Math': 20
    },
    officialQuestionPaperUrl: 'https://rpsc.rajasthan.gov.in',
    officialAnswerKeyUrl: 'https://rpsc.rajasthan.gov.in',
    strategicAnalysis: 'Rajasthan Economic Review (Aarthik Sameeksha) accounted for nearly 19 direct questions. Science questions tested everyday physics, vitamin deficiencies, and nanotechnology applications.'
  },
  {
    id: 'pyq-rpsc-ras-2018',
    exam: 'RPSC RAS Prelims',
    year: 2018,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 150,
    totalMarks: 200,
    timeAllowed: '3 Hours',
    negativeMarking: '1/3rd deduction',
    officialKeyStatus: 'Final Master Key Archived',
    cutoffScoreEstimate: '76.06 Marks for General Category',
    weightageBreakdown: {
      'Rajasthan History & Culture': 24,
      'Rajasthan Geography': 17,
      'Rajasthan Economy': 16,
      'Rajasthan Administration': 11,
      'Indian Polity': 16,
      'Geography (India & World)': 15,
      'Economy': 11,
      'Science & Technology': 20,
      'Reasoning & Aptitude': 20
    },
    officialQuestionPaperUrl: 'https://rpsc.rajasthan.gov.in',
    officialAnswerKeyUrl: 'https://rpsc.rajasthan.gov.in',
    strategicAnalysis: 'Established the classic pattern where mastering common Indian Polity and Geography combined with Rajasthan Economic Review comfortably crosses the preliminary qualifying mark.'
  },
  {
    id: 'pyq-upsc-pre-2021',
    exam: 'UPSC CSE Prelims',
    year: 2021,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 100,
    totalMarks: 200,
    timeAllowed: '2 Hours',
    negativeMarking: '1/3rd negative deduction',
    officialKeyStatus: 'Official Answer Key Archived by UPSC',
    cutoffScoreEstimate: '87.54 Marks for General category',
    weightageBreakdown: {
      'Polity & Constitution': 15,
      'Economy & Banking': 14,
      'Environment & Biodiversity': 18,
      'Geography & Agriculture': 16,
      'History & Art-Culture': 16,
      'Science & Technology': 11,
      'Sports & Awards': 5,
      'Current Affairs & Governance': 5
    },
    officialQuestionPaperUrl: 'https://upsc.gov.in/examinations/previous-question-papers',
    officialAnswerKeyUrl: 'https://upsc.gov.in/examinations/answer-keys',
    strategicAnalysis: 'Surprised aspirants with questions on sports awards (Khel Ratna, ICC World Test Championship) and heavy focus on conceptual polity ("Constitutional government by definition is limited government") and agricultural practices (biochar, permaculture, pulse production).'
  },
  {
    id: 'pyq-upsc-pre-2020',
    exam: 'UPSC CSE Prelims',
    year: 2020,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 100,
    totalMarks: 200,
    timeAllowed: '2 Hours',
    negativeMarking: '1/3rd negative deduction',
    officialKeyStatus: 'Official Answer Key Archived by UPSC',
    cutoffScoreEstimate: '92.51 Marks for General category',
    weightageBreakdown: {
      'Polity & Law': 17,
      'Economy & Agriculture': 18,
      'Environment & Ecology': 17,
      'Geography & Natural Resources': 10,
      'Ancient & Medieval History': 14,
      'Modern Indian History': 6,
      'Science & Tech': 12,
      'International Bodies': 6
    },
    officialQuestionPaperUrl: 'https://upsc.gov.in',
    officialAnswerKeyUrl: 'https://upsc.gov.in',
    strategicAnalysis: 'Famous for detailed agriculture finance questions (Kisan Credit Cards, commercial bank priority lending) and tricky terms from ancient India (e.g. Parivrajaka, Shramana, Upasaka). Set a new benchmark for deep NCERT reading.'
  },
  {
    id: 'pyq-upsc-csat-2024',
    exam: 'UPSC CSE Prelims',
    year: 2024,
    paper: 'Paper-II (CSAT / Aptitude)',
    totalQuestions: 80,
    totalMarks: 200,
    timeAllowed: '2 Hours',
    negativeMarking: '1/3rd (0.83 marks deducted per incorrect question)',
    officialKeyStatus: 'Master Evaluation Key Published',
    cutoffScoreEstimate: 'Qualifying Benchmark: 33% (66.67 Marks mandatory)',
    weightageBreakdown: {
      'Reading Comprehension (Inference & Assumptions)': 27,
      'Number Systems & Divisibility': 21,
      'Permutation, Combination & Probability': 7,
      'Logical Deductions & Syllogisms': 12,
      'Data Sufficiency & Analytical Puzzles': 8,
      'Time, Speed, Distance & Work': 5
    },
    officialQuestionPaperUrl: 'https://upsc.gov.in',
    officialAnswerKeyUrl: 'https://upsc.gov.in',
    strategicAnalysis: 'CSAT has become the single biggest filter elimination paper. Aspirants must avoid excessive mathematics traps and secure 24-26 accurate reading comprehension questions combined with foundational number system logic.'
  },
  {
    id: 'pyq-rpsc-ras-2016',
    exam: 'RPSC RAS Prelims',
    year: 2016,
    paper: 'Paper-I (General Studies)',
    totalQuestions: 150,
    totalMarks: 200,
    timeAllowed: '3 Hours',
    negativeMarking: '1/3rd deduction',
    officialKeyStatus: 'Final Master Key Archived',
    cutoffScoreEstimate: '78.54 Marks for General Male',
    weightageBreakdown: {
      'Rajasthan History, Art & Culture': 27,
      'Rajasthan Geography': 17,
      'Rajasthan Economy': 14,
      'Rajasthan Polity': 9,
      'Indian Polity': 14,
      'Indian & World Geography': 14,
      'Economy': 12,
      'General Science': 21,
      'Reasoning & Aptitude': 22
    },
    officialQuestionPaperUrl: 'https://rpsc.rajasthan.gov.in',
    officialAnswerKeyUrl: 'https://rpsc.rajasthan.gov.in',
    strategicAnalysis: 'Clean demonstration that scoring 45+ questions from Rajasthan Special combined with 20 questions in General Science and Mental Ability guarantees clearing the prelims cutoff with a 20-mark cushion.'
  },
  {
    id: 'pyq-rpsc-ras-mains-paper4',
    exam: 'RPSC RAS Prelims',
    year: 2023,
    paper: 'Paper-II (CSAT / Aptitude)',
    totalQuestions: 120,
    totalMarks: 200,
    timeAllowed: '3 Hours',
    negativeMarking: 'Zero (Descriptive subjective evaluation)',
    officialKeyStatus: 'Model Answer Blueprint Archived',
    cutoffScoreEstimate: 'Top Rankers Score: 110 – 128 Marks (Rank 1 achieved 122)',
    weightageBreakdown: {
      'Part A (General Hindi Grammar)': 50,
      'Part B (Hindi Comprehension, Precis, Translation)': 50,
      'Part C (Hindi Essay / Nibandh)': 20,
      'Part A (General English Grammar)': 20,
      'Part B (English Comprehension, Precis, Letter)': 30,
      'Part C (English Essay & Composition)': 30
    },
    officialQuestionPaperUrl: 'https://rpsc.rajasthan.gov.in',
    officialAnswerKeyUrl: 'https://rpsc.rajasthan.gov.in',
    strategicAnalysis: 'Paper-IV (General Hindi & English) is universally known as the "Rank Maker" of RPSC RAS. Unlike General Studies papers where scores cluster between 70-85, Paper-IV enables prepared candidates to score 120+, creating insurmountable rank leads.'
  }
];

// ---------------------------------------------------------------------------
// 4. Current Affairs Magazines & Annual Reference Compendiums
// ---------------------------------------------------------------------------
export const CURRENT_AFFAIRS_MAGAZINES: CurrentAffairsCompendium[] = [
  {
    id: 'mag-yojana',
    title: 'Yojana (योजना मासिक पत्रिका)',
    publisher: 'Publications Division, Ministry of Information & Broadcasting, Govt of India',
    frequency: 'Monthly',
    languageAvailability: 'Hindi & English',
    targetExam: 'DUAL',
    officialUrl: 'https://www.publicationsdivision.nic.in/journals/yojana',
    description: 'Devoted to socio-economic issues and developmental perspectives. Each issue focuses on a dedicated theme (e.g. Infrastructure, Water Security, Tribal Development, Artificial Intelligence).',
    highYieldThemes: [
      'Federal Fiscal Transfers & Infrastructure Financing',
      'Inclusive Growth, Skill Development & Tribal Welfare Schemes',
      'Green Energy Transition, Biofuels & Climate Resilience',
      'Digital Public Infrastructure (Aadhaar, UPI, DigiLocker, ONDC)'
    ],
    howToMakeNotes: 'Do not read line-by-line. Extract introductory context, statistics, governmental schemes, and 4-5 bullet points of structural challenges and recommendations.'
  },
  {
    id: 'mag-kurukshetra',
    title: 'Kurukshetra (कुरुक्षेत्र ग्रामीण विकास पत्रिका)',
    publisher: 'Ministry of Rural Development, Government of India',
    frequency: 'Monthly',
    languageAvailability: 'Hindi & English',
    targetExam: 'DUAL',
    officialUrl: 'https://www.publicationsdivision.nic.in/journals/kurukshetra',
    description: 'Premier journal dedicated to rural development, agrarian technologies, water harvesting, Panchayati Raj institutions, and rural entrepreneurship.',
    highYieldThemes: [
      'Panchayati Raj Institutions & Fiscal Empowerment of Gram Panchayats',
      'Micro-Irrigation, Watershed Management & Millets (Shree Anna)',
      'Self Help Groups (SHGs), DAY-NRLM & Lakhpati Didi Initiative',
      'Rural Sanitation (Swachh Bharat Mission Grameen) & Jal Jeevan Mission'
    ],
    howToMakeNotes: 'Extract best practice case studies and central ministry schemes for direct linkage in agriculture and local self-government questions.'
  },
  {
    id: 'mag-sujas-rajasthan',
    title: 'Rajasthan Sujas (राजस्थान सुजस मासिक)',
    publisher: 'DIPR, Government of Rajasthan',
    frequency: 'Monthly',
    languageAvailability: 'Hindi',
    targetExam: 'RPSC',
    officialUrl: 'https://dipr.rajasthan.gov.in',
    description: 'The mandatory state-level current affairs magazine for RPSC RAS. Contains in-depth reviews of Chief Minister announcements, industrial parks, health schemes, and state awards.',
    highYieldThemes: [
      'Rajasthan State Budget Highlights & Special Incentive Packages',
      'Mukhyamantri Chiranjeevi, Ayushman & Annapurna Rasoi Guidelines',
      'State Tourism Circuit Launches & UNESCO Intangible Cultural Fairs',
      'District Collector Best Practices & Grassroots E-Governance Initiatives'
    ],
    howToMakeNotes: 'Note down exact scheme start dates, target eligibility age/income brackets, nodal departments, and monetary allocations.'
  },
  {
    id: 'mag-india-year-book',
    title: 'India Year Book (भारत संदर्भ ग्रन्थ)',
    publisher: 'Publications Division, Govt of India',
    frequency: 'Annual',
    languageAvailability: 'Hindi & English',
    targetExam: 'UPSC',
    officialUrl: 'https://www.publicationsdivision.nic.in',
    description: 'Comprehensive annual digest giving a complete picture of developmental activities and policy accomplishments of all central ministries.',
    highYieldThemes: [
      'Land and the People: Demographic indicators, national symbols, census highlights',
      'Agriculture, Water Resources & Irrigation Projects',
      'Basic Economic Data, Defense Achievements & Scientific Research',
      'Welfare Schemes for SCs, STs, OBCs, Women and Differently Abled'
    ],
    howToMakeNotes: 'Read selectively: Chapters on Land and People, Energy, Environment, Water Resources, and Welfare are highest yield.'
  },
  {
    id: 'mag-down-to-earth',
    title: 'Down To Earth (DTE - पाक्षिक पर्यावरण पत्रिका)',
    publisher: 'Centre for Science and Environment (CSE / Sunita Narain)',
    frequency: 'Bi-Monthly',
    languageAvailability: 'Hindi & English',
    targetExam: 'DUAL',
    officialUrl: 'https://www.downtoearth.org.in',
    description: 'Premier environmental science and developmental journalism magazine. Essential for tracking ecological conflicts, biodiversity losses, COP summits, air quality crises, and sustainable agriculture.',
    highYieldThemes: [
      'COP Climate Negotiations (Loss and Damage Fund, Global Stocktake, Article 6 carbon markets)',
      'Desertification & Land Degradation in Western India and Thar Arid Ecosystems',
      'Renewable Energy Transitions vs Land Rights & Godawan Habitat Preservation',
      'Air Pollution (Stubble Burning, PM2.5/PM10 dynamics, CPCB Graded Response Action Plan)'
    ],
    howToMakeNotes: 'Extract ground-level case studies, scientific findings on climate tipping points, and innovative community conservation models.'
  },
  {
    id: 'mag-epw',
    title: 'Economic & Political Weekly (EPW)',
    publisher: 'Sameeksha Trust',
    frequency: 'Monthly',
    languageAvailability: 'English',
    targetExam: 'UPSC',
    officialUrl: 'https://www.epw.in',
    description: 'The highest-standard academic journal in South Asia for contemporary economic policy, social anthropology, agrarian relations, federal governance, and constitutional jurisprudence.',
    highYieldThemes: [
      'Centre-State Fiscal Federalism and Terms of Reference of Finance Commissions',
      'Agrarian Distress, Minimum Support Price (MSP) legal guarantees & crop diversification',
      'Informal Labour Markets, Gig Economy regulations & Social Security code rollout',
      'Public Healthcare Financing & Sub-national welfare model comparisons'
    ],
    howToMakeNotes: 'Focus on the "Commentary" and "Special Articles" sections. Note structural critiques, economic counter-perspectives, and empirical evidence.'
  },
  {
    id: 'mag-world-focus',
    title: 'World Focus (विश्व मंच मासिक)',
    publisher: 'World Focus Publications, New Delhi',
    frequency: 'Monthly',
    languageAvailability: 'Hindi & English',
    targetExam: 'DUAL',
    officialUrl: 'https://worldfocus.in',
    description: 'Specialized monthly journal dedicated entirely to India\'s foreign policy, geopolitical shifts, bilateral relations, and multilateral summits.',
    highYieldThemes: [
      'Indo-Pacific Geopolitics, QUAD, and Indian Ocean Naval Security Architecture',
      'West Asia / Middle East Crisis (IMEC corridor, Red Sea shipping security, I2U2)',
      'Global South Advocacy, African Union inclusion in G20, and BRICS Expansion',
      'India-Central Asia Connect Policy & International North-South Transport Corridor (INSTC)'
    ],
    howToMakeNotes: 'Organize notes by geographic region and bilateral partnership: convergence areas, points of friction, strategic connectivity projects, and diaspora interests.'
  },
  {
    id: 'mag-rajasthan-pragati',
    title: 'Rajasthan Pragati & Economic Digest (राजस्थान प्रगति त्रैमासिक)',
    publisher: 'Directorate of Economics & Statistics (DES), Govt of Rajasthan',
    frequency: 'Monthly',
    languageAvailability: 'Hindi',
    targetExam: 'RPSC',
    officialUrl: 'https://statistics.rajasthan.gov.in',
    description: 'Quarterly state-level review tracking physical and financial milestones of key welfare schemes, district SDG rankings, industrial output, and state infrastructure projects.',
    highYieldThemes: [
      'District-wise Sustainable Development Goals (SDG) Rajasthan Ranking & Index',
      'Industrial Investment Realizations under Invest Rajasthan and RIICO Industrial Areas',
      'Pachpadra (Barmer) Petroleum Refinery & Petrochemical Complex Progress (74:26 JV)',
      'Progress on Eastern Rajasthan Canal Project (ERCP) / Modified PKC Link'
    ],
    howToMakeNotes: 'Note specific top and bottom performing districts in SDG indices, financial expenditure ratios, and newly commissioned infrastructure facilities.'
  }
];

// ---------------------------------------------------------------------------
// 5. High-Yield Quick Reference Cheat Sheets & Handouts
// ---------------------------------------------------------------------------
export const HIGH_YIELD_CHEAT_SHEETS: HighYieldCheatSheet[] = [
  {
    id: 'cs-constitution-parts-schedules',
    title: 'Constitutional Parts, Schedules & Landmark Amendments Master Matrix',
    titleHindi: 'संविधान के भाग, अनुसूचियां एवं प्रमुख संशोधन मास्टर चार्ट',
    subject: 'Indian Polity & Governance',
    category: 'DUAL_OVERLAP',
    summary: 'Complete architectural blueprint of the Indian Constitution, detailing key articles, 12 schedules, and landmark constitutional amendment acts tested in both UPSC and RPSC.',
    quickFacts: [
      { label: 'Part III (Articles 12-35)', value: 'Fundamental Rights (Magna Carta of India). Enforceable via Art 32 (SC) and Art 226 (HC).' },
      { label: 'Part IV & IVA (Articles 36-51A)', value: 'DPSPs (Non-justiciable, Art 37) & Fundamental Duties (42nd Amendment 1976, Swaran Singh Committee).' },
      { label: 'Part IX & IXA (Articles 243-243ZG)', value: 'Panchayats (73rd CAA, 11th Schedule, 29 subjects) & Municipalities (74th CAA, 12th Schedule, 18 subjects).' },
      { label: 'Schedule 7 (Article 246)', value: 'Union List (100 subjects), State List (61 subjects), Concurrent List (52 subjects).' },
      { label: 'Schedule 8 (Articles 344 & 351)', value: '22 Recognized Languages. Sindhi (21st CAA), Konkani, Manipuri, Nepali (71st CAA), Bodo, Dogri, Maithili, Santhali (92nd CAA).' },
      { label: '106th CAA (2023)', value: 'Nari Shakti Vandan Adhiniyam: 33% reservation for women in Lok Sabha, State Legislative Assemblies, and NCT of Delhi for 15 years.' },
      { label: '103rd CAA (2019)', value: '10% EWS reservation in admissions and government jobs (Articles 15(6) and 16(6)).' },
      { label: '101st CAA (2016)', value: 'Goods and Services Tax (GST) rollout and insertion of Article 279A (GST Council).' }
    ],
    keyMnemonicOrRule: 'T-E-A-R-S O-F O-L-D P-M (12 Schedules: Territory, Emoluments, Affirmations, Rajya Sabha, Scheduled areas, Other tribal areas, Federal lists, Official languages, Land reforms, Defection, Municipalities, Panchayats)',
    examApplicationTip: 'UPSC tests inter-article harmony and constitutional intent (e.g. Right to Privacy under Art 21). RPSC tests exact clause numbers and chronological sequence of amendments.',
    tags: ['Polity', 'Constitution', 'Articles', 'Schedules', 'Amendments']
  },
  {
    id: 'cs-rajasthan-aravalli-peaks',
    title: 'Rajasthan Physiography: Aravalli Peaks, Elevation & Passes Reference Table',
    titleHindi: 'अरावली की प्रमुख पर्वत चोटियाँ, ऊँचाई एवं दर्रे (नाल)',
    subject: 'Rajasthan Geography',
    category: 'RAJASTHAN_EXCLUSIVE',
    summary: 'The definitive chronological elevation roster of Aravalli summits from highest to lowest, district allocations, and strategic mountain passes tested continuously by RPSC.',
    quickFacts: [
      { label: 'Guru Shikhar (गुरु शिखर)', value: '1,722 Meters (5,650 ft)', note: 'Mount Abu, Sirohi. Highest peak of Aravalli Range and Rajasthan. Col. Tod termed it "Santok Ka Shikhar".' },
      { label: 'Ser (सेर)', value: '1,597 Meters', note: 'Sirohi district. 2nd highest peak in Rajasthan.' },
      { label: 'Dilwara (दिलवाड़ा)', value: '1,442 Meters', note: 'Sirohi district. 3rd highest peak.' },
      { label: 'Jarga (जरगा)', value: '1,431 Meters', note: 'Udaipur district. Highest peak of Mewar Aravalli.' },
      { label: 'Achalgarh (अचलगढ़)', value: '1,380 Meters', note: 'Sirohi district.' },
      { label: 'Kumbhalgarh (कुम्भलगढ़)', value: '1,224 Meters', note: 'Rajsamand district. Fort of Rana Kumbha with 36 km wall.' },
      { label: 'Raghunathgarh (रघुनाथगढ़)', value: '1,055 Meters', note: 'Sikar district. Highest peak of Northern Aravalli.' },
      { label: 'Taragarh (तारागढ़)', value: '873 Meters', note: 'Ajmer (Central Aravalli).' },
      { label: 'Key Mountain Passes (नाल / दर्रे)', value: 'Desuri Naal & Jhilwa/Paglya Naal (Pali to Mewar), Someshwar Naal, Hathigudha Naal (Rajsamand).' }
    ],
    keyMnemonicOrRule: 'गुरु से दिल से जरा आस कुंभा रघुनाथ तारा (Guru, Ser, Dilwara, Jarga, Achalgarh, Kumbhalgarh, Raghunathgarh, Taragarh)',
    examApplicationTip: 'RPSC RAS Prelims frequently asks to arrange 4 peaks in descending or ascending order of elevation. Always memorize the top 7 heights precisely.',
    tags: ['Rajasthan Geography', 'Aravalli', 'Guru Shikhar', 'Passes', 'RPSC']
  },
  {
    id: 'cs-rajasthan-integration-stages',
    title: 'Rajasthan 7 Stages of Integration (1948–1956) Chronological Matrix',
    titleHindi: 'राजस्थान का एकीकरण: 7 चरण, तिथियां, शासक एवं प्रधानमंत्री',
    subject: 'Rajasthan History',
    category: 'RAJASTHAN_EXCLUSIVE',
    summary: 'Exhaustive chronological record of the unification of 19 princely states and 3 chiefships (Lawa, Kushalgarh, Neemrana) into modern Rajasthan.',
    quickFacts: [
      { label: 'Stage 1: Matsya Union (मत्स्य संघ)', value: '18 March 1948', note: 'Alwar, Bharatpur, Dholpur, Karauli + Neemrana. Capital: Alwar. Rajpramukh: Udaybhan Singh (Dholpur). PM: Shobharam Kumawat. Name given by K.M. Munshi.' },
      { label: 'Stage 2: Rajasthan Union (पूर्व राजस्थान)', value: '25 March 1948', note: 'Banswara, Bundi, Dungarpur, Jhalawar, Kishangarh, Kota, Pratapgarh, Shahpura, Tonk + Kushalgarh. Capital: Kota. Rajpramukh: Bhim Singh (Kota). PM: Gokul Lal Asawa.' },
      { label: 'Stage 3: United Rajasthan (संयुक्त राजस्थान)', value: '18 April 1948', note: 'Udaipur (Mewar) merged with Rajasthan Union. Inaugurated by Pt. Jawaharlal Nehru. Capital: Udaipur. Rajpramukh: Maharana Bhupal Singh. PM: Manikya Lal Verma.' },
      { label: 'Stage 4: Greater Rajasthan (बृहत् राजस्थान)', value: '30 March 1948 (Rajasthan Day)', note: 'Jaipur, Jodhpur, Bikaner, Jaisalmer merged. Inaugurated by Sardar Patel. Maharajpramukh: Bhupal Singh. Rajpramukh: Man Singh II (Jaipur). PM: Hiralal Shastri. Capital committee: P. Satyanarayan Rao.' },
      { label: 'Stage 5: United Greater Rajasthan', value: '15 May 1949', note: 'Matsya Union merged into Greater Rajasthan on recommendation of Dr. Shankarrao Deo Committee.' },
      { label: 'Stage 6: Rajasthan State (छठा चरण)', value: '26 January 1950', note: 'Sirohi (excluding Abu & Dilwara) merged into Rajasthan.' },
      { label: 'Stage 7: Reorganized Rajasthan (वर्तमान स्वरूप)', value: '1 November 1956', note: 'Abu-Dilwara, Ajmer-Merwara, and Sunel Tappa (M.P.) merged; Sironj sub-division given to M.P. On recommendation of Fazal Ali States Reorganization Commission. Governor post created (Gurumukh Nihal Singh).' }
    ],
    keyMnemonicOrRule: 'एमपी की बस राजस्थान आई (1. Matsya, 2. Poorva, 3. Sanyukt, 4. Brihat, 5. Sanyukt Brihat, 6. Rajasthan Sangh, 7. Reorganized)',
    examApplicationTip: 'Tested every single year in RPSC RAS. Memorize the Shankar Rao Deo Committee for Matsya merger and Satyanarayan Rao Committee for department allocations (High Court Jodhpur, Education Bikaner, Mines Udaipur, Forest Kota).',
    tags: ['Rajasthan History', 'Integration', 'Sardar Patel', 'Matsya Union', 'RPSC']
  },
  {
    id: 'cs-macro-economic-formulas',
    title: 'Key Macroeconomic Indicators, Deficits & Monetary Aggregates Cheat Sheet',
    titleHindi: 'प्रमुख समष्टि अर्थशास्त्र सूत्र, घाटे एवं मौद्रिक समुच्चय',
    subject: 'Indian Economy',
    category: 'DUAL_OVERLAP',
    summary: 'Standard mathematical and statutory definitions for National Income, Budgetary Deficits, RBI Reserve Ratios, and Balance of Payments components.',
    quickFacts: [
      { label: 'GDP vs GVA Formula', value: 'GDP at Market Prices = GVA at Basic Prices + Product Taxes - Product Subsidies' },
      { label: 'Fiscal Deficit (राजकोषीय घाटा)', value: 'Total Expenditure - Total Receipts (excluding non-debt creating capital receipts). Measures total government borrowing requirement.' },
      { label: 'Revenue Deficit (राजस्व घाटा)', value: 'Revenue Expenditure - Revenue Receipts. Indicates government dissaving on day-to-day administrative maintenance.' },
      { label: 'Effective Revenue Deficit', value: 'Revenue Deficit - Grants for Creation of Capital Assets (introduced in 2011-12 under FRBM).' },
      { label: 'Primary Deficit (प्राथमिक घाटा)', value: 'Fiscal Deficit - Interest Payments. Reflects current fiscal stance independent of past debt liabilities.' },
      { label: 'Reserve Money (M0 / High-Powered Money)', value: 'Currency in Circulation + Bankers\' Deposits with RBI + \'Other\' Deposits with RBI.' },
      { label: 'Narrow Money (M1) vs Broad Money (M3)', value: 'M1 = Currency with public + Demand deposits with banking system + \'Other\' deposits with RBI. M3 = M1 + Time deposits with banking system.' },
      { label: 'Money Multiplier Formula', value: 'Broad Money (M3) ÷ Reserve Money (M0). Increases as the cash reserve ratio (CRR) decreases or banking habits deepen.' }
    ],
    keyMnemonicOrRule: 'Fiscal Deficit = Borrowing. Primary Deficit = Fiscal Deficit minus Past Interest. Broad Money M3 includes Time Deposits.',
    examApplicationTip: 'UPSC tests operational mechanics (e.g. impact of higher currency-to-deposit ratio on money multiplier). RPSC tests direct formula identification.',
    tags: ['Economy', 'GDP', 'Fiscal Deficit', 'Monetary Policy', 'M1 M3']
  },
  {
    id: 'cs-rajasthan-unesco-gi-tags',
    title: 'Rajasthan UNESCO Heritage Sites & Geographical Indication (GI) Tags',
    titleHindi: 'राजस्थान के यूनेस्को विश्व धरोहर स्थल एवं भौगोलिक उपदर्शन (GI टैग)',
    subject: 'Art & Culture',
    category: 'RAJASTHAN_EXCLUSIVE',
    summary: 'Vetted roster of 6 UNESCO Hill Forts of Rajasthan, intangible cultural heritage, and all officially registered Geographical Indication (GI) traditional handicrafts.',
    quickFacts: [
      { label: '6 UNESCO Hill Forts (2013)', value: 'Chittorgarh, Kumbhalgarh, Ranthambore, Gagron (Jhalawar water fort), Amer (Jaipur), Jaisalmer (Sonar Qila). Mnemonic: "चीकू गाजर आम".' },
      { label: 'UNESCO Cultural & Natural Sites', value: 'Jantar Mantar Jaipur (2010), Jaipur Walled City (2019), Keoladeo Ghana National Park Bharatpur (1985 Natural Heritage).' },
      { label: 'UNESCO Intangible Cultural Heritage', value: 'Kalbeliya Folk Dance and Songs of Rajasthan (inscribed in 2010).' },
      { label: 'GI Tag: Thewa Art (थेवा कला)', value: 'Pratanagarh district. Intricate gold filigree work on colored Belgian glass. Practiced by Rajsoni family.' },
      { label: 'GI Tag: Blue Pottery', value: 'Jaipur. Origin: Turko-Persian. Revived by Maharaja Sawai Ram Singh II and Padmashree Kripal Singh Shekhawat.' },
      { label: 'GI Tag: Molela Terracotta Work', value: 'Molela village, Rajsamand. Relief terracotta plaques of folk deities (Dharmaraja, Devnarayanji) by Kumhar artisans.' },
      { label: 'GI Tag: Sanganeri & Bagru Block Prints', value: 'Jaipur district. Sanganeri (white/off-white base with floral motifs), Bagru (natural dyes, mud-resist / Dabu technique).' },
      { label: 'GI Tag: Nathdwara Pichhwai Painting', value: 'Rajsamand district. Cloth paintings depicting Shrinathji (Lord Krishna) Leelas hung behind the idol.' },
      { label: 'GI Tag: Pokhran Pottery & Bikaneri Bhujia', value: 'Pokhran (Jaisalmer red clay vessels) and Bikaner (moth bean pulse bhujia).' }
    ],
    keyMnemonicOrRule: 'चीकू गाजर आम (Chittor, Kumbhalgarh, Gagron, Jaisalmer, Ranthambore, Amer) for 6 UNESCO Hill Forts.',
    examApplicationTip: 'RPSC RAS routinely asks to match GI handicraft with its originating district, or identify the Padmashree artist associated with the craft.',
    tags: ['Art & Culture', 'UNESCO', 'Hill Forts', 'GI Tags', 'Thewa Art', 'Blue Pottery']
  },
  {
    id: 'cs-environment-conventions-reserves',
    title: 'Global Environmental Conventions & Protected Reserves of Rajasthan',
    titleHindi: 'वैश्विक पर्यावरण अभिसमय एवं राजस्थान के संरक्षित जैव क्षेत्र',
    subject: 'Environment & Ecology',
    category: 'DUAL_OVERLAP',
    summary: 'Core international multilateral treaties (Rio Conventions, Ramsar, CITES, CMS) coupled with the complete roster of 5 Tiger Reserves and Ramsar Wetlands of Rajasthan.',
    quickFacts: [
      { label: 'UNFCCC vs CBD vs UNCCD', value: 'The 3 Rio Conventions (1992 Earth Summit). UNFCCC (Climate Change), CBD (Biological Diversity), UNCCD (Desertification).' },
      { label: 'Ramsar Wetlands in Rajasthan', value: '1. Keoladeo National Park (Bharatpur - Montreux Record site) and 2. Sambhar Salt Lake (Jaipur/Nagaur/Ajmer). Menar (Udaipur bird village) proposed.' },
      { label: '5 Tiger Reserves of Rajasthan', value: '1. Ranthambore (Sawai Madhopur, 1973), 2. Sariska (Alwar, 1978), 3. Mukundra Hills (Kota/Jhalawar, 2013), 4. Ramgarh Vishdhari (Bundi, 2022 - 52nd TR of India), 5. Dholpur-Karauli (2023 - 54th TR of India).' },
      { label: 'Kumbhalgarh Tiger Reserve', value: 'In-principle approval granted by NTCA across Rajsamand, Pali, and Udaipur districts.' },
      { label: 'Great Indian Bustard (Godawan)', value: 'IUCN Status: Critically Endangered (CR). State Bird of Rajasthan. Primary sanctuary: Desert National Park (Jaisalmer-Barmer). Project Great Indian Bustard.' },
      { label: 'Stockholm vs Rotterdam vs Basel', value: 'Stockholm (Persistent Organic Pollutants - POPs), Rotterdam (Prior Informed Consent for hazardous chemicals), Basel (Transboundary movement of hazardous wastes).' },
      { label: 'CITES & Bonn Convention (CMS)', value: 'CITES (International Trade in Endangered Species of Wild Fauna and Flora), CMS (Conservation of Migratory Species of Wild Animals).' }
    ],
    keyMnemonicOrRule: 'RSMRD (Rajasthan\'s 5 Tiger Reserves: Ranthambore, Sariska, Mukundra, Ramgarh Vishdhari, Dholpur-Karauli)',
    examApplicationTip: 'UPSC tests species IUCN status, Montreux Record criteria, and CITES Appendices. RPSC tests exact notification dates and district boundaries of Rajasthan Tiger Reserves.',
    tags: ['Environment', 'Tiger Reserves', 'Ramsar Sites', 'Godawan', 'Conventions']
  },
  {
    id: 'cs-science-space-missions',
    title: 'Emerging Technologies, Space Missions & Defense Platforms Blueprint',
    titleHindi: 'उभरती प्रौद्योगिकियां, अंतरिक्ष मिशन एवं रक्षा प्लेटफॉर्म',
    subject: 'Science & Technology',
    category: 'DUAL_OVERLAP',
    summary: 'Concise reference guide to revolutionary breakthroughs: CRISPR-Cas9, mRNA platforms, Quantum computing, ISRO deep-space missions, and DRDO missile systems.',
    quickFacts: [
      { label: 'CRISPR-Cas9 System', value: 'Bacterial adaptive immune mechanism adapted for precise genome editing using guide RNA (gRNA) and Cas9 molecular endonuclease enzyme.' },
      { label: 'mRNA Vaccine Technology', value: 'Delivers synthetic mRNA encoding spike protein encapsulated in Lipid Nanoparticles (LNPs). No live viral pathogen introduced.' },
      { label: 'Quantum Superposition & Entanglement', value: 'Qubits exist simultaneously in linear combination of |0⟩ and |1⟩. Entanglement links quantum states instantaneously regardless of distance.' },
      { label: 'Chandrayaan-3 Landing Site', value: 'Shiv Shakti Point (near Manzinus C crater at 69.37°S latitude). Lander: Vikram, Rover: Pragyan. Propelled by LVM3-M4.' },
      { label: 'Aditya-L1 Spacecraft', value: 'Positioned in halo orbit around Sun-Earth Lagrange Point 1 (L1, ~1.5 million km from Earth). Continuous unhindered view of the Sun without eclipses.' },
      { label: 'Agni-V with MIRV (Mission Divyastra)', value: 'Multiple Independently Targetable Re-entry Vehicle technology enabling single intercontinental ballistic missile (ICBM) to deliver multiple warheads to disparate targets.' },
      { label: 'S-400 Triumf Missile System', value: 'Mobile surface-to-air missile (SAM) defense system capable of engaging aircraft, cruise, and ballistic missiles at ranges up to 400 km.' },
      { label: 'INS Vikrant', value: 'India\'s first indigenous aircraft carrier (IAC-1) designed by Warship Design Bureau and constructed by Cochin Shipyard Limited.' }
    ],
    keyMnemonicOrRule: 'Lagrange Point L1 = Gravitational equilibrium between Sun and Earth. MIRV = 1 Missile, multiple independent warhead targets.',
    examApplicationTip: 'UPSC tests conceptual mechanics (e.g. why mRNA requires lipid nanoparticles). RPSC tests indigenous mission names and range specifications of missiles.',
    tags: ['Science & Tech', 'ISRO', 'Aditya-L1', 'CRISPR', 'Defense', 'Agni-V']
  },
  {
    id: 'cs-rajasthan-polity-statutory-commissions',
    title: 'Rajasthan State Statutory & Constitutional Commissions Comparative Guide',
    titleHindi: 'राजस्थान के प्रमुख आयोग: संवैधानिक एवं सांविधिक निकाय तुलनात्मक चार्ट',
    subject: 'Rajasthan Polity',
    category: 'RAJASTHAN_EXCLUSIVE',
    summary: 'Side-by-side comparison of composition, tenure, appointment committees, removal procedures, and statutory mandates of all state oversight bodies in Rajasthan.',
    quickFacts: [
      { label: 'RPSC (Article 315-323)', value: 'Composition: 1 Chairman + 7 Members. Tenure: 6 years or 62 years of age. Appointed by Governor, removed ONLY by the President of India under Art 317.' },
      { label: 'State Election Commission (Art 243K)', value: 'Single-member commission (State Election Commissioner). Appointed by Governor; removed in like manner and on like grounds as a Judge of High Court.' },
      { label: 'Rajasthan State Human Rights Commission (RSHRC)', value: 'Composition: 1 Chairperson + 2 Members (amended in 2019). Tenure: 3 years or 70 years of age. Committee: CM (Head), Speaker, Home Minister, Leader of Opposition.' },
      { label: 'Rajasthan Lokayukta (1973 Act)', value: 'Appointed by Governor in consultation with Chief Justice of High Court & Leader of Opposition. Tenure: 5 years. Jurisdiction: Ministers & Public Servants. EXCLUDED: Chief Minister, RPSC, Judges.' },
      { label: 'State Information Commission (RTI 2005)', value: 'Composition: 1 Chief Information Commissioner + up to 10 ICs. Appointed by Governor on recommendation of committee: CM (Head), Leader of Opposition, and 1 Cabinet Minister.' },
      { label: 'State Finance Commission (Art 243-I & 243-Y)', value: 'Constituted every 5 years by Governor to review financial position of Panchayats & Municipalities. Current: 6th SFC chaired by Pradyuman Singh.' }
    ],
    keyMnemonicOrRule: 'RPSC removal is by PRESIDENT, not Governor! Lokayukta can NOT investigate the Chief Minister in Rajasthan.',
    examApplicationTip: 'High-frequency trap in RPSC RAS Prelims: "Who removes members of RPSC?" (Governor appoints, but only President removes). Always check for this distinction!',
    tags: ['Rajasthan Polity', 'RPSC', 'RSHRC', 'Lokayukta', 'State Election Commission']
  }
];

