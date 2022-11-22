import ArrowBtn from "../ArrowBtn";
import "./Form.style.scss";

interface IForm {
  className?: string;
  height?: string;
  children: JSX.Element;
}

// If changing height of form:
// 1. Also change height of input
// 2. Refresh page

const Form = ({ height, className, children, ...rest }: IForm) => {
  return (
    <form
      className={`${className} form_page-primary`}
      style={{ height: `${height}` }}
      {...rest}
    >
      <div
        className="form_page-primary_keyboard"
        style={{ height: `${height}` }}
      >
        <img
          src="/images/Keyboard.png"
          alt="Keyboard icon"
        />
      </div>
      {children}
      <ArrowBtn style={{ height: `${height}` }} />
    </form>
  );
};

export default Form;
