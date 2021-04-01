import { CardCustom, CardContent, CardImage, Tag, StarRating } from "shoto-ui";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import { Header } from "../Header/Header";
import { usePlaystation } from "../contexts/Playstation/playstationContext";
import { useCart } from "../contexts/Cart/cartContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import "./playstationPage.css";
import { useWishlist } from "../contexts/Wishlist/wishlistContext";

export const PlaystationPage = () => {
  const yellowColor = "rgb(255, 149, 41)";

  const { products, ratingFilter, priceFilter, dispatch } = usePlaystation();
  const { cart, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();

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
      <Header active="playstation" />
      <main className="main-playstation">
        <FilterMenu
          dispatch={(args) => dispatch(args)}
          ratingFilter={ratingFilter}
          priceFilter={priceFilter}
        />
        <div className="games-list product-grid">
          {filteredData.map((item) => {
            return (
              <CardCustom key={item.id}>
                <CardImage image={item.coverImage} title={item.name} />
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
                    <div>{item.name}</div>
                  </div>
                  <div>
                    <div className="custom-card-price">
                      {item.price === 0
                        ? "Free"
                        : `${item.currency} ${item.price}`}
                    </div>
                    <div className="custom-container-tags">
                      {item.platforms.map((_item) => (
                        <Tag
                          color="rgb(0, 111, 205)"
                          borderColor="rgb(0, 111, 205)"
                          key={`${item.id}${_item}`}
                        >
                          {_item}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  {cart.find((cartItem) => cartItem.id === item.id) ? (
                    <div className="text-addedToCart playstation">
                      <span className="icon-addedToCart">
                        <IoBagCheckOutline />
                      </span>
                      Added to Cart
                    </div>
                  ) : (
                    <div className="custom-container-btn-action playstation">
                      <button
                        onClick={() =>
                          cartDispatch({ type: "ADD_TO_CART", payload: item })
                        }
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
      </main>
    </div>
  );
};
