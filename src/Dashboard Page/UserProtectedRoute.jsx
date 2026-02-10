import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function UserProtectedRoute({ children }) {
  const { data, isPending, isError } = useUser(); // Fetch user data

  // Show loading spinner while fetching user
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

  // Redirect to login if error occurs (unauthenticated)
  if (isError) return <Navigate to="/" replace state={{ showLogin: true }} />;

  // If authenticated, render the protected content
  return children;
}
