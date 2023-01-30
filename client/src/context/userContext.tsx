import { useState, useEffect, createContext, useContext } from "react";
import { BackendApi } from "../lib/backend-api";
import { toast } from "react-toastify";
type UserType = {
  user: null | any;
  isAdmin: any;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
};
const UserContext = createContext({} as UserType);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<any | boolean>(false);

  useEffect(() => {
    return setIsAdmin(user && user?.role === "admin");
  }, [user]);

  useEffect(() => {
    BackendApi.user
      .getProfile()
      .then(({ user, error }) => {
        if (error) {
          console.error(error);
        } else {
          setUser(user);
        }
      })
      .catch(console.error);
  }, []);

  const loginUser = async (username: string, password: string) => {
    const { user, error } = await BackendApi.user.login(username, password);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Logged in successfully");
      setUser(user);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    await BackendApi.user.logout();
  };

  return (
    <UserContext.Provider value={{ isAdmin, loginUser, logoutUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
