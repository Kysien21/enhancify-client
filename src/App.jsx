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

import { AdminRoute } from "./Admin Page/Component/ProtectedRoute";
import { UserProtectedRoute } from "./Dashboard Page/UserProtectedRoute";

// ✅ ADD THESE IMPORTS
import EmailPopup from "./Landing Page/Forgot Password/EmailPopup";
import NewPassword from "./Landing Page/Forgot Password/NewPassword";
import UserManagements from "./Super Admin Page/UserManagements";
import AdminManagement from "./Super Admin Page/AdminManagement";
import SuccessPopup from "./Super Admin Page/Components/SucessPopup";

function App() {
  return (
    <Router>
      <UserProvider>
        <HistoryProvider>
          <Routes>
            {/* Public Routes */}
            <Route index element={<Website />} />
            <Route path="/" element={<Website />} />
            
            {/* ✅ Password Reset Routes */}
            <Route path="/forgot-password" element={<EmailPopup />} />
            <Route path="/reset-password/:token" element={<NewPassword />} />

            {/* User Protected Routes */}
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

            {/* Admin Protected Routes */}
            <Route path="/home" element={<AdminRoute><HomeOverview /></AdminRoute>} />
            <Route path="/user" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/report" element={<AdminRoute><ReportAndAnalytics /></AdminRoute>} />

            <Route path="/system" element={<AdminManagement />} />
            <Route path="/man" element={<UserManagements />} />
            <Route path="/ma" element={<SuccessPopup />} />

          </Routes>
        </HistoryProvider>
      </UserProvider>
    </Router>
  );
}

export default App;