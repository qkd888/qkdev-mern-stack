import React from "react";
import Crowd from "./crowd3.jpg"; // importing Crowd image
import GoogleIcon from "./googleIcon.png"; // importing GoogleIcon image
import GithubIcon from "./githubLoggin.jpg"; // importing GithubIcon image

export default function SignIn({
  email,
  password,
  handleChange,
  signIn,
  googleSignIn,
  githubSignIn,
}) {
  return (
    <div className="signIn">
      {/*Sign in heading */}
      <h1 className="signInHeading">Sign In</h1>
      {/*Sign in container */}
      <div className="signInContainer">
        {/*Sign in image */}
        <img src={Crowd} alt="o7 Arena crowd" className="signInImage" />
        {/*Sign in form */}
        <form>
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
          {/*Sign in button which invokes the signIn function when clicked */}
          <div>
            <button className="signInBtn" onClick={signIn}>
              Sign in
            </button>
          </div>
          <h5>OR</h5>
          {/*Google Sign in button which invokes the googleSignIn function when clicked */}
          <div>
            <button className="googleSignInBtn" onClick={googleSignIn}>
              <img
                src={GoogleIcon}
                alt="google"
                className="googleIcon"
                width={30}
                height={30}
              />
              <span>Sign In With Google</span>
            </button>
          </div>
          <h5>OR</h5>
          {/*Github Sign in button which invokes the githubSignIn function when clicked */}
          <div>
            <button className="githubSignInBtn" onClick={githubSignIn}>
              <img
                src={GithubIcon}
                alt="github"
                className="githubIcon"
                width={30}
                height={30}
              />
              <span>Sign In With Github</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
