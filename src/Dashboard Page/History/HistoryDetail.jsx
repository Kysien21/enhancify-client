import { useState } from "react";
import { Download, CheckCircle, TrendingUp, ArrowLeft } from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  convertInchesToTwip,
} from "docx";
import ATSScoreComparisonHistory from "./Components/ATSComparisonHistory";
import OptimizedResumeHistory from "./Components/OptimizedResumeHistory";
import KeyImprovementsHistory from "./Components/KeyImprovementsHistory";

const HistoryDetail = ({ historyData, setHistoryData }) => {
  const [activeTab, setActiveTab] = useState("enhanced");
  const enhancedResume = historyData.enhancedResume;
  const improvements = historyData.improvements;
  const atsScore = historyData.atsScore;

  const downloadOptimzeResume = async () => {
    const sections = [];

    // Name
    sections.push(
      new Paragraph({
        text: enhancedResume.contact.name,
        bold: true,
        size: 32,
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
      })
    );

    // Contact Information - Phone | Email
    sections.push(
      new Paragraph({
        text: `${enhancedResume.contact.phone} | ${enhancedResume.contact.email}`,
        size: 22,
        alignment: AlignmentType.LEFT,
        spacing: { after: 50 },
      })
    );

    // Location
    sections.push(
      new Paragraph({
        text: enhancedResume.contact.location,
        size: 22,
        alignment: AlignmentType.LEFT,
        spacing: { after: 50 },
      })
    );

    // LinkedIn
    sections.push(
      new Paragraph({
        text: enhancedResume.contact.linkedin,
        size: 22,
        alignment: AlignmentType.LEFT,
        spacing: { after: 200 },
        color: "4338CA",
      })
    );

    // Professional Summary Section
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL SUMMARY",
        bold: true,
        size: 24,
        border: {
          bottom: { color: "4338CA", space: 1, style: "single", size: 6 },
        },
        spacing: { after: 200 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.summary,
        spacing: { after: 300 },
        alignment: AlignmentType.JUSTIFIED,
      })
    );

    // Professional Experience Section
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL EXPERIENCE",
        bold: true,
        size: 24,
        border: {
          bottom: { color: "4338CA", space: 1, style: "single", size: 6 },
        },
        spacing: { after: 200 },
      })
    );

    enhancedResume.experience.forEach((exp) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position, bold: true }),
            new TextRun({ text: "\t" }),
            new TextRun({ text: exp.period }),
          ],
          spacing: { after: 50 },
          tabStops: [{ type: "right", position: convertInchesToTwip(5.5) }],
        })
      );

      sections.push(
        new Paragraph({
          text: exp.company,
          size: 22,
          spacing: { after: 150 },
        })
      );

      exp.responsibilities.forEach((resp) => {
        sections.push(
          new Paragraph({
            text: resp,
            spacing: { after: 100 },
            indent: { left: convertInchesToTwip(0.25) },
            bullet: { level: 0 },
          })
        );
      });
    });

    sections.push(new Paragraph({ text: "", spacing: { after: 150 } }));

    // Education Section
    sections.push(
      new Paragraph({
        text: "EDUCATION",
        bold: true,
        size: 24,
        border: {
          bottom: { color: "4338CA", space: 1, style: "single", size: 6 },
        },
        spacing: { after: 200 },
      })
    );

    enhancedResume.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true }),
            new TextRun({ text: "\t" }),
            new TextRun({ text: edu.period }),
          ],
          spacing: { after: 50 },
          tabStops: [{ type: "right", position: convertInchesToTwip(5.5) }],
        })
      );

      sections.push(
        new Paragraph({
          text: edu.institution,
          size: 22,
          spacing: { after: 50 },
        })
      );

      sections.push(
        new Paragraph({
          text: edu.relevant || "",
          size: 22,
          italics: !!edu.relevant,
          spacing: { after: 150 },
        })
      );
    });

    // Skills Section
    sections.push(
      new Paragraph({
        text: "SKILLS",
        bold: true,
        size: 24,
        border: {
          bottom: { color: "4338CA", space: 1, style: "single", size: 6 },
        },
        spacing: { after: 200 },
      })
    );

    sections.push(
      new Paragraph({
        children: [new TextRun({ text: "Technical Skills", bold: true })],
        spacing: { after: 100 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.skills.technical.join(" • "),
        spacing: { after: 150 },
      })
    );

    sections.push(
      new Paragraph({
        children: [new TextRun({ text: "Soft Skills", bold: true })],
        spacing: { after: 100 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.skills.soft.join(" • "),
        spacing: { after: 300 },
      })
    );

    // Languages Section
    sections.push(
      new Paragraph({
        text: "LANGUAGES",
        bold: true,
        size: 24,
        border: {
          bottom: { color: "4338CA", space: 1, style: "single", size: 6 },
        },
        spacing: { after: 200 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.languages.join(" • "),
        spacing: { after: 300 },
      })
    );

    // Certifications Section
    sections.push(
      new Paragraph({
        text: "CERTIFICATIONS & TRAINING",
        bold: true,
        size: 24,
        border: {
          bottom: { color: "4338CA", space: 1, style: "single", size: 6 },
        },
        spacing: { after: 200 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.certifications,
        italics: true,
        spacing: { after: 0 },
      })
    );

    // Create document
    const doc = new Document({
      sections: [
        {
          children: sections,
          margins: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
          },
        },
      ],
    });

    // Generate and download
    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${enhancedResume.contact.name}-resume.docx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] mb-9 min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ATSScoreComparisonHistory
          atsScore={atsScore}
          onBack={() => setAnalysisData(null)}
          onDownload={downloadOptimzeResume}
        />

        {/* Tabs */}
        <div className="bg-[#f5f5ff] rounded-lg overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.1),0_-4px_8px_rgba(0,0,0,0.05),4px_0_8px_rgba(0,0,0,0.05),-4px_0_8px_rgba(0,0,0,0.05)]">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("enhanced")}
              className={`flex-1 px-6 py-4 font-semibold transition cursor-pointer ${
                activeTab === "enhanced"
                  ? "bg-indigo-600 text-white"
                  : "bg-[#f5f5ff] text-gray-600 hover:bg-gray-100"
              }`}
            >
              Enhanced Resume
            </button>
            <button
              onClick={() => setActiveTab("improvements")}
              className={`flex-1 px-6 py-4 font-semibold transition cursor-pointer ${
                activeTab === "improvements"
                  ? "bg-indigo-600 text-white"
                  : "bg-[#f5f5ff] text-gray-600 hover:bg-gray-100"
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
