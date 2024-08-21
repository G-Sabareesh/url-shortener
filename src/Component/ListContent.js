import React, { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
      className="col-sm-10 d-flex justify-content-center align-items-center  rounded position-relative"
      style={{ minHeight: "20%" }}
    >
      <div
        className=" d-flex justify-content-center align-items-center bg-light col-sm-11 bordered rounded"
        style={{ minHeight: "100%" }}
      >
        <div className=" d-flex flex-wrap justify-content-center col-9">
          <div className=" d-flex  justify-content-start align-items-center p-2 col-sm-6 overflow-hidden">
            <a href={url}>{url}</a>
          </div>
          <div className="d-flex  justify-content-start align-items-center p-2 col-sm-6 overflow-hidden">
            <a href={url}>{url}</a>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center text-center col-sm-3  flex-wrap">
          <div
            className="col-sm-5  d-flex justify-content-center align-items-center text-center m-2"
            title="QR Code"
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
        className=" close d-flex justify-content-center align-items-center ms-4 col-md-1"
        style={{ cursor: "pointer" }}
      >
        <IoMdCloseCircleOutline size={30} />
      </div>
    </div>
  );
};

export default ListContent;
