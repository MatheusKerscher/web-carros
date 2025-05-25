import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import Logo from "../../assets/logo.svg?react";
import { Link } from "react-router-dom";

const iconProps = {
  size: 22,
  color: "#121212",
};

const Header = () => {
  return (
    <header className="px-3 py-2 bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <Link to="/">
          <Logo width={120} />
        </Link>

        {true ? (
          <div className="flex justify-center gap-3 items-center">
            <Link to="/dashboard">
              <FiUser {...iconProps} />
            </Link>

            <button>
              <FiLogOut {...iconProps} color="#E11138" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="w-full sm:w-auto flex justify-center">
            <FiLogIn {...iconProps} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
