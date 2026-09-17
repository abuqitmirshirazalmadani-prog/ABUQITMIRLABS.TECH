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
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  // Background Header
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Brand Name
  doc.setTextColor(204, 255, 0); // #ccff00 Neon Yellow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('ABUQITMIRLABS.TECH', margin, 18);

  // Subtitle
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('AI-POWERED WEBSITE PERFORMANCE, SEO & SECURITY AUDIT', margin, 26);
  doc.text(`Audited: ${new Date(result.analyzedAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Device: ${result.device.toUpperCase()} | Ref: AQL-AUD-${Math.floor(100000 + Math.random() * 900000)}`, margin, 32);

  // Overall Score Badge on top right
  doc.setFillColor(25, 25, 25);
  doc.roundedRect(pageWidth - margin - 45, 10, 45, 22, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('OVERALL GRADE', pageWidth - margin - 41, 17);
  doc.setFontSize(14);
  doc.setTextColor(204, 255, 0);
  doc.text(`${result.grade} (${result.overallScore}/100)`, pageWidth - margin - 41, 27);

  let y = 50;

  // URL & Executive Summary Box
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'F');
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('AUDITED TARGET URL', margin + 6, y + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  const truncatedUrl = result.url.length > 70 ? result.url.slice(0, 67) + '...' : result.url;
  doc.text(truncatedUrl, margin + 6, y + 14);

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Engine: ${result.engine} | ${result.issueCount} Total Issues Found across 5 Assessment Dimensions`, margin + 6, y + 19);

  y += 30;

  // Category Scores 5-Column Grid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('1. CORE CATEGORY SCORES', margin, y);
  y += 5;

  const cats = [
    { label: 'Performance', score: result.performance },
    { label: 'SEO', score: result.seo },
    { label: 'Accessibility', score: result.accessibility },
    { label: 'Best Practices', score: result.bestPractices },
    { label: 'Security', score: result.security }
  ];

  const colWidth = (contentWidth - 8) / 5;
  cats.forEach((cat, idx) => {
    const colX = margin + (idx * (colWidth + 2));
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(colX, y, colWidth, 18, 2, 2, 'F');
    doc.setDrawColor(220, 225, 230);
    doc.roundedRect(colX, y, colWidth, 18, 2, 2, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(cat.label, colX + 3, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    if (cat.score >= 90) doc.setTextColor(34, 197, 94);
    else if (cat.score >= 70) doc.setTextColor(161, 98, 7);
    else doc.setTextColor(220, 38, 38);
    doc.text(`${cat.score}/100`, colX + 3, y + 14);
  });

  y += 24;

  // Core Web Vitals Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('2. GOOGLE CORE WEB VITALS BENCHMARK', margin, y);
  y += 5;

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text('Metric Name', margin + 4, y + 5);
  doc.text('Observed Value', margin + 65, y + 5);
  doc.text('Google 2026 Target', margin + 110, y + 5);
  doc.text('Evaluation Status', margin + 145, y + 5);
  y += 7;

  const cwvRows = [
    { name: 'Largest Contentful Paint (LCP)', val: `${result.cwv.lcp}s`, target: '< 2.5s', status: result.cwv.lcp <= 2.5 ? 'PASS' : result.cwv.lcp <= 4.0 ? 'NEEDS WORK' : 'POOR' },
    { name: 'Cumulative Layout Shift (CLS)', val: `${result.cwv.cls}`, target: '< 0.10', status: result.cwv.cls <= 0.10 ? 'PASS' : result.cwv.cls <= 0.25 ? 'NEEDS WORK' : 'POOR' },
    { name: 'Interaction to Next Paint (INP)', val: `${result.cwv.inp}ms`, target: '< 200ms', status: result.cwv.inp <= 200 ? 'PASS' : result.cwv.inp <= 500 ? 'NEEDS WORK' : 'POOR' },
    { name: 'First Contentful Paint (FCP)', val: `${result.cwv.fcp}s`, target: '< 1.8s', status: result.cwv.fcp <= 1.8 ? 'PASS' : result.cwv.fcp <= 3.0 ? 'NEEDS WORK' : 'POOR' },
    { name: 'Time to First Byte (TTFB)', val: `${result.cwv.ttfb}ms`, target: '< 800ms', status: result.cwv.ttfb <= 800 ? 'PASS' : result.cwv.ttfb <= 1800 ? 'NEEDS WORK' : 'POOR' }
  ];

  cwvRows.forEach((row, rIdx) => {
    doc.setFillColor(rIdx % 2 === 0 ? 255 : 248, 250, 252);
    doc.rect(margin, y, contentWidth, 6.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(row.name, margin + 4, y + 4.5);
    doc.text(row.val, margin + 65, y + 4.5);
    doc.setTextColor(100, 116, 139);
    doc.text(row.target, margin + 110, y + 4.5);

    doc.setFont('helvetica', 'bold');
    if (row.status === 'PASS') {
      doc.setTextColor(22, 163, 74);
    } else if (row.status === 'NEEDS WORK') {
      doc.setTextColor(202, 138, 4);
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(row.status, margin + 145, y + 4.5);
    y += 6.5;
  });

  y += 8;

  // Critical Issues Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('3. PRIORITY ISSUES IDENTIFIED', margin, y);
  y += 5;

  const topIssues = result.issues.slice(0, 4);
  if (topIssues.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(22, 163, 74);
    doc.text('No high or critical priority issues detected. Great job maintaining site health!', margin + 4, y + 4);
    y += 8;
  } else {
    topIssues.forEach((issue) => {
      doc.setFillColor(254, 242, 242);
      doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(185, 28, 28);
      doc.text(`[${issue.category.toUpperCase()}] ${issue.title}`, margin + 4, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      const descLine = issue.description.length > 110 ? issue.description.slice(0, 107) + '...' : issue.description;
      doc.text(descLine, margin + 4, y + 9.5);

      doc.setFontSize(6.5);
      doc.setTextColor(120, 120, 120);
      doc.text(`Priority: ${issue.priority.toUpperCase()} | Impact: ${issue.impact} | Effort: ${issue.effort}`, margin + 4, y + 12.5);

      y += 16;
    });
  }

  y += 4;

  // AI-Powered Recommendations
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('4. TOP IMPACT AI-POWERED ACTION PLAN', margin, y);
  y += 5;

  result.recommendations.slice(0, 3).forEach((rec, idx) => {
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, contentWidth, 13, 2, 2, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin, y, contentWidth, 13, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(21, 128, 61);
    doc.text(`#${idx + 1}: ${rec.title} (+${rec.scoreGain} Pts Potential Gain)`, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    const recDesc = rec.description.length > 115 ? rec.description.slice(0, 112) + '...' : rec.description;
    doc.text(recDesc, margin + 4, y + 9);

    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Estimated Resolution Time: ${rec.timeToFix} | Complexity: ${rec.difficulty}`, margin + 4, y + 11.8);

    y += 15;
  });

  // Footer / Next Steps
  const footerY = pageHeight - 20;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 10, 10);
  doc.text('Need AbuQitmirLabs to implement these fixes with guaranteed 90+ Lighthouse scores?', margin, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Contact AbuQitmirLabs Engineering: hello@abuqitmirlabs.tech | Website: https://www.abuqitmirlabs.tech', margin, footerY + 5);
  doc.text('This automated audit report is generated for diagnostic guidance. Retainers and guarantee SLAs are available upon request.', margin, footerY + 9);

  // Save the PDF
  const sanitizedDomain = result.url.replace(/https?:\/\//, '').replace(/[\/\?#].*$/, '').replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `AbuQitmirLabs-Audit-${sanitizedDomain}-${Date.now().toString().slice(-4)}.pdf`;
  doc.save(filename);
}
