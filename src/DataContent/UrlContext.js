import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { useId } from "react";
// import axios from "axios";

const UrlContext = createContext({});

export const UrlContextProvider = ({ children }) => {
  const [urlValue, setUrlValue] = useState("");
  const [userId, setUserId] = useState("");

  const backendUrl =
    "https://be8b-2401-4900-1ce3-c6fc-59a-4e6-2df0-29fb.ngrok-free.app/";

  function handleInput(e) {
    setUrlValue(e.target.value);
  }

  function handleSubmit() {
    if (urlValue !== "") {
      console.log(urlValue);
      setUrlValue("");
    } else {
      console.log("Please enter the link");
    }
    serverConnection();
  }

  async function serverConnection() {
    await axios
      .get(`${backendUrl}getcsrf`, {
        headers: {
          "ngrok-skip-browser-warning": "1234",
        },
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data.csrfToken);
        postConnection(data.data.csrfToken);
      })
      .catch((error) => console.log(error));
  }

  function getCookie(name) {
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      var cookieValue;
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    console.log(cookieValue);

    return cookieValue;
  }

  async function postConnection(value) {
    console.log(getCookie("XSRF-TOKEN"));
    console.log(value);
    await fetch(`${backendUrl}addUrl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({ _token: value, user_id: userId }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setUserId("abc123");
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
