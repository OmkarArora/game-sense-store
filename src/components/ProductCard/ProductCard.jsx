import { CardCustom, CardContent, CardImage, Tag, StarRating } from "shoto-ui";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { useAlert, useWishlist, useCart } from "../../contexts";
import { Link } from "react-router-dom";
import "./productCard.css";

export const ProductCard = ({ item, starColor, tagColor, category }) => {
  const { wishlist, wishlistDispatch } = useWishlist();
  const { cart, cartDispatch } = useCart();
  const { setSnackbar } = useAlert();
  return (
    <CardCustom key={item.id}>
      <Link to={`/product/${item.id}`} state={{ item }}>
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
              <StarRating rating={item.rating} color={starColor} />
            </span>

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
                onClick={() => {
                  if (localStorage?.getItem("login")) {
                    wishlistDispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: item,
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
                color={tagColor}
                borderColor={tagColor}
                key={`${item.id}${_item}`}
              >
                {_item}
              </Tag>
            ))}
          </div>
        </div>
        {cart.find((cartItem) => cartItem.id === item.id) ? (
          <div className={`text-addedToCart ${category}`}>
            <span className="icon-addedToCart">
              <IoBagCheckOutline />
            </span>
            Added to Cart
          </div>
        ) : (
          <div className={`custom-container-btn-action ${category}`}>
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
};
