import { useAppSelector } from "appRedux/hooks";
import { Navigate } from "react-router-dom";
import { selectUser } from "./Auth.slice";

export const AuthWrapper = ({ children }: any) => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};
