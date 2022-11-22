import "./Login.style.scss";
import Button from "features/common/Button";
import { Link } from "react-router-dom";
import { PasswordInput, UsernameInput } from "features/common/AuthInputs";
import { LoginForm } from "global/interfaces";
import { trimAll } from "global/utils";
import { useLazyGetUserByUsernameQuery } from "api/translationApi";

const Login = () => {
  const [getUserByUsername] = useLazyGetUserByUsernameQuery();

  const onSubmit = async (e: LoginForm) => {
    e.preventDefault();
    const {
      username: { value: usernameRaw },
      password: { value: passwordRaw },
    } = e.currentTarget;
    const [username, password] = trimAll([usernameRaw, passwordRaw]);

    const { data } = await getUserByUsername(username);
    const [user] = data;

    console.log(username);
    console.log(password);
  };

  return (
    <div className="auth">
      <form
        onSubmit={onSubmit}
        className="auth_form"
      >
        <fieldset>
          <legend>Log In</legend>
          <UsernameInput />
          <PasswordInput />
        </fieldset>

        <Button
          className="login-btn"
          type="submit"
        >
          Submit
        </Button>
      </form>

      <Link to="/signup">I want to make a new account</Link>
    </div>
  );
};

export default Login;
