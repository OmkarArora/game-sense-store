import { FilterMenu } from "../FilterMenu/FilterMenu";
import { ExploreGames } from "../ExploreGames/ExploreGames";
import { Header } from "../Header/Header";
import "./playstationPage.css";

export const PlaystationPage = () => {
  return (
    <div className="container-app">
      <Header active="playstation" />
      <main className="main-playstation">
          <FilterMenu />
        <div className="games-list">
          <ExploreGames />
        </div>
      </main>
    </div>
  );
};
