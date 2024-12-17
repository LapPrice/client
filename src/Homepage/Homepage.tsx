import React from "react";
import { useNavigate } from "react-router-dom";
import { OptionRequest, useOption } from "../selectOptionPage/OptionContext";
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
    // const response = await fetch("http://localhost:8080/api", {
    //   method: "GET",
    // });
    // console.log("Data sent to API:", response);
    navigate("/select-laptop")
  };

  const isButtonDisabled = 
  options.Brand === null ||
  options.CPU === null ||
  options.Inch === null ||
  options.RAM === null ||
  options.SSD === null

  return (
    <div className="Home">
      <HomepageImage />
      <div>
        <h1 className="specification-text">specification by</h1>
      </div>
      <div onClick={goToSpecificationSelect} style={{ cursor: "pointer" }}>
        <div className="specification-box">
          {/* OptionContext의 상태 값 렌더링 */}
          <span className="specification-item">
            <i className="brand-icon"></i>
            <span>{options.Brand ?? "Brand"}</span>
          </span>
          <span className="specification-item">
            <i className="cpu-icon"></i>
            <span>{options.CPU ?? "CPU"}</span>
          </span>
          <span className="specification-item">
            <i className = "ssd-icon"></i>
            <span>{options.SSD ?? "SSD"}</span>
          </span>
          <span className="specification-item">
            <i className="ram-icon"></i>
            <span>{options.RAM ?? "RAM"}</span>
          </span>
          <span className="specification-item">
            <i className="inch-icon"></i>
            <span>{options.Inch ?? "INCH"}</span>
          </span>
          <span className="specification-item"></span>
          <span className="specification-item"></span>
          <span className="specification-item"></span>
        </div>
      </div>
      <button onClick={onClickGo} className="send-button" >
        GO!
      </button>
    </div>
  );
};

export default Homepage;
