import { CheckCircle } from "lucide-react";

const OptimizedResume = ({ enhancedResume }) => {
  if (!enhancedResume) {
    return (
      <p className="text-center text-gray-500">
        No optimized resume available.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* ALERT BOX */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="text-green-600 mr-3 mt-1" size={25} />
          <div>
            <h3 className="font-semibold text-green-800 text-sm">
              ATS-Optimized Resume
            </h3>
            <p className="text-green-700 text-xs mt-1">
              Previewing Optimized Resume PDF
            </p>
          </div>
        </div>
      </div>

{/* Contact */}
<div>
  <h2 className="text-xl font-bold text-gray-800 mb-1">
    {enhancedResume.contact.name}
  </h2>
  <div className="text-gray-600 space-y-1 text-sm">
    <p className="text-xs"> 
      {enhancedResume.contact.phone} | {enhancedResume.contact.email}
    </p>
    <p className="text-xs">{enhancedResume.contact.location}</p>
    <p className="text-indigo-600">{enhancedResume.contact.linkedin}</p>
  </div>
</div>

{/* Professional Summary */}
<div>
  <h3 className="text-base font-bold text-gray-800 border-b border-indigo-600 pb-1 mb-2">
    PROFESSIONAL SUMMARY
  </h3>
  <p className="text-gray-700 leading-snug text-sm">{enhancedResume.summary}</p>
</div>

{/* Experience */}
<div>
  <h3 className="text-base font-bold text-gray-800 border-b border-indigo-600 pb-1 mb-2">
    PROFESSIONAL EXPERIENCE
  </h3>
  {enhancedResume.experience.map((exp, idx) => (
    <div key={idx} className="mb-2">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{exp.position}</h4>
          <p className="text-gray-600 text-sm">{exp.company}</p>
        </div>
        <p className="text-gray-600 text-xs">{exp.period}</p>
      </div>
      <ul className="list-disc list-inside space-y-0.5 text-gray-700 text-sm">
        {exp.responsibilities.map((resp, i) => (
          <li key={i}>{resp}</li>
        ))}
      </ul>
    </div>
  ))}
</div>

{/* Education */}
<div>
  <h3 className="text-base font-bold text-gray-800 border-b border-indigo-600 pb-1 mb-2">
    EDUCATION
  </h3>
  {enhancedResume.education.map((edu, idx) => (
    <div key={idx} className="mb-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{edu.degree}</h4>
          <p className="text-gray-600 text-sm">{edu.institution}</p>
          {edu.relevant && (
            <p className="text-gray-600 text-xs italic">{edu.relevant}</p>
          )}
        </div>
        <p className="text-gray-600 text-xs">{edu.period}</p>
      </div>
    </div>
  ))}
</div>

{/* Skills */}
<div>
  <h3 className="text-base font-bold text-gray-800 border-b border-indigo-600 pb-1 mb-2">
    SKILLS
  </h3>
  <div className="mb-2">
    <h4 className="font-semibold text-gray-800 text-sm mb-1">Technical Skills</h4>
    <p className="text-gray-700 text-sm">
      {enhancedResume.skills.technical.join(" • ")}
    </p>
  </div>
  <div>
    <h4 className="font-semibold text-gray-800 text-sm mb-1">Soft Skills</h4>
    <p className="text-gray-700 text-sm">{enhancedResume.skills.soft.join(" • ")}</p>
  </div>
</div>

{/* Languages */}
<div>
  <h3 className="text-base font-bold text-gray-800 border-b border-indigo-600 pb-1 mb-2">
    LANGUAGES
  </h3>
  <p className="text-gray-700 text-sm">{enhancedResume.languages.join(" • ")}</p>
</div>

{/* Certifications */}
<div>
  <h3 className="text-base font-bold text-gray-800 border-b border-indigo-600 pb-1 mb-2">
    CERTIFICATIONS & TRAINING
  </h3>
  <p className="text-gray-600 italic text-sm">{enhancedResume.certifications}</p>
</div>
    </div>
  );
};

export default OptimizedResume;