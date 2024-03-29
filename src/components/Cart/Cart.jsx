import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import {
  useCart,
  useNavPhone,
  useWishlist,
  useAlert,
  useAuth,
  useOrders,
} from "../../contexts";
import { useWindowSize } from "../../hooks";
import EmptyCart from "../../images/empty_cart.svg";
import { ErrorState } from "../ErrorState/ErrorState";
import { displayRazorpay } from "../../utils/RazorpayGateway";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import { useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart, cartDispatch, appState: cartAppState } = useCart();
  const { wishlistDispatch } = useWishlist();
  const { userId } = useAuth();
  const { ordersDispatch } = useOrders();
  const navigate = useNavigate();

  const screenWidth = useWindowSize().width;
  const { navPhoneVisible } = useNavPhone();
  const { setSnackbar } = useAlert();

  const [isCheckoutLoading, setCheckoutLoading] = useState(false);

  const getTotalCartQuantity = () =>
    cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const getTotalCartPrice = () =>
    cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  let productDetailsForPayment = [];
  if (cart)
    productDetailsForPayment = cart.reduce(
      (acc, curr) => [...acc, { productId: curr._id, qty: curr.quantity }],
      []
    );

  const fulfilOrder = (orders) => {
    ordersDispatch({ type: "SET_ORDERS", payload: { orders } });
    cartDispatch({
      type: "RESET_CART",
    });
    setSnackbar({
      openStatus: true,
      type: "success",
      data: "Payment successful",
    });
    navigate("/");
  };

  const onPaymentError = (error) => {
    setSnackbar({
      openStatus: true,
      type: "error",
      data: "Payment failed, try again later",
    });
    setCheckoutLoading(false);
  }

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="" />}
      <Header active="" />
      <div className="page-heading">Cart</div>
      <div className="container-cart">
        {cartAppState === "loading" && <LoadingModal />}
        {cartAppState === "error" && <ErrorState />}
        {cartAppState === "success" && cart && cart.length !== 0 && (
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
                            if (localStorage?.getItem("gSenseLogin")) {
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
                Subtotal({cart && cart.length !== 0 && getTotalCartQuantity()}{" "}
                items)
              </span>
              <span>
                {cart[0] && cart[0].currency && cart[0].currency.symbol}{" "}
                {cart && cart.length !== 0 && getTotalCartPrice()}
              </span>

              <div className="custom-container-btn-action cart">
                <button
                  disabled={isCheckoutLoading}
                  onClick={() => {
                    setCheckoutLoading(true);
                    displayRazorpay(
                      productDetailsForPayment,
                      userId,
                      fulfilOrder,
                      setCheckoutLoading,
                      onPaymentError
                    );
                  }}
                >
                  {isCheckoutLoading ? "Loading..." : "CHECKOUT"}
                </button>
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
