import { Badge, Avatar } from "shoto-ui";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import logo from "../../images/sword.svg";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from "../contexts/Cart/cartContext";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useNavPhone } from "../contexts/navPhoneContext";
import "./header.css";

export const Header = ({ active }) => {
  const { cart } = useCart();
  const screenWidth = useWindowSize().width;
  const { setNavPhoneVisibility } = useNavPhone();
  return (
    <header className="header">
      {screenWidth < 768 ? (
        <span className="btn-mobile-nav">
          <GiHamburgerMenu onClick={() => setNavPhoneVisibility((prev) => !prev)} />
        </span>
      ) : (
        <>
          {" "}
          <div className="container-logo">
            <img src={logo} alt="logo" />
            Game Sense
          </div>
          <Navbar active={active} />
        </>
      )}
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
        <div>
        <Avatar alt="tanjiro" src="https://64.media.tumblr.com/453021cb82f2d79140d92f617c01d98c/4c4becca07962d76-f7/s640x960/f3972fcb52c4f816c9892c0802dec002cb36b842.jpg" />
        </div>
      </div>
    </header>
  );
};
