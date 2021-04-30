import { Card } from "shoto-ui";
import { useEffect } from "react";
import { Banner } from "../Banner/Banner";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { LoadingState } from "../LoadingState/LoadingState";
import { ErrorState } from "../ErrorState/ErrorState";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useHome } from "../../contexts";
import "./home.css";

export const Home = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  const { products, appState } = useHome();

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="discover" />}
      <Header active="discover" />
      <div className="container-new-product">
        <Banner />
      </div>
      <h3>New Releases</h3>
      {appState === "loading" && <LoadingState />}
      {appState === "error" && <ErrorState />}
      {appState === "success" && (
        <div className="container-showcase-products">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              state={{ item: product }}
              key={product.id}
            >
              <Card
                type="hero"
                heading={product.name}
                subtext={`${product.currency.symbol} ${product.price}`}
                description={product.description.substr(0, 60) + "..."}
                tags={product.platforms}
                // actionBtnText="Buy Now"
                // performAction={() =>
                //   navigate(`/product/${product.id}`, { state: { item: product } })
                // }
                bgImage={product.coverImage}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
