import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./login.css";

export const Login = ({ loginHandler }) => {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("abcd@1234");
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    loginHandler(email, password);
  };

  return (
    <div className="container-form-login">
      <h2>LOGIN</h2>
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
    </div>
  );
};
