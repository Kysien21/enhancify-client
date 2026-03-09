import { useState } from "react";
import jsPDF from "jspdf";

import DashboardHeader from "../Header and Sidebar/DashboardHeader";
import ATSScoreComparison from "./Components/ATSScoreComparison";
import OptimizedResume from "./Components/OptimizedResume";
import OriginalResume from "./Components/OriginalResume";
import KeyImprovements from "./Components/KeyImprovements";

const ATSResumeOptimizer = ({ analysisData, setAnalysisData }) => {
  const [activeTab, setActiveTab] = useState("enhanced");

  const originalResume = analysisData.originalResume;
  const enhancedResume = analysisData.enhancedResume;
  const improvements = analysisData.improvements;
  const atsScore = analysisData.atsScore;

  const downloadOptimzeResume = () => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    const marginLeft = 72;
    const marginRight = 72;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginLeft - marginRight;
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginBottom = 72;

    let y = 72;

    // ── helpers ──────────────────────────────────────────────────────────────

    const checkPageBreak = (neededHeight = 20) => {
      if (y + neededHeight > pageHeight - marginBottom) {
        doc.addPage();
        y = 72;
      }
    };

    const addSectionHeader = (title) => {
      checkPageBreak(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(67, 56, 0); // indigo-700
      doc.text(title, marginLeft, y);
      // underline
      const textWidth = doc.getTextWidth(title);
      doc.setDrawColor(67, 56, 202);
      doc.setLineWidth(0.75);
      doc.line(marginLeft, y + 2, marginLeft + contentWidth, y + 2);
      y += 16;
      doc.setTextColor(0, 0, 0);
    };

    const addWrappedText = (text, fontSize, isBold = false, color = [0, 0, 0], indent = 0) => {
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentWidth - indent);
      lines.forEach((line) => {
        checkPageBreak(fontSize + 4);
        doc.text(line, marginLeft + indent, y);
        y += fontSize + 4;
      });
      doc.setTextColor(0, 0, 0);
    };

    // ── Name ─────────────────────────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(enhancedResume.contact.name, marginLeft, y);
    y += 26;

    // ── Contact info ─────────────────────────────────────────────────────────
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const contactLine = `${enhancedResume.contact.phone}  |  ${enhancedResume.contact.email}`;
    doc.text(contactLine, marginLeft, y);
    y += 13;
    doc.text(enhancedResume.contact.location, marginLeft, y);
    y += 13;
    doc.setTextColor(67, 56, 202);
    doc.text(enhancedResume.contact.linkedin, marginLeft, y);
    y += 20;
    doc.setTextColor(0, 0, 0);

    // ── Professional Summary ──────────────────────────────────────────────────
    addSectionHeader("PROFESSIONAL SUMMARY");
    addWrappedText(enhancedResume.summary, 9.5);
    y += 10;

    // ── Experience ───────────────────────────────────────────────────────────
    addSectionHeader("PROFESSIONAL EXPERIENCE");

    enhancedResume.experience.forEach((exp) => {
      checkPageBreak(40);

      // Position (bold, left) + Period (right)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(exp.position, marginLeft, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const periodWidth = doc.getTextWidth(exp.period);
      doc.text(exp.period, pageWidth - marginRight - periodWidth, y);
      y += 14;

      // Company
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(exp.company, marginLeft, y);
      doc.setTextColor(0, 0, 0);
      y += 13;

      // Responsibilities
      exp.responsibilities.forEach((resp) => {
        const bulletIndent = 14;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const bulletLines = doc.splitTextToSize(`• ${resp}`, contentWidth - bulletIndent);
        bulletLines.forEach((line, i) => {
          checkPageBreak(13);
          doc.text(line, marginLeft + (i === 0 ? 0 : bulletIndent), y);
          y += 13;
        });
      });
      y += 6;
    });

    // ── Education ────────────────────────────────────────────────────────────
    addSectionHeader("EDUCATION");

    enhancedResume.education.forEach((edu) => {
      checkPageBreak(40);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(edu.degree, marginLeft, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const periodWidth = doc.getTextWidth(edu.period);
      doc.text(edu.period, pageWidth - marginRight - periodWidth, y);
      y += 14;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(edu.institution, marginLeft, y);
      y += 13;

      if (edu.relevant) {
        doc.setFont("helvetica", "italic");
        doc.text(edu.relevant, marginLeft, y);
        y += 13;
      }
      doc.setTextColor(0, 0, 0);
      y += 4;
    });

    // ── Skills ───────────────────────────────────────────────────────────────
    addSectionHeader("SKILLS");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Technical Skills", marginLeft, y);
    y += 13;
    addWrappedText(enhancedResume.skills.technical.join(" • "), 9);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Soft Skills", marginLeft, y);
    y += 13;
    addWrappedText(enhancedResume.skills.soft.join(" • "), 9);
    y += 10;

    // ── Languages ────────────────────────────────────────────────────────────
    addSectionHeader("LANGUAGES");
    addWrappedText(enhancedResume.languages.join(" • "), 9);
    y += 10;

    // ── Certifications ───────────────────────────────────────────────────────
    addSectionHeader("CERTIFICATIONS & TRAINING");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    const certLines = doc.splitTextToSize(enhancedResume.certifications, contentWidth);
    certLines.forEach((line) => {
      checkPageBreak(13);
      doc.text(line, marginLeft, y);
      y += 13;
    });

    // ── Save ─────────────────────────────────────────────────────────────────
    doc.save(`${enhancedResume.contact.name}-resume.pdf`);
  };

  return (
    <main>
      <DashboardHeader />

      <section className="flex justify-center">
        <div className="pt-16 sm:pt-20 xl:pt-24 min-h-screen mb-9 w-full">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* ATS SCORE */}
            <ATSScoreComparison
              atsScore={atsScore}
              onBack={() => setAnalysisData(null)}
              onDownload={downloadOptimzeResume}
            />

            {/* SIDE-BY-SIDE RESUMES */}
            <div className="bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),0_-4px_8px_rgba(0,0,0,0.05),4px_0_8px_rgba(0,0,0,0.05),-4px_0_8px_rgba(0,0,0,0.05)] overflow-hidden">

              {/* HEADERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b">
                {/* ORIGINAL LEFT */}
                <div className="px-6 py-4 font-semibold text-center bg-red-500 text-white">
                  Original Resume
                </div>

                {/* ENHANCED RIGHT */}
                <div className="px-6 py-4 font-semibold text-center bg-green-500 text-white">
                  Enhanced Resume
                </div>
              </div>

              {/* CONTENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* ORIGINAL LEFT */}
                <div className="border rounded-lg p-4">
                  <OriginalResume
                    originalResume={originalResume}
                    certifications={enhancedResume.certifications}
                  />
                </div>

                {/* ENHANCED RIGHT */}
                <div className="border rounded-lg p-4">
                  <OptimizedResume enhancedResume={enhancedResume} />
                </div>
              </div>
            </div>

            {/* KEY IMPROVEMENTS */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Key Improvements
              </h3>
              <KeyImprovements improvements={improvements} />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ATSResumeOptimizer;