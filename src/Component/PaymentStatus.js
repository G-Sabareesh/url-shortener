import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UrlContext from "../DataContent/UrlContext";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const { setPaymentStatus } = useContext(UrlContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");

    if (status === "success") {
      setPaymentStatus(false);
      setMessage("Payment was successful! Thank you for your purchase.");
    } else {
      setPaymentStatus(false);
      setMessage("Payment failed. Please try again.");
    }

    // Redirect to another page after showing the message for a few seconds (optional)
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to the home page or another route
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [location, navigate]);

  return (
    <div>
      <h1 className="text-light">{message}</h1>
    </div>
  );
};

export default PaymentStatus;
