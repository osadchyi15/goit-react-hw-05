import { clsx } from "clsx";
import s from "./Navigation.module.css";
import { IoHome } from "react-icons/io5";
import { RiMovie2AiFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <div className={s.navigationWrapper}>
      <nav className={s.navigation}>
        <NavLink to="/" className={buildLinkClass}>
          <span className={s.navigationLinkComplex}>
            <IoHome className={s.navigationIcons} />
            Home
          </span>
        </NavLink>

        <NavLink to="/movies" className={buildLinkClass}>
          <span className={s.navigationLinkComplex}>
            <RiMovie2AiFill className={s.navigationIcons} />
            Movies
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
