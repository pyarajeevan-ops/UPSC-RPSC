import {
  ExtractedNote,
  CurriculumCategory,
  HistoryEntry,
  HistoryActivityType,
  UniversalBookmark,
  BookmarkCategory
} from '../types';

const NOTES_STORAGE_KEY = 'margdarshak_offline_extracted_notes_v1';
const HISTORY_STORAGE_KEY = 'margdarshak_offline_history_logs_v1';
const BOOKMARKS_STORAGE_KEY = 'margdarshak_universal_bookmarks_v1';

// Seed sample notes extracted from the curriculum compendium
export const SEED_OFFLINE_NOTES: ExtractedNote[] = [
  {
    id: 'note-sample-01',
    title: 'Indus Valley Civilisation: Core Architecture & Artifacts',
    sourceDocName: 'Compendium_Ancient_History.pdf',
    category: 'Ancient History',
    targetExam: 'COMMON_CORE',
    pageNumber: 2,
    bulletPoints: [
      'Grid system town planning with burnt bricks and underground covered drainage.',
      'Citadel (upper part) and Lower Town division across major settlements.',
      'Absence of iron implements and standing weaponry indicates merchant-class governance.',
      'Great Bath and Great Granary at Mohenjodaro; Dockyard with tidal locks at Lothal.',
      'Boustrophedon script (bi-directional: right-to-left then left-to-right).'
    ],
    keyTerms: ['Boustrophedon', 'Citadel', 'Lothal Dockyard', 'Pashupati Seal', 'Steatite'],
    examAngles: [
      'Statement questions testing whether temples or iron implements existed (False for both).',
      'Matching port cities and archaeological discovery teams (Lothal - SR Rao; Kalibangan - BB Lal).'
    ],
    rawSnippet: 'Indus Valley Civilisation: initiation 2500-1750 BC. Burnt bricks, covered drainage, absence of iron. Great Bath at Mohenjodaro. Script written right to left then left to right.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    importance: 'HIGH'
  },
  {
    id: 'note-sample-02',
    title: '73rd Amendment Act & 3-Tier Panchayati Raj Structure',
    sourceDocName: 'Indian_Polity_Compendium.pdf',
    category: 'Indian Polity',
    targetExam: 'COMMON_CORE',
    pageNumber: 60,
    bulletPoints: [
      'Inserted Part IX (Articles 243 to 243O) and Eleventh Schedule containing 29 functional items.',
      'Three-tier architecture: Gram Panchayat (village), Panchayat Samiti (block), Zila Parishad (district).',
      'Mandatory 5-year tenure; re-election must be held within 6 months of premature dissolution.',
      'Elections conducted independently by the State Election Commission (Article 243K), NOT ECI.',
      'Mandatory reservation for SCs/STs and 1/3rd for women; OBC reservation is voluntary/discretionary.'
    ],
    keyTerms: ['Article 243K', 'Eleventh Schedule', 'Gram Sabha', 'Panchayat Samiti', 'Zila Parishad'],
    examAngles: [
      'Distinction between mandatory provisions (women reservation, SEC, 5-yr term) vs voluntary provisions (OBC reservation, taxation powers).',
      'Disqualification challenges under Article 243F.'
    ],
    rawSnippet: '73rd Amendment Act 1992 introduced three tier system: Gram Panchayat, Panchayat Samiti, Zila Parishad. State Election Commission conducts elections under 243K.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    importance: 'HIGH'
  },
  {
    id: 'note-sample-03',
    title: 'Total Internal Reflection (TIR) & Optical Applications',
    sourceDocName: 'General_Science_Physics.pdf',
    category: 'General Science',
    targetExam: 'COMMON_CORE',
    pageNumber: 81,
    bulletPoints: [
      'Light must travel from an optically denser medium into an optically rarer medium.',
      'The angle of incidence in the denser medium must exceed the critical angle.',
      '100% of light energy is reflected back into the denser medium with zero transmission loss.',
      'Core applications: Optical fiber telecommunications, medical endoscopy, cut diamond brilliance, desert mirages, inverted looming in polar zones.'
    ],
    keyTerms: ['Critical Angle', 'Optical Fiber', 'Endoscopy', 'Mirage', 'Snell\'s Law'],
    examAngles: [
      'Identify which phenomenon is NOT TIR (e.g. twinkling of stars is atmospheric refraction, NOT TIR).',
      'Why optical fibers preserve signal strength over intercontinental submarine cable lines.'
    ],
    rawSnippet: 'If light travels from denser to rarer medium and angle of incidence is more than critical angle, light reflects back. Sparkling of diamond, mirage, optical fiber work on TIR.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    importance: 'HIGH'
  }
];

