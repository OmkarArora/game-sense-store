import { Navbar } from "../Navbar/Navbar";
import "./header.css";

export const Header = () => {
	return (
		<header className="header">
			<div>LOGO</div>
			<Navbar/>
			<div>
				<div>CART</div>
				<div>USER AVATAR</div>
			</div>
		</header>
	)
}