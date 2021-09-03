import "./orderCard.css";

export const OrderCard = ({
  amount,
  fulfilmentDate,
  gateway,
  orderId,
  paymentId,
  products,
}) => {

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const convertToTwoDigits = (num) => {
	if(num<10) return "0"+num;
	return num;
  }

  const getDateString = (date) => {
    let dateObj = new Date(date);
    return `${convertToTwoDigits(dateObj.getDate())} ${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
  };

  return (
    <div className="card-order">
      <div className="header-order">
        <div className="order-details">
          <div>
            <div className="key">ORDER PLACED</div>
            <div className="value">{getDateString(fulfilmentDate)}</div>
          </div>
          <div>
            <div className="key">TOTAL</div>
            <div className="value">₹ {amount/100}</div>
          </div>
        </div>
        <div className="order-details">
          <div>
            <div className="key">ORDER #{orderId}</div>
          </div>
        </div>
      </div>
      <div className="order-titles">
		{products.map(({productId: product}) => (
			<div className="order-product-card">
				<img src={product.coverImage} alt={product.name}/>
				<div>{product.name}</div>
				<div>{product.currency.symbol} {product.price}</div>
			</div>
		))}
      </div>
    </div>
  );
};
