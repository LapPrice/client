import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./marketPrice.css";

interface Laptop {
  price: number;
  sourceURL: string;
}

interface MarketData {
  representativePrice: number; // 대표 가격 (중앙값 or 평균값)
  laptopList: Laptop[];
}

const MarketPricePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedLaptop } = location.state as { selectedLaptop: any };

  const [marketData, setMarketData] = useState<{
    다나와: MarketData | null;
    중고나라: MarketData | null;
    번개장터: MarketData | null;
  }>({
    다나와: null,
    중고나라: null,
    번개장터: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);

        const requestPayload = {
          laptopName: selectedLaptop.name,
          brand: selectedLaptop.brand,
          cpu: selectedLaptop.CPU,
          ram: selectedLaptop.RAM,
          inch: selectedLaptop.INCH,
          ssd: selectedLaptop.SSD,
          price: selectedLaptop.price,
        };

        const response = await fetch("http://localhost:8080/api/laptop/marketPrice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }

        const data = await response.json();

        // 백엔드의 응답 구조에 맞게 데이터 설정
        setMarketData({
          다나와: data.danawa["다나와"],
          중고나라: data.joonggonara["중고나라"],
          번개장터: data.bungaejangto["번개장터"],
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [selectedLaptop]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="price-page">
      <div className="central-box">
        <h2>{`${selectedLaptop.name} 시세`}</h2>
      </div>

      <div className="market-section-container">
        {Object.entries(marketData).map(([market, data]) => {
          if (!data) return null;

          return (
            <div key={market} className="market-section">
              <h3>
                {market} 대표 시세: {data.representativePrice.toLocaleString()}원
              </h3>
              <div className="price-list">
                {data.laptopList.map((item, index) => (
                  <div
                    key={index}
                    className="price-item"
                    onClick={() => window.open(`https://${item.sourceURL}`, "_blank")}
                  >
                    {item.price.toLocaleString()}원
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="more-info-container">
        <button className="more-info" onClick={() => navigate("/more-info")}>
          More Information
        </button>
      </div>
    </div>
  );
};

export default MarketPricePage;
