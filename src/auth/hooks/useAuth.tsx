import { useAppSelector } from "appRedux/hooks";
import { getCredentials } from "auth/Auth.slice";
import { useMemo } from "react";

export const useAuth = () => {
  const user = useAppSelector(getCredentials);

  return useMemo(() => {
    return { ...user, userId: user.userId as number };
  }, [user]);
};
