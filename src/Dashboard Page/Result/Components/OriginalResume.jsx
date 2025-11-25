import { AlertCircle } from "lucide-react";

const OriginalResume = ({ originalResume, certifications }) => {
  return (
    <div className="space-y-6">

      {/* Warning Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="text-yellow-600 mr-3 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-yellow-800">Original Resume</h3>
            <p className="text-yellow-700 text-sm mt-1">
              This version lacks ATS keywords, has minimal detail, and may not
              pass automated screening.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
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

      {/* Summary */}
      <div>
        <p className="text-gray-700 leading-relaxed">
          {originalResume.summary}
        </p>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Experience</h3>
        {originalResume.experience.map((exp, idx) => (
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
        <h3 className="text-lg font-bold text-gray-800 mb-3">Education</h3>
        {originalResume.education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-semibold text-gray-800">{edu.institution}</p>
            <p className="text-gray-600 text-sm">{edu.period}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Skills</h3>
        <p className="text-gray-700">{originalResume.skills.join(", ")}</p>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Language</h3>
        <p className="text-gray-700">
          {originalResume.languages.join(", ")}
        </p>
      </div>

      {/* Certifications & Training */}
      {(originalResume.certifications || certifications) && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Certifications & Training
          </h3>
          <p className="text-gray-600">
            {originalResume.certifications || certifications}
          </p>
        </div>
      )}
    </div>
  );
  
};

export default OriginalResume;