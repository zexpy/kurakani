import { TokenProvider, useUserStore } from "@kurakani/core";
import { IStorageUser } from "./useAuth";
import { useEffect, useState } from "react";
import { trpc } from "@libs/trpc";
import { setToken as saveToken } from "@libs/api";

export const useCurrentUser = () => {
  const [token, setToken] = useState<IStorageUser>();
  const { mutate, isLoading } = trpc.getUserById.useMutation();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const getToken = async () => {
      const token = JSON.parse(
        await TokenProvider.getItem("user")
      ) as IStorageUser;
      if (token?.jwt) {
        setToken(token);
        saveToken(token.jwt);
        return;
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      mutate(token.user.id, {
        onSuccess: (data) => {
          // @ts-ignore
          setUser(data);
        },
      });
    }
  }, [token]);

  return { user, isLoading, setUser };
};
