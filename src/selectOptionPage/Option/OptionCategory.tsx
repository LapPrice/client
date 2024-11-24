    import React from "react";
    import "./OptionCategory.css";

    interface OptionCategoryProps {
    title: string; // 옵션 카테고리 이름 (e.g., "Brand")
    options: string[]; // 옵션 배열 (e.g., ["Acer", "Apple"])
    onClick: (option: string) => void; // 옵션 클릭 핸들러
    }

    const OptionCategory: React.FC<OptionCategoryProps> = ({ title, options, onClick }) => {
    return (
        <span>
            <div className = "option-value-box">
            <h2 className="option-value">{title}</h2>
            </div>
            <div className = "option-container-box">
                <div className="option-container">
                    {options.map((option, index) => (
                    <button className="option-box" key={index} onClick={() => onClick(option)}>
                        <i className = "icon"></i>
                        <span>{option}</span>
                    </button>
                    ))}
                </div>
            </div>
        </span>
    );
    };

    export default OptionCategory;
    