import { useEffect } from "react";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useAuth } from "../../contexts";
import "./userProfile.css";

export const UserProfile = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  const { isUserLoggedIn, logoutUser } = useAuth();

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="discover" />}
      <Header active="" />
      <div className="container-userProfile">
        Profile
        <br />
        {isUserLoggedIn && (
          <button onClick={() => logoutUser()}>Log out</button>
        )}
      </div>
    </div>
  );
};
