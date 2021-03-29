import { Banner } from "../Banner/Banner"
import { Carousel } from "../Carousel/Carousel"
import { Header } from "../Header/Header"

export const Home = () => {
	return (
		<div style={{padding: "0 1rem"}}>
			<Header/>
			<Banner/>
			<h3>New Releases</h3>
			<Carousel/>
		</div>
	)
}