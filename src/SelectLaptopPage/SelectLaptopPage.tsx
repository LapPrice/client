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

  // 서버에서 노트북 목록 가져오기
  useEffect(() => {
    const fetchLaptopList = async () => {
      try {
        const params = {
          brand: options.Brand && options.Brand !== "ALL" ? options.Brand : null,
          cpu: options.CPU && options.CPU !== "ALL" ? options.CPU : null,
          ram: options.RAM && options.RAM !== "ALL" ? Number(options.RAM) : null,
          ssd: options.SSD && options.SSD !== "ALL" ? Number(options.SSD) : null,
          inch: options.Inch && options.Inch !== "ALL" ? Number(options.Inch) : null,
        };

        console.log("Request Params:", params); // 서버에 보낼 요청 데이터 확인

        const response = await fetch(`http://43.203.181.135:8080/api/laptop/laptop-name-list`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch laptop list");
        }

        const data = await response.json();
        console.log("Response Data:", data); // 서버에서 받은 데이터 확인

        const laptops = Array.isArray(data.laptopList) ? data.laptopList : [];

        // 서버 데이터 매핑
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

  // 필터링 로직
  useEffect(() => {
    const applyFilters = () => {
      console.log("Laptops before filtering:", laptops);

      const filtered = laptops.filter((laptop) => {
        return (
          (!options.Brand || options.Brand === "ALL" || laptop.brand === options.Brand) &&
          (!options.CPU || options.CPU === "ALL" || laptop.CPU === options.CPU) &&
          (!options.RAM || options.RAM === "ALL" || laptop.RAM === Number(options.RAM)) &&
          (!options.SSD || options.SSD === "ALL" || laptop.SSD === Number(options.SSD)) &&
          (!options.Inch || options.Inch === "ALL" || laptop.INCH === Number(options.Inch))
        );
      });

      console.log("Filtered Laptops:", filtered);
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
            <div key={key} className="specification-item">
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
