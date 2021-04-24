import { useEffect } from "react";
import { CardCustom, CardContent, CardImage, Tag, StarRating } from "shoto-ui";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import { FilterPhone } from "../FilterPhone/FilterPhone";
import { NavPhone } from "../NavPhone/NavPhone";
import { Header } from "../Header/Header";
import {
  useXbox,
  useCart,
  useWishlist,
  useNavPhone,
  useAlert,
} from "../../contexts";
import { useWindowSize } from "../../hooks";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./xboxPage.css";

export const XboxPage = () => {
  const yellowColor = "rgb(255, 149, 41)";
  const greenColor = "rgb(16, 124, 16)";

  const { products, ratingFilter, priceFilter, dispatch } = useXbox();
  const { cart, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();

  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

  const { setSnackbar } = useAlert();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  const filterData = (products, price, rating) => {
    let data = [...products];
    if (price)
      data = data.filter(
        (item) => item.price >= price.low && item.price < price.high
      );
    if (rating) data = data.filter((item) => item.rating >= rating);
    return data;
  };
  const filteredData = filterData(products, priceFilter, ratingFilter);

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="xbox" />}
      <Header active="xbox" />
      <main className="main-container-products">
        {screenWidth < 768 ? (
          <FilterPhone
            dispatch={(args) => dispatch(args)}
            ratingFilter={ratingFilter}
            priceFilter={priceFilter}
          />
        ) : (
          <FilterMenu
            dispatch={(args) => dispatch(args)}
            ratingFilter={ratingFilter}
            priceFilter={priceFilter}
          />
        )}
        <div className="games-list">
          <div className="product-grid">
            {filteredData.length !== 0 &&
              filteredData.map((item) => {
                return (
                  <CardCustom key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <CardImage image={item.coverImage} title={item.name} />
                    </Link>
                    <CardContent>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="custom-container-rating">
                            <StarRating
                              rating={item.rating}
                              color={yellowColor}
                            />
                          </span>

                          {wishlist.find(
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
                        <div>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </div>
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
                              color={greenColor}
                              borderColor={greenColor}
                              key={`${item.id}${_item}`}
                            >
                              {_item}
                            </Tag>
                          ))}
                        </div>
                      </div>
                      {cart.find((cartItem) => cartItem.id === item.id) ? (
                        <div className="text-addedToCart xbox">
                          <span className="icon-addedToCart">
                            <IoBagCheckOutline />
                          </span>
                          Added to Cart
                        </div>
                      ) : (
                        <div className="custom-container-btn-action xbox">
                          <button
                            onClick={() => {
                              cartDispatch({
                                type: "ADD_TO_CART",
                                payload: { ...item, quantity: 1 },
                              });
                              return setSnackbar({
                                openStatus: true,
                                type: "success",
                                data: "Added to cart",
                              });
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </CardCustom>
                );
              })}
          </div>
          {filteredData.length === 0 && (
            <div className="disclaimer-empty">No search results</div>
          )}
        </div>
      </main>
    </div>
  );
};
