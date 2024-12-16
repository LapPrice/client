import React, { useState, useEffect } from "react";
import "./SpecificationBox.css";
import { useNavigate } from "react-router-dom";
import { useOption } from "../selectOptionPage/OptionContext";

interface Laptop {
  name: string;
  brand: string;
  CPU: string;
  RAM: number;
  INCH: number;
  SSD: number;
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
      // 필터링된 조건을 URL 파라미터로 변환
      const params = new URLSearchParams({
        brand: options.Brand !== "ALL" ? options.Brand : "",
        cpu: options.CPU !== "ALL" ? options.CPU : "",
        ram: options.RAM !== "ALL" ? options.RAM : "",
        ssd: options.SSD !== "ALL" ? options.SSD : "",
        inch: options.Inch !== "ALL" ? options.Inch : "",
      });

      // 서버에 GET 요청을 보내 필터링된 데이터를 가져옴
      const response = await fetch(`http://localhost:8080/api/laptop/laptop-name-list?${params.toString()}`, {
        method: "GET",
      });

      const data = await response.json();
      const laptops = data.laptopList || [];
      const formattedData = laptops.map((item: any) => ({
        name: item.lapTopName,
        brand: item.brand,
        CPU: item.cpu,
        RAM: item.ram,
        SSD: item.ssd,
        INCH: item.inch,
        price: item.price,
      }));

      setFilteredLaptops(formattedData);
    } catch (error) {
      console.error("Error loading laptop list:", error);
    }
  };

  fetchLaptopList();
}, [options]);


  useEffect(() => {
    const applyFilters = () => {
      const filtered = laptops.filter((laptop) => {
        if (options.Brand !== "ALL" && laptop.brand !== options.Brand) return false;
        if (options.CPU !== "ALL" && laptop.CPU !== options.CPU) return false;
        if (options.RAM !== "ALL" && laptop.RAM !== parseInt(options.RAM)) return false;
        if (options.SSD !== "ALL" && laptop.SSD !== parseInt(options.SSD)) return false;
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
                {`CPU: ${laptop.CPU}, RAM: ${laptop.RAM}GB, SSD: ${laptop.SSD}GB, ${laptop.INCH}"`}
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
