import { Badge } from "shoto-ui";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import logo from "../../images/sword.svg";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/Cart/cartContext";
import "./header.css";

export const Header = ({ active }) => {
  const { cart } = useCart();
  return (
    <header className="header">
      <div className="container-logo">
        <img src={logo} alt="logo" />
        Game Sense
      </div>
      <Navbar active={active} />
      <div className="container-user-details">
        <Link to="/cart">
          {cart.length === 0 ? (
            <div className="container-cart-icon">
              <FaShoppingCart />
            </div>
          ) : (
            <Badge badgeContent={cart.length} bgColor="#6b3aba" color="white">
              <div className="container-cart-icon">
                <FaShoppingCart />
              </div>
            </Badge>
          )}
        </Link>
        <div>USER AVATAR</div>
      </div>
    </header>
  );
};
