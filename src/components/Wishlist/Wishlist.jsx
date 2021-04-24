import { useEffect } from "react";
import { CardCustom, CardContent, CardImage, Tag, StarRating } from "shoto-ui";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useCart, useAlert, useWishlist } from "../../contexts";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import "./wishlist.css";
import EmptyWishlist from "../../images/empty_list.svg";
import { LoadingState } from "../LoadingState/LoadingState";
import { ErrorState } from "../ErrorState/ErrorState";

export const Wishlist = () => {
  const yellowColor = "rgb(255, 149, 41)";

  const { cart, cartDispatch } = useCart();
  const { wishlist, appState, wishlistDispatch } = useWishlist();

  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

  const { setSnackbar } = useAlert();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="wishlist" />}
      <Header active="wishlist" />
      <div className="wishlist main-container-products">
        {appState === "loading" && <LoadingState />}
        {appState === "error" && <ErrorState />}
        {appState === "success" && wishlist.length !== 0 && (
          <main className="games-list product-grid">
            {wishlist.map((item) => (
              <CardCustom key={item.id}>
                <div className="card-wishlist">
                  <CardImage image={item.coverImage} title={item.name} />
                  <span
                    className="container-wishlist-cross"
                    onClick={() =>
                      wishlistDispatch({
                        type: "REMOVE_FROM_WISHLIST",
                        payload: item.id,
                      })
                    }
                  >
                    <MdCancel />
                  </span>
                </div>

                <CardContent>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="custom-container-rating">
                        <StarRating rating={item.rating} color={yellowColor} />
                      </span>
                    </div>
                    <div>{item.name}</div>
                  </div>
                  <div>
                    <div className="custom-card-price">
                      {item.price === 0
                        ? "Free"
                        : `${item.currency.symbol} ${item.price}`}
                    </div>
                    <div className="custom-container-tags">
                      {item.platforms.map((_item) => (
                        <Tag
                          color={yellowColor}
                          borderColor={yellowColor}
                          key={`${item.id}${_item}`}
                        >
                          {_item}
                        </Tag>
                      ))}
                    </div>
                  </div>
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
                </CardContent>
              </CardCustom>
            ))}
          </main>
        )}
        {appState === "success" && wishlist.length === 0 && (
          <div className="disclaimer-empty">
            <img src={EmptyWishlist} alt="empty wishlist" />
            <div>Seems like your wishlist is empty :(</div>
          </div>
        )}
      </div>
    </div>
  );
};
