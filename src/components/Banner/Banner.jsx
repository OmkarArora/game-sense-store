import ps5Image from "../../images/ps5-controller.png";
import "./banner.css";

export const Banner = () => {
	return (
		<div className="new-product">
			<img src={ps5Image} alt="ps5 controller"/>
			<div className="new-product-info">
				<div className="heading">Play Has No Limit</div>
				<small>Get the new PS5 now!</small>
			</div>
			<div className="circle1"></div>
    		<div className="circle2"></div>
		</div>
	)
}