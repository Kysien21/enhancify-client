import { useState } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  convertInchesToTwip,
} from "docx";

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

    // Contact Information
    sections.push(
      new Paragraph({
        text: `${enhancedResume.contact.phone} | ${enhancedResume.contact.email}`,
        size: 22,
        alignment: AlignmentType.LEFT,
        spacing: { after: 50 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.contact.location,
        size: 22,
        alignment: AlignmentType.LEFT,
        spacing: { after: 50 },
      })
    );

    sections.push(
      new Paragraph({
        text: enhancedResume.contact.linkedin,
        size: 22,
        alignment: AlignmentType.LEFT,
        spacing: { after: 200 },
        color: "4338CA",
      })
    );

    // Summary
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL SUMMARY",
        bold: true,
        size: 24,
        border: {
          bottom: {
            color: "4338CA",
            space: 1,
            style: "single",
            size: 6,
          },
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

    // Experience
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL EXPERIENCE",
        bold: true,
        size: 24,
        border: {
          bottom: {
            color: "4338CA",
            space: 1,
            style: "single",
            size: 6,
          },
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

    // Education
    sections.push(
      new Paragraph({
        text: "EDUCATION",
        bold: true,
        size: 24,
        border: {
          bottom: {
            color: "4338CA",
            space: 1,
            style: "single",
            size: 6,
          },
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

      if (edu.relevant) {
        sections.push(
          new Paragraph({
            text: edu.relevant,
            size: 22,
            italics: true,
            spacing: { after: 150 },
          })
        );
      } else {
        sections.push(new Paragraph({ text: "", spacing: { after: 150 } }));
      }
    });

    // Skills
    sections.push(
      new Paragraph({
        text: "SKILLS",
        bold: true,
        size: 24,
        border: {
          bottom: {
            color: "4338CA",
            space: 1,
            style: "single",
            size: 6,
          },
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

    // Languages
    sections.push(
      new Paragraph({
        text: "LANGUAGES",
        bold: true,
        size: 24,
        border: {
          bottom: {
            color: "4338CA",
            space: 1,
            style: "single",
            size: 6,
          },
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

    // Certifications
    sections.push(
      new Paragraph({
        text: "CERTIFICATIONS & TRAINING",
        bold: true,
        size: 24,
        border: {
          bottom: {
            color: "4338CA",
            space: 1,
            style: "single",
            size: 6,
          },
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
                <div className="px-6 py-4 font-semibold text-center bg-yellow-100 text-yellow-800">
                  Original Resume
                </div>

                {/* ENHANCED RIGHT */}
                <div className="px-6 py-4 font-semibold text-center bg-indigo-600 text-white">
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