// Seed sample initial history events
export const SEED_HISTORY_ENTRIES: HistoryEntry[] = [
  {
    id: 'hist-log-1',
    type: 'READ_CURRICULUM_BIT',
    title: 'Indus Valley Civilisation (IVC)',
    subtitle: 'Town Planning, Economy, Social & Religious Life',
    category: 'Ancient History',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    targetExam: 'DUAL',
    metadata: { topicId: 'hist-02', tags: ['Pashupati Seal', 'Boustrophedon'] }
  },
  {
    id: 'hist-log-2',
    type: 'READ_CURRICULUM_BIT',
    title: 'Directive Principles & Fundamental Duties',
    subtitle: 'Part IV (Articles 36–51) & Part IVA (Article 51A)',
    category: 'Indian Polity',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    targetExam: 'DUAL',
    metadata: { topicId: 'pol-03', tags: ['Article 44 UCC', 'Article 50'] }
  },
  {
    id: 'hist-log-3',
    type: 'ADDED_PDF_NOTE',
    title: '73rd Amendment Act & 3-Tier Panchayati Raj Structure',
    subtitle: 'Extracted from Indian_Polity_Compendium.pdf',
    category: 'Indian Polity',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    targetExam: 'DUAL',
    metadata: { sourceName: 'Indian_Polity_Compendium.pdf' }
  },
  {
    id: 'hist-log-4',
    type: 'SCHEDULED_CALENDAR',
    title: 'Spaced Revision for Indus Valley Civilisation',
    subtitle: 'Booked 5 review cycles (1d, 3d, 7d, 15d, 30d)',
    category: 'Ancient History',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    targetExam: 'DUAL'
  }
];

// Seed sample universal bookmarks
export const SEED_BOOKMARKS: UniversalBookmark[] = [
  {
    id: 'bm-01',
    itemType: 'CURRICULUM_BIT',
    itemId: 'hist-02',
    title: 'Indus Valley Civilisation: Boustrophedon Script & Pashupati Seal',
    contentSnippet: 'Grid system town planning, absence of iron, merchant rule, worship of Pashupati & Mother Goddess, Boustrophedon script. No temples existed.',
    category: 'History & Culture',
    targetExam: 'DUAL',
    subject: 'Ancient History',
    sourceTag: 'Curriculum Knowledge Vault',
    notes: 'Crucial for UPSC statement elimination: Harappans had no structural temples.',
    bookmarkedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'bm-02',
    itemType: 'CURRICULUM_BIT',
    itemId: 'pol-01',
    title: 'Preamble & 42nd Amendment: Socialist, Secular, Integrity',
    contentSnippet: 'Based on Nehru Objectives Resolution. 42nd Amendment 1976 added Socialist, Secular, and Integrity. Held amendable in Kesavananda Bharati.',
    category: 'Polity & Constitution',
    targetExam: 'DUAL',
    subject: 'Indian Polity',
    sourceTag: 'Curriculum Knowledge Vault',
    notes: 'Remember the order: SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC.',
    bookmarkedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'bm-03',
    itemType: 'EXTRACTED_NOTE',
    itemId: 'note-sample-02',
    title: '73rd CAA: Mandatory vs Voluntary Provisions',
    contentSnippet: 'Women reservation 1/3rd is mandatory; OBC reservation under Article 243D(6) is strictly voluntary for State Legislatures.',
    category: 'High-Yield Revision',
    targetExam: 'UPSC',
    subject: 'Indian Polity',
    sourceTag: 'Offline PDF Notes',
    notes: 'Frequently tested in both UPSC Prelims and RPSC RAS.',
    bookmarkedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// ---------------------------------------------------------------------------
// Offline Storage Helpers (Local-First, Zero Backend Dependency)
// ---------------------------------------------------------------------------

export const getOfflineNotes = (): ExtractedNote[] => {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(SEED_OFFLINE_NOTES));
      return SEED_OFFLINE_NOTES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading offline notes:', e);
    return SEED_OFFLINE_NOTES;
  }
};

export const saveOfflineNote = (note: ExtractedNote): void => {
  try {
    const existing = getOfflineNotes();
    const updated = [note, ...existing.filter((n) => n.id !== note.id)];
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));
    // Also record an activity entry in history!
    logHistoryActivity({
      type: 'ADDED_PDF_NOTE',
      title: note.title,
      subtitle: `Categorized under ${note.category} • from ${note.sourceDocName}`,
      category: note.category,
      targetExam: note.targetExam === 'RAJASTHAN_EXCLUSIVE' ? 'RPSC' : 'DUAL',
      metadata: { sourceName: note.sourceDocName, tags: note.keyTerms }
    });
  } catch (e) {
    console.error('Failed saving offline note:', e);
  }
};

