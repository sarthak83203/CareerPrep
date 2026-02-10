import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(res.data.user);
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
