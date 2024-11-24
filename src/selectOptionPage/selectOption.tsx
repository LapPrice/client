import React from "react";
import { useNavigate } from "react-router-dom";
import OptionCategory from "./Option/OptionCategory";
import { useOption } from "./OptionContext"; // OptionContext 사용
import "./selectOption.css";

const defaultOptions = {
  Brand: [
    "Acer", "ALLDOCUBE", "APPLE", "ASUS", "Basics", "Chuwi", "Dell", "Dicie",
    "Foryoudigital", "Gigabyte", "GPD", "Hansung", "HP", "Huawei", "Jooyon",
    "Lenovo", "LG", "Microsoft", "MPGIO", "MSI", "Nextbook", "Razer", 
    "Samsung", "Tedas", "Victrack", "ALL",
  ],
  CPU: [
    "i3", "i5", "i7", "i9",
    "Ultra 5", "Ultra 7", "Ultra 9",
    "Pentium Gold", "Pentium Silver", "Pentium",
    "Celeron",
    "Ryzen U", "Ryzen H", "Ryzen HS", "Ryzen HX"
  ],
  GPU: ["Internal", "External"],
  SSD: ["128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "6TB"],
  RAM: ["4GB", "8GB", "16GB", "32GB", "64GB", "128GB"],
  Inch: ["17", "16", "15", "14", "13", "12", "11", "10"],
};

const SelectOption: React.FC = () => {
  const navigate = useNavigate();
  const { options, setOptions } = useOption(); // OptionContext 사용

  const handleOptionClick = (category: keyof typeof options, option: string) => {
    setOptions((prev) => ({
      ...prev,
      [category]: option,
    }));
  };

  const handleNavigateToHome = () => {
    navigate("/"); // 홈으로 이동
  };

  const categories = [
    { title: "Brand", key: "Brand", options: defaultOptions.Brand },
    { title: "CPU", key: "CPU", options: defaultOptions.CPU }, // CPU 카테고리 추가
    { title: "GPU", key: "GPU", options: defaultOptions.GPU },
    { title: "SSD", key: "SSD", options: defaultOptions.SSD },
    { title: "RAM", key: "RAM", options: defaultOptions.RAM },
    { title: "Inch", key: "Inch", options: defaultOptions.Inch },
  ];

  return (
    <div className="selectOption-box">
      <div className="filter-text-box">
        <h1 className="filter-text">Filter by</h1>
      </div>
      {categories.map((category) => (
        <OptionCategory
          key={category.key}
          title={category.title}
          options={category.options}
          onClick={(option) =>
            handleOptionClick(category.key as keyof typeof options, option)
          }
        />
      ))}
      {/* 홈으로 이동 버튼 */}
      <button className = "home-button" onClick={handleNavigateToHome}>
        <span>Go to Home</span>
        </button>
    </div>
  );
};

export default SelectOption;
