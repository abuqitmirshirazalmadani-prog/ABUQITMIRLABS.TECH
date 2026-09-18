import { jsPDF } from 'jspdf';
import { SeoChecklist } from '../types/seoChecklist';

export interface GeneratedPdfResult {
  doc: jsPDF;
  filename: string;
  blob: Blob;
  blobUrl: string;
  download: () => void;
}

export function generateSeoChecklistPdf(
  checklist: SeoChecklist,
  completedMap: Record<string, boolean> = {}
): GeneratedPdfResult {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  let y = 18;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 18;
      // Header on subsequent pages
      doc.setFillColor(15, 15, 15);
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setTextColor(204, 255, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('ABUQITMIRLABS.TECH — ACTIONABLE SEO ROADMAP', margin, 8);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'normal');
      doc.text(`${checklist.industry.toUpperCase()} · ${checklist.businessType.toUpperCase()}`, pageWidth - margin - 40, 8);
      y = 22;
    }
  };

  // --- Cover / Header Banner (Page 1) ---
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 44, 'F');

  doc.setTextColor(204, 255, 0); // Neon yellow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('ABUQITMIRLABS.TECH', margin, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('CUSTOM SEO & DIGITAL VISIBILITY CHECKLIST', margin, 24);

  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    `Industry: ${checklist.industry.toUpperCase()} | Business: ${checklist.businessType.toUpperCase()} | Stage: ${checklist.stage.toUpperCase()}`,
    margin,
    32
  );
  doc.text(
    `Generated: ${new Date(checklist.generatedAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Target Goal: ${checklist.goal.toUpperCase()}`,
    margin,
    38
  );

  y = 52;

  // --- Executive Metrics Summary ---
  const totalCompleted = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = checklist.totalTasks > 0
    ? Math.round((totalCompleted / checklist.totalTasks) * 100)
    : 0;

  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'S');

  const colW = contentWidth / 4;
  const stats = [
    { label: 'TOTAL TASKS', val: `${checklist.totalTasks}` },
    { label: 'HIGH PRIORITY', val: `${checklist.priorityTasks}` },
    { label: 'EST. DURATION', val: `${checklist.estimatedWeeks} Weeks` },
    { label: 'COMPLETED', val: `${totalCompleted} (${progressPercent}%)` }
  ];

  stats.forEach((s, idx) => {
    const x = margin + idx * colW + 8;
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(s.label, x, y + 8);

    doc.setTextColor(15, 15, 15);
    doc.setFontSize(13);
    doc.text(s.val, x, y + 17);
  });

  y += 32;

  // --- Top 3 Strategic Priorities ---
  checkPageBreak(36);
  doc.setFillColor(15, 15, 15);
  doc.roundedRect(margin, y, contentWidth, 8, 1, 1, 'F');
  doc.setTextColor(204, 255, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('EXECUTIVE ACTION PLAN: TOP 3 STRATEGIC PRIORITIES', margin + 4, y + 5.5);
  y += 12;

  checklist.topPriorities.forEach((p, idx) => {
    checkPageBreak(16);
    doc.setTextColor(20, 20, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${idx + 1}. ${p.title}`, margin + 2, y);
    y += 4.5;

    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const reasonLines = doc.splitTextToSize(p.reason, contentWidth - 4);
    doc.text(reasonLines, margin + 6, y);
    y += reasonLines.length * 4 + 3;
  });

  y += 4;

  // --- Phases & Tasks ---
  checklist.phases.forEach((phase) => {
    checkPageBreak(25);

    // Phase Header Box
    doc.setFillColor(235, 238, 242);
    doc.roundedRect(margin, y, contentWidth, 10, 1.5, 1.5, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`${phase.title} (${phase.timeframe})`, margin + 4, y + 6.5);

    y += 13;

    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text(phase.description, margin + 2, y);
    y += 5.5;

    phase.tasks.forEach((task) => {
      const isDone = completedMap[task.id] || false;
      checkPageBreak(20);

      // Task Box
      doc.setFillColor(252, 252, 252);
      doc.setDrawColor(230, 230, 230);
      doc.roundedRect(margin, y, contentWidth, 18, 1, 1, 'FD');

      // Checkbox square
      doc.setDrawColor(120, 120, 120);
      doc.rect(margin + 3, y + 3.5, 4.5, 4.5, 'S');
      if (isDone) {
        doc.setFillColor(34, 197, 94);
        doc.rect(margin + 3.5, y + 4, 3.5, 3.5, 'F');
      }

      // Title & Priority Badge
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(task.title, margin + 11, y + 6.5);

      // Priority pill
      const prioColor =
        task.priority === 'high' ? [220, 38, 38] : task.priority === 'medium' ? [217, 119, 6] : [22, 163, 74];
      doc.setTextColor(prioColor[0], prioColor[1], prioColor[2]);
      doc.setFontSize(7.5);
      doc.text(`[${task.priority.toUpperCase()}] · ${task.estimatedTime} · Impact: ${task.impact}`, pageWidth - margin - 55, y + 6.5);

      // Description
      doc.setTextColor(90, 90, 90);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const descLines = doc.splitTextToSize(task.description, contentWidth - 14);
      doc.text(descLines.slice(0, 2), margin + 11, y + 11.5);

      y += 21;
    });

    y += 4;
  });

  // --- Quick Wins & Common Mistakes Page ---
  checkPageBreak(40);
  doc.setFillColor(15, 15, 15);
  doc.roundedRect(margin, y, contentWidth, 8, 1, 1, 'F');
  doc.setTextColor(204, 255, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('STRATEGIC QUICK WINS & PITFALLS TO AVOID', margin + 4, y + 5.5);
  y += 12;

  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('⚡ High-Velocity Quick Wins (Implement This Week):', margin + 2, y);
  y += 5;

  checklist.quickWins.forEach((qw) => {
    checkPageBreak(8);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`• ${qw}`, margin + 6, y);
    y += 4.5;
  });

  y += 4;
  checkPageBreak(25);
  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`⚠️ Common ${checklist.industry.toUpperCase()} SEO Pitfalls to Avoid:`, margin + 2, y);
  y += 5;

  checklist.commonMistakes.forEach((cm) => {
    checkPageBreak(8);
    doc.setTextColor(180, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`✕ ${cm}`, margin + 6, y);
    y += 4.5;
  });

  // Footer CTA
  checkPageBreak(22);
  y += 6;
  doc.setFillColor(10, 10, 10);
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setTextColor(204, 255, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('NEED PROFESSIONAL EXECUTION? PARTNER WITH ABUQITMIRLABS', margin + 6, y + 7);
  doc.setTextColor(230, 230, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Visit https://www.abuqitmirlabs.tech/seo-mastery or email contact@abuqitmirlabs.tech for a custom audit.', margin + 6, y + 13);

  // Generate Filename & Blob
  const sanitizedIndustry = (checklist.industry || 'general').replace(/[^a-zA-Z0-9]/g, '-');
  const sanitizedBiz = (checklist.businessType || 'site').replace(/[^a-zA-Z0-9]/g, '-');
  const filename = `AbuQitmirLabs-${sanitizedIndustry}-${sanitizedBiz}-SEO-Checklist.pdf`;

  let blob: Blob;
  let blobUrl = '';
  try {
    blob = doc.output('blob');
    if (typeof window !== 'undefined' && window.URL && window.URL.createObjectURL) {
      blobUrl = window.URL.createObjectURL(blob);
    }
  } catch (e) {
    console.warn('Could not generate PDF blob output:', e);
    blob = new Blob([], { type: 'application/pdf' });
  }

  const download = () => {
    try {
      doc.save(filename);
    } catch (saveErr) {
      console.warn('doc.save failed (possibly sandboxed iframe), using direct anchor fallback:', saveErr);
      if (blobUrl && typeof document !== 'undefined') {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          try {
            document.body.removeChild(link);
          } catch (e) {
            // ignore
          }
        }, 1000);
      }
    }
  };

  return {
    doc,
    filename,
    blob,
    blobUrl,
    download
  };
}
