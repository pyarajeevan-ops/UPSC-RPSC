import { SyllabusTopicItem } from './completeSyllabusData';

export interface TopicQuizQuestion {
  id: string;
  examType: 'UPSC' | 'RPSC';
  questionText: string;
  options: Array<{ letter: 'A' | 'B' | 'C' | 'D' | 'E'; text: string }>;
  correctLetter: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  eliminationTip: string;
}

export interface TopicFlashcard {
  id: string;
  front: string;
  back: string;
  category: 'Article' | 'Fact' | 'Case Law' | 'Trap';
  mnemonic?: string;
}

// Generates topic-specific interactive quizzes based on the topic code and contents
export function getInteractiveQuizForTopic(topic: SyllabusTopicItem): TopicQuizQuestion[] {
  // If Panchayati Raj
  if (topic.id.includes('panchayat') || topic.code.includes('POL-02')) {
    return [
      {
        id: 'quiz-pr-1',
        examType: 'UPSC',
        questionText: 'Under the 73rd Constitutional Amendment Act, 1992, which of the following provisions is DISCRETIONARY (left to the discretion of the State Legislature)?',
        options: [
          { letter: 'A', text: 'Reservation of not less than 1/3rd of total seats for women across all tiers' },
          { letter: 'B', text: 'Reservation of seats and offices of chairpersons for Backward Classes (OBCs)' },
          { letter: 'C', text: 'Constitution of a State Finance Commission every 5 years' },
          { letter: 'D', text: 'Vesting election superintendence in a State Election Commission' }
        ],
        correctLetter: 'B',
        explanation: 'Article 243D(6) leaves reservation of seats or offices of chairpersons for backward classes of citizens to the discretion of the state legislature. Reservations for SC/ST and Women (minimum 1/3rd) are mandatory constitutional provisions.',
        eliminationTip: 'Eliminate options A, C, and D immediately as they are Part IX core mandatory provisions enforceable across all states.'
      },
      {
        id: 'quiz-pr-2',
        examType: 'RPSC',
        questionText: 'In Rajasthan, which Constitutional Amendment Act provided 50% reservation for women in Panchayati Raj Institutions, and when did modern Panchayati Raj first inaugurate in the state?',
        options: [
          { letter: 'A', text: 'Rajasthan Panchayati Raj (Amendment) Act 2008; Inaugurated 2 October 1959 at Nagaur' },
          { letter: 'B', text: '73rd CAA 1992; Inaugurated 15 August 1947 at Jaipur' },
          { letter: 'C', text: 'Rajasthan Tenancy Act 1955; Inaugurated 26 January 1950 at Jodhpur' },
          { letter: 'D', text: '74th CAA 1993; Inaugurated 1 November 1956 at Ajmer' },
          { letter: 'E', text: 'Question Not Attempted (Mandatory 5th Option)' }
        ],
        correctLetter: 'A',
        explanation: 'Prime Minister Jawaharlal Nehru inaugurated modern India’s first 3-tier Panchayati Raj on 2 October 1959 at Bagadari village in Nagaur, Rajasthan. Rajasthan subsequently expanded women’s reservation from 33% to 50% via the Rajasthan Panchayati Raj (Amendment) Act, 2008.',
        eliminationTip: 'Rajasthan was the first state in India to launch PRIs (Nagaur, 1959), followed second by Andhra Pradesh in 1959.'
      },
      {
        id: 'quiz-pr-3',
        examType: 'UPSC',
        questionText: 'With reference to the State Election Commissioner (SEC) under Article 243K, consider the following statements:\n1. The SEC is appointed by the Governor of the state.\n2. The SEC can be removed from office by the Governor upon the recommendation of the State Cabinet.\nWhich of the statements given above is/are correct?',
        options: [
          { letter: 'A', text: '1 only' },
          { letter: 'B', text: '2 only' },
          { letter: 'C', text: 'Both 1 and 2' },
          { letter: 'D', text: 'Neither 1 nor 2' }
        ],
        correctLetter: 'A',
        explanation: 'Article 243K(1) states the SEC is appointed by the Governor. However, under Article 243K(2), the SEC can ONLY be removed in like manner and on like grounds as a Judge of a High Court (i.e. by the President of India after parliamentary address), NOT by the Governor or State Cabinet.',
        eliminationTip: 'Classic examiner trap: Appointing authority is the Governor, but the removal authority is strictly identical to a High Court Judge.'
      }
    ];
  }

  // If Rajasthan History / Forts / Dynasties
  if (topic.id.includes('dynast') || topic.id.includes('fort') || topic.code.includes('RAJ-01')) {
    return [
      {
        id: 'quiz-rh-1',
        examType: 'RPSC',
        questionText: 'Which six hill forts of Rajasthan were inscribed on the UNESCO World Heritage List in 2013?',
        options: [
          { letter: 'A', text: 'Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer, and Jaisalmer' },
          { letter: 'B', text: 'Mehrangarh, Taragarh, Junagarh, Amer, Nahargarh, and Jaigarh' },
          { letter: 'C', text: 'Chittorgarh, Mehrangarh, Bhatner, Gagron, Lohagarh, and Amer' },
          { letter: 'D', text: 'Kumbhalgarh, Ranthambore, Achalgarh, Siwana, Jalore, and Amer' },
          { letter: 'E', text: 'Question Not Attempted (Mandatory 5th Option)' }
        ],
        correctLetter: 'A',
        explanation: 'At the 37th session of the World Heritage Committee in Phnom Penh (2013), six hill forts of Rajasthan were inscribed: Chittorgarh, Kumbhalgarh (Rajsamand), Ranthambore (Sawai Madhopur), Gagron (Jhalawar), Amer (Jaipur), and Jaisalmer. Mehrangarh and Junagarh are NOT on the UNESCO list.',
        eliminationTip: 'Remember mnemonic: "Chick-A-R-G-K-J" (Chittor, Amer, Ranthambore, Gagron, Kumbhalgarh, Jaisalmer).'
      },
      {
        id: 'quiz-rh-2',
        examType: 'RPSC',
        questionText: 'Gagron Fort in Jhalawar is an exemplary specimen of which category of traditional Indian fort architecture?',
        options: [
          { letter: 'A', text: 'Dhanvan Durg (Desert Fort)' },
          { letter: 'B', text: 'Audak Durg / Jal Durg (Water Fort)' },
          { letter: 'C', text: 'Vana Durg (Forest Fort)' },
          { letter: 'D', text: 'Airan Durg (Impassable Fort)' },
          { letter: 'E', text: 'Question Not Attempted (Mandatory 5th Option)' }
        ],
        correctLetter: 'B',
        explanation: 'Gagron Fort is surrounded on three sides by the confluence of the Ahu and Kali Sindh rivers without any foundation rock, making it the finest Jal Durg (Audak Durg) in Rajasthan.',
        eliminationTip: 'Desert fort is Jaisalmer; Water fort is Gagron; Forest fort is Ranthambore.'
      }
    ];
  }

  // If Rajasthan Geography / Aravalli / Drainage
  if (topic.id.includes('geo') || topic.code.includes('RAJ-02') || topic.id.includes('drainage')) {
    return [
      {
        id: 'quiz-rg-1',
        examType: 'RPSC',
        questionText: 'Which of the following is the correct descending order of Aravalli peaks by elevation?',
        options: [
          { letter: 'A', text: 'Guru Shikhar (1722m) > Ser (1597m) > Dilwara (1442m) > Jarga (1431m) > Achalgarh (1380m)' },
          { letter: 'B', text: 'Guru Shikhar > Jarga > Ser > Achalgarh > Dilwara' },
          { letter: 'C', text: 'Ser > Guru Shikhar > Dilwara > Kumbhalgarh > Raghunathgarh' },
          { letter: 'D', text: 'Guru Shikhar > Achalgarh > Ser > Jarga > Dilwara' },
          { letter: 'E', text: 'Question Not Attempted (Mandatory 5th Option)' }
        ],
        correctLetter: 'A',
        explanation: 'The official elevation order verified by RPSC: Guru Shikhar (1722m, Sirohi), Ser (1597m, Sirohi), Dilwara (1442m, Sirohi), Jarga (1431m, Udaipur), Achalgarh (1380m, Sirohi).',
        eliminationTip: 'Mnemonic: "Guru Se Dil Jaga Acha" (Guru Shikhar, Ser, Dilwara, Jarga, Achalgarh).'
      },
      {
        id: 'quiz-rg-2',
        examType: 'RPSC',
        questionText: 'Which river in Rajasthan is known as "Kamdhenu" and "Charmanvati", and is the only perennial river of the state flowing through a gorge into MP?',
        options: [
          { letter: 'A', text: 'Banas River' },
          { letter: 'B', text: 'Luni River' },
          { letter: 'C', text: 'Chambal River' },
          { letter: 'D', text: 'Mahi River' },
          { letter: 'E', text: 'Question Not Attempted (Mandatory 5th Option)' }
        ],
        correctLetter: 'C',
        explanation: 'Chambal originates from Janapav hills near Mhow in the Vindhyas (MP), enters Rajasthan at Chaurasigarh (Chittorgarh), forms the inter-state boundary with MP, and is known historically as Charmanvati and Kamdhenu.',
        eliminationTip: 'Luni is saline after Balotra; Banas is the longest river flowing entirely within Rajasthan; Chambal is the perennial inter-state river.'
      }
    ];
  }

  // Default universal high-yield questions
  return [
    {
      id: `quiz-gen-${topic.id}-1`,
      examType: topic.overlapCategory === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'UPSC',
      questionText: `With reference to ${topic.title}, which of the following statements represents the core principle emphasized in civil services examinations?`,
      options: [
        { letter: 'A', text: `It forms an essential element of ${topic.stage} syllabus evaluated through constitutional and administrative benchmarks.` },
        { letter: 'B', text: 'It was completely abolished by the 44th Constitutional Amendment Act.' },
        { letter: 'C', text: 'It requires approval only from local district courts without legislative backing.' },
        { letter: 'D', text: 'It is strictly limited to union territories with zero state applicability.' }
      ],
      correctLetter: 'A',
      explanation: `Topic ${topic.code} (${topic.title}) is tested for ${topic.stage} with weightage: ${topic.weightage}. Official description: ${topic.officialDescription}`,
      eliminationTip: 'Eliminate extreme generalizations like "completely abolished" or "requires approval only from district courts".'
    },
    {
      id: `quiz-gen-${topic.id}-2`,
      examType: 'UPSC',
      questionText: `Which examiner trap must candidates actively guard against when solving questions on "${topic.title}"?`,
      options: [
        { letter: 'A', text: topic.examinerTraps[0] || 'Confusing constitutional mandate with statutory discretion' },
        { letter: 'B', text: 'Assuming all questions carry zero negative marking in civil services prelims' },
        { letter: 'C', text: 'Believing the President of India cannot issue any regulations' },
        { letter: 'D', text: 'Assuming the Constitution of India has only 5 articles in total' }
      ],
      correctLetter: 'A',
      explanation: `Key trap identified for this syllabus unit: ${topic.examinerTraps[0] || 'Differentiating between mandatory constitutional clauses and discretionary state guidelines.'}`,
      eliminationTip: 'Focus on the explicit trap highlighted in the syllabus autopsy.'
    }
  ];
}

