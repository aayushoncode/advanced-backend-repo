import { server } from "@/main";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import api from "../apiInterceptor";
import { toast } from "react-toastify";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  async function fetchUser() {
    setLoading(true);

    try {
      const { data } = await api.get(`${server}/api/v1/me`);

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      const { data } = await api.post("/api/v1/logout");

      toast.success(data.message);
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        fetchUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppData = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("App data must be used within an AppPovider");
  return context;
};
