   import { useState, useEffect } from "react";
import axios from "axios";
import LineGraph from "./Component/LineGraph";
import Table from "./Component/Table";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";

function HomeOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResumes: 0,
    averageMatchScore: 0
  });
 const [graphData, setGraphData] = useState([]);

  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

      // Fetch overview stats
      const statsRes = await axios.get(`${API_BASE}/admin/overview`, {
        withCredentials: true
      });

      // Fetch system activity graph
      const graphRes = await axios.get(`${API_BASE}/admin/system-activity-graph`, {
        withCredentials: true
      });

      // Fetch recent analyses
      const analysesRes = await axios.get(`${API_BASE}/admin/recent-analyses`, {
        withCredentials: true
      });

      console.log('Stats:', statsRes.data);
      console.log('Graph:', graphRes.data);
      console.log('Analyses:', analysesRes.data);

      if (statsRes.data.success && statsRes.data?.data) {
        setStats(statsRes.data.data);
      }

      if (graphRes.data.success && graphRes.data?.data) {
        setGraphData(graphRes.data.data);
      }

      if (analysesRes.data.success && analysesRes.data?.data) {
        setRecentAnalyses(analysesRes.data.data);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError(err.response?.data?.message || "Failed to load data");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main>
        <AdminHeader />
        <AdminSidebar />
        <section>
          <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] px-13 py-3 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
              <p className="text-lg text-[#1E3A8A]">Loading dashboard...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <AdminHeader />
        <AdminSidebar />
        <section>
          <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] px-13 py-3 flex items-center justify-center">
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
        </section>
      </main>
    );
  }

    // ✅ Default labels/data if backend returns empty
  const defaultLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const defaultData = Array(12).fill(0);

  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] px-13 py-3 justify-between flex">
          <div className="relative w-70 h-full">
            <h1 className="text-2xl mb-3 text-[#1E3A8A] font-semibold">
              Overview
            </h1>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">{stats.totalUsers.toLocaleString() || 0}</h1>
                <h2 className="text-lg">Total Users</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">{stats.totalResumes.toLocaleString() || 0}</h1>
                <h2 className="text-lg">Total Resumes</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">{stats.averageMatchScore || 0}%</h1>
                <h2 className="text-lg">Average Match Score</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>
          </div>

          <div className="w-190 h-full flex-col pt-7">
            <LineGraph
              title="System Activity Graph"
              labels={defaultLabels} 
              data={graphData.length > 0 ? graphData : defaultData}
            />
            <h1 className="text-lg my-3 text-[#1E3A8A]">
              Recent Analyses Summary
            </h1>
            <Table data={recentAnalyses || []} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeOverview;