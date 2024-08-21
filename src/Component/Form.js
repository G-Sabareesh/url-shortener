import React, { useContext } from "react";
import UrlContext from "../DataContent/UrlContext";

const Form = () => {
  const { urlValue, handleInput, handleSubmit } = useContext(UrlContext);

  return (
    <div
      className="d-flex justify-content-center align-items-center col-11 p-3"
      style={{ minHeight: "" }}
    >
      <div className="row col-11 d-flex justify-content-center align-items-center flex-wrap p-2 gap-3">
        <input
          type="text"
          className=" h-50 col-lg-6 col-md-6 col-sm-10 py-2 px-4 rounded fw-semibold fs-5"
          placeholder="Enter the URL here..."
          style={{ outline: "none", border: "none" }}
          value={urlValue}
          onChange={handleInput}
        ></input>
        <button
          className="h-50 col-lg-2 col-md-4 col-sm-10 text-center btn btn-primary btn-lg p-2 fs-5 fw-semibold rounded"
          type="button"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Shorten URL
        </button>
      </div>
    </div>
  );
};

export default Form;
