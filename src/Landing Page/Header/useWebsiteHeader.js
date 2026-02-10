import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * useWebsiteHeader
 *
 * Custom hook to manage the state of login and signup modals in the website header.
 * Provides functions to toggle modals and close them.
 */
export function useWebsiteHeader() {
  // State to control visibility of login and signup modals
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  // React Router hooks
  const location = useLocation(); // For checking if redirect requires showing login modal
  const navigate = useNavigate(); // For navigation/redirect after modal handling

  // Ref to ensure redirect is handled only once
  const handledRedirect = useRef(false);

  /**
   * Opens the login modal and closes signup modal if open.
   */
  const toggleLogin = () => {
    setLogin(true);
    setSignup(false);
  };

  /**
   * Opens the signup modal and closes login modal if open.
   */
  const toggleSignup = () => {
    setSignup(true);
    setLogin(false);
  };

  /**
   * Closes both login and signup modals.
   */
  const handleModalClose = () => {
    setLogin(false);
    setSignup(false);
  };

  /**
   * Effect to check if location state requests showing login modal (e.g., after signup success).
   * Ensures the login modal is shown only once when redirected from another page.
   */
  useEffect(() => {
    if (location.state?.showLogin && !handledRedirect.current) {
      handledRedirect.current = true;
      setLogin(true);
      setSignup(false);

      // Remove state to prevent infinite loop
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  return {
    login,                // Boolean: login modal visibility
    signup,               // Boolean: signup modal visibility
    toggleLogin,          // Function: open login modal
    toggleSignup,         // Function: open signup modal
    handleModalClose,     // Function: close both modals
  };
}
