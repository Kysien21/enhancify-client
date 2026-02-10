import { AlertCircle } from "lucide-react";

const OriginalResume = ({ originalResume, certifications }) => {
  return (
    <div className="space-y-6">

      {/* Warning Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="text-yellow-600 mr-3 mt-1" size={25} />
          <div>
            <h1 className="font-semibold text-yellow-800 text-sm">Original Resume</h1>
            <p className="text-yellow-700 text-xs mt-1">
              This version lacks ATS keywords, has minimal detail, and may not
              pass automated screening.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {originalResume.contact.name}
        </h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{originalResume.contact.phone} | {originalResume.contact.email}</p>
          <p>{originalResume.contact.address}</p>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-md font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-3">
          PROFESSIONAL SUMMARY
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {originalResume.summary}
        </p>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-md font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-3">
          PROFESSIONAL EXPERIENCE
        </h3>
        {originalResume.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-md font-bold text-gray-800">{exp.position}</h4>
                <p className="text-sm text-gray-600">{exp.company}</p>
              </div>
              <p className="text-gray-600 text-xs">{exp.period}</p>
            </div>
            <ul className="text-sm list-disc list-inside space-y-1 text-gray-700">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
<div>
  <h3 className="text-md font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-3">
    EDUCATION
  </h3>
  {originalResume.education.map((edu, idx) => (
    <div key={idx} className="mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-bold text-gray-800">{edu.degree}</h4>
          <p className="text-sm text-gray-600">{edu.institution}</p> 
        </div>
        <p className="text-gray-600 text-xs">{edu.period}</p>
      </div>
    </div>
  ))}
</div>

      {/* Skills */}
      <div>
        <h3 className="text-md font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-3">
          SKILLS
        </h3>
        <p className="text-gray-700 text-sm">{originalResume.skills.join(" • ")}</p>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-md font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-3">
          LANGUAGES
        </h3>
        <p className="text-sm text-gray-700">
          {originalResume.languages.join(" • ")}
        </p>
      </div>

      {/* Certifications & Training */}
      {(originalResume.certifications || certifications) && (
        <div>
          <h3 className="text-md font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-3">
            CERTIFICATIONS & TRAINING
          </h3>
          <p className="text-sm text-gray-600 italic">
            {originalResume.certifications || certifications}
          </p>
        </div>
      )}
    </div>
  );
  
};

export default OriginalResume;