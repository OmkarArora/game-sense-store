import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-form-login">
      <h2>LOGIN</h2>
      <form className="form-login">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label-password">
        <input
          className="input-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="icon icon-eye">
          <AiFillEyeInvisible />
        </span>
        </label>
        

        <button
          className="btn-submit"
          onClick={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};