// Generates active recall flashcards for any topic
export function getFlashcardsForTopic(topic: SyllabusTopicItem): TopicFlashcard[] {
  const cards: TopicFlashcard[] = [];

  // Card 1: Official Scope Anchor
  cards.push({
    id: `fc-${topic.id}-1`,
    category: 'Article',
    front: `What is the exact scope and weightage of ${topic.code}?`,
    back: `${topic.title}: ${topic.weightage}. Official Scope: ${topic.officialDescription}`,
    mnemonic: `${topic.overlapCategory.replace('_', ' ')} (${topic.overlapPercentage}% overlap)`
  });

  // Card 2: Traps
  if (topic.examinerTraps && topic.examinerTraps.length > 0) {
    cards.push({
      id: `fc-${topic.id}-2`,
      category: 'Trap',
      front: `What is the primary examiner trap in ${topic.title}?`,
      back: topic.examinerTraps[0],
      mnemonic: 'Beware of inverted stems & extreme qualifiers ("only", "all")'
    });
  }

  // Card 3: Key Subtopic Points
  if (topic.subtopics && topic.subtopics.length > 0) {
    const firstSub = topic.subtopics[0];
    cards.push({
      id: `fc-${topic.id}-3`,
      category: 'Fact',
      front: `Key facts for sub-module: ${firstSub.name}?`,
      back: firstSub.keyPoints.slice(0, 3).join(' • ') || firstSub.details,
      mnemonic: firstSub.pyqExamples ? firstSub.pyqExamples[0] : undefined
    });
  }

  // Card 4: Standard Textbook Reference
  if (topic.mustReadSources && topic.mustReadSources.length > 0) {
    cards.push({
      id: `fc-${topic.id}-4`,
      category: 'Case Law',
      front: `Must-read standard textbook & chapters for ${topic.title}?`,
      back: topic.mustReadSources.join(', '),
      mnemonic: 'One Book, Ten Revisions rule'
    });
  }

  return cards;
}
