import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useUser } from "../hooks/useUser";
export function UserProtectedRoute({ children }) {

  const { data, isPending, isError } = useUser();
  
  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (isError) <Navigate to="/" replace state={{ showLogin: true }} />;

  return children;
}
