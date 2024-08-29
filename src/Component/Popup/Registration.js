import React, { useContext } from "react";
import UrlContext from "../../DataContent/UrlContext";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Registration = () => {
  const { setRegistration } = useContext(UrlContext);
  return (
    <div
      className="position-absolute d-flex justify-content-center align-items-center col-12 h-100"
      style={{ backgroundColor: "#00000078" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column p-2 col-10 col-sm-6 col-md-5 col-lg-4 rounded-2 bg-light">
        <div className="d-flex justify-content-center align-items-center w-100 p-2">
          <span
            className="registration-close text-center ms-auto p-1 rounded-pill"
            onClick={() => setRegistration(false)}
          >
            <IoClose size={28} />
          </span>
        </div>
          <img
            src="https://img.icons8.com/?size=100&id=gw0hsLOeK_OO&format=png&color=000000"
            alt="Link"
          />
          <span className="mt-2 mb-2 fs-5 fw-semibold">Need more links?</span>
          <p className="text-center" style={{width:'80%'}}>Upgrade your account for more !!, Sign up for free now and unlock the features with out free plan</p>
          <p className="w-100 text-center">Login if you already have an account <br />or<br /> Click signup to join</p>
        <div className="d-flex align-item-center justify-content-evenly col-10 py-2">
          <Link
            to="/login"
            className="registration text-decoration-none fs-5 fw-semibold p-1 rounded"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="registration text-decoration-none fs-5 fw-semibold p-1 rounded"
          >
            Signup
          </Link>
        </div>

        {/* <div className="w-100 text-center" style={{fontSize:'13px', zIndex:'999'}}>*Please register to continue</div> */}
        {/* <div className="">Unnoda limit mudijathu register pannu</div> */}
      </div>
    </div>
  );
};

export default Registration;
