const Button = ({ ...props }) => {
  const className = props.className
    ? `${props.className} btn-main`
    : "btn-main";

  return (
    <button
      {...props}
      className={className}
    ></button>
  );
};

export default Button;
