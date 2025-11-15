import React, { useState } from "react";
import {
  Download,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  UnderlineType,
  convertInchesToTwip,
} from "docx";

const ATSResumeOptimizer = ({ analysisData, setAnalysisData }) => {
  const [activeTab, setActiveTab] = useState("enhanced");
  const originalResume = analysisData.originalResume;
  const enhancedResume = analysisData.enhancedResume;
  const improvements = analysisData.improvements;
  const atsScore = analysisData.atsScore;

  // const originalResume = {
  //   contact: {
  //     name: "JOANA MAE GALLARDO",
  //     phone: "09458345865",
  //     email: "gallardojoanamae77@gmail.com",
  //     address: "p5b-Magdagooc, Jabonga, Agusan Del Norte",
  //   },
  //   summary:
  //     "Energetic and service-oriented BS in Forestry graduate with a strong foundation in environmental science, communication, and fieldwork. Known for being reliable, approachable, and quick to learn in dynamic retail environments. Passionate about helping customers find what they need while maintaining positive shopping experience. Equipped strong interpersonal skills, attention to detail, commitment",
  //   experience: [
  //     {
  //       position: "Intern",
  //       company: "Cenro-Tubay",
  //       period: "June - July 2024",
  //       responsibilities: [
  //         "Working with the professional foresters",
  //         "Manage encoding, printing, and inventory",
  //       ],
  //     },
  //   ],
  //   education: [
  //     {
  //       institution: "Magdagooc National High School - Senior High School",
  //       period: "2015-2021",
  //     },
  //     {
  //       institution: "Juan L Subrastas Elementary School",
  //       period: "2007-2015",
  //     },
  //   ],
  //   skills: ["Leadership", "Customer Service", "Creative-thinking"],
  //   languages: ["English", "Filipino"],
  // };

  // const enhancedResume = {
  //   contact: {
  //     name: "JOANA MAE GALLARDO",
  //     phone: "+63 945 834 5865",
  //     email: "gallardojoanamae77@gmail.com",
  //     location: "Jabonga, Agusan Del Norte, Philippines",
  //     linkedin: "[Add LinkedIn Profile]",
  //   },
  //   summary:
  //     "Results-driven Bachelor of Science in Forestry graduate with hands-on experience in environmental management, forest conservation, and data administration. Demonstrates strong analytical skills, attention to detail, and proficiency in office management systems. Proven ability to collaborate with forestry professionals, manage documentation workflows, and support sustainable resource management initiatives. Seeking entry-level positions in forestry, environmental science, customer service, or administrative roles where I can apply technical knowledge and interpersonal skills.",
  //   experience: [
  //     {
  //       position: "Forestry Intern",
  //       company:
  //         "Community Environment and Natural Resources Office (CENRO) - Tubay",
  //       period: "June 2024 - July 2024",
  //       responsibilities: [
  //         "Collaborated with professional foresters on environmental conservation projects and forest resource assessments",
  //         "Managed data entry, encoding, and documentation for forest inventory systems with 100% accuracy",
  //         "Coordinated printing and distribution of forestry reports, permits, and environmental compliance documents",
  //         "Maintained inventory tracking systems for equipment, supplies, and forestry documentation",
  //         "Supported field operations and contributed to sustainable forest management practices",
  //       ],
  //     },
  //   ],
  //   education: [
  //     {
  //       degree: "Bachelor of Science in Forestry",
  //       institution: "Magdagooc National High School",
  //       period: "2015-2021",
  //       relevant:
  //         "Relevant Coursework: Environmental Science, Forest Ecology, Natural Resource Management, GIS Mapping",
  //     },
  //     {
  //       degree: "Elementary Education",
  //       institution: "Juan L. Subrastas Elementary School",
  //       period: "2007-2015",
  //     },
  //   ],
  //   skills: {
  //     technical: [
  //       "Data Entry & Management",
  //       "Microsoft Office Suite (Word, Excel, PowerPoint)",
  //       "Inventory Management Systems",
  //       "Document Processing & Filing",
  //       "Forest Inventory Techniques",
  //       "Environmental Assessment",
  //       "Record Keeping & Documentation",
  //     ],
  //     soft: [
  //       "Customer Service Excellence",
  //       "Team Leadership & Collaboration",
  //       "Critical Thinking & Problem Solving",
  //       "Verbal & Written Communication",
  //       "Adaptability & Quick Learning",
  //       "Time Management & Organization",
  //       "Attention to Detail",
  //     ],
  //   },
  //   languages: ["English (Fluent)", "Filipino (Native)"],
  //   certifications:
  //     "[Add: On-the-Job Training Certificate, Seminars, or Relevant Certifications]",
  // };

  // const improvements = [
  //   {
  //     category: "Contact Information",
  //     changes: [
  //       "Formatted phone number with country code",
  //       "Streamlined address for better readability",
  //       "Added LinkedIn profile placeholder (recommended)",
  //     ],
  //     impact: "high",
  //   },
  //   {
  //     category: "Professional Summary",
  //     changes: [
  //       "Expanded from 64 to 85 words with industry keywords",
  //       "Added specific skills: 'data administration', 'forest conservation', 'environmental management'",
  //       "Included quantifiable qualities and career objectives",
  //       "Fixed grammatical issues",
  //     ],
  //     impact: "high",
  //   },
  //   {
  //     category: "Work Experience",
  //     changes: [
  //       "Changed title from 'Intern' to 'Forestry Intern' for clarity",
  //       "Expanded CENRO acronym for ATS recognition",
  //       "Transformed 2 basic bullets into 5 detailed accomplishment statements",
  //       "Added action verbs: 'Collaborated', 'Managed', 'Coordinated', 'Maintained', 'Supported'",
  //       "Included quantifiable metric (100% accuracy)",
  //       "Added relevant forestry terminology",
  //     ],
  //     impact: "critical",
  //   },
  //   {
  //     category: "Education",
  //     changes: [
  //       "Added 'Bachelor of Science in Forestry' degree title",
  //       "Included relevant coursework for ATS keyword matching",
  //       "Properly formatted school names",
  //     ],
  //     impact: "high",
  //   },
  //   {
  //     category: "Skills Section",
  //     changes: [
  //       "Reorganized into 'Technical' and 'Soft Skills' categories",
  //       "Expanded from 3 to 14 skills with specific competencies",
  //       "Added industry-specific keywords: GIS, Environmental Assessment, Forest Inventory",
  //       "Included computer skills (Microsoft Office Suite)",
  //       "Used full phrases instead of single words",
  //     ],
  //     impact: "critical",
  //   },
  //   {
  //     category: "ATS Keywords Added",
  //     changes: [
  //       "Forestry-specific: forest conservation, resource management, environmental science",
  //       "Technical: data entry, inventory management, documentation, MS Office",
  //       "Soft skills: collaboration, problem-solving, communication",
  //       "Action verbs throughout for better parsing",
  //     ],
  //     impact: "critical",
  //   },
  // ];

  // const atsScore = {
  //   original: 42,
  //   enhanced: 88,
  //   categories: [
  //     { name: "Keywords", original: 35, enhanced: 90 },
  //     { name: "Formatting", original: 60, enhanced: 95 },
  //     { name: "Content Quality", original: 40, enhanced: 85 },
  //     { name: "Completeness", original: 30, enhanced: 80 },
  //   ],
  // };

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
      // Job title with period on the right
      // sections.push(
      //   new Paragraph({
      //     children: [
      //       new TextRun({
      //         text: exp.position,
      //         bold: true,
      //       }),
      //       new TextRun({
      //         text: "",
      //       }),
      //     ],
      //     spacing: { after: 0 },
      //     tabStops: [
      //       {
      //         type: "right",
      //         position: convertInchesToTwip(5.5),
      //       },
      //     ],
      //   })
      // );

      // Create a table-like layout for position and date using tabs
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAnalysisData(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                title="Go back"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back</span>
              </button>
              {/* <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  ATS Resume Optimizer
                </h1>
                <p className="text-gray-600 mt-1">
                  Joana Mae Gallardo - Enhanced for Applicant Tracking Systems
                </p>
              </div> */}
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              onClick={() => setActiveTab("original")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "original"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Original Resume
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

            {activeTab === "original" && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle
                      className="text-yellow-600 mr-3 mt-1"
                      size={24}
                    />
                    <div>
                      <h3 className="font-semibold text-yellow-800">
                        Original Version
                      </h3>
                      <p className="text-yellow-700 text-sm mt-1">
                        This version lacks ATS keywords, has minimal detail, and
                        may not pass automated screening.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {originalResume.contact.name}
                  </h2>
                  <div className="text-gray-600">
                    <p>{originalResume.contact.phone}</p>
                    <p>{originalResume.contact.email}</p>
                    <p>{originalResume.contact.address}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {originalResume.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Experience
                  </h3>
                  {originalResume.experience.map((exp, idx) => (
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

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Education
                  </h3>
                  {originalResume.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="font-semibold text-gray-800">
                        {edu.institution}
                      </p>
                      <p className="text-gray-600 text-sm">{edu.period}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Expertise
                  </h3>
                  <p className="text-gray-700">
                    {originalResume.skills.join(", ")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Language
                  </h3>
                  <p className="text-gray-700">
                    {originalResume.languages.join(", ")}
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
                            className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <span className="text-sm">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mt-6">
                  <h3 className="font-bold text-indigo-900 mb-3 text-lg">
                    📋 Next Steps for Maximum ATS Success
                  </h3>
                  <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">1.</span>
                      <span>
                        Add your LinkedIn profile URL to increase professional
                        visibility
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">2.</span>
                      <span>
                        Include any certifications (OJT completion, forestry
                        seminars, safety training)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">3.</span>
                      <span>
                        Tailor keywords for each specific job posting you apply
                        to
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">4.</span>
                      <span>
                        Save as .docx or PDF format (check job posting for
                        preferred format)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">5.</span>
                      <span>
                        Use standard fonts (Arial, Calibri, Times New Roman) at
                        10-12pt size
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">
            💡 ATS Optimization Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">✓ DO</h4>
              <ul className="space-y-1">
                <li>• Use standard section headings</li>
                <li>• Include specific job-related keywords</li>
                <li>• Use action verbs (Managed, Coordinated, Developed)</li>
                <li>• List skills that match job descriptions</li>
                <li>• Keep formatting simple and clean</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">✗ DON'T</h4>
              <ul className="space-y-1">
                <li>• Use headers/footers or text boxes</li>
                <li>• Include images, graphics, or tables</li>
                <li>• Use unusual fonts or excessive formatting</li>
                <li>• Stuff keywords unnaturally</li>
                <li>• Exceed 2 pages for entry-level positions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSResumeOptimizer;
