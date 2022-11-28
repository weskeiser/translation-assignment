import {
  useCreateUserMutation,
  useLazyGetAllUsersQuery,
  useLazyGetUserByUsernameQuery,
} from "api/translationApi";
import { useAppDispatch } from "appRedux/hooks";
import { setCredentials } from "auth";
import Form from "features/common/Form";
import Mascot from "features/Mascot";
import { useNavigate } from "react-router-dom";
import "./Login.style.scss";
import { AuthForm } from "./Login.types";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [getUserByUsername] = useLazyGetUserByUsernameQuery();
  const [getAllUsers] = useLazyGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();

  // $ - Create user if new user and log user in
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
      token: newToken,
    };

    await createUser(newUser);

    localStorage.setItem("app42token", newToken);
    localStorage.setItem("app42userId", newId);

    dispatch(setCredentials({ userId: newId, token: newToken, username }));

    navigate("/");
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
        {/* <div className="keyboard"></div> */}
      </section>
    </main>
  );
};

export default Login;
