import React, { useContext, useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { QRCodeSVG } from "qrcode.react";

import UrlContext from "../DataContent/UrlContext";

import { FaRegCheckCircle } from "react-icons/fa";

const ListContent = ({ item }) => {
  const [copyColor, setCopyColor] = useState(false);
  const { backendUrl, handleDelete } = useContext(UrlContext);

  const [qrclick, setQrclick] = useState(false);

  function copyFunction() {
    navigator.clipboard.writeText(backendUrl + item.shortenedurl).then(() => {
      setCopyColor(true);
    });
    setTimeout(() => {
      setCopyColor(false);
    }, 2000);
  }

  return (
    <>
      <div
        className="position-relative d-flex justify-content-center align-items-center col-12 col-sm-12 col-md-12 col-lg-11 "
        style={{ minHeight: "70px" }}
      >
        <div
          className="d-flex justify-content-evenly align-items-center col-11 col-sm-9 col-md-9 col-lg-11  border border-success rounded-1 bg-light"
          style={{ minHeight: "100%" }}
        >
          <div className="listcontent d-flex flex-wrap justify-content-between col-9 col-sm-9 col-md-9 col-lg-10 flex-column flex-sm-column flex-md-row flex-lg-row">
            <div className="actualurl d-flex flex-wrap text-wrap align-items-center justify-content-start col-12 col-sm-12 col-md-12 col-lg-8 overflow-hidden p-1">
              <span className="text-truncate fs-5 ps-2 fw-semibold text-muted">
                {item.actualurl}
              </span>
            </div>
            <div className="d-flex flex-wrap justify-content-lg-end justify-content-md-start justify-content-sm-start align-items-center col-sm-12 col-md-12 col-lg-4 overflow-hidden p-2 p-sm-2">
              <a
                href={backendUrl + item.shortenedurl}
                rel="noopener noreferrer"
                target="_blank"
                className="fs-5 fw-semibold text-decoration-none"
              >
                {"url.io/" + item.shortenedurl}
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-evenly align-items-center flex-wrap flex-column flex-sm-column flex-md-row col-3 col-sm-3 col-md-3 col-lg-2">
            <div
              className="options col-sm-6 col-md-4  d-flex justify-content-center align-items-center text-center m-1 p-1  rounded-2"
              title="QR Code"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQrclick(true);
              }}
            >
              <BsQrCode size={28} />
            </div>
            <div
              className="options col-5 col-sm-6 col-md-4 d-flex justify-content-center align-items-center text-center m-1 p-1 rounded-2"
              title="Copy"
              style={{ cursor: "pointer" }}
              onClick={copyFunction}
            >
              {copyColor ? (
                <>
                  <FaRegCheckCircle size={28} className="text-success success"/>
                </>
              ) : (
                <FaRegCopy size={28} />
              )}
            </div>
          </div>
        </div>
        <div
          className=" close d-flex justify-content-center align-items-center col-md-1 col-lg-1"
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(item.shortenedurl)}
        >
          <IoIosCloseCircle size={30} />
        </div>
      </div>
      {qrclick && (
        <div
          className="position-absolute h-100 w-100 d-flex align-items-center justify-content-center rounded-2"
          style={{ zIndex: "999", backgroundColor: "#00000087", top: "0" }}
        >
          <div
            className="d-flex justify-content-center align-items-center flex-column col-10 col-sm-6 col-md-5 col-lg-3 rounded-2 p-1"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="w-100 text-primary  fs-5 fw-semibold py-2 fst-italic rounded-top ms-2">
                Qr Code - for your URL
              </span>
              <span
                className="registration-close p-1 rounded-pill me-2"
                onClick={() => setQrclick(false)}
              >
                <IoClose size={28} />
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <div className="text-center py-3">
                <QRCodeSVG
                  value={backendUrl + item.shortenedurl}
                  size={150}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://g-sabareesh.github.io/SS-Portfolio/images/boy.png",
                    x: undefined,
                    y: undefined,
                    height: 44,
                    width: 44,
                    excavate: false,
                  }}
                />
              </div>
              <div className="fs-6 py-2 text-center" style={{ width: "95%" }}>
                URL : {backendUrl + item.shortenedurl}
              </div>
              <span className="fs-6 text-muted text-center w-100 px-1">
                scan this qr code to redirect the webpage
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListContent;
