import { Card } from "shoto-ui";
import "./carousel.css";

export const Carousel = () => {
  return (
    <div className="container-carousel">
      <Card
        type="hero"
        heading="Cyberpunk 2077"
        subtext="₹ 2,999"
        description="Cyberpunk 2077 is an open-world story set in Night City."
        tags={["PC", "Playstation", "Xbox"]}
        actionBtnText="Buy Now"
        performAction={() => console.log("Pre order")}
        bgImage="https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-preview.jpg"
      />
      <Card
        type="hero"
        heading="Horizon Forbidden West"
        subtext=""
        description="Playstation Exclusize"
        tags={["PS5", "PS4"]}
        actionBtnText="Pre Order"
        performAction={() => console.log("Pre order")}
        bgImage="https://gmedia.playstation.com/is/image/SIEPDC/horizon-forbidden-west-screenshot-01-disclaimer-02oct20?$1600px$"
      />
      <Card
        type="hero"
        heading="Halo Infinite"
        description="Trailer out now."
        tags={["PC", "Xbox"]}
        actionBtnText="Explore"
        performAction={() => console.log("Pre order")}
        bgImage="https://www.nme.com/wp-content/uploads/2020/06/Halo-Infinite-696x442.jpg"
      />
      <Card
        type="hero"
        heading="Marvel's Spider-Man: Miles Morales"
        subtext="₹ 3,999"
        description="Experience the rise of Miles Morales as the new hero to become his own Spider-Man."
        tags={["PS5", "PS4"]}
        actionBtnText="Buy Now"
        performAction={() => console.log("Buy")}
        bgImage="https://gmedia.playstation.com/is/image/SIEPDC/spiderman-miles-morales-screenshot-04-disclaimer-en-01oct20?$1600px--t$"
      />
    </div>
  );
};
