import s from "./Navigation.module.css";

import { IoHome } from "react-icons/io5";
import { RiMovie2AiFill } from "react-icons/ri";

const Navigation = () => {
  return (
    <div className={s.navigationWrapper}>
      <nav className={s.navigation}>
        <a className={s.navigationLink} href="" title="Home">
          <span className={s.navigationLinkComplex}>
            <IoHome className={s.navigationIcons} />
            Home
          </span>
        </a>
        <a className={s.navigationLink} href="" title="Movies">
          <span className={s.navigationLinkComplex}>
            <RiMovie2AiFill className={s.navigationIcons} />
            Movies
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Navigation;
