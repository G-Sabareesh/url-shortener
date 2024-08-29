import React from "react";

const PaymentFailed = () => {
  return (
    <div
      className="position-absolute h-100 w-100 d-flex align-items-center justify-content-center rounded-2"
      style={{ zIndex: "999", backgroundColor: "#00000087" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column col-10 col-sm-6 col-md-5 col-lg-3 rounded-2 bg-white">
        <span
          className="w-100 text-center text-light  fs-5 fw-semibold py-2 fst-italic rounded-top"
          style={{ backgroundColor: "rgb(255 125 129)" }}
        >
          Payment Failed
        </span>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            alt="priceImage"
            className="py-2"
            height={180}
          />
          <div className="fs-5 fw-semibold text-center ">
            Payment hasn't been processed successfully.
          </div>
          <p className="fs-6 text-center" style={{ width: "80%" }}>
            <br />
            Sorry for the failed transaction .Please try again after some time.
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

export default PaymentFailed;
