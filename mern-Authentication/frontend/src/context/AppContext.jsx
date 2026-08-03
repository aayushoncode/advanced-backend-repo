import { server } from "@/main";
import axios from "axios";
import { Children, createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  async function fetchUser() {
    setLoading(true);

    try {
      const { data } = await axios.get(`${server}/api/v1/me`, {
        withCredentials: true,
      });

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
