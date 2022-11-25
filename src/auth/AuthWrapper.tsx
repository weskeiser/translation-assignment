import { useLazyGetUserByTokenQuery } from "api/translationApi";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { Navigate } from "react-router-dom";
import { IAuthState, getCredentials, setCredentials } from "./Auth.slice";

interface IAuthWrapper {
  children: JSX.Element;
}

export const AuthWrapper = ({ children }: IAuthWrapper) => {
  const token = localStorage.getItem("app42auth");

  const dispatch = useAppDispatch();
  const [getUserByToken, { data: userFromToken }] =
    useLazyGetUserByTokenQuery();
  const { currentUser } = useAppSelector(getCredentials);

  if (currentUser) return children;

  // implement optimistic update

  const authInfo = {
    currentUser: userFromToken,
    token,
  };

  if (token) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
};
