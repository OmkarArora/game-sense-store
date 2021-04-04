import { Card } from "shoto-ui";
import "./exploreGames.css";

export const ExploreGames = () => {

  // Temporary function, to be updated in future version
  const clickAction = () => {
    //perform action
    return;
  }

  return (
    <div className="product-grid">
      <Card
        type="showcase"
        colorTag="#FF0099"
        colorRating="#FF9529"
        heading="Hitman 3"
        subtext="$70"
        tags={["PC", "Xbox", "PS5"]}
        actionBtnText="Add to cart"
        performAction={() => clickAction()}
        isLiked={false}
        onClickLike={() => clickAction()}
        rating={4}
        bgImage="https://cdn2.unrealengine.com/fsp-key-art-1920x1080-07f25fad0dae.jpg?h=720&resize=1&w=1280"
      />
	  <Card
        type="showcase"
        colorTag="#FF0099"
        colorRating="#FF9529"
        heading="Outriders"
        subtext="₹ 2,999"
        tags={["PC", "Xbox", "PS5"]}
        actionBtnText="Add to cart"
        performAction={() => clickAction()}
        isLiked={false}
        onClickLike={() => clickAction()}
        rating={2}
        bgImage="https://cdn2.unrealengine.com/outriders-carousel-1920x1080-a00b8f3e57fc.png?h=1080&resize=1&w=1920"
      />
	  <Card
        type="showcase"
        colorTag="#FF0099"
        colorRating="#FF9529"
        heading="Fortnite"
        subtext="Free"
        tags={["PC", "Xbox", "Playstation"]}
		badge="New Season"
        actionBtnText="Add to cart"
        performAction={() => clickAction()}
        isLiked={false}
        onClickLike={() => clickAction()}
        rating={4}
        bgImage="https://cdn2.unrealengine.com/16br-agentjonesy-egs-fc-1920x1080-1920x1080-f72c1122c60a.jpg?h=1080&resize=1&w=1920"
      />
	   <Card
        type="showcase"
        colorTag="#FF0099"
        colorRating="#FF9529"
        heading="Hitman 3"
        subtext="$70"
        tags={["PC", "Xbox", "PS5"]}
        actionBtnText="Add to cart"
        performAction={() => clickAction()}
        isLiked={false}
        onClickLike={() => clickAction()}
        rating={4}
        bgImage="https://cdn2.unrealengine.com/fsp-key-art-1920x1080-07f25fad0dae.jpg?h=720&resize=1&w=1280"
      />
    </div>
  );
};
