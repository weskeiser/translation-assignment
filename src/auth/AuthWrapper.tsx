import { useLazyGetUserByIdQuery } from "api/translationApi";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCredentials, setCredentials } from "./Auth.slice";

interface IAuthWrapper {
  children: JSX.Element;
}

export const AuthWrapper = ({ children }: IAuthWrapper) => {
  const dispatch = useAppDispatch();
  const [getUserById, userByIdResponse] = useLazyGetUserByIdQuery();

  const { userId } = useAppSelector(getCredentials);
  const token = localStorage.getItem("app42token");
  const storageIdString = localStorage.getItem("app42userId");
  const storageId = storageIdString ? parseInt(storageIdString) : false;

  useEffect(() => {
    if (storageId && !userId) {
      getUserById(storageId);
    }
  }, [getUserById, storageId, userId]);

  if (userId) {
    return children;
  }

  if (!token)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  const { isLoading, isSuccess, isError, data: fetchedUser } = userByIdResponse;

  if (isLoading) return <p>Authenticating...</p>;
  if (isError) return <p>Error...</p>;

  if (isSuccess) {
    const [user] = fetchedUser;

    if (!user)
      return (
        <Navigate
          to="/login"
          replace
        />
      );

    dispatch(setCredentials({ userId: user.id, token }));
  }

  return <p>Authenticating...</p>;
};
