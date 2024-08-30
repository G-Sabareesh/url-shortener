import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loadStripe } from "@stripe/stripe-js";
// import PriceCard from "../Component/PriceCard";

const UrlContext = createContext({});

export const UrlContextProvider = ({ children }) => {
  const [urlValue, setUrlValue] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userStatus, setUserStatus] = useState(2);

  const [paymentStatus, setPaymentStatus] = useState(false);

  const [error, setError] = useState();

  const [registration, setRegistration] = useState(false);

  const nav = useNavigate();

  const [toastid, setToastId] = useState(true);

  useEffect(() => {
    // console.log("useeffect 1");

    setTimeout(() => {
      setToastId(true);
    }, 4000);
  }, [toastid]);

  const [urlData, setUrlData] = useState([]);

  const backendUrl =
    "https://69b5-2401-4900-1ce0-6f99-6de1-d2d5-8b90-a509.ngrok-free.app/";

  // console.log("running");

  function handleSubmit(urlval) {
    // console.log("function 2");

    const regExp =
      /^(https?:\/\/|www\.)[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*\.(com|in|org|ngrok-free.app)/;

    const urlReg = /^(https?:\/\/url\.io|url\.io)*\.(com)/;

    if (urlval !== "") {
      if (regExp.test(urlval)) {
        if (urlReg.test(urlval)) {
          if (toastid) {
            setToastId(false);
            toast.error("This is shortened url");
          }
        } else {
          // console.log(urlValue);
          setUrlValue(urlval);
          postConnection(urlval);
        }
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
    // console.log("function 3");

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
    // console.log("function 4");

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
    // console.log("function 5");

    setLoading(true);
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
        // console.log(res);
        if (res.status === 200) {
          setLoading(false);
          if (toastid) {
            setToastId(false);
            toast.success("Logout Successfully");
          }
          setAccount(null);
          localStorage.removeItem("url_shorten_user_name");
          localStorage.removeItem("url_shorten_user_status");
          localStorage.removeItem("url_shortener_user_id");
          setUrlData([]);
        } else if (res.status === 500) {
          setLoading(false);
          setError(res.message);
          if (toastid) {
            setToastId(false);
            toast.error("Logout Failed");
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  }
  async function registerLogin(email, password) {
    // console.log("function 6");

    // console.log(email, password);
    // console.log("login");
    setLoading(true);
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
        // console.log(res);
        if (res.status === 200) {
          setLoading(false);
          if (toastid) {
            setToastId(false);
            toast.success("Login Successfully");
          }
          setAccount(res.username);
          setUserId(res.userid);
          setError(null);
          setUserStatus(res.userstatus);
          localStorage.setItem("url_shorten_user_name", res.username);
          localStorage.setItem("url_shorten_user_status", res.userstatus);
          localStorage.setItem("url_shortener_user_id", res.userid);
          getUrlstoredData();
          nav("/");
        } else if (res.status === 400) {
          setLoading(false);
          setError(res.message);
          if (toastid) {
            setToastId(false);
            toast.error("Invalid Input");
          }
        } else if (res.status === 401) {
          setLoading(false);
          if (toastid) {
            setToastId(false);
            toast.error("Invalid Email or Password");
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  }

  async function getUrlstoredData() {
    // console.log("function 7");
    setLoading(true);
    await fetch(`${backendUrl}user/getUrlData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        user_id: localStorage.getItem("url_shortener_user_id"),
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        // console.log("urlStored", res);
        setUrlData(res.data);
        // console.log(urlData);
      })
      .catch((err) => console.log(err));
  }

  async function registerSignup(name, email, password) {
    // console.log("function 8");

    setLoading(true);
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
          setLoading(false);
          if (toastid) {
            setToastId(false);
            toast.success("Account Created Successfully");
          }
          setAccount(name);
          setUserStatus(res.userstatus);
          setUserId(res.userid);
          localStorage.setItem("url_shorten_user_name", res.username);
          localStorage.setItem("url_shorten_user_status", res.userstatus);
          localStorage.setItem("url_shortener_user_id", res.userid);
          setError(null);
          nav("/");
        } else if (res.status === 400) {
          setLoading(false);
          if (toastid) {
            setToastId(false);
            toast.warning("Email already registered..");
          }
        } else if (res.status === 401) {
          setLoading(false);
          setError(res.message);
          if (toastid) {
            setToastId(false);
            toast.error("Invalid Input");
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  async function serverConnection() {
    // console.log("function 9");

    setLoading(true);
    await axios
      .get(`${backendUrl}getcsrf`, {
        headers: {
          "ngrok-skip-browser-warning": "1234",
        },
        withCredentials: true,
      })
      .then((data) => {
        setLoading(false);
        // console.log(data.data.csrfToken);
        setToken(data.data.csrfToken);
        if (toastid) {
          setToastId(false);
          toast.success("Please wait we fetch your data");
        }
        // postConnection(data.data.csrfToken);
      })
      .catch((error) => {
        setLoading(false);
        if (toastid) {
          setToastId(false);
          toast.error(error.message);
        }
        console.log(error);
      });
  }

  function getCookie(name) {
    // console.log("function 10");

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

  async function postConnection(urlval) {
    // console.log("function 11");

    // console.log(getCookie("XSRF-TOKEN"));
    setLoading(true);
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
        url_value: urlval,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setLoading(false);
        storeResponseData(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // setRegistration(true);
  }

  // Manual Function generateUserID - storeResponseData(on submit) - storeUrl(store the url in state and localstorage) - getLocalData(get the localstorage url whole data once) -handleDelete

  function generateUserId() {
    // console.log("function 12");

    const characters = "0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }
    setUserId(result);
    localStorage.setItem("url_shortener_user_id", result);
  }

  function storeResponseData(response) {
    // console.log("function 13");

    // console.log(response);
    if (response.status === 200) {
      toast.success("Url Shorten Successfully ");
      const shortUrl = response.link;
      storeUrl(shortUrl);
    } else if (response.status === 400) {
      toast.error("Invalid Url");
    } else if (response.status === 202) {
      // console.log("login needed");
      setRegistration(true);
    } else if (response.status === 203) {
      // navigate("/upgrade");
      // console.log("sdfsdaf");
      setPaymentStatus(true);
    } else if (response.status === 409) {
      if (toastid) {
        setToastId(false);
        toast.warning(response.message);
      }
    }
  }

  function storeUrl(shortUrl) {
    // console.log("function 14");

    // console.log("function 2 lin3 357");
    setUrlData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      {
        actualurl: shortUrl.actualurl,
        shortenedurl: shortUrl.shortenedurl,
      },
    ]);

    // localStorage.setItem(
    //   userId,
    //   JSON.stringify([
    //     ...(Array.isArray(urlData) ? urlData : []),
    //     {
    //       actualUrl: urlValue,
    //       shortenUrl: shortUrl,
    //     },
    //   ])
    // );
  }

  async function createGestuser() {
    // console.log("function 15");

    // console.log(token);
    await fetch(`${backendUrl}user/guestcreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        user_id: localStorage.getItem("url_shortener_user_id"),
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          getUrlstoredData();
          // nav("/");
        }
      })
      .catch((err) => console.log(err));
  }

  async function handleDelete(urlPara) {
    // console.log("function 16");

    // console.log("function 3 line 405");
    // console.log(urlPara);
    setLoading(true);
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
        setLoading(false);
        if (res.status === 200) {
          const filterUrl = urlData.filter(
            (item) => item.shortenedurl !== urlPara
          );
          setUrlData(filterUrl);
          // console.log(filterUrl);
          // localStorage.setItem(userId, JSON.stringify(filterUrl));
          toast.success("Url Removed Successfully");
        } else if (res.status === 400) {
          toast.warning("Url Not-Found");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  async function handlePayment() {
    // console.log("function 17");
    setLoading(true);

    const stripe = await loadStripe(
      "pk_test_51PsH3a00rtFTtfAP8UxG9Flee1EummlEkhPxHPbG8l3NdauxhIV2yoqDSEuxXdscuKlvV4HBBGP8smI3PQMf71cF00EQSbAJMp"
    );

    // Send product info to Laravel backend
    const data = await fetch(`${backendUrl}payment/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",

      body: JSON.stringify({
        _token: token,
        product_name: "upgrade",
        product_price: 10,
        quantity: 1,
      }), // Send CSRF token in the body
    })
      .then((res) => res.json())
      .then((res) => res);

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
    setLoading(false);
  }
  // useEffect initial once for server connection and get the user id localstorage
  useEffect(() => {
    // console.log("useeffect 2");
    serverConnection();
    const id = localStorage.getItem("url_shortener_user_id");
    if (id) {
      setAccount(localStorage.getItem("url_shorten_user_name"));
      setUserStatus(localStorage.getItem("url_shorten_user_status"));
      setUserId(id);
      // getLocalData(id);
      token !== "" && getUrlstoredData();
      // console.log(urlData);
    } else {
      generateUserId();
    }
  }, []);

  useEffect(() => {
    // console.log("useeffect 3");

    const item = localStorage.getItem("url_shortener_user_id");
    // console.log("userid from localstorage", item);
    if (token !== "" && item !== null) {
      createGestuser();
      // console.log("gestusercalled");
    }
  }, [token]);

  return (
    <UrlContext.Provider
      value={{
        userStatus,
        setUserStatus,
        loading,
        account,
        error,
        setError,
        urlValue,
        handleSubmit,
        handleDelete,
        handleLogin,
        handleSignup,
        handleLogout,
        handlePayment,
        urlData,
        backendUrl,
        registration,
        paymentStatus,
        setPaymentStatus,
        setRegistration,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContext;
