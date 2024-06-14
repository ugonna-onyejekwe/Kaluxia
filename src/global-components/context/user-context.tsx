import { createContext, useEffect, useState } from "react";

type PropsType = {
  children: any;
};

type CurrentUserType = {
  parsedData?: {
    id: string;
    name: string;
    token: string;
  };
};

export const userContext = createContext({
  currentUser: { id: "", name: "", token: "" },
  setCurrentUser: (user: CurrentUserType | null): any => {},
});

const UserProvider = ({ children }: PropsType) => {
  const data = localStorage.getItem("user");
  const parsedData = data ? JSON.parse(data) : null;
  const [currentUser, setCurrentUser] = useState<CurrentUserType | any>(
    parsedData
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
