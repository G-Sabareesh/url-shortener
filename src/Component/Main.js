import React, { useContext } from "react";
import Heading from "./Heading";
import Form from "./Form";
import List from "./List";

import "react-toastify/dist/ReactToastify.css";
import UrlContext from "../DataContent/UrlContext";
import PriceCard from "./Popup/PriceCard";
import Registration from "./Popup/Registration";

const Main = () => {
  const { registration, paymentStatus } = useContext(UrlContext);

  return (
    <div
      className="d-flex justify-content-center align-items-center rounded flex-column col-12"
      style={{ height: "100%" }}
    >
      <Heading />
      <Form />
      <List />
      {paymentStatus && <PriceCard />}
      {registration && <Registration />}
    </div>
  );
};

export default Main;
