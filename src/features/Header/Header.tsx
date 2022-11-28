import { useAuth } from "auth/hooks";
import Mascot from "features/Mascot";
import ProfileButton from "features/ProfileButton";
import { useNavigate } from "react-router-dom";
import "./Header.style.scss";

const Header = () => {
  const { username } = useAuth();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="header_nav">
        <div className="header_nav-left">
          {username ? <Mascot onClick={navigateHome} /> : null}

          <button
            onClick={navigateHome}
            className="header_title"
          >
            Lost in Translation
          </button>
        </div>

        {username ? (
          <ProfileButton
            username={username}
            className="header_nav-right"
          />
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
