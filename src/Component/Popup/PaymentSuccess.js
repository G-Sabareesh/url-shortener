import React from "react";

const Payment = () => {
  return (
    <div
      className="position-absolute h-100 w-100 d-flex align-items-center justify-content-center rounded-2"
      style={{ zIndex: "999", backgroundColor: "#00000087" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column col-10 col-sm-6 col-md-5 col-lg-3 rounded-2 bg-white">
        <span className="w-100 text-center text-light  fs-5 fw-semibold py-2 fst-italic rounded-top bg-success">
          Payment Successfully Completed
        </span>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif"
            alt="priceImage"
            className="py-2"
            height={180}
          />
          <div className="fs-5 fw-semibold text-center ">
            Payment has been processed successfully.
          </div>
          <p className="fs-6 text-center" style={{ width: "80%" }}>
            <br />
            You can enjoy the free unlimited usage. Thanks for purchasing our
            premium plan.
            <br />
            <br />
            This page will automatically redirect to home page after few
            seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
