import {
  useCreateUserMutation,
  useLazyGetAllUsersQuery,
  useLazyGetUserByUsernameQuery,
} from "api/translationApi";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { getCredentials, setCredentials } from "auth";
import Form from "features/common/Form";
import { useNavigate } from "react-router-dom";
import "./Login.style.scss";
import { AuthForm } from "./Login.types";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [getUserByUsername] = useLazyGetUserByUsernameQuery();
  const [getAllUsers] = useLazyGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();

  // check for token
  //-- const { userId } = useAppSelector(getCredentials);
  //-- if (userId) navigate("/");

  const loginUser = async (e: AuthForm) => {
    e.preventDefault();

    const username = e.currentTarget.username.value.trim();
    const { data: existingUser } = await getUserByUsername(username);

    if (existingUser) {
      console.log("username taken");
      return;
    }

    const { data: allUsers } = await getAllUsers(false);
    const amountOfUsers = allUsers.length;

    const newId = amountOfUsers + 1;
    const newToken = "tempNewToken";

    const newUser = {
      id: newId,
      username,
      translations: [],
      token: username,
    };

    await createUser(newUser);

    localStorage.setItem("app42token", newToken);
    localStorage.setItem("app42userId", newId);

    dispatch(setCredentials({ userId: newId, token: newToken }));

    navigate("/");
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
          onSubmit={loginUser}
        >
          <input
            type="text"
            required
            minLength={5}
            maxLength={17}
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

export default Login;
