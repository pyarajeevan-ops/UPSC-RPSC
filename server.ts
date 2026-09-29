import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client initialized according to the gemini-api skill
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Mentor Chat Route
app.post('/api/mentor/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userProfile, currentTopic, language } = req.body;
    
    if (!ai) {
      return res.status(200).json({
        reply: `[Margdarshak Mentorship Note: Gemini API Key is not configured in environment. Using integrated offline syllabus repository.]\n\nFor ${currentTopic || 'this topic'}, remember our dual preparation rule: Master the common UPSC core conceptually (elimination & interlinkages) while keeping Rajasthan-specific data (exact names, Acts, years, and schemes) at your fingertips!`,
        mode: 'fallback',
      });
    }

    const systemInstruction = `You are an expert UPSC Civil Services Examination (CSE) Prelims and Rajasthan Public Service Commission (RPSC RAS) Prelims mentor, curriculum designer, question setter, evaluator, and revision coach.
Your mission is to teach the candidate for UPSC CSE Prelims and RPSC RAS Prelims simultaneously through one integrated, syllabus-driven, PYQ-oriented program.

Candidate Profile:
- Target Exam: ${userProfile?.targetExam || 'UPSC CSE & RPSC RAS Dual Target'}
- Available study hours: ${userProfile?.studyHours || '8'} hours/day
- Medium: ${language || userProfile?.medium || 'English'}
- Current level: ${userProfile?.prepLevel || 'Intermediate'}
- Strong subjects: ${userProfile?.strongSubjects?.join(', ') || 'Polity'}
- Weak subjects: ${userProfile?.weakSubjects?.join(', ') || 'Rajasthan Geography, Economy'}
- Mains integrated: ${userProfile?.mainsIntegrated ? 'Yes' : 'Prelims focused'}

Guidelines you MUST strictly follow:
1. Distinguish clearly: [OFFICIAL FACT], [TEXTBOOK CONCEPT], [CURRENT AFFAIRS with dates], [COACHING TREND].
2. Never invent statistics, schemes, articles, dates, or PYQs. If uncertain, cite official sources (upsc.gov.in, rpsc.rajasthan.gov.in, PIB, Rajasthan Economic Review).
3. Use tags: [COMMON], [UPSC EXTRA], [RPSC EXTRA], [CURRENT], [HIGH PRIORITY], [REVISION].
4. Be demanding but encouraging: do not praise incorrect answers, correct directly and respectfully, warn about low-value traps.
5. If the user asks for a lesson, follow the 12-step structure:
   1. Syllabus location
   2. Why it matters for UPSC
   3. Why it matters for RPSC
   4. Core concept explained simply
   5. Important facts, terms, dates, institutions, examples
   6. UPSC-RPSC overlap
   7. Rajasthan-specific additions
   8. Common misconceptions and traps
   9. PYQ linkage
   10. Practice questions
   11. Revision summary
   12. Spaced revision schedule (1d, 3d, 7d, 15d, 30d)
6. If the user answers a question, follow the 8-point post-answer protocol and classify into one of the 8 error categories:
   (Conceptual error, Factual error, Misreading, Guessing error, Poor elimination, Time-management error, Overthinking, Current-affairs gap).
7. Respond in ${language === 'Hindi' ? 'Devanagari Hindi' : language === 'Bilingual' ? 'Hinglish/Bilingual (English with Hindi terms)' : 'English'}.`;

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text, mode: 'gemini' });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error.message || 'Mentor processing failed' });
  }
});

