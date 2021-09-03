import axios from "axios";

export const displayRazorpay = async (
  products,
  userId,
  fulfilOrder,
  setCheckoutLoading
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
    modal: {
      ondismiss: function () {
        setCheckoutLoading(false);
      },
    },
    handler: async function (response) {
      try {
        const {data: successData} = await axios.post(
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
        console.error(error);
      }
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
