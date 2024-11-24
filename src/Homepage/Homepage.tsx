import React from "react";
import { useNavigate } from "react-router-dom";
import { useOption } from "../selectOptionPage/OptionContext";
import HomepageImage from "./HompageBackground/HomepageBackground";
import "./Homepage.css";
import "./SpecificationByText.css";
import "./SpecificationBox.css";
import "./GoButton.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { options } = useOption(); // OptionContext에서 options 가져오기

  const goToSpecificationSelect = () => {
    navigate("/select-option");
  };

  const onClickGo = async () => {
    const response = await fetch("http://localhost:8080/api", {
      method: "GET",
    });
    console.log("Data sent to API:", response);
  };

  return (
    <div className="Home">
      <HomepageImage />
      <div>
        <h1 className="specification-text">specification by</h1>
      </div>
      <div onClick={goToSpecificationSelect} style={{ cursor: "pointer" }}>
        <div className="specification-box">
          {/* OptionContext의 상태 값 렌더링 */}
          <span className="specification-item">{options.Brand}</span>
          <span className="specification-item">{options.CPU}</span>
          <span className="specification-item">{options.GPU}</span>
          <span className="specification-item">{options.SSD}</span>
          <span className="specification-item">{options.RAM}</span>
          <span className="specification-item">{options.Inch}</span>
          <span className="specification-item"></span>
          <span className="specification-item"></span>
        </div>
      </div>
      <button onClick={onClickGo} className="send-button">
        GO!
      </button>
    </div>
  );
};

export default Homepage;
