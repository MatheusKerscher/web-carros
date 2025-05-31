import { useContext } from "react";

import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../Logo";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const iconProps = {
  size: 22,
  color: "#121212",
};

const Header = () => {
  const { signed } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    authService.signOut();
    toast.info("Até breve :)");
    navigate("/login");
  };

  return (
    <header className="py-2 bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl mx-auto px-3 flex flex-wrap items-center justify-between">
        <Logo width={120} />

        {signed ? (
          <div className="flex justify-center gap-3 items-center">
            <Link to="/dashboard">
              <FiUser {...iconProps} />
            </Link>

            <button
              type="button"
              className="cursor-pointer"
              onClick={handleSignOut}
            >
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
