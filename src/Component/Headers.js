import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Settings/Login";
import Signup from "./Settings/Signup";
import UrlContext from "../DataContent/UrlContext";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Headers = () => {
  const { account, handleLogout, userStatus } = useContext(UrlContext);
  // console.log(userStatus);
  return (
    <nav
      className="d-flex sticky-top align-items-center navbar col-12 position-s"
      style={{
        backgroundColor: "rgba(44,68,90,1)",
      }}
    >
      <div className="d-flex justify-content-center align-items-center px-2 px-lg-4">
        <Link
          to="/"
          className="d-flex justify-content-center aling-items-center py-2 text-decoration-none"
        >
          <img
            src="https://img.icons8.com/?size=100&id=EvhyZpKOoV4z&format=png&color=000000"
            alt="logo"
            height={35}
          />
          <span className="fs-4 fw-bold fst-italic text-light px-2">
            Url Shortener
          </span>
        </Link>
      </div>
      <div className="d-flex align-items-center justify-content-center dropdown-center px-2 ms-auto">
        <span
          className="d-flex justify-content-center align-items-center text-light fs-4 fw-semibold fst-italic dropdown-toggle px-3 text-center"
          data-bs-toggle="dropdown"
          style={{ cursor: "pointer" }}
        >
          <span className="px-2">{account ? account : "Guest"}</span>
        </span>
        <ul className="dropdown-menu dropdown-center mt-3 me-1 p-1 rounded-1">
          {account ? (
            <>
              <li
                className="dropdown-hover dropdown-item fs-5 fw-semibold text-primary rounded-1"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </li>
              {userStatus == 3 && (
                <li className="fs-5 fw-semibold fst-italic text-primary rounded-1 text-primary border-top p-2 d-flex align-items-center justify-content-center">
                  Premium{" "}
                  <MdOutlineWorkspacePremium
                    className="text-primary"
                    size={30}
                  />
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  element={<Login />}
                  className="dropdown-hover dropdown-item fs-5 fw-semibold text-primary rounded-1"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  element={<Signup />}
                  className="dropdown-hover dropdown-item fs-5 fw-semibold text-primary rounded-1"
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
