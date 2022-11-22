import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "./ArrowBtn.style.scss";

const ArrowBtn = ({ ...props }) => {
  return (
    <button
      {...props}
      className={`${props.className} arrow-btn`}
    >
      <BsFillArrowRightCircleFill />
    </button>
  );
};

export default ArrowBtn;