export const deleteOfflineNote = (noteId: string): void => {
  try {
    const existing = getOfflineNotes();
    const updated = existing.filter((n) => n.id !== noteId);
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed deleting note:', e);
  }
};

// History Logging & Retrieval
export const getHistoryEntries = (): HistoryEntry[] => {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(SEED_HISTORY_ENTRIES));
      return SEED_HISTORY_ENTRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading history logs:', e);
    return SEED_HISTORY_ENTRIES;
  }
};

export const logHistoryActivity = (
  entry: Omit<HistoryEntry, 'id' | 'timestamp'>
): HistoryEntry => {
  try {
    const existing = getHistoryEntries();
    const newEntry: HistoryEntry = {
      ...entry,
      id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    };
    // Keep top 200 items in history
    const updated = [newEntry, ...existing].slice(0, 200);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (e) {
    console.error('Failed logging history:', e);
    return {
      ...entry,
      id: `hist-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  }
};

export const clearHistoryLogs = (): void => {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Failed clearing history:', e);
  }
};

// Universal Bookmarks Management
export const getUniversalBookmarks = (): UniversalBookmark[] => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(SEED_BOOKMARKS));
      return SEED_BOOKMARKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading universal bookmarks:', e);
    return SEED_BOOKMARKS;
  }
};

export const addUniversalBookmark = (
  bookmark: Omit<UniversalBookmark, 'id' | 'bookmarkedAt'>
): UniversalBookmark => {
  try {
    const existing = getUniversalBookmarks();
    // Prevent duplicate bookmarking of the exact same item
    const existingMatch = existing.find(
      (b) => b.itemId === bookmark.itemId && b.itemType === bookmark.itemType
    );
    if (existingMatch) {
      return existingMatch;
    }
    const newBookmark: UniversalBookmark = {
      ...bookmark,
      id: `bm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      bookmarkedAt: new Date().toISOString()
    };
    const updated = [newBookmark, ...existing];
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));

    // Log in history
    logHistoryActivity({
      type: 'BOOKMARKED_ITEM',
      title: `Bookmarked: ${newBookmark.title}`,
      subtitle: `Folder: ${newBookmark.category} • from ${newBookmark.sourceTag}`,
      category: newBookmark.category,
      targetExam: newBookmark.targetExam
    });

    return newBookmark;
  } catch (e) {
    console.error('Failed adding universal bookmark:', e);
    return {
      ...bookmark,
      id: `bm-${Date.now()}`,
      bookmarkedAt: new Date().toISOString()
    };
  }
};

export const removeUniversalBookmark = (bookmarkId: string): void => {
  try {
    const existing = getUniversalBookmarks();
    const updated = existing.filter((b) => b.id !== bookmarkId);
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed removing bookmark:', e);
  }
};

export const updateBookmarkNotes = (bookmarkId: string, notes: string, category?: BookmarkCategory): void => {
  try {
    const existing = getUniversalBookmarks();
    const updated = existing.map((b) => {
      if (b.id === bookmarkId) {
        return {
          ...b,
          notes,
          category: category || b.category
        };
      }
      return b;
    });
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed updating bookmark notes:', e);
  }
};

// ---------------------------------------------------------------------------
// Offline Intelligent Note Extractor & Auto-Categorizer Engine
// Operates 100% in-browser using deterministic NLP heuristics and keyword tagging
// ---------------------------------------------------------------------------

