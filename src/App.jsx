// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Dashboard Page/Context/UserContext";
import { HistoryProvider } from "./Dashboard Page/Context/HistoryContext";

import Website from "./Landing Page/Website/Website";
import Upload from "./Dashboard Page/Upload/Upload";
import History from "./Dashboard Page/History/History";
import HomeOverview from "./Admin Page/HomeOverview";
import UserManagement from "./Admin Page/UserManagement";
import ReportAndAnalytics from "./Admin Page/ReportAndAnalytics";
import SystemManagement from "./Admin Page/SystemManagement";

import { AdminRoute } from "./Admin Page/Component/ProtectedRoute";
import { UserProtectedRoute } from "./Dashboard Page/UserProtectedRoute";

function App() {
  return (
    <Router>
          
      <UserProvider>
        <HistoryProvider>
          <Routes>
            <Route index element={<Website />} />
            <Route path="/website" element={<Website />} />
            
            

            
            <Route 
              path="/upload" 
              element={
                <UserProtectedRoute>
                  <Upload />
                </UserProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <UserProtectedRoute>
                  <History />
                </UserProtectedRoute>
              } 
            />

            <Route path="/home" element={<AdminRoute><HomeOverview /></AdminRoute>} />
            <Route path="/user" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/report" element={<AdminRoute><ReportAndAnalytics /></AdminRoute>} />
            <Route path="/system" element={<AdminRoute><SystemManagement /></AdminRoute>} />
          </Routes>
        </HistoryProvider>
      </UserProvider>
    </Router>
  );
}

export default App;