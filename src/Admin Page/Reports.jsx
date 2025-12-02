import { useState, useEffect } from "react";
import axios from "axios";
import BarGraph from "./Component/BarGraph";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";
import StatCard from "./Component/StatCard";
import LineGraphTwo from "./Component/LineGraphTwo";

function Reports() {
  const [stats, setStats] = useState({
    totalAnalysis: 0,
    avgImprovement: 0,
    activeUsers: 0,
  });
  const [usageData, setUsageData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

      // Fetch analytics stats
      const statsRes = await axios.get(
        `${API_BASE}/api/v1/admin/reports/analytics`,
        { withCredentials: true }
      );

      // Fetch usage over time (monthly data)
      const usageRes = await axios.get(
        `${API_BASE}/api/v1/admin/reports/usage-over-time`,
        { withCredentials: true }
      );

      // Fetch department statistics
      const deptRes = await axios.get(
        `${API_BASE}/api/v1/admin/reports/department-stats`,
        { withCredentials: true }
      );

      if (statsRes.data.success && statsRes.data?.data) {
        setStats(statsRes.data.data);
      }

      if (usageRes.data.success && usageRes.data?.data) {
        setUsageData(usageRes.data.data);
      }

      if (deptRes.data.success && deptRes.data?.data) {
        setDepartmentData(deptRes.data.data);
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching reports data:", err);
      setError(err.response?.data?.message || "Failed to load data");
      setLoading(false);
    }
  };

  // Default data for graphs
  const defaultMonthlyLabels = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const defaultMonthlyData = Array(12).fill(0);
  
  const departmentLabels = ["CIT", "CBA", "CTE", "CAS", "CCJE"];
  const defaultDepartmentData = Array(5).fill(0);

  return (
    <main>
      <AdminHeader />
      <AdminSidebar />

      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-100 rounded-2xl p-4 sm:p-6 lg:p-5">
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1E3A8A] font-semibold underline mb-6 md:mb-8 lg:mb-12 text-center">
                Reports
              </h1>

                   {/* Stats Cards */}
              <div className="flex flex-col sm:flex-row w-full gap-4 md:gap-6 lg:gap-8 items-center justify-center mb-8 md:mb-9 px-3 sm:px-0 xl:px-30">

                <div className="w-full sm:w-auto sm:flex-1">
                  <StatCard value="1,500" label="Total Analysis" />
                </div>

                <div className="w-full sm:w-auto sm:flex-1">
                  <StatCard value="1,500" label="AVG Improvement" />
                </div>

                <div className="w-full sm:w-auto sm:flex-1">
                  <StatCard value="1,500" label="Active Users" />
                </div>

              </div>
                
                  {/* Graphs */}
                  <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Line Graph - System Usage Over Time */}
                    <div className="w-full lg:w-1/2">
                      <LineGraphTwo 
                        title="System Usage Over Time"
                        labels={defaultMonthlyLabels}
                        data={usageData.length > 0 ? usageData : defaultMonthlyData}
                      />
                    </div>

                    {/* Bar Graph - Users by Department */}
                    <div className="w-full lg:w-1/2">
                      <BarGraph 
                        title="Users by Department"
                        labels={departmentLabels}
                        data={departmentData.length > 0 ? departmentData : defaultDepartmentData}
                      />
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Reports;