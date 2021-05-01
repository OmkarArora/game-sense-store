import { useEffect } from "react";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import { FilterPhone } from "../FilterPhone/FilterPhone";
import { NavPhone } from "../NavPhone/NavPhone";
import { Header } from "../Header/Header";
import { useXbox, useNavPhone } from "../../contexts";
import { useWindowSize } from "../../hooks";
import { ProductCard } from "../ProductCard/ProductCard";

export const XboxPage = () => {
  const yellowColor = "rgb(255, 149, 41)";
  const greenColor = "rgb(16, 124, 16)";

  const { products, ratingFilter, priceFilter, dispatch } = useXbox();

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
              filteredData.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  starColor={yellowColor}
                  tagColor={greenColor}
                  category="xbox"
                />
              ))}
          </div>
          {filteredData.length === 0 && (
            <div className="disclaimer-empty">No search results</div>
          )}
        </div>
      </main>
    </div>
  );
};
