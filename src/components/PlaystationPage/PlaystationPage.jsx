import { CardCustom, CardContent, CardImage, Tag, StarRating } from "shoto-ui";
import { FilterMenu } from "../FilterMenu/FilterMenu";
import { Header } from "../Header/Header";
import { usePlaystation } from "../contexts/Playstation/playstationContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./playstationPage.css";

export const PlaystationPage = () => {
  const { data } = usePlaystation();
  console.log(data);
  return (
    <div className="container-app">
      <Header active="playstation" />
      <main className="main-playstation">
        <FilterMenu />
        <div className="games-list product-grid">
          {data.map((item) => {
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
                        <StarRating rating={item.rating} color={"rgb(255, 216, 20)"} />
                      </span>
                      <div
                        className="custom-container-heart"
                        onClick={() => console.log("clicked like")}
                      >
                        {true ? <AiFillHeart /> : <AiOutlineHeart />}
                      </div>
                    </div>
                    <div>{item.name}</div>
                  </div>
                  <div>
                    <div className="custom-card-price">
                      {item.currency && item.currency} {item.price}
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
                  <div className="custom-container-btn-action playstation">
                    <button>Add to cart</button>
                  </div>
                </CardContent>
              </CardCustom>
            );
          })}
        </div>
      </main>
    </div>
  );
};