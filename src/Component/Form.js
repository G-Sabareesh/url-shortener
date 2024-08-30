import React, { useContext, useState } from "react";
import UrlContext from "../DataContent/UrlContext";

const Form = () => {
  const { handleSubmit } = useContext(UrlContext);

  const [inputval, setInputval] = useState("");

  return (
    <div
      className="d-flex justify-content-center align-items-center col-10 col-lg-6 p-1"
      style={{ minHeight: "" }}
    >
      <div className="row col-12 d-flex justify-content-center align-items-center flex-wrap p-2 gap-3">
        <input
          type="text"
          className=" h-50 col-lg-8 col-md-6 col-sm-10 py-3 rounded-1 fw-normal fs-5"
          placeholder="Enter the URL here..."
          style={{ outline: "none", border: "none" }}
          value={inputval}
          onChange={(e) => {
            setInputval(e.target.value);
          }}
        ></input>
        <button
          className="h-50 col-lg-3 col-md-4 col-sm-10 text-center btn btn-primary p-2 py-3 fs-5 fw-semibold rounded-1"
          type="button"
          id="button-addon2"
          onClick={() => {
            setInputval("");
            handleSubmit(inputval);
          }}
        >
          Shorten URL
        </button>
      </div>
    </div>
  );
};

export default Form;
