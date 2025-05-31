import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-danger rounded-lg text-white px-5 py-3">
      <ul className="flex gap-6">
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              (isActive ? "font-bold" : "") + " transition-all"
            }
            end
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="new-car"
            className={({ isActive }) =>
              (isActive ? "font-bold" : "") + " transition-all"
            }
            end
          >
            Novo carro
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
