import { useState } from "react";
import jsPDF from "jspdf";
import ATSScoreComparisonHistory from "./Components/ATSComparisonHistory";
import OptimizedResumeHistory from "./Components/OptimizedResumeHistory";
import KeyImprovementsHistory from "./Components/KeyImprovementsHistory";

const HistoryDetail = ({ historyData, setHistoryData }) => {
  const [activeTab, setActiveTab] = useState("enhanced");
  const enhancedResume = historyData.enhancedResume;
  const improvements = historyData.improvements;
  const atsScore = historyData.atsScore;

  const downloadOptimzeResume = () => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    const marginLeft = 72;
    const marginRight = 72;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginLeft - marginRight;
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginBottom = 72;

    let y = 72;

    // ── helpers

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
      doc.setTextColor(67, 56, 0);
      doc.text(title, marginLeft, y);
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

    // ── Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(enhancedResume.contact.name, marginLeft, y);
    y += 26;

    // ── Contact info ─────────────────────────────────────────────────────────
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(`${enhancedResume.contact.phone}  |  ${enhancedResume.contact.email}`, marginLeft, y);
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

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(exp.position, marginLeft, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const periodWidth = doc.getTextWidth(exp.period);
      doc.text(exp.period, pageWidth - marginRight - periodWidth, y);
      y += 14;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(exp.company, marginLeft, y);
      doc.setTextColor(0, 0, 0);
      y += 13;

      exp.responsibilities.forEach((resp) => {
        const bulletLines = doc.splitTextToSize(`• ${resp}`, contentWidth - 14);
        bulletLines.forEach((line, i) => {
          checkPageBreak(13);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.text(line, marginLeft + (i === 0 ? 0 : 14), y);
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
    <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] mb-9 min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ATSScoreComparisonHistory
          atsScore={atsScore}
          onBack={() => setHistoryData(null)}
          onDownload={downloadOptimzeResume}
        />

        {/* Tabs */}
        <div className="bg-white rounded-lg overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.1),0_-4px_8px_rgba(0,0,0,0.05),4px_0_8px_rgba(0,0,0,0.05),-4px_0_8px_rgba(0,0,0,0.05)]">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("enhanced")}
              className={`flex-1 px-6 py-4 font-semibold transition cursor-pointer ${
                activeTab === "enhanced"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Enhanced Resume
            </button>
            <button
              onClick={() => setActiveTab("improvements")}
              className={`flex-1 px-6 py-4 font-semibold transition cursor-pointer ${
                activeTab === "improvements"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Key Improvements
            </button>
          </div>

          <div className="p-6">
            {activeTab === "enhanced" && (
              <OptimizedResumeHistory enhancedResume={enhancedResume} />
            )}
            {activeTab === "improvements" && (
              <KeyImprovementsHistory improvements={improvements} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;