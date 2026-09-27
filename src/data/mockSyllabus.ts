import { TopicLesson } from '../types';

export const SYLLABUS_TOPICS: TopicLesson[] = [
  {
    id: 'panchayati-raj-local-gov',
    title: 'Panchayati Raj & Local Self-Government (73rd/74th CAA & Rajasthan Model)',
    titleHindi: 'पंचायती राज एवं स्थानीय स्वशासन (73वां/74वां संविधान संशोधन एवं राजस्थान मॉडल)',
    subject: 'Indian Polity & Rajasthan Administration',
    tags: ['COMMON', 'RPSC EXTRA', 'HIGH PRIORITY'],
    estimatedHours: 6,
    overlapPercentage: 75,
    syllabusLocation: 'UPSC CSE: GS Paper I (Polity & Governance - Panchayati Raj, Public Policy, Rights Issues); RPSC RAS Prelims: Unit 3 (Indian Constitution & Political System; Administrative Setup of Rajasthan - Local Self Government & Panchayati Raj Institutions).',
    whyMattersUPSC: 'UPSC focuses on democratic decentralization, financial autonomy of PRIs, devolution under 11th Schedule (29 subjects), PESA Act 1996 provisions, and role of Gram Sabha. UPSC frequently tests the mandatory vs discretionary provisions of Article 243.',
    whyMattersRPSC: 'Rajasthan is the cradle of Panchayati Raj in modern India (launched at Nagaur on 2 October 1959 by PM Jawaharlal Nehru). RPSC regularly asks direct, fact-heavy questions on the Rajasthan Panchayati Raj Act 1994, 50% reservation for women in Rajasthan PRIs, State Election Commission (Article 243K), and State Finance Commission (Article 243I).',
    coreConcept: 'Democratic decentralization transfers decision-making authority and resources from higher levels of government to grassroots elected bodies. The 73rd Constitutional Amendment Act (1992) inserted Part IX (Articles 243 to 243O) and the 11th Schedule, making the three-tier Panchayati Raj system (Gram, Block, District) constitutional rather than merely directive under Article 40.',
    importantFacts: [
      '[OFFICIAL FACT] Article 243B provides for a 3-tier system in all states, except states with a population under 20 lakhs may omit the intermediate (block) tier.',
      '[OFFICIAL FACT] Article 243D mandates minimum 1/3rd reservation for women in seats and Chairperson offices across all tiers. (Rajasthan expanded this to 50% via state amendment in 2008).',
      '[OFFICIAL FACT] Article 243K vests superintendence, direction, and control of PRI elections in the State Election Commissioner (appointed by Governor, removed ONLY like a High Court Judge).',
      '[OFFICIAL FACT] Article 243I mandates constitution of a State Finance Commission every 5 years by the Governor to review financial positions of PRIs.',
      '[OFFICIAL FACT] 11th Schedule contains 29 functional items devolved to Panchayats; 12th Schedule contains 18 items for Municipalities.',
      '[OFFICIAL FACT] PESA Act 1996 (Panchayats Extension to Scheduled Areas) applies Part IX to 5th Schedule areas, vesting ownership of Minor Forest Produce (MFP) in the Gram Sabha.'
    ],
    upscRpscOverlap: 'Common Core (75%): Constitutional articles 243-243O, Gram Sabha powers, mandatory vs discretionary provisions, PESA 1996, 11th Schedule subjects. Rajasthan Layer (25%): Rajasthan Panchayati Raj Act 1994, 50% women reservation, Nagaur 1959 history, Rajasthan State Election Commission commissioners, Rajasthan 6th State Finance Commission recommendations.',
    rajasthanSpecificAdditions: [
      'Inauguration: 2 October 1959 at Bagadari village, Nagaur district by Jawaharlal Nehru; Andhra Pradesh followed second in 1959.',
      'Rajasthan Panchayati Raj Act 1994 came into force on 23 April 1994 to align state laws with the 73rd CAA.',
      'Rajasthan 6th State Finance Commission: Chaired by Pradyuman Singh; recommended 6.75% of state net own tax revenue devolution to local bodies (75.1% to PRIs and 24.9% to ULBs).',
      'Rajasthan 50% reservation for women: Implemented through the Rajasthan Panchayati Raj (Amendment) Act, 2008.',
      'PESA in Rajasthan: Applicable in 8 southern tribal districts (Banswara, Dungarpur, Pratapgarh full; Udaipur, Rajsamand, Chittorgarh, Pali, Sirohi partial).'
    ],
    commonMisconceptionsAndTraps: [
      'TRAP 1: Assuming State Election Commissioner can be removed by the Governor. Reality: The Governor appoints the SEC, but removal is strictly by the President on grounds and manner identical to a High Court Judge (Article 243K(2)).',
      'TRAP 2: Believing minimum age to contest Panchayat election is 25 years. Reality: It is 21 years (Article 243F(1)(a)).',
      'TRAP 3: Assuming reservation for OBCs is a mandatory constitutional provision. Reality: Reservation for SC/ST and Women is mandatory; OBC reservation is discretionary (left to state legislature discretion under Article 243D(6)).'
    ],
    pyqLinkage: [
      {
        exam: 'UPSC CSE Prelims',
        year: 2021,
        questionBrief: 'Consider the local government provisions: Is reservation for women in Panchayats 1/3rd of total seats? Does the constitution bar courts from interfering in electoral matters of PRIs?',
        takeaway: 'UPSC tested Article 243D (1/3rd reservation) and Article 243O (bar to interference by courts in electoral matters).',
        correctAnswer: 'Both statements are correct.'
      },
      {
        exam: 'RPSC RAS Prelims',
        year: 2023,
        questionBrief: 'Under the Rajasthan Panchayati Raj Act, 1994, which authority is empowered to alter or delimit the boundaries of a Gram Panchayat or Panchayat Samiti?',
        takeaway: 'RPSC tests specific state administrative provisions and notifying government authorities under the 1994 Act.',
        correctAnswer: 'State Government (via official gazette notification).'
      }
    ],
    practiceQuestions: [
      {
        id: 'pq-polity-01',
        examType: 'UPSC',
        subject: 'Polity & Governance',
        topicId: 'panchayati-raj-local-gov',
        text: 'With reference to the 73rd Constitutional Amendment Act, 1992, consider the following statements:\n1. The constitution of a State Finance Commission every five years is a discretionary provision left to state legislatures.\n2. In a Panchayat where the office of the Chairperson is reserved for Scheduled Castes, women belonging to Scheduled Castes have a separate sub-reservation of not less than one-third of such reserved offices.\n3. The State Election Commissioner can be removed from office by the Governor upon an inquiry by the State Lokayukta.\nWhich of the statements given above is/are correct?',
        options: [
          '1 and 2 only',
          '2 only',
          '2 and 3 only',
          '1, 2 and 3'
        ],
        correctOption: 'B',
        explanations: [
          'Incorrect: SFC under Article 243I is a MANDATORY constitutional provision.',
          'Correct: Article 243D(4) mandates that not less than 1/3rd of the total number of offices of Chairpersons reserved for SCs/STs shall be reserved for women belonging to SCs/STs.',
          'Incorrect: Article 243K(2) clearly stipulates that the State Election Commissioner shall not be removed except in like manner and on like grounds as a Judge of a High Court (by the President, not Governor).'
        ],
        concept: 'Article 243D(4) Chairperson reservations and Article 243K removal safeguards.',
        trap: 'Examiner conflated appointing authority (Governor) with removing authority (same as HC Judge / President), and mandatory vs discretionary provisions.',
        eliminationTactic: 'Statement 1 is clearly false because Article 243I is compulsory. Eliminate (A) and (D). Statement 3 has the classic removal authority trap. SEC has constitutional judicial removal safeguards. Eliminate (C). Only (B) remains.',
        mnemonic: 'PR-SEC-HC: Panchayat State Election Commissioner = High Court Judge removal security.',
        difficulty: 'Moderate',
        cognitiveSkill: 'Analytical'
      },
      {
        id: 'pq-polity-02',
        examType: 'RPSC',
        subject: 'Rajasthan Administration',
        topicId: 'panchayati-raj-local-gov',
        text: 'In Rajasthan, on which date and at which place was the historic democratic decentralization through Panchayati Raj inaugurated for the first time in India?',
        options: [
          '15 August 1957, Bagadari (Sikar)',
          '2 October 1959, Bagadari (Nagaur)',
          '26 January 1950, Deshnok (Bikaner)',
          '2 October 1961, Mandore (Jodhpur)',
          'Question not attempted'
        ],
        correctOption: 'B',
        explanations: [
          'Incorrect: Incorrect year and district.',
          'Correct: Inaugurated on 2 October 1959 at Bagadari village in Nagaur district by Pandit Jawaharlal Nehru.',
          'Incorrect: Deshnok is known for Karni Mata temple.',
          'Incorrect: Mandore was the ancient capital of Marwar.',
          'Option E: Use only if not attempting to avoid penalty under RPSC 5-option OMR rules.'
        ],
        concept: 'Historical inauguration of Panchayati Raj in Rajasthan.',
        trap: 'Confusing the village name Bagadari with other districts, or confusing 1959 with 1957 (Balwant Rai Mehta Committee report date).',
        eliminationTactic: 'Balwant Rai Mehta reported in 1957, NDC accepted in 1958, Rajasthan pioneered on Gandhi Jayanti 1959 in Nagaur.',
        mnemonic: 'Nehru-Nagaur-FiftyNine (2 Oct 1959).',
        difficulty: 'Easy',
        cognitiveSkill: 'Factual'
      }
    ],
    revisionSummary: {
      microNotes: '73rd CAA (Part IX, Art 243-243O, 11th Sched - 29 items). Mandatory: 3 tiers (>20L), 21 yr age, 5-yr tenure, 1/3rd women, SEC (Art 243K), SFC (Art 243I). Discretionary: OBC reservation, tax powers, voting rights of MPs/MLAs. Rajasthan: 2 Oct 1959 Nagaur, 50% women reservation (2008), 1994 State Act.',
      comparisonTable: [
        { parameter: 'Inception in Constitution', upscCore: 'Article 40 (DPSP) made mandatory via 73rd CAA 1992', rajasthanLayer: 'Pioneered on 2 Oct 1959 at Nagaur; State Act passed 1994' },
        { parameter: 'Women Reservation', upscCore: 'Minimum 1/3rd (33.33%) under Art 243D', rajasthanLayer: 'Enhanced to 50% in Rajasthan PRIs since 2008' },
        { parameter: 'State Finance Commission', upscCore: 'Article 243I constituted every 5 years', rajasthanLayer: '6th SFC chaired by Pradyuman Singh (6.75% devolution)' },
        { parameter: 'Tribal Decentralization', upscCore: 'PESA Act 1996 applies to 10 states', rajasthanLayer: 'Applicable in southern tribal belt (Banswara, Dungarpur, Pratapgarh, etc.)' }
      ],
      memoryAid: '243-B-D-I-K-O: B=Bodies 3-tier, D=Division/Reservation, I=Income/Finance, K=Karyakram Election, O=Oust court interference.'
    },
    spacedRevisionSchedule: {
      day1: 'Recall 6 mandatory articles: 243A (Gram Sabha), 243B (Tiers), 243D (Reservation), 243E (5 yrs), 243I (SFC), 243K (SEC).',
      day3: 'Solve 10 MCQs testing discretionary vs mandatory provisions and PESA Act powers.',
      day7: 'Compare 73rd CAA vs 74th CAA (11th Sched 29 subjects vs 12th Sched 18 subjects).',
      day15: 'Interleave with Rajasthan Administrative Setup and 6th SFC recommendations.',
      day30: 'Full timed speed test on local self-government.'
    }
  },
  {
    id: 'governor-and-state-executive',
    title: 'Governor & State Executive (Articles 153–163 & Rajasthan Nuances)',
    titleHindi: 'राज्यपाल एवं राज्य कार्यपालिका (अनुच्छेद 153-163 एवं राजस्थान परिप्रेक्ष्य)',
    subject: 'Indian Polity & Rajasthan Administration',
    tags: ['COMMON', 'UPSC EXTRA', 'RPSC EXTRA', 'HIGH PRIORITY'],
    estimatedHours: 5,
    overlapPercentage: 70,
    syllabusLocation: 'UPSC CSE: GS Paper I (Polity - Federalism, Executive, Governor\'s Discretion, Constitutional Functionaries); RPSC RAS Prelims: Unit 3 (Indian Constitution; State Administration of Rajasthan - Role and Powers of Governor).',
    whyMattersUPSC: 'UPSC frequently probes constitutional discretion of the Governor vs President (Article 163 vs 74), reservation of state bills for Presidential consideration (Articles 200 & 201), ordinance making (Article 213), and landmark Supreme Court verdicts (S.R. Bommai, Nabam Rebia, Rameshwar Prasad).',
    whyMattersRPSC: 'RPSC RAS is notorious for factual questions on Rajasthan Governors: Who were the first Governors, who died in office, who resigned, who served as members of RPSC/UPSC, who also served as Speaker, and who were the longest/shortest serving Governors of Rajasthan.',
    coreConcept: 'The Governor is the constitutional head of the state executive (Article 154) and the vital link between the Union and the State. Unlike the President—who has no explicit constitutional discretion under Article 74—the Governor enjoys express constitutional discretion under Article 163(1) & 163(2).',
    importantFacts: [
      '[OFFICIAL FACT] Article 153 allows the appointment of the same person as Governor for two or more states (added by 7th CAA 1956).',
      '[OFFICIAL FACT] Article 156 states the Governor holds office during the pleasure of the President; no specified grounds of removal in Constitution.',
      '[OFFICIAL FACT] Article 163(2) specifies that if any question arises whether any matter is or is not a matter in which the Governor is required to act in his discretion, the decision of the Governor in his discretion shall be final.',
      '[OFFICIAL FACT] Article 200: Governor can assent, withhold assent, return (if non-money bill), or reserve the bill for the President\'s consideration.',
      '[OFFICIAL FACT] Article 213: Ordinance power requires that state legislature must NOT be in session; must be laid before assembly within 6 weeks of reassembly.'
    ],
    upscRpscOverlap: 'Common Core (70%): Constitutional provisions (Articles 153-167), discretionary powers, Article 200/201, ordinance power, Sarkaria and Punchhi Commission recommendations. Rajasthan Layer (30%): First Governor Gurmukh Nihal Singh (appointed 1956 after Rajpramukh Sawai Man Singh II), Governors who died in office (Darbara Singh, Nirmal Chandra Jain, S.K. Singh, Prabha Rau), Governors who were Chief Justices, former UPSC chairmen/members.',
    rajasthanSpecificAdditions: [
      'Historical Origin: Prior to 1 November 1956, the titular head was designated "Rajpramukh" (Maharaja Sawai Man Singh II of Jaipur from 1949 to 1956).',
      'First Governor of Rajasthan: Sardar Gurmukh Nihal Singh took oath on 1 November 1956 (longest serving: ~5.5 years).',
      'Governors who passed away in office: Darbara Singh (1998), Nirmal Chandra Jain (2003), S.K. Singh (2009), Smt. Prabha Rau (2010).',
      'Women Governors of Rajasthan: Pratibha Devisingh Patil (first woman governor, later President of India), Prabha Rau, Margaret Alva.',
      'Governor who resigned: Madan Lal Khurana (2004), Pratibha Patil (upon presidential nomination 2007).',
      'Governor as Chancellor: Ex-officio Chancellor of state universities created by state legislative acts (NOT central universities).'
    ],
    commonMisconceptionsAndTraps: [
      'TRAP 1: Thinking the Governor takes oath under the Third Schedule. Reality: Governor\'s oath is NOT in the Third Schedule; it is prescribed in Article 159 itself (administered by the Chief Justice of the state High Court).',
      'TRAP 2: Believing Governor has absolute discretion to dissolve Legislative Assembly when Council of Ministers enjoys majority. Reality: Supreme Court in S.R. Bommai (1994) held majority must be tested on the floor of the House, not at Raj Bhavan.',
      'TRAP 3: Assuming Governor can pardon death sentences like the President. Reality: Under Article 161, Governor can suspend, remit, or commute a death sentence, but CANNOT grant a complete pardon (only the President under Article 72 can pardon death penalty).'
    ],
    pyqLinkage: [
      {
        exam: 'UPSC CSE Prelims',
        year: 2019,
        questionBrief: 'Which of the following are the discretionary powers given to the Governor of a State? 1. Sending report to the President for imposing President\'s rule 2. Appointing Ministers 3. Reserving certain bills for the consideration of President 4. Making rules to conduct business of State Government.',
        takeaway: 'Discretionary powers under Articles 356 and 200 versus ministerial advice under 164 & 166.',
        correctAnswer: '1 and 3 only.'
      },
      {
        exam: 'RPSC RAS Prelims',
        year: 2021,
        questionBrief: 'Which of the following Governors of Rajasthan died during their tenure in office? (A) Darbara Singh (B) Nirmal Chandra Jain (C) S.K. Singh (D) Anshuman Singh.',
        takeaway: 'RPSC routinely tests exact names of Rajasthan Governors with specific historical records.',
        correctAnswer: '(A), (B), and (C) only.'
      }
    ],
    practiceQuestions: [
      {
        id: 'pq-polity-03',
        examType: 'UPSC',
        subject: 'Polity & Governance',
        topicId: 'governor-and-state-executive',
        text: 'Consider the following statements regarding the office of the Governor in India:\n1. The form of oath of office of the Governor is contained in the Third Schedule of the Constitution of India.\n2. The Governor cannot be removed by the President without an inquiry conducted by the Supreme Court of India.\n3. The constitutional discretionary power under Article 163 is explicitly conferred on the Governor, whereas no such express constitutional discretion is conferred on the President under Article 74.\nWhich of the statements given above is/are correct?',
        options: [
          '1 and 2 only',
          '3 only',
          '1 and 3 only',
          '2 and 3 only'
        ],
        correctOption: 'B',
        explanations: [
          'Incorrect: Governor\'s oath is specifically defined in Article 159, not in the Third Schedule.',
          'Incorrect: Under Article 156(1), Governor holds office during the pleasure of the President; no SC inquiry is mandated by the Constitution.',
          'Correct: Article 163(1) contains the phrase "except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion". Article 74 has no corresponding words for the President.'
        ],
        concept: 'Article 159 oath, Article 156 pleasure doctrine, and Article 163 express discretion.',
        trap: 'Students often assume all high constitutional oaths are in the Third Schedule (President, Vice-President, and Governor have their oaths in specific articles: 60, 69, 159).',
        eliminationTactic: 'Statements 1 and 2 are well-known constitutional traps. Oaths for President (60), VP (69), Governor (159) are outside Third Schedule. Eliminate (A), (C). Governor serves during pleasure of President. Eliminate (D). Result: (B).',
        mnemonic: 'P-V-G Out of 3: President(60), Vice-Pres(69), Governor(159) oaths are outside Third Schedule.',
        difficulty: 'Difficult',
        cognitiveSkill: 'Analytical'
      }
    ],
    revisionSummary: {
      microNotes: 'Art 153 (Office, 7th CAA dual charge), Art 154 (Executive power), Art 156 (Pleasure of President), Art 159 (Oath by HC CJ), Art 161 (Pardon - no death pardon), Art 163 (Express discretion), Art 200 (Bill reservation), Art 213 (Ordinances). Rajasthan: Gurmukh Nihal Singh (1st), 4 died in office (Darbara, Nirmal, SK Singh, Prabha Rau).',
      comparisonTable: [
        { parameter: 'Constitutional Discretion', upscCore: 'Explicitly provided in Art 163(1) and made non-justiciable in Art 163(2)', rajasthanLayer: 'Subject to floor test principles in assembly disputes' },
        { parameter: 'Pardoning Power', upscCore: 'Article 161: Cannot pardon death sentences (only suspend/commute)', rajasthanLayer: 'State home department processes files for Governor' },
        { parameter: 'Chancellor Role', upscCore: 'Statutory power conferred by State Acts, not constitutional', rajasthanLayer: 'Chancellor of 28+ State Public Universities in Rajasthan' }
      ],
      memoryAid: '153 to 163: Governor to Council. Oath in 159, Bill in 200, Ordinance in 213.'
    },
    spacedRevisionSchedule: {
      day1: 'Recall articles 159, 161, 163, 200, 213 and compare with President\'s articles 60, 72, 74, 111, 123.',
      day3: 'Review the 4 Rajasthan Governors who died in tenure and women governors list.',
      day7: 'Solve 10 analytical questions on Governor\'s bill reservation power under Art 200/201.',
      day15: 'Study Sarkaria (1988) and Punchhi (2010) recommendations on Governor appointment and tenure.',
      day30: 'Comprehensive active recall drill with closed notes.'
    }
  },
  {
    id: 'rajasthan-physiography-and-drainage',
    title: 'Physiography & River Systems of Rajasthan (Aravalli, Thar & Chambal)',
    titleHindi: 'राजस्थान का भौतिक स्वरूप एवं अपवाह तंत्र (अरावली, थार एवं चंबल)',
    subject: 'Indian & Rajasthan Geography',
    tags: ['COMMON', 'RPSC EXTRA', 'HIGH PRIORITY'],
    estimatedHours: 7,
    overlapPercentage: 60,
    syllabusLocation: 'UPSC CSE: GS Paper I (Indian and World Geography - Physical Geography, Drainage Systems, Desertification, Water Resources); RPSC RAS Prelims: Unit 2 (Geography of Rajasthan - Broad Physical Features, Geological Structure, Drainage System, Lakes, Climate, Soils).',
    whyMattersUPSC: 'UPSC tests desertification control, the Great Green Wall / Aravali Green Wall Project, inland drainage basins (Sambhar, Luni), rain-shadow phenomena, and multi-state interlinking of rivers (Ken-Betwa, Parbati-Kalisindh-Chambal / PKC-ERCP).',
    whyMattersRPSC: 'RPSC RAS dedicates 15–20% of its paper to Rajasthan geography. Questions are intensely factual: peak heights (Guru Shikhar, Ser, Dilwara, Jarga, Achalgarh), pass names (Darra/Nal), river origins (Chambal at Janapav, Luni at Nag Pahar), left/right bank tributaries, and inland vs Bay of Bengal vs Arabian drainage splits.',
    coreConcept: 'Rajasthan is divided into four broad physiographic divisions: 1. Western Sandy Plain (Thar Desert - ~61.11% area, 40% pop), 2. Aravalli Range (~9% area, 10% pop, oldest fold mountains in the world running SW to NE), 3. Eastern Plains (~23% area, 39% pop, fertile alluvial Chambal-Banas basin), 4. South-Eastern Hadoti Plateau (~6.89% area, 11% pop, Deccan trap basaltic lava). Drainage is split into three unique systems: Bay of Bengal (~22.4%), Arabian Sea (~17.1%), and Inland Drainage (~60.2%).',
    importantFacts: [
      '[OFFICIAL FACT] Aravalli Range stretches ~692 km from Khedbrahma (Gujarat) to Raisina Hill (Delhi); ~550 km (~80%) lies within Rajasthan.',
      '[OFFICIAL FACT] Highest peak: Guru Shikhar (1,722 m / 5,650 ft) in Mount Abu, Sirohi district; termed "Santon ka Shikhar" by Col. James Tod.',
      '[OFFICIAL FACT] Chambal River originates from Janapav hills (Vindhyas, MP), enters Rajasthan at Chaurasigarh (Chittorgarh), only perennial river of Rajasthan, forms interstate border between MP and Rajasthan.',
      '[OFFICIAL FACT] Luni River originates from Nag Pahar (Ajmer) as Sagarmati; water is fresh up to Balotra (Balotra district), then turns saline due to halite and desert salts.',
      '[OFFICIAL FACT] Mahi River cuts the Tropic of Cancer twice; originates in Amjhera (MP), flows in an inverted \'U\' shape through Banswara and Dungarpur.',
      '[OFFICIAL FACT] Sambhar Lake (Jaipur/Nagaur/Didwana-Kuchaman) is India\'s largest inland saline lake; Ramsar site; accounts for ~8-9% of India\'s salt production.'
    ],
    upscRpscOverlap: 'Common Core (60%): Monsoon mechanisms, Western Disturbances (Mahawat - beneficial for Rabi crops like wheat and mustard), desertification processes, inland drainage concepts, Ramsar wetland criteria. Rajasthan Layer (40%): Aravalli peak hierarchy, exact river origin hills, dams (Bisalpur on Banas, Rana Pratap Sagar on Chambal, Meja on Kothari, Jakham on Jakham), 50-cm isohyet dividing arid and semi-arid zones.',
    rajasthanSpecificAdditions: [
      'Top 5 Aravalli Peaks order: Guru Shikhar (1722m, Sirohi) > Ser (1597m, Sirohi) > Dilwara (1442m, Sirohi) > Jarga (1431m, Udaipur) > Achalgarh (1380m, Sirohi).',
      'Plateaus: Bhorat Plateau (between Kumbhalgarh and Gogunda), Uparmal Plateau (between Bhilwara Bijolia and Chittorgarh Bhaisrodgarh), Mesa Plateau (Chittorgarh fort is situated on it), Odia Plateau (highest plateau of Rajasthan at 1360m in Mount Abu).',
      'Inland Rivers of Rajasthan: Kantli (originates Khandela hills, Sikar; Ganeshwar civilization on its bank), Kakney/Masoordi (Jaisalmer, flows into Bhuj lake), Sabi, Ruparel, Ghaggar (dead river / Nali in Hanumangarh).',
      'ERCP (Eastern Rajasthan Canal Project): Integrates Surplus water of Chambal, Kunnu, Kul, Parbati, Kalisindh to meet drinking and irrigation needs of 21 districts; MoU signed between Rajasthan, MP, and Union Jal Shakti Ministry for PKC-ERCP.'
    ],
    commonMisconceptionsAndTraps: [
      'TRAP 1: Confusing Banas drainage destination. Reality: Banas is NOT an inland river; it originates at Khamnor hills (Rajsamand) and merges into Chambal at Rameshwaram (Sawai Madhopur) -> reaches Bay of Bengal.',
      'TRAP 2: Believing Luni flows into the Bay of Bengal. Reality: Luni flows southwest into the Rann of Kutch (Arabian Sea system).',
      'TRAP 3: Assuming Western Disturbances occur in monsoon. Reality: Western Disturbances arrive in winter (December-February) from Mediterranean Sea, causing "Mahawat" rainfall, gold for Rabi crops.'
    ],
    pyqLinkage: [
      {
        exam: 'UPSC CSE Prelims',
        year: 2020,
        questionBrief: 'Consider the rivers: Which of the following rivers does NOT originate in the Vindhya or Satpura ranges? Can you identify the course of Mahi and Chambal?',
        takeaway: 'UPSC tests drainage basins, Tropic of Cancer crossings, and peninsular river origins.',
        correctAnswer: 'Course and origins of Mahi/Chambal tested.'
      },
      {
        exam: 'RPSC RAS Prelims',
        year: 2021,
        questionBrief: 'Arrange the following mountain peaks of Rajasthan in descending order of their heights: (1) Guru Shikhar (2) Ser (3) Dilwara (4) Jarga.',
        takeaway: 'Classic RPSC peak hierarchy question requiring exact heights in meters.',
        correctAnswer: '1 - 2 - 3 - 4.'
      }
    ],
    practiceQuestions: [
      {
        id: 'pq-geo-01',
        examType: 'RPSC',
        subject: 'Rajasthan Geography',
        topicId: 'rajasthan-physiography-and-drainage',
        text: 'Which river in Rajasthan is known for flowing in an inverted "U" shape and crossing the Tropic of Cancer (23.5° N latitude) twice during its course?',
        options: [
          'Chambal',
          'Mahi',
          'Banas',
          'Luni',
          'Question not attempted'
        ],
        correctOption: 'B',
        explanations: [
          'Incorrect: Chambal flows northeast into Yamuna and does not cross Tropic of Cancer twice.',
          'Correct: Mahi originates from Dhar/Amjhera in MP, enters Rajasthan (Banswara), loops around Dungarpur, and flows into Gujarat (Gulf of Khambhat), crossing the Tropic of Cancer twice.',
          'Incorrect: Banas flows entirely within Rajasthan eastward into Chambal.',
          'Incorrect: Luni flows towards Rann of Kutch.',
          'Option E: To be selected if not attempting.'
        ],
        concept: 'Tropic of Cancer crossing and drainage path of River Mahi (Ganga of Vagad/Kanthal).',
        trap: 'Confusing Mahi with Chambal or Sabarmati.',
        eliminationTactic: 'Mahi is the iconic inverted "U" river of southern tribal belt (Vagad region).',
        mnemonic: 'Mahi Makes Two Marks across Cancer line.',
        difficulty: 'Easy',
        cognitiveSkill: 'Factual'
      },
      {
        id: 'pq-geo-02',
        examType: 'UPSC',
        subject: 'Physical Geography',
        topicId: 'rajasthan-physiography-and-drainage',
        text: 'With reference to the drainage patterns of arid and semi-arid regions of Western India, consider the following statements:\n1. The Luni river basin is unique because its water remains potable from its origin until Balotra, after which it turns saline due to high sodium chloride and salt deposits in the desert soil.\n2. The Aravalli range acts as a primary water divide separating the Arabian Sea drainage basin from the Bay of Bengal drainage basin.\n3. The Ghaggar river is an antecedent perennial river that empties into the Arabian Sea near the Gulf of Kutch.\nWhich of the statements given above are correct?',
        options: [
          '1 and 2 only',
          '2 and 3 only',
          '1 and 3 only',
          '1, 2 and 3'
        ],
        correctOption: 'A',
        explanations: [
          'Correct: Up to Balotra (near Barmer), Luni has sweet water (Meethi nadi); downstream it becomes saline (Khari nadi).',
          'Correct: The Aravalli crest acts as the great continental water divide of India: rivers to its west (Luni, Sukri, Jawai) flow toward Arabian Sea / Rann of Kutch; rivers to its east (Banas, Chambal, Banganga) flow toward Bay of Bengal.',
          'Incorrect: Ghaggar is NOT a perennial river and does NOT reach the Arabian Sea; it is an ephemeral inland drainage river terminating near Fort Abbas in Pakistan during heavy floods.'
        ],
        concept: 'Inland vs exorheic drainage, Aravalli water divide, and salinity transitions.',
        trap: 'Statement 3 states Ghaggar empties into the Arabian Sea; Ghaggar is an inland river.',
        eliminationTactic: 'Statement 3 is factually wrong: Ghaggar never reaches the Arabian Sea. Eliminate (B), (C), and (D). Immediately (A) is the answer without second-guessing.',
        mnemonic: 'Aravalli = Great Divide; Luni = Sweet till Balotra.',
        difficulty: 'Moderate',
        cognitiveSkill: 'Analytical'
      }
    ],
    revisionSummary: {
      microNotes: '4 Divisions: Western Sandy Plain (61.11%), Aravalli (9%, Guru Shikhar 1722m), Eastern Plain (23%), Hadoti (6.89%). Drainage: Inland (60.2%), Bay of Bengal (22.4%), Arabian (17.1%). Luni sweet till Balotra. Mahi cuts Tropic of Cancer 2x. Chambal = only perennial with ravines (badland topography). Peak order: Guru > Ser > Dilwara > Jarga > Achalgarh.',
      comparisonTable: [
        { parameter: 'Drainage Percentage', upscCore: 'India: ~77% Bay of Bengal, ~23% Arabian Sea', rajasthanLayer: 'Rajasthan: ~60.2% Inland, ~22.4% Bay of Bengal, ~17.1% Arabian Sea' },
        { parameter: 'Water Divide', upscCore: 'Western Ghats, Vindhyas, Satpuras', rajasthanLayer: 'Aravalli Range (SW to NE, 550 km in RJ) is the primary divide' },
        { parameter: 'Special River Phenomenon', upscCore: 'Gorge cutting and estuarine delta systems', rajasthanLayer: 'Chambal badland/ravines (Behad), Luni sweet-to-saline at Balotra' }
      ],
      memoryAid: 'G-S-D-J-A: Guru Shikhar (1722), Ser (1597), Dilwara (1442), Jarga (1431), Achalgarh (1380).'
    },
    spacedRevisionSchedule: {
      day1: 'Recite Aravalli peak sequence (Guru-Ser-Dilwara-Jarga) and the 3 river categories with origins.',
      day3: 'Trace the path of Chambal and Mahi with tributaries on a blank physical map.',
      day7: 'Review the 50-cm and 25-cm isohyets and their agro-climatic boundaries.',
      day15: 'Interleave with ERCP project (21 districts) and Indira Gandhi Canal (IGNP) lift channels.',
      day30: 'Full mock map-based test.'
    }
  },
  {
    id: 'ancient-civilizations-kalibangan-ganeshwar',
    title: 'Indus Valley & Ancient Civilizations: Kalibangan & Ganeshwar vs Harappa',
    titleHindi: 'सिंधु घाटी एवं प्राचीन सभ्यताएं: कालीबंगा एवं गणेश्वर (हड़प्पा के संदर्भ में)',
    subject: 'Indian History & Rajasthan Heritage',
    tags: ['COMMON', 'RPSC EXTRA', 'HIGH PRIORITY'],
    estimatedHours: 5,
    overlapPercentage: 70,
    syllabusLocation: 'UPSC CSE: GS Paper I (Indian History & Art & Culture - Indus Valley Sites, Town Planning, Architecture, Religious Practices); RPSC RAS Prelims: Unit 1 (History & Culture of Rajasthan - Ancient Civilizations: Kalibangan, Ahar, Ganeshwar, Balathal and Bairat).',
    whyMattersUPSC: 'UPSC consistently asks questions on IVC sites, unique features (e.g. Dholavira water reservoir, Lothal dockyard, Kalibangan ploughed field and fire altars, absence of temples/standing army, bronze casting technique).',
    whyMattersRPSC: 'RPSC RAS makes ancient Rajasthan sites a compulsory section. Questions focus on: Excavators (Amalananda Ghosh, B.B. Lal, B.K. Thapar, R.C. Agrawal), river banks (Ghaggar, Kantli, Banas/Berach), archaeological finds (furrow marks, copper arrowheads, terracotta bull, ochre-coloured pottery).',
    coreConcept: 'The Indus Valley Civilization (Bronze Age) extended across the Indus-Saraswati (Ghaggar-Hakra) river basins. While Harappa and Mohenjo-Daro were major urban metropolises, Rajasthan holds two seminal cradle sites: Kalibangan (in Hanumangarh, showing both Pre-Harappan and Mature Harappan phases) and Ganeshwar (in Neem Ka Thana/Sikar, known as the Mother of Copper Civilizations - Tamrayugeen Sabhyataon ki Janani).',
    importantFacts: [
      '[OFFICIAL FACT] Kalibangan: Situated on the left bank of Ghaggar river in Hanumangarh district; discovered by Amalananda Ghosh (1952), excavated by B.B. Lal and B.K. Thapar (1961-69).',
      '[OFFICIAL FACT] World\'s earliest recorded ploughed agricultural field with criss-cross furrow marks (indicating dual cropping: mustard and gram) discovered at Kalibangan.',
      '[OFFICIAL FACT] Fire altars (Havan Kundas) lined with bricks found in a row on platforms at Kalibangan and Lothal, indicating ritual animal sacrifice / fire worship.',
      '[OFFICIAL FACT] Kalibangan had NO mother goddess figurines (unlike Mohenjo-Daro and Harappa), and lacked stone/baked brick drainage along streets; drains were of wood and terracotta.',
      '[OFFICIAL FACT] Ganeshwar: Located on Kantli river at Neem Ka Thana; excavated by R.C. Agrawal (1977); 99% pure copper objects (spearheads, fish hooks, arrowheads); supplied copper to Harappa/Mohenjo-Daro.',
      '[OFFICIAL FACT] Bairat (Viratnagar, Jaipur Rural): Associated with Mahabharata Matsya kingdom, Buddhist monastery (Gol Mandir / Stupa), and Emperor Ashoka\'s Bhabru Rock Edict.'
    ],
    upscRpscOverlap: 'Common Core (70%): IVC town planning (grid system, citadel vs lower town), religious practices (fire worship, pashupati seal), metallurgy, trade routes. Rajasthan Layer (30%): Excavator names, exact district locations, Ganeshwar copper metallurgy, Ahar copper smelting furnaces, Bairat Buddhist inscriptions.',
    rajasthanSpecificAdditions: [
      'Kalibangan name meaning: "Black Bangles" (Kali = Black, Bangan = Bangles in Punjabi/Rajasthani).',
      'Burial practices at Kalibangan: Evidence of 3 types of burials: Circular pit (pot burials), Rectangular grave with extended skeleton, and Symbolic burial without skeletal remains.',
      'Trepanation evidence: Skull of a child with 6 holes showing prehistoric cranial surgery / hydrocephalus treatment found at Kalibangan.',
      'Ahar Civilization (Udaipur, Ahar/Berach river): Also called Tamravati Nagari, Dhulkot, or Aghatpur; terracotta bulls (Banasian Bull), rice grains, dyeing stamp blocks.',
      'Balathal (Vallabhnagar, Udaipur): Excavated by V.N. Misra; fortified enclosure, woven cloth piece, skeleton showing leprosy (~2000 BCE - earliest in India).'
    ],
    commonMisconceptionsAndTraps: [
      'TRAP 1: Believing Mother Goddess figurines were found everywhere in IVC. Reality: Mother Goddess terracotta figurines were ABSENT in Kalibangan and Lothal.',
      'TRAP 2: Confusing Kalibangan brick masonry. Reality: Kalibangan used sun-dried mud bricks for houses; baked bricks were reserved mainly for wells, drains, and fire altars (hence called the "Poor Settlement" / Deen-Heen Basti).',
      'TRAP 3: Assuming iron was used in Ganeshwar or Kalibangan. Reality: Both were Bronze Age / Chalcolithic sites. Iron (Lauha-yug) was completely unknown to Harappans.'
    ],
    pyqLinkage: [
      {
        exam: 'UPSC CSE Prelims',
        year: 2019,
        questionBrief: 'Which one of the following is not a Harappan site? (A) Chanhudaro (B) Kot Diji (C) Sohgaura (D) Desalpur.',
        takeaway: 'UPSC tests geographic awareness of Harappan sites versus Mauryan/historical sites (Sohgaura is a Mauryan copper plate site).',
        correctAnswer: '(C) Sohgaura.'
      },
      {
        exam: 'RPSC RAS Prelims',
        year: 2023,
        questionBrief: 'At which of the following ancient sites of Rajasthan was the earliest evidence of a ploughed field found?',
        takeaway: 'Direct site-to-discovery matching question on Kalibangan.',
        correctAnswer: 'Kalibangan.'
      }
    ],
    practiceQuestions: [
      {
        id: 'pq-hist-01',
        examType: 'UPSC',
        subject: 'Ancient Indian History',
        topicId: 'ancient-civilizations-kalibangan-ganeshwar',
        text: 'Regarding the Indus Valley site of Kalibangan, consider the following statements:\n1. It has yielded the earliest archaeological evidence of a ploughed agricultural field in the Indian subcontinent.\n2. Unlike Mohenjo-Daro, no terracotta figurines representing the Mother Goddess have been discovered at Kalibangan.\n3. Rows of brick-lined fire altars have been uncovered, suggesting communal fire rituals or sacrificial practices.\nWhich of the statements given above are correct?',
        options: [
          '1 and 2 only',
          '2 and 3 only',
          '1 and 3 only',
          '1, 2 and 3'
        ],
        correctOption: 'D',
        explanations: [
          'Correct: Furrow marks with dual cropping (chana and sarson) were excavated in pre-Harappan levels at Kalibangan.',
          'Correct: Mother Goddess figurines, so widespread in Sindh and Punjab sites, are conspicuous by their absence at Kalibangan and Lothal.',
          'Correct: Seven fire altars were found on elevated mud-brick platforms at Kalibangan with ash, charcoal, and animal bones.'
        ],
        concept: 'Distinctive religious and agricultural markers of Kalibangan.',
        trap: 'Students often assume Mother Goddess was universal across all IVC sites.',
        eliminationTactic: 'All 3 statements are authoritative NCERT and ASI textbook facts. Statement 1 is globally famous; Statement 3 is well documented.',
        mnemonic: 'K-F-P-N: Kalibangan = Fire altars, Ploughed field, No mother goddess.',
        difficulty: 'Moderate',
        cognitiveSkill: 'Analytical'
      }
    ],
    revisionSummary: {
      microNotes: 'Kalibangan (Hanumangarh, Ghaggar, A. Ghosh / B.B. Lal / B.K. Thapar): Ploughed field, 7 fire altars, sun-dried bricks (Deen-Heen basti), camel bones, cranial surgery, NO mother goddess. Ganeshwar (Neem Ka Thana, Kantli, R.C. Agrawal): Copper culture mother, 99% pure copper tools. Ahar (Udaipur): Dhulkot, Banasian bull, copper smelting.',
      comparisonTable: [
        { parameter: 'Civilization Type', upscCore: 'Mature Harappan urban trade civilization', rajasthanLayer: 'Kalibangan = Harappan; Ganeshwar = Chalcolithic copper supplier' },
        { parameter: 'Agricultural Evidence', upscCore: 'Granaries at Harappa, Mohenjo-Daro', rajasthanLayer: 'Kalibangan = Earliest criss-cross ploughed field in the world' },
        { parameter: 'Religious Expression', upscCore: 'Pashupati Seal, Great Bath, Mother Goddess', rajasthanLayer: 'Kalibangan = Fire altars, absent mother goddess' }
      ],
      memoryAid: 'Kali = Khet (ploughed field) + Kund (fire altar) + Kangan (bangles).'
    },
    spacedRevisionSchedule: {
      day1: 'Recall the 5 major ancient sites of Rajasthan (Kalibangan, Ahar, Ganeshwar, Balathal, Bairat) with excavators and rivers.',
      day3: 'Review the absence/presence of religious artifacts across Harappa, Mohenjo-Daro, and Kalibangan.',
      day7: 'Write a comparative table of Chalcolithic Ahar vs Bronze Age Kalibangan.',
      day15: 'Interleave with Ashoka\'s Bhabru edict and Mauryan monuments at Bairat.',
      day30: 'Timed ancient history sectional quiz.'
    }
  },
  {
    id: 'rajasthan-minerals-and-economic-survey',
    title: 'Minerals, Energy & Economic Survey of Rajasthan (GSDP & Critical Mines)',
    titleHindi: 'राजस्थान के खनिज, ऊर्जा एवं आर्थिक समीक्षा (जीएसडीपी व प्रमुख खदानें)',
    subject: 'Indian Economy & Rajasthan Economy',
    tags: ['COMMON', 'RPSC EXTRA', 'CURRENT', 'HIGH PRIORITY'],
    estimatedHours: 6,
    overlapPercentage: 55,
    syllabusLocation: 'UPSC CSE: GS Paper I (Economic Geography - Distribution of Key Natural Resources, Mineral Belts of India, Energy Sector); RPSC RAS Prelims: Unit 4 (Economy of Rajasthan - Major Minerals, Infrastructure, Energy Resources, Industrial Growth, Schemes).',
    whyMattersUPSC: 'UPSC tests critical and strategic minerals (Lithium, Rare Earth Elements, Zinc, Lead, Copper), National Mineral Policy, auction reforms (MMDR Amendment Acts), and renewable energy capacity targets (500 GW non-fossil by 2030, Bhadla Solar Park).',
    whyMattersRPSC: 'Rajasthan is called the "Museum of Minerals" (Ajaibghar of Minerals) producing 81 different minerals (57 commercially mined). RPSC sets multiple questions on: 100% monopoly minerals (Wollastonite, Jasper), Lead-Zinc-Silver mines (Zawar, Rampura Agucha, Rajpura Dariba), Petroleum blocks (Barmer-Sanchore basin), and latest Economic Survey GSDP growth rates.',
    coreConcept: 'Mineral endowment forms the backbone of secondary industry. Rajasthan holds near-total monopoly in minerals like Wollastonite, Jasper, and Selenite, and is the sole producer of Lead-Zinc ore and Silver in India. In renewable energy, Rajasthan possesses the highest solar insolation in India (~325 sunny days, ~142 GW potential) and houses Bhadla Solar Park (2,245 MW), the world\'s largest operational solar park.',
    importantFacts: [
      '[OFFICIAL FACT] Rajasthan produces 100% of India\'s Wollastonite and Jasper, and is the sole producer of Lead and Zinc concentrates and primary Silver.',
      '[OFFICIAL FACT] Rampura Agucha (Bhilwara) is the world\'s largest and richest open-pit zinc-lead deposit (mined by Hindustan Zinc Ltd).',
      '[OFFICIAL FACT] Zawar mines (Udaipur): Historical lead-zinc-silver mining since 6th century BCE; earliest zinc distillation retorts in world history.',
      '[OFFICIAL FACT] Petroleum: Rajasthan produces ~20-22% of India\'s domestic crude oil (second only to Bombay High); Barmer-Sanchore basin fields: Mangala, Bhagyam, Aishwarya, Saraswati, Raageshwari.',
      '[OFFICIAL FACT] HPCL Rajasthan Refinery Ltd (HRRL): 9 MMTPA capacity petroleum refinery-cum-petrochemical complex at Pachpadra (Balotra district); joint venture 74:26 between HPCL and Government of Rajasthan.',
      '[OFFICIAL FACT] Bhadla Solar Park (Phalodi district, formerly Jodhpur): ~2,245 MW capacity spread over ~14,000 acres.'
    ],
    upscRpscOverlap: 'Common Core (55%): National Mineral Exploration Trust (NMET), Critical Minerals Mission (30 critical minerals), Solar Energy Corporation of India (SECI), PM-KUSUM scheme, Discoms reforms (UDAY / Revamped Distribution Sector Scheme). Rajasthan Layer (45%): Exact mine-to-mineral matching (Degana-Tungsten, Mandoki Pal-Fluorite, Jhamarkotra-Rock Phosphate, Chauth Ka Barwara-Lead Zinc), Pachpadra refinery equity ratio, state GSDP sectoral composition.',
    rajasthanSpecificAdditions: [
      'Monopoly Minerals of Rajasthan: Wollastonite, Jasper, Selenite (~100%); Calcite, Gypsum (~95-99%); Lead & Zinc (~100%).',
      'Rock Phosphate: Jhamarkotra (Udaipur) - largest reserve in India, Birmania (Jaisalmer).',
      'Tungsten: Degana (Nagaur - Bhakar hill) and Balda (Sirohi).',
      'Copper: Khetri belt (Jhunjhunu - Madhan Kudan, Kolihan), Kho-Dariba (Alwar), Delwara-Kerovli (Udaipur).',
      'Lithium discovery: Significant lithium reserves identified in Degana (Nagaur), similar to Reasi (J&K).',
      'Rajasthan Economic Survey Indicators: Sectoral share in GSVA at current prices: Agriculture (~27%), Industry (~27%), Services (~45%).'
    ],
    commonMisconceptionsAndTraps: [
      'TRAP 1: Assuming Rajasthan is the largest producer of petroleum in India. Reality: Rajasthan is second (onshore #1 with ~20%), but Bombay High (offshore) remains overall #1.',
      'TRAP 2: Believing HRRL Pachpadra equity is 50:50. Reality: Equity participation is 74% HPCL and 26% Government of Rajasthan.',
      'TRAP 3: Confusing Degana with Copper. Reality: Degana (Nagaur) is India\'s prime Tungsten deposit; Khetri is Copper.'
    ],
    pyqLinkage: [
      {
        exam: 'UPSC CSE Prelims',
        year: 2021,
        questionBrief: 'With reference to the management of minor minerals in India, consider whether State Governments have powers to grant mining leases and make rules for minor minerals.',
        takeaway: 'UPSC tests Section 15 of MMDR Act 1957 (State Government holds regulatory authority over minor minerals).',
        correctAnswer: 'State governments possess the power to make rules for minor minerals.'
      },
      {
        exam: 'RPSC RAS Prelims',
        year: 2021,
        questionBrief: 'Match List-I (Mines) with List-II (Minerals): (A) Rampura-Agucha (B) Jhamarkotra (C) Degana (D) Khetri.',
        takeaway: 'Standard 4-pair matching question frequently repeated in RAS.',
        correctAnswer: 'A-Lead/Zinc, B-Rock Phosphate, C-Tungsten, D-Copper.'
      }
    ],
    practiceQuestions: [
      {
        id: 'pq-econ-01',
        examType: 'RPSC',
        subject: 'Rajasthan Economy',
        topicId: 'rajasthan-minerals-and-economic-survey',
        text: 'Which mineral deposit in Rajasthan holds the sole domestic monopoly in India, with Rampura-Agucha and Zawar being its world-renowned mining hubs?',
        options: [
          'Bauxite and Monazite',
          'Lead and Zinc',
          'Iron ore (Magnetite)',
          'Chromite and Platinum',
          'Question not attempted'
        ],
        correctOption: 'B',
        explanations: [
          'Incorrect: Bauxite is prominent in Odisha; Monazite in Kerala coastal sands.',
          'Correct: Rajasthan produces almost 100% of India\'s Lead and Zinc concentrates, with Rampura Agucha (Bhilwara) and Zawar (Udaipur) being key centers.',
          'Incorrect: Major iron ore reserves are in Odisha, Chhattisgarh, Karnataka, and Jharkhand.',
          'Incorrect: Chromite is concentrated in Sukinda, Odisha.',
          'Option E: Use only if omitting.'
        ],
        concept: 'Mineral monopoly and spatial distribution in Rajasthan.',
        trap: 'Confusing Lead-Zinc with Copper or Rock Phosphate.',
        eliminationTactic: 'Rampura Agucha is globally synonymous with Hindustan Zinc Limited and Zinc-Lead.',
        mnemonic: 'Rampura-Agucha = Absolute Zinc Champion.',
        difficulty: 'Easy',
        cognitiveSkill: 'Factual'
      }
    ],
    revisionSummary: {
      microNotes: 'Monopolies: Wollastonite, Jasper, Selenite (100%), Lead-Zinc (100%), Gypsum (95%+). Mines: Rampura Agucha (Bhilwara - Zinc), Zawar (Udaipur - Zinc/Silver), Jhamarkotra (Udaipur - Rock Phosphate), Degana (Nagaur - Tungsten), Khetri (Jhunjhunu - Copper), Pachpadra (Balotra - 9 MMTPA Refinery HPCL:GoR 74:26). Solar: Bhadla 2245 MW.',
      comparisonTable: [
        { parameter: 'Mineral Regulatory Authority', upscCore: 'Major minerals regulated by Union (MMDR Act); Minor minerals by States (Sec 15)', rajasthanLayer: 'DMGR (Directorate of Mines & Geology, Udaipur) administers state leases' },
        { parameter: 'Crude Oil Share', upscCore: 'India imports ~85% of crude oil; ONGC Bombay High is offshore leader', rajasthanLayer: 'Rajasthan produces ~20-22% of domestic crude (Onshore #1, Barmer Basin)' },
        { parameter: 'Renewable Flagship', upscCore: 'National Solar Mission (500 GW non-fossil target by 2030)', rajasthanLayer: 'Bhadla Solar Park (Phalodi/Jodhpur, 2245 MW) - World\'s largest' }
      ],
      memoryAid: 'M-B-A in Barmer: Mangala, Bhagyam, Aishwarya (Oil fields).'
    },
    spacedRevisionSchedule: {
      day1: 'Commit to memory: Lead-Zinc (Rampura-Agucha, Zawar), Rock Phosphate (Jhamarkotra), Tungsten (Degana).',
      day3: 'Review Barmer-Sanchore basin oilfields and Pachpadra 74:26 equity.',
      day7: 'Solve 10 mineral and energy questions from past 5 years of RPSC RAS papers.',
      day15: 'Interleave with Rajasthan GSDP sectoral composition and renewable energy policy.',
      day30: 'Comprehensive economic survey review.'
    }
  }
];

