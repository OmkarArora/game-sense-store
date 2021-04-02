import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = ({ active }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link
            to="/"
            className={active === "discover" ? "link active" : "link"}
          >
            Discover
            {active === "discover" && <span className="link-active-circle"></span>}
          </Link>
        </li>
        <li>
          <Link
            to="/playstation"
            className={active === "playstation" ? "link active" : "link"}
          >
            Playstation
            {active === "playstation" && <span className="link-active-circle"></span>}
          </Link>
        </li>
        <li>
          <Link
            to="/xbox"
            className={active === "xbox" ? "link active" : "link"}
          >
            Xbox &amp; Windows
            {active === "xbox" && <span className="link-active-circle"></span>}
          </Link>
        </li>
        <li>
          <Link
            to="/wishlist"
            className={active === "wishlist" ? "link active" : "link"}
          >
            Wishlist
            {active === "wishlist" && <span className="link-active-circle"></span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
