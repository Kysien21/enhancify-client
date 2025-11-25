import { useState } from "react";
import {
  Download,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  convertInchesToTwip,
} from "docx";

const HistoryDetail = ({ historyData, setHistoryData }) => {
  const [activeTab, setActiveTab] = useState("enhanced");
  //   const originalResume = analysisData.originalResume;
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

    // Professional Experience Section
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
            new TextRun({
              text: exp.position,
              bold: true,
            }),
            new TextRun({
              text: "\t",
            }),
            new TextRun({
              text: exp.period,
              bold: false,
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: "right",
              position: convertInchesToTwip(5.5),
            },
          ],
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
            bullet: {
              level: 0,
            },
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
      // Degree with period on the right
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
            }),
            new TextRun({
              text: "\t",
            }),
            new TextRun({
              text: edu.period,
              bold: false,
            }),
          ],
          spacing: { after: 50 },
          tabStops: [
            {
              type: "right",
              position: convertInchesToTwip(5.5),
            },
          ],
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

    // Skills Section
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
        children: [
          new TextRun({
            text: "Technical Skills",
            bold: true,
          }),
        ],
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
        children: [
          new TextRun({
            text: "Soft Skills",
            bold: true,
          }),
        ],
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

    // Certifications Section
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
    <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#f3f8ff] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setHistoryData(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                title="Go back"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back</span>
              </button>
            </div>
            <button
              onClick={downloadOptimzeResume}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Download size={20} />
              Download Optimized Resume
            </button>
          </div>

          {/* ATS Score Comparison */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="text-red-600 font-semibold mb-2">
                Original ATS Score
              </div>
              <div className="text-4xl font-bold text-red-700">
                {atsScore.original}%
              </div>
              <div className="text-sm text-red-600 mt-1">Needs Improvement</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="text-green-600 font-semibold mb-2">
                Enhanced ATS Score
              </div>
              <div className="text-4xl font-bold text-green-700">
                {atsScore.enhanced}%
              </div>
              <div className="text-sm text-green-600 mt-1">Excellent Match</div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="mt-6 space-y-3">
            {atsScore.categories.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {cat.name}
                </div>
                <div className="flex-1 flex gap-2 items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: `${cat.original}%` }}
                    ></div>
                  </div>
                  <TrendingUp className="text-green-600" size={20} />
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${cat.enhanced}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-lg overflow-hidden bg-[#f3f8ff]">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("enhanced")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "enhanced"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Enhanced Resume
            </button>

            <button
              onClick={() => setActiveTab("improvements")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "improvements"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Key Improvements
            </button>
          </div>

          <div className="p-6">
            {activeTab === "enhanced" && (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle
                      className="text-green-600 mr-3 mt-1"
                      size={24}
                    />
                    <div>
                      <h3 className="font-semibold text-green-800">
                        ATS-Optimized Version
                      </h3>
                      <p className="text-green-700 text-sm mt-1">
                        This version includes enhanced keywords, action verbs,
                        and proper formatting for maximum ATS compatibility.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {enhancedResume.contact.name}
                  </h2>
                  <div className="text-gray-600 space-y-1">
                    <p>
                      {enhancedResume.contact.phone} |{" "}
                      {enhancedResume.contact.email}
                    </p>
                    <p>{enhancedResume.contact.location}</p>
                    <p className="text-indigo-600">
                      {enhancedResume.contact.linkedin}
                    </p>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-3">
                    PROFESSIONAL SUMMARY
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {enhancedResume.summary}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-3">
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  {enhancedResume.experience.map((exp, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {exp.position}
                          </h4>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{exp.period}</p>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-3">
                    EDUCATION
                  </h3>
                  {enhancedResume.education.map((edu, idx) => (
                    <div key={idx} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          {edu.relevant && (
                            <p className="text-gray-600 text-sm italic">
                              {edu.relevant}
                            </p>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-3">
                    SKILLS
                  </h3>
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Technical Skills
                    </h4>
                    <p className="text-gray-700">
                      {enhancedResume.skills.technical.join(" • ")}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Soft Skills
                    </h4>
                    <p className="text-gray-700">
                      {enhancedResume.skills.soft.join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-3">
                    LANGUAGES
                  </h3>
                  <p className="text-gray-700">
                    {enhancedResume.languages.join(" • ")}
                  </p>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-3">
                    CERTIFICATIONS & TRAINING
                  </h3>
                  <p className="text-gray-600 italic">
                    {enhancedResume.certifications}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "improvements" && (
              <div className="space-y-4">
                {improvements.map((improvement, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 p-4 rounded-r-lg ${
                      improvement.impact === "critical"
                        ? "bg-red-50 border-red-500"
                        : "bg-blue-50 border-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-800">
                        {improvement.category}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          improvement.impact === "critical"
                            ? "bg-red-200 text-red-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {improvement.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    <ul className="space-y-1 text-gray-700">
                      {improvement.changes.map((change, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle
                            className="text-green-600 mr-2 mt-0.5"
                            size={16}
                          />
                          <span className="text-sm">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;
