import {
  useCreateUserMutation,
  useLazyGetAllUsersQuery,
  useLazyGetUserByIdQuery,
  useLazyGetUserByUsernameQuery,
} from "api/translationApi";
import { useAppSelector } from "appRedux/hooks";
import { getCredentials } from "auth";
import Form from "features/common/Form";
import Mascot from "features/Mascot";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./Login.hooks";
import "./Login.style.scss";
import { AuthForm } from "./Login.types";

const Login = () => {
  const [getUserByUsername] = useLazyGetUserByUsernameQuery();
  const [getAllUsers] = useLazyGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const logUserIn = useLogin();

  const [getUserById, userByIdResponse] = useLazyGetUserByIdQuery();
  const { userId } = useAppSelector(getCredentials);
  const token = localStorage.getItem("app42token");
  const storageIdString = localStorage.getItem("app42userId");
  const storageId = storageIdString ? parseInt(storageIdString) : false;
  const navigate = useNavigate();
  const { isSuccess, isError, data: fetchedUser } = userByIdResponse;

  // $ - Redirect user if logged in
  useEffect(() => {
    if (!userId && storageId && token && userByIdResponse.isUninitialized) {
      getUserById(storageId);
    }

    if (token && isSuccess) navigate("/", { replace: true });
  }, [
    getUserById,
    token,
    storageId,
    userId,
    userByIdResponse,
    isSuccess,
    navigate,
  ]);

  // $ - Create user if new user and log user in. Log user in if existing.
  const handleLogin = async (e: AuthForm) => {
    e.preventDefault();

    const username = e.currentTarget.username.value.trim();
    const { data: existingUser } = await getUserByUsername(username);

    if (existingUser) {
      return logUserIn(existingUser as any);
    }

    const { data: allUsers } = await getAllUsers(false);
    const amountOfUsers = allUsers.length;

    const newId = amountOfUsers + 1;
    const newToken = "tempNewToken";
    console.log(newId);

    const newUser = {
      userId: newId,
      username,
      translations: [],
      token: newToken,
    };

    localStorage.setItem("app42token", newToken);
    localStorage.setItem("app42userId", String(newId));

    await createUser(newUser);

    logUserIn(newUser);
  };

  return (
    <main className="login">
      <section className="login-top">
        <div className="login-top_text">
          <h1>Lost in Translation</h1>
          <h2>Get started</h2>
        </div>

        <Mascot />
      </section>

      <section className="login-middle">
        <Form
          aria-label="Signup and login form"
          onSubmit={handleLogin}
        >
          <input
            required
            type="text"
            minLength={5}
            maxLength={17}
            name="username"
            placeholder="What's your name?"
            autoComplete="off"
          />
        </Form>

        <div
          className="login-middle_decoration"
          aria-hidden
        ></div>
      </section>

      <section
        className="login-bottom"
        aria-hidden
      >
        {/* <div className="keyboard"></div> */}
      </section>
    </main>
  );
};

export default Login;
