import React, { useContext } from "react";
import UrlContext from "../../DataContent/UrlContext";
import { IoClose } from "react-icons/io5";

const PriceCard = () => {
  const { handlePayment, setPaymentStatus } = useContext(UrlContext);
  return (
    <div
      className="position-absolute h-100 w-100 d-flex align-items-center justify-content-center rounded-2"
      style={{ zIndex: "999", backgroundColor: "#00000087" }}
    >
      <div
        className="d-flex justify-content-center align-items-center flex-column col-10 col-sm-6 col-md-5 col-lg-3 rounded-2 "
        style={{ backgroundColor: "whitesmoke" }}
      >
        <span className="w-100 text-center text-light  fs-5 fw-semibold py-2 fst-italic rounded-top bg-primary">
          Upgrade to Premium
        </span>
        <span
          className="registration-close text-center ms-auto p-1 rounded-pill"
          onClick={() => setPaymentStatus(false)}
        >
          <IoClose size={28} />
        </span>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src="https://img.icons8.com/?size=100&id=ew81NKafyyga&format=png&color=000000"
            alt="priceImage"
            className="py-1"
          />
          <div className="fs-1 fw-semibold">$10</div>
          <p className="fs-6 text-center" style={{ width: "80%" }}>
            You can short more than 10 urls. <br />
            The url are saved so you can easily access anytime, after login with
            your account.
          </p>
          <div className="card-footer d-flex align-items-center justify-content-center w-100 py-2">
            <button
              className="btn btn-primary text-center fs-5 fw-normal"
              onClick={handlePayment}
            >
              <img
                src="https://img.icons8.com/?size=100&id=22187&format=png&color=000000"
                alt="card"
                height={30}
                className="mx-2"
              />
              upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
