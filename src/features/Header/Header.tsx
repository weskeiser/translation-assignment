import { useNavigate } from "react-router-dom";
import "./Header.style.scss";

const Header = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    console.log(8);
    navigate("/");
  };

  const navigateProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="header">
      <nav>
        <button
          onClick={navigateHome}
          className="header_title"
        >
          Lost in Translation
        </button>

        <button
          onClick={navigateProfile}
          className="header_profile"
        >
          <div className="header_profile_name">
            <p>Dewald</p>
          </div>
          <div className="header_profile_circle">
            <div className="header_profile_circle-inner"></div>
            <div className="header_profile_circle-lower"></div>
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
