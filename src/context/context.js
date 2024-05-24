import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider , Consumer

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // requst loading
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);
  // error
  const []
  // check rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          // throw an error
        }
      })
      .catch((error) => console.log(error));
  };
  // error
  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
