import React from "react";

const PaymentFailed = () => {
  return (
    <div
      className="position-absolute h-100 w-100 d-flex align-items-center justify-content-center rounded-2"
      style={{ zIndex: "999", backgroundColor: "#00000087" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column col-10 col-sm-6 col-md-5 col-lg-3 rounded-2 bg-white">
        <span
          className="w-100 text-center text-light  fs-5 fw-semibold py-2 fst-italic rounded-top bg-danger"
        >
          Payment Failed
        </span>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src="https://img.icons8.com/?size=100&id=fYgQxDaH069W&format=png&color=000000"
            alt="priceImage"
            className="py-2"
            height={150}
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
