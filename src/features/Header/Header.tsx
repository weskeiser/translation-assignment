import { useAuth } from "auth";
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
      <div className="header_content">
        {username ? <Mascot onClick={navigateHome} /> : null}

        <nav>
          <button
            onClick={navigateHome}
            className="header_title"
          >
            Lost in Translation
          </button>

          {username ? <ProfileButton username={username} /> : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
