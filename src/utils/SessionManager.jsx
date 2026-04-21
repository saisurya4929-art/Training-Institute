import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let inactivityTimer;
    let tokenInterval;
    let isLoggedOut = false;

    const logoutUser = (message) => {
      if (isLoggedOut) return;
      isLoggedOut = true;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert(message);
      navigate("/Login");
    };

    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
          logoutUser("Session expired. Please login again.");
        }
      } catch (error) {
        logoutUser("Invalid session. Please login again.");
      }
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        logoutUser("Logged out due to inactivity.");
      }, 15 * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    checkTokenExpiry();
    resetInactivityTimer();

    tokenInterval = setInterval(checkTokenExpiry, 1000);

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(tokenInterval);

      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [navigate]);

  return null;
};

export default SessionManager;