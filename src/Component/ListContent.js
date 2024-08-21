import React, { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import QrCode from "./QrCode";

const ListContent = () => {
  const url = "google.comaslkdjf;lsjd;lksjflslkdklf";

  const [copyColor, setCopyColor] = useState(false);

  function copyFunction() {
    navigator.clipboard.writeText(url).then(() => {
      setCopyColor(true);
    });
    setTimeout(() => {
      setCopyColor(false);
    }, 2000);
  }

  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center col-sm-10 rounded"
      style={{ minHeight: "20%" }}
    >
      <div
        className="d-flex justify-content-evenly align-items-center  col-sm-11 bordered rounded bg-light"
        style={{ minHeight: "100%" }}
      >
        <div className=" d-flex flex-wrap justify-content-center col-sm-7 col-md-8">
          <div className=" d-flex  justify-content-start align-items-center p-2 col-sm-5 col-md-7 col-lg-6 overflow-hidden">
            <a href={url}>{url}</a>
          </div>
          <div className="d-flex  justify-content-start align-items-center p-2 col-sm-5 col-md-7 col-lg-6 overflow-hidden">
            <a href={url}>{url}</a>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap text-center col-sm-3 col-md-2 col-lg-3 ">
          <div
            className="col-sm-5  d-flex justify-content-center align-items-center text-center m-2"
            title="QR Code"
            data-bs-toggle="modal"
            data-bs-target="#qr-code"
            style={{ cursor: "pointer" }}
          >
            <BsQrCode size={30} />
          </div>
          <div
            className="col-sm-5  d-flex justify-content-center align-items-center text-center m-2"
            title="Copy"
            style={{ cursor: "pointer" }}
            onClick={copyFunction}
          >
            {copyColor ? (
              <>
                <span className="text-success fs-5 fw-semibold">Copied</span>
              </>
            ) : (
              <FaRegCopy size={30} color="black" />
            )}
          </div>
        </div>
      </div>
      <div
        className=" close d-flex justify-content-center align-items-center ms-2 ms-md-4 ms-lg-2
         col-sm-1"
        style={{ cursor: "pointer" }}
      >
        <IoIosCloseCircle size={30} />
      </div>

      <div className="modal fade " id="qr-code" tabIndex="-1">
        <QrCode />
      </div>
    </div>
  );
};

export default ListContent;
