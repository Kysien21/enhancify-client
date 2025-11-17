import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Website from "./Landing Page/Website/Website";
import Upload from "./Dashboard Page/Upload/Upload";
import Result from "./Dashboard Page/Result/Result";
import AnalysisAndFeedback from "./Dashboard Page/Analysis and Feedback/AnalysisAndFeedback";
import History from "./Dashboard Page/History/History";
import HomeOverview from "./Admin Page/HomeOverview";
import UserManagement from "./Admin Page/UserManagement";
import ReportAndAnalytics from "./Admin Page/ReportAndAnalytics";
import SystemManagement from "./Admin Page/SystemManagement";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Website />} />
          <Route path="/website" element={<Website />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result" element={<Result />} />
          <Route path="/analysis" element={<AnalysisAndFeedback />} />
          <Route path="/history" element={<History />} />

          <Route path="/home" element={<HomeOverview />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/report" element={<ReportAndAnalytics />} />
          <Route path="/system" element={<SystemManagement />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
