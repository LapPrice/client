import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionCategory from "./Option/OptionCategory";
import { useOption } from "./OptionContext";
import "./selectOption.css";

const SelectOption: React.FC = () => {
  const navigate = useNavigate();
  const { options, setOptions } = useOption();

  const [categories, setCategories] = useState<any>(null); // 백엔드에서 가져온 데이터를 저장
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/api/laptop");
        if (!response.ok) {
          throw new Error("Failed to fetch options");
        }
        const data = await response.json();
        setCategories({
          Brand: data.brand || [],
          CPU: data.cpu || {},
          GPU: data.gpu || ["Internal", "External"], 
          SSD: data.ssd || [],
          RAM: data.ram || [],
          Inch: data.inch || [],
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleOptionClick = (category: keyof typeof options, option: string) => {
    setOptions((prev) => ({
      ...prev,
      [category]: prev[category] === option ? "" : option,
    }));
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태
  }

  if (error) {
    return <div>Error: {error}</div>; // 에러 상태
  }

  return (
    <div className="selectOption-box">
      <div className="filter-text-box">
        <h1 className="filter-text">Filter by</h1>
      </div>
      {categories &&
        Object.entries(categories).map(([key, values]: [string, any]) => (
          <OptionCategory
            key={key}
            title={key}
            options={values}
            onClick={(option) =>
              handleOptionClick(key as keyof typeof options, option)
            }
            selectedOption={options[key as keyof typeof options]}
            iconClass={`${key.toLowerCase()}-icon`} // 예: "brand-icon"
          />
        ))}
      <button className="home-button" onClick={handleNavigateToHome}>
        <span>Go to Home</span>
      </button>
    </div>
  );
};

export default SelectOption;