// 2. Question Evaluation Route (8-step protocol)
app.post('/api/mentor/evaluate', async (req: Request, res: Response) => {
  try {
    const { question, candidateAnswer, explanationNote } = req.body;

    if (!ai) {
      // Local fallback evaluation
      return res.json({
        evaluation: {
          isCorrect: candidateAnswer === question.correctOption,
          correctAnswer: question.correctOption,
          optionAnalysis: question.options.map((opt: string, idx: number) => ({
            option: String.fromCharCode(65 + idx),
            text: opt,
            verdict: String.fromCharCode(65 + idx) === question.correctOption ? 'Correct' : 'Incorrect',
            reason: question.explanations?.[idx] || 'Refer to standard syllabus and official acts.'
          })),
          underlyingConcept: question.concept || 'Core constitutional or statutory mechanism.',
          identifiedTrap: question.trap || 'Check absolute terms like "all", "only", or confusion between Union vs State authority.',
          eliminationMethod: 'Eliminate options asserting unverified absolute powers before weighing plausible statements.',
          memoryAid: question.mnemonic || 'Recall Article or Year through structural chronology.',
          errorCategory: candidateAnswer === question.correctOption ? null : 'Factual error',
          feedbackNote: candidateAnswer === question.correctOption 
            ? 'Commendable! You spotted the nuance. Note this down for cumulative revision.'
            : 'Careful! Notice where the factual or analytical boundary was crossed.'
        }
      });
    }

    const prompt = `Evaluate the candidate's answer for this civil services preliminary question following the strict 8-step evaluator protocol:

Question:
"${question.text}"
Options:
${question.options.map((o: string, i: number) => `${String.fromCharCode(65 + i)}: ${o}`).join('\n')}

Exam Type: ${question.examType || 'UPSC/RPSC Mixed'}
Candidate's Selected Answer: Option ${candidateAnswer}
Correct Answer (according to key): Option ${question.correctOption}
Candidate's reasoning/note (if any): "${explanationNote || 'Direct selection'}"

Return a JSON object conforming strictly to this format:
{
  "isCorrect": boolean,
  "correctAnswer": "A/B/C/D/E",
  "optionAnalysis": [
    {"option": "A", "text": "...", "verdict": "Correct/Incorrect", "reason": "..."},
    {"option": "B", "text": "...", "verdict": "Correct/Incorrect", "reason": "..."}
  ],
  "underlyingConcept": "Detailed explanation of the core concept in simple yet exam-precise language",
  "identifiedTrap": "The specific examiner trap, word trick, or misconception here",
  "eliminationMethod": "Step-by-step smart elimination strategy to reach the answer without 100% knowledge",
  "memoryAid": "A punchy mnemonic, rhyme, or memory anchor to never forget this",
  "errorCategory": "One of: Conceptual error | Factual error | Misreading | Guessing error | Poor elimination | Time-management error | Overthinking | Current-affairs gap (or null if correct)",
  "feedbackNote": "Demanding but supportive personal mentor remark"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ evaluation: parsed });
  } catch (error: any) {
    console.error('Evaluation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Topic 12-Step Generator Route
app.post('/api/mentor/topic-deepdive', async (req: Request, res: Response) => {
  try {
    const { topicName, subject, language } = req.body;

    if (!ai) {
      return res.status(200).json({ status: 'fallback', message: 'Using built-in syllabus data.' });
    }

    const prompt = `You are the lead UPSC & RPSC RAS Prelims mentor. Generate a complete, authoritative, comprehensive 12-section masterclass for this topic:
Topic: "${topicName}" (${subject})
Language: ${language || 'English'}

You MUST structure the response as a valid JSON object matching these 12 keys:
{
  "syllabusLocation": "Exact paper, section, and official syllabus heading for UPSC CSE Prelims & RPSC RAS Prelims",
  "whyMattersUPSC": "Why UPSC asks this, frequency in past 10 years, typical question framing angle",
  "whyMattersRPSC": "Why RPSC RAS asks this, factual depth expected, specific articles/districts/years tested",
  "coreConcept": "Core concept explained in clean, crisp, simple language without jargon",
  "importantFacts": [
    "List of 6-8 crucial facts, articles, sections, numbers, institutions, or dates with [OFFICIAL FACT] tags"
  ],
  "upscRpscOverlap": "Exact breakdown of common 70% core vs specific state nuances",
  "rajasthanSpecificAdditions": [
    "5-7 Rajasthan-specific provisions, local acts, personalities, schemes, districts, or historical events"
  ],
  "commonMisconceptionsAndTraps": [
    "3-4 traps examiner sets (e.g. absolute words, confusing Governor vs President powers, confusing dates/acts)"
  ],
  "pyqLinkage": [
    {"exam": "UPSC CSE 2021", "questionBrief": "...", "takeaway": "..."},
    {"exam": "RPSC RAS 2023", "questionBrief": "...", "takeaway": "..."}
  ],
  "practiceQuestions": [
    {
      "id": "pq1",
      "examType": "UPSC",
      "text": "...",
      "options": ["A", "B", "C", "D"],
      "correctOption": "B",
      "explanation": "..."
    },
    {
      "id": "pq2",
      "examType": "RPSC",
      "text": "...",
      "options": ["A", "B", "C", "D", "E. Question not attempted"],
      "correctOption": "A",
      "explanation": "..."
    }
  ],
  "revisionSummary": {
    "microNotes": "...",
    "comparisonTable": [{"parameter": "...", "upscCore": "...", "rajasthanLayer": "..."}],
    "memoryAid": "..."
  },
  "spacedRevisionSchedule": {
    "day1": "Active recall 5 key facts + 3 core concepts",
    "day3": "Re-solve practice questions with closed book",
    "day7": "Interleave with related topic error log",
    "day15": "Speed test under 90 seconds per question",
    "day30": "Cumulative full mock integration"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ deepdive: parsed });
  } catch (error: any) {
    console.error('Topic deepdive error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Backend Health & Diagnostics Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Margdarshak CSE & RAS Mentor Backend',
    aiConfigured: Boolean(ai),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// 5. On-Demand Practice Question Generator Route
app.post('/api/mentor/generate-questions', async (req: Request, res: Response) => {
  try {
    const { topicName, examType, count = 3, language = 'English' } = req.body;

    if (!ai) {
      return res.json({
        mode: 'fallback',
        questions: [
          {
            id: `q-fb-${Date.now()}-1`,
            examType: examType || 'UPSC',
            text: `Which of the following is most accurately associated with ${topicName || 'the constitutional framework'}?`,
            options: [
              'Mandatory constitutional directive under Part IV',
              'Subject matter within the exclusive jurisdiction of the Union List (7th Schedule)',
              'Statutory power delegated via State Legislature enactment',
              'Executive discretion immune from judicial review'
            ],
            correctOption: 'B',
            explanation: 'Syllabus alignment verifies that key structural mechanisms are established under the 7th Schedule legislative lists.',
            eliminationTip: 'Eliminate extreme claims regarding complete immunity from judicial review under Basic Structure.'
          }
        ]
      });
    }

    const prompt = `You are the chief question setter for UPSC CSE Prelims and RPSC RAS Prelims.
Generate ${count} high-yield, authentic preliminary exam questions on the topic: "${topicName || 'General Studies Core'}".
Target Exam: ${examType || 'Dual (UPSC and RPSC)'}.
Language: ${language}.

Format requirements:
- For UPSC: 4 options (A, B, C, D) with conceptual rigor and statement-based questions.
- For RPSC: 5 options (A, B, C, D, and E: "Question Not Attempted / अनुत्तरित प्रश्न") with factual precision.
- Provide comprehensive official reasoning and practical elimination method.

Return strict JSON array:
[
  {
    "id": "q1",
    "examType": "UPSC or RPSC",
    "text": "Question stem...",
    "options": ["A text", "B text", "C text", "D text", "E text (if RPSC)"],
    "correctOption": "A/B/C/D",
    "explanation": "Detailed official reason...",
    "eliminationTip": "Elimination technique..."
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      }
    });

    const questions = JSON.parse(response.text || '[]');
    res.json({ mode: 'gemini', questions });
  } catch (error: any) {
    console.error('Question generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 6. Active Recall Flashcards Generator Route
app.post('/api/mentor/flashcards', async (req: Request, res: Response) => {
  try {
    const { topicName, count = 4, language = 'English' } = req.body;

    if (!ai) {
      return res.json({
        mode: 'fallback',
        flashcards: [
          {
            id: `fc-fb-${Date.now()}-1`,
            category: 'Article',
            front: `What is the primary constitutional anchor for ${topicName || 'Local Governance'}?`,
            back: 'Articles 243 to 243-O (Part IX) introduced via 73rd Amendment Act 1992.',
            mnemonic: 'Part 9 = Panchayats'
          }
        ]
      });
    }

    const prompt = `Generate ${count} active-recall flashcards for civil services aspirant studying "${topicName}".
Language: ${language}.
Each card must focus on high-yield retention (Constitutional Articles, Historical Milestones, Legal Acts, or Examiner Traps).

Return strict JSON array:
[
  {
    "id": "fc1",
    "category": "Article or Fact or Case Law or Trap",
    "front": "Prompt or test question...",
    "back": "Concise answer with exact facts...",
    "mnemonic": "Punchy memory hook..."
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      }
    });

    const flashcards = JSON.parse(response.text || '[]');
    res.json({ mode: 'gemini', flashcards });
  } catch (error: any) {
    console.error('Flashcard generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 7. Study Calendar & Spaced Scheduler API
// ==========================================

interface CalendarEventRecord {
  id: string;
  title: string;
  titleHindi?: string;
  date: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  type: 'UPSC_CORE' | 'RPSC_RAJASTHAN' | 'SPACED_REVISION' | 'MOCK_TEST' | 'EXAM_COUNTDOWN' | 'CURRENT_AFFAIRS';
  topicId?: string;
  subject?: string;
  targetHours: number;
  completed: boolean;
  notes?: string;
  spacedInterval?: 1 | 3 | 7 | 15 | 30;
  examTag?: 'UPSC' | 'RPSC' | 'DUAL';
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}

const CALENDAR_STORE_FILE = path.join(__dirname, 'calendar-events.json');

function formatDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysToDate(baseDateStr: string, days: number): string {
  const d = new Date(baseDateStr);
  d.setDate(d.getDate() + days);
  return formatDateStr(d);
}

function generateDefaultEvents(): CalendarEventRecord[] {
  const today = new Date();
  const todayStr = formatDateStr(today);
  const tomorrowStr = addDaysToDate(todayStr, 1);
  const in2DaysStr = addDaysToDate(todayStr, 2);
  const in3DaysStr = addDaysToDate(todayStr, 3);
  const in7DaysStr = addDaysToDate(todayStr, 7);
  const in15DaysStr = addDaysToDate(todayStr, 15);
  const in30DaysStr = addDaysToDate(todayStr, 30);

  return [
    {
      id: 'cal-ev-1',
      title: 'UPSC Core: Constitutional Framework & Panchayati Raj',
      titleHindi: 'संवैधानिक ढांचा व 73वां/74वां संशोधन',
      date: todayStr,
      startTime: '06:30',
      endTime: '09:30',
      type: 'UPSC_CORE',
      topicId: 'panchayati-raj-local-gov',
      subject: 'Polity & Governance',
      targetHours: 3,
      completed: true,
      notes: 'Covered Article 243A to 243O, 11th Schedule, Balwant Rai Mehta to L.M. Singhvi timeline.',
      examTag: 'UPSC',
      priority: 'HIGH',
    },
    {
      id: 'cal-ev-2',
      title: 'RPSC Rajasthan Layer: Rajasthan PR Act 1994 & PESA Rules',
      titleHindi: 'राजस्थान पंचायती राज अधिनियम 1994 एवं पेसा नियम',
      date: todayStr,
      startTime: '11:00',
      endTime: '13:00',
      type: 'RPSC_RAJASTHAN',
      topicId: 'rajasthan-panchayati-raj-act-1994',
      subject: 'Rajasthan Administrative System',
      targetHours: 2,
      completed: false,
      notes: 'Key focus: 3-tier structure, State Election Commission (Art 243K), State Finance Commission (Art 243I).',
      examTag: 'RPSC',
      priority: 'HIGH',
    },
    {
      id: 'cal-ev-3',
      title: 'Spaced Recall: Day 1 Active Recall on Local Governance',
      titleHindi: 'दिन 1 सक्रिय स्मरण: पंचायती राज',
      date: tomorrowStr,
      startTime: '17:00',
      endTime: '18:15',
      type: 'SPACED_REVISION',
      topicId: 'panchayati-raj-local-gov',
      subject: 'Polity & Governance',
      targetHours: 1.25,
      completed: false,
      spacedInterval: 1,
      notes: '5-3-2-1-1 protocol: Write 5 facts, 3 concepts, 2 traps, 1 UPSC & 1 RPSC question from memory.',
      examTag: 'DUAL',
      priority: 'HIGH',
    },
    {
      id: 'cal-ev-4',
      title: 'RPSC Rajasthan Physical Features & Aravali Ranges',
      titleHindi: 'राजस्थान के भौतिक प्रदेश एवं अरावली पर्वतमाला',
      date: in2DaysStr,
      startTime: '07:00',
      endTime: '09:30',
      type: 'RPSC_RAJASTHAN',
      topicId: 'rajasthan-geo-physical',
      subject: 'Rajasthan Geography',
      targetHours: 2.5,
      completed: false,
      notes: 'Heights of peaks: Guru Shikhar (1722m), Ser (1597m), Dilwara (1442m). Passes and river divides.',
      examTag: 'RPSC',
      priority: 'MEDIUM',
    },
    {
      id: 'cal-ev-5',
      title: 'Spaced Recall: Day 3 Closed MCQ Drill on Local Governance',
      titleHindi: 'दिन 3 बहुविकल्पीय प्रश्न अभ्यास',
      date: in3DaysStr,
      startTime: '18:00',
      endTime: '19:00',
      type: 'SPACED_REVISION',
      topicId: 'panchayati-raj-local-gov',
      subject: 'Polity',
      targetHours: 1,
      completed: false,
      spacedInterval: 3,
      notes: 'Solve 20 PYQs without reference notes, classify errors into 8 categories.',
      examTag: 'DUAL',
      priority: 'MEDIUM',
    },
    {
      id: 'cal-ev-6',
      title: 'Prelims Simulator: Dual Paper 1 Full Mock Test',
      titleHindi: 'प्रारंभिक परीक्षा पूर्ण मॉक टेस्ट (UPSC+RPSC)',
      date: in7DaysStr,
      startTime: '09:30',
      endTime: '11:30',
      type: 'MOCK_TEST',
      subject: 'General Studies Full Length',
      targetHours: 2,
      completed: false,
      notes: '100 Questions with strict negative marking (1/3rd). Post-mock error autopsy mandatory.',
      examTag: 'DUAL',
      priority: 'HIGH',
    },
    {
      id: 'cal-ev-7',
      title: 'Spaced Recall: Day 15 Speed Drill & Interleaving',
      titleHindi: 'दिन 15 गति अभ्यास व अंतर्ग्रथन',
      date: in15DaysStr,
      startTime: '16:00',
      endTime: '17:00',
      type: 'SPACED_REVISION',
      topicId: 'panchayati-raj-local-gov',
      subject: 'Polity',
      targetHours: 1,
      completed: false,
      spacedInterval: 15,
      notes: 'Rapid elimination test: 90 seconds per statement.',
      examTag: 'UPSC',
      priority: 'MEDIUM',
    },
    {
      id: 'cal-ev-8',
      title: 'Cumulative 30-Day Master Milestone Review',
      titleHindi: '30-दिवसीय संचयी महारत समीक्षा',
      date: in30DaysStr,
      startTime: '10:00',
      endTime: '13:00',
      type: 'SPACED_REVISION',
      subject: 'All Completed Modules',
      targetHours: 3,
      completed: false,
      spacedInterval: 30,
      notes: 'Cross-subject connections between Polity, Economy, and Rajasthan Administration.',
      examTag: 'DUAL',
      priority: 'HIGH',
    },
    {
      id: 'cal-ev-9',
      title: 'Target Horizon: UPSC CSE Prelims Official Milestone',
      titleHindi: 'लक्ष्य: यूपीएससी सिविल सेवा प्रारंभिक परीक्षा',
      date: '2026-05-24',
      type: 'EXAM_COUNTDOWN',
      subject: 'Civil Services Examination',
      targetHours: 0,
      completed: false,
      notes: 'Official UPSC CSE Prelims Examination Day. Strict revision cycles conclude.',
      examTag: 'UPSC',
      priority: 'HIGH',
    },
    {
      id: 'cal-ev-10',
      title: 'Target Horizon: RPSC RAS Combined Prelims Milestone',
      titleHindi: 'लक्ष्य: आरपीएससी आरएएस प्रारंभिक परीक्षा',
      date: '2026-08-30',
      type: 'EXAM_COUNTDOWN',
      subject: 'Rajasthan State and Subordinate Services',
      targetHours: 0,
      completed: false,
      notes: 'RPSC RAS Combined Competitive Prelims (200 marks, 150 questions, 5th option mandatory).',
      examTag: 'RPSC',
      priority: 'HIGH',
    },
  ];
}

function readCalendarEvents(): CalendarEventRecord[] {
  try {
    if (fs.existsSync(CALENDAR_STORE_FILE)) {
      const data = fs.readFileSync(CALENDAR_STORE_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read calendar events file, using defaults:', err);
  }
  const defaultEvents = generateDefaultEvents();
  writeCalendarEvents(defaultEvents);
  return defaultEvents;
}

function writeCalendarEvents(events: CalendarEventRecord[]): boolean {
  try {
    fs.writeFileSync(CALENDAR_STORE_FILE, JSON.stringify(events, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving calendar events:', err);
    return false;
  }
}

// Get all calendar events
app.get('/api/calendar/events', (req: Request, res: Response) => {
  try {
    const events = readCalendarEvents();
    res.json({ events, count: events.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new calendar event
app.post('/api/calendar/events', (req: Request, res: Response) => {
  try {
    const newEvent: CalendarEventRecord = {
      id: req.body.id || `cal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: req.body.title || 'Civil Services Study Session',
      titleHindi: req.body.titleHindi,
      date: req.body.date || formatDateStr(new Date()),
      startTime: req.body.startTime || '07:00',
      endTime: req.body.endTime || '09:00',
      type: req.body.type || 'UPSC_CORE',
      topicId: req.body.topicId,
      subject: req.body.subject || 'General Studies',
      targetHours: Number(req.body.targetHours) || 2,
      completed: Boolean(req.body.completed),
      notes: req.body.notes || '',
      spacedInterval: req.body.spacedInterval,
      examTag: req.body.examTag || 'DUAL',
      priority: req.body.priority || 'MEDIUM',
    };

    const events = readCalendarEvents();
    events.push(newEvent);
    writeCalendarEvents(events);

    res.status(201).json({ success: true, event: newEvent });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing calendar event
app.put('/api/calendar/events/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const events = readCalendarEvents();
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: `Event with id ${id} not found` });
    }

    const current = events[index];
    events[index] = {
      ...current,
      ...req.body,
      id: current.id, // prevent changing id
    };

    writeCalendarEvents(events);
    res.json({ success: true, event: events[index] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an event
app.delete('/api/calendar/events/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let events = readCalendarEvents();
    const beforeCount = events.length;
    events = events.filter((e) => e.id !== id);

    if (events.length === beforeCount) {
      return res.status(404).json({ error: `Event with id ${id} not found` });
    }

    writeCalendarEvents(events);
    res.json({ success: true, message: `Event ${id} removed` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Auto-schedule spaced revisions or generate 30-day dual prep plan
app.post('/api/calendar/auto-schedule', (req: Request, res: Response) => {
  try {
    const { action, topicId, topicTitle, subject, examTag, baseDate } = req.body;
    const startDate = baseDate || formatDateStr(new Date());
    const events = readCalendarEvents();
    const createdEvents: CalendarEventRecord[] = [];

    if (action === 'spaced-revision') {
      const title = topicTitle || 'Civil Services Topic';
      const intervals = [
        { days: 1, label: 'Day 1 Active Recall', targetHours: 1 },
        { days: 3, label: 'Day 3 Closed MCQ Drill', targetHours: 1 },
        { days: 7, label: 'Day 7 Interleaving & PYQ Review', targetHours: 1.5 },
        { days: 15, label: 'Day 15 Speed Drill (90s / Q)', targetHours: 1 },
        { days: 30, label: 'Day 30 Cumulative Mock Integration', targetHours: 2 },
      ] as const;

      intervals.forEach((interval) => {
        const evDate = addDaysToDate(startDate, interval.days);
        const ev: CalendarEventRecord = {
          id: `sr-${Date.now()}-${interval.days}-${Math.random().toString(36).substring(2, 6)}`,
          title: `${interval.label}: ${title}`,
          date: evDate,
          startTime: '17:00',
          endTime: interval.targetHours === 2 ? '19:00' : '18:15',
          type: 'SPACED_REVISION',
          topicId: topicId,
          subject: subject || 'General Studies Core',
          targetHours: interval.targetHours,
          completed: false,
          spacedInterval: interval.days,
          notes: `Automatic 5-3-2-1-1 Spaced Review cycle interval for ${title}.`,
          examTag: examTag || 'DUAL',
          priority: interval.days <= 7 ? 'HIGH' : 'MEDIUM',
        };
        createdEvents.push(ev);
        events.push(ev);
      });

      writeCalendarEvents(events);
      return res.json({
        success: true,
        action: 'spaced-revision',
        message: `Scheduled 5 spaced revision checkpoints for "${title}" across 30 days.`,
        createdEvents,
      });
    }

    if (action === '30-day-plan') {
      const dualSubjects = [
        { core: 'Indian Polity: Constitution & Governance', rpsc: 'Rajasthan Administrative Structure & PR Act', tag: 'Polity' },
        { core: 'Modern Indian History & Freedom Struggle', rpsc: 'Rajasthan 1857 Revolts & Prajamandal Movements', tag: 'History' },
        { core: 'Indian Physical & Human Geography', rpsc: 'Rajasthan Physiography, Aravalis & Drainage', tag: 'Geography' },
        { core: 'Indian Economy: Macro & Fiscal Budget', rpsc: 'Rajasthan Economic Review & Flagship Schemes', tag: 'Economy' },
        { core: 'Environment, Biodiversity & Climate Change', rpsc: 'Rajasthan Forests, Wildlife Sanctuaries & Ramsar Sites', tag: 'Environment' },
        { core: 'Science & Technology: Space, Defense & Biotech', rpsc: 'Major S&T Initiatives & Scientific Heritage of Rajasthan', tag: 'S&T' },
      ];

      for (let i = 0; i < 30; i++) {
        const dateStr = addDaysToDate(startDate, i);
        const dayOfWeek = new Date(dateStr).getDay(); // 0 is Sunday
        const subjectCycle = dualSubjects[i % dualSubjects.length];

        if (dayOfWeek === 0) {
          // Sunday: Full-length Mock Test & Revision Autopsy
          const mockEv: CalendarEventRecord = {
            id: `plan-mock-${Date.now()}-${i}`,
            title: `Sunday Prelims Simulator: 100-Question Dual Paper`,
            date: dateStr,
            startTime: '09:30',
            endTime: '11:30',
            type: 'MOCK_TEST',
            subject: 'Dual UPSC & RPSC Full Prelims',
            targetHours: 3.5,
            completed: false,
            notes: '2-hour exam under exam conditions followed by 90-minute error log classification.',
            examTag: 'DUAL',
            priority: 'HIGH',
          };
          createdEvents.push(mockEv);
          events.push(mockEv);
        } else {
          // Weekday 70:20:10 architecture
          // Morning UPSC 70%
          const coreEv: CalendarEventRecord = {
            id: `plan-core-${Date.now()}-${i}`,
            title: `70% Core: ${subjectCycle.core}`,
            date: dateStr,
            startTime: '06:30',
            endTime: '09:30',
            type: 'UPSC_CORE',
            subject: subjectCycle.tag,
            targetHours: 3,
            completed: false,
            notes: 'Standard textbooks + NCERT + Previous 10-year UPSC question patterns.',
            examTag: 'UPSC',
            priority: 'HIGH',
          };

          // Afternoon RPSC 20%
          const rpscEv: CalendarEventRecord = {
            id: `plan-rpsc-${Date.now()}-${i}`,
            title: `20% Rajasthan: ${subjectCycle.rpsc}`,
            date: dateStr,
            startTime: '11:30',
            endTime: '13:00',
            type: 'RPSC_RAJASTHAN',
            subject: subjectCycle.tag,
            targetHours: 1.5,
            completed: false,
            notes: 'Official gazettes, Hindi Granth Academy textbooks, Rajasthan Economic Review.',
            examTag: 'RPSC',
            priority: 'MEDIUM',
          };

          // Evening 10% Spaced Revision
          const revEv: CalendarEventRecord = {
            id: `plan-rev-${Date.now()}-${i}`,
            title: `10% Revision: Daily 5-3-2-1-1 Recall & 15 MCQs`,
            date: dateStr,
            startTime: '17:30',
            endTime: '18:30',
            type: 'SPACED_REVISION',
            subject: subjectCycle.tag,
            targetHours: 1,
            completed: false,
            notes: 'Write from memory: 5 facts, 3 concepts, 2 traps, 1 UPSC Q, 1 RPSC Q.',
            examTag: 'DUAL',
            priority: 'HIGH',
          };

          createdEvents.push(coreEv, rpscEv, revEv);
          events.push(coreEv, rpscEv, revEv);
        }
      }

      writeCalendarEvents(events);
      return res.json({
        success: true,
        action: '30-day-plan',
        message: `Generated comprehensive 30-day dual preparation calendar (${createdEvents.length} sessions).`,
        createdEvents,
      });
    }

    if (action === 'reset-defaults') {
      const defaults = generateDefaultEvents();
      writeCalendarEvents(defaults);
      return res.json({
        success: true,
        action: 'reset-defaults',
        message: 'Calendar reset to standard dual preparation milestones and schedule.',
        events: defaults,
      });
    }

    if (action === 'mistake-review') {
      const count = req.body.count || 2;
      const reviewDate = addDaysToDate(startDate, 1);
      const retakeDate = addDaysToDate(startDate, 3);

      const reviewEv: CalendarEventRecord = {
        id: `autopsy-${Date.now()}-1`,
        title: `Error Autopsy: Analyze ${count} Practice Test Misses`,
        date: reviewDate,
        startTime: '18:00',
        endTime: '19:30',
        type: 'SPACED_REVISION',
        subject: subject || 'Test Diagnostics',
        targetHours: 1.5,
        completed: false,
        notes: `Classify ${count} mistakes into 8 cognitive categories. Identify whether failure was conceptual, factual, or misreading.`,
        examTag: examTag || 'DUAL',
        priority: 'HIGH',
      };

      const retakeEv: CalendarEventRecord = {
        id: `retake-${Date.now()}-2`,
        title: `Spaced Test Retake (Closed Book)`,
        date: retakeDate,
        startTime: '16:30',
        endTime: '17:30',
        type: 'MOCK_TEST',
        subject: subject || 'Remedial Test',
        targetHours: 1.0,
        completed: false,
        notes: `Retake missed questions under closed-book, timed conditions to lock in permanent correction.`,
        examTag: examTag || 'DUAL',
        priority: 'MEDIUM',
      };

      createdEvents.push(reviewEv, retakeEv);
      events.push(reviewEv, retakeEv);
      writeCalendarEvents(events);

      return res.json({
        success: true,
        action: 'mistake-review',
        message: `Scheduled Error Autopsy for tomorrow and Test Retake in 3 days!`,
        createdEvents,
      });
    }

    if (action === 'curriculum-module') {
      const { moduleTitle, days } = req.body;
      const modDays: Array<{ dayNumber: number; focus: string; actionableTask: string }> = Array.isArray(days)
        ? days
        : [
            { dayNumber: 1, focus: 'Primary Text Reading & Core Framework', actionableTask: 'Read standard source' },
            { dayNumber: 2, focus: 'Deep Dive & Articles Synthesis', actionableTask: 'Note down articles & provisions' },
            { dayNumber: 3, focus: 'Comparative Matrix & Overlap Analysis', actionableTask: 'Distinguish Union vs Rajasthan' },
            { dayNumber: 4, focus: '10-Year PYQ Autopsy (UPSC + RPSC)', actionableTask: 'Solve past papers' },
            { dayNumber: 5, focus: '5-3-2-1-1 Active Recall & Timed Drill', actionableTask: 'Complete active recall' },
          ];

      modDays.forEach((d, idx) => {
        const evDate = addDaysToDate(startDate, idx);
        const ev: CalendarEventRecord = {
          id: `mod-${Date.now()}-${idx}`,
          title: `Day ${d.dayNumber}: ${d.focus} (${moduleTitle || 'Curriculum Unit'})`,
          date: evDate,
          startTime: '07:00',
          endTime: '09:30',
          type: 'UPSC_CORE',
          subject: subject || 'Curriculum Module',
          targetHours: 2.5,
          completed: false,
          notes: d.actionableTask || 'Follow self-teach curriculum study tasks.',
          examTag: examTag || 'DUAL',
          priority: 'HIGH',
        };
        createdEvents.push(ev);
        events.push(ev);
      });

      writeCalendarEvents(events);
      return res.json({
        success: true,
        action: 'curriculum-module',
        message: `Scheduled 5-day study unit for "${moduleTitle || 'Curriculum Unit'}" into Calendar!`,
        createdEvents,
      });
    }

    res.status(400).json({ error: `Unknown action: ${action}. Use 'spaced-revision', '30-day-plan', 'mistake-review', 'curriculum-module', or 'reset-defaults'.` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Export events as .ics iCalendar file string
app.post('/api/calendar/export-ics', (req: Request, res: Response) => {
  try {
    const events = readCalendarEvents();
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Margdarshak//UPSC and RPSC Prelims Study Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Margdarshak Study Calendar',
      'X-WR-TIMEZONE:Asia/Kolkata',
    ];

    events.forEach((ev) => {
      const cleanDate = ev.date.replace(/-/g, '');
      const startT = (ev.startTime || '07:00').replace(':', '') + '00';
      const endT = (ev.endTime || '09:00').replace(':', '') + '00';
      const dtStart = `${cleanDate}T${startT}`;
      const dtEnd = `${cleanDate}T${endT}`;

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${ev.id}@margdarshak.app`,
        `DTSTAMP:${formatDateStr(new Date()).replace(/-/g, '')}T000000Z`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:[${ev.type.replace('_', ' ')}] ${ev.title.replace(/[,;]/g, ' ')}`,
        `DESCRIPTION:${(ev.notes || ev.subject || '').replace(/[\n\r]/g, ' ')}`,
        `CATEGORIES:${ev.type},${ev.examTag || 'DUAL'}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');
    const icsString = icsContent.join('\r\n');

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="margdarshak-study-calendar.ics"');
    res.send(icsString);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Setup Vite development middlewares or serve static build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Margdarshak Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
