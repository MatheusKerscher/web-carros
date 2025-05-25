import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import Logo from "../Logo";

const iconProps = {
  size: 22,
  color: "#121212",
};

const Header = () => {
  const isLogged = false
  
  return (
    <header className="py-2 bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl mx-auto px-3 flex flex-wrap items-center justify-between">
        <Logo  width={120}/>

        {isLogged ? (
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
