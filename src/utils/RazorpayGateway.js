import axios from "axios";

export const displayRazorpay = async (
  products,
  userId,
  fulfilOrder,
  setCheckoutLoading,
  onPaymentError
) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND}/payments/razorpay`,
    {
      products,
    }
  );

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    currency: data.currency,
    amount: data.amount,
    name: "Game Sense",
    description: "Wallet Transaction",
    image: `${process.env.REACT_APP_BACKEND}/logo.png`,
    order_id: data.id,
    prefill: {
      name: "Tanjiro Kamado",
      contact: "+919999999999",
      email: "tanjiro@example.com",
      method: "card",
      "card[name]": "Tanjiro Kamado",
      "card[number]": "4111111111111111",
      "card[expiry]": "12/31",
      "card[cvv]": "123",
    },
    modal: {
      ondismiss: function () {
        setCheckoutLoading(false);
      },
    },
    handler: async function (response) {
      try {
        const { data: successData } = await axios.post(
          `${process.env.REACT_APP_BACKEND}/users/${userId}/orders`,
          {
            products,
            amount: data.amount,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            gateway: "razorpay",
          }
        );
        fulfilOrder(successData.orders);
      } catch (error) {
        onPaymentError(error);
      }
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
