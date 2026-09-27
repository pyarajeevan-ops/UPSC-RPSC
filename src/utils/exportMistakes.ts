import { jsPDF } from 'jspdf';
import { ErrorLogEntry, ErrorCategory } from '../types';

const ERROR_CATEGORIES: ErrorCategory[] = [
  'Conceptual error',
  'Factual error',
  'Misreading',
  'Guessing error',
  'Poor elimination',
  'Time-management error',
  'Overthinking',
  'Current-affairs gap',
];

interface ExportOptions {
  filterName?: string;
  scope?: 'filtered' | 'all';
}

/**
 * Generates and downloads a clean, structured plaintext (.txt) file of the error log.
 */
export function exportMistakesAsText(
  mistakes: ErrorLogEntry[],
  totalInNotebook: number,
  options?: ExportOptions
): void {
  if (mistakes.length === 0) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Calculate category distribution
  const categoryCounts: Record<string, number> = {};
  ERROR_CATEGORIES.forEach((c) => {
    categoryCounts[c] = 0;
  });
  mistakes.forEach((m) => {
    categoryCounts[m.errorCategory] = (categoryCounts[m.errorCategory] || 0) + 1;
  });

  // Highest weakness
  let highestCat = '';
  let highestCount = 0;
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > highestCount) {
      highestCount = count;
      highestCat = cat;
    }
  });

  const divider = '='.repeat(80);
  const subDivider = '-'.repeat(80);

  let content = '';
  content += `${divider}\n`;
  content += `MARGDARSHAK IAS/RAS DUAL PREPARATION SYSTEM\n`;
  content += `ACTIVE MISTAKE NOTEBOOK & ERROR TAXONOMY REPORT (OFFLINE REVIEW)\n`;
  content += `${divider}\n\n`;

  content += `Generated On  : ${dateStr} at ${timeStr}\n`;
  content += `Report Scope  : ${options?.filterName && options.filterName !== 'ALL' ? `Filtered by [${options.filterName}]` : 'Full Notebook (All Categories)'}\n`;
  content += `Errors in Log : ${mistakes.length} displayed (Total recorded: ${totalInNotebook})\n`;
  content += `Target Scope  : UPSC CSE & RPSC RAS Prelims Dual Integration\n\n`;

  content += `${subDivider}\n`;
  content += `I. COGNITIVE ERROR DISTRIBUTION BREAKDOWN\n`;
  content += `${subDivider}\n`;
  ERROR_CATEGORIES.forEach((cat) => {
    const count = categoryCounts[cat] || 0;
    const bar = '#'.repeat(count);
    const pct = mistakes.length > 0 ? ((count / mistakes.length) * 100).toFixed(1) : '0';
    content += `  - ${cat.padEnd(25)} : ${String(count).padStart(2)} error(s) (${pct.padStart(5)}%) ${bar}\n`;
  });
  content += `\n`;

  if (highestCount > 0) {
    content += `${subDivider}\n`;
    content += `II. COGNITIVE WEAKNESS DIAGNOSIS & REMEDIAL STRATEGY\n`;
    content += `${subDivider}\n`;
    content += `Primary Failure Mode: ${highestCat} (${highestCount} occurrences)\n\n`;

    let advice = '';
    if (highestCat === 'Factual error') {
      advice =
        'Errors stem from exact dates, articles, schemes, or Rajasthan local names. Increase daily flashcard drills and avoid guessing in negative marking zones.';
    } else if (highestCat === 'Misreading') {
      advice =
        'You are falling for inverted stems like "Which is NOT correct" or confusing similar-sounding terms. Underline qualifiers on paper before picking options.';
    } else if (highestCat === 'Conceptual error') {
      advice =
        'Revisit foundational NCERT and standard reference texts before attempting more practice tests.';
    } else if (highestCat === 'Overthinking') {
      advice =
        'You are adding unstated assumptions to straightforward facts. Stick strictly to what is stated in the premise.';
    } else if (highestCat === 'Poor elimination') {
      advice =
        'Always eliminate the impossible extreme statements (all, none, universally) before evaluating nuanced statements.';
    } else if (highestCat === 'Guessing error') {
      advice =
        'Limit blind guesses! In UPSC (-0.66) and RPSC (-0.44), uncontrolled guessing erodes the cut-off margin.';
    } else if (highestCat === 'Time-management error') {
      advice =
        'Time pressure caused rushed decision-making. Practice 50-question sectional sprints with strict timer discipline.';
    } else if (highestCat === 'Current-affairs gap') {
      advice =
        'Cross-reference monthly Sujas compilations and national monthly roundups for recent policy/treaty updates.';
    } else {
      advice = 'Consistently review traps and memory aids before each sectional practice test.';
    }
    content += `Actionable Prescription:\n${advice}\n\n`;
  }

  content += `${subDivider}\n`;
  content += `III. DETAILED ERROR LOG & TRAP AUTOPSY\n`;
  content += `${subDivider}\n\n`;

  mistakes.forEach((entry, idx) => {
    const entryDate = new Date(entry.timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    content += `[Entry #${idx + 1}] --------------------------------------------------------\n`;
    content += `Subject        : ${entry.subject || 'General Studies'}\n`;
    content += `Topic          : ${entry.topicTitle || 'Core Concept'}\n`;
    content += `Failure Mode   : ${entry.errorCategory}\n`;
    content += `Logged Date    : ${entryDate}\n`;
    content += `Question:\n${entry.questionText}\n\n`;
    content += `  * Candidate's Pick : Option ${entry.selectedOption} [INCORRECT]\n`;
    content += `  * Official Answer  : Option ${entry.correctOption} [CORRECT]\n\n`;
    content += `  Examiner Trap Identified:\n    ${entry.trapIdentified}\n\n`;
    content += `  Cure / Mnemonic Formula:\n    ${entry.mnemonic}\n`;

    if (entry.candidateNotes && entry.candidateNotes.trim().length > 0) {
      content += `\n  Aspirant's Self-Reflection Note:\n    ${entry.candidateNotes}\n`;
    }
    content += `\n`;
  });

  content += `${divider}\n`;
  content += `End of Mistake Notebook Report • Margdarshak Civil Services Mentorship\n`;
  content += `${divider}\n`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeDate = now.toISOString().split('T')[0];
  link.href = url;
  link.download = `Margdarshak-Mistakes-${safeDate}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a beautifully styled, formatted multi-page PDF document
 * of the error log for printing or offline tablet review.
 */
export function exportMistakesAsPdf(
  mistakes: ErrorLogEntry[],
  totalInNotebook: number,
  options?: ExportOptions
): void {
  if (mistakes.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  const bottomMargin = 16;

  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 16;
      // Running minimal header on subsequent pages
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(140, 150, 165);
      doc.text('Margdarshak IAS/RAS — Mistake Notebook & Offline Review Sheet', marginX, 10);
      doc.setDrawColor(220, 226, 235);
      doc.setLineWidth(0.2);
      doc.line(marginX, 11.5, pageWidth - marginX, 11.5);
    }
  };

  // Header Box
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(marginX, y, contentWidth, 24, 2, 2, 'F');

  // Amber accent line
  doc.setFillColor(245, 158, 11); // amber-500
  doc.rect(marginX, y, 3, 24, 'F');

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('MARGDARSHAK IAS/RAS ACTIVE MISTAKE NOTEBOOK', marginX + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(
    'Cognitive Error Taxonomy & Trap Autopsy • Offline Rapid Revision Document',
    marginX + 6,
    y + 14
  );

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(
    `Exported: ${dateStr} | Logged: ${mistakes.length} errors ${
      options?.filterName && options.filterName !== 'ALL'
        ? `(Filter: ${options.filterName})`
        : `(All Categories)`
    }`,
    marginX + 6,
    y + 20
  );

  y += 28;

  // Category summary grid
  const categoryCounts: Record<string, number> = {};
  ERROR_CATEGORIES.forEach((c) => {
    categoryCounts[c] = 0;
  });
  mistakes.forEach((m) => {
    categoryCounts[m.errorCategory] = (categoryCounts[m.errorCategory] || 0) + 1;
  });

  let highestCat = '';
  let highestCount = 0;
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > highestCount) {
      highestCount = count;
      highestCat = cat;
    }
  });

  // Summary box
  checkPageBreak(24);
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(marginX, y, contentWidth, 20, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('ERROR TAXONOMY SUMMARY (8 CIVIL SERVICES COGNITIVE MODES):', marginX + 3, y + 5);

  const colWidth = contentWidth / 4;
  ERROR_CATEGORIES.forEach((cat, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const itemX = marginX + 3 + col * colWidth;
    const itemY = y + 10 + row * 5;

    const count = categoryCounts[cat] || 0;
    doc.setFont('helvetica', count > 0 ? 'bold' : 'normal');
    doc.setFontSize(7);
    if (count > 0) {
      doc.setTextColor(190, 18, 60); // rose-700
    } else {
      doc.setTextColor(100, 116, 139); // slate-500
    }
    const shortLabel = cat.length > 17 ? cat.slice(0, 16) + '…' : cat;
    doc.text(`${shortLabel}: ${count}`, itemX, itemY);
  });

  y += 24;

  // Weakness alert banner if exists
  if (highestCount > 0) {
    checkPageBreak(16);
    doc.setFillColor(255, 241, 242); // rose-50
    doc.setDrawColor(254, 205, 211); // rose-200
    doc.roundedRect(marginX, y, contentWidth, 12, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(190, 18, 60); // rose-700
    doc.text(
      `HIGH FREQUENCY WEAKNESS ALERT: "${highestCat}" (${highestCount} occurrences)`,
      marginX + 3,
      y + 4.5
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(159, 18, 57);
    const alertAdvice =
      highestCat === 'Factual error'
        ? 'High incidence of exact data/article slips. Reinforce memory cards and preserve cut-off margin.'
        : highestCat === 'Misreading'
        ? 'Watch out for inverted stems like "Which is NOT correct". Underline qualifiers explicitly.'
        : highestCat === 'Guessing error'
        ? 'Negative marking hazard (-0.66 in UPSC, -0.44 in RPSC). Stop blind elimination on 50:50 questions.'
        : 'Prioritize reviewing core conceptual traps and memory formulas before attempting the next mock.';
    doc.text(alertAdvice, marginX + 3, y + 8.5);

    y += 16;
  }

  // Section Heading
  checkPageBreak(10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`RECORDED ERROR LOG ENTRIES (${mistakes.length})`, marginX, y);
  y += 5;

  // Render each mistake entry
  mistakes.forEach((entry, idx) => {
    // Calculate entry height dynamically
    doc.setFontSize(8.5);
    const qLines = doc.splitTextToSize(`Q${idx + 1}. ${entry.questionText}`, contentWidth - 8);
    const qHeight = qLines.length * 3.8;

    doc.setFontSize(7.5);
    const trapLines = doc.splitTextToSize(`Examiner Trap: ${entry.trapIdentified}`, contentWidth - 8);
    const trapH = trapLines.length * 3.4;

    const mnemonicLines = doc.splitTextToSize(`Cure / Mnemonic: ${entry.mnemonic}`, contentWidth - 8);
    const mnemH = mnemonicLines.length * 3.4;

    let notesH = 0;
    let noteLines: string[] = [];
    if (entry.candidateNotes && entry.candidateNotes.trim().length > 0) {
      noteLines = doc.splitTextToSize(`Aspirant Note: ${entry.candidateNotes}`, contentWidth - 8);
      notesH = noteLines.length * 3.4 + 2;
    }

    const estimatedBoxHeight = 10 + qHeight + 7 + trapH + mnemH + notesH + 4;
    checkPageBreak(estimatedBoxHeight + 4);

    const startY = y;

    // Outer card
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(marginX, startY, contentWidth, estimatedBoxHeight, 1.5, 1.5, 'FD');

    // Header strip of the card
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(marginX, startY, contentWidth, 7, 1.5, 1.5, 'F');

    // Category badge & Subject
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(190, 18, 60); // rose-700
    doc.text(`[${entry.errorCategory}]`, marginX + 3, startY + 4.8);

    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(`•  ${entry.subject || 'General Studies'}`, marginX + 40, startY + 4.8);

    const entryDate = new Date(entry.timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(entryDate, pageWidth - marginX - 22, startY + 4.8);

    let innerY = startY + 11;

    // Question Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(qLines, marginX + 3, innerY);
    innerY += qHeight + 2;

    // Options breakdown
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(225, 29, 72); // rose-600
    doc.text(`Candidate Pick: Option ${entry.selectedOption} (Incorrect)`, marginX + 3, innerY);

    doc.setTextColor(5, 150, 105); // emerald-600
    doc.text(`Official Answer: Option ${entry.correctOption} (Correct)`, marginX + 75, innerY);
    innerY += 5;

    // Trap Identified
    doc.setFillColor(254, 242, 242); // rose-50
    doc.setDrawColor(254, 226, 226);
    doc.roundedRect(marginX + 2, innerY - 2.5, contentWidth - 4, trapH + 2, 1, 1, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(159, 18, 57); // rose-800
    doc.text(trapLines, marginX + 4, innerY);
    innerY += trapH + 3.5;

    // Cure / Mnemonic
    doc.setFillColor(254, 252, 232); // amber-50
    doc.setDrawColor(254, 240, 138);
    doc.roundedRect(marginX + 2, innerY - 2.5, contentWidth - 4, mnemH + 2, 1, 1, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(161, 98, 7); // amber-700
    doc.text(mnemonicLines, marginX + 4, innerY);
    innerY += mnemH + 3.5;

    // Candidate Notes
    if (notesH > 0 && noteLines.length > 0) {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(marginX + 2, innerY - 2.5, contentWidth - 4, notesH - 1, 1, 1, 'FD');
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(71, 85, 105);
      doc.text(noteLines, marginX + 4, innerY);
      innerY += notesH + 1;
    }

    y = startY + estimatedBoxHeight + 4;
  });

  // Stamp page numbers and footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 10, pageWidth - marginX, pageHeight - 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Margdarshak Civil Services Mentorship • Active Spaced Error Revision Sheet',
      marginX,
      pageHeight - 6
    );
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - marginX - 16, pageHeight - 6);
  }

  const safeDate = now.toISOString().split('T')[0];
  doc.save(`Margdarshak-Mistakes-${safeDate}.pdf`);
}
