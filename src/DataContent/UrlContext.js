import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useId } from "react";
// import axios from "axios";

import { toast } from "react-toastify";

const UrlContext = createContext({});

export const UrlContextProvider = ({ children }) => {
  const [urlValue, setUrlValue] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [account, setAccount] = useState(null);

  const [error, setError] = useState();

  const [registration, setRegistration] = useState(false);

  const nav = useNavigate();

  const [toastid, setToastId] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setToastId(true);
    }, 4000);
  }, [toastid]);

  const [urlData, setUrlData] = useState([]);

  const backendUrl =
    "https://6dad-2401-4900-1ce1-9515-e88a-ddb8-dc5b-4171.ngrok-free.app/";

  function handleInput(e) {
    setUrlValue(e.target.value);
  }

  function handleSubmit() {
    const regExp =
      /^(https?:\/\/|www\.)[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*\.(com|in|org|ngrok-free.app)/;

    if (urlValue !== "") {
      if (regExp.test(urlValue)) {
        // console.log(urlValue);
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

  function handleLogin(email, password) {
    // console.log("ce", email, password);
    if (email === "" || password === "") {
      if (toastid) {
        setToastId(false);
        toast.error("Please fill the fields");
        setError(null);
      }
    } else {
      registerLogin(email, password);
    }
  }

  function handleSignup(name, email, password) {
    if ((name === "") | (email === "") || password === "") {
      if (toastid) {
        setToastId(false);
        toast.error("Please fill the fields");
        setError(null);
      }
    } else {
      registerSignup(name, email, password);
    }
  }

  async function handleLogout() {
    await fetch(`${backendUrl}user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (toastid) {
            setToastId(false);
            toast.success("Logout Successfully");
          }
          setAccount(null);
          localStorage.removeItem("url_shorten_user_name");
        } else if (res.status === 500) {
          setError(res.message);
          if (toastid) {
            setToastId(false);
            toast.error("Logout Failed");
          }
        }
      })
      .catch((err) => console.log(err));
  }
  async function registerLogin(email, password) {
    // console.log(email, password);
    await fetch(`${backendUrl}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        email: email,
        password: password,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (toastid) {
            setToastId(false);
            toast.success("Login Successfully");
          }
          setAccount(res.username);
          setError(null);
          localStorage.setItem("url_shorten_user_name", res.username);
          localStorage.setItem("url_shorten_user_id", res.userid);
          getUrlstoredData();
          nav("/");
        } else if (res.status === 400) {
          setError(res.message);
          if (toastid) {
            setToastId(false);
            toast.error("Invalid Input");
          }
        } else if (res.status === 401) {
          if (toastid) {
            setToastId(false);
            toast.error("Invalid Email or Password");
          }
        }
      })
      .catch((err) => console.log(err));
  }

  async function getUrlstoredData() {
    await fetch(`${backendUrl}user/getUrlData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        user_id: userId,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUrlData(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function registerSignup(name, email, password) {
    await fetch(`${backendUrl}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        user_id: userId,
        name: name,
        email: email,
        password: password,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.message);
        if (res.status === 200) {
          if (toastid) {
            setToastId(false);
            toast.success("Account Created Successfully");
          }
          setAccount(name);
          localStorage.setItem("url_shorten_user_name", res.username);
          localStorage.setItem("url_shorten_user_id", res.userid);
          setError(null);
          nav("/");
        } else if (res.status === 400) {
          if (toastid) {
            setToastId(false);
            toast.warning("Email already registered..");
          }
        } else if (res.status === 401) {
          setError(res.message);
          if (toastid) {
            setToastId(false);
            toast.error("Invalid Input");
          }
        }
      })
      .catch((err) => console.log(err));
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
    // setRegistration(true);
  }

  // Manual Function generateUserID - storeResponseData(on submit) - storeUrl(store the url in state and localstorage) - getLocalData(get the localstorage url whole data once) -handleDelete

  function generateUserId() {
    const characters = "0123456789";
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
    } else if (response.status === 202) {
      console.log("login needed");
      setRegistration(true);
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

  async function createGestuser() {
    console.log(token);
    await fetch(`${backendUrl}user/guestcreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        user_id: localStorage.getItem("url_shorten_user_id"),
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          getUrlstoredData();
          nav("/");
        }
      })
      .catch((err) => console.log(err));
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
    serverConnection();
    const id = localStorage.getItem("url_shorten_user_id");
    if (id) {
      setAccount(localStorage.getItem("url_shorten_user_name"));
      setUserId(id);
      getLocalData(id);
    } else {
      generateUserId();
    }
  }, []);

  useEffect(() => {
    token !== "" && createGestuser();
  }, [token]);

  return (
    <UrlContext.Provider
      value={{
        account,
        error,
        setError,
        urlValue,
        handleInput,
        handleSubmit,
        handleDelete,
        handleLogin,
        handleSignup,
        handleLogout,
        urlData,
        backendUrl,
        registration,
        setRegistration,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContext;
