import { useAppSelector } from "appRedux/hooks";
import { useMemo } from "react";
import { getCredentials } from "./Auth.slice";

export const useAuth = () => {
  const user = useAppSelector(getCredentials);

  return useMemo(() => {
    return { ...user, userId: user.userId as number };
  }, [user]);
};
