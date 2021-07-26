import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";

import "../materialize.css";

export const Create = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/details/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <label htmlFor="link">Enter your link</label>
        <div>
          <input
            placeholder="Enter link"
            id="link"
            type="text"
            onChange={(e) => {
              setLink(e.target.value);
            }}
            onKeyPress={pressHandler}
          />
        </div>
      </div>
    </div>
  );
};
