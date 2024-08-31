import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UrlContext from "../../DataContent/UrlContext";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";

const Login = () => {
  const { registration, setRegistration, handleLogin, error, setError } =
    useContext(UrlContext);

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  // console.log(email, password);

  useEffect(() => {
    setError(null);
  }, []);

  return (
    registration && setRegistration(false),
    (
      <div className="d-flex justify-content-center align-items-center flex-column p-2 bg-light rounded-2 col-10 col-sm-8 col-md-6 col-lg-3">
        <img
          src="https://img.icons8.com/?size=100&id=n9d0Hm43JCPK&format=png&color=000000"
          alt="url"
          height={50}
        />
        <span className="fs-4">Login your account</span>
        <form className="col-12 d-flex align-items-center justify-content-center flex-column">
          <div className="col-10 mt-3">
            <div className="position-relative mb-2">
              <div className=" input-group border-1 border-bottom border-primary">
                <input
                  type="text"
                  className="form-control fw-semibold fs-6 bg-light"
                  placeholder="email"
                  value={email}
                  style={{ textIndent: "15px" }}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span
                  className="position-absolute"
                  style={{ top: "15%", zIndex: "10" }}
                >
                  <MdOutlineEmail color="rgba(41,42,46,1)" size={20} />
                </span>
              </div>
              {error?.email && (
                <span className="fs-6 text-danger">{error.email}</span>
              )}
            </div>
            <div className="mb-2">
              <div className="position-relative input-group  border-1 border-bottom border-primary">
                <input
                  type="password"
                  className="form-control fw-semibold fs-6 bg-light"
                  placeholder="password"
                  style={{ textIndent: "15px" }}
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  autoComplete="false"
                />
                <span
                  className="position-absolute"
                  style={{ top: "15%", zIndex: "10" }}
                >
                  <MdOutlineLock color="rgba(41,42,46,1)" size={20} />
                </span>
              </div>
              {error?.password && (
                <span className="fs-6 text-danger">{error.password}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary fw-semibold col-10 mt-3  rounded-1"
            onClick={() => handleLogin(email, password)}
          >
            Login
          </button>
          <span className="text-muted mt-3 ">
            {/* New User :{" "} */}
            <Link to="/signup" className="text-decoration-none">
              Create your account
              <FaArrowRight className="ms-1 fw-lighter" />
            </Link>
          </span>
        </form>
      </div>
    )
  );
};

export default Login;