const CATEGORY_KEYWORDS: Record<CurriculumCategory, string[]> = {
  'Ancient History': [
    'harappa', 'mohenjo', 'indus', 'vedic', 'rigveda', 'samaveda', 'yajurveda', 'atharvaveda',
    'upanishad', 'buddhism', 'jainism', 'tirthankara', 'mahavira', 'buddha', 'maurya', 'ashoka',
    'gupta', 'samudragupta', 'chandragupta', 'chalcolithic', 'neolithic', 'palaeolithic', 'mesolithic',
    'bhimbetka', 'sangam', 'pallava', 'chola', 'harsha', 'megasthenes', 'kalinga'
  ],
  'Medieval History': [
    'delhi sultanate', 'slave dynasty', 'qutub', 'iltutmish', 'balban', 'khalji', 'alauddin',
    'tughlaq', 'firoz shah', 'lodhi', 'mughal', 'babur', 'humayun', 'akbar', 'jahangir', 'shah jahan',
    'aurangzeb', 'maratha', 'shivaji', 'peshwa', 'vijayanagara', 'krishnadeva raya', 'bahmani',
    'panipat', 'mansabdari', 'todar mal', 'sikh guru', 'guru gobind', 'khalsa'
  ],
  'Modern History': [
    'east india company', 'plassey', 'buxar', 'cornwallis', 'permanent settlement', 'subsidiary alliance',
    'dalhousie', 'doctrine of lapse', '1857 revolt', 'sepoy mutiny', 'indian national congress', 'swadeshi',
    'gandhi', 'non-cooperation', 'civil disobedience', 'dandi march', 'poona pact', 'quit india',
    'subhash chandra bose', 'ina', 'cabinet mission', 'mountbatten', 'brahmo samaj', 'arya samaj'
  ],
  'Art & Culture': [
    'classical dance', 'bharatanatyam', 'kathak', 'kathakali', 'mohiniyattam', 'kuchipudi', 'odissi',
    'folk dance', 'carnatic', 'hindustani', 'sitar', 'veena', 'tabla', 'flute', 'shehnai', 'architecture',
    'stupa', 'rock-cut', 'temple architecture', 'nagara', 'dravidian', 'vesara', 'paintings'
  ],
  'Indian Polity': [
    'constitution', 'constituent assembly', 'preamble', 'fundamental rights', 'article', 'writ',
    'habeas corpus', 'mandamus', 'dpsp', 'fundamental duties', 'president', 'governor', 'prime minister',
    'parliament', 'lok sabha', 'rajya sabha', 'money bill', 'supreme court', 'high court', 'judiciary',
    'panchayat', '73rd amendment', '74th amendment', 'cag', 'election commission', 'finance commission',
    'emergency', 'article 352', 'article 356', 'article 360', 'amendment 368'
  ],
  'Indian Economy': [
    'gdp', 'gnp', 'ndp', 'nnp', 'national income', 'rbi', 'reserve bank', 'monetary policy', 'repo rate',
    'reverse repo', 'crr', 'slr', 'inflation', 'cpi', 'wpi', 'five year plan', 'planning commission',
    'niti aayog', 'green revolution', 'fiscal policy', 'budget', 'gst', 'balance of payments', 'bop',
    'balance of trade', 'disinvestment', 'msme', 'agriculture', 'banking'
  ],
  'Physical Geography': [
    'universe', 'solar system', 'planet', 'earth', 'rotation', 'revolution', 'latitude', 'longitude',
    'international date line', 'rock', 'igneous', 'sedimentary', 'metamorphic', 'earthquake', 'epicenter',
    'volcano', 'atmosphere', 'troposphere', 'stratosphere', 'mesosphere', 'ozone', 'wind', 'trade wind',
    'westerlies', 'cyclone', 'ocean current', 'tide', 'plate tectonics'
  ],
  'Indian Geography': [
    'himalayas', 'northern plains', 'peninsular plateau', 'western ghats', 'eastern ghats', 'coastal plains',
    'ganga', 'brahmaputra', 'indus', 'godavari', 'krishna', 'cauvery', 'narmada', 'tapi', 'alluvial soil',
    'black soil', 'regur', 'red soil', 'laterite', 'tropical deciduous', 'monsoon', 'south west monsoon',
    'retreating monsoon', 'k2', 'kanchenjunga', 'waterfalls', 'lakes'
  ],
  'Environment & Ecology': [
    'biodiversity', 'ecosystem', 'biome', 'wetland', 'ramsar', 'biosphere reserve', 'national park',
    'wildlife sanctuary', 'tiger reserve', 'project tiger', 'coral reef', 'coral bleaching', 'acid rain',
    'smog', 'global warming', 'greenhouse gas', 'kyoto', 'paris agreement', 'endangered species',
    'iucn', 'cop', 'pollution', 'biomagnification'
  ],
  'General Science': [
    'physics', 'newton', 'gravitation', 'escape velocity', 'pascal', 'archimedes', 'surface tension',
    'optics', 'reflection', 'refraction', 'total internal reflection', 'tir', 'lens', 'myopia',
    'hypermetropia', 'sound', 'ultrasonic', 'chemistry', 'acid', 'base', 'salt', 'ph', 'plaster of paris',
    'gypsum', 'cement', 'polymer', 'biology', 'cell', 'dna', 'rna', 'vitamin', 'enzyme', 'bacteria',
    'virus', 'vaccine', 'penicillin'
  ],
  'Rajasthan Special': [
    'rajasthan', 'aravali', 'thar desert', 'chambal', 'banas', 'luni', 'kalibangan', 'ganeshwar',
    'mewar', 'marwar', 'rana kumbha', 'maharana pratap', 'prajamandal', 'sujas', 'bhadla', 'dhebar lake',
    'sambhar lake', 'khejri', 'ghoomar', 'kalbeliya', 'rpsc', 'ras'
  ],
  'Defense & Security': [
    'army', 'navy', 'air force', 'command', 'tri-service', 'port blair', 'missile', 'agni', 'prithvi',
    'brahmos', 'nag', 'akash', 'paramilitary', 'bsf', 'crpf', 'cisf', 'itbp', 'assam rifles', 'nsg',
    'chief of defence staff', 'cds'
  ],
  'General Knowledge': [
    'superlative', 'first in india', 'first in world', 'nobel prize', 'bharat ratna', 'padma',
    'gallantry award', 'param vir chakra', 'united nations', 'headquarters', 'unesco', 'who', 'books',
    'authors', 'days', 'abbreviation'
  ],
  'Uncategorized': []
};

