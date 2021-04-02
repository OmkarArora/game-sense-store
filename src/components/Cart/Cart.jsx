import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useCart } from "../contexts/Cart/cartContext";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useNavPhone } from "../contexts/navPhoneContext";
import { useWishlist } from "../contexts/Wishlist/wishlistContext";
import "./cart.css";

export const Cart = () => {
  const { cart, cartDispatch } = useCart();
  const { wishlistDispatch } = useWishlist();

  const screenWidth = useWindowSize().width;
  const { navPhoneVisible  } = useNavPhone();

  const getTotalCartQuantity = () =>
    cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const getTotalCartPrice = () =>
    cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <div className="container-app">
      {screenWidth<768 && navPhoneVisible && <NavPhone active=""/>}
      <Header active="" />
      <div className="page-heading">Cart</div>
      <div className="container-cart">
        <div className="items-list">
          {cart.map((item) => (
            <div className="cart-card">
              <img
                className="cart-image"
                src={item.coverImage}
                alt={item.name}
              />
              <div className="cart-item-details">
                <div className="details">
                  <div>
                    <div className="name">{item.name}</div>
                    <div className="subheading">
                      <span>Platforms:</span> {item.platforms.join(", ")}
                    </div>
                  </div>
                  <div className="cart-actions">
                    {item.category === "peripheral" && <span>quantity |</span>}
                    <span
                      onClick={() =>
                        cartDispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item.id,
                        })
                      }
                    >
                      Delete
                    </span>{" "}
                    |{" "}
                    <span
                      onClick={() => {
                        wishlistDispatch({
                          type: "ADD_TO_WISHLIST",
                          payload: item,
                        });
                        return cartDispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item.id,
                        });
                      }}
                    >
                      Save for later
                    </span>
                  </div>
                </div>
                <div className="pricing">
                  {item.currency} {item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container-subtotal">

          <span className="heading-subtotal">Subtotal({getTotalCartQuantity()} items)</span>
          <span>
            {cart[0] && cart[0].currency} {getTotalCartPrice()}
          </span>

          <div className="custom-container-btn-action cart">
            <button>CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};
