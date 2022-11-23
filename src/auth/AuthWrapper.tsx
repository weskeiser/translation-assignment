import { useLazyGetUserByTokenQuery } from "api/translationApi";
import { useAppSelector } from "appRedux/hooks";
import { Navigate } from "react-router-dom";
import { selectAuthenticated, setCredentials } from "./Auth.slice";

interface IAuthWrapper {
  children: JSX.Element;
}

export const AuthWrapper = ({ children }: IAuthWrapper) => {
  const [getUserByToken] = useLazyGetUserByTokenQuery();

  const { user } = useAppSelector(selectAuthenticated);
  if (user) return children;

  const token = localStorage.getItem("app42auth");

  // implement optimistic update
  if (token) {
    const user = async () => {
      return await getUserByToken(token);
    };

    setCredentials({
      user,
      token,
    });

    return children;
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
};
