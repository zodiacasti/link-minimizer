import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import M from "materialize-css";
import "../materialize.css";

export const Auth = () => {
  const auth = useContext(AuthContext);
  useEffect(() => {}, []);

  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      console.log(data, auth);
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center">Link minimizer</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Card Title</span>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div>
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
