import React from "react";
import { Link, withRouter } from "react-router-dom"; // Importing Link and withRouter

function Header(props) {
  //This function allows for the selected menu item to not appear on the menu
  //after being clicked
  const isActive = (path) => {
    if (props.history.location.pathname === path) {
      return { display: "none" };
    }
  };

  return (
    <div className="header">
      {/*logo */}
      <h3 className="logo">o7 Arena</h3>

      {/*The menu */}
      <ul className="menuList">
        {/*Menu item linking to the landing component */}
        <li className="leftMenuItem" style={isActive("/")}>
          <Link to="/">Home</Link>
        </li>
        {/*Menu item linking to the SignUp component */}
        <li className="leftMenuItem" style={isActive("/signup")}>
          <Link to="/signup">Sign Up</Link>
        </li>
        {/*Menu item linking to the SignIn component */}
        <li style={isActive("/signin")}>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Header);
