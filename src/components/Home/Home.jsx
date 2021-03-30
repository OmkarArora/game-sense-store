import { Banner } from "../Banner/Banner"
import { Carousel } from "../Carousel/Carousel"
import { ExploreGames } from "../ExploreGames/ExploreGames"
import { Header } from "../Header/Header"

export const Home = () => {
	return (
		<div style={{padding: "0 2rem 2rem 2rem"}}>
			<Header/>
			<Banner/>
			<h3>New Releases</h3>
			<Carousel/>
			<h3>Explore Top Games</h3>
			<ExploreGames/>
		</div>
	)
}