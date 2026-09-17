import { jsPDF } from 'jspdf';
import { EstimateResult } from '../types/estimator';

export function generateEstimatePdf(estimate: EstimateResult, customIdeaText?: string): void {
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
  doc.text('AI-POWERED SOFTWARE PROJECT COST ESTIMATE REPORT', margin, 26);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Ref: AQL-EST-${Math.floor(100000 + Math.random() * 900000)}`, margin, 32);

  // Target Country Tag on top right
  doc.setFillColor(25, 25, 25);
  doc.roundedRect(pageWidth - margin - 50, 12, 50, 18, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(`REGION: ${estimate.targetCountry.name.toUpperCase()}`, pageWidth - margin - 46, 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(204, 255, 0);
  doc.text(`Multiplier: ${estimate.targetCountry.multiplier}x`, pageWidth - margin - 46, 26);

  let y = 52;

  // Executive Summary Box
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'F');
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE SCOPE & BUDGET ESTIMATE', margin + 6, y + 8);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const ideaDisplay = customIdeaText || estimate.detectedSummary;
  const splitIdea = doc.splitTextToSize(ideaDisplay, contentWidth - 12);
  doc.text(splitIdea.slice(0, 2), margin + 6, y + 14);

  // 4 Metrics inside box
  const colWidth = (contentWidth - 12) / 4;
  const metricsY = y + 23;

  // Total Cost PKR
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('ESTIMATED COST (PKR)', margin + 6, metricsY);
  doc.setFontSize(9.5);
  doc.setTextColor(0, 102, 255);
  doc.text(`PKR ${(estimate.totalCostPKR.min / 1000).toFixed(0)}k - ${(estimate.totalCostPKR.max / 1000).toFixed(0)}k`, margin + 6, metricsY + 5);

  // Total Cost USD
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('ESTIMATED COST (USD)', margin + 6 + colWidth, metricsY);
  doc.setFontSize(9.5);
  doc.setTextColor(34, 197, 94);
  doc.text(`$${estimate.totalCostUSD.min.toLocaleString()} - $${estimate.totalCostUSD.max.toLocaleString()}`, margin + 6 + colWidth, metricsY + 5);

  // Total Engineering Hours & Timeline
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('HOURS & TIMELINE', margin + 6 + (colWidth * 2), metricsY);
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  const hoursText = estimate.totalEngineeringHours 
    ? `${estimate.totalEngineeringHours.min}–${estimate.totalEngineeringHours.max} hrs (${estimate.timelineWeeks.min}–${estimate.timelineWeeks.max}w)`
    : `${estimate.timelineWeeks.min}–${estimate.timelineWeeks.max} Weeks`;
  doc.text(hoursText, margin + 6 + (colWidth * 2), metricsY + 5);

  // Complexity & Rate
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('COMPLEXITY / RATE', margin + 6 + (colWidth * 3), metricsY);
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  const rateText = estimate.developerRateUSD 
    ? `${estimate.complexity} ($${estimate.developerRateUSD.min}–$${estimate.developerRateUSD.max}/hr)`
    : `${estimate.complexity} (${estimate.confidence}%)`;
  doc.text(rateText, margin + 6 + (colWidth * 3), metricsY + 5);

  y += 46;

  // Section 1: Phase-wise Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 10, 10);
  doc.text('1. PHASE-WISE WORK BREAKDOWN', margin, y);
  y += 5;

  // Table Header
  doc.setFillColor(235, 240, 245);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(50, 60, 70);
  doc.text('Project Phase', margin + 4, y + 5);
  doc.text('Est. Hours', margin + 110, y + 5);
  doc.text('Est. Cost (PKR)', margin + 140, y + 5);
  y += 7;

  doc.setFont('helvetica', 'normal');
  estimate.phases.forEach((phase, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(250, 252, 254);
      doc.rect(margin, y, contentWidth, 7, 'F');
    }
    doc.setTextColor(20, 20, 20);
    doc.text(phase.name, margin + 4, y + 5);
    doc.setTextColor(80, 80, 80);
    doc.text(`${phase.hoursMin} - ${phase.hoursMax} hrs`, margin + 110, y + 5);
    doc.text(`PKR ${(phase.costMin / 1000).toFixed(0)}k - ${(phase.costMax / 1000).toFixed(0)}k`, margin + 140, y + 5);
    y += 7;
  });

  y += 6;

  // Section 2: Country Cost Comparison Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 10, 10);
  doc.text('2. INTERNATIONAL BENCHMARK COMPARISON', margin, y);
  y += 5;

  doc.setFillColor(235, 240, 245);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(50, 60, 70);
  doc.text('Country / Market', margin + 4, y + 5);
  doc.text('Multiplier', margin + 65, y + 5);
  doc.text('Cost Range (USD)', margin + 95, y + 5);
  doc.text('Cost vs USA Baseline', margin + 140, y + 5);
  y += 7;

  doc.setFont('helvetica', 'normal');
  estimate.countryComparison.slice(0, 5).forEach((c, idx) => {
    if (c.countryCode === 'PK') {
      doc.setFillColor(240, 253, 244);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setTextColor(21, 128, 61);
      doc.setFont('helvetica', 'bold');
    } else {
      if (idx % 2 === 1) {
        doc.setFillColor(250, 252, 254);
        doc.rect(margin, y, contentWidth, 7, 'F');
      }
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'normal');
    }

    doc.text(`${c.flag} ${c.country}`, margin + 4, y + 5);
    doc.text(`${c.multiplier.toFixed(1)}x`, margin + 65, y + 5);
    doc.text(`$${c.costMinUSD.toLocaleString()} - $${c.costMaxUSD.toLocaleString()}`, margin + 95, y + 5);
    doc.text(c.savingsVsUSA || '-', margin + 140, y + 5);
    y += 7;
  });

  y += 6;

  // Section 3: Strategic Suggestions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 10, 10);
  doc.text('3. STRATEGIC ARCHITECTURAL RECOMMENDATIONS', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);

  estimate.suggestions.slice(0, 3).forEach((sug) => {
    const wrapped = doc.splitTextToSize(`• ${sug}`, contentWidth - 4);
    doc.text(wrapped, margin + 2, y);
    y += (wrapped.length * 4.2);
  });

  // Footer / Next Steps
  const footerY = pageHeight - 24;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(10, 10, 10);
  doc.text('Ready to turn this estimate into a guaranteed production delivery?', margin, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Contact AbuQitmirLabs Engineering: hello@abuqitmirlabs.tech | Website: https://www.abuqitmirlabs.tech', margin, footerY + 5);
  doc.text('Note: This automated preliminary estimate is based on market averages and does not constitute a legally binding quote.', margin, footerY + 9);

  // Save the PDF
  const filename = `AbuQitmirLabs-Estimate-${estimate.targetCountry.code}-${Date.now().toString().slice(-4)}.pdf`;
  doc.save(filename);
}
