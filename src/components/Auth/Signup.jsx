import { useEffect, useState } from "react";
import { useAuth, useAlert } from "../../contexts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import "./authPage.css";

export const Signup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isUserLoggedIn, signupUser, appState } = useAuth();
  const { setSnackbar } = useAlert();

  useEffect(() => {
    if (isUserLoggedIn) {
      if (state && state.from) {
        navigate(state.from);
      } else navigate("/");
    }
  }, [isUserLoggedIn, navigate, state]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);

  const signupHandler = async () => {
    const msg = await signupUser(name, email, password);

    if (!msg.success) {
      if (msg.errorMessage.includes("duplicate key error")) {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: "Email already registered",
        });
      } else {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: msg.errorMessage,
        });
      }
    } else {
      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Registration successful",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) return signupHandler();
    setSnackbar({
      openStatus: true,
      type: "error",
      data: "Confirm password must match password",
    });
  };

  return (
    <div className="container-authPage">
      <div className="container-form-login">
        <div className="auth-heading">Sign Up</div>
        <div className="auth-subheading">
          Already a member? <Link to="/login">Log In</Link>
        </div>
        <form className="form-login" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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

          <label className="label-password">
            <input
              className="input-password"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="icon icon-eye"
              onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
            >
              {confirmPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </label>

          <button type="submit" className="btn-submit">
            SIGN UP
          </button>
        </form>
      </div>
      {appState === "loading" && <LoadingModal />}
    </div>
  );
};
