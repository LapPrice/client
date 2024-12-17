import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./marketPrice.css";

interface Laptop {
  name: string;
  price: number;
  source: '다나와장터' | '중고나라' | '번개장터';
  link: string;
}

const MarketPricePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { laptopName } = location.state as { laptopName: string };

  const [laptopData, setLaptopData] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaptopData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/api/laptop/marketPrice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ laptopName }), // 선택된 랩탑 이름 전송
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const filteredData = data.filter((item: Laptop) => item.name === laptopName);
        setLaptopData(filteredData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptopData();
  }, [laptopName]);

  // 중앙값 계산 함수
  const calculateMedian = (prices: number[]): number => {
    if (prices.length === 0) return 0;
    const sorted = [...prices].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (laptopData.length === 0) return <p>데이터를 찾을 수 없습니다.</p>;

  // 평균 시세 (중앙값) 계산
  const allPrices = laptopData.map((item) => item.price);
  const medianPrice = calculateMedian(allPrices);

  // 마켓별 그룹화 및 평균 계산
  const groupedData: { [key: string]: Laptop[] } = {
    "다나와장터": [],
    "중고나라": [],
    "번개장터": [],
  };

  laptopData.forEach((item) => groupedData[item.source]?.push(item));

  const calculateMarketAverage = (data: Laptop[]) =>
    calculateMedian(data.map((item) => item.price));

  const marketAverages = {
    "다나와장터": calculateMarketAverage(groupedData["다나와장터"]),
    "중고나라": calculateMarketAverage(groupedData["중고나라"]),
    "번개장터": calculateMarketAverage(groupedData["번개장터"]),
  };

  const getPriceStyle = (price: number, reference: number) => {
    if (price === reference) {
      return { color: "black" }; // 가격이 같으면 검정색
    }
    return price > reference ? { color: "red" } : { color: "blue" }; // 상승은 빨간색, 하락은 파란색
  };

  const getArrowIcon = (price: number, reference: number) => {
    if (price > reference) {
      return "🔺"; // 상승 화살표
    } else if (price < reference) {
      return <span style={{ color: "blue" }}>🔻</span>; // 하락 화살표 (파란색)
    } else {
      return "−"; // 평균과 같으면 대시 표시
    }
  };

  return (
    <div className="price-page">
      {/* 중앙 Shadow 박스 */}
      <div className="central-box">
        <h2>
          {`${laptopName} 평균 시세: `}
          <span>{medianPrice.toLocaleString()}원</span>
        </h2>
      </div>

      {/* 마켓별 리스트 */}
      <div className="market-section-container">
        {Object.entries(groupedData).map(([market, data]) => (
          <div className="market-section" key={market}>
            <div className="comparision-header">
              <img
                src={`/images/${market === "다나와장터"
                    ? "danawaIcon"
                    : market === "중고나라"
                      ? "junggonaraIcon"
                      : "bungaeIcon"
                  }.png`}
                alt={market}
                className="market-icon"
              />
              <h3>
                {market} 평균:{" "}
                <span style={getPriceStyle(marketAverages[market], medianPrice)}>
                  {marketAverages[market].toLocaleString()}원{" "}
                  {getArrowIcon(marketAverages[market], medianPrice)}
                </span>
              </h3>
            </div>
            <div className="price-list">
              {data
                .sort((a, b) => a.price - b.price)
                .map((item, index) => (
                  <div
                    key={index}
                    className="price-item"
                    style={getPriceStyle(item.price, medianPrice)}
                    onClick={() => window.open(`https://${item.link}`, "_blank")}  // DB에서 URL을 자동으로 처리
                  >
                    {item.price.toLocaleString()}원 {getArrowIcon(item.price, medianPrice)}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* More Information 버튼 */}
      <div className="more-info-container">
        <button className="more-info" onClick={() => navigate("/more-info")}>
          More Information
        </button>
      </div>
    </div>
  );
};

export default MarketPricePage;
