import React from "react";
import Heading from "./Heading";
import Form from "./Form";
import List from "./List";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center rounded flex-column col-12"
      style={{ height: "100%", backgroundColor: "" }}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Heading />
      <Form />
      <List />
    </div>
  );
};

export default Main;
