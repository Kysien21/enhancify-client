import { CheckCircle } from "lucide-react";

const OptimizedResume = ({ enhancedResume }) => {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="text-green-600 mr-3 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-green-800">
              ATS-Optimized Resume
            </h3>
            <p className="text-green-700 text-sm mt-1">
              This version includes enhanced keywords, action verbs, and proper
              formatting for maximum ATS compatibility.
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
            {enhancedResume.contact.phone} | {enhancedResume.contact.email}
          </p>
          <p>{enhancedResume.contact.location}</p>
          <p className="text-indigo-600">{enhancedResume.contact.linkedin}</p>
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
                <h4 className="font-bold text-gray-800">{exp.position}</h4>
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
                <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.relevant && (
                  <p className="text-gray-600 text-sm italic">{edu.relevant}</p>
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
          <h4 className="font-semibold text-gray-800 mb-2">Technical Skills</h4>
          <p className="text-gray-700">
            {enhancedResume.skills.technical.join(" • ")}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Soft Skills</h4>
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
        
        <p className="text-gray-600 italic">{enhancedResume.certifications}</p>
      </div>
    </div>
  );
};

export default OptimizedResume;
