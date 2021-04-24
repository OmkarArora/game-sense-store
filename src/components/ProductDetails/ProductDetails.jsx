import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../../hooks";
import {useNavPhone } from "../../contexts";
import "./productDetails.css";

export const ProductDetails = () => {
	const { productId } = useParams();
	const screenWidth = useWindowSize().width;
	const { navPhoneVisible } = useNavPhone();
	return (
		<div className="container-app">
			{screenWidth < 768 && navPhoneVisible && <NavPhone active="" />}
			<Header active="" />
			<div className="page-heading">Product Details</div>
			Product Id: {productId}
		</div>
	)
}