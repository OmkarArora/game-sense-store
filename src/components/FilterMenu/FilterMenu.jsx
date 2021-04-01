import { StarRating } from "shoto-ui";
import "./filterMenu.css";

export const FilterMenu = ({ brands, dispatch, ratingFilter, priceFilter }) => {
  const yellowColor = "rgb(255, 149, 41)";
  return (
    <div className="container-filterMenu">
      {brands && (
        <div className="filter-block">
          <div className="filter-heading">Brands</div>
          <div>
            {brands.map((item) => (
              <input type="checkbox" />
            ))}
          </div>
        </div>
      )}

      <div className="filter-block">
        <div className="filter-heading">
          <div>Price</div>
          {priceFilter && (
            <div
              className="filter-clear"
              onClick={() =>
                dispatch({
                  type: "SET_PRICE_FILTER",
                  payload: null,
                })
              }
            >
              {"<"} Clear
            </div>
          )}
        </div>

        <div
          className={
            priceFilter && priceFilter.low === 0
              ? "price-filter active"
              : "price-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_PRICE_FILTER",
              payload: { low: 0, high: 500 },
            })
          }
        >
          ₹ 0 to ₹ 500
        </div>
        <div
          className={
            priceFilter && priceFilter.low === 500
              ? "price-filter active"
              : "price-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_PRICE_FILTER",
              payload: { low: 500, high: 1500 },
            })
          }
        >
          ₹ 500 to ₹ 1500
        </div>
        <div
          className={
            priceFilter && priceFilter.low === 1500
              ? "price-filter active"
              : "price-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_PRICE_FILTER",
              payload: { low: 1500, high: 2500 },
            })
          }
        >
          ₹ 1500 to ₹ 2500
        </div>
        <div
          className={
            priceFilter && priceFilter.low === 2500
              ? "price-filter active"
              : "price-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_PRICE_FILTER",
              payload: { low: 2500, high: 3500 },
            })
          }
        >
          ₹ 2500 to ₹ 3500
        </div>
        <div
          className={
            priceFilter && priceFilter.low === 3500
              ? "price-filter active"
              : "price-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_PRICE_FILTER",
              payload: { low: 3500, high: 99999 },
            })
          }
        >
          ₹ 3500 &amp; above
        </div>
      </div>

      <div className="filter-block">
        <div className="filter-heading">
          <div>Customer Review</div>
          {ratingFilter && (
            <div
              className="filter-clear"
              onClick={() =>
                dispatch({ type: "SET_RATING_FILTER", payload: null })
              }
            >
              {"<"} Clear
            </div>
          )}
        </div>
        <div
          className={
            ratingFilter && ratingFilter === 4
              ? "rating-filter active"
              : "rating-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_RATING_FILTER",
              payload: 4,
            })
          }
        >
          <StarRating rating={4} color={yellowColor} /> and Up
        </div>
        <div
          className={
            ratingFilter && ratingFilter === 3
              ? "rating-filter active"
              : "rating-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_RATING_FILTER",
              payload: 3,
            })
          }
        >
          <StarRating rating={3} color={yellowColor} /> and Up
        </div>
        <div
          className={
            ratingFilter && ratingFilter === 2
              ? "rating-filter active"
              : "rating-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_RATING_FILTER",
              payload: 2,
            })
          }
        >
          <StarRating rating={2} color={yellowColor} /> and Up
        </div>
        <div
          className={
            ratingFilter && ratingFilter === 1
              ? "rating-filter active"
              : "rating-filter"
          }
          onClick={() =>
            dispatch({
              type: "SET_RATING_FILTER",
              payload: 1,
            })
          }
        >
          <StarRating rating={1} color={yellowColor} /> and Up
        </div>
      </div>
    </div>
  );
};
