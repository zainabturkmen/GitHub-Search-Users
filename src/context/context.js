import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { User } from "../components";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider , Consumer

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // requst loading
  const [request, setRequest] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );
    console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      // repos
      await axios(`${rootUrl}/users/${login}/repos?per_page=100}`).then((response) =>
        setRepos(response.data)
      );
      // followers
      await axios(`${followers_url}?per_page=100}`).then((response) =>
        setFollowers(response.data)
      );

      await Promise.allSettled([])
      
    } else {
      toggleError(true, "there is no user with that username");
    }

    checkRequest();
    setIsLoading(false);
  };
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
          toggleError(true, "sorry you have exeeded your hourly rate limit!");
        }
      })
      .catch((error) => console.log(error));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  // error
  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        searchGithubUser,
        isloading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
