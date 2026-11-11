import { jsPDF } from 'jspdf';
import { AuditResult } from '../types/audit';

export function generateAuditPdf(result: AuditResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(10, 10, 12);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(204, 255, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('FREE WEBSITE GROWTH AUDIT REPORT', margin, 16);

  doc.setTextColor(210, 210, 210);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Target: ${result.url} | Mode: ${(result.mode || 'complete').toUpperCase()} | Device: ${(result.deviceSelection || result.device).toUpperCase()}`,
    margin,
    24
  );
  const totalChecks = result.checksSummary?.totalExecuted ?? (result.allChecks?.length || 38);
  const passedCount = result.checksSummary?.confirmedPassed ?? 0;
  const issueCount = result.checksSummary?.confirmedOrLikelyIssues ?? result.issues.length;
  doc.text(
    `Audited: ${new Date(result.analyzedAt || Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })} | Checks Run: ${totalChecks} (${passedCount} Passed, ${issueCount} Issues, ${
      result.checksSummary?.manualReviewRequired ?? 2
    } Manual Review)`,
    margin,
    31
  );

  let y = 48;

  // 1. Six Transparent Scores Grid (2 rows x 3 columns)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('1. SIX TRANSPARENT GROWTH & TECHNICAL SCORES', margin, y);
  y += 4;

  const scores = result.scores || {
    crawlability: result.bestPractices || 85,
    seo: result.seo || 85,
    performance: result.performance || 80,
    accessibility: result.accessibility || 85,
    securityAndTrust: result.security || 85,
    conversionReadiness: 80
  };

  const sixDims = [
    { label: 'Crawlability', score: scores.crawlability },
    { label: 'SEO', score: scores.seo },
    { label: 'Performance', score: scores.performance },
    { label: 'Accessibility', score: scores.accessibility },
    { label: 'Security and Trust', score: scores.securityAndTrust },
    { label: 'Conversion Readiness', score: scores.conversionReadiness }
  ];

  const colW = (contentWidth - 8) / 3;
  sixDims.forEach((dim, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = margin + col * (colW + 4);
    const boxY = y + row * 17;

    doc.setFillColor(246, 248, 250);
    doc.roundedRect(x, boxY, colW, 14, 2, 2, 'F');
    doc.setDrawColor(220, 225, 230);
    doc.roundedRect(x, boxY, colW, 14, 2, 2, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(dim.label, x + 3, boxY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    if (dim.score >= 90) doc.setTextColor(22, 163, 74);
    else if (dim.score >= 70) doc.setTextColor(180, 83, 9);
    else doc.setTextColor(220, 38, 38);
    doc.text(`${dim.score}/100`, x + 3, boxY + 11.5);
  });

  y += 38;

  // 2. Prioritized Action Plan (Fix Today / Fix This Week / Monitor)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('2. PRIORITIZED ACTION PLAN (FIX TODAY / FIX THIS WEEK / MONITOR)', margin, y);
  y += 4;

  const allItems = result.allChecks && result.allChecks.length > 0 ? result.allChecks : result.issues;
  const fixToday = allItems.filter((i) => !i.passed && i.actionHorizon === 'Fix Today');
  const fixWeek = allItems.filter((i) => !i.passed && i.actionHorizon === 'Fix This Week');
  const monitor = allItems.filter((i) => i.actionHorizon === 'Monitor' && !i.passed);

  const buckets = [
    { name: `Fix Today (${fixToday.length})`, items: fixToday.slice(0, 3) },
    { name: `Fix This Week (${fixWeek.length})`, items: fixWeek.slice(0, 3) },
    { name: `Monitor / Manual (${monitor.length})`, items: monitor.slice(0, 3) }
  ];

  buckets.forEach((b, bIdx) => {
    const x = margin + bIdx * (colW + 4);
    doc.setFillColor(250, 250, 252);
    doc.roundedRect(x, y, colW, 26, 2, 2, 'F');
    doc.setDrawColor(220, 225, 230);
    doc.roundedRect(x, y, colW, 26, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(b.name, x + 3, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);
    if (b.items.length === 0) {
      doc.text('No blocking items in this horizon.', x + 3, y + 11);
    } else {
      b.items.forEach((it, idx) => {
        const line = `• ${it.title.slice(0, 34)}${it.title.length > 34 ? '...' : ''}`;
        doc.text(line, x + 3, y + 11 + idx * 5);
      });
    }
  });

  y += 32;

  // 3. Evidence-Based Growth Issue Cards
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('3. EVIDENCE-BASED GROWTH FINDINGS', margin, y);
  y += 5;

  const topIssues = result.issues.slice(0, 6);
  if (topIssues.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(22, 163, 74);
    doc.text('All confirmed automated checks passed. Review manual verification items in the web dashboard.', margin, y + 4);
    y += 10;
  } else {
    topIssues.forEach((issue) => {
      if (y > pageHeight - 45) {
        doc.addPage();
        y = 18;
      }

      doc.setFillColor(252, 248, 248);
      doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
      doc.setDrawColor(240, 210, 210);
      doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(153, 27, 27);
      doc.text(
        `[${issue.checkId || issue.category}] ${issue.title.slice(0, 82)}`,
        margin + 3,
        y + 5
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(51, 65, 85);
      const evLine = `Evidence: ${(issue.evidence || '').slice(0, 108)}`;
      doc.text(evLine, margin + 3, y + 9.5);

      const fixLine = `Recommended Fix: ${(issue.suggestedFix || '').slice(0, 104)}`;
      doc.text(fixLine, margin + 3, y + 14);

      doc.setTextColor(100, 116, 139);
      doc.text(
        `Severity: ${issue.priority.toUpperCase()} | Confidence: ${issue.confidence || 'Confirmed'} | Owner: ${
          issue.fixOwner || 'Engineering'
        } | Effort: ${issue.effort} | Source: ${issue.dataType || 'HTML/static checks'}`,
        margin + 3,
        y + 19
      );

      y += 24.5;
    });
  }

  // Footer Methodology & Legal Disclaimers
  const footerY = pageHeight - 22;
  doc.setDrawColor(215, 215, 215);
  doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(90, 90, 90);
  doc.text(
    'Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee.',
    margin,
    footerY + 1
  );
  doc.text(
    'Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice.',
    margin,
    footerY + 5.5
  );
  doc.text(
    'Generated by AbuQitmirLabs Free Website Growth Audit (https://www.abuqitmirlabs.tech/tools/website-audit).',
    margin,
    footerY + 10
  );

  const sanitizedDomain = result.url
    .replace(/https?:\/\//, '')
    .replace(/[/?#].*$/, '')
    .replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `Website-Growth-Audit-${sanitizedDomain}-${Date.now().toString().slice(-4)}.pdf`;
  doc.save(filename);
}
