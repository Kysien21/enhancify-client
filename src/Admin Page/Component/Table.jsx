function Table({ data = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-300">
              <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                Username
              </th>
              <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                Job Title/Position
              </th>
              <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                Match Score
              </th>
              <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                Date Processed
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr className="border-b border-gray-200">
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No recent analyses found
                </td>
              </tr>
            ) : (
              data.map((analysis, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-blue-900 text-sm">
                    {analysis.username || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-blue-900 text-sm">
                    {analysis.jobTitle || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-blue-900 text-sm font-semibold">
                    {analysis.matchScore ? `${analysis.matchScore}%` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-blue-900 text-sm">
                    {formatDate(analysis.dateProcessed)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;