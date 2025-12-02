import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Component/Table";
import LineGraphOne from "./Component/LineGraphOne";
import StatCard from "./Component/StatCard";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";

function Overview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResumes: 0,
    averageMatchScore: 0,
  });
  const [graphData, setGraphData] = useState([]);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all endpoints in parallel
      const [statsRes, graphRes, analysesRes] = await Promise.all([
        axios.get(`${API_BASE}/api/v1/admin/overview`, { withCredentials: true }),
        axios.get(`${API_BASE}/api/v1/admin/system-activity-graph`, { withCredentials: true }),
        axios.get(`${API_BASE}/api/v1/admin/recent-analyses`, { withCredentials: true }),
      ]);

      // Update state only if data exists
      if (statsRes.data?.success && statsRes.data.data) setStats(statsRes.data.data);
      if (graphRes.data?.success && graphRes.data.data) setGraphData(graphRes.data.data);
      if (analysesRes.data?.success && analysesRes.data.data) setRecentAnalyses(analysesRes.data.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError(err.response?.data?.message || "Failed to load data");
      setLoading(false);
    }
  };

  const defaultLabels = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const defaultData = Array(12).fill(0);

  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-100 p-4 sm:p-6 lg:p-12 flex justify-center items-center min-h-[60vh] rounded-2xl">
              {loading ? (
                <div className="flex items-center justify-center h-123">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
                    <p className="text-lg text-[#1E3A8A]">Loading dashboard...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-123">
                  <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl text-red-600 mb-2">Error Loading Dashboard</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                      onClick={fetchAllData}
                      className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-lg transition duration-200"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-18 w-full">
                  {/* LEFT COLUMN - STAT CARDS */}
                  <div className="w-full xl:w-60">
                    <h1 className="text-[#133970] text-2xl mb-2 font-semibold">Overview</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-10 px-3 sm:px-0">
                      <StatCard value={stats.totalUsers} label="Total Users" storageKey="totalUsers" />
                      <StatCard value={stats.totalResumes} label="Total Resumes" storageKey="totalResumes" />
                      <StatCard value={stats.averageMatchScore} label="Average Match Score" storageKey="averageMatchScore" />
                    </div>
                  </div>

                  {/* RIGHT COLUMN - GRAPH & TABLE */}
                  <div className="flex-1 flex flex-col space-y-6 w-full xl:w-1/2">
                    <LineGraphOne
                      title="System Activity Graph"
                      labels={defaultLabels}
                      data={graphData.length > 0 ? graphData : defaultData}
                    />

                    <div>
                      <h1 className="text-lg text-[#1E3A8A] mb-2 font-medium">Recent Analyses Summary</h1>
                      <Table data={recentAnalyses} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Overview;
