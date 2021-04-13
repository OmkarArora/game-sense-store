import { useEffect } from "react";
import { Banner } from "../Banner/Banner";
import { Carousel } from "../Carousel/Carousel";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone } from "../../contexts";
import "./home.css";

export const Home = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="discover" />}
      <Header active="discover" />
      <div className="container-new-product">
        <Banner />
      </div>
      <h3>New Releases</h3>
      <Carousel />
      {/* TODO: To be added in future version */}
      {/* <h3>Explore Top Games</h3>
      <ExploreGames /> */}
    </div>
  );
};
