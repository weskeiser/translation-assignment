import { useNavigate } from "react-router-dom";
import "./ProfileButton.style.scss";

interface IProfileButton {
  username: string;
  className?: string;
}

const ProfileButton = ({ username, ...props }: IProfileButton) => {
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
  };

  return (
    <button
      onClick={navigateProfile}
      {...props}
      className={`${props.className} header_profile`}
    >
      <div className="header_profile_name">
        <p>{username}</p>
      </div>
      <div className="header_profile_circle">
        <div className="header_profile_circle-inner"></div>
        <div className="header_profile_circle-lower"></div>
      </div>
    </button>
  );
};

export default ProfileButton;
