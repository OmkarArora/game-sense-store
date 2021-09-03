import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth, useAlert, useCart, useWishlist } from "../../contexts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./authPage.css";

export const Login = () => {
  const { cartDispatch } = useCart();
  const { wishlistDispatch } = useWishlist();

  const { state } = useLocation();

  const navigate = useNavigate();

  const { isUserLoggedIn, loginUserWithCredentials, appState } = useAuth();

  const { setSnackbar } = useAlert();

  useEffect(() => {
    if (isUserLoggedIn) {
      if (state && state.from) {
        navigate(state.from);
      } else navigate("/");
    }
  }, [isUserLoggedIn, navigate, state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const loginHandler = async (email, password) => {
    const msg = await loginUserWithCredentials(email, password);
    if (!msg.success) {
      setSnackbar({
        openStatus: true,
        type: "error",
        data: msg.errorMessage,
      });
    } else {
      const userId = msg.user.id;
      // fetch cart
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/cart`
          );
          if (data.success) {
            const fetchedCart = data.cart;
            const normalisedCart = fetchedCart.map((item) => ({
              ...item.product,
              quantity: item.quantity,
              id: item.product._id,
            }));
            cartDispatch({ type: "SET_CART", payload: normalisedCart });
          }
        } catch (error) {
          cartDispatch({ type: "SET_APP_STATE", payload: "error" });
        }
      })();

      //fetch wishlist
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/wishlist`
          );
          if (data.success) {
            const fetchedWishlist = data.wishlist;
            wishlistDispatch({
              type: "SET_WISHLIST",
              payload: fetchedWishlist,
            });
          } else {
            wishlistDispatch({ type: "SET_APP_STATE", payload: "error" });
          }
        } catch (error) {
          wishlistDispatch({ type: "SET_APP_STATE", payload: "error" });
        }
      })();

      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Signed in successfully",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginHandler(email, password);
  };

  const onSubmitWithTestCreds = e => {
    e.preventDefault();
    loginHandler("user@gmail.com", "abcd@1234");
  }

  return (
    <div className="container-authPage">
      <div className="container-form-login">
        <div className="auth-heading">Log In</div>
        <div className="auth-subheading">
          Not a member yet? <Link to="/signup">Sign Up</Link>
        </div>
        <form className="form-login" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label-password">
            <input
              className="input-password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="icon icon-eye"
              onClick={() => setPasswordVisibility((prev) => !prev)}
            >
              {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </label>

          <button type="submit" className="btn-submit">
            LOGIN
          </button>
        </form>
        <form className="form-login" onSubmit={onSubmitWithTestCreds}>
        <button type="submit" className="btn-submit secondary">
            Login with Test Credentials
          </button>
          </form>
      </div>
      {appState === "loading" && <LoadingModal />}
    </div>
  );
};
