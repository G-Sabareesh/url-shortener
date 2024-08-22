import React from "react";

import { QRCodeSVG } from "qrcode.react";

const QrCode = ({url}) => {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="qr-code">
            QR Code - for your url
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="text-center">
            <QRCodeSVG
              value={url}
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
        </div>
        <div className="text-center">
          <div className="text-center">
            <div className="model-body">URL : {url}</div>
          </div>
          <div className="model-body py-2">
            scan this qr code to redirect the webpage
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
