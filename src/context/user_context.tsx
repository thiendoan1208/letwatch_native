import { createContext, ReactNode, useContext, useState } from "react";

type UserContext = {
  user: {
    email: string;
    username: string;
  };
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

type User = {
  email: string;
  username: string;
};

type IProps = {
  children: ReactNode;
};

export const AppContext = createContext<UserContext | null>(null);

export const GetCurrentUser = () => {
  const currentUser = useContext(AppContext);

  if (currentUser) {
    return currentUser;
  }
  throw new Error("No user info in context");
};

export default function AppProvider({ children }: IProps) {
  const [user, setUser] = useState<User>({ email: "", username: "" });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
