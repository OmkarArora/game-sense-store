import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import "./header.css";

export const Header = ({ active }) => {
  return (
    <header className="header">
      <div className="container-logo">LOGO</div>
      <Navbar active={active} />
      <div className="container-user-details">
        <div>
          <Link to="/cart">CART</Link>
        </div>
        <div>USER AVATAR</div>
      </div>
    </header>
  );
};
