import { Link } from "react-router-dom";
import "./Signup.style.scss";
import {
  useCreateUserMutation,
  useLazyGetAllUsersQuery,
  useLazyGetUserByUsernameQuery,
} from "api/translationApi";
import { PasswordInput, UsernameInput } from "features/common/AuthInputs";
import Button from "features/common/Button";
import { trimAll } from "global/utils";
import { LoginForm } from "global/interfaces";

const Signup = () => {
  const [getUserByUsername] = useLazyGetUserByUsernameQuery();
  const [getAllUsers] = useLazyGetAllUsersQuery();

  const [createUser] = useCreateUserMutation();

  const submitForm = async (e: LoginForm) => {
    e.preventDefault();
    const {
      username: { value: usernameRaw },
      password: { value: passwordRaw },
      passwordConfirmation: { value: passwordConfirmationRaw },
    } = e.currentTarget;
    const [username, password, passwordConfirmation] = trimAll([
      usernameRaw,
      passwordRaw,
      passwordConfirmationRaw,
    ]);

    // Check if username taken
    const { data } = await getUserByUsername(username);
    const [user] = data;
    if (!!user) {
      // TODO
      console.log("Username already taken");
      return;
    }

    // Sanitize password
    if (password !== passwordConfirmation) {
      // TODO
      console.log("Passwords did not match");
      return;
    }

    // Create user

    const { data: allUsersData } = await getAllUsers(false);
    const amountOfUsers = allUsersData.length;
    console.log(allUsersData);

    const hashedNsaltedPw = "feature in progress";

    const newUser = {
      id: amountOfUsers + 1,
      username,
      password: hashedNsaltedPw,
      translations: [],
    };

    createUser(newUser);
  };

  return (
    <div className="signup">
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>Sign Up</legend>
          <UsernameInput />
          <PasswordInput placeholder="New Password" />
          <PasswordInput
            placeholder="New Password"
            name="passwordConfirmation"
          />
        </fieldset>

        <Button
          className="login-btn"
          type="submit"
        >
          Submit
        </Button>
      </form>

      <Link to="/login">I already have an account</Link>
    </div>
  );
};

export default Signup;
