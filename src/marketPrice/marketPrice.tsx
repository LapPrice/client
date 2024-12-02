import React from "react";
import { useLocation } from "react-router-dom";
import "./MarketPrice.css";

interface Platform {
  platform: string;
  icon: string;
  prices: number[];
}

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

const MarketPricePage: React.FC = () => {
  const location = useLocation();
  const { selectedLaptop }: { selectedLaptop: Laptop } = location.state || {
    selectedLaptop: null,
  };
  console.log("Selected laptop in MarketPricePage:", selectedLaptop); // 디버깅용 로그
  if (!selectedLaptop) {
    return <div>선택한 노트북 정보가 없습니다.</div>;
  }
  

  const platforms: Platform[] = [
    {
      platform: "다나와 정리",
      icon: "/images/danawaIcon.png",
      prices: [1200000, 1300000],
    },
    {
      platform: "중고나라",
      icon: "/images/junggonaraIcon.png",
      prices: [900000, 900000],
    },
    {
      platform: "번개장터",
      icon: "/images/bungaeIcon.png",
      prices: [750000, 800000],
    },
  ];



  return (
    <div>
      <div className="average-price">
        <p>
          {selectedLaptop.name}의 시세는{" "}
          <strong>{selectedLaptop.price.toLocaleString()}W</strong>로 예상됩니다!
        </p>
      </div>

      <div className="platform-container">
        {platforms.map((platform, index) => (
          <div className="platform-box" key={index}>
            <img src={platform.icon} alt={`${platform.platform} 아이콘`} />
            <h3>{platform.platform}</h3>
            {platform.prices.map((price, priceIndex) => (
              <p key={priceIndex} className="price-item">
                {price.toLocaleString()}W
              </p>
            ))}
            <button>More Information</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPricePage;
