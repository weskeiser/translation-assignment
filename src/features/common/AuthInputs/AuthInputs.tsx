export const UsernameInput = ({ ...props }) => {
  return (
    <input
      required
      type="text"
      minLength={5}
      maxLength={15}
      name="username"
      placeholder="Username"
      {...props}
    />
  );
};

export const PasswordInput = ({ ...props }) => {
  return (
    <input
      required
      type="password"
      minLength={8}
      maxLength={24}
      name="password"
      placeholder="Password"
      {...props}
    />
  );
};
