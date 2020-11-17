import React from "react";
import SignIn from "./AuthComponents/SignIn"; // importing the SignIn component
import SignUp from "./AuthComponents/SignUp"; // importing the SignUp component
import Landing from "./Landing"; // importing the Landing component
import Header from "./Header"; // importing the Header component
import { BrowserRouter, Switch, Route } from "react-router-dom"; // importing browserRouter, Switch and Route from react-router-dom

export default function Home({
  name,
  email,
  password,
  handleChange,
  signIn,
  googleSignIn,
  githubSignIn,
  signUp,
  role,
}) {
  return (
    <div>
      <BrowserRouter>
        {/*The Header component is outside of the switch
          and does not have a route, so this component appears
          on every page and it does not re-render */}
        <Header />
        {/*There are two route matching components: Switch and Route.
           When a <Switch> is rendered, it searches through its children
            <Route> elements to find one whose path matches the current URL.
             When it finds one, it renders that <Route> and ignores all others */}

        <Switch>
          {/*Route 1 - Routes to the Landing component */}
          <Route path="/" exact component={Landing} />
          {/*Route 2 - Routes to the SignUp component */}
          <Route
            path="/signup"
            exact
            render={() => (
              <SignUp
                name={name}
                email={email}
                role={role}
                password={password}
                handleChange={handleChange}
                signUp={signUp}
              />
            )}
          />
          {/*Route 3 - Routes to the SignIn component */}
          <Route
            path="/signin"
            exact
            render={() => (
              <SignIn
                email={email}
                password={password}
                handleChange={handleChange}
                signIn={signIn}
                googleSignIn={googleSignIn}
                githubSignIn={githubSignIn}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
