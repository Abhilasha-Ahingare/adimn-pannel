import { createContext, useContext, useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorization = `Bearer ${token}`;

  const StoreToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLogIn = !!token;

  const LogOutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const UserAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error); 
      setIsLoading(false);
    }
  };

  const [services, setServices] = useState([]);

  const UserServices = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.message);
      }
    } catch (error) {
      console.error("Frontend error:", error); 
    }
  };

  useEffect(() => {
    UserServices();
    UserAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        StoreToken,
        LogOutUser,
        isLogIn,
        user,
        services,
        authorization,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
