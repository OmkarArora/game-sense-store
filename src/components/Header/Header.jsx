import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import logo from "../../images/sword.svg"
import "./header.css";

export const Header = ({ active }) => {
  return (
    <header className="header">
      <div className="container-logo">
		  <img src={logo} alt="logo"/>
		  Game Sense
	  </div>
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
