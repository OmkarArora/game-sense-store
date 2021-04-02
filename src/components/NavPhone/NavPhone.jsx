import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { useNavPhone } from "../contexts/navPhoneContext";
import "./navPhone.css";

export const NavPhone = ({ active }) => {
  const { setNavPhoneVisibility } = useNavPhone();
  return (
    <div className="navphone-overlay">
      <span className="btn-close" onClick={() => setNavPhoneVisibility(false)}>
        <MdClear />
      </span>
      <div className="navphone">
        <nav className="navbar">
          <ul>
            <li>
              <Link
                to="/"
                className={active === "discover" ? "link active" : "link"}
              >
                {active === "discover" && "> "}Discover
              </Link>
            </li>
            <li>
              <Link
                to="/playstation"
                className={active === "playstation" ? "link active" : "link"}
              >
                {active === "playstation" && "> "}Playstation
              </Link>
            </li>
            <li>
              <Link
                to="/xbox"
                className={active === "xbox" ? "link active" : "link"}
              >
                {active === "xbox" && "> "}Xbox &amp; Windows
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className={active === "wishlist" ? "link active" : "link"}
              >
                {active === "wishlist" && "> "}Wishlist
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
