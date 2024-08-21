import React from "react";
import Heading from "./Heading";
import Form from "./Form";
import List from "./List";

const Main = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center rounded flex-column col-12"
      style={{ height: "100%", backgroundColor: "" }}
    >
      <Heading />
      <Form />
      <List />
    </div>
  );
};

export default Main;
