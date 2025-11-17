import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";

function UserManagement() {
  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] pt-15">
          <div className="w-full max-w-6xl mx-auto bg-[#EEF3FB] rounded-lg overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-300">
                  <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/4">
                    Username
                  </th>
                  <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/4">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/6">
                    Date Joined
                  </th>
                  <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/6">
                    Total Analysis
                  </th>
                  <th className="text-right px-6 py-4 text-blue-900 font-semibold text-sm w-1/6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 pr-4 text-blue-900 text-sm">John Doe</td>
                  <td className="px-6 pr-4 text-blue-900 text-sm underline">
                    john@example.com
                  </td>
                  <td className="px-6 pr-4 text-blue-900 text-sm">
                    01/01/2025
                  </td>
                  <td className="px-6 pl-15 text-blue-900 text-sm font-semibold">
                    30
                  </td>
                  <td className="px-6 pr-4 flex items-center gap-2 p-2 flex-col pl-30">
                    <button className="bg-cyan-300 text-[#1e3a5f] px-5 py-1 rounded text-[10px] font-medium hover:bg-cyan-400 transition-colors">
                      Block
                    </button>
                    <button className="bg-red-400 text-white px-5 py-1 rounded text-[10px] font-medium hover:bg-red-500 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserManagement;
