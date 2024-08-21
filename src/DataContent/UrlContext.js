import { createContext, useEffect, useState } from "react";
// import { useId } from "react";
// import axios from "axios";

const UrlContext = createContext({});

export const UrlContextProvider = ({ children }) => {
  const [urlValue, setUrlValue] = useState("");
  // const [urlShortenId, setUrlShortenId] = useState("");
  // const [csrfToken, setCsrfToken] = useState("");

  // const urlBackend = "";

  function handleInput(e) {
    setUrlValue(e.target.value);
  }

  function handleSubmit() {
    console.log(urlValue);
    setUrlValue("");
    // fetchdata();
  }

  useEffect(() => {
    // const id = localStorage.getItem("urlShortenId");
    // if (id) {
    //   setUrlShortenId(id);
    // } else {
    //   setUrlShortenId(randomId);
    //   // localStorage.setItem('urlShortenId', urlShortenId)
    // }
  }, []);

  return (
    <UrlContext.Provider
      value={{
        // csrfToken,
        urlValue,
        handleInput,
        handleSubmit,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContext;
