export interface KnowledgeBit {
  id: string;
  topic: string;
  subtopic: string;
  subject: string;
  targetExam: 'COMMON_CORE' | 'RAJASTHAN_EXCLUSIVE' | 'UPSC_CORE';
  keyFactOrConcept: string;
  detailedExplanation: string;
  examAngle: string; // How questions are formed
  trapAlert?: string; // Common misleading option / confusion
  highYieldTags: string[];
  referencePage: string;
}

export interface CurriculumDomain {
  id: string;
  domainName: string;
  domainNameHindi: string;
  iconName: string;
  description: string;
  totalBitsCount: number;
  colorTheme: string;
  bits: KnowledgeBit[];
}

export const COMPLETE_CURRICULUM_DOMAINS: CurriculumDomain[] = [
  {
    id: 'ancient-medieval-history',
    domainName: 'Ancient & Medieval Indian History',
    domainNameHindi: 'प्राचीन एवं मध्यकालीन भारतीय इतिहास',
    iconName: 'Landmark',
    description: 'Pre-history to Harappan Civilization, Vedic literature, Jainism, Buddhism, Mauryas, Guptas, Delhi Sultanate, Mughals & Marathas.',
    totalBitsCount: 22,
    colorTheme: 'amber',
    bits: [
      {
        id: 'hist-01',
        topic: 'Pre-Historic Period',
        subtopic: 'Palaeolithic, Mesolithic, Neolithic & Chalcolithic',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Evolution of stone age cultures from food gathering (Quartzite tools) to domestication (Microliths at Bhimbetka) and agriculture (Copper + Stone).',
        detailedExplanation: '• Palaeolithic: Homo sapiens appeared towards the end. First stone tools made of Quartzite (Lower, Middle, Upper Palaeolithic).\n• Mesolithic: Domestication of animals (dogs) began. Characteristic microliths used. Bhimbetka (MP) ancient rock cave paintings depicting fauna and hunting.\n• Neolithic: Discovery of fire and wheel. Important site: Burzahom (Kashmir, meaning "place of birch") with pit-dwellings.\n• Chalcolithic: Concurrent use of Copper and Stone tools. Practiced agriculture, venerated Mother Goddess, and worshipped the bull.',
        examAngle: 'Matches archaeological site with characteristics (e.g. Burzahom = pit dwelling; Bhimbetka = Mesolithic rock art).',
        trapAlert: 'Do not confuse Chalcolithic (copper-stone) with Bronze Age (Harappa) or Iron Age (Vedic).',
        highYieldTags: ['Bhimbetka', 'Burzahom', 'Microliths', 'Quartzite'],
        referencePage: 'Page 1'
      },
      {
        id: 'hist-02',
        topic: 'Indus Valley Civilisation (IVC)',
        subtopic: 'Town Planning, Economy, Social & Religious Life',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Grid system town planning, absence of iron, merchant rule, worship of Pashupati & Mother Goddess, Boustrophedon script.',
        detailedExplanation: '• Date: 2500–1750 BC (Radiocarbon).\n• Town Planning: Burnt bricks, sophisticated covered drainage system, fortified Citadel (upper town) and Lower Part.\n• Social: Ruled by merchant class; absence of military weapons. No royal palaces found.\n• Agriculture: Sowed in November, reaped in April (post-flood). First to produce cotton (termed "Sindon" by Greeks). Grew wheat, barley, rai, peas, sesame, rice, mustard.\n• Religion: Proto-Shiva / Pashupati seal (surrounded by elephant, tiger, rhino, buffalo, and 2 deer at feet), Mother Goddess, phallic (lingam) and yoni worship, pipal tree, humped bull, unicorn. No temples found!\n• Script: Pictographic, undeciphered, written in Boustrophedon (right to left, then left to right). Weights in multiples of 16.',
        examAngle: 'UPSC statement questions testing: "Temples existed in Harappa" (False) or "Harappans knew iron" (False).',
        trapAlert: 'Iron was strictly unknown to Harappans; it appeared only in the Later Vedic period (Ayas / Krishna-ayas).',
        highYieldTags: ['Pashupati Seal', 'Boustrophedon', 'Multiples of 16', 'Sindon', 'No Temples'],
        referencePage: 'Pages 1-2'
      },
      {
        id: 'hist-03',
        topic: 'Indus Valley Sites & Discoveries',
        subtopic: 'Site Matrix with Geographic & Archaeological Findings',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Key sites: Harappa (Ravi), Mohenjodaro (Indus), Chanhudaro, Lothal (Bhogava dockyard), Kalibangan (Ghaggar, Rajasthan), Dholavira (3-part city, stadium), Rakhigarhi (largest).',
        detailedExplanation: '• Harappa (Ravi, Pak - Daya Ram Sahni 1921): Stone dancing Nataraja, Cemetery R-37, six granaries in a row.\n• Mohenjodaro (Indus, Larkana - RD Banerji 1922): Great Bath, Great Granary, Assembly Hall, Bronze Dancing Girl, Pashupati seal, woven cotton.\n• Chanhudaro (Indus - NG Majumdar 1931): ONLY Indus site without a citadel; bead factory, bronze ekkas, inkpot.\n• Lothal (Bhogava, Gujarat - SR Rao 1954): Tidal dockyard, rice husk, fire altars, double burial.\n• Kalibangan (Ghaggar, Hanumangarh, Rajasthan - BB Lal 1961): Ploughed field furrow, 7 fire altars, camel bones, circular and rectangular graves.\n• Dholavira (Luni, Kachchh - JP Joshi / RS Bisht): Unique water harvesting reservoir system; divided into 3 parts (Citadel, Middle, Lower); sign-board inscription, stadium.\n• Surkotada (Gujarat - JP Joshi): Horse bones found; oval grave.\n• Banawali (Saraswati, Haryana - RS Bisht): Radial streets, lack of systematic drainage, high quality barley.\n• Rakhigarhi (Haryana): Largest Indus Valley site.',
        examAngle: 'Extremely high yield for RPSC RAS (Kalibangan details like camel bones, ploughed field) and UPSC (Dholavira 3-tier layout & water management).',
        trapAlert: 'Chanhudaro has NO citadel. Dholavira has THREE parts (not two like typical Harappan sites).',
        highYieldTags: ['Kalibangan', 'Dholavira', 'Lothal Dockyard', 'Rakhigarhi', 'Chanhudaro'],
        referencePage: 'Page 2'
      },
      {
        id: 'hist-04',
        topic: 'Vedic Period',
        subtopic: 'Rig Vedic (1500–1000 BC) vs Later Vedic (1000–500 BC)',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Shift from pastoral, egalitarian tribal assemblies (Sabha, Samiti, Vidatha) to territorial monarchies, Varna rigidity, and sacrificial rituals (Ashwamedha, Vajapeya).',
        detailedExplanation: '• Rigvedic: Pastoral economy (Gavisthi = war for cows); barter with cow and gold coins (Nishka, Satmana). Staple crop Yava (barley). Assemblies: Sabha (elders), Samiti (general folk), Vidatha. Women participated in assemblies.\n• Dasrajan War: Battle of 10 Kings on the banks of Parushni (Ravi) where King Sudas of Tritsus emerged victorious.\n• Rigvedic Rivers: Sindhu (Indus), Vitasta (Jhelum), Asikni (Chenab), Parushni (Ravi), Vipas (Beas), Sutudri (Sutlej), Drishadavati (Ghaggar).\n• Later Vedic: Expansion into Ganga-Yamuna Doab (Iron used). King became territorial Samrat; division into 4 Varnas (Purushasukta in 10th Mandala). Deterioration in women’s status; appearance of Gotra institution. Staple crop Vrihi (rice) and wheat.',
        examAngle: 'Matches Rigvedic river names with modern equivalents; tests political nature of Sabha vs Samiti.',
        trapAlert: 'Vidatha was the oldest assembly with women participation, which completely disappeared in the Later Vedic era.',
        highYieldTags: ['Dasrajan War', 'Parushni', 'Gavisthi', 'Nishka', 'Gotra'],
        referencePage: 'Pages 3-4'
      },
      {
        id: 'hist-05',
        topic: 'Vedic Literature & Philosophy',
        subtopic: '4 Vedas, Brahmanas, Aranyakas, Upanishads & Shada-Darshana',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Rigveda (hymns), Samaveda (Dhrupad chants), Yajurveda (rituals), Atharvaveda (charms). 6 Orthodox Darshanas and 4 Upavedas.',
        detailedExplanation: '• Rigveda: 1028 hymns in 10 Mandalas. 3rd Mandala contains Gayatri Mantra (by Vishvamitra to Sun god Savitr); 10th Mandala contains Purushasukta.\n• Brahmanas: Explain rituals (Rigveda: Aitareya, Kaushitaki; Yajurveda: Satapatha; Samaveda: Panchavimsha; Atharvaveda: Gopatha).\n• Upanishads: 108 philosophical treatises ("Vedanta") criticizing ritualism; Brihadaranyaka is oldest; Mundaka contains "Satyameva Jayate".\n• 6 Darshana Schools: Nyaya (Gautama), Vaisheshika (Kanada), Samkhya (Kapila), Yoga (Patanjali), Purva Mimamsa (Jaimini), Uttara Mimamsa / Vedanta (Badarayana / Vyasa).\n• 4 Upavedas: Dhanurveda (warfare - Yajur), Gandharvaveda (music - Sama), Shilpaveda (architecture - Atharva), Ayurveda (medicine - Rig).',
        examAngle: 'Direct question matching founders of 6 Darshana schools and Upavedas to their primary Veda.',
        trapAlert: 'Ayurveda is traditionally linked to Rigveda (or Atharvaveda), Gandharvaveda is Samaveda, and Dhanurveda is Yajurveda.',
        highYieldTags: ['Shada-Darshana', 'Upavedas', 'Gayatri Mantra', 'Brihadaranyaka', 'Satapatha'],
        referencePage: 'Page 4'
      },
      {
        id: 'hist-06',
        topic: 'Jainism & Buddhism',
        subtopic: 'Teachings, Councils, Sects & Royal Patronage',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Heterodox reaction against Brahmanical orthodoxy (c. 600 BC). Triratnas, Ahimsa, Eight-Fold Path, Buddhist & Jain Councils.',
        detailedExplanation: '• Jainism: Founded by Rishabhadeva (Bull emblem); 23rd Tirthankara Parshvanatha; 24th Mahavira (Lion emblem, born 540 BC Kundagram, died 468 BC Pavapuri). 5 Vows: Ahimsa, Satya, Asteya, Aparigraha, Brahmacharya (added by Mahavira). Triratna: Right Faith, Right Knowledge, Right Conduct. Sects: Svetambara (Sthulabhadra) & Digambara (Bhadrabahu). 1st Council: Pataliputra (300 BC); 2nd Council: Vallabhi (5th c. AD).\n• Buddhism: Gautama Buddha (born 563 BC Lumbini in Shakya clan, Mahaparinirvana at Kusinara). Four Noble Truths, Eight-Fold Path, Middle Path (avoid extreme comfort and extreme asceticism). Tripitakas in Pali: Vinaya (rules), Sutta (sermons), Abhidhamma (philosophy).\n• 4 Buddhist Councils:\n  1. 483 BC Rajagriha (Patron: Ajatashatru, Chair: Mahakasyapa)\n  2. 383 BC Vaishali (Patron: Kalashoka, Chair: Sabakami)\n  3. 250 BC Pataliputra (Patron: Ashoka, Chair: Moggaliputta Tissa)\n  4. 72 AD Kundalvana/Kashmir (Patron: Kanishka, Chair: Vasumitra & Ashvaghosha; split into Hinayana & Mahayana).',
        examAngle: 'Matches patrons, chairmen, and venues of the 4 Buddhist Councils; compares Digambara vs Svetambara schism.',
        trapAlert: 'Buddhism rejects both Soul (Anatta) and extreme penance, whereas Jainism believes in eternal Soul (Jiva) even in inanimate objects and practices extreme penance (Sallekhana).',
        highYieldTags: ['4 Buddhist Councils', 'Tripitakas', 'Tirthankaras', 'Kaivalya', 'Mahakasyapa'],
        referencePage: 'Pages 5-6'
      },
      {
        id: 'hist-07',
        topic: 'Magadha, Mauryas & Post-Mauryas',
        subtopic: 'Haryanka, Shishunaga, Nanda, Maurya, Sunga, Kanva, Indo-Greeks & Kushanas',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Magadhan rise under Bimbisara, unification under Chandragupta Maurya & Ashoka, Dhamma edicts, and Indo-Greek/Kushana coinage.',
        detailedExplanation: '• Haryanka Dynasty: Bimbisara (matrimonial diplomacy), Ajatashatru (first Buddhist council), Udayin (founded Pataliputra).\n• Nandas: Mahapadma Nanda; Alexander invaded during Dhana Nanda (326 BC Battle of Hydaspes vs Porus).\n• Mauryas: Chandragupta Maurya (overthrew Nandas with Chanakya; defeated Seleucus Nikator in 304 BC; Megasthenes wrote Indica; adopted Jainism, died at Shravanabelagola). Bindusara (Amitraghata; received Deimachos). Ashoka (Kalinga War 261 BC, 13th Rock Edict; deciphered by James Prinsep in 1837; Sanchi Stupa, Barabar caves).\n• Post-Maurya: Pushyamitra Sunga killed last Maurya Brihadratha (185 BC; revived Bhagavatism; Patanjali wrote Mahabhashya). Satavahanas (Simuka founded; issued lead coins; rock-cut chaityas at Karle, Nasik). Indo-Greeks first issued gold coins and royal portraits (Menander / Milinda). Kushanas (Kanishka started Saka Era in 78 AD; issued purest gold coins; court of Charaka, Ashvaghosha, Nagarjuna).',
        examAngle: '13th Rock Edict Kalinga conversion, James Prinsep 1837 decipherment, Saka Era 78 AD.',
        trapAlert: 'Greeks first issued gold coins in India, but Kushanas issued them on the widest scale with highest metallic purity.',
        highYieldTags: ['James Prinsep', '13th Rock Edict', 'Saka Era 78 AD', 'Patanjali', 'Lead Coins'],
        referencePage: 'Pages 6-8'
      },
      {
        id: 'hist-08',
        topic: 'Guptas, Harsha & Southern Dynasties',
        subtopic: 'Classical Golden Age, Pushyabhuti, Sangam, Cholas & Rashtrakutas',
        subject: 'Ancient History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Gupta administrative zenith and coinage, Harsha and Xuanzang, Sangam assemblies, Chola local self-governance and bronze Nataraja.',
        detailedExplanation: '• Guptas: Chandragupta I (title Maharajadhiraja, Gupta Era 319 AD). Samudragupta ("Napoleon of India" by VA Smith; Prayag Prashasti by Harishena; Kaviraja title). Chandragupta II Vikramaditya (Navratnas including Kalidasa; Fa-hien visited; Mehrauli Iron Pillar). Kumaragupta I (founded Nalanda Mahavihara). Skandagupta (repelled Hunas, Bhitari inscription).\n• Harsha (606–647 AD): Shifted capital to Kannauj. Xuanzang (Hiuen Tsang) visited. Banabhatta wrote Harshacharita & Kadambari. Harsha composed Ratnavali, Priyadarsika, Nagananda.\n• Sangam Age: 3 Tamil assemblies (Madurai, Kapadapuram, Madurai). Tiruvalluvar wrote Tirukkural ("Fifth Veda"). Dynasties: Cheras (Vanji), Cholas (Puhar / Kaveripattinam), Pandyas (Madurai).\n• Imperial Cholas: Vijayalaya founded (Tanjore). Rajaraja I built Brihadeshwara Temple. Rajendra I captured Sri Lanka and assumed title Gangaikonda Chola. Famous for village self-government (Uttaramerur inscription) and Bronze Nataraja sculpture.\n• Rashtrakutas: Dantidurga founded. Krishna I carved rock-cut Kailash temple at Ellora. Amoghavarsha wrote Kavirajamarga.',
        examAngle: 'Uttaramerur inscription (Chola local self-government), Prayag Prashasti composer, Nalanda founder.',
        trapAlert: 'Brihadeshwara temple was built by Rajaraja I at Thanjavur, while Gangaikondacholapuram was built by his son Rajendra I.',
        highYieldTags: ['Prayag Prashasti', 'Nalanda Mahavihara', 'Uttaramerur', 'Kailash Temple Ellora', 'Brihadeshwara'],
        referencePage: 'Pages 8-10'
      },
      {
        id: 'hist-09',
        topic: 'Delhi Sultanate (1206–1526 AD)',
        subtopic: 'Slave, Khalji, Tughlaq, Sayyid & Lodhi Dynasties',
        subject: 'Medieval History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Qutb-ud-din Aibak to Lodhis: Turkan-i-Chahalgani, Iqta system, market reforms, token currency experiments, and Vijay Stambh.',
        detailedExplanation: '• Slave Dynasty: Qutb-ud-din Aibak (Lakh Baksh; built Quwwat-ul-Islam & Adhai Din Ka Jhopra). Iltutmish (Turkan-i-Chahalgani / Chalisa; silver Tanka & copper Jital; hereditary monarchy). Razia Sultan (first female Muslim ruler). Balban (Zil-i-Ilahi, Sijdah & Paibos; Diwan-i-Ariz military department).\n• Khalji Dynasty: Alauddin Khalji (market control, Chehra & Dagh branding of horses; built Alai Darwaza, Siri Fort, Hauz Khas; abolished zamindari in Khalisa lands; conquered Chittor 1303, Ranthambore).\n• Tughlaq: Ghiyasuddin (built Tughlaqabad, first canals). Muhammad bin Tughlaq (5 experiments: Daulatabad capital transfer, Doab taxation, Qarachil & Khurasan expeditions, Token bronze currency; Diwan-i-Kohi for agriculture; Ibn Battuta visited). Firoz Shah Tughlaq (founded Hissar, Firozabad, Jaunpur; imposed Jizya on Brahmins; repaired Qutb Minar; wrote Futuhat-i-Firozshahi).\n• Lodhis: Bahlol founded; Sikandar Lodhi (founded Agra in 1504, Gaz-i-Sikandari, penned poetry as Gulrukhi); Ibrahim Lodhi (defeated by Rana Sanga in Battle of Khatoli 1517; defeated by Babur at 1st Panipat 1526).\n• Mewar link: Rana Kumbha defeated Mahmud Khalji of Malwa and built the celebrated Vijay Stambh at Chittorgarh.',
        examAngle: 'Administrative departments: Diwan-i-Ariz (military), Diwan-i-Kohi (agriculture), Diwan-i-Wazarat (finance).',
        trapAlert: 'Token currency was copper/bronze, NOT leather as commonly fabled, and was struck down due to widespread unauthorized minting.',
        highYieldTags: ['Diwan-i-Kohi', 'Alai Darwaza', 'Turkan-i-Chahalgani', 'Vijay Stambh', 'Gaz-i-Sikandari'],
        referencePage: 'Pages 10-11'
      },
      {
        id: 'hist-10',
        topic: 'Vijayanagara & Bahmani Empires',
        subtopic: 'South Indian Polities, Art & Architecture',
        subject: 'Medieval History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Vijayanagara founded 1336 by Harihara & Bukka; Krishnadeva Raya (Ashtadiggajas, Amuktamalyada); Bahmani breakup into 5 Deccan Sultanates.',
        detailedExplanation: '• Vijayanagara: 4 dynasties (Sangama, Saluva, Tuluva, Aravidu). Devaraya II (Abdur Razzaq visited). Krishnadeva Raya (1509–1529, Tuluva dyn; titles: Andhra Bhoja, Abhinava Bhoja; court poets Ashtadiggajas including Allasani Peddana and Tenali Ramakrishna; foreign travelers Domingo Paes and Duarte Barbosa visited).\n• Battle of Talikota / Rakshasi-Tangadi (1565): Alliance of Bijapur, Golconda, Ahmadnagar, Bidar defeated Vijayanagara (Sadasiva Raya / Rama Raya).\n• Bahmani: Founded 1347 by Hasan Gangu (Alauddin Bahman Shah) at Gulbarga, later shifted to Bidar. Split into: Ahmadnagar (Nizam Shahi), Bijapur (Adil Shahi - built Gol Gumbaz), Berar (Imad Shahi), Golconda (Qutb Shahi - built Charminar, founded Hyderabad), Bidar (Barid Shahi).',
        examAngle: 'Foreign travelers in Vijayanagara (Nicolo Conti, Abdur Razzaq, Domingo Paes, Fernao Nuniz).',
        trapAlert: 'Berar did NOT participate in the Battle of Talikota against Vijayanagara.',
        highYieldTags: ['Krishnadeva Raya', 'Battle of Talikota 1565', 'Gol Gumbaz', 'Ashtadiggaja', 'Abdur Razzaq'],
        referencePage: 'Page 12'
      },
      {
        id: 'hist-11',
        topic: 'Mughal Empire & Sur Interlude',
        subtopic: 'Babur, Humayun, Sher Shah, Akbar, Jahangir, Shah Jahan & Aurangzeb',
        subject: 'Medieval History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Mughal administration, Mansabdari system, Todar Mal Bandobast (Zabti), architectural monuments, and Sher Shah’s Rupaya.',
        detailedExplanation: '• Babur (1526–30): Introduced gunpowder; 1st Panipat (1526), Khanwa vs Rana Sanga (1527, declared Jihad & assumed Ghazi), Chanderi (1528), Ghaghra (1529). Wrote Tuzuk-i-Baburi in Chaghatai Turkish.\n• Sher Shah Suri (1540–45): Defeated Humayun at Chausa (1539) and Kannauj (1540). Introduced standard silver coin Rupaya and copper Dam. Built Grand Trunk Road and Purana Qila.\n• Akbar (1556–1605): 2nd Panipat (1556 vs Hemu); Battle of Haldighati (1576 vs Maharana Pratap). Abolished Jizya (1564) and pilgrimage tax; Sulh-i-Kul; Ibadat Khana (1575); Mahzar / Infallibility decree (1579); Din-i-Ilahi (1582, Birbal joined). Todar Mal Bandobast (Zabti system). Mansabdari system (Zat & Sawar). Built Buland Darwaza at Fatehpur Sikri after Gujarat victory (1572).\n• Jahangir (1605–27): Golden Chain of Justice (Zanjir-i-Adil); executed 5th Sikh Guru Arjan Dev; painter paradise (Ustad Mansur, Abul Hasan); Hawkins & Sir Thomas Roe visited.\n• Shah Jahan (1628–58): Golden Age of Architecture (Taj Mahal, Red Fort, Jama Masjid, Moti Masjid Agra, Peacock Throne). Travelers Bernier, Tavernier, Manucci.\n• Aurangzeb (1658–1707): Executed 9th Guru Tegh Bahadur (1675); reimposed Jizya (1679); banned music and Sati; built Bibi Ka Maqbara; annexed Bijapur (1686) and Golconda (1687).',
        examAngle: 'Chronology of battles; components of Mansabdari system; architectural commissions.',
        trapAlert: 'Din-i-Ilahi was NOT a new religion with rituals and scripture; it was a socio-religious ethical code initiated by Akbar.',
        highYieldTags: ['Todar Mal Zabti', 'Mansabdari', 'Haldighati 1576', 'Rupaya', 'Zanjir-i-Adil'],
        referencePage: 'Pages 12-13'
      },
      {
        id: 'hist-12',
        topic: 'Marathas & Sikh Gurus',
        subtopic: 'Chhatrapati Shivaji Maharaj, Ashtapradhan, Peshwas & 10 Sikh Gurus',
        subject: 'Medieval History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Shivaji’s administration (Ashtapradhan, Chauth & Sardeshmukhi), Peshwa dominance, 3rd Battle of Panipat 1761, and lineage of 10 Sikh Gurus.',
        detailedExplanation: '• Shivaji Maharaj (1627–80): Treaty of Purandar (1665) with Raja Jai Singh. Coronation at Raigad (1674), title "Haindava Dharmodharak". Ashtapradhan council: Peshwa (PM), Amatya (Accounts), Sachiv/Surunavis (Correspondence), Waqianavis (Intelligence), Sumant/Dabir (Foreign), Senapati/Sar-i-Naubat (Military), Pandit Rao (Charity), Nyayadhish (Law). Levied Chauth (1/4th) and Sardeshmukhi (1/10th).\n• Peshwas: Balaji Vishwanath (1713–20); Baji Rao I (1720–40, exponent of guerrilla tactics); Balaji Baji Rao / Nana Saheb (3rd Battle of Panipat 1761 lost to Ahmad Shah Abdali).\n• 10 Sikh Gurus:\n  1. Guru Nanak (founded Sikhism, Langar)\n  2. Guru Angad (Gurmukhi script)\n  3. Guru Amar Das (opposed Sati/Purdah, 22 Manjis)\n  4. Guru Ram Das (founded Amritsar, pool given by Akbar)\n  5. Guru Arjan Dev (Golden Temple, compiled Adi Granth, martyred 1606)\n  6. Guru Hargobind (Akal Takht, martial spirit)\n  7. Guru Har Rai (sheltered Dara Shikoh)\n  8. Guru Har Krishan (child Guru)\n  9. Guru Tegh Bahadur (martyred 1675 at Chandni Chowk)\n  10. Guru Gobind Singh (founded Khalsa 1699 at Anandpur Sahib, ended personal guruship).',
        examAngle: 'Ashtapradhan portfolio matching; Sikh Guru contributions (Gurmukhi, Adi Granth, Akal Takht, Khalsa).',
        trapAlert: 'Third Battle of Panipat took place in 1761 between Marathas and Ahmad Shah Abdali, NOT the Mughals.',
        highYieldTags: ['Ashtapradhan', 'Khalsa 1699', 'Adi Granth', 'Panipat 1761', 'Treaty of Purandar'],
        referencePage: 'Page 14'
      }
    ]
  },
  {
    id: 'modern-india-national-movement',
    domainName: 'Modern India & Freedom Struggle',
    domainNameHindi: 'आधुनिक भारत एवं राष्ट्रीय स्वतंत्रता संग्राम',
    iconName: 'Flame',
    description: 'European arrival, Governor-Generals & Viceroys, 1857 Revolt, INC Phases, Gandhian Agitations, Revolutionary Movements & Partition.',
    totalBitsCount: 18,
    colorTheme: 'red',
    bits: [
      {
        id: 'mod-01',
        topic: 'Advent of Europeans',
        subtopic: 'Portuguese, Dutch, English, Danes & French Settlements',
        subject: 'Modern History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Chronology: Portuguese (1498 Calicut - Vasco da Gama) → Dutch (1602) → English (1600 Charter) → Danes (1616) → French (1664 Colbert).',
        detailedExplanation: '• Portuguese: Vasco da Gama (1498 Zamorin at Calicut). Francisco de Almeida (Blue Water Policy). Alfonso de Albuquerque (captured Goa in 1510 from Bijapur; real founder). Settlements: Goa, Daman, Diu, Salsette, Hooghly.\n• Dutch: First factory at Masulipatnam (1605). Defeated by British in Battle of Bedara / Hooghly (1759) and shifted focus to Indonesia.\n• English: Royal Charter 31 Dec 1600. Captain William Hawkins (1608) and Sir Thomas Roe (1615) secured farmans from Jahangir. First permanent factory at Surat (1613). Job Charnock founded Calcutta (1690) by amalgamating Sutanuti, Kalikata, Govindapur; Fort William established 1700. Farrukhsiyar Farman (1717) - "Magna Carta of Company".\n• French: Founded 1664 by Jean-Baptiste Colbert under Louis XIV. First factory at Surat (1668 by Francois Caron). Decisively defeated at Battle of Wandiwash (1760) by Eyre Coote.',
        examAngle: 'Battle sequence: Plassey (1757) → Bedara (1759) → Wandiwash (1760) → Buxar (1764).',
        trapAlert: 'Portuguese were the first Europeans to arrive in India (1498) and the LAST to leave (Goa liberated in 1961).',
        highYieldTags: ['Battle of Wandiwash', 'Farrukhsiyar Farman', 'Albuquerque', 'Job Charnock'],
        referencePage: 'Page 15'
      },
      {
        id: 'mod-02',
        topic: 'Governor-Generals of Bengal & India',
        subtopic: 'Hastings, Cornwallis, Wellesley, Bentinck & Dalhousie',
        subject: 'Modern History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Administrative systems: Regulating Act 1773, Permanent Settlement 1793, Subsidiary Alliance 1798, Sati Abolition 1829, Doctrine of Lapse.',
        detailedExplanation: '• Warren Hastings (1774–85): Ended Dual Government. Regulating Act 1773, Supreme Court at Calcutta (1774), Asiatic Society of Bengal (1784 by William Jones). Charles Wilkins translated Bhagavad Gita to English (1785).\n• Lord Cornwallis (1786–93): Father of Civil Services in India. Permanent Settlement in Bengal/Bihar (1793). Separation of revenue and judicial administration; Daroga police system.\n• Lord Wellesley (1798–1805): Subsidiary Alliance (1st state: Nizam of Hyderabad 1798, then Mysore, Tanjore, Awadh, Peshwa 1802).\n• Lord William Bentinck (1828–35): 1st Governor General of India (Charter Act 1833). Abolished Sati (Regulation XVII, 1829). Macaulay’s Minute on English Education (1835). Suppressed Thuggee (William Sleeman).\n• Lord Dalhousie (1848–56): Doctrine of Lapse (Satara 1848, Sambalpur 1849, Udaipur 1852, Jhansi 1853, Nagpur 1854; Awadh annexed for maladministration 1856). 1st Railway line (Bombay-Thane 1853), 1st Telegraph (Calcutta-Agra), Post Office Act 1854, Wood\'s Despatch (1854), Hindu Widows\' Remarriage Act 1856 (pioneered by Ishwar Chandra Vidyasagar).',
        examAngle: 'Sequence of states annexed under Doctrine of Lapse; who abolished Sati; 1st Railway/Telegraph.',
        trapAlert: 'Awadh was NOT annexed under Doctrine of Lapse! It was annexed on the pretext of "maladministration" (Outram report).',
        highYieldTags: ['Doctrine of Lapse', 'Permanent Settlement', 'Subsidiary Alliance', 'Charter Act 1833'],
        referencePage: 'Pages 15-16'
      },
      {
        id: 'mod-03',
        topic: 'Viceroys of British India (1858–1947)',
        subtopic: 'Key Milestones under Canning, Ripon, Curzon, Chelmsford & Mountbatten',
        subject: 'Modern History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Canning (1858 Act, IPC), Ripon (Father of Local Self-Gov, Factory Act 1881), Curzon (Partition of Bengal 1905), Chelmsford (1919 Act, Rowlatt), Mountbatten (3rd June Plan).',
        detailedExplanation: '• Lord Canning (1856–62): 1st Viceroy. Queen Victoria’s Proclamation & GOI Act 1858. Universities of Calcutta, Bombay, Madras (1857). IPC enacted 1860.\n• Lord Mayo (1869–72): Financial decentralization; 1st Census in India (1871/72). Only Viceroy assassinated in office (Andamans 1872 by Sher Ali).\n• Lord Lytton (1876–80): Vernacular Press Act 1878 ("Gagging Act"), Arms Act 1878, 1st Delhi Durbar (1877, Kaiser-i-Hind to Victoria).\n• Lord Ripon (1880–84): Repealed Vernacular Press Act (1882); 1st Factory Act 1881 (banned child labor under 7); Father of Local Self-Government (1882 Resolution); Hunter Education Commission (1882); Ilbert Bill controversy (1883).\n• Lord Curzon (1899–1905): Indian Universities Act 1904, Ancient Monuments Preservation Act 1904 (ASI established), Partition of Bengal (16 Oct 1905).\n• Lord Chelmsford (1916–21): Montagu-Chelmsford Reforms (GOI Act 1919), Rowlatt Act & Jallianwala Bagh (13 April 1919).\n• Lord Irwin (1926–31): Simon Commission (1927), Lahore Session Purna Swaraj (1929), Dandi March (1930), Gandhi-Irwin Pact (5 March 1931).\n• Lord Mountbatten (1947): 3rd June Plan (partition plan), Indian Independence Act passed 4 July 1947.',
        examAngle: 'Lord Ripon\'s local self-government resolution; Vernacular Press Act passed by Lytton and repealed by Ripon.',
        trapAlert: 'Lord Lytton passed the repressive Vernacular Press Act; Lord Ripon repealed it.',
        highYieldTags: ['Lord Ripon', '1st Census 1872', 'Ilbert Bill 1883', '3rd June Plan', 'Vernacular Press Act'],
        referencePage: 'Pages 17-18'
      },
      {
        id: 'mod-04',
        topic: 'The Revolt of 1857',
        subtopic: 'Causes, Leaders, Centers, Suppressors & Historical Significance',
        subject: 'Modern History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Sparked on 10 May 1857 at Meerut. Enfield grease cartridge spark. Centers: Delhi (Bahadur Shah/Bakht Khan), Kanpur (Nana Saheb), Jhansi (Lakshmibai), Lucknow (Begum Hazrat Mahal), Bihar (Kunwar Singh).',
        detailedExplanation: '• Causes: Doctrine of Lapse, discriminatory tariffs against Indian textiles, low soldier salaries, Enfield P-53 greased cartridges.\n• Centers & Leaders & Suppressors:\n  - Delhi: Bahadur Shah II & General Bakht Khan (Suppressed by John Nicholson & Hudson)\n  - Kanpur: Nana Saheb, Tatya Tope, Azimullah Khan (Suppressed by Colin Campbell, Havelock)\n  - Lucknow: Begum Hazrat Mahal (Suppressed by Havelock, Outram, Campbell)\n  - Jhansi: Rani Lakshmi Bai (Suppressed by Sir Hugh Rose)\n  - Bareilly: Khan Bahadur Khan (Suppressed by Colin Campbell)\n  - Arrah / Jagdishpur (Bihar): Veer Kunwar Singh (Suppressed by William Taylor & Vincent Eyre)\n  - Allahabad/Banaras: Maulvi Liaquat Ali (Suppressed by James Neill)\n• Consequences: End of Company rule; Crown takeover via GOI Act 1858; Indian Army reorganized on peel commission lines (ratio of European to Indian troops increased; martial/non-martial caste classifications).',
        examAngle: 'Matches 1857 centers with Indian leaders and British officers who suppressed them.',
        trapAlert: 'Rani Lakshmibai was martyred fighting Sir Hugh Rose, who called her "the only man among the rebels".',
        highYieldTags: ['Veer Kunwar Singh', 'Sir Hugh Rose', 'Bakht Khan', 'Enfield Rifle', 'GOI Act 1858'],
        referencePage: 'Page 19'
      },
      {
        id: 'mod-05',
        topic: 'Indian National Movement (1885–1947)',
        subtopic: 'INC Formation, Swadeshi, Gandhian Epoch, INA & Independence',
        subject: 'Modern History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'INC founded 1885 (AO Hume, WC Bonnerjee); Moderates vs Extremists split (Surat 1907); Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942), INA, Cabinet Mission (1946).',
        detailedExplanation: '• INC: Formed Dec 1885 at Gokuldas Tejpal Sanskrit College, Bombay by AO Hume; presided by WC Bonnerjee (72 delegates).\n• Partition of Bengal & Swadeshi (1905): Boycott, Lal-Bal-Pal, Aurobindo Ghosh; Vande Mataram song.\n• Surat Split (1907): Split between Moderates (Gokhale) and Extremists (Tilak) over Swadeshi extension.\n• Home Rule League (1916): Tilak (Poona, April 1916: "Swaraj is my birthright") and Annie Besant (Adyar/Madras, Sept 1916).\n• Lucknow Pact (1916): Reunion of Moderates and Extremists; joint declaration with Muslim League accepting separate electorates.\n• Rowlatt Act & Jallianwala Bagh (1919): Arrest without trial; massacre on 13 April 1919 (Baisakhi); Rabindranath Tagore renounced Knighthood; Udham Singh assassinated Michael O\'Dwyer in London (1940).\n• Non-Cooperation Movement (1920–22): Nagpur session adopted program; suspended after Chauri Chaura incident (5 Feb 1922, 22 policemen killed).\n• Swaraj Party (1923): Formed by CR Das (President) and Motilal Nehru to enter councils.\n• Lahore Session (1929): JL Nehru presided; Purna Swaraj resolution; tricolor unfurled 31 Dec 1929; 26 Jan 1930 declared Independence Day.\n• Civil Disobedience & Dandi March (1930): 12 March to 6 April 1930 (Sabarmati to Dandi, 240 miles) to break Salt Law. Gandhi-Irwin Pact (5 March 1931).\n• Poona Pact (25 Sept 1932): Fast unto death by Gandhi in Yerwada against Ramsay MacDonald\'s Communal Award; agreement with BR Ambedkar replaced separate electorates with increased reserved seats in joint electorates.\n• Quit India Movement (8 Aug 1942): Gowalia Tank Bombay; Gandhi\'s call "Do or Die"; Operation Zero Hour arrested all leaders.\n• INA: Subhash Chandra Bose took command in Singapore (July 1943) from Rash Behari Bose; Rani of Jhansi women\'s regiment; "Dilli Chalo".\n• Cabinet Mission (1946): Pethick-Lawrence, Stafford Cripps, AV Alexander. Formed Constituent Assembly (met 9 Dec 1946, Dr. Rajendra Prasad elected President). Mountbatten 3rd June Plan 1947 enacted.',
        examAngle: 'Chronology: Swadeshi (1905) → Non-Cooperation (1920) → Dandi (1930) → Poona Pact (1932) → Quit India (1942).',
        trapAlert: 'The Communal Award gave separate electorates to Depressed Classes; the Poona Pact CANCELLED separate electorates and gave reserved seats in joint electorates.',
        highYieldTags: ['Poona Pact 1932', 'Dandi March 1930', 'Purna Swaraj 1929', 'Cabinet Mission 1946', 'Chauri Chaura 1922'],
        referencePage: 'Pages 19-23'
      },
      {
        id: 'mod-06',
        topic: 'Socio-Religious Reform Movements',
        subtopic: 'Brahmo Samaj, Arya Samaj, Ramakrishna Mission, Aligarh Movement & Reformers',
        subject: 'Modern History',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Key institutions: Brahmo Samaj (1828 Raja Ram Mohan Roy), Arya Samaj (1875 Dayanand Saraswati), Satyashodhak Samaj (1873 Jyotirao Phule), Ramakrishna Mission (1897 Vivekananda).',
        detailedExplanation: '• Brahmo Samaj (1828, Calcutta): Raja Ram Mohan Roy ("Father of Modern India", published Sambad Kaumudi, Mirat-ul-Akhbar, Gift to Monotheists; opposed Sati and idolatry). Later split into Adi Brahmo Samaj (Debendranath Tagore) and Brahmo Samaj of India (Keshab Chandra Sen).\n• Young Bengal Movement (1826–31): Henry Louis Vivian Derozio (first nationalist poet, journal Jananveshan).\n• Tattvabodhini Sabha (1839): Debendranath Tagore (Tattvabodhini Patrika).\n• Prarthana Samaj (1867, Bombay): Atmaram Pandurang, MG Ranade (monotheism, social reform).\n• Arya Samaj (1875, Bombay): Swami Dayanand Saraswati (born Mool Shankar; wrote Satyarth Prakash; slogan "Go Back to the Vedas"; opposed idol worship and caste supremacy).\n• Satyashodhak Samaj (1873): Jyotirao Phule (author of Gulamgiri; championed anti-caste and women education).\n• Aligarh Movement (1875): Sir Syed Ahmed Khan (journal Tahzib-ul-Akhlaq; founded MAO College at Aligarh 1875, later AMU).\n• Theosophical Society (1875 NY, shifted 1882 to Adyar/Madras): Madam Blavatsky & Col Olcott; Annie Besant joined.\n• Ramakrishna Mission (1897, Belur): Swami Vivekananda (Narendranath Datta; 1893 Chicago Parliament of Religions; practical Vedanta).',
        examAngle: 'Direct table questions matching reformers to their organisations and published journals/books.',
        trapAlert: 'Dayanand Saraswati gave the slogan "Go Back to the Vedas", NOT Raja Ram Mohan Roy (who was a rationalist synthesis monotheist).',
        highYieldTags: ['Gulamgiri', 'Satyarth Prakash', 'Sambad Kaumudi', 'Tahzib-ul-Akhlaq', 'Atmaram Pandurang'],
        referencePage: 'Pages 24-25'
      }
    ]
  },
  {
    id: 'geography-world-india',
    domainName: 'World & Indian Physical Geography',
    domainNameHindi: 'विश्व एवं भारत का भौतिक भूगोल',
    iconName: 'Globe',
    description: 'Universe & Solar System, Earth Interior & Latitudes, Plate Tectonics, Atmosphere & Winds, Indian Physiography, Rivers, Soils & Forests.',
    totalBitsCount: 24,
    colorTheme: 'blue',
    bits: [
      {
        id: 'geo-01',
        topic: 'Universe, Solar System & Earth Statistics',
        subtopic: 'Planetary Classification, Eclipses, Latitudes & Longitudes',
        subject: 'Physical Geography',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Big Bang (15 billion yrs), Terrestrial vs Jovian planets, SIAL/SIMA/NIFE layers, 1° longitude = 4 mins, IST = 82.5°E (+5h 30m).',
        detailedExplanation: '• Solar System: Inner Terrestrial rocky planets (Mercury, Venus, Earth, Mars); Outer Jovian gaseous giants (Jupiter, Saturn, Uranus, Neptune). Venus is hottest, brightest, rotates clockwise, Earth\'s twin. Mercury fastest revolution. Saturn has highest moons.\n• Earth: Oblate spheroid. Perihelion (nearest to Sun, ~Jan 3), Aphelion (farthest, ~July 4). Chemical layers (Eduard Suess): SIAL (crust, Silica-Alumina), SIMA (lower crust/mantle, Silica-Magnesia), NIFE (core, Nickel-Iron).\n• Latitudes & Longitudes: 1° latitude = 111 km. Equator (0°), Tropic of Cancer (23.5°N), Capricorn (23.5°S). 1° longitude = 4 minutes time difference. International Date Line = 180° meridian (crossing west to east adds 1 day, east to west subtracts 1 day).\n• Indian Standard Time (IST): Based on 82.5°E meridian passing through Prayagraj (UP, MP, Chhattisgarh, Odisha, Andhra Pradesh). Exactly 5 hr 30 min ahead of GMT.\n• Solstices & Equinoxes: Summer Solstice (21 June, longest day in Northern Hemisphere); Winter Solstice (22 Dec, shortest day); Equinoxes (21 March & 23 Sept, equal day and night).',
        examAngle: 'States through which IST (82.5°E) and Tropic of Cancer (23.5°N) pass.',
        trapAlert: 'Tropic of Cancer passes through 8 Indian states (Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram). IST passes through 5 states (UP, MP, CG, Odisha, AP).',
        highYieldTags: ['Tropic of Cancer 8 States', 'IST 82.5°E', 'Perihelion', 'SIAL SIMA NIFE', 'International Date Line'],
        referencePage: 'Pages 28-30'
      },
      {
        id: 'geo-02',
        topic: 'Geomorphology, Atmosphere & Climatology',
        subtopic: 'Rocks, Earthquakes, Atmospheric Layers & Planetary Winds',
        subject: 'Physical Geography',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Igneous/Sedimentary/Metamorphic rock transitions, Richter & Mercalli scales, Troposphere to Exosphere lapse rate, Trade winds & Roaring Forties.',
        detailedExplanation: '• Rocks: Igneous (solidified magma: Granite → Gneiss, Basalt → Greenstone); Sedimentary (layered: Limestone → Marble, Sandstone → Quartzite, Shale → Slate/Schist); Metamorphic.\n• Earthquakes: Focus (hypocenter, point of origin underground); Epicenter (point vertically above focus on Earth\'s surface). Magnitude on Richter scale (logarithmic); intensity on modified Mercalli scale.\n• Atmosphere Structure:\n  1. Troposphere (0–18 km): Contains 75% atmospheric gases; all weather phenomena occur here; normal lapse rate: temperature drops 6.5°C per km ascent.\n  2. Stratosphere (18–50 km): Contains Ozone layer (O3); ideal for jet aircraft; temperature increases with height.\n  3. Mesosphere (50–80 km): Coldest layer (-100°C); meteors burn here.\n  4. Ionosphere / Thermosphere (80–600 km): Reflects radio waves back to Earth.\n  5. Exosphere (>600 km): Magnetosphere, very low density gases.\n• Planetary Winds:\n  - Trade Winds: 30°N/S to Equatorial Low.\n  - Westerlies: 30° to 60° latitudes (known as Roaring Forties, Furious Fifties, Screaming Sixties in Southern Hemisphere).\n  - Local Winds: Chinook (Rockies, "snow eater"), Foehn (Alps), Sirocco (Sahara to Mediterranean, "blood rain"), Harmattan (West Africa, "Guinea Doctor"), Loo (North India).',
        examAngle: 'Layer where ozone resides (Stratosphere); wind nicknames (Roaring Forties, Chinook snow-eater).',
        trapAlert: 'Temperature drops in Troposphere and Mesosphere, but RISES in Stratosphere and Thermosphere.',
        highYieldTags: ['Stratosphere Ozone', 'Normal Lapse Rate', 'Chinook', 'Harmattan', 'Roaring Forties'],
        referencePage: 'Pages 31-34'
      },
      {
        id: 'geo-03',
        topic: 'Indian Physiography & Drainage Systems',
        subtopic: 'Himalayas, Ghats, Major River Systems, Waterfalls & Lakes',
        subject: 'Indian Geography',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Himalayan vs Peninsular rivers, Eastern vs Western Ghats, Bhangar vs Khadar alluvium, Highest peaks (K2 8611m, Kanchenjunga 8598m).',
        detailedExplanation: '• Northern Plains: Bhabar (pebble-studded porous belt along foothills where streams disappear) → Terai (marshy, damp, dense forest belt south of Bhabar) → Bhangar (older, less fertile alluvium) → Khadar (fresh annual fertile flood plain alluvium).\n• Coastal Plains: Western Coast (narrow, dissected, estuaries like Narmada/Tapi, high ports); Eastern Coast (broad, smooth, extensive deltas like Mahanadi, Godavari, Krishna, Cauvery).\n• Ghats: Western Ghats (continuous, average elevation 1200m; highest peak Anaimudi 2695m in Anamalai hills); Eastern Ghats (discontinuous, cut by rivers; highest peak Jindhagada 1690m).\n• Major Rivers:\n  - Indus System: Indus (origin near Mansarovar), Jhelum (Verinag), Chenab, Ravi (Rohtang), Beas, Sutlej (Rakas lake).\n  - Ganga System: Bhagirathi + Alaknanda at Devprayag; Yamuna, Son, Chambal (Vindhyas).\n  - Peninsular Rivers: West flowing into Arabian Sea (Narmada, Tapi, Sabarmati, Mahi, Luni); East flowing into Bay of Bengal (Godavari, Krishna, Cauvery, Mahanadi).\n• Famous Lakes: Sambhar Lake (Rajasthan, saline), Chilika (Odisha, largest brackish lagoon), Vembanad (Kerala, longest), Wular (J&K, largest freshwater tectonic lake), Lonar (Maharashtra, meteorite crater).',
        examAngle: 'Identify west flowing rivers; sequence of doabs (Bist, Bari, Rechna, Chaj, Sind Sagar).',
        trapAlert: 'Narmada and Tapi flow through rift valleys into the Arabian Sea and form ESTUARIES, NOT deltas.',
        highYieldTags: ['Bhabar Terai Khadar', 'Anaimudi 2695m', 'Sambhar Lake', 'Lonar Crater', 'Rift Valley Rivers'],
        referencePage: 'Pages 37-40'
      },
      {
        id: 'geo-04',
        topic: 'Soils, Natural Vegetation & Forest Classification',
        subtopic: '8 Soil Groups, Deciduous vs Evergreen Forests & Wildlife Sanctuaries',
        subject: 'Indian Geography',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Alluvial (potash rich, nitrogen poor), Black/Regur (iron/lime rich, self-ploughing for cotton), Tropical Moist Deciduous (20% India forest cover, Sal/Teak).',
        detailedExplanation: '• Soils in India (ICAR classification):\n  1. Alluvial Soil: Largest group (40%); rich in potash and lime, deficient in nitrogen and phosphorus; wheat, rice, sugarcane.\n  2. Black Soil (Regur): Deccan lava basalt; high moisture retentive, clayey, rich in iron, magnesium, calcium; ideal for cotton.\n  3. Red Soil: Formed on crystalline igneous rocks; deficient in nitrogen, phosphorus, humus.\n  4. Laterite Soil: High temperature & heavy leaching (Western Ghats, Meghalaya); rich in iron, poor in silica/lime; cashew, tea, coffee.\n  5. Desert / Arid Soil: Rajasthan; rich in soluble salts, deficient in organic matter/humus.\n• Natural Vegetation:\n  - Tropical Evergreen: Rainfall >200cm, Rosewood, Mahogany, Ebony, Bamboo (Western Ghats, NE India, A&N).\n  - Tropical Moist Deciduous: Rainfall 100–200cm; most widespread forest in India (covers ~20% of forest area); Teak, Sal, Sandalwood, Shisham.\n  - Tropical Dry Deciduous: Rainfall 70–100cm; Teak, Tendu, Palash, Khair.\n  - Thorn Forests: Rainfall <50cm; Khejri, Babool, Acacia (Rajasthan, Gujarat, SW Punjab).\n  - Mangroves: Sundarbans, delta mouths; breathing pneumatophores; Sundari tree.',
        examAngle: 'Which forest type occupies maximum percentage in India? Answer: Tropical Deciduous (Moist + Dry).',
        trapAlert: 'Black soil is self-ploughing because it develops deep fissures during dry summers.',
        highYieldTags: ['Regur Cotton Soil', 'Tropical Deciduous Forests', 'Khejri', 'Pneumatophores', 'Laterite Leaching'],
        referencePage: 'Pages 41-45'
      }
    ]
  },
  {
    id: 'indian-polity-constitution',
    domainName: 'Indian Polity & Constitutional Framework',
    domainNameHindi: 'भारतीय राजव्यवस्था एवं संविधान',
    iconName: 'Scale',
    description: 'Constituent Assembly, Preamble, Fundamental Rights, DPSP, President, Parliament, Judiciary, Emergency, PRIs & Constitutional Amendments.',
    totalBitsCount: 20,
    colorTheme: 'emerald',
    bits: [
      {
        id: 'pol-01',
        topic: 'Framing & Salient Features of Constitution',
        subtopic: 'Constituent Assembly, Borrowed Features & Preamble',
        subject: 'Indian Polity',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Idea by MN Roy (1934); Cabinet Mission Plan 1946; 2 yrs 11 mos 18 days; 42nd Amendment added "Socialist, Secular, Integrity" to Preamble.',
        detailedExplanation: '• Constituent Assembly: Set up May 1946 under Cabinet Mission Plan. Temporary Chairman: Sachchidananda Sinha; Permanent President: Dr. Rajendra Prasad (11 Dec 1946); Vice President: HC Mukherjee; Constitutional Advisor: Sir BN Rau. Drafting Committee Chairman: Dr. BR Ambedkar.\n• Time taken: 2 years, 11 months, 18 days. Adopted: 26 November 1949 (celebrated as Samvidhan Divas); Enforced: 26 January 1950 (commemorating 1930 Lahore Purna Swaraj day).\n• Borrowed Sources: UK (Rule of Law, Cabinet, Parliamentary system, Writs, Single Citizenship, CAG); USA (Preamble, Fundamental Rights, Judicial Review, Impeachment of President); Ireland (DPSP, Rajya Sabha nomination, Presidential election method); USSR (Fundamental Duties); Australia (Concurrent List, Joint Sitting of Parliament); Germany (Suspension of FR during Emergency); Canada (Federation with strong center, Residuary powers with Center); South Africa (Constitutional amendment procedure).\n• Preamble: Based on Jawaharlal Nehru\'s "Objectives Resolution" (moved 13 Dec 1946, adopted 22 Jan 1947). Declares India "Sovereign, Socialist, Secular, Democratic Republic". 42nd Amendment Act 1976 added: Socialist, Secular, Integrity. Kesavananda Bharati case (1973) held Preamble is an integral part of the Constitution and amendable subject to Basic Structure.',
        examAngle: 'Which country provided the concept of Concurrent List? (Australia). Can Preamble be amended? (Yes, under Art 368 without altering basic structure).',
        trapAlert: 'The words "Socialist", "Secular", and "Integrity" were NOT in the original 1950 Preamble; they were added by the 42nd Amendment in 1976.',
        highYieldTags: ['Objectives Resolution', '42nd Amendment 1976', 'Concurrent List Australia', 'BN Rau', 'Basic Structure'],
        referencePage: 'Pages 51-52'
      },
      {
        id: 'pol-02',
        topic: 'Fundamental Rights & Writs (Articles 12–35)',
        subtopic: 'Articles 14 to 32, 5 Prerogative Writs & Emergency Exceptions',
        subject: 'Indian Polity',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Part III Magna Carta. Articles 14–18 (Equality), 19–22 (Freedom), 21A (Education), 23–24 (Exploitation), 25–28 (Religion), 29–30 (Minorities), 32 (Constitutional Remedies / Heart & Soul).',
        detailedExplanation: '• Key Articles:\n  - Art 14: Equality before law and equal protection of laws.\n  - Art 15: Prohibition of discrimination on grounds of religion, race, caste, sex, place of birth.\n  - Art 16: Equality of opportunity in public employment.\n  - Art 17: Abolition of Untouchability (absolute right).\n  - Art 18: Abolition of titles.\n  - Art 19: 6 freedoms (speech, assembly, association, movement, residence, profession). Freedom of press is implicit in 19(1)(a).\n  - Art 20: Protection in respect of conviction for offences (no ex-post facto law, no double jeopardy, no self-incrimination).\n  - Art 21: Protection of life and personal liberty. Expansive interpretation in Menaka Gandhi case (1978).\n  - Art 21A: Right to free and compulsory education (6–14 yrs) inserted by 86th CAA 2002.\n  - Art 23: Prohibition of human trafficking and forced labour (Begar).\n  - Art 24: Prohibition of child labour under 14 in factories/mines.\n  - Art 32: Right to Constitutional Remedies (Dr. Ambedkar called it "Heart and Soul of the Constitution").\n• 5 Prerogative Writs (SC under Art 32; HC under Art 226):\n  1. Habeas Corpus ("You may have the body") against unlawful detention.\n  2. Mandamus ("We Command") to perform public duty.\n  3. Certiorari ("To be certified") to quash lower court orders lacking jurisdiction.\n  4. Prohibition: To prohibit lower court from proceeding beyond jurisdiction.\n  5. Quo-Warranto ("By what authority") against illegal usurper of public office.\n• Non-suspendable: Articles 20 and 21 CANNOT be suspended even during National Emergency (Art 352 via 44th CAA 1978). Right to Property deleted from Part III by 44th CAA 1978 and made legal right under Art 300A.',
        examAngle: 'Which fundamental rights cannot be suspended during Article 352? (Articles 20 and 21). Which writ is issued against usurpation of public office? (Quo-Warranto).',
        trapAlert: 'High Court writ jurisdiction under Article 226 is WIDER than Supreme Court under Article 32 (HC can issue writs for legal rights too, SC only for Fundamental Rights).',
        highYieldTags: ['Article 32', 'Habeas Corpus', 'Articles 20 and 21', 'Article 21A', 'Article 300A'],
        referencePage: 'Page 53'
      },
      {
        id: 'pol-03',
        topic: 'Directive Principles & Fundamental Duties',
        subtopic: 'Part IV (Articles 36–51) & Part IVA (Article 51A)',
        subject: 'Indian Polity',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'DPSP: Non-justiciable instruments of instructions for Welfare State. Fundamental Duties: 11 duties added by 42nd CAA (Swaran Singh) & 86th CAA (86th added 11th duty).',
        detailedExplanation: '• DPSP (Part IV, Art 36–51, Irish origin):\n  - Art 38: State to secure a social order for promotion of welfare of people.\n  - Art 39A: Equal justice and free legal aid.\n  - Art 40: Organization of Village Panchayats.\n  - Art 41: Right to work, education, and public assistance.\n  - Art 42: Just and humane conditions of work and maternity relief.\n  - Art 43: Living wage for workers; Art 43B (cooperative societies, added by 97th CAA).\n  - Art 44: Uniform Civil Code (UCC).\n  - Art 45: Early childhood care below 6 years.\n  - Art 47: Nutrition, public health, prohibition of intoxicating drinks.\n  - Art 48: Agriculture and animal husbandry; Art 48A: Protect environment, forests, wildlife.\n  - Art 50: Separation of Judiciary from Executive.\n  - Art 51: Promotion of international peace and security.\n• Fundamental Duties (Part IVA, Art 51A, USSR origin):\n  - Recommended by Sardar Swaran Singh Committee; inserted by 42nd CAA 1976 (10 duties).\n  - 11th duty added by 86th CAA 2002: Duty of parent/guardian to provide educational opportunities to child between 6 and 14 years.',
        examAngle: 'Article 40 (Panchayats), Article 44 (UCC), Article 50 (Separation of powers); Swaran Singh Committee.',
        trapAlert: 'Fundamental Duties are non-enforceable by courts by default (non-justiciable), similar to DPSPs, unless backed by specific parliamentary statutes.',
        highYieldTags: ['Article 44 UCC', 'Article 40 Panchayats', 'Article 50', 'Swaran Singh Committee', 'Article 51A(k)'],
        referencePage: 'Page 54'
      },
      {
        id: 'pol-04',
        topic: 'The President, Governor & Council of Ministers',
        subtopic: 'Executive Powers, Pardoning (Art 72 vs 161), Ordinance (123 vs 213) & Vetoes',
        subject: 'Indian Polity',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'President elected by Electoral College (MPs + MLAs, NOT MLCs). Impeachment under Art 61. Pardoning power (Art 72 President vs Art 161 Governor). Ordinance power (Art 123 vs Art 213).',
        detailedExplanation: '• President (Art 52–62):\n  - Electoral College: Elected members of Lok Sabha, Rajya Sabha, and State Legislative Assemblies (including Delhi & Puducherry). Nominated members and State Legislative Councils (MLCs) DO NOT vote!\n  - Impeachment (Art 61): Quasi-judicial; initiated in either House (1/4th notice, 2/3rd majority of TOTAL membership). Nominated members CAN vote in impeachment!\n  - Pardoning Power (Art 72): Can pardon, reprieve, respite, remit, or commute death sentences; can pardon court-martial sentences (Governor cannot pardon death or court-martial under Art 161).\n  - Ordinance Making (Art 123): Only when either/both Houses not in session; must be approved within 6 weeks of reassembly.\n  - Veto Powers: Absolute, Suspensive, Pocket Veto (no Qualified Veto in India; Gyani Zail Singh exercised pocket veto on Indian Post Office Amendment Bill in 1986).\n• Governor (Art 153–163):\n  - Appointed by President under Art 155; holds office during the pleasure of President.\n  - Discretionary powers under Article 163 are wider than President and cannot be questioned in courts.\n  - Ordinance power under Article 213 during legislative recess.\n• Council of Ministers (Art 74 & 75): Collectively responsible to Lok Sabha (Art 75(3)). Minister must become member of either house within 6 months.',
        examAngle: 'Who votes in Presidential election vs Impeachment? Does Governor have power to pardon death sentence?',
        trapAlert: 'Governor under Article 161 can SUSPEND, REMIT or COMMUTE a death sentence, but CANNOT PARDON it (only the President can pardon death sentences under Article 72).',
        highYieldTags: ['Article 61 Impeachment', 'Article 72 vs 161', 'Article 123 vs 213', 'Collective Responsibility', 'Pocket Veto'],
        referencePage: 'Pages 54-56'
      },
      {
        id: 'pol-05',
        topic: 'Parliament, Supreme Court & High Courts',
        subtopic: 'Lok Sabha, Rajya Sabha, Money Bills, Supreme Court Jurisdiction (Art 131, 136, 143)',
        subject: 'Indian Polity',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Rajya Sabha permanent house (1/3rd retire every 2 yrs). Money Bill (Art 110) introduced ONLY in Lok Sabha; RS has 14 days. SC Sanctioned strength 34; retirement age 65.',
        detailedExplanation: '• Rajya Sabha (Art 80): Max strength 250 (current 245); 12 nominated by President. Permanent body, not subject to dissolution; tenure 6 years, 1/3rd retire every 2nd year. Special powers: Art 249 (legislate on State List), Art 312 (create All India Services).\n• Lok Sabha (Art 81): Max 552 (Anglo-Indian nomination abolished by 104th CAA 2020). Normal tenure 5 years.\n• Money Bill (Art 110): Speaker certifies whether a bill is Money Bill (final decision). Introduced only in Lok Sabha on President recommendation. Rajya Sabha cannot reject or amend, can only delay for 14 days.\n• Parliamentary Terms: Quorum = 10% of total strength (Art 100). Question Hour (1st hour, Starred = oral + supplementaries, Unstarred = written). Zero Hour (Indian innovation, starts at 12 noon without formal notice).\n• Supreme Court of India (Inaugurated 28 Jan 1950): Current strength 34 (CJI + 33). Retirement age 65. Removal by Parliament (special majority: 2/3rd present and voting + majority of total membership on proved misbehaviour/incapacity).\n  - Original Jurisdiction (Art 131): Federal disputes between Centre vs States or State vs State.\n  - Appellate Jurisdiction (Art 132–134) & Special Leave Petition (Art 136).\n  - Advisory Jurisdiction (Art 143): President seeks opinion from SC on question of law/fact.\n  - Court of Record (Art 129): Power to punish for its contempt.\n• High Courts (Art 214–232): 25 High Courts in India. Oldest: Calcutta HC (1862). Retirement age of HC judge: 62 years.',
        examAngle: 'Money bill 14-day limit for Rajya Sabha; Article 131 federal disputes original jurisdiction; Article 143 advisory jurisdiction.',
        trapAlert: 'Retirement age of Supreme Court judge is 65 years, whereas High Court judge is 62 years.',
        highYieldTags: ['Money Bill Art 110', 'Article 131 Original Jurisdiction', 'Article 143 Advisory', 'Quorum 10%', 'All India Services Art 312'],
        referencePage: 'Pages 57-60'
      },
      {
        id: 'pol-06',
        topic: 'Constitutional Bodies & Major Amendments',
        subtopic: 'CAG, ECI, Finance Commission, Article 368 & Landmark Amendments',
        subject: 'Indian Polity',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'CAG (Art 148, Guardian of Public Purse), ECI (Art 324), Finance Commission (Art 280), 42nd/44th/73rd/86th/91st/101st/103rd/104th Amendments.',
        detailedExplanation: '• Constitutional Bodies:\n  - CAG (Art 148): Appointed by President; removed only like a Supreme Court judge; ineligible for further office; audits Centre & States; submits report to President/Governor; friend, philosopher and guide to PAC.\n  - Election Commission of India (Art 324): 1 CEC + 2 ECs. Conducts elections to Parliament, State Legislatures, President, VP. (Local bodies conducted by State Election Commission!). First CEC: Sukumar Sen.\n  - Finance Commission (Art 280): Quasi-judicial body appointed every 5 years by President (Chairman + 4 members). 15th FC chaired by NK Singh.\n• Article 368 (Amendment of Constitution):\n  1. Special Majority (2/3rd present & voting + 50% total membership).\n  2. Special Majority + ratification by 50% state legislatures for federal matters.\n  - Kesavananda Bharati (1973): Parliament can amend any provision but CANNOT violate Basic Structure.\n• Landmark Amendments:\n  - 42nd CAA 1976 ("Mini-Constitution"): Added Socialist, Secular, Integrity; Fundamental Duties; curtailed judicial review.\n  - 44th CAA 1978: Restored civil liberties; replaced "Internal Disturbance" with "Armed Rebellion" in Art 352; deleted Right to Property from Part III.\n  - 73rd & 74th CAA 1992: Constitutionalized Panchayati Raj (Part IX, 11th Sched) and Municipalities (Part IXA, 12th Sched).\n  - 86th CAA 2002: Inserted Art 21A (Right to Education).\n  - 91st CAA 2003: Limited Council of Ministers to 15% of Lok Sabha/Assembly strength; strengthened Anti-Defection law.\n  - 101st CAA 2016: Goods and Services Tax (GST).\n  - 103rd CAA 2019: 10% reservation for Economically Weaker Sections (EWS).\n  - 104th CAA 2020: Extended SC/ST seat reservation to 80 years; abolished Anglo-Indian nomination in Lok Sabha/Assemblies.',
        examAngle: 'Which amendment introduced 15% ceiling on ministers? (91st CAA). Under which article is Finance Commission appointed? (Art 280).',
        trapAlert: 'The 91st CAA 2003 capped the size of Council of Ministers at 15% of the LOWER HOUSE (Lok Sabha / Legislative Assembly), NOT the total Parliament.',
        highYieldTags: ['91st CAA 15% Limit', 'Article 280 Finance Commission', 'Article 148 CAG', '103rd CAA EWS', '101st GST'],
        referencePage: 'Pages 61-64'
      }
    ]
  },
  {
    id: 'indian-economy-development',
    domainName: 'Indian Economy & Macroeconomics',
    domainNameHindi: 'भारतीय अर्थव्यवस्था एवं समष्टि अर्थशास्त्र',
    iconName: 'TrendingUp',
    description: 'National Income (GDP, GNP, NNP), Planning History, NITI Aayog, Five Year Plans, Banking & RBI Monetary Policy, Inflation & Fiscal Terms.',
    totalBitsCount: 16,
    colorTheme: 'cyan',
    bits: [
      {
        id: 'econ-01',
        topic: 'National Income & Structural Composition',
        subtopic: 'GDP, NDP, GNP, NNP at Factor Cost, Sectors & HDI',
        subject: 'Indian Economy',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'GDP vs GNP (Net Factor Income from Abroad); NNP at factor cost = National Income; 3 sectors (Primary, Secondary, Tertiary); HDI 3 dimensions.',
        detailedExplanation: '• Measures of National Income:\n  - GDP (Gross Domestic Product): Total market value of all final goods and services produced within the domestic territory in a financial year.\n  - NDP (Net Domestic Product): GDP − Depreciation (loss of asset value due to wear and tear).\n  - GNP (Gross National Product): GDP + NFIA (Net Factor Income from Abroad earned by citizens minus foreigners domestically).\n  - NNP at Factor Cost: NNP at Market Price − Indirect Taxes + Subsidies = True National Income of India.\n• Sectors of Economy: Primary (Agriculture, forestry, mining ~17% GDP, ~45-50% employment); Secondary (Manufacturing, electricity, construction); Tertiary (Services ~54% GDP).\n• Human Development Index (HDI): Formulated by Mahbub-ul-Haq (Pakistan) and Amartya Sen; published annually by UNDP since 1990. 3 Dimensions: 1. Life Expectancy at Birth, 2. Education (Mean years + Expected years of schooling), 3. GNI per capita (PPP $).',
        examAngle: 'National Income formula: NNP at Factor Cost. Difference between GDP and GNP: NFIA.',
        trapAlert: 'Depreciation is deducted to get NET (NDP/NNP) from GROSS (GDP/GNP). Factor cost adds subsidies and subtracts indirect taxes from market price.',
        highYieldTags: ['NNP at Factor Cost', 'Depreciation', 'HDI 3 Dimensions', 'Mahbub-ul-Haq', 'Tertiary Sector'],
        referencePage: 'Pages 65-67'
      },
      {
        id: 'econ-02',
        topic: 'Economic Planning & Five Year Plans',
        subtopic: 'Planning Commission, NITI Aayog, Harrod-Domar & Mahalanobis Models',
        subject: 'Indian Economy',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Planning Commission set up March 1950 (Jawaharlal Nehru); replaced by NITI Aayog on 1 Jan 2015. 1st Plan (Harrod-Domar), 2nd Plan (Mahalanobis heavy industries).',
        detailedExplanation: '• Historical Plans: Planned Economy for India (1934, M. Visvesvaraya); National Planning Committee (1938, Nehru); Bombay Plan (1944, 8 industrialists); Gandhian Plan (1944, SN Agarwal); People\'s Plan (1945, MN Roy); Sarvodaya Plan (1950, JP Narayan).\n• Planning Commission (1950–2014): Extra-constitutional, advisory body created by Cabinet resolution. 1st Deputy Chairman: Gulzarilal Nanda.\n• Key Five Year Plans:\n  - 1st Plan (1951–56): Harrod-Domar model; focus on agriculture, irrigation (Bhakra-Nangal, Hirakud, DVC).\n  - 2nd Plan (1956–61): PC Mahalanobis heavy industries model (Rourkela, Bhilai, Durgapur steel plants).\n  - 3rd Plan (1961–66): Failure due to Indo-China (1962), Indo-Pak (1965) wars & severe drought. Led to "Plan Holiday" (1966–69).\n  - 4th Plan (1969–74): Growth with stability; nationalization of 14 banks (1969); 1971 war.\n  - 5th Plan (1974–78): "Garibi Hatao" (removal of poverty); terminated early by Janata Govt (Rolling Plan 1978–80).\n  - 12th Plan (2012–17): Last FYP; theme: "Faster, Sustainable and More Inclusive Growth".\n• NITI Aayog (Est. 1 January 2015): "National Institution for Transforming India". Think-tank based on bottom-up cooperative federalism. Chairperson: Prime Minister.',
        examAngle: 'Identify model of 1st Plan (Harrod-Domar) vs 2nd Plan (Mahalanobis); NITI Aayog establishment date (1 Jan 2015).',
        trapAlert: 'Neither Planning Commission nor NITI Aayog is a Constitutional or Statutory body; both were created by Executive Cabinet resolutions.',
        highYieldTags: ['Harrod-Domar', 'Mahalanobis Model', 'NITI Aayog 1 Jan 2015', 'Plan Holiday 1966-69', 'Garibi Hatao'],
        referencePage: 'Pages 65-66'
      },
      {
        id: 'econ-03',
        topic: 'Banking, RBI & Monetary Policy Instruments',
        subtopic: 'RBI Functions, Quantitative Tools (CRR, SLR, Repo, Reverse Repo) & Nationalization',
        subject: 'Indian Economy',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'RBI established 1935 (Hilton Young Commission, RBI Act 1934); nationalized 1949; 1st Indian Governor CD Deshmukh. Repo vs Reverse Repo rates.',
        detailedExplanation: '• History of Banking: Bank of Hindustan (1770, first bank in India); Oudh Commercial Bank (1881, first with limited liability under Indian board); Punjab National Bank (1894, first purely Indian bank). Bank Nationalization: 14 major commercial banks nationalized on 19 July 1969; 6 more on 15 April 1980.\n• RBI Functions: Monetary authority, issuer of currency, banker to government, banker\'s bank, custodian of foreign exchange reserves.\n• Quantitative Credit Control Instruments:\n  1. Bank Rate: Rate at which RBI lends long-term funds to commercial banks without collateral.\n  2. Cash Reserve Ratio (CRR): Percentage of Net Demand and Time Liabilities (NDTL) banks must park as cash with RBI (no interest paid).\n  3. Statutory Liquidity Ratio (SLR): Percentage of NDTL banks must maintain in liquid assets (cash, gold, approved government securities) with themselves.\n  4. Repo Rate: Rate at which RBI lends short-term money to commercial banks against government securities (repurchase agreement). Increasing repo rate curtails inflation!\n  5. Reverse Repo Rate: Rate at which commercial banks park short-term surplus funds with RBI (absorbs market liquidity).\n• Qualitative Tools: Margin requirements, consumer credit regulation, credit rationing, moral suasion.',
        examAngle: 'How does an increase in Repo Rate affect inflation? (Curbs inflation by making borrowing costlier and reducing money supply).',
        trapAlert: 'CRR is kept with the RBI in cash; SLR is kept with the commercial bank itself in cash, gold, or approved securities.',
        highYieldTags: ['Repo Rate', 'Reverse Repo Rate', 'CRR vs SLR', '1969 Bank Nationalisation', 'CD Deshmukh'],
        referencePage: 'Pages 70-71'
      },
      {
        id: 'econ-04',
        topic: 'Agricultural Revolutions & Key Economic Terms',
        subtopic: 'Green Revolution, Blue/Pink/White/Yellow, BoP & Tax Structure',
        subject: 'Indian Economy',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Green Revolution (MS Swaminathan, HYV seeds), White (Verghese Kurien, Milk), Blue (Fish), Yellow (Oilseeds). Direct vs Indirect taxes & GST.',
        detailedExplanation: '• Agricultural Revolutions:\n  - Green Revolution (1966–68): Dr. MS Swaminathan ("Father in India"); Norman Borlaug (World Father); HYV Mexican dwarf wheat & rice seeds, irrigation, fertilizers.\n  - White Revolution (Operation Flood 1970): Dr. Verghese Kurien; dairy and milk production.\n  - Blue Revolution: Fish & marine production.\n  - Golden Fibre Revolution: Jute.\n  - Yellow Revolution: Oilseeds.\n  - Pink Revolution: Onion / Pharmaceuticals / Prawn.\n  - Red Revolution: Meat / Tomato.\n  - Silver Revolution: Egg / Poultry.\n• Key Economic Terms:\n  - Balance of Payments (BoP): Systematic accounting record of all economic transactions between residents of a country and the rest of the world (Current Account + Capital Account).\n  - Balance of Trade (BoT): Merchandise Exports minus Merchandise Imports.\n  - Inflation: Sustained general increase in price levels over time (Headline CPI vs Core CPI).\n  - Fiscal Policy: Government taxation, expenditure, and borrowing policies managed by Ministry of Finance.\n  - GST (Goods & Services Tax): Destination-based comprehensive indirect tax implemented 1 July 2017 (101st CAA).',
        examAngle: 'Matching agricultural revolutions with commodities; difference between BoP and BoT.',
        trapAlert: 'Golden Revolution relates to Fruits/Honey/Horticulture, while Golden FIBRE Revolution relates specifically to Jute.',
        highYieldTags: ['MS Swaminathan', 'Operation Flood', 'BoP vs BoT', 'GST 1 July 2017', 'Golden Fibre Jute'],
        referencePage: 'Pages 68, 72, 74'
      }
    ]
  },
  {
    id: 'general-science-physics-chem-bio',
    domainName: 'General Science & Applied Technology',
    domainNameHindi: 'सामान्य विज्ञान एवं अनुप्रयोग',
    iconName: 'Atom',
    description: 'Newton\'s Laws, Light & Optics, Chemical Bonds, Acids/Bases, Polymers, Cell Biology, Human Physiology, Vitamins & Infectious Diseases.',
    totalBitsCount: 22,
    colorTheme: 'purple',
    bits: [
      {
        id: 'sci-01',
        topic: 'Physics: Mechanics, Gravitation & Heat',
        subtopic: 'Newton\'s Laws, Escape Velocity, Pascal\'s Law, Archimedes & Anomalous Expansion',
        subject: 'General Science',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Escape velocity of Earth = 11.2 km/s, Moon = 2.4 km/s. Anomalous expansion of water: max density at 4°C. Pascal\'s law in hydraulic brakes.',
        detailedExplanation: '• Newton\'s Laws: 1st Law (Law of Inertia - why passengers jerk forward when bus stops); 2nd Law (F = ma); 3rd Law (Action-Reaction - recoil of gun, rocket propulsion).\n• Gravitation: g = 9.8 m/s² on Earth surface. g is maximum at poles and minimum at equator; decreases with altitude and depth. Gravity on Moon = 1/6th of Earth. Escape velocity: Earth = 11.2 km/s; Moon = 2.4 km/s (hence Moon has no atmosphere).\n• Satellites: Geostationary satellite revolves at ~36,000 km in equatorial plane from West to East with 24h orbital period ("Parking Orbit"). Polar satellite revolves at ~800 km in ~84 mins.\n• Fluid Mechanics:\n  - Pascal\'s Law: Pressure exerted on confined liquid is transmitted undiminished in all directions (hydraulic lift, hydraulic brakes).\n  - Archimedes\' Principle: Loss in weight of body submerged equals weight of fluid displaced (floatation of ships, hydrometer).\n  - Surface Tension: Tendency to minimize surface area (spherical raindrop, insect walking on water, kerosene sinking mosquito larvae).\n  - Capillarity: Blotting paper soaking ink, lantern wick drawing oil.\n• Heat: -40° is the temperature where Celsius and Fahrenheit scales match. Water contracts upon heating from 0°C to 4°C and expands above 4°C; maximum density of water is at 4°C (anomalous expansion enables aquatic life survival in frozen lakes).',
        examAngle: 'At what temperature are Celsius and Fahrenheit scales equal? (-40°). Why do lakes freeze from the top down? (Anomalous expansion at 4°C).',
        trapAlert: 'G (universal gravitational constant) is invariant everywhere, but g (acceleration due to gravity) changes with location, height, and depth.',
        highYieldTags: ['-40 Degrees Equal', 'Escape Velocity 11.2 km/s', 'Water Density 4C', 'Pascal Law Brakes', 'Geostationary 36000km'],
        referencePage: 'Pages 75-79'
      },
      {
        id: 'sci-02',
        topic: 'Physics: Optics, Waves & Electricity',
        subtopic: 'TIR, Eye Defects, Sound Frequencies, Doppler Effect & Ohm\'s Law',
        subject: 'General Science',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Total Internal Reflection (sparkling diamond, optical fibers, mirages). Audible sound: 20 Hz to 20,000 Hz. Myopia corrected by concave lens; Hypermetropia by convex lens.',
        detailedExplanation: '• Light Phenomena:\n  - Reflection: Angle of incidence = angle of reflection. Plane mirror requires minimum half person\'s height to see full image.\n  - Refraction: Bending of light when passing between media (twinkling of stars due to atmospheric refraction).\n  - Total Internal Reflection (TIR): Occurs when light travels from denser to rarer medium at angle of incidence > critical angle. Applications: Optical fiber telecommunication, endoscopy, brilliance of cut diamond, desert mirages.\n  - Dispersion: Splitting of white light through prism into VIBGYOR (Red has maximum wavelength, Violet has minimum wavelength).\n  - Scattering: Blue color of sky and red color of sunrise/sunset (Rayleigh scattering: scattering proportional to 1/λ⁴; violet/blue scattered most).\n• Human Eye & Defects:\n  - Least distance of distinct vision = 25 cm. Image formed on retina is real and inverted.\n  - Myopia (Short-sightedness): Distant objects blurry; corrected with Concave lens (diverging).\n  - Hypermetropia (Long-sightedness): Near objects blurry; corrected with Convex lens (converging).\n  - Presbyopia: Age-related loss of accommodation; corrected with Bifocal lens.\n  - Astigmatism: Blurred horizontal/vertical vision; corrected with Cylindrical lens.\n• Sound Waves:\n  - Longitudinal mechanical wave. Audible range: 20 Hz to 20,000 Hz (<20 Hz Infrasonic, >20,000 Hz Ultrasonic used in SONAR and bats).\n  - Speed of sound: Maximum in solids, intermediate in liquids, lowest in gases. Sound cannot travel through vacuum!\n  - Doppler Effect: Apparent shift in frequency when source and observer are in relative motion.\n• Electricity: Ohm\'s law (V = IR). Ammeter connected in series (ideal resistance = 0); Voltmeter connected in parallel (ideal resistance = infinite). Fuse wire made of lead-tin alloy with low melting point.',
        examAngle: 'Lens used for Myopia (Concave) vs Hypermetropia (Convex); working principle of optical fibers (TIR).',
        trapAlert: 'Light is a transverse electromagnetic wave that travels in vacuum; sound is a longitudinal mechanical wave that CANNOT travel in vacuum.',
        highYieldTags: ['Total Internal Reflection', 'Myopia Concave Lens', 'Optical Fiber', 'Audible 20-20000Hz', 'Fuse Wire Lead-Tin'],
        referencePage: 'Pages 80-83'
      },
      {
        id: 'sci-03',
        topic: 'Chemistry: Everyday Compounds & Polymers',
        subtopic: 'Acids, Bases, Salts, Cement, Plaster of Paris, Synthetic Fibres & Batteries',
        subject: 'General Science',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Plaster of Paris (CaSO4·½H2O), Gypsum (CaSO4·2H2O), Baking Soda (NaHCO3), Washing Soda (Na2CO3·10H2O), Bleaching Powder (CaOCl2).',
        detailedExplanation: '• Everyday Chemical Compounds:\n  - Plaster of Paris (POP): Calcium sulphate hemihydrate (CaSO4·½H2O), produced by heating Gypsum (CaSO4·2H2O) at 373 K. Used for bone fracture casts and statuary.\n  - Portland Cement: Mixture of calcium silicates and aluminates. Gypsum is deliberately added to cement to RETARD/SLOW DOWN setting rate.\n  - Baking Soda: Sodium bicarbonate (NaHCO3).\n  - Washing Soda: Sodium carbonate decahydrate (Na2CO3·10H2O).\n  - Bleaching Powder: Calcium oxychloride (CaOCl2).\n  - Quick Lime: Calcium oxide (CaO); Slaked Lime: Calcium hydroxide (Ca(OH)2).\n  - Caustic Soda: Sodium hydroxide (NaOH); Caustic Potash: Potassium hydroxide (KOH).\n  - Laughing Gas: Nitrous oxide (N2O).\n  - Marsh Gas: Methane (CH4).\n• Polymers & Synthetic Fibres:\n  - Nylon-6,6: Adipic acid + Hexamethylene diamine (synthetic bristles, parachutes).\n  - Terylene / Dacron: Ethylene glycol + Terephthalic acid.\n  - Kevlar: Terephthalic acid + 1,4-diamino benzene (bulletproof vests).\n  - Lexan / Polycarbonate: Bulletproof windows and helmets.\n• Fuels: LPG (Butane + Propane; ethyl mercaptan odorant added for leak detection); CNG (Methane ~95%); Water Gas (CO + H2); Producer Gas (CO + N2).\n• Water Hardness: Temporary hardness (calcium/magnesium bicarbonates, removed by boiling or Clark\'s process Ca(OH)2); Permanent hardness (chlorides and sulphates of Ca/Mg, removed by washing soda or Calgon).',
        examAngle: 'Chemical formula of Plaster of Paris vs Gypsum; purpose of adding gypsum to cement (slows setting rate).',
        trapAlert: 'Gypsum (2 H2O) is heated to form Plaster of Paris (½ H2O). Adding gypsum to cement DELAYS setting, it does NOT accelerate it.',
        highYieldTags: ['Plaster of Paris CaSO4', 'Gypsum Retards Setting', 'Ethyl Mercaptan LPG', 'Kevlar Bulletproof', 'Baking Soda NaHCO3'],
        referencePage: 'Pages 87-91'
      },
      {
        id: 'sci-04',
        topic: 'Biology: Cell, Vitamins & Human Physiology',
        subtopic: 'Cell Organelles, Fat vs Water Soluble Vitamins, Blood Groups & Enzymes',
        subject: 'General Science',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Fat soluble vitamins (A, D, E, K), Water soluble (B-complex, C). Universal donor (O-negative), Universal recipient (AB-positive). Nephron in kidney.',
        detailedExplanation: '• The Cell: Cell theory by Schleiden & Schwann (1838). Prokaryotes (lack nuclear membrane, bacteria) vs Eukaryotes (membrane bound organelles, plants/animals). DNA (bases: Adenine, Thymine, Guanine, Cytosine) vs RNA (Thymine replaced by Uracil).\n• Vitamins & Deficiency Diseases:\n  - Fat Soluble:\n    * Vitamin A (Retinol): Night blindness (Nyctalopia), Xerophthalmia.\n    * Vitamin D (Calciferol): Rickets in children, Osteomalacia in adults.\n    * Vitamin E (Tocopherol): Sterility, mild anaemia (antioxidant).\n    * Vitamin K (Phylloquinone): Delayed blood clotting (synthesized by gut bacteria).\n  - Water Soluble:\n    * Vitamin B1 (Thiamine): Beri-Beri (cardiac/nerve weakness).\n    * Vitamin B2 (Riboflavin): Cheilosis, cracked skin.\n    * Vitamin B3 (Niacin): Pellagra (4Ds: Dermatitis, Diarrhea, Dementia, Death).\n    * Vitamin B12 (Cyanocobalamin): Pernicious anaemia (contains Cobalt; absent in plant foods!).\n    * Vitamin C (Ascorbic acid): Scurvy, bleeding gums, delayed wound healing.\n• Human Systems:\n  - Digestive Enzymes: Salivary amylase (mouth, starch → disaccharides); Pepsin (stomach, proteins → peptides); Trypsin/Chymotrypsin (pancreas, small intestine); Lipase (emulsified fats → fatty acids).\n  - Blood & Circulation: Plasma (60%) + Formed elements (40%). RBCs (non-nucleated, hemoglobin). Blood Groups (ABO by Landsteiner): Group O has no antigens (universal donor); Group AB has no antibodies (universal recipient). Rh factor in erythroblastosis fetalis. Pacemaker = SA Node (Sino-Atrial Node in right atrium).\n  - Excretion: Structural unit is Nephron. Urine yellow color due to Urochrome pigment. Urea converted from toxic ammonia in liver.',
        examAngle: 'Which vitamin contains Cobalt? (B12). Blood group universal donor (O). Vitamin deficiency causing Pellagra (Niacin/B3) and Beri-Beri (Thiamine/B1).',
        trapAlert: 'Vitamin B12 is cyanocobalamin (contains Cobalt metal) and is virtually absent in purely plant-based vegetarian foods.',
        highYieldTags: ['Vitamin B12 Cobalt', 'Pellagra Niacin B3', 'Vitamin K Clotting', 'Universal Donor O', 'SA Node Pacemaker'],
        referencePage: 'Pages 92-95'
      },
      {
        id: 'sci-05',
        topic: 'Biology: Pathogens, Vaccines & Biotechnology',
        subtopic: 'Viral vs Bacterial Diseases, Vaccines Discoverers & Transgenic Bt Crops',
        subject: 'General Science',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Bacterial (TB, Cholera, Typhoid, Tetanus) vs Viral (Polio, Rabies, Measles, Dengue). Edward Jenner (Smallpox 1786), Alexander Fleming (Penicillin 1928), Bt Cotton.',
        detailedExplanation: '• Human Diseases by Pathogens:\n  - Bacterial: Tuberculosis (Mycobacterium tuberculosis, BCG vaccine), Cholera (Vibrio cholerae), Typhoid (Salmonella typhi, Widal test), Tetanus/Lockjaw (Clostridium tetani, ATS/DPT), Diphtheria (Corynebacterium diphtheriae, DPT), Plague (Yersinia/Pasteurella pestis).\n  - Viral: Poliomyelitis (Polio virus, Salk injectable & Sabin oral vaccine), Rabies (Rhabdovirus, hydrophobia), Dengue (Flavivirus, Aedes aegypti vector), Chikungunya (Alphavirus), Chickenpox (Varicella zoster).\n  - Fungal: Ringworm, Athlete\'s foot (Trichophyton).\n• Historical Discoveries:\n  - Smallpox Vaccine: Edward Jenner (1786, father of immunology).\n  - Rabies & Cholera Vaccine: Louis Pasteur (1880).\n  - Penicillin: Alexander Fleming (1928, Penicillium notatum).\n  - Polio Salk (1954) & Oral Sabin (1995).\n  - Blood Circulation: William Harvey (1628).\n• Biotechnology & Genetics:\n  - Recombinant DNA technology & Gene therapy.\n  - Bt Crops: Bacillus thuringiensis soil bacterium gene cloned into plants producing endotoxin crystals lethal to bollworms (Bt Cotton first approved GM crop in India).\n  - First Mammal Clone: Dolly the sheep cloned by Ian Wilmut (1996, Roslin Institute, UK).\n  - First Test Tube Baby: Louise Joy Brown (1978, UK); India\'s first test tube baby: Harsha (1986, Mumbai) / Durga (Kanupriya Agarwal by Subhash Mukhopadhyay 1978).',
        examAngle: 'Distinguish between bacterial vs viral disease (e.g. Typhoid is bacterial, Dengue is viral); father of vaccination (Edward Jenner).',
        trapAlert: 'Antibiotics kill BACTERIA and fungi; they are completely INEFFECTIVE against viruses like Influenza, Dengue, or COVID-19.',
        highYieldTags: ['Edward Jenner 1786', 'Alexander Fleming Penicillin', 'BCG Tuberculosis', 'Bt Cotton', 'Dolly the Sheep'],
        referencePage: 'Pages 96-100'
      }
    ]
  },
  {
    id: 'general-knowledge-superlatives',
    domainName: 'GK Superlatives, Institutions & Defense',
    domainNameHindi: 'सामान्य ज्ञान, संस्थान, रक्षा एवं विविध',
    iconName: 'Shield',
    description: 'International Organizations, Indian Defense Commands, Missiles, Bharat Ratna, Superlatives of India & World, Census & Books.',
    totalBitsCount: 18,
    colorTheme: 'teal',
    bits: [
      {
        id: 'gk-01',
        topic: 'Indian Defense Forces, Commands & Missiles',
        subtopic: 'Army/Navy/Air Force HQs, Tri-Service Command, IGMDP Missiles & Paramilitary',
        subject: 'Defense & Security',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Only Tri-Service Command is Andaman & Nicobar Command (Port Blair). Missiles: Prithvi (SRBM), Agni (IRBM/ICBM), BrahMos (Supersonic Cruise), Nag (Anti-tank).',
        detailedExplanation: '• Armed Forces Commands:\n  - Army (7 Commands): Central (Lucknow), Eastern (Kolkata), Northern (Udhampur), Southern (Pune), Western (Chandigarh), South-Western (Jaipur), Training (Shimla).\n  - Air Force (7 Commands): Central (Prayagraj), Eastern (Shillong), Western (New Delhi), Southern (Thiruvananthapuram), South-Western (Gandhinagar), Maintenance (Nagpur), Training (Bengaluru).\n  - Navy (3 Commands): Western (Mumbai), Eastern (Visakhapatnam), Southern (Kochi).\n  - Only Tri-Service Command: Andaman and Nicobar Command (Port Blair established 2001).\n• Indigenous Missiles (IGMDP pioneered by Dr. APJ Abdul Kalam):\n  - Prithvi: Surface-to-surface short-range ballistic missile (SRBM, 150–350 km).\n  - Agni Series: Agni I to V (Agni V is an ICBM with >5,000 km range).\n  - BrahMos: Supersonic cruise missile (290 km original, joint India-Russia venture named after Brahmaputra and Moskva rivers).\n  - Nag: 3rd generation anti-tank "fire-and-forget" missile (7 km range; helicopter version HELINA).\n  - Akash: Medium-range surface-to-air missile (SAM, 25–30 km).\n  - Astra: Beyond visual range air-to-air missile (80–100 km).\n• Paramilitary & CAPFs: Assam Rifles (1835, oldest); CRPF (1939, 88th Mahila battalion world\'s 1st all-women); BSF (1965, Indo-Pak & Indo-Bangladesh borders); ITBP (1962, Indo-China border); CISF (1969, industrial/airports); NSG (1984, black cats anti-terror).',
        examAngle: 'HQ of Army South-Western Command (Jaipur, very high yield for RPSC RAS); Missiles developed under IGMDP (PATNA: Prithvi, Agni, Trishul, Nag, Akash).',
        trapAlert: 'Army South-Western Command is located in JAIPUR, Rajasthan, making it a recurring favorite in RPSC exams.',
        highYieldTags: ['South-Western Command Jaipur', 'Tri-Service Port Blair', 'BrahMos', 'Nag Anti-Tank', 'Assam Rifles 1835'],
        referencePage: 'Pages 122-124'
      },
      {
        id: 'gk-02',
        topic: 'International Organizations & UN System',
        subtopic: 'UN Principal Organs, Bretton Woods, WTO, Regional Groupings',
        subject: 'International Relations',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'UN founded 24 Oct 1945 (San Francisco, 193 members, 193rd South Sudan). UNSC (5 permanent: US, UK, France, Russia, China + 10 non-permanent for 2 yrs). ICJ at The Hague.',
        detailedExplanation: '• United Nations (UN):\n  - Established: 24 October 1945 (UN Day); HQ in New York City.\n  - 6 Principal Organs: General Assembly, Security Council (15 members: P5 with veto power + 10 elected for 2-year terms), Economic and Social Council (ECOSOC), Trusteeship Council (suspended), Secretariat (headed by Secretary-General, currently Antonio Guterres), International Court of Justice (ICJ at Peace Palace, The Hague, Netherlands; 15 judges for 9-year terms).\n• Specialized Agencies & HQs:\n  - UNESCO: Paris\n  - WHO, ILO, WTO, ITU, WIPO, UNHCR, WMO: Geneva, Switzerland\n  - FAO, WFP, IFAD: Rome, Italy\n  - IMF & World Bank (IBRD, IDA, IFC, MIGA, ICSID): Washington D.C.\n  - IAEA, UNIDO, OPEC: Vienna, Austria\n  - UNEP: Nairobi, Kenya\n• Regional Groupings:\n  - SAARC (1985, HQ Kathmandu, 8 members: India, Pak, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan).\n  - BIMSTEC (1997, HQ Dhaka, 7 members: Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka, Thailand).\n  - ASEAN (1967, HQ Jakarta, 10 SE Asian nations).\n  - SCO (Shanghai Cooperation Org, 2001, HQ Beijing).',
        examAngle: 'HQs of international agencies (UNEP in Nairobi; ICJ in The Hague; FAO in Rome).',
        trapAlert: 'ICJ is the ONLY principal organ of the UN located outside New York (it is in The Hague, Netherlands).',
        highYieldTags: ['ICJ The Hague', 'UNEP Nairobi', 'Bretton Woods Washington', 'BIMSTEC Dhaka', 'SAARC Kathmandu'],
        referencePage: 'Pages 126-128'
      },
      {
        id: 'gk-03',
        topic: 'Indian & World Superlatives & National Honors',
        subtopic: 'Bharat Ratna, Gallantry Awards, Longest/Highest Features',
        subject: 'Static GK',
        targetExam: 'COMMON_CORE',
        keyFactOrConcept: 'Bharat Ratna instituted 1954 (peepal leaf shaped, platinum sun, bronze inscription). Param Vir Chakra (highest wartime gallantry), Ashok Chakra (highest peacetime gallantry).',
        detailedExplanation: '• Highest Civilian Honors:\n  - Bharat Ratna (1954): 1st recipients: Dr. S. Radhakrishnan, C. Rajagopalachari, Dr. CV Raman. First posthumous: Lal Bahadur Shastri (1966). First foreigner: Khan Abdul Ghaffar Khan (1987), followed by Nelson Mandela (1990).\n  - Padma Awards (1954): Announced on Republic Day. Padma Vibhushan (2nd highest), Padma Bhushan (3rd), Padma Shri (4th).\n• Gallantry Awards:\n  - Wartime: Param Vir Chakra (PVC, highest valour decoration, bronze), Mahavir Chakra, Vir Chakra.\n  - Peacetime: Ashok Chakra (highest peacetime gallantry), Kirti Chakra, Shaurya Chakra.\n• Superlatives of India:\n  - Longest River: Ganga (2,525 km).\n  - Longest Canal: Indira Gandhi Canal / Rajasthan Canal (649 km, lifeline of Western Rajasthan).\n  - Longest Dam: Hirakud Dam (26 km on Mahanadi in Odisha).\n  - Highest Dam: Tehri Dam (260 m on Bhagirathi in Uttarakhand).\n  - Longest Railway Platform: Gorakhpur (1.3 km, UP) / Hubballi (Karnataka).\n  - Longest National Highway: NH-44 (Srinagar to Kanyakumari, 3,745 km).\n  - Tallest Statue: Statue of Unity (182 m, Sardar Patel at Kevadia, Gujarat).\n  - Highest Peak in India: K2 / Godwin Austen (8,611 m in PoK); Highest in undisputed Indian territory: Kanchenjunga (8,598 m, Sikkim).\n  - Largest Freshwater Lake: Wular Lake (J&K); Largest Saline Lake: Chilika (Odisha); Largest Artificial Lake: Dhebar Lake / Jaisamand (Udaipur, Rajasthan).',
        examAngle: 'First Bharat Ratna recipients; difference between Ashok Chakra (peacetime) and Param Vir Chakra (wartime); Rajasthan superlatives (Indira Gandhi Canal, Dhebar Lake).',
        trapAlert: 'Ashok Chakra is awarded for bravery AWAY from the battlefield (peacetime), while Param Vir Chakra is awarded strictly in the presence of the enemy (wartime).',
        highYieldTags: ['Bharat Ratna 1954', 'Statue of Unity 182m', 'Indira Gandhi Canal', 'Dhebar Lake Jaisamand', 'Param Vir Chakra'],
        referencePage: 'Pages 110-112, 120-121'
      }
    ]
  }
];
