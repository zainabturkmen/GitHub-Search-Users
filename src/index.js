import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

// Domain
// dev-vcvthrxqytyqubqb.us.auth0.com
// Client ID
// ae5FnVXdajsp94Renhw5zWP2F8M1gUMr

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-nu7dw41b206jfhjn.us.auth0.com"
      clientId="SWgh1qPVTybLFbhd6TWPvIVwugh7du3y"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
