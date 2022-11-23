import {
  useCreateUserMutation,
  useLazyGetAllUsersQuery,
  useLazyGetUserByTokenQuery,
  useLazyGetUserByUsernameQuery,
} from "api/translationApi";
import { useAppSelector } from "appRedux/hooks";
import { selectAuthenticated, setCredentials } from "auth";
import Form from "features/common/Form";
import { User } from "global/interfaces";
import { Navigate } from "react-router-dom";
import "./Login.style.scss";
import { AuthForm } from "./Login.types";

const Temp = () => {
  const [getUserByUsername] = useLazyGetUserByUsernameQuery();
  const [getAllUsers] = useLazyGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [getUserByToken] = useLazyGetUserByTokenQuery();

  const { user } = useAppSelector(selectAuthenticated);
  if (user)
    return (
      <Navigate
        to="/"
        replace
      />
    );

  const token = localStorage.getItem("app42auth");
  if (token) {
    const user = async () => {
      return await getUserByToken(token);
    };

    setCredentials({
      user,
      token,
    });

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleSubmit = async (e: AuthForm) => {
    e.preventDefault();

    const username = e.currentTarget.username.value.trim();

    const { data: user } = await getUserByUsername(username);

    if (user) {
      //  modal + return
      console.log("username taken");
      return;
    }

    const { data: allUsersData } = await getAllUsers(false);
    const amountOfUsers = allUsersData.length;

    const newUser = {
      id: amountOfUsers + 1,
      username,
      translations: [],
    };

    const res = await createUser(newUser);
    //@ts-ignore  - implement error handling
    const { data: newUserName } = res;

    //@ts-ignore  - implement error handling
    localStorage.setItem("app42auth", newUserName);
    //@ts-ignore  - implement error handling
    setCredentials(newUser, newUserName);

    // Navigate({ to: "/" });
  };

  return (
    <main className="login">
      <section className="login-top">
        <div className="login-top_text">
          <h1>Lost in Translation</h1>
          <h2>Get started</h2>
        </div>

        <div
          className="login-top_robot-cloud"
          aria-label="Page mascot logo"
        >
          <img
            src="/images/Logo.png"
            alt="Smiling robot in open embrace"
            className="login-top_robot-cloud_robot"
          />
          <img
            src="/images/Splash.svg"
            alt="White cloud"
            className="login-top_robot-cloud_cloud"
          />
        </div>
      </section>

      <section className="login-middle">
        <Form
          aria-label="Username input"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            required
            minLength={5}
            maxLength={15}
            name="username"
            placeholder="What's your name?"
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
        <div className="keyboard"></div>
      </section>
    </main>
  );
};

export default Temp;
