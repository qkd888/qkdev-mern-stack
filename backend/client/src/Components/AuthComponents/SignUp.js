import React from "react";
import ArenaRoof from "./arenaRoof.jpg"; // importing ArenaRoof image

export default function SignUp({
  name,
  email,
  password,
  handleChange,
  signUp,
}) {
  return (
    <div className="signUp">
      {/*Sign Up heading */}
      <h1 className="signUpHeading">Sign Up </h1>
      {/*Sign up container */}
      <div className="signUpContainer">
        {/*Sign up image */}
        <img src={ArenaRoof} alt="o7 Arena roof" />
        {/*Sign up form */}
        <form>
          {/*Name input */}
          <div className="credentials">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
          </div>
          {/*Email input */}
          <div className="credentials">
            <input
              type="text"
              name="email"
              placeholder=" Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          {/*Password input */}
          <div className="credentials">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {/*Sign up button which invokes the signUp function when clicked */}
          <button className="signUpBtn" onClick={signUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
