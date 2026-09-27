import express, { Request, Response } from 'express';
import path from 'path';
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
