export interface SyllabusSubtopic {
  id: string;
  name: string;
  nameHindi: string;
  details: string;
  keyPoints: string[];
  pyqExamples?: string[];
}

export interface SyllabusTopicItem {
  id: string;
  code: string;
  title: string;
  titleHindi: string;
  stage: 'Prelims' | 'Mains' | 'Integrated (Prelims + Mains)';
  overlapCategory: 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'UPSC_EXCLUSIVE';
  overlapPercentage: number;
  weightage: string;
  officialDescription: string;
  deepDiveAnalysis: string;
  subtopics: SyllabusSubtopic[];
  mustReadSources: string[];
  examinerTraps: string[];
  pyqFrequency: string;
  lessonIdLink?: string;
}

export interface SyllabusSection {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  weightageEstimated: string;
  topics: SyllabusTopicItem[];
}

export interface SyllabusPaper {
  id: string;
  paperNumber: string;
  paperName: string;
  paperNameHindi: string;
  totalMarks: number;
  durationHours: number;
  nature: 'Scored for Merit' | 'Qualifying (33%)' | 'Qualifying (25%)';
  sections: SyllabusSection[];
}

export interface ExamSyllabus {
  examId: 'UPSC_CSE' | 'RPSC_RAS';
  title: string;
  titleHindi: string;
  subtitle: string;
  conductingBody: string;
  selectionStages: {
    stageName: 'Prelims' | 'Mains' | 'Interview';
    description: string;
    totalMarks: number;
    papers: SyllabusPaper[];
  }[];
}

