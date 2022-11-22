import ArrowBtn from "features/common/ArrowBtn";
import Form from "features/common/Form";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "./Temp.style.scss";

const Temp = () => {
  return (
    <section className="login">
      <div className="login-top">
        <div className="login-top_text">
          <h1>Lost in Translation</h1>
          <h2>Get started</h2>
        </div>

        <div className="login-top_robot-cloud">
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
      </div>

      <div className="login-middle">
        <Form>
          <input
            type="text"
            required
            minLength={5}
            maxLength={15}
            name="username"
            placeholder="What's your name?"
          />
        </Form>

        <div className="login-middle_decoration"></div>
      </div>

      <div className="login-bottom"></div>
    </section>
  );
};

export default Temp;
