import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useCart, useNavPhone, useWishlist, useAlert } from "../../contexts";
import { useWindowSize } from "../../hooks";
import EmptyCart from "../../images/empty_cart.svg";
import { LoadingState } from "../LoadingState/LoadingState";
import { ErrorState } from "../ErrorState/ErrorState";
import "./cart.css";

export const Cart = () => {
  const { cart, cartDispatch, appState: cartAppState } = useCart();
  const { wishlistDispatch } = useWishlist();

  const screenWidth = useWindowSize().width;
  const { navPhoneVisible } = useNavPhone();
  const { setSnackbar } = useAlert();

  const getTotalCartQuantity = () =>
    cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const getTotalCartPrice = () =>
    cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="" />}
      <Header active="" />
      <div className="page-heading">Cart</div>
      <div className="container-cart">
        {cartAppState === "loading" && <LoadingState />}
        {cartAppState === "error" && <ErrorState />}
        {cartAppState === "success" && cart.length !== 0 && (
          <>
            <div className="items-list">
              {cart.map((item) => (
                <div className="cart-card" key={`cartItem${item.id}`}>
                  <img
                    className="cart-image"
                    src={item && item.coverImage}
                    alt={item && item.name}
                  />
                  <div className="cart-item-details">
                    <div className="details">
                      <div>
                        <div className="name">{item.name}</div>
                        <div className="subheading">
                          <span>Platforms:</span>{" "}
                          {item && item.platforms && item.platforms.join(", ")}
                        </div>
                      </div>
                      <div className="cart-actions">
                        {item.category === "peripheral" && (
                          <span>quantity |</span>
                        )}
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
                            if (localStorage?.getItem("login")) {
                              wishlistDispatch({
                                type: "ADD_TO_WISHLIST",
                                payload: item,
                              });
                              return cartDispatch({
                                type: "REMOVE_FROM_CART",
                                payload: item.id,
                              });
                            } else {
                              setSnackbar({
                                openStatus: true,
                                type: "error",
                                data: "Login to save to wishlist",
                              });
                            }                
                          }}
                        >
                          Save for later
                        </span>
                      </div>
                    </div>
                    <div className="pricing">
                      {item && item.currency && item.currency.symbol}{" "}
                      {(item && item.price) * (item && item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="container-subtotal">
              <span className="heading-subtotal">
                Subtotal({getTotalCartQuantity()} items)
              </span>
              <span>
                {cart[0] && cart[0].currency.symbol} {getTotalCartPrice()}
              </span>

              <div className="custom-container-btn-action cart">
                <button>CHECKOUT</button>
              </div>
            </div>
          </>
        )}
      </div>
      {cartAppState === "success" && cart.length === 0 && (
        <div className="disclaimer-empty">
          <img src={EmptyCart} alt="empty cart" />
          <div>Your cart is empty, add some products now!</div>
        </div>
      )}
    </div>
  );
};
