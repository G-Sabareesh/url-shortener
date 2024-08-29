import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Component/Main";
import NotFound from "./Component/NotFound";
import Login from "./Component/Settings/Login";
import Headers from "./Component/Headers";
import Signup from "./Component/Settings/Signup";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import UrlContext from "./DataContent/UrlContext";
import PaymentStatus from "./Component/PaymentStatus";

function Redirect() {
  const { backendUrl } = useContext(UrlContext);
  window.location.href = `${backendUrl}admin`;
}
function App() {
  const { loading } = useContext(UrlContext);
  return (
    <div className="App p-2">
      {loading && (
        <div
          className="position-absolute d-flex align-items-center justify-content-center flex-column w-100 p-5"
          style={{ zIndex: "9999" }}
          // backgroundColor: "#263849"
        >
          <div
            className="spinner-border border-5 text-primary"
            style={{ width: "2.5rem", height: "2.5rem" }}
            role="status"
          ></div>
          {/* <span className="fs-4 text-light mt-2">
            Please wait, processing your request
          </span> */}
        </div>
      )}
      <div className="fixed-top d-flex justify-content-start  align-items-center flex-column col-12">
        <Headers />
      </div>
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
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Redirect />} />
        <Route path="/paymentstatus" element={<PaymentStatus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
