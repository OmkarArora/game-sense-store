import { Navbar } from "../Navbar/Navbar";
import "./header.css";

export const Header = () => {
	return (
		<header className="header">
			<div className="container-logo">LOGO</div>
			<Navbar/>
			<div className="container-user-details">
				<div>CART</div>
				<div>USER AVATAR</div>
			</div>
		</header>
	)
}