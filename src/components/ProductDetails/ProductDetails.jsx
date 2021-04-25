import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useParams, useLocation } from "react-router-dom";
import { useWindowSize } from "../../hooks";
import { useNavPhone } from "../../contexts";
import "./productDetails.css";

export const ProductDetails = () => {
  const { productId } = useParams();
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible } = useNavPhone();
  const { state } = useLocation();
  const { item } = state;
  console.log({ state });
  return (
    <div className="container-app container-product-details">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="" />}
      <Header active="" />
      <div className="page-heading">Product Details</div>
      Product Id: {productId}
      <main className="main-product-details">
        <div className="container-img">
          <img src={item.coverImage} className="img-big" alt={item.name} />
        </div>
        <div className="product-details">
          <div className="card-details">
            <div>{item.name}</div>
            <div>
              {item.currency.symbol} {item.price}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
