import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UrlContext from "../DataContent/UrlContext";
import PaymentSuccess from "./Popup/PaymentSuccess";
import PaymentFailed from "./Popup/PaymentFailed";

const PaymentStatus = () => {
  const location = useLocation();

  const [payment, setPayment] = useState(0);

  const { setPaymentStatus, setUserStatus } = useContext(UrlContext);

  const nav = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");

    if (status === "success") {
      setPaymentStatus(false);
      setUserStatus(3);
      localStorage.setItem("url_shorten_user_status", 3);
      setPayment(1);
      setTimeout(() => {
        nav("/");
      }, 3000);
    } else {
      setPaymentStatus(false);
      setPayment(2);
      setTimeout(() => {
        nav("/");
      }, 3000);
    }
  });

  return (
    <>
      {payment === 1 && <PaymentSuccess />}
      {payment === 2 && <PaymentFailed />}
    </>
  );
};

export default PaymentStatus;
