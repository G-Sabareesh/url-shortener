import { createContext, useEffect, useState } from "react";
import { useId } from "react";
import axios from "axios";

const UrlContext = createContext({});

export const UrlContextProvider = ({ children }) => {
  const [urlValue, setUrlValue] = useState("");
  const [urlShortenId, setUrlShortenId] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const randomId = useId();

  const urlBackend =
    "https://da10-2401-4900-1ce3-c6fc-83b-96-c684-efed.ngrok-free.app/";
  //   console.log(randomId);

  function handleInput(e) {
    setUrlValue(e.target.value);
  }

  function handleSubmit() {
    console.log(urlValue);
    setUrlValue("");
    callBackEnd();
    // fetchdata();
  }

  async function callBackEnd() {
    console.log(csrfToken);
    try {
      console.log(csrfToken);
      const response = await axios.post(
        `${urlBackend}addUrl`,
        {
          urllink: urlValue,
          user_id: urlShortenId,
          // _token: csrfToken,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

            // "ngrok-skip-browser-warning": "1234",
            // Authorization: `Bearer ${csrfToken}`, // Include the token here
            // "X-CSRF-TOKEN": csrfToken,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(csrfToken);
      console.error("Error:", error);
    }
  }
  // Function to get the value of the XSRF-TOKEN cookie
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      console.log(cookies);
      const [key, value] = cookie.trim().split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  async function fetchdata() {
    await axios
      .get(`${urlBackend}getcsrf`, {
        headers: {
          "ngrok-skip-browser-warning": 1234,
        },
      })
      .then((res) => {
        console.log(res);
        // setCsrfToken(res.csrfToken);
        // callBackEnd();
        function getCookie(name) {
          // Construct a regular expression to find the cookie
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // Example usage
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // const id = localStorage.getItem("urlShortenId");
    // if (id) {
    //   setUrlShortenId(id);
    // } else {
    //   setUrlShortenId(randomId);
    //   // localStorage.setItem('urlShortenId', urlShortenId)
    // }
    fetchdata();
  }, []);

  return (
    <UrlContext.Provider
      value={{
        csrfToken,
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
