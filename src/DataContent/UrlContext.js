import { createContext, useEffect, useState } from "react";
import { useId } from "react";

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
  }

  async function callBackEnd() {
    console.log(csrfToken);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1234",
        // "XSRF-TOKEN": csrfToken,
        "X-CSRF-TOKEN": csrfToken,
        // _token: csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        urllink: urlValue,
        user_id: urlShortenId,
        // "XSRF-TOKEN": csrfToken,
        // "X-CSRF-TOKEN": csrfToken,
        // _token: csrfToken,
      }),
    };
    await fetch(`${urlBackend}addUrl`, options).then((response) => {
      console.log(response);
    });
  }

  async function fetchdata() {
    await fetch(`${urlBackend}getcsrf`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "any value",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setCsrfToken(res.csrfToken);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const id = localStorage.getItem("urlShortenId");
    if (id) {
      setUrlShortenId(id);
    } else {
      setUrlShortenId(randomId);
      // localStorage.setItem('urlShortenId', urlShortenId)
    }
    fetchdata();
  }, []);

  return (
    <UrlContext.Provider
      value={{
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
