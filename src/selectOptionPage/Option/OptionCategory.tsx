import React from "react";
import "./OptionCategory.css";

interface OptionCategoryProps {
  title: string;
  options: string[] | { [subCategory: string]: string[] };
  onClick: (option: string) => void;
  selectedOption?: string; // 선택된 옵션
  iconClass: string; // CSS 기반 아이콘 클래스명
}

const OptionCategory: React.FC<OptionCategoryProps> = ({
  title,
  options,
  onClick,
  selectedOption,
  iconClass,
}) => {
  return (
    <span>
      <div className="option-value-box">
        <h2 className="option-value">{title}</h2>
      </div>
      <div className="option-container-box">
        <div className="option-container">
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <button
                className={`option-box ${
                  selectedOption === option ? "selected" : ""
                }`}
                key={index}
                onClick={() => onClick(option)}
              >
                {/* 버튼 안에 아이콘 위치 */}
                <i className={`icon ${iconClass}`}></i>
                <span>{option}</span>
              </button>
            ))
          ) : (
            Object.entries(options).map(([subCategory, subOptions], subIndex) => (
              <div key={subIndex} style={{ width: "100%" }}>
                <h3 className="sub-category-title">{subCategory}</h3>
                <div className="sub-option-container">
                  {subOptions.map((subOption, index) => (
                    <button
                      className={`option-box ${
                        selectedOption === subOption ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => onClick(subOption)}
                    >
                      {/* 버튼 안에 아이콘 위치 */}
                      <i className={`icon ${iconClass}`}></i>
                      <span>{subOption}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </span>
  );
};

export default OptionCategory;