export const COMPLETE_EXAM_SYLLABUS_DATA: Record<'UPSC_CSE' | 'RPSC_RAS', ExamSyllabus> = {
  UPSC_CSE: {
    examId: 'UPSC_CSE',
    title: 'UPSC Civil Services Examination (CSE)',
    titleHindi: 'संघ लोक सेवा आयोग सिविल सेवा परीक्षा (CSE)',
    subtitle: 'Comprehensive Prelims & Mains Syllabus with Detailed Topic Breakdown',
    conductingBody: 'Union Public Service Commission, New Delhi',
    selectionStages: [
      {
        stageName: 'Prelims',
        description: 'Objective Screening Stage (Negative Marking: -0.66 per incorrect question)',
        totalMarks: 400,
        papers: [
          {
            id: 'upsc-pre-gs1',
            paperNumber: 'Paper I',
            paperName: 'General Studies I (GS 1)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 1',
            totalMarks: 200,
            durationHours: 2,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'upsc-pre-polity',
                name: 'Indian Polity and Governance',
                nameHindi: 'भारतीय राज्यव्यवस्था एवं शासन',
                description: 'Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.',
                weightageEstimated: '12 - 16 Questions (~24 - 32 Marks)',
                topics: [
                  {
                    id: 'upsc-polity-const-framework',
                    code: 'UPSC-PRE-POL-01',
                    title: 'Constitutional Framework & Salient Features',
                    titleHindi: 'संवैधानिक ढांचा एवं प्रमुख विशेषताएं',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 90,
                    weightage: '4-6 Questions annually',
                    officialDescription: 'Historical underpinnings, evolution, features, amendments, significant provisions and basic structure doctrine.',
                    deepDiveAnalysis: 'UPSC tests analytical understanding of constitutionalism, rule of law, separation of powers, and the exact boundary of Basic Structure established in Kesavananda Bharati (1973).',
                    subtopics: [
                      {
                        id: 'sub-p-1',
                        name: 'Preamble, Fundamental Rights & Writs',
                        nameHindi: 'प्रस्तावना, मौलिक अधिकार एवं रिट',
                        details: 'Articles 12-35, reasonable restrictions under Art 19(2), Right to Privacy (Puttaswamy), Writ jurisdiction Art 32 vs 226.',
                        keyPoints: [
                          'Preamble is non-justiciable but part of Basic Structure',
                          'Art 20 & 21 cannot be suspended even during National Emergency',
                          'Writs of Quo-Warranto can be filed by any non-aggrieved citizen'
                        ],
                        pyqExamples: ['UPSC 2021: Right to Privacy is protected under Article 21']
                      },
                      {
                        id: 'sub-p-2',
                        name: 'DPSPs & Fundamental Duties',
                        nameHindi: 'राज्य के नीति निदेशक तत्व एवं मौलिक कर्तव्य',
                        details: 'Part IV (Articles 36-51) and Part IV-A (Article 51A). Balance between FRs and DPSPs (Minerva Mills).',
                        keyPoints: [
                          'Article 44 Uniform Civil Code status',
                          'Article 39(b) and 39(c) precedence over Article 14 and 19',
                          'Swaran Singh & Verma Committee on Fundamental Duties'
                        ]
                      },
                      {
                        id: 'sub-p-3',
                        name: 'Federal System & Emergency Provisions',
                        nameHindi: 'संघीय व्यवस्था एवं आपातकालीन उपबंध',
                        details: 'Articles 352 (National), 356 (President Rule), 360 (Financial Emergency); 7th Schedule Union/State/Concurrent lists.',
                        keyPoints: [
                          '44th Amendment 1978: Cabinet written recommendation mandatory for Art 352',
                          'Bommai Judgement 1994: Judicial review of Art 356'
                        ]
                      }
                    ],
                    mustReadSources: ['M. Laxmikanth (Indian Polity Ch 1-13)', 'NCERT Class 11: Indian Constitution at Work', 'Official Constitution Bare Act'],
                    examinerTraps: ['Confusing appointing authority with removal authority for statutory vs constitutional posts', 'Assuming DPSPs are enforceable by courts'],
                    pyqFrequency: 'Consistently 5-7 questions every year since 2013'
                  },
                  {
                    id: 'upsc-polity-panchayati-raj',
                    code: 'UPSC-PRE-POL-02',
                    title: 'Panchayati Raj & Democratic Decentralization (73rd & 74th CAA)',
                    titleHindi: 'पंचायती राज एवं स्थानीय स्वशासन',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 75,
                    weightage: '2-3 Questions annually',
                    officialDescription: 'Local self-government, 11th and 12th Schedule devolution, financial autonomy, and grassroots participatory democracy.',
                    deepDiveAnalysis: 'Key focus on mandatory vs discretionary provisions of Article 243, State Finance Commission (243I), State Election Commission (243K), and PESA Act 1996 in 5th Schedule areas.',
                    lessonIdLink: 'panchayati-raj-local-gov',
                    subtopics: [
                      {
                        id: 'sub-pr-1',
                        name: 'Three-Tier Structure & Devolution (Part IX & IX-A)',
                        nameHindi: 'त्रि-स्तरीय ढांचा एवं शक्तियां',
                        details: 'Gram, Block, District level panchayats. 29 subjects under 11th Schedule; 18 subjects under 12th Schedule.',
                        keyPoints: [
                          'Article 243B: States under 20 lakh population can omit intermediate tier',
                          'Article 243D: Minimum 1/3rd seats and chairpersons reserved for women',
                          'Article 243F: Minimum age to contest is 21 years (not 25)'
                        ]
                      },
                      {
                        id: 'sub-pr-2',
                        name: 'PESA Act 1996 (Scheduled Areas)',
                        nameHindi: 'पेसा अधिनियम 1996',
                        details: 'Extension of Panchayati Raj to Fifth Schedule Areas; ownership of minor forest produce (MFP) to Gram Sabha.',
                        keyPoints: [
                          'Gram Sabha mandatory consultation before land acquisition in 5th Schedule areas',
                          'Prior recommendation for grant of prospecting license or mining lease for minor minerals'
                        ]
                      }
                    ],
                    mustReadSources: ['M. Laxmikanth (Ch 38 & 39)', 'Ministry of Panchayati Raj Annual Reports', 'PESA Bare Act 1996'],
                    examinerTraps: ['Assuming State Election Commissioner is removed by Governor (removed only like HC Judge by President)', 'Assuming intermediate tier is compulsory in all states'],
                    pyqFrequency: 'Tested in UPSC Prelims 2016, 2018, 2020, 2021, 2023'
                  },
                  {
                    id: 'upsc-polity-judiciary-organs',
                    code: 'UPSC-PRE-POL-03',
                    title: 'Union Executive, Parliament & Judiciary',
                    titleHindi: 'संघीय कार्यपालिका, संसद एवं न्यायपालिका',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 85,
                    weightage: '5-8 Questions annually',
                    officialDescription: 'President, PM, Council of Ministers, Lok Sabha, Rajya Sabha, Parliamentary Committees, Supreme Court & High Courts.',
                    deepDiveAnalysis: 'Questions scrutinize Money Bill (Art 110), Ordinance making power (Art 123), Collegium system, Contempt of Court, and Special Leave Petitions (Art 136).',
                    subtopics: [
                      {
                        id: 'sub-jud-1',
                        name: 'Parliamentary Procedures & Motions',
                        nameHindi: 'संसदीय प्रक्रियाएं एवं प्रस्ताव',
                        details: 'No-Confidence Motion, Adjournment Motion, Guillotine, Cut Motions, Standing Committees (PAC, Estimates, CoPU).',
                        keyPoints: [
                          'Estimates Committee has 30 members exclusively from Lok Sabha',
                          'Public Accounts Committee (PAC) examines CAG audit reports'
                        ]
                      },
                      {
                        id: 'sub-jud-2',
                        name: 'Supreme Court & Judicial Review',
                        nameHindi: 'सर्वोच्च न्यायालय एवं न्यायिक पुनरावलोकन',
                        details: 'Original Jurisdiction (Art 131), Appellate, Advisory (Art 143), Complete Justice (Art 142), Court of Record (Art 129).',
                        keyPoints: [
                          'Article 131 excludes pre-constitutional treaties from original jurisdiction',
                          'Article 142 empowers SC to pass any decree necessary for doing complete justice'
                        ]
                      }
                    ],
                    mustReadSources: ['M. Laxmikanth (Parliament & Supreme Court chapters)', 'PRS Legislative Research'],
                    examinerTraps: ['Claiming Rajya Sabha has equal power on Money Bills', 'Assuming Ordinance can override Fundamental Rights'],
                    pyqFrequency: 'Largest component of GS 1 Prelims (typically 8+ questions)'
                  }
                ]
              },
              {
                id: 'upsc-pre-history',
                name: 'History of India and Indian National Movement',
                nameHindi: 'भारत का इतिहास एवं भारतीय राष्ट्रीय आंदोलन',
                description: 'Ancient, Medieval, Modern Indian History, Art & Architecture, and Freedom Struggle (1857-1947).',
                weightageEstimated: '14 - 18 Questions (~28 - 36 Marks)',
                topics: [
                  {
                    id: 'upsc-hist-modern-freedom',
                    code: 'UPSC-PRE-HIST-01',
                    title: 'Indian National Movement (1857 to 1947)',
                    titleHindi: 'भारतीय राष्ट्रीय आंदोलन (1857 से 1947)',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 80,
                    weightage: '6-9 Questions annually',
                    officialDescription: 'Swadeshi Movement, Non-Cooperation, Civil Disobedience, Quit India, Revolutionary Nationalism, INA, and Constitutional Milestones (1909, 1919, 1935, 1947).',
                    deepDiveAnalysis: 'UPSC focuses heavily on chronology, peasant & tribal uprisings, Round Table Conferences, Cripps/Cabinet Mission proposals, and ideological nuances of Congress vs Left/Socialists.',
                    subtopics: [
                      {
                        id: 'sub-m-1',
                        name: 'Early Nationalists, Swadeshi & Extremist Era',
                        nameHindi: 'उदारवादी, स्वदेशी एवं गरम दल',
                        details: 'Partition of Bengal (1905), Surat Split (1907), Morley-Minto Reforms (1909 communal electorates), Home Rule League (1916).',
                        keyPoints: [
                          'Swadeshi saw first mass boycott and national education council setup',
                          'Lucknow Pact 1916 reunited Moderates and Extremists'
                        ]
                      },
                      {
                        id: 'sub-m-2',
                        name: 'Gandhian Mass Movements & British Acts',
                        nameHindi: 'गांधीवादी जन आंदोलन एवं ब्रिटिश अधिनियम',
                        details: 'Rowlatt Satyagraha, Non-Cooperation & Khilafat (1920-22), Simon Commission, Nehru Report, Salt Satyagraha (1930), Poona Pact (1932).',
                        keyPoints: [
                          'Government of India Act 1919 introduced Dyarchy in Provinces',
                          'Government of India Act 1935 provided Provincial Autonomy and Federal Court'
                        ]
                      },
                      {
                        id: 'sub-m-3',
                        name: 'Final Phase: 1940 to 1947',
                        nameHindi: 'अंतिम चरण: 1940 से 1947',
                        details: 'August Offer (1940), Cripps Mission (1942), Quit India Resolution, INA Trials, RIN Mutiny (1946), Cabinet Mission Plan.',
                        keyPoints: [
                          'Cabinet Mission rejected partition and proposed grouping of provinces',
                          'Mountbatten Plan (3 June 1947) accepted partition'
                        ]
                      }
                    ],
                    mustReadSources: ['Spectrum: A Brief History of Modern India by Rajiv Ahir', 'Bipin Chandra: India’s Struggle for Independence'],
                    examinerTraps: ['Confusing Cripps Mission proposals (post-war dominion) with Cabinet Mission (constituent assembly without partition)', 'Misreading chronology of Simon Commission vs Nehru Report'],
                    pyqFrequency: 'Consistent core of prelims with 6-8 questions every year'
                  },
                  {
                    id: 'upsc-hist-ancient-art',
                    code: 'UPSC-PRE-HIST-02',
                    title: 'Ancient India & Art & Culture',
                    titleHindi: 'प्राचीन भारत एवं कला-संस्कृति',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '5-7 Questions annually',
                    officialDescription: 'Indus Valley Civilization, Vedic literature, Buddhism & Jainism, Mauryan & Gupta Empire, Temple Architecture, Classical Dance & Music.',
                    deepDiveAnalysis: 'Questions concentrate heavily on Buddhist literature (Tripitakas), Jain philosophy (Anekantavada, Syadvada), Harappan site findings (Dholavira water reservoirs), and temple architecture styles (Nagara, Dravida, Vesara).',
                    subtopics: [
                      {
                        id: 'sub-anc-1',
                        name: 'Buddhism, Jainism & Heterodox Schools',
                        nameHindi: 'बौद्ध धर्म, जैन धर्म एवं दार्शनिक संप्रदाय',
                        details: 'Four Buddhist Councils, Hinayana vs Mahayana vs Vajrayana, Bodhisattvas (Avalokiteshvara, Maitreya), Jain Triratnas.',
                        keyPoints: [
                          'Dharmachakrapravartana at Sarnath',
                          'Ajivika sect founded by Makkhali Gosala',
                          'Maitreya is the future Buddha to appear on earth'
                        ]
                      },
                      {
                        id: 'sub-anc-2',
                        name: 'Temple Architecture & Sculpture',
                        nameHindi: 'मंदिर स्थापत्य एवं मूर्तिकला',
                        details: 'Panchayatana style, Shikhara vs Vimana, Mandapas, Gopurams, Gandhara, Mathura & Amaravati schools of sculpture.',
                        keyPoints: [
                          'Nagara style marked by curvilinear Shikhara without boundary walls',
                          'Dravidian style characterized by high Gopurams and water tanks inside'
                        ]
                      }
                    ],
                    mustReadSources: ['Nitin Singhania: Indian Art and Culture', 'NCERT Class 11: An Introduction to Indian Art', 'RS Sharma Ancient India'],
                    examinerTraps: ['Confusing Bodhisattva attributes (e.g., Padmapani holding lotus vs Vajrapani with thunderbolt)', 'Mixing Gandhara Hellenistic grey sandstone with Mathura spotted red sandstone'],
                    pyqFrequency: 'High conceptual weightage; 4-6 questions every year'
                  }
                ]
              },
              {
                id: 'upsc-pre-geography',
                name: 'Indian and World Geography',
                nameHindi: 'भारत एवं विश्व का भूगोल',
                description: 'Physical, Social, Economic Geography of India and the World. Climate, Geomorphology, Oceanography, Drainage, and Mineral Resources.',
                weightageEstimated: '10 - 15 Questions (~20 - 30 Marks)',
                topics: [
                  {
                    id: 'upsc-geo-physical-climate',
                    code: 'UPSC-PRE-GEO-01',
                    title: 'Physical Geography: Geomorphology, Climatology & Oceanography',
                    titleHindi: 'भौतिक भूगोल: भू-आकृति, जलवायु एवं समुद्र विज्ञान',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 75,
                    weightage: '5-7 Questions annually',
                    officialDescription: 'Earth interior, Plate tectonics, Volcanism, Atmospheric circulation, Monsoons, Jet streams, Ocean currents, Tides, Coral bleaching.',
                    deepDiveAnalysis: 'UPSC emphasizes process-based conceptual questions: ENSO cycle, Indian Ocean Dipole (IOD), Walker circulation, Western Disturbances, and Ocean thermal energy.',
                    subtopics: [
                      {
                        id: 'sub-geo-1',
                        name: 'Indian Monsoon & Atmosphere Dynamics',
                        nameHindi: 'भारतीय मानसून एवं वायुमंडलीय गतिकी',
                        details: 'Thermal contrast, ITCZ shift, Somali Jet, Tibetan heating, El Nino / La Nina, positive vs negative IOD.',
                        keyPoints: [
                          'Positive IOD leads to surplus rainfall in Indian subcontinent',
                          'El Nino typically suppresses Indian summer monsoon'
                        ]
                      },
                      {
                        id: 'sub-geo-2',
                        name: 'Geomorphic Processes & Plate Tectonics',
                        nameHindi: 'भू-आकृतिक प्रक्रम एवं प्लेट विवर्तनिकी',
                        details: 'Lithospheric plates, divergent, convergent, transform boundaries; earthquake seismic waves (P vs S waves shadow zones).',
                        keyPoints: [
                          'S-waves cannot pass through liquid outer core, creating large shadow zone >105 degrees',
                          'Himalayas formed by continental-continental convergent collision'
                        ]
                      }
                    ],
                    mustReadSources: ['NCERT Class 11: Fundamentals of Physical Geography', 'GC Leong: Certificate Physical and Human Geography'],
                    examinerTraps: ['Confusing P-wave and S-wave shadow zones', 'Assuming tropical cyclones can form right at the equator (zero Coriolis force prevents vortex)'],
                    pyqFrequency: 'Consistent 5-7 questions testing pure scientific fundamentals'
                  },
                  {
                    id: 'upsc-geo-indian-river-minerals',
                    code: 'UPSC-PRE-GEO-02',
                    title: 'Indian Geography: Drainage Systems & Natural Resources',
                    titleHindi: 'भारत का भूगोल: अपवाह तंत्र एवं प्राकृतिक संसाधन',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 80,
                    weightage: '4-6 Questions annually',
                    officialDescription: 'Himalayan vs Peninsular rivers, tributaries, dams, agricultural cropping patterns, soil types, and critical minerals.',
                    deepDiveAnalysis: 'Map-based questions dominate: river tributaries (Ganga, Indus, Brahmaputra, Godavari, Krishna, Cauvery), National Waterways, Ramsar wetlands, and Biosphere Reserves.',
                    subtopics: [
                      {
                        id: 'sub-ir-1',
                        name: 'Peninsular & Himalayan River Tributaries',
                        nameHindi: 'प्रायद्वीपीय एवं हिमालयी नदियां',
                        details: 'Left-bank vs Right-bank tributaries of Godavari (Indravati, Pranhita, Manjira), Krishna (Tungabhadra, Bhima, Koyna), Cauvery (Kabini, Bhavani, Amravati).',
                        keyPoints: [
                          'Narmada and Tapti flow through rift valleys into Arabian Sea without forming deltas',
                          'Indus Water Treaty 1960 allocates eastern rivers (Ravi, Beas, Sutlej) exclusively to India'
                        ]
                      }
                    ],
                    mustReadSources: ['NCERT Class 11: India Physical Environment', 'Oxford School Atlas'],
                    examinerTraps: ['Mixing right-bank vs left-bank tributaries of Godavari and Krishna', 'Confusing major soil locations (Black cotton Regur soil vs Laterite)'],
                    pyqFrequency: 'Heavy map-based presence every year'
                  }
                ]
              },
              {
                id: 'upsc-pre-economy',
                name: 'Economic and Social Development',
                nameHindi: 'आर्थिक एवं सामाजिक विकास',
                description: 'Sustainable Development, Poverty, Inclusion, Demographics, Fiscal & Monetary Policy, Banking, and External Sector.',
                weightageEstimated: '14 - 18 Questions (~28 - 36 Marks)',
                topics: [
                  {
                    id: 'upsc-econ-monetary-banking',
                    code: 'UPSC-PRE-ECON-01',
                    title: 'Monetary Policy, Inflation & Financial Sector',
                    titleHindi: 'मौद्रिक नीति, मुद्रास्फीति एवं वित्तीय क्षेत्र',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 85,
                    weightage: '6-8 Questions annually',
                    officialDescription: 'RBI Monetary Policy Framework (4% +/- 2%), Repo, Reverse Repo, SDF, CRR, SLR, Money Multiplier, Digital Currency (CBDC), and Bond Yields.',
                    deepDiveAnalysis: 'UPSC loves conceptual linkage questions: what happens to bond yields when US Fed hikes interest rates? What increases money multiplier? Capital Adequacy Ratio (Basel III norms).',
                    subtopics: [
                      {
                        id: 'sub-ec-1',
                        name: 'Monetary Tools & Inflation Targeting',
                        nameHindi: 'मौद्रिक उपकरण एवं मुद्रास्फीति लक्ष्य',
                        details: 'MPC (6 members), CPI vs WPI inflation baskets, Standing Deposit Facility (SDF), Liquidity Adjustment Facility (LAF).',
                        keyPoints: [
                          'WPI does not include services, only manufactured and primary goods',
                          'Headline inflation is based on CPI-Combined with base year 2012'
                        ]
                      },
                      {
                        id: 'sub-ec-2',
                        name: 'External Sector, Balance of Payments & Forex',
                        nameHindi: 'वाह्य क्षेत्र, भुगतान संतुलन एवं विदेशी मुद्रा',
                        details: 'Current Account Deficit (CAD), Capital Account, Convertibility, NEER and REER, Special Drawing Rights (SDR).',
                        keyPoints: [
                          'India has full convertibility on Current Account but partial on Capital Account',
                          'Depreciation of rupee makes exports cheaper and imports dearer'
                        ]
                      }
                    ],
                    mustReadSources: ['Mrunal Patel Economy Notes / Ramesh Singh', 'Annual Union Economic Survey', 'Union Budget Key Features'],
                    examinerTraps: ['Confusing WPI with CPI basket weights (food weight is much higher in CPI)', 'Believing money multiplier increases when cash reserve ratio (CRR) is raised (it actually decreases)'],
                    pyqFrequency: 'Consistently 7-10 high-scoring questions'
                  }
                ]
              },
              {
                id: 'upsc-pre-environment',
                name: 'Environmental Ecology, Biodiversity & Climate Change',
                nameHindi: 'पर्यावरण पारिस्थितिकी, जैव विविधता एवं जलवायु परिवर्तन',
                description: 'Ecosystem dynamics, National Parks, Wildlife Sanctuaries, IUCN Red List, UNFCCC COP summits, CBD, CITES, and Wildlife Protection Act 1972.',
                weightageEstimated: '15 - 20 Questions (~30 - 40 Marks)',
                topics: [
                  {
                    id: 'upsc-env-biodiversity-acts',
                    code: 'UPSC-PRE-ENV-01',
                    title: 'Biodiversity Conservation & Environmental Legislation',
                    titleHindi: 'जैव विविधता संरक्षण एवं पर्यावरणीय कानून',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '8-10 Questions annually',
                    officialDescription: 'Wildlife Protection Act 1972 (Amended 2022), Environment Protection Act 1986, Forest Rights Act 2006, National Green Tribunal (NGT), Project Tiger, Project Elephant.',
                    deepDiveAnalysis: 'Questions heavily focus on schedule classifications under WPA 1972, IUCN status of endemic fauna, Ramsar criteria, Tiger Reserves (NTCA mandate), and Eco-sensitive zones.',
                    subtopics: [
                      {
                        id: 'sub-env-1',
                        name: 'Protected Area Network & Wildlife Laws',
                        nameHindi: 'संरक्षित क्षेत्र नेटवर्क एवं वन्यजीव कानून',
                        details: 'WPA 2022 rationalized schedules from 6 to 4; Schedule I gets highest protection; Schedule IV incorporates CITES specimens.',
                        keyPoints: [
                          'National Parks enjoy highest protection; no human activities permitted without Chief Wildlife Warden sanction',
                          'Vermin classification authority shifted under 2022 amendment'
                        ]
                      },
                      {
                        id: 'sub-env-2',
                        name: 'International Conventions: UNFCCC, CBD & CITES',
                        nameHindi: 'अंतरराष्ट्रीय अभिसमय',
                        details: 'Paris Agreement (Nationally Determined Contributions), Kunming-Montreal Global Biodiversity Framework (30x30 target), Bonn Convention (CMS), Ramsar Wetlands.',
                        keyPoints: [
                          'India updated its NDC to reduce emissions intensity of GDP by 45% by 2030',
                          'Ramsar Montreux Record lists wetlands facing ecological changes'
                        ]
                      }
                    ],
                    mustReadSources: ['Shankar IAS Environment / PMF IAS', 'Down To Earth Magazine', 'MoEFCC Annual Compendium'],
                    examinerTraps: ['Confusing National Park with Biosphere Reserve zonation (Core, Buffer, Transition)', 'Assuming State governments can declare Vermin without Central notification'],
                    pyqFrequency: 'Very high weightage since IFS Prelims is merged with CSE (15-20 questions)'
                  }
                ]
              }
            ]
          },
          {
            id: 'upsc-pre-csat',
            paperNumber: 'Paper II',
            paperName: 'Civil Services Aptitude Test (CSAT)',
            paperNameHindi: 'सिविल सेवा अभिक्षमता परीक्षा (CSAT)',
            totalMarks: 200,
            durationHours: 2,
            nature: 'Qualifying (33%)',
            sections: [
              {
                id: 'upsc-csat-reading-comp',
                name: 'Reading Comprehension & Critical Reasoning',
                nameHindi: 'बोधगम्यता एवं आलोचनात्मक तार्किकता',
                description: 'Short passages testing logical corollaries, essential messages, assumptions, and inferences.',
                weightageEstimated: '25 - 28 Questions',
                topics: [
                  {
                    id: 'upsc-csat-passages',
                    code: 'UPSC-CSAT-01',
                    title: 'Analytical Passage Comprehension & Inference',
                    titleHindi: 'परिच्छेद बोधगम्यता एवं निष्कर्ष',
                    stage: 'Prelims',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '27 Questions',
                    officialDescription: 'Comprehension passages from ecology, economy, public policy, science, and philosophy.',
                    deepDiveAnalysis: 'Questions demand distinguishing between "what is stated", "logical inference", "best summary", and "underlying assumption".',
                    subtopics: [
                      {
                        id: 'sub-csat-1',
                        name: 'Corollary vs Assumption vs Crux',
                        nameHindi: 'निष्कर्ष बनाम पूर्वधारणा बनाम सार',
                        details: 'Methods to identify unstated premises and eliminate out-of-scope answer choices.',
                        keyPoints: [
                          'Extreme options containing words like "all", "never", "only" are rarely the logical corollary',
                          'Assumptions must be presupposed by the author for the argument to hold'
                        ]
                      }
                    ],
                    mustReadSources: ['Previous 10 Years UPSC CSAT Official Papers', 'Arun Sharma Reading Comprehension'],
                    examinerTraps: ['Bringing outside factual knowledge into the passage', 'Selecting an attractive fact that the passage did not assert'],
                    pyqFrequency: 'Exactly 25-28 questions in every CSAT paper'
                  }
                ]
              },
              {
                id: 'upsc-csat-quant-reasoning',
                name: 'Basic Numeracy, Mental Ability & Data Interpretation',
                nameHindi: 'बुनियादी अंकगणित एवं मानसिक योग्यता',
                description: 'Numbers & divisibility, Permutation & Combination, Probability, Speed-Time-Distance, Syllogisms, and Puzzles.',
                weightageEstimated: '50 - 55 Questions',
                topics: [
                  {
                    id: 'upsc-csat-quant-num',
                    code: 'UPSC-CSAT-02',
                    title: 'Number Systems, Combinatorics & Logical Deduction',
                    titleHindi: 'संख्या पद्धति, क्रमचय-संचय एवं तार्किक विश्लेषण',
                    stage: 'Prelims',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 65,
                    weightage: '50+ Questions',
                    officialDescription: 'Number properties, unit digits, remainders, P&C, probability, seating arrangements, directions, and syllogisms.',
                    deepDiveAnalysis: 'Since 2020, CSAT has placed intense emphasis on pure number theory (Euler theorem, remainders, factorials) and combinatorics.',
                    subtopics: [
                      {
                        id: 'sub-csat-2',
                        name: 'Permutations, Combinations & Number Properties',
                        nameHindi: 'क्रमचय, संचय एवं संख्या गुणधर्म',
                        details: 'Counting techniques, divisibility rules of 7, 11, 13, circular arrangements, and Pigeonhole principle.',
                        keyPoints: [
                          'Must secure minimum 66 marks (33%) out of 200 to qualify Paper II',
                          'Accuracy over quantity: 35-40 solid questions ensures safe clearance'
                        ]
                      }
                    ],
                    mustReadSources: ['RS Aggarwal Quantitative Aptitude', 'Past 5 Year CSAT Official Answer Keys'],
                    examinerTraps: ['Spending >4 minutes on complex algebraic puzzles', 'Ignoring negative marking penalties on hasty guesses'],
                    pyqFrequency: 'Determines qualification for GS 1 evaluation'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        stageName: 'Mains',
        description: 'Descriptive Written Examination (9 Papers: 2 Qualifying + 7 Merit Papers = 1750 Marks)',
        totalMarks: 1750,
        papers: [
          {
            id: 'upsc-mains-gs1',
            paperNumber: 'Paper II',
            paperName: 'General Studies I (Heritage, History, Geography, Society)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 1',
            totalMarks: 250,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'upsc-mains-gs1-sec-hist',
                name: 'Indian Heritage, Culture & World History',
                nameHindi: 'भारतीय संस्कृति एवं विश्व इतिहास',
                description: 'Art forms, literature, architecture from ancient to modern times; Modern world history from 18th century.',
                weightageEstimated: '75 - 100 Marks',
                topics: [
                  {
                    id: 'upsc-mains-world-hist',
                    code: 'UPSC-MAINS-WH-01',
                    title: 'World History: Revolutions, World Wars & Decolonization',
                    titleHindi: 'विश्व इतिहास: क्रांतियां, विश्व युद्ध एवं वि-उपनिवेशीकरण',
                    stage: 'Mains',
                    overlapCategory: 'UPSC_EXCLUSIVE',
                    overlapPercentage: 15,
                    weightage: '25-35 Marks in GS 1',
                    officialDescription: 'Industrial Revolution, World Wars, redrawal of national boundaries, colonization, decolonization, political philosophies like communism, capitalism, socialism.',
                    deepDiveAnalysis: 'Questions probe analytical historical linkages: how did the Treaty of Versailles pave the way for WWII? Why did Industrial Revolution begin first in Britain? Impact of American/French Revolutions on modern democracy.',
                    subtopics: [
                      {
                        id: 'sub-wh-1',
                        name: 'Enlightenment & Political Revolutions',
                        nameHindi: 'प्रबोधन एवं राजनीतिक क्रांतियां',
                        details: 'American Revolution (1776), French Revolution (1789), Industrial Revolution social impacts.',
                        keyPoints: ['Role of philosophers (Rousseau, Voltaire, Montesquieu)', 'Emergence of working class and labor movements']
                      }
                    ],
                    mustReadSources: ['Norman Lowe: Mastering Modern World History', 'Arjun Dev: History of the World'],
                    examinerTraps: ['Writing pure dates instead of evaluating socio-economic causes and contemporary relevance'],
                    pyqFrequency: '1 to 2 questions asked consistently in GS 1 Mains'
                  }
                ]
              },
              {
                id: 'upsc-mains-gs1-sec-soc',
                name: 'Indian Society & Diversity',
                nameHindi: 'भारतीय समाज एवं विविधता',
                description: 'Salient features of Indian Society, Role of women, Population, Poverty, Urbanization, Globalization, Secularism, Communalism, Regionalism.',
                weightageEstimated: '70 - 80 Marks',
                topics: [
                  {
                    id: 'upsc-mains-society-features',
                    code: 'UPSC-MAINS-SOC-01',
                    title: 'Indian Society: Social Structure, Women & Globalization',
                    titleHindi: 'भारतीय समाज: सामाजिक संरचना एवं वैश्वीकरण',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 75,
                    weightage: '75 Marks in GS 1',
                    officialDescription: 'Diversity of India, caste system evolution, women empowerment, demographic dividend, urbanization challenges, and secularism vs communalism.',
                    deepDiveAnalysis: 'Focus on multi-dimensional societal trends: feminization of agriculture, care economy, gig workers, slum redevelopment, and cultural syncretism.',
                    subtopics: [
                      {
                        id: 'sub-soc-1',
                        name: 'Effects of Globalization on Indian Family & Culture',
                        nameHindi: 'भारतीय परिवार एवं संस्कृति पर वैश्वीकरण का प्रभाव',
                        details: 'Nuclearization of families, elder care crisis, Westernization vs modern values, rise of consumerism.',
                        keyPoints: ['Glocalization concept', 'Preservation of traditional artisanal crafts']
                      }
                    ],
                    mustReadSources: ['NCERT Sociology Class 11 & 12 (Social Change and Development in India)', 'Ram Ahuja: Society in India'],
                    examinerTraps: ['Writing one-sided polemics instead of balanced sociological analysis with constitutional solutions'],
                    pyqFrequency: '4 to 5 questions in GS 1 Mains every year'
                  }
                ]
              }
            ]
          },
          {
            id: 'upsc-mains-gs2',
            paperNumber: 'Paper III',
            paperName: 'General Studies II (Governance, Constitution, Polity, Social Justice, IR)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 2',
            totalMarks: 250,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'upsc-mains-gs2-sec-gov',
                name: 'Governance, Social Justice & International Relations',
                nameHindi: 'शासन, सामाजिक न्याय एवं अंतरराष्ट्रीय संबंध',
                description: 'Constitutional comparison, Federal devolution, Citizen’s Charter, Civil services role, Welfare schemes, India and its neighborhood.',
                weightageEstimated: '250 Marks',
                topics: [
                  {
                    id: 'upsc-mains-gs2-federalism',
                    code: 'UPSC-MAINS-GS2-01',
                    title: 'Federal Dynamics, Devolution & Governor’s Constitutional Office',
                    titleHindi: 'संघीय गतिकी, शक्तियों का विकेंद्रीकरण एवं राज्यपाल पद',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 85,
                    weightage: '50-60 Marks in GS 2',
                    officialDescription: 'Functions and responsibilities of the Union and the States, issues pertaining to federal structure, devolution of finances, Article 356, and Governor discretionary powers.',
                    deepDiveAnalysis: 'High-yield analytical themes: Cooperative vs Competitive federalism, GST Council disputes, Inter-State River Water Tribunals, and misuse of Article 200 (assent to state bills).',
                    subtopics: [
                      {
                        id: 'sub-fed-1',
                        name: 'Governor Office & Article 200 Controversy',
                        nameHindi: 'राज्यपाल पद एवं अनुच्छेद 200',
                        details: 'Discretionary powers under Article 163, reservation of bills for President under Article 201, Sarkaria and Punchhi Commission recommendations.',
                        keyPoints: [
                          'Punchhi Commission recommended Governor removal by state legislature impeachment',
                          'Supreme Court 2023 rulings on timeframes for Governor action on state bills'
                        ]
                      }
                    ],
                    mustReadSources: ['M. Laxmikanth', 'Punchhi Commission 2nd Report on Centre-State Relations', 'The Hindu / Indian Express Editorials'],
                    examinerTraps: ['Omitting landmark Supreme Court rulings (SR Bommai, Nabam Rebia, Shamsher Singh)'],
                    pyqFrequency: 'Appears every year in GS 2 Mains without fail'
                  }
                ]
              }
            ]
          },
          {
            id: 'upsc-mains-gs3',
            paperNumber: 'Paper IV',
            paperName: 'General Studies III (Economy, Sci & Tech, Environment, Security, Disaster Mgt)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 3',
            totalMarks: 250,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'upsc-mains-gs3-sec-all',
                name: 'Technology, Economic Growth, Ecology & Internal Security',
                nameHindi: 'प्रौद्योगिकी, आर्थिक विकास, पारिस्थितिकी एवं आंतरिक सुरक्षा',
                description: 'Inclusive growth, Budgeting, Farm subsidies, PDS, Cyber security, Border management, Disaster resilience, Extremism.',
                weightageEstimated: '250 Marks',
                topics: [
                  {
                    id: 'upsc-mains-gs3-agriculture',
                    code: 'UPSC-MAINS-GS3-01',
                    title: 'Agriculture Economics: MSP, Farm Subsidies, PDS & Food Processing',
                    titleHindi: 'कृषि अर्थशास्त्र: एमएसपी, कृषि सब्सिडी, पीडीएस एवं खाद्य प्रसंस्करण',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 80,
                    weightage: '50-60 Marks in GS 3',
                    officialDescription: 'Direct and indirect farm subsidies, Minimum Support Price (MSP), Public Distribution System (PDS) revamping, buffer stocks, food security, and supply chain bottlenecks.',
                    deepDiveAnalysis: 'Questions evaluate WTO Green Box vs Amber Box subsidies, Price Deficiency Payment models, PM-KISAN, crop diversification from wheat-paddy cycle, and post-harvest cold storage infrastructure.',
                    subtopics: [
                      {
                        id: 'sub-agri-1',
                        name: 'MSP Legal Guarantee & WTO Agriculture Agreement',
                        nameHindi: 'एमएसपी वैधानिक गारंटी एवं डब्ल्यूटीओ',
                        details: 'Swaminathan Commission recommendation (C2+50%), Peace Clause in WTO Bali Package, open-ended procurement issues.',
                        keyPoints: ['Difference between A2, A2+FL, and comprehensive C2 cost formulas', 'FCI storage losses and economic cost of foodgrains']
                      }
                    ],
                    mustReadSources: ['Economic Survey Agriculture Chapter', 'Ashok Gulati Columns', 'NITI Aayog Policy Briefs'],
                    examinerTraps: ['Listing problems without proposing actionable farm-to-fork value addition models'],
                    pyqFrequency: '3 to 4 major questions in GS 3 Mains every year'
                  }
                ]
              }
            ]
          },
          {
            id: 'upsc-mains-gs4',
            paperNumber: 'Paper V',
            paperName: 'General Studies IV (Ethics, Integrity, and Aptitude)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 4 (नीतिशास्त्र, सत्यनिष्ठा एवं अभिरुचि)',
            totalMarks: 250,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'upsc-mains-gs4-sec-theory',
                name: 'Section A: Ethical Theory, Thinkers & Public Values',
                nameHindi: 'भाग क: नीतिशास्त्रीय सिद्धांत एवं दार्शनिक',
                description: 'Essence of ethics, Human values, Emotional Intelligence, Probity in governance, Citizen charters, RTI.',
                weightageEstimated: '125 Marks',
                topics: [
                  {
                    id: 'upsc-mains-gs4-ei-values',
                    code: 'UPSC-MAINS-GS4-01',
                    title: 'Emotional Intelligence & Foundational Values for Civil Services',
                    titleHindi: 'भावनात्मक बुद्धिमत्ता एवं सिविल सेवा के बुनियादी मूल्य',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '40-50 Marks',
                    officialDescription: 'Integrity, impartiality, non-partisanship, objectivity, empathy, tolerance and compassion towards weaker sections; EI concepts and application in administration.',
                    deepDiveAnalysis: 'Tests Daniel Goleman’s 5 components of EI (Self-awareness, Self-regulation, Motivation, Empathy, Social skills) in resolving administrative crises, mob violence, and communal polarization.',
                    subtopics: [
                      {
                        id: 'sub-ei-1',
                        name: 'Nolan Committee 7 Principles of Public Life',
                        nameHindi: 'नोलेन समिति के सार्वजनिक जीवन के 7 सिद्धांत',
                        details: 'Selflessness, Integrity, Objectivity, Accountability, Openness, Honesty, Leadership.',
                        keyPoints: ['Distinction between personal morality and professional administrative ethics', 'Conflict of interest identification']
                      }
                    ],
                    mustReadSources: ['Lexicon for Ethics, Integrity & Aptitude', 'ARC 2nd Report: Ethics in Governance', 'Michael Sandel: Justice'],
                    examinerTraps: ['Writing purely academic philosophical jargon without practical civil administrative examples'],
                    pyqFrequency: 'Guaranteed core component of Section A'
                  }
                ]
              },
              {
                id: 'upsc-mains-gs4-sec-cases',
                name: 'Section B: Ethical Case Studies in Administration',
                nameHindi: 'भाग ख: नैतिक केस स्टडीज',
                description: '6 Real-life simulated administrative dilemma case studies evaluating decision-making, law vs conscience, and stakeholder management.',
                weightageEstimated: '125 Marks (6 Cases x 20/25 Marks)',
                topics: [
                  {
                    id: 'upsc-mains-gs4-casework',
                    code: 'UPSC-MAINS-GS4-02',
                    title: 'Dilemma Resolution & Crisis Decision-Making Case Studies',
                    titleHindi: 'प्रशासनिक दुविधा समाधान एवं निर्णय क्षमता',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '125 Marks',
                    officialDescription: 'Cases covering illegal mining nexus, corruption by superiors, sexual harassment at workplace, environmental clearances vs tribal livelihoods, and disaster relief funds diversion.',
                    deepDiveAnalysis: 'Evaluation criteria: Identification of primary and secondary stakeholders, listing of ethical dilemmas, evaluating options with pros and cons, and recommending a principled course of action with justification.',
                    subtopics: [
                      {
                        id: 'sub-case-1',
                        name: 'Deontological vs Utilitarian Frameworks in Case Solutions',
                        nameHindi: 'कर्तव्यशास्त्र बनाम उपयोगितावाद',
                        details: 'How to apply Kantian categorical imperative, John Rawls veil of ignorance, and Gandhian Talisman in case recommendations.',
                        keyPoints: ['Always reject illegal compromises and whistleblowing without exhausting internal remedies', 'Uphold constitutional morality over local social prejudice']
                      }
                    ],
                    mustReadSources: ['Past 10 Years UPSC GS 4 Case Studies', 'Subba Rao & P.N. Roy Chowdhury: Ethics, Integrity & Aptitude'],
                    examinerTraps: ['Choosing simplistic options like resigning or blindly passing the buck to superiors', 'Ignoring vulnerable silent stakeholders like future generations or disabled citizens'],
                    pyqFrequency: 'Standard half of GS 4 Paper (125 Marks)'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  RPSC_RAS: {
    examId: 'RPSC_RAS',
    title: 'RPSC Rajasthan Administrative Service (RAS)',
    titleHindi: 'राजस्थान लोक सेवा आयोग (RPSC) राजस्थान प्रशासनिक सेवा (RAS)',
    subtitle: 'Full Official Prelims & Mains Syllabus with Detailed Rajasthan & National Modules',
    conductingBody: 'Rajasthan Public Service Commission, Ajmer',
    selectionStages: [
      {
        stageName: 'Prelims',
        description: 'Single Objective Screening Paper (150 Questions, 200 Marks, 3 Hours, Negative Marking: -0.44 per incorrect answer, 5th Option rule)',
        totalMarks: 200,
        papers: [
          {
            id: 'rpsc-pre-single',
            paperNumber: 'Single Paper',
            paperName: 'General Knowledge & General Science',
            paperNameHindi: 'सामान्य ज्ञान एवं सामान्य विज्ञान',
            totalMarks: 200,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'rpsc-pre-raj-history',
                name: 'History, Art, Culture, Literature & Heritage of Rajasthan',
                nameHindi: 'राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परंपरा एवं विरासत',
                description: 'Major dynasties, Forts & monuments, Folk deities, Prajamandal, Peasant movements, Integration of Rajasthan, Literature & Dialects.',
                weightageEstimated: '22 - 26 Questions (~30 - 35 Marks)',
                topics: [
                  {
                    id: 'rpsc-raj-hist-dynasties',
                    code: 'RPSC-PRE-RAJ-01',
                    title: 'Major Landmarks in History of Rajasthan & Dynasties',
                    titleHindi: 'राजस्थान के इतिहास के महत्वपूर्ण मील के पत्थर एवं प्रमुख राजवंश',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 10,
                    weightage: '6-8 Questions in Prelims',
                    officialDescription: 'Major Dynasties: Guhilas/Sisodias of Mewar, Rathores of Marwar & Bikaner, Kachwahas of Amber/Jaipur, Chauhans of Shakambhari, Ranthambore & Jalore; their administrative & revenue systems.',
                    deepDiveAnalysis: 'RPSC demands exact factual command: battles (Tarain 1191-92, Ranthambore 1301, Chittor 1303, Khanwa 1527, Haldighati 1576, Dharmat, Jajau), Mughal-Rajput alliances (Raja Man Singh, Mirza Raja Jai Singh, Jaswant Singh I), and local land grants (Bhom, Jagir, Khalsa, Charas).',
                    lessonIdLink: 'panchayati-raj-local-gov',
                    subtopics: [
                      {
                        id: 'sub-rd-1',
                        name: 'Mewar Guhila-Sisodia Dynasty',
                        nameHindi: 'मेवाड़ का गुहिल-सिसोदिया राजवंश',
                        details: 'Bappa Rawal, Jaitra Singh (Battle of Bhutala 1227), Rana Kumbha (Vijay Stambha, 32 forts out of 84, musical treatises), Rana Sanga, Maharana Pratap (Battle of Haldighati 1576, Chavand capital).',
                        keyPoints: [
                          'Rana Kumbha authored treatises: Sangeet Raj, Sangeet Mimansa, Sood Prabandha',
                          'Maharana Pratap made Chavand his emergency capital for 28 years (1585-1615)'
                        ],
                        pyqExamples: ['RPSC 2021: Which musical treatise was composed by Maharana Kumbha?']
                      },
                      {
                        id: 'sub-rd-2',
                        name: 'Chauhans of Ajmer, Ranthambore & Jalore',
                        nameHindi: 'अजमेर, रणथंभौर एवं जालौर के चौहान',
                        details: 'Ajayaraja (founded Ajaymeru 1113), Arnoraja, Vigraharaja IV (Harakeli drama composer), Prithviraj Chauhan III; Hammir Deo Chauhan of Ranthambore (1301 Jauhar); Kanhad Deo of Jalore (1311).',
                        keyPoints: [
                          'Harakeli Sanskrit drama composed by Vigraharaja IV is inscribed on Adhai Din Ka Jhonpra',
                          'Alauddin Khalji’s invasions: 1301 Ranthambore, 1303 Chittor, 1308 Siwana, 1311 Jalore'
                        ]
                      }
                    ],
                    mustReadSources: ['Dr. Gopinath Sharma: Rajasthan Ka Itihas', 'Hukam Chand Jain & Dr. Narayan Mali: Rajasthan Ka Itihas, Sanskriti', 'Rajasthan Hindi Granth Akademi publications'],
                    examinerTraps: ['Mixing up treaties signed with British in 1818 by different Rajput principalities (Karauli first in Nov 1817, Sirohi last in Sept 1823)', 'Confusing composers of Kirti Stambha Prashasti (Atri and Mahesh)'],
                    pyqFrequency: 'Core anchor of RPSC Prelims; highest recurring question cluster'
                  },
                  {
                    id: 'rpsc-raj-prajamandal-integration',
                    code: 'RPSC-PRE-RAJ-02',
                    title: 'Freedom Movement, Prajamandal & Integration of Rajasthan',
                    titleHindi: 'स्वतंत्रता आंदोलन, प्रजामंडल आंदोलन एवं राजस्थान का एकीकरण',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 5,
                    weightage: '7-9 Questions in Prelims',
                    officialDescription: '1857 Revolt in Rajasthan (Naseerabad, Neemuch, Erinpura, Kota), Peasant Movements (Bijolia, Begun, Bundi), Tribal Movements (Bhagat Movement - Govind Giri, Eki Movement - Motilal Tejawat), Prajamandal movements across states, and the 7 stages of Integration of Rajasthan (17 March 1948 to 1 November 1956).',
                    deepDiveAnalysis: 'RPSC asks exact dates, founders, and conferences: Bijolia movement 3 phases (Sadhu Sitaram Das, Vijay Singh Pathik, Manikya Lal Verma), Mangarh massacre (17 Nov 1913), Prajamandal founders (Jaipur: Kapur Chand Patni 1931 / Jamnalal Bajaj; Mewar: Manikya Lal Verma 1938; Marwar: Jaynarayan Vyas 1934), and exact names of Rajpramukh/PM in 7 integration stages.',
                    subtopics: [
                      {
                        id: 'sub-int-1',
                        name: 'Seven Stages of Rajasthan Integration',
                        nameHindi: 'राजस्थान एकीकरण के सात चरण',
                        details: 'Stage 1: Matsya Union (18 March 1948); Stage 2: Rajasthan Union (25 March 1948); Stage 3: United Rajasthan (18 April 1948); Stage 4: Greater Rajasthan (30 March 1948 - Rajasthan Day); Stage 5: United Greater Rajasthan (15 May 1949); Stage 6: Rajasthan (26 Jan 1950); Stage 7: Reorganized Rajasthan (1 Nov 1956).',
                        keyPoints: [
                          'Shankar Rao Deo Committee recommended merger of Matsya Union into Greater Rajasthan',
                          'Fazal Ali State Reorganisation Commission merged Ajmer-Merwara, Mount Abu, and Sunel Tappa into Rajasthan'
                        ]
                      },
                      {
                        id: 'sub-int-2',
                        name: 'Bijolia & Begun Peasant Movements',
                        nameHindi: 'बिजोलिया एवं बेगूं किसान आंदोलन',
                        details: 'Bijolia (1897-1941) was India’s longest non-violent peasant movement lasting 44 years against 84 types of taxes (Lag-Bagh) and Chanwari tax.',
                        keyPoints: [
                          'Vijay Singh Pathik (Bhup Singh) founded Uparmal Panch Board in 1917',
                          'Trench Commission fired upon Begun farmers at Govindpura in 1923 (Rupa Ji and Kripa Ji martyred)'
                        ]
                      }
                    ],
                    mustReadSources: ['Dr. MS Jain: Modern History of Rajasthan', 'Rajasthan Board of Secondary Education Class 9 & 10 History Books'],
                    examinerTraps: ['Confusing dates and Rajpramukhs of Stage 3 (Udaipur - Maharana Bhopal Singh) vs Stage 4 (Jaipur - Sawai Man Singh II)', 'Mixing Prajamandal establishment years'],
                    pyqFrequency: 'Guaranteed 5-8 questions in Prelims every single session'
                  },
                  {
                    id: 'rpsc-raj-art-culture-forts',
                    code: 'RPSC-PRE-RAJ-03',
                    title: 'Folk Deities, Architecture (UNESCO Forts), Fairs & Festivals',
                    titleHindi: 'लोक देवी-देवता, स्थापत्य (यूनेस्को दुर्ग), मेले एवं त्यौहार',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 5,
                    weightage: '8-10 Questions in Prelims',
                    officialDescription: 'Panchpirs (Pabu Ji, Harbhu Ji, Ramdev Ji, Mehaji Mangalia, Goga Ji), Tejaji, Devnarayan Ji, 6 UNESCO Hill Forts of Rajasthan (Chittor, Kumbhalgarh, Ranthambore, Gagron, Amer, Jaisalmer), Folk dances (Ghoomar, Kalbelia, Chari, Agni dance of Jasnathis), and Rajasthani dialects.',
                    deepDiveAnalysis: 'Questions test minute local distinctions: which folk deity’s vehicle is horse vs camel? Phad painting tradition of Joshi family (Bhilwara); Gagron is a classic Jal Durg (water fort) at confluence of Ahu and Kali Sindh; Kumbhalgarh wall is 36 km long; Kalbelia dance inscribed on UNESCO Intangible Cultural Heritage list in 2010.',
                    subtopics: [
                      {
                        id: 'sub-f-1',
                        name: 'Panchpirs & Major Lokdevtas',
                        nameHindi: 'पंचपीर एवं प्रमुख लोकदेवता',
                        details: 'Ramdevji (Kamadiya sect founder, Terah Tali dance performed at Runicha); Pabuji (plague & camel deity, Rebaris venerate, Dhabhi horse); Gogaji (Gogamedi in Hanumangarh).',
                        keyPoints: [
                          'Jasnath Ji: Followers perform Agni Dance (fire dance) at Katariasar (Bikaner)',
                          'Jambho Ji: Founded Bishnoi sect with 29 principles; Samrathal Dhora'
                        ]
                      },
                      {
                        id: 'sub-f-2',
                        name: '6 UNESCO Hill Forts of Rajasthan (2013)',
                        nameHindi: 'राजस्थान के 6 यूनेस्को पहाड़ी दुर्ग',
                        details: 'Chittorgarh, Kumbhalgarh (Rajsamand), Ranthambore (Sawai Madhopur), Gagron (Jhalawar), Amber (Jaipur), Jaisalmer (Sonar Qila).',
                        keyPoints: [
                          'Gagron Fort is constructed without foundation on a rocky river bed',
                          'Kumbhalgarh features the inner citadel Badal Mahal where Maharana Pratap was born'
                        ]
                      }
                    ],
                    mustReadSources: ['Rajasthan Sahitya Akademi Culture compendium', 'Dr. Jai Singh Neeraj: Rajasthan Ki Sanskritik Parampara'],
                    examinerTraps: ['Omitting Mehaji Mangalia or including Tejaji into the traditional Panchpirs (Tejaji is a major folk deity but not one of the 5 Pir)', 'Confusing painting schools (Kishangarh Bani Thani by Nihal Chand vs Bundi Chitrashala)'],
                    pyqFrequency: '8-10 direct factual questions in every RPSC Prelims'
                  }
                ]
              },
              {
                id: 'rpsc-pre-raj-geography',
                name: 'Geography of Rajasthan',
                nameHindi: 'राजस्थान का भूगोल',
                description: 'Physiography (Aravalli, Thar, Eastern Plains, Hadoti), Drainage (Luni, Chambal, Banas, Mahi), Climate, Agro-Climatic Zones, Minerals, Energy & Tourism.',
                weightageEstimated: '14 - 18 Questions (~18 - 25 Marks)',
                topics: [
                  {
                    id: 'rpsc-raj-geo-physiography-drainage',
                    code: 'RPSC-PRE-RAJ-GEO-01',
                    title: 'Physiographic Divisions & Drainage System of Rajasthan',
                    titleHindi: 'राजस्थान के भौतिक प्रदेश एवं अपवाह तंत्र',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 10,
                    weightage: '7-9 Questions in Prelims',
                    officialDescription: 'Four Physiographic Divisions: Western Sandy Plains, Aravalli Mountain Range (Guru Shikhar 1722m), Eastern Plains (Chhappan Basin), South-Eastern Hadoti Plateau; Three River Drainage Systems: Arabian Sea, Bay of Bengal, and Inland Drainage (60% of state area).',
                    deepDiveAnalysis: 'RPSC requires exact peak heights: Guru Shikhar (1722m), Ser (1597m), Dilwara (1442m), Jarga (1431m), Achalgarh (1380m), Kumbhalgarh (1224m), Raghunathgarh (1055m in Sikar); Inland rivers: Ghaggar, Kantli, Sabi, Ruparel; Chambal river entry at Chaurasigarh; Mahi river cuts Tropic of Cancer twice.',
                    lessonIdLink: 'panchayati-raj-local-gov',
                    subtopics: [
                      {
                        id: 'sub-rg-1',
                        name: 'Four Physical Divisions & Peak Hierarchy',
                        nameHindi: 'चार भौतिक प्रदेश एवं पर्वत शिखर',
                        details: 'Aravalli extends 692 km from Khedbrahma (Gujarat) to Raisina Hill (Delhi), with 550 km (80%) in Rajasthan. Formed in Pre-Cambrian era, oldest fold mountain.',
                        keyPoints: [
                          'Bhorat Plateau is situated between Kumbhalgarh and Gogunda',
                          'Uparmal Plateau extends from Bijolia (Bhilwara) to Bhainsrorgarh (Chittorgarh)',
                          'Mewar Chhappan plains located along Mahi river basin in Banswara-Pratapgarh'
                        ]
                      },
                      {
                        id: 'sub-rg-2',
                        name: 'Three Drainage Systems (Arabian Sea, Bay of Bengal, Inland)',
                        nameHindi: 'तीन अपवाह तंत्र (अरब सागर, बंगाल की खाड़ी, आंतरिक प्रवाह)',
                        details: 'Chambal (originates Janapav, MP) has perennial flow; Banas (completely in Rajasthan, originates Khamnor hills); Luni (Saline river, flows through 6 districts into Rann of Kutch).',
                        keyPoints: [
                          'Luni water remains sweet up to Balotra (Barmer), then turns saline',
                          'Mahi Bajaj Sagar Dam in Banswara; Bisalpur Dam on Banas in Tonk'
                        ]
                      }
                    ],
                    mustReadSources: ['Dr. Harimohan Saxena: Geography of Rajasthan (Rajasthan Hindi Granth Akademi)', 'Dr. LR Bhalla: Rajasthan Ka Bhugol'],
                    examinerTraps: ['Confusing peak height rankings (e.g. putting Jarga before Dilwara)', 'Mixing up tributaries of Banas (Bedach, Kothari, Khari, Menal) with Chambal (Kalisindh, Parbati, Mej)'],
                    pyqFrequency: '7 to 10 questions testing pure physical geography facts'
                  },
                  {
                    id: 'rpsc-raj-geo-minerals-agro',
                    code: 'RPSC-PRE-RAJ-GEO-02',
                    title: 'Minerals, 10 Agro-Climatic Zones & Renewable Energy',
                    titleHindi: 'खनिज संपदा, 10 कृषि-जलवायु खंड एवं नवीकरणीय ऊर्जा',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 10,
                    weightage: '6-8 Questions in Prelims',
                    officialDescription: 'Rajasthan as "Museum of Minerals": monopoly in Wollastonite, Jasper, Zinc concentrate, Lead; Petroleum reserves in Barmer-Sanchore basin (Mangala, Bhagyam, Aishwarya); 10 Agro-Climatic Zones; Solar energy capacity (Bhadla Solar Park 2245 MW).',
                    deepDiveAnalysis: 'Questions test specific mine locations: Khetri (Copper), Zawar (Lead-Zinc-Silver), Degana-Nagaur (Tungsten), Jhamarkotra-Udaipur (Rock Phosphate), Mandoki Pal (Fluorite), Karampura (Lignite Coal).',
                    subtopics: [
                      {
                        id: 'sub-rm-1',
                        name: 'Mineral Belts & Monopoly Resources',
                        nameHindi: 'खनिज पेटियां एवं एकाधिकार',
                        details: '100% production in Wollastonite & Jasper; 80+ minerals available, 57 commercially mined.',
                        keyPoints: [
                          'Pachpadra Refinery in Barmer: 9 MMTPA capacity, 74:26 joint venture between HPCL and Govt of Rajasthan',
                          'Jhamarkotra (Udaipur) is India’s premier Rock Phosphate mine'
                        ]
                      },
                      {
                        id: 'sub-rm-2',
                        name: 'Ten Agro-Climatic Zones of Rajasthan',
                        nameHindi: 'राजस्थान के 10 कृषि-जलवायु खंड',
                        details: 'Zone I-A (Arid Western) to Zone V (Humid South-Eastern Plains). Largest zone is I-C (Hyper Arid Partially Irrigated: Bikaner, Jaisalmer, Churu).',
                        keyPoints: ['Zone IV-B is Sub-humid Southern Plains (Banswara, Dungarpur, Pratapgarh)']
                      }
                    ],
                    mustReadSources: ['Rajasthan Economic Survey (Latest Edition)', 'Department of Mines & Geology Rajasthan portal'],
                    examinerTraps: ['Confusing Agro-Climatic Zone codes (e.g. Zone I-C vs Zone III-A)', 'Mixing Zinc smelter (Chanderiya, Chittorgarh) with Lead-Zinc mines (Zawar, Rampura-Agucha)'],
                    pyqFrequency: '5-6 recurring questions in every exam'
                  }
                ]
              },
              {
                id: 'rpsc-pre-raj-polity-admin',
                name: 'Administrative and Political System of Rajasthan',
                nameHindi: 'राजस्थान की प्रशासनिक एवं राजनीतिक व्यवस्था',
                description: 'Governor, Chief Minister, Legislative Assembly, Rajasthan High Court, Chief Secretary, RPSC, State Human Rights Commission, Lokayukta, State Election Commission, Public Policy & Citizen Charters.',
                weightageEstimated: '12 - 16 Questions (~16 - 22 Marks)',
                topics: [
                  {
                    id: 'rpsc-raj-pol-state-commissions',
                    code: 'RPSC-PRE-RAJ-POL-01',
                    title: 'State Statutory Commissions & Constitutional Bodies',
                    titleHindi: 'राज्य के संवैधानिक एवं संविधिक आयोग',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 15,
                    weightage: '6-8 Questions in Prelims',
                    officialDescription: 'RPSC (Composition, Article 315-323, First Chairman Dr. S.K. Ghosh), State Human Rights Commission (Chairperson eligibility, Protection of Human Rights Act 1993), Lokayukta (Rajasthan Lokayukta Act 1973, First Lokayukta ID Dua), State Election Commission (Art 243K, Amar Singh Rathore first SEC), State Information Commission.',
                    deepDiveAnalysis: 'RPSC asks direct factual names: who was the first chairman? Who served maximum tenure? Who resigned? Who was Chief Secretary during President rule? Number of members in SHRC (1 Chairperson + 2 Members).',
                    lessonIdLink: 'panchayati-raj-local-gov',
                    subtopics: [
                      {
                        id: 'sub-rc-1',
                        name: 'Rajasthan Public Service Commission (RPSC) & Lokayukta',
                        nameHindi: 'आरपीएससी एवं लोकायुक्त',
                        details: 'RPSC founded on 20 August 1949 at Jaipur, shifted to Ajmer on Satyanarayan Rao Committee recommendation. 1 Chairman + 7 Members appointed by Governor, removed ONLY by President under Art 317.',
                        keyPoints: [
                          'Rajasthan Lokayukta Act 1973: CM, High Court judges, RPSC chairman/members, and Sarpanch/Panch are EXCLUDED from Lokayukta jurisdiction',
                          'First Lokayukta of Rajasthan: Justice I.D. Dua'
                        ]
                      },
                      {
                        id: 'sub-rc-2',
                        name: 'Rajasthan State Human Rights Commission (RSHRC)',
                        nameHindi: 'राजस्थान राज्य मानवाधिकार आयोग',
                        details: 'Notification issued 18 Jan 1999; functional from March 2000. First Chairperson: Justice Kanta Bhatnagar. Selection committee: CM (head), Home Minister, Speaker, Leader of Opposition.',
                        keyPoints: ['Tenure: 3 years or 70 years of age (2019 amendment)', 'Chairperson can be a retired High Court Chief Justice or High Court Judge']
                      }
                    ],
                    mustReadSources: ['Janak Singh Meena: Administrative System of Rajasthan', 'Official RPSC and RSHRC web portals'],
                    examinerTraps: ['Assuming RPSC members can be removed by Governor (Governor can only suspend; removal is exclusively by President on SC inquiry under Art 317)', 'Assuming Chief Minister is under Rajasthan Lokayukta (CM is excluded)'],
                    pyqFrequency: 'Consistently 5-7 questions testing specific state commissions'
                  }
                ]
              },
              {
                id: 'rpsc-pre-raj-economy',
                name: 'Economy of Rajasthan & Welfare Schemes',
                nameHindi: 'राजस्थान की अर्थव्यवस्था एवं जनकल्याणकारी योजनाएं',
                description: 'Macro overview of Rajasthan Economy (GSDP, Per Capita Income), Sectoral contributions, Industrial policies, and State flagship welfare programs.',
                weightageEstimated: '12 - 16 Questions (~16 - 22 Marks)',
                topics: [
                  {
                    id: 'rpsc-raj-econ-survey-schemes',
                    code: 'RPSC-PRE-RAJ-ECON-01',
                    title: 'Rajasthan Economic Survey & Flagship Welfare Schemes',
                    titleHindi: 'राजस्थान आर्थिक समीक्षा एवं फ्लैगशिप योजनाएं',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 10,
                    weightage: '10-14 Questions in Prelims',
                    officialDescription: 'GSDP at constant and current prices; Agriculture, Industry, and Services percentage contributions; Rajasthan Investment Promotion Scheme (RIPS); Chief Minister Free Medicine Scheme, Indira Gandhi Urban Employment Guarantee Scheme, Palanhar Scheme, Chiranjeevi/RGHS health insurance, and Sujas flagship welfare programs.',
                    deepDiveAnalysis: 'Questions are direct numbers from latest Economic Survey: exact growth rate, exact per capita income (constant vs current), inflation rate, female labor force participation, and budget scheme outlay figures.',
                    subtopics: [
                      {
                        id: 'sub-res-1',
                        name: 'Sectoral Growth & Macro Indicators (Economic Survey)',
                        nameHindi: 'क्षेत्रीय वृद्धि एवं आर्थिक संकेतक',
                        details: 'GSVA sectoral composition: Services (~44%), Agriculture (~27%), Industry (~29%). Wholesale Price Index (1999-2000=100) vs CPI.',
                        keyPoints: [
                          'Per Capita Income at Constant (2011-12) vs Current Prices',
                          'Installed power generation capacity in state exceeds 23,000 MW'
                        ]
                      },
                      {
                        id: 'sub-res-2',
                        name: 'Flagship Schemes & Social Security Programs',
                        nameHindi: 'फ्लैगशिप योजनाएं एवं सामाजिक सुरक्षा',
                        details: 'Shubh Shakti Yojana, Mukhyamantri Kanya Kanyadan, Palanhar Yojana for orphans, Mukhyamantri Nishulk Dava Yojana (launched 2 Oct 2011).',
                        keyPoints: ['Indira Rasoi Yojana: Nutritious meal for ₹8', 'Mission Niryatak Bano for handholding local exporters']
                      }
                    ],
                    mustReadSources: ['Rajasthan Economic Survey (Published annually by Directorate of Economics and Statistics, Jaipur)', 'Sujas Monthly Magazine (Information & Public Relations Dept)'],
                    examinerTraps: ['Mixing current price numbers with constant price (2011-12 base) numbers', 'Assuming older scheme budget allocations'],
                    pyqFrequency: 'Largest single score-booster in RPSC Prelims (12-15 questions directly from Economic Survey)'
                  }
                ]
              },
              {
                id: 'rpsc-pre-general-science',
                name: 'General Science and Technology',
                nameHindi: 'सामान्य विज्ञान एवं प्रौद्योगिकी',
                description: 'Everyday Physics, Chemistry, Human Physiology & Nutrition, Biotechnology, Nanotechnology, Defence, Space, and Environmental Changes.',
                weightageEstimated: '16 - 20 Questions (~20 - 26 Marks)',
                topics: [
                  {
                    id: 'rpsc-sci-everyday-bio',
                    code: 'RPSC-PRE-SCI-01',
                    title: 'Everyday Science, Human Diseases, Nutrition & Biotechnology',
                    titleHindi: 'दैनिक विज्ञान, मानव रोग, पोषण एवं जैव प्रौद्योगिकी',
                    stage: 'Integrated (Prelims + Mains)',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '8-10 Questions in Prelims',
                    officialDescription: 'Human body systems, communicable vs non-communicable diseases, vitamins & deficiency disorders, genetic disorders, recombinant DNA technology, GMO crops (Bt Cotton), and intellectual property rights.',
                    deepDiveAnalysis: 'RPSC tests direct applications: vitamins (retinol, thiamine, ascorbic acid, calciferol), blood groups (ABO system, Rh factor incompatibility in pregnancy), antibiotics, and vaccines (mRNA vs vector vaccines).',
                    subtopics: [
                      {
                        id: 'sub-sc-1',
                        name: 'Human Diseases, Pathogens & Vaccines',
                        nameHindi: 'मानव रोग, रोगाणु एवं टीके',
                        details: 'Bacterial (Tuberculosis, Cholera, Typhoid) vs Viral (Hepatitis, Rabies, Dengue) vs Protozoan (Malaria, Kala-azar).',
                        keyPoints: ['BCG vaccine protects against tuberculosis', 'Kala-azar is transmitted by Sandfly (Phlebotomus)']
                      }
                    ],
                    mustReadSources: ['NCERT Science Class 8, 9, 10', 'Lucent General Science'],
                    examinerTraps: ['Confusing viral diseases with bacterial infections', 'Mixing up vitamins and their chemical names'],
                    pyqFrequency: '8-10 predictable questions in every prelims paper'
                  }
                ]
              },
              {
                id: 'rpsc-pre-reasoning-math',
                name: 'Reasoning & Mental Ability',
                nameHindi: 'तार्किक विवेचन एवं मानसिक योग्यता',
                description: 'Logical reasoning, Statement & Assumptions, Series, Coding, Blood relations, Direction, Ratios, Percentages, and Data Interpretation.',
                weightageEstimated: '20 Questions (~26.6 Marks)',
                topics: [
                  {
                    id: 'rpsc-quant-reasoning',
                    code: 'RPSC-PRE-REAS-01',
                    title: 'Logical Deduction, Mental Ability & Basic Numeracy',
                    titleHindi: 'तार्किक निष्कर्ष एवं बुनियादी अंकगणित',
                    stage: 'Prelims',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 80,
                    weightage: '20 Questions in Prelims',
                    officialDescription: 'Statements & Arguments, Syllogisms, Course of Action, Venn Diagrams, Seating Arrangement, Ratio, Percentage, Simple & Compound Interest, Probability, and Pie Charts.',
                    deepDiveAnalysis: 'Unlike UPSC where CSAT is a separate qualifying paper, in RPSC RAS these 20 questions are MERIT-SCORING in the single Prelims paper! Mastering these guarantees 25+ easy marks.',
                    subtopics: [
                      {
                        id: 'sub-reas-1',
                        name: 'Statement-Assertion & Analytical Reasoning',
                        nameHindi: 'कथन-कारण एवं तार्किक योग्यता',
                        details: 'Valid logical conclusions, evaluating weak vs strong arguments, decoding alphabet and number series.',
                        keyPoints: ['Mastering 20 mental ability questions can offset weak GK factual recall']
                      }
                    ],
                    mustReadSources: ['RS Aggarwal Verbal & Non-Verbal Reasoning', 'RPSC RAS PYQ compilations'],
                    examinerTraps: ['Making unstated assumptions in Statement-Argument questions'],
                    pyqFrequency: 'Exactly 20 questions in every RPSC Prelims exam'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        stageName: 'Mains',
        description: 'Descriptive Examination (4 Compulsory Papers of 200 Marks each = 800 Marks Total)',
        totalMarks: 800,
        papers: [
          {
            id: 'rpsc-mains-paper1',
            paperNumber: 'Paper I',
            paperName: 'General Studies I (History, Economics, Sociology, Management, Accounting)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 1',
            totalMarks: 200,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'rpsc-mains-p1-unit1',
                name: 'Unit I: History (Rajasthan, India & World)',
                nameHindi: 'इकाई 1: इतिहास (राजस्थान, भारत एवं विश्व)',
                description: 'Part A: History, Art & Culture of Rajasthan; Part B: Indian History & Culture; Part C: History of Modern World (Renaissance, Reformation, Enlightenment, Industrial Revolution).',
                weightageEstimated: '75 Marks',
                topics: [
                  {
                    id: 'rpsc-mains-p1-raj-hist',
                    code: 'RPSC-MAINS-P1-01',
                    title: 'Mains Descriptive: Rajasthan Art, Forts & Freedom Struggle',
                    titleHindi: 'मुख्य परीक्षा वर्णनात्मक: राजस्थान इतिहास एवं कला',
                    stage: 'Mains',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 10,
                    weightage: '30-40 Marks',
                    officialDescription: 'Short answers (15 words / 2 marks), Medium answers (50 words / 5 marks), Long analytical answers (100 words / 10 marks) on Rajasthan architectural heritage, peasant struggles, and cultural traditions.',
                    deepDiveAnalysis: 'Requires sharp point-wise answer structure: e.g. "Highlight architectural features of Kumbhalgarh Fort" or "Explain role of Vijay Singh Pathik in Bijolia peasant movement".',
                    subtopics: [
                      {
                        id: 'sub-rmh-1',
                        name: '15-word & 50-word Fact-Heavy Answer Frameworks',
                        nameHindi: '15 शब्द एवं 50 शब्द उत्तर प्रारूप',
                        details: 'Techniques to maximize 2-mark and 5-mark scores using bullet points, dates, and locations.',
                        keyPoints: ['In 2-mark questions, write exactly 2-3 precise factual bullets without introductory filler']
                      }
                    ],
                    mustReadSources: ['Rajasthan Hindi Granth Akademi History Books', 'Previous Years Solved Mains Papers'],
                    examinerTraps: ['Writing generic narrative essays instead of structured concise points'],
                    pyqFrequency: 'Core descriptive unit in Paper 1'
                  }
                ]
              },
              {
                id: 'rpsc-mains-p1-unit3',
                name: 'Unit III: Sociology, Management, Accounting & Auditing',
                nameHindi: 'इकाई 3: समाजशास्त्र, प्रबंधन, लेखांकन एवं अंकेक्षण',
                description: 'Part A: Sociology (Caste, Tribe in Rajasthan, Social problems); Part B: Management (Modern concepts, marketing, HR, corporate governance); Part C: Accounting & Auditing (Budgeting, Double entry, Auditing standards).',
                weightageEstimated: '60 Marks (20 Marks each Part)',
                topics: [
                  {
                    id: 'rpsc-mains-p1-socio-mgmt',
                    code: 'RPSC-MAINS-P1-03',
                    title: 'Specialized 20-Mark Modules: Sociology, Management & Auditing',
                    titleHindi: 'विशिष्ट विषय: समाजशास्त्र, प्रबंधन एवं अंकेक्षण',
                    stage: 'Mains',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 5,
                    weightage: '60 Marks total',
                    officialDescription: 'Unique RPSC RAS syllabus units not present in UPSC CSE! Scoring high in these three 20-mark sub-units is the secret weapon for top RAS ranking.',
                    deepDiveAnalysis: 'Syllabus covers Sanskritization, Westernization, Tribal issues of Bhils/Meenas/Garasias; Marketing mix (4 Ps), Leadership styles, Conflict management; Balance sheet analysis, Performance auditing, and Social Audit.',
                    subtopics: [
                      {
                        id: 'sub-socio-1',
                        name: 'Tribal Communities of Rajasthan (Bhil, Meena, Garasia, Sahariya)',
                        nameHindi: 'राजस्थान के प्रमुख जनजातीय समुदाय',
                        details: 'Social customs, Marriages (Mor Bandhiya, Taana, Dapa custom), Folk deities, and Welfare schemes under TDA.',
                        keyPoints: ['Sahariyas are the only Primitive Tribal Group (PVTG) recognized in Rajasthan (Shahbad & Kishanganj in Baran)']
                      }
                    ],
                    mustReadSources: ['IGNOU Notes for Management & Sociology', 'RPSC RAS Specialized Topic Guides'],
                    examinerTraps: ['Neglecting these three small 20-mark sections until the last month (they represent 30% of Paper 1)'],
                    pyqFrequency: 'Fixed 60 marks in every RAS Mains examination'
                  }
                ]
              }
            ]
          },
          {
            id: 'rpsc-mains-paper2',
            paperNumber: 'Paper II',
            paperName: 'General Studies II (Administrative Ethics, General Science, Earth Science/Geography)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 2 (प्रशासनिक नीतिशास्त्र, सामान्य विज्ञान, भूगोल)',
            totalMarks: 200,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'rpsc-mains-p2-ethics',
                name: 'Unit I: Administrative Ethics',
                nameHindi: 'इकाई 1: प्रशासनिक नीतिशास्त्र',
                description: 'Ethics in private and public relationships, Human values, Gita ethics and its role in administration, Gandhian ethics, Ethical decision making.',
                weightageEstimated: '65 Marks',
                topics: [
                  {
                    id: 'rpsc-mains-p2-gita-ethics',
                    code: 'RPSC-MAINS-P2-01',
                    title: 'Administrative Ethics & Bhagavad Gita Nishkama Karma',
                    titleHindi: 'प्रशासनिक नीतिशास्त्र एवं गीता का निष्काम कर्म योग',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 70,
                    weightage: '65 Marks in Paper 2',
                    officialDescription: 'Nishkama Karma (action without desire for fruits), Sthitaprajna (person of steady wisdom), Lokasamgraha (welfare of the world), and their direct relevance to modern civil servants.',
                    deepDiveAnalysis: 'RPSC specifically tests Indian philosophical ethics (unlike UPSC which leans heavily on Western utilitarian/Kantian thinkers). Aspirants must relate Gita shlokas and Ashoka’s Dhamma directly to transparent public service.',
                    subtopics: [
                      {
                        id: 'sub-ge-1',
                        name: 'Nishkama Karma & Sthitaprajna in Civil Services',
                        nameHindi: 'निष्काम कर्म एवं स्थितप्रज्ञ',
                        details: 'Performing duty with objectivity without emotional prejudice or personal bias; treating victory and defeat alike in policy implementation.',
                        keyPoints: ['Lokasamgraha implies maintaining social order and public welfare through righteous governance']
                      }
                    ],
                    mustReadSources: ['Ethics & Integrity by Subba Rao', 'Dr. Radhakrishnan on Bhagavad Gita'],
                    examinerTraps: ['Treating Gita as purely religious rather than universal administrative duty ethics'],
                    pyqFrequency: '65 marks fixed every year in Paper 2'
                  }
                ]
              }
            ]
          },
          {
            id: 'rpsc-mains-paper3',
            paperNumber: 'Paper III',
            paperName: 'General Studies III (Indian Polity, Public Administration, Sports/Yoga, Law)',
            paperNameHindi: 'सामान्य अध्ययन प्रश्नपत्र 3 (भारतीय राजनीति, लोक प्रशासन, खेल-योग, विधि)',
            totalMarks: 200,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'rpsc-mains-p3-pubad',
                name: 'Unit II: Public Administration & Management',
                nameHindi: 'इकाई 2: लोक प्रशासन एवं प्रबंधन',
                description: 'Principles of administration, POSDCORB, Organization, Delegation, Supervision, Right to Hearing Act 2012, Guaranteed Delivery of Public Services Act 2011.',
                weightageEstimated: '65 Marks',
                topics: [
                  {
                    id: 'rpsc-mains-p3-pubad-core',
                    code: 'RPSC-MAINS-P3-02',
                    title: 'Public Administration Theories & Rajasthan Citizen Charters',
                    titleHindi: 'लोक प्रशासन सिद्धांत एवं राजस्थान लोक सेवा गारंटी अधिनियम',
                    stage: 'Mains',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 30,
                    weightage: '65 Marks in Paper 3',
                    officialDescription: 'Theories of Taylor (Scientific Management), Fayol, Weber (Bureaucracy), Mayo (Human Relations); Rajasthan Guaranteed Delivery of Public Services Act 2011, Right to Hearing Act 2012, and Social Accountability Bill.',
                    deepDiveAnalysis: 'High marks yield: clear definition of hierarchy, span of control, unity of command, and exact operational mechanisms of Rajasthan’s pioneering citizen grievance redressal laws.',
                    subtopics: [
                      {
                        id: 'sub-pa-1',
                        name: 'Rajasthan Guaranteed Delivery of Public Services Act 2011',
                        nameHindi: 'राजस्थान लोक सेवा गारंटी अधिनियम 2011',
                        details: 'Mandated timeline for service delivery, First Appeal Officer, Second Appeal Officer, penalty of ₹250 to ₹5000 on erring officers.',
                        keyPoints: ['Rajasthan was among the earliest states in India to enact statutory public services delivery guarantee']
                      }
                    ],
                    mustReadSources: ['Mohit Bhattacharya: New Horizons of Public Administration', 'Rajasthan Administrative Reforms Department portal'],
                    examinerTraps: ['Mixing up appeal authorities in 2011 Act vs 2012 Right to Hearing Act'],
                    pyqFrequency: 'Major 65-mark unit in Paper 3'
                  }
                ]
              },
              {
                id: 'rpsc-mains-p3-law-sports',
                name: 'Unit III: Sports & Yoga, Behavior, Law',
                nameHindi: 'इकाई 3: खेल-योग, व्यवहार, विधि',
                description: 'Part A: Sports and Yoga (Rajasthan Sports Awards - Guru Vashishta, Maharana Pratap; Yoga asanas); Part B: Behavior (Intelligence, Personality, Learning); Part C: Law (POCSO, Maintenance of Parents, Rajasthan Tenancy Act 1955, Rajasthan Land Revenue Act 1956).',
                weightageEstimated: '60 Marks (20 Marks each Part)',
                topics: [
                  {
                    id: 'rpsc-mains-p3-tenancy-law',
                    code: 'RPSC-MAINS-P3-03',
                    title: 'Rajasthan Tenancy Act 1955 & Land Revenue Act 1956',
                    titleHindi: 'राजस्थान काश्तकारी अधिनियम 1955 एवं भू-राजस्व अधिनियम 1956',
                    stage: 'Mains',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 0,
                    weightage: '20 Marks in Law Part',
                    officialDescription: 'Khatedari rights, Khudkasht land, classes of tenants, ejectment rules, protection of SC/ST land transfers (Section 42 of Tenancy Act), Revenue Courts (Board of Revenue, Ajmer).',
                    deepDiveAnalysis: 'Section 42 of Rajasthan Tenancy Act 1955 voids any sale or transfer of agricultural land belonging to an SC/ST person to a non-SC/ST person. Board of Revenue in Ajmer acts as highest revenue appeal court.',
                    subtopics: [
                      {
                        id: 'sub-law-1',
                        name: 'Section 42 & Protection of Tribal/Dalit Agricultural Land',
                        nameHindi: 'धारा 42 एवं कृषि भूमि का संरक्षण',
                        details: 'Statutory prohibition of land alienation from SC/ST to general castes; powers of Sub-Divisional Officer (SDO) in revenue ejectment suits.',
                        keyPoints: ['Board of Revenue (Ajmer) was established under Land Revenue Act 1956']
                      }
                    ],
                    mustReadSources: ['Rajasthan Tenancy Act Bare Act', 'Bare Act: Rajasthan Land Revenue Act 1956'],
                    examinerTraps: ['Omitting Section numbers in 5-mark and 10-mark law answers'],
                    pyqFrequency: 'Guaranteed 20 marks in Law section every year'
                  }
                ]
              }
            ]
          },
          {
            id: 'rpsc-mains-paper4',
            paperNumber: 'Paper IV',
            paperName: 'General Hindi and General English',
            paperNameHindi: 'सामान्य हिन्दी एवं सामान्य अंग्रेजी',
            totalMarks: 200,
            durationHours: 3,
            nature: 'Scored for Merit',
            sections: [
              {
                id: 'rpsc-mains-p4-hindi',
                name: 'Part A: General Hindi (सामान्य हिन्दी)',
                nameHindi: 'भाग क: सामान्य हिन्दी (120 अंक)',
                description: 'Grammar (50 marks - Sandhi, Samas, Upasarg, Pratyay, Vilom, Paryayvachi, Muhavare), Composition (50 marks - Sankshiptikaran, Pallavan, Patra Lekhan), Essay (20 marks).',
                weightageEstimated: '120 Marks',
                topics: [
                  {
                    id: 'rpsc-mains-hindi-grammar',
                    code: 'RPSC-MAINS-HINDI-01',
                    title: 'Hindi Grammar, Official Letter Drafting & Nibandh',
                    titleHindi: 'हिन्दी व्याकरण, कार्यालयी पत्र प्रारूप एवं निबंध',
                    stage: 'Mains',
                    overlapCategory: 'RAJASTHAN_EXCLUSIVE',
                    overlapPercentage: 10,
                    weightage: '120 Marks (60% of Paper 4)',
                    officialDescription: 'The deciding paper in RAS ranking! Candidates scoring 130-150 in Paper 4 invariably secure top ranks in SDM / RPS cadres.',
                    deepDiveAnalysis: 'Part 1: 50 marks of pure grammar (Sandhi rules, correction of sentences, administrative technical terms e.g. "gazette", "indemnity"); Part 2: Official letters (Circular, Notification, Tender, Semi-official letter); Part 3: Contemporary 250-word essay on social/economic themes.',
                    subtopics: [
                      {
                        id: 'sub-hg-1',
                        name: 'Administrative Technical Terminology (पारिभाषिक शब्दावली)',
                        nameHindi: 'प्रशासनिक पारिभाषिक शब्दावली',
                        details: 'English to Hindi translation of 10 administrative terms (e.g. Quorum = गणपूर्ति, Deputation = प्रतिनियुक्ति, Ex-officio = पदेन).',
                        keyPoints: ['Guaranteed 10 marks if candidate masters the standard 200 official terms']
                      }
                    ],
                    mustReadSources: ['Dr. Raghav Prakash: Samanya Hindi', 'Dr. Hardev Bahri: Hindi Shabdarth Prayog'],
                    examinerTraps: ['Losing marks in minor matra errors in Sandhi and spelling corrections (Shuddh-Ashuddh)'],
                    pyqFrequency: '120 marks fixed; single highest scoring opportunity in entire RAS exam'
                  }
                ]
              },
              {
                id: 'rpsc-mains-p4-english',
                name: 'Part B: General English',
                nameHindi: 'भाग ख: सामान्य अंग्रेजी (80 अंक)',
                description: 'Grammar (20 marks - Articles, Prepositions, Tenses, Voice, Narration, Idioms), Comprehension & Précis (30 marks), Composition & Letter/Report (30 marks).',
                weightageEstimated: '80 Marks',
                topics: [
                  {
                    id: 'rpsc-mains-english-core',
                    code: 'RPSC-MAINS-ENG-01',
                    title: 'English Grammar, Précis Writing & Official Communication',
                    titleHindi: 'अंग्रेजी व्याकरण, संक्षेपण एवं कार्यालयी पत्र',
                    stage: 'Mains',
                    overlapCategory: 'COMMON_CORE',
                    overlapPercentage: 60,
                    weightage: '80 Marks',
                    officialDescription: 'Grammar transformation (Active/Passive, Direct/Indirect, Conjunctions), 1/3rd Précis with suitable title, Elaborative paragraph writing, and Official Letter/Report writing.',
                    deepDiveAnalysis: 'Rules for Précis: Write in one-third length, use own words without lifting sentences, avoid first person (I/we), and state a concise title for 2 free marks.',
                    subtopics: [
                      {
                        id: 'sub-eng-1',
                        name: 'Précis & Letter Writing Formulas',
                        nameHindi: 'संक्षेपण एवं पत्र लेखन सूत्र',
                        details: 'Tender notices, press communiqués, and official memos in standard administrative formats.',
                        keyPoints: ['In Précis, count total words, divide by 3, and state final word count at bottom']
                      }
                    ],
                    mustReadSources: ['Wren & Martin High School English Grammar', 'Previous RAS Paper 4 Solved Papers'],
                    examinerTraps: ['Exceeding word limit in Précis by more than 10 words', 'Missing formal salutation or reference number in official letters'],
                    pyqFrequency: '80 marks fixed in every RAS exam'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
