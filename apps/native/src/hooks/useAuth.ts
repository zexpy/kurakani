import { TokenProvider, useUserStore } from "@kurakani/core";
import { useEffect, useState } from "react";

export interface IStorageUser {
  jwt: string;
  user: {
    email: string;
    _id: string;
  };
}

export const useAuth = () => {
  const [token, setToken] = useState<IStorageUser>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    TokenProvider.getItem("user").then((val) => {
      setToken(JSON.parse(val));
      if (val) {
        setIsAuth(true);
      }
    });
  }, []);

  if (!token) {
    return { isAuth: false, id: null };
  }

  return { isAuth, id: token.user._id };
};
