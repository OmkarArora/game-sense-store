import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useLocation, useParams } from "react-router-dom";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useCart, useWishlist, useAlert } from "../../contexts";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LoadingState } from "../LoadingState/LoadingState";
import { ErrorState } from "../ErrorState/ErrorState";
import "./productDetails.css";

export const ProductDetails = () => {
  const [appState, setAppState] = useState("success");
  const [item, setItem] = useState(null);
  const { productId } = useParams();
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible } = useNavPhone();
  const { state } = useLocation();

  const { cart, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();
  const { setSnackbar } = useAlert();

  useEffect(() => {
    if (!state) {
      (async () => {
        try {
          setAppState("loading");
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/products/${productId}`
          );
          if (data.success) {
            data.product.id = data.product._id;
            setItem(data.product);
            setAppState("success");
          } else {
            setAppState("error");
          }
        } catch (error) {
          setAppState("error");
        }
      })();
    } else {
      setItem(state.item);
    }
  }, [state, productId]);

  return (
    <div className="container-app container-product-details">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="" />}
      <Header active="" />
      <main className="main-product-details">
        {appState === "loading" && <LoadingState />}
        {appState === "error" && <ErrorState />}
        {appState === "success" && (
          <>
            <div className="container-img">
              <img
                src={item && item.coverImage}
                className="img-big"
                alt={item && item.name}
              />
            </div>
            <div className="product-details">
              <div className="card-details">
                <div>{item && item.name}</div>
                <div>
                  {item && item.currency.symbol} {item && item.price}
                </div>
                <div className="action-area">
                  {item && cart.find((cartItem) => cartItem.id === item.id) ? (
                    <div className="text-addedToCart wishlist">
                      <span className="icon-addedToCart">
                        <IoBagCheckOutline />
                      </span>
                      Moved to Cart
                    </div>
                  ) : (
                    <div className="custom-container-btn-action">
                      <button
                        onClick={() => {
                          cartDispatch({
                            type: "ADD_TO_CART",
                            payload: { ...item, quantity: 1 },
                          });
                          return setSnackbar({
                            openStatus: true,
                            type: "info",
                            data: "Moved to cart",
                          });
                        }}
                      >
                        Move to cart
                      </button>
                    </div>
                  )}

                  {item &&
                  wishlist.find(
                    (wishlistItem) => wishlistItem.id === item.id
                  ) ? (
                    <div
                      className="custom-container-heart"
                      onClick={() =>
                        wishlistDispatch({
                          type: "REMOVE_FROM_WISHLIST",
                          payload: item.id,
                        })
                      }
                    >
                      <AiFillHeart />
                    </div>
                  ) : (
                    <div
                      className="custom-container-heart"
                      onClick={() =>
                        wishlistDispatch({
                          type: "ADD_TO_WISHLIST",
                          payload: item,
                        })
                      }
                    >
                      <AiOutlineHeart />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
