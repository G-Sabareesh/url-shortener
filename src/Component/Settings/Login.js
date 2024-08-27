import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UrlContext from "../../DataContent/UrlContext";

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
      <div className="d-flex justify-content-center align-items-center flex-column p-2 bg-light rounded-2 col-sm-3 col-md-6 col-lg-4">
        <div className="fs-3 fw-semibold pb-3 border-bottom w-100 text-center">
          Login
        </div>
        <div className="col-10 mt-3">
          <div className=" mb-3">
            <div className="input-group">
              <span
                className="input-group-text fw-normal fs-5"
                id="inputGroup-sizing-default"
              >
                Email
              </span>
              <input
                type="text"
                className="form-control fw-semibold fs-5"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error?.email && (
              <span className="fs-6 text-danger">{error.email}</span>
            )}
          </div>
          <div className="mb-3">
            <div className="input-group ">
              <span
                className="input-group-text fw-normal fs-5"
                id="inputGroup-sizing-default"
              >
                Password
              </span>
              <input
                type="text"
                className="form-control fw-semibold fs-5"
                placeholder="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            {error?.password && (
              <span className="fs-6 text-danger">{error.password}</span>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-6 fw-semibold">
              New User :{" "}
              <Link to="/signup" className="text-decoration-none">
                Signup
              </Link>
            </span>
            <button
              type="button"
              className="btn btn-primary fw-semibold"
              onClick={() => handleLogin(email, password)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
