import { PracticeQuestion } from '../types';

export const COMPREHENSIVE_QUESTIONS_BANK: PracticeQuestion[] = [
  {
    id: 'q-upsc-01',
    examType: 'UPSC',
    subject: 'Indian Polity',
    topicId: 'panchayati-raj-local-gov',
    text: 'Consider the following statements regarding the 73rd Constitutional Amendment Act, 1992:\n1. It added Part IX to the Constitution of India entitled "The Panchayats".\n2. It makes it mandatory for all States to provide reservation of seats for Other Backward Classes (OBCs) in every Panchayat.\n3. The superintendence, direction, and control of the preparation of electoral rolls for, and the conduct of, all elections to the Panchayats are vested in the Election Commission of India under Article 324.\nWhich of the statements given above is/are correct?',
    options: [
      '1 only',
      '1 and 2 only',
      '2 and 3 only',
      '1, 2 and 3'
    ],
    correctOption: 'A',
    explanations: [
      'Statement 1 is correct: 73rd CAA added Part IX (Articles 243 to 243O) and 11th Schedule.',
      'Statement 2 is incorrect: Article 243D(6) makes reservation for OBCs a DISCRETIONARY (voluntary) provision, left to the discretion of the State Legislature, whereas reservation for SCs, STs, and women is mandatory.',
      'Statement 3 is incorrect: PRI elections are conducted by the State Election Commission under Article 243K, NOT the Election Commission of India under Article 324.'
    ],
    concept: 'Mandatory vs Voluntary provisions under 73rd CAA and Article 243K State Election Commission.',
    trap: 'Examiner tests if you confuse the Election Commission of India (Art 324) with State Election Commission (Art 243K), and mandatory vs voluntary provisions for OBCs.',
    eliminationTactic: 'Statement 3 is an instant red flag—PRI elections are NEVER managed by the ECI. Strike out (C) and (D). Statement 2 asserts OBC reservation is mandatory, which is false. (B) eliminated. Answer is (A).',
    mnemonic: 'ECI = Parliament & Assemblies; SEC = Panchayats & Municipalities.',
    difficulty: 'Moderate',
    cognitiveSkill: 'Elimination'
  },
  {
    id: 'q-rpsc-01',
    examType: 'RPSC',
    subject: 'Rajasthan Administration',
    topicId: 'governor-and-state-executive',
    text: 'Who among the following was the first Governor of the State of Rajasthan after the post of Rajpramukh was abolished on 1 November 1956?',
    options: [
      'Dr. Sampurnanand',
      'Sardar Gurmukh Nihal Singh',
      'Hukum Singh',
      'Jogendra Singh',
      'Question not attempted'
    ],
    correctOption: 'B',
    explanations: [
      'Incorrect: Dr. Sampurnanand was the 2nd Governor (1962–1967).',
      'Correct: Sardar Gurmukh Nihal Singh assumed office on 1 November 1956 and served until 15 April 1962, making him the 1st Governor of Rajasthan.',
      'Incorrect: Sardar Hukam Singh served later (1967–1972) after being Lok Sabha Speaker.',
      'Incorrect: Sardar Jogendra Singh served as Governor from 1972 to 1977.',
      'Option E: In RPSC RAS, bubble E must be darkened if question is not attempted to avoid 1/3rd penalty.'
    ],
    concept: 'Constitutional transition from Rajpramukh to Governor under the States Reorganisation Act, 1956.',
    trap: 'Confusing Dr. Sampurnanand (2nd Governor, during whose tenure first President Rule was imposed in Rajasthan in 1967) with the 1st Governor.',
    eliminationTactic: 'Recall that Gurmukh Nihal Singh was appointed right upon the 7th Constitutional Amendment in 1956.',
    mnemonic: 'First in Fifty-Six: Gurmukh Nihal Singh.',
    difficulty: 'Easy',
    cognitiveSkill: 'Factual'
  },
  {
    id: 'q-upsc-02',
    examType: 'UPSC',
    subject: 'Environment & Ecology',
    topicId: 'rajasthan-physiography-and-drainage',
    text: 'Consider the following wetlands of India:\n1. Keoladeo Ghana National Park\n2. Loktak Lake\n3. Chilika Lake\n4. Sambhar Lake\nWhich of the above are currently included in the Montreux Record under the Ramsar Convention?',
    options: [
      '1 and 2 only',
      '1, 2 and 4 only',
      '2 and 3 only',
      '1, 2, 3 and 4'
    ],
    correctOption: 'A',
    explanations: [
      'Keoladeo Ghana National Park (Rajasthan) and Loktak Lake (Manipur) are the ONLY TWO Indian wetlands currently listed in the Montreux Record.',
      'Chilika Lake (Odisha) was placed on the Montreux Record in 1993 but was successfully removed in 2002 after ecological restoration.',
      'Sambhar Lake (Rajasthan) is a Ramsar site (designated 1990) but has NEVER been put on the Montreux Record.'
    ],
    concept: 'Montreux Record under the Ramsar Convention (wetlands where changes in ecological character have occurred, are occurring, or are likely to occur).',
    trap: 'Assuming all major Ramsar sites in Rajasthan or famous lakes (Chilika, Sambhar) are on the Montreux Record.',
    eliminationTactic: 'India has ONLY TWO sites on the Montreux Record: Keoladeo (Rajasthan) and Loktak (Manipur). Chilika was removed with pride. Sambhar was never on it. Eliminate 3 and 4.',
    mnemonic: 'Montreux = KL (Keoladeo & Loktak only).',
    difficulty: 'Difficult',
    cognitiveSkill: 'Analytical'
  },
  {
    id: 'q-rpsc-02',
    examType: 'RPSC',
    subject: 'Rajasthan Geography',
    topicId: 'rajasthan-physiography-and-drainage',
    text: 'In which district of Rajasthan is the famous "Zawar" mining area located, renowned since medieval times for Lead, Zinc, and Silver production?',
    options: [
      'Bhilwara',
      'Udaipur',
      'Rajsamand',
      'Sirohi',
      'Question not attempted'
    ],
    correctOption: 'B',
    explanations: [
      'Incorrect: Bhilwara houses Rampura Agucha.',
      'Correct: Zawar mines are located approximately 40 km south of Udaipur city in Udaipur district.',
      'Incorrect: Rajsamand houses Rajpura-Dariba mines.',
      'Incorrect: Sirohi houses tungsten deposits at Balda.',
      'Option E: Darken if not answering.'
    ],
    concept: 'Spatial distribution of non-ferrous polymetallic deposits in Southern Rajasthan.',
    trap: 'Confusing Zawar (Udaipur) with Rampura Agucha (Bhilwara) or Rajpura Dariba (Rajsamand).',
    eliminationTactic: 'Maharana Lakha\'s reign (14th century) witnessed the discovery of Silver/Zinc at Zawar in Mewar (Udaipur).',
    mnemonic: 'Z-U: Zawar in Udaipur; R-A-B: Rampura Agucha in Bhilwara.',
    difficulty: 'Easy',
    cognitiveSkill: 'Factual'
  },
  {
    id: 'q-upsc-03',
    examType: 'UPSC',
    subject: 'Ancient Indian History',
    topicId: 'ancient-civilizations-kalibangan-ganeshwar',
    text: 'Which of the following archaeological sites provides the earliest direct stratigraphic evidence of a ploughed agricultural field with criss-cross furrow patterns?',
    options: [
      'Harappa (Punjab)',
      'Kalibangan (Rajasthan)',
      'Banawali (Haryana)',
      'Dholavira (Gujarat)'
    ],
    correctOption: 'B',
    explanations: [
      'Incorrect: Harappa showed evidence of granaries, not a ploughed field.',
      'Correct: Kalibangan in Rajasthan revealed a pre-Harappan ploughed field with intersecting furrows indicating dual cropping (mustard and chickpea).',
      'Incorrect: Banawali yielded terracotta models of a plough, but NOT the actual ploughed field.',
      'Incorrect: Dholavira is celebrated for its unique water reservoirs and stone architecture.'
    ],
    concept: 'Agricultural archaeology of the Indus Valley Civilization.',
    trap: 'Confusing Banawali (terracotta plough toy) with Kalibangan (actual furrowed ploughed field).',
    eliminationTactic: 'Recall the specific distinction: Toy plough = Banawali; Real ploughed soil with furrows = Kalibangan.',
    mnemonic: 'K-K: Kalibangan = Khet (Field); B-B: Banawali = Banavti Hal (Toy Plough).',
    difficulty: 'Moderate',
    cognitiveSkill: 'Elimination'
  },
  {
    id: 'q-rpsc-03',
    examType: 'RPSC',
    subject: 'Rajasthan History & Heritage',
    topicId: 'ancient-civilizations-kalibangan-ganeshwar',
    text: 'Ganeshwar archaeological site, known as the "Mother of Copper Civilizations" (Tamrayugeen Sabhyataon ki Janani), is situated on the bank of which river?',
    options: [
      'Ghaggar',
      'Kantli',
      'Banas',
      'Luni',
      'Question not attempted'
    ],
    correctOption: 'B',
    explanations: [
      'Incorrect: Kalibangan is on Ghaggar river.',
      'Correct: Ganeshwar is located at Neem Ka Thana on the bank of the seasonal inland Kantli river.',
      'Incorrect: Ahar and Gilund are in the Banas river basin.',
      'Incorrect: Tilwara is on the Luni river basin.',
      'Option E: Darken if not attempted.'
    ],
    concept: 'Inland river associations of Chalcolithic Rajasthan sites.',
    trap: 'Confusing Kantli with Ghaggar or Banas.',
    eliminationTactic: 'Ganeshwar lies in the Shekhawati / Neem Ka Thana hills through which the Kantli river flows.',
    mnemonic: 'G-K: Ganeshwar on Kantli river.',
    difficulty: 'Easy',
    cognitiveSkill: 'Factual'
  },
  {
    id: 'q-mixed-01',
    examType: 'MIXED',
    subject: 'Indian Economy & Energy',
    topicId: 'rajasthan-minerals-and-economic-survey',
    text: 'With reference to India\'s renewable energy landscape and Rajasthan\'s contribution, consider the following statements:\n1. Bhadla Solar Park, located in Rajasthan, is one of the world\'s largest operational solar installations by generation capacity.\n2. The PM-KUSUM scheme Component-A provides for setting up of decentralized ground-mounted grid-connected renewable power plants on farmers\' barren lands.\n3. Under the Indian Constitution, electricity is an item in the State List (List II) of the Seventh Schedule.\nWhich of the statements given above are correct?',
    options: [
      '1 and 2 only',
      '2 and 3 only',
      '1 and 3 only',
      '1, 2 and 3'
    ],
    correctOption: 'A',
    explanations: [
      'Statement 1 is correct: Bhadla Solar Park in Phalodi district of Rajasthan boasts a total capacity of ~2,245 MW.',
      'Statement 2 is correct: PM-KUSUM Component A promotes setting up of solar/renewable plants (500 kW to 2 MW) on barren/fallow land.',
      'Statement 3 is incorrect: Electricity is placed in the CONCURRENT LIST (List III, Entry 38) of the Seventh Schedule, allowing both Parliament and State Legislatures to legislate.'
    ],
    concept: 'Constitutional division of legislative subjects (7th Schedule) and renewable energy schemes.',
    trap: 'Statement 3 claims electricity is in the State List; it is in the Concurrent List.',
    eliminationTactic: 'Electricity is famously a Concurrent item (Entry 38). When statement 3 is eliminated, (B), (C), and (D) fall away together. Answer is (A).',
    mnemonic: 'Current is Concurrent: Electricity is on the Concurrent List.',
    difficulty: 'Moderate',
    cognitiveSkill: 'Analytical'
  }
];