export const OFFICIAL_SOURCES_DIRECTORY = [
  {
    name: 'Union Public Service Commission (UPSC)',
    url: 'https://upsc.gov.in',
    description: 'Official notifications, CSE Prelims question papers, answer keys, annual reports.',
    category: 'Union'
  },
  {
    name: 'Rajasthan Public Service Commission (RPSC)',
    url: 'https://rpsc.rajasthan.gov.in',
    description: 'Official notifications, RAS/RTS Prelims scheme, syllabus, model answer keys, OMR rules.',
    category: 'Rajasthan'
  },
  {
    name: 'Press Information Bureau (PIB)',
    url: 'https://pib.gov.in',
    description: 'Union Government policy announcements, cabinet decisions, Ministry releases.',
    category: 'National'
  },
  {
    name: 'DIPR Rajasthan (Sujas & Bulletin)',
    url: 'https://dipr.rajasthan.gov.in',
    description: 'Rajasthan Government schemes, Sujas monthly magazine, Chief Minister announcements.',
    category: 'Rajasthan'
  },
  {
    name: 'PRS Legislative Research',
    url: 'https://prsindia.org',
    description: 'Unbiased parliamentary bill tracking, legislative analysis, state budget summaries.',
    category: 'National'
  },
  {
    name: 'Directorate of Economics & Statistics, Rajasthan',
    url: 'https://statistics.rajasthan.gov.in',
    description: 'Official Rajasthan Economic Review (Aarthik Sameeksha) and Budget documents.',
    category: 'Rajasthan'
  }
];
