import { useEffect } from "react";
import { Banner } from "../Banner/Banner";
import { Carousel } from "../Carousel/Carousel";
import { useCart } from "../contexts/Cart/cartContext";
import { ExploreGames } from "../ExploreGames/ExploreGames";
import { Header } from "../Header/Header";
import "./home.css";

export const Home = () => {
  const { cartState, cartDispatch } = useCart();
  console.log(cartState);
  useEffect(() => cartDispatch(), [cartDispatch]);
  return (
    <div className="container-app">
      <Header active="discover" />
      <div className="container-banner">
        <Banner />
      </div>
      <h3>New Releases</h3>
      <Carousel />
      <h3>Explore Top Games</h3>
      <ExploreGames />
    </div>
  );
};
