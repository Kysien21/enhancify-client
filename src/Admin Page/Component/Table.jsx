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
    <div className="w-full bg-white rounded-lg shadow-sm overflow-auto h-40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-xs sm:text-sm md:text-base">
          <thead className="bg-[#DCDCDC] text-[#133970]">

            <tr>
              <th className="p-2 sm:p-3 md:p-4  font-semibold">
                Username
              </th>
              <th className="p-2 sm:p-3 md:p-4  font-semibold">
                Job Title/Position
              </th>
              <th className="p-2 sm:p-3 md:p-4  font-semibold">
                Match Score
              </th>
              <th className="p-2 sm:p-3 md:p-4  font-semibold">
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
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-2 sm:p-3 md:p-4">
                    {analysis.username || 'N/A'}
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 truncate max-w-[150px] sm:max-w-none">
                    {analysis.jobTitle || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-blue-900 text-sm font-semibold">
                    {analysis.matchScore ? `${analysis.matchScore}%` : 'N/A'}
                  </td>
                  <td className="p-2 sm:p-3 md:p-4">
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