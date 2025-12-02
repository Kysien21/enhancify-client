// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Dashboard Page/Context/UserContext";
import { HistoryProvider } from "./Dashboard Page/Context/HistoryContext";

import Website from "./Landing Page/Website/Website";
import Upload from "./Dashboard Page/Upload/Upload";
import History from "./Dashboard Page/History/History";
import Overview from "./Admin Page/Overview";
import UserManagement from "./Admin Page/UserManagement";
import Reports from "./Admin Page/Reports";

import { AdminRoute } from "./Admin Page/Component/ProtectedRoute";
import { UserProtectedRoute } from "./Dashboard Page/UserProtectedRoute";

// ✅ ADD THESE IMPORTS
import EmailPopup from "./Landing Page/Forgot Password/EmailPopup";
import NewPassword from "./Landing Page/Forgot Password/NewPassword";
import Profile from "./Dashboard Page/Profile/Profile";

function App() {
  return (

    <Router>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Website />} />
        <Route path="/" element={<Website />} />

        {/* ✅ Password Reset Routes */}
        <Route path="/forgot-password" element={<EmailPopup />} />
        <Route path="/reset-password/:token" element={<NewPassword />} />
        <Route path="/pro" element={<Profile />} />

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
        <Route
          path="/home"
          element={
            <AdminRoute>
              <Overview />
            </AdminRoute>
          }
        />
        <Route
          path="/user"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/report"
          element={
            <AdminRoute>
              <Reports />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
