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

const SelectLaptopPage = () => {
  const { options } = useOption(); // OptionContext에서 필터링 데이터 가져오기
  const [laptops, setLaptops] = useState<Laptop[]>([]); // 전체 노트북 목록
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([]); // 필터링된 목록
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptopList = async () => {
      try {
        const params = new URLSearchParams();

        // 조건에 맞는 값만 URL에 추가하고, 숫자는 문자열로 변환
        if (options.Brand && options.Brand !== "ALL") params.append("brand", options.Brand);
        if (options.CPU && options.CPU !== "ALL") params.append("cpu", options.CPU);
        if (options.RAM && options.RAM !== "ALL") params.append("ram", String(options.RAM));
        if (options.SSD && options.SSD !== "ALL") params.append("ssd", String(options.SSD));
        if (options.Inch && options.Inch !== "ALL") params.append("inch", String(options.Inch));


        const response = await fetch(
          `http://localhost:8080/api/laptop/laptop-name-list?${params.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch laptop list");
        }

        const data = await response.json();
        const laptops = Array.isArray(data.laptopList) ? data.laptopList : [];

        const formattedData = laptops.map((item: any) => ({
          name: item.lapTopName,
          brand: item.brand,
          CPU: item.cpu,
          RAM: item.ram,
          SSD: item.ssd,
          INCH: item.inch,
          price: item.price,
        }));

        setLaptops(formattedData);
        setFilteredLaptops(formattedData); // 초기 필터링 결과 설정
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
        if (options.RAM !== "ALL" && laptop.RAM !== Number(options.RAM)) return false;
        if (options.SSD !== "ALL" && laptop.SSD !== Number(options.SSD)) return false;
        if (options.Inch !== "ALL" && laptop.INCH !== Number(options.Inch)) return false;
        return true;
      });

      setFilteredLaptops(filtered);
    };

    applyFilters();
  }, [options, laptops]);

  const goToSpecificationSelect = () => {
    navigate("/select-option");
  };

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
        <div onClick={goToSpecificationSelect} className="specification-box">
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
