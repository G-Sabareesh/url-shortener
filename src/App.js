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

function Redirect() {
  const { backendUrl } = useContext(UrlContext);
  window.location.href = `${backendUrl}admin`;
}
function App() {
  return (
    <div className="App p-2">
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
      <div className="fixed-top d-flex justify-content-start  align-items-center flex-column col-12">
        <Headers />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
