import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { useId } from "react";
// import axios from "axios";

import { toast } from "react-toastify";

const UrlContext = createContext({});

export const UrlContextProvider = ({ children }) => {
  const [urlValue, setUrlValue] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const [toastid, setToastId] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setToastId(true);
    }, 4000);
  }, [toastid]);

  const [urlData, setUrlData] = useState([]);

  const backendUrl =
    "https://be8b-2401-4900-1ce3-c6fc-59a-4e6-2df0-29fb.ngrok-free.app/";

  function handleInput(e) {
    setUrlValue(e.target.value);
  }

  function handleSubmit() {
    const regExp =
      /^(https?:\/\/|www\.)[A-Za-z0-9]+(\.[A-Za-z0-9]+)*\.(com|in|org)\.[a-zA-Z]+$/;

    if (urlValue !== "") {
      if (regExp.test(urlValue) === true) {
        console.log(urlValue);
        setUrlValue("");
        postConnection();
      } else {
        if (toastid) {
          setToastId(false);
          toast.error("Invalid Url");
        }
      }
    } else {
      if (toastid) {
        setToastId(false);
        toast.info("Please enter the link");
      }
    }
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
        // console.log(data.data.csrfToken);
        setToken(data.data.csrfToken);
        // postConnection(data.data.csrfToken);
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
    // console.log(cookieValue);

    return cookieValue;
  }

  async function postConnection() {
    // console.log(getCookie("XSRF-TOKEN"));
    await fetch(`${backendUrl}addUrl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        user_id: userId,
        url_value: urlValue,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        storeResponseData(res);
      })
      .catch((err) => console.log(err));
  }

  // Manual Function generateUserID - storeResponseData(on submit) - storeUrl(store the url in state and localstorage) - getLocalData(get the localstorage url whole data once) -handleDelete

  function generateUserId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }
    setUserId(result);
    localStorage.setItem("url_shorten_user_id", result);
  }

  function storeResponseData(response) {
    // console.log(response);
    if (response.status === 200) {
      toast.success("Url Shorten Successfully ");
      const shortUrl = response.link;
      storeUrl(shortUrl);
    } else if (response.status === 400) {
      toast.error("Invalid Url");
    }
  }

  function storeUrl(shortUrl) {
    setUrlData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      {
        actualUrl: urlValue,
        shortenUrl: shortUrl,
      },
    ]);

    localStorage.setItem(
      userId,
      JSON.stringify([
        ...(Array.isArray(urlData) ? urlData : []),
        {
          actualUrl: urlValue,
          shortenUrl: shortUrl,
        },
      ])
    );
  }

  function getLocalData(id) {
    setUrlData(JSON.parse(localStorage.getItem(id)));
  }

  async function handleDelete(urlPara) {
    // console.log(urlPara);
    await fetch(`${backendUrl}deleteUrl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        url_value: urlPara,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          const filterUrl = urlData.filter(
            (item) => item.shortenUrl !== urlPara
          );
          setUrlData(filterUrl);
          localStorage.setItem(userId, JSON.stringify(filterUrl));
          toast.success("Url Removed Successfully");
        } else if (res.status === 400) {
          toast.warning("Url Not-Found");
        }
      })
      .catch((err) => console.log(err));
  }
  // useEffect initial once for server connection and get the user id localstorage
  useEffect(() => {
    const id = localStorage.getItem("url_shorten_user_id");
    if (id) {
      setUserId(id);
      getLocalData(id);
    } else {
      generateUserId();
    }
    serverConnection();
  }, []);

  return (
    <UrlContext.Provider
      value={{
        urlValue,
        handleInput,
        handleSubmit,
        handleDelete,
        urlData,
        backendUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContext;
