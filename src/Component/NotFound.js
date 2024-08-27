import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center flex-column">
      <div>
        <span className="display-1 text-light fw-bold">4</span>
        <span className="display-1 text-primary fw-bold p-1">0</span>
        <span className="display-1 text-light fw-bold">4</span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column pt-4">
        <span className="fs-2 text-light fw-semibold text-center">
          page not found
        </span>
        <span className="fs-6 text-light fw-semibold">
          THE PAGE YOU REQUESTED WAS NOT FOUND
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column pt-4">
        <span className="fs-6 text-light fw-semibold">
          <Link to="/" className="fs-1">Home</Link>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
