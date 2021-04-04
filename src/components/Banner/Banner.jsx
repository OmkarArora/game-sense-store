import ps5Image from "../../images/ps5-controller.png";
import "./banner.css";

export const Banner = () => {
	return (
		<div className="banner">
			<img src={ps5Image} alt="ps5 controller"/>
			<div className="container-banner-info">
				<div className="heading">Play Has No Limit</div>
				<small>Get the new PS5 now!</small>
			</div>
			<div class="circle1"></div>
    		<div class="circle2"></div>
		</div>
	)
}