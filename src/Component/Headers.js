import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Settings/Login";
import Signup from "./Settings/Signup";
import { IoSettings } from "react-icons/io5";
import UrlContext from "../DataContent/UrlContext";
import { FaUser, FaUserCheck } from "react-icons/fa";

const Headers = () => {
  const { account, handleLogout } = useContext(UrlContext);
  return (
    <nav
      className="d-flex align-items-center navbar col-12"
      style={{ backgroundColor: "rgba(108,117,125,0.31" }}
    >
      <div className="p-1 px-3">
        <a className="navbar-brand text-light rounded-2 p-2" href="/">
          URL Shortener
        </a>
      </div>
      <div className="d-flex align-items-center justify-content-center dropdown-center p-1">
        <span
          className="text-light dropdown-toggle px-3 text-center"
          type="button"
          data-bs-toggle="dropdown"
        >
          <IoSettings size={30} className="m-1" />
        </span>
        <ul className="dropdown-menu p-2 mt-1 me-1">  
          {account ? (
            <>
              <li className="border-bottom">
                <div className="dropdown-item-text fs-4 fw-normal text-success text-center d-flex align-items-center justify-content-between">
                  <span className="me-2">{account}</span>
                  <FaUserCheck />
                </div>
              </li>
              <li
                className="dropdown-item fs-5 fw-normal"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="border-bottom">
                <div className="dropdown-item-text fs-4 fw-normal text-primary text-center d-flex align-items-center justify-content-between">
                  <span className="">Guest</span>
                  <FaUser />
                </div>
              </li>
              <li>
                <Link
                  to="/login"
                  element={<Login />}
                  className="dropdown-item fs-5 fw-normal"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  element={<Signup />}
                  className="dropdown-item fs-5 fw-normal"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Headers;
