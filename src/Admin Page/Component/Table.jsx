function Table() {
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
            <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-blue-900 text-sm">hello</td>

              <td className="px-6 py-4 text-blue-900 text-sm">hello</td>

              <td className="px-6 py-4 text-blue-900 text-sm font-semibold">
                hello
              </td>

              <td className="px-6 py-4 text-blue-900 text-sm">hello</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
