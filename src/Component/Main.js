import React, { useContext } from "react";
import Heading from "./Heading";
import Form from "./Form";
import List from "./List";

import "react-toastify/dist/ReactToastify.css";
import UrlContext from "../DataContent/UrlContext";
import { Link } from "react-router-dom";

const Main = () => {
  const { registration, setRegistration } = useContext(UrlContext);

  return (
    <div
      className="d-flex justify-content-center align-items-center rounded flex-column col-12"
      style={{ height: "100%" }}
    >
      <Heading />
      <Form />
      <List />
      {registration && (
        <div
          className="position-absolute d-flex justify-content-center align-items-center col-12 h-100"
          style={{ backgroundColor: "#00000078" }}
        >
          <div className="d-flex justify-content-center align-items-center flex-column p-2 col-sm-5 col-md-4 col-lg-3 rounded-2 bg-light">
            <div className="d-flex justify-content-around align-items-center w-100 border-bottom pb-2">
              <span className="text-center fs-5 fw-semibold">
                Registration Warning
              </span>
              <button
                type="button"
                className="btn-close"
                onClick={() => setRegistration(false)}
              ></button>
            </div>
            <div className="d-flex align-item-center justify-content-evenly col-10 py-5">
              <Link
                to="/login"
                className="registration text-decoration-none fs-5 fw-semibold p-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="registration text-decoration-none fs-5 fw-semibold p-2 rounded"
              >
                Signup
              </Link>
            </div>
            <div className="">Please register to continue</div>
            {/* <div className="">Unnoda limit mudijathu register pannu</div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
