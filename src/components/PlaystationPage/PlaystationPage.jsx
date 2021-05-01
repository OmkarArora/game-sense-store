import { useEffect } from "react";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import { FilterPhone } from "../FilterPhone/FilterPhone";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone, usePlaystation } from "../../contexts";
import { LoadingState } from "../LoadingState/LoadingState";
import { ErrorState } from "../ErrorState/ErrorState";
import { ProductCard } from "../ProductCard/ProductCard";

export const PlaystationPage = () => {
  const yellowColor = "rgb(255, 149, 41)";
  const blueColor = "rgb(0, 111, 205)";

  const {
    products,
    ratingFilter,
    priceFilter,
    appState,
    dispatch,
  } = usePlaystation();

  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

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
      {screenWidth < 768 && navPhoneVisible && (
        <NavPhone active="playstation" />
      )}
      <Header active="playstation" />
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
        {appState === "loading" && <LoadingState />}
        {appState === "error" && <ErrorState />}
        {appState === "success" && (
          <div className="games-list">
            <div className="product-grid">
              {filteredData.length !== 0 &&
                filteredData.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    starColor={yellowColor}
                    tagColor={blueColor}
                    category="playstation"
                  />
                ))}
            </div>
            {filteredData.length === 0 && (
              <div className="disclaimer-empty">No search results</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
