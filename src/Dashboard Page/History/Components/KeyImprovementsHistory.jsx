import { CheckCircle } from "lucide-react";

const KeyImprovementsHistory = ({ improvements }) => {
  return (
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
          {/* Header */}
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

          {/* List of changes */}
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
  );
};

export default KeyImprovementsHistory;
