import React, { useState, useEffect } from "react";
import "./SpecificationBox.css";
import { useNavigate } from "react-router-dom";
import { useOption } from "../selectOptionPage/OptionContext";

interface Laptop {
  name: string;
  brand: string;
  CPU: string;
  RAM: number;
  GPU: string;
  INCH: number;
  DISK: number;
  price: number;
}

const SelectLaptopPage: React.FC = () => {
  const { options } = useOption(); // OptionContext에서 필터링 데이터 가져오기
  const [laptops, setLaptops] = useState<Laptop[]>([]); // 전체 노트북 목록
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([]); // 필터링된 목록
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptopList = async () => {
      try {
        const response = await fetch("/api/laptopList.json"); // public 폴더의 laptopList.json
        const data = await response.json();
        setLaptops(data);
      } catch (error) {
        console.error("Error loading laptop list:", error);
      }
    };

    fetchLaptopList();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = laptops.filter((laptop) => {
        if (options.Brand !== "ALL" && laptop.brand !== options.Brand) return false;
        if (options.CPU !== "ALL" && laptop.CPU !== options.CPU) return false;
        if (options.RAM !== "ALL" && laptop.RAM !== parseInt(options.RAM)) return false;
        if (options.GPU !== "ALL" && laptop.GPU !== options.GPU) return false;
        if (options.SSD !== "ALL" && laptop.DISK !== parseInt(options.SSD)) return false;
        if (options.Inch !== "ALL" && laptop.INCH !== parseInt(options.Inch)) return false;
        return true;
      });

      setFilteredLaptops(filtered);
    };

    applyFilters();
  }, [options, laptops]);

  const goToMarketPrice = (laptop: Laptop) => {
    console.log("Navigating with laptop:", laptop);
    navigate("/marketPrice", { state: { selectedLaptop: laptop } });
  };
  

  return (
    <div className="outer-container">
      <h2>
        <span>Filtered by:</span>
      </h2>
      <div className="filter-options">
        <div className="specification-box">
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className="specification-item"
              onClick={() => console.log(`${key}: ${value}`)}
            >
              <span className="filter-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="laptop-list">
        {filteredLaptops.length > 0 ? (
          filteredLaptops.map((laptop, index) => (
            <div
              key={index}
              className="laptop-item"
              onClick={() => goToMarketPrice(laptop)}
            >
              <h3 className="laptop-name">{laptop.name}</h3>
              <p className="laptop-specs">
                {`CPU: ${laptop.CPU}, RAM: ${laptop.RAM}GB, GPU: ${laptop.GPU}, SSD: ${laptop.DISK}GB, ${laptop.INCH}"`}
              </p>
            </div>
          ))
        ) : (
          <p>No laptops match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default SelectLaptopPage;