export const categorizeTextSnippet = (text: string): CurriculumCategory => {
  const lower = text.toLowerCase();
  let bestCategory: CurriculumCategory = 'Uncategorized';
  let highestScore = 0;

  (Object.keys(CATEGORY_KEYWORDS) as CurriculumCategory[]).forEach((cat) => {
    const keywords = CATEGORY_KEYWORDS[cat];
    let score = 0;
    keywords.forEach((kw) => {
      // Award points for word match
      if (lower.includes(kw)) {
        score += 2;
      }
    });
    if (score > highestScore) {
      highestScore = score;
      bestCategory = cat;
    }
  });

  return bestCategory;
};

export const extractNotesFromRawText = (
  rawText: string,
  fileName: string = 'Imported_Document.pdf',
  pageNumber?: number
): ExtractedNote => {
  const trimmed = rawText.trim();
  const category = categorizeTextSnippet(trimmed);

  // Extract clean bullet points by looking for bullet glyphs, numbers, or line breaks
  const rawLines = trimmed
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 5);

  const bulletCandidates: string[] = [];
  rawLines.forEach((line) => {
    // Strip leading dashes, dots, asterisks, numbers
    const cleaned = line.replace(/^([•●\-*■\d+.)\s]+)/, '').trim();
    if (cleaned.length > 15 && cleaned.length < 350) {
      bulletCandidates.push(cleaned);
    }
  });

  // Pick top 4 to 7 coherent points or generate from sentence splits if lines are blocks
  let bulletPoints = bulletCandidates.slice(0, 7);
  if (bulletPoints.length < 3) {
    const sentences = trimmed.split(/(?<=[.?!])\s+/).filter((s) => s.length > 20);
    bulletPoints = sentences.slice(0, 5);
  }

  // Extract key terms (capitalized phrases, known domain terms)
  const words = trimmed.split(/[\s,.;:()]+/);
  const potentialTerms = new Set<string>();
  words.forEach((w) => {
    const cleanWord = w.replace(/[^a-zA-Z0-9-]/g, '');
    if (cleanWord.length > 4 && /^[A-Z]/.test(cleanWord) && !['Which', 'Where', 'These', 'Their', 'Under', 'After', 'Before', 'There'].includes(cleanWord)) {
      potentialTerms.add(cleanWord);
    }
  });

  // Target exam determination
  const isRajasthan = category === 'Rajasthan Special' || trimmed.toLowerCase().includes('rajasthan') || trimmed.toLowerCase().includes('rpsc');
  const targetExam = isRajasthan ? 'RAJASTHAN_EXCLUSIVE' : 'COMMON_CORE';

  // Title inference: First prominent line or domain topic
  const firstLine = rawLines[0] ? rawLines[0].replace(/^([•●\-*■\d+.)\s]+)/, '').trim() : '';
  const title = firstLine.length > 8 && firstLine.length < 80 ? firstLine : `${category} High-Yield Synthesis`;

  const examAngles = [
    `Tested directly in ${isRajasthan ? 'RPSC RAS General Studies' : 'UPSC Prelims Paper-I & RPSC Dual Paper'} on conceptual accuracy.`,
    `Focus on elimination tactics regarding facts, chronological sequences, and statutory definitions.`
  ];

  const noteId = `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: noteId,
    title,
    sourceDocName: fileName,
    category,
    targetExam,
    bulletPoints: bulletPoints.length > 0 ? bulletPoints : [trimmed.substring(0, 160)],
    keyTerms: Array.from(potentialTerms).slice(0, 6),
    examAngles,
    rawSnippet: trimmed.substring(0, 800),
    pageNumber,
    createdAt: new Date().toISOString(),
    importance: isRajasthan || category === 'Indian Polity' || category === 'Ancient History' ? 'HIGH' : 'MEDIUM'
  };
};
