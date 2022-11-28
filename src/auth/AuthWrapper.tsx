import { useLazyGetUserByIdQuery } from "api/translationApi";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCredentials, setCredentials } from "./Auth.slice";

interface IAuthWrapper {
  children: JSX.Element;
}

export const AuthWrapper = ({ children }: IAuthWrapper) => {
  const dispatch = useAppDispatch();
  const [getUserById, userByIdResponse] = useLazyGetUserByIdQuery();
  const navigate = useNavigate();

  const { userId } = useAppSelector(getCredentials);
  const token = localStorage.getItem("app42token");
  const storageIdString = localStorage.getItem("app42userId");
  const storageId = storageIdString ? parseInt(storageIdString) : false;

  const { isSuccess, isError, data: fetchedUser } = userByIdResponse;

  // $ - If not authenticated

  // -- 1. Fetch user with localStorage data
  useEffect(() => {
    if (!userId && storageId && token && userByIdResponse.isUninitialized) {
      getUserById(storageId);
    }
  }, [getUserById, token, storageId, userId, userByIdResponse]);

  // -- 2. Authenticate by matching localStorage token with DB token
  useEffect(() => {
    if (token && isSuccess) {
      const [user] = fetchedUser;

      // If !user at this step, user has been removed from database
      if (!user) navigate("/login");

      if (user && user.token === token) {
        dispatch(
          setCredentials({ userId: user.id, username: user.username, token })
        );
      }
    }
  }, [token, isSuccess, fetchedUser, dispatch]);

  // -- If error
  if (isError) return <p>Error...</p>;

  // $ - If authenticated:

  // -- Allow access if authenticated
  if (userId) {
    return children;
  }

  // $ - If not logged in:

  if (!token)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  // $ - Default

  return <p>Authenticating...</p>;
};
