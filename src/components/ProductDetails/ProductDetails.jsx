import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useLocation } from "react-router-dom";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useCart, useWishlist, useAlert } from "../../contexts";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./productDetails.css";

export const ProductDetails = () => {
  // const { productId } = useParams();
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible } = useNavPhone();
  const { state } = useLocation();
  const { item } = state;
  const { cart, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();
  const { setSnackbar } = useAlert();

  return (
    <div className="container-app container-product-details">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="" />}
      <Header active="" />
      <main className="main-product-details">
        <div className="container-img">
          <img src={item.coverImage} className="img-big" alt={item.name} />
        </div>
        <div className="product-details">
          <div className="card-details">
            <div>{item.name}</div>
            <div>
              {item.currency.symbol} {item.price}
            </div>
            <div className="action-area">
              {cart.find((cartItem) => cartItem.id === item.id) ? (
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

              {wishlist.find((wishlistItem) => wishlistItem.id === item.id) ? (
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
      </main>
    </div>
  );
};
