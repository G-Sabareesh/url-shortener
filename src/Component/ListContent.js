import React from "react";

const ListContent = () => {
  return (
    <div
      className=" col-11 bg-light d-flex justify-content-center align-items-center border  rounded position-relative"
      style={{ height: "20%" }}
    >
      <div className="d-flex h-100 col-lg-11 col-md-11 col-12">
        <div className="d-flex justify-content-center align-items-center  col-6 h-100 bg-primary">
          Actual URL
        </div>
        <div className="d-flex justify-content-center align-items-center text-center col-3 h-100 bg-danger">
          Shorten URL
        </div>
        <div className="d-flex justify-content-evenly align-items-center text-center col-3 h-100 bg-info flex-wrap">
          <div className="col-6 h-100 bg-warning d-flex justify-content-center align-items-center">
            QR Code
          </div>
          <div className="col-6 h-100 bg-white d-flex justify-content-center align-items-center">
            Copy
          </div>
        </div>
      </div>
      <div
        className=" close d-flex justify-content-center align-items-center col-lg-1 col-md-1 bg-warning z-3"
        style={{ cursor: "pointer", height: "100%" }}
      >
        X
      </div>
    </div>
  );
};

export default ListContent;
