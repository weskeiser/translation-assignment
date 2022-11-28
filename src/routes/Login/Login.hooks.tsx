import { useAppDispatch } from "appRedux/hooks";
import { setCredentials } from "auth";
import { User } from "global/interfaces";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (user: User) => {
    dispatch(
      setCredentials({
        userId: user.userId,
        token: user.token,
        username: user.username,
      })
    );

    navigate("/");
  };
};
