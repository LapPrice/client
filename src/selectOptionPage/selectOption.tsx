import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionCategory from "./Option/OptionCategory";
import { useOption } from "./OptionContext";
import "./selectOption.css";

const SelectOption: React.FC = () => {
  const navigate = useNavigate();
  const { options, setOptions } = useOption();

  const [categories, setCategories] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/api/laptop/option");
        if (!response.ok) {
          throw new Error("Failed to fetch options");
        }
        const data = await response.json();
        setCategories({
          Brand: data.brand || [],
          CPU: data.cpu || {},
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

  const handleOptionClick = async(category: keyof typeof options, option: string) => {
    const updatedOptions = {
      ...options,
      [category]: options[category] === option ? "" : option, // 토글 방식
    };
    setOptions(updatedOptions);
    // PATCH API 호출
  try {
    const response = await fetch("http://localhost:8080/api/laptop/update-options", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOptions), // 선택된 옵션 전송
    });

    if (!response.ok) {
      throw new Error("Failed to update options");
    }

    const updatedCategories = await response.json();

    // 서버에서 받은 새 옵션 목록을 categories 상태에 반영
    setCategories({
      Brand: updatedCategories.brand || [],
      CPU: updatedCategories.cpu || [],
      SSD: updatedCategories.ssd || [],
      RAM: updatedCategories.ram || [],
      Inch: updatedCategories.inch || [],
    });
  } catch (err: any) {
    console.error("Error updating options:", err.message);
  }
};

  const handleNavigateToHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            iconClass={`${key.toLowerCase()}-icon`}
          />
        ))}
      <button className="home-button" onClick={handleNavigateToHome}>
        <span>Go to Home</span>
      </button>
    </div>
  );
};

export default SelectOption;
