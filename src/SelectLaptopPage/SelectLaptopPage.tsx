import React, {useState, useEffect} from "react";
import './SpecificationBox.css'
import {useNavigate} from "react-router-dom";
import { METHODS } from "http";
import { error } from "console";



interface Laptop {
    name: string;
    brand: string;
    CPU: string;
    RAM: number;
    INCH: number;
    DISK: number;
    price: number;
}



const SelectLaptopPage = () => {
        
        const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([]); // 필터링된 목록
        const navigate = useNavigate();
        const [selectedFilters, setSelectedFilters] = useState({
            brand: "ALL",
            cpu : "ALL",
            ram : "ALL",
            screen : "ALL",
            storage: "ALL"
        });
        const[laptops, setlaptops] = useState<Laptop[]>([]);


        //marketPrice 이동하는 page 
        const goToMarketPrice = (laptopName) => {
            //특정 laptopName을 parameter로 이용
            navigate('/marketPrice?name=$(laptopName)') //'/marketPrice?name=$(laptopName)'는 url => ex) SAMSUNG ion2 면 /marketPrice?name=SAMSUNG ion2 가 url이 됌.
        }




        // 만약 filtering section을 클릭하여 filter option을 재설정할 경우 전 페이지로 이동. 
        const handleFilterClick = (filterType: string, filterValue: string) => { 
            navigate('/filterPage?filtertype=${filterType}');
          };
    



   

    // DB에서 가져옴
    useEffect(() => {
        const fetchLaptopList = async () => {
            try {
                const response = await fetch('/api/laptopList.json'); //public에만 가능 
                const data = await response.json();
                console.log(data);
                setlaptops(data);
            } catch (error) {
                console.error("Error loading laptop list:", error);
            }
        };
    
        fetchLaptopList();
    }, []);

 //   필터가 변경될때마다 업데이트
    useEffect(() => {

    },[selectedFilters]);

// 필터링 로직: 선택된 필터에 따라 laptops 리스트를 필터링
useEffect(() => {
    const applyFilters = () => {
        let filtered = laptops;

        // 각 필터 조건 적용
        for (const [filterType, filterValue] of Object.entries(selectedFilters) as [string, string][]) {
            const type = filterType as string;
            const value = filterValue as string;

            if (filterValue === "All") continue; // default값은 필터링 하지 않음
            
            filtered = filtered.filter((laptop) => {
                if (filterType === "brand") return laptop.brand === filterValue;
                if (filterType === "cpu") return laptop.CPU === filterValue;
                if (filterType === "ram") return laptop.RAM === parseInt(filterValue); 
                if (filterType === "storage") return laptop.DISK === parseInt(filterValue); 
                if (filterType === "screen") return laptop.INCH === parseInt(filterValue);
                return true;
            });
    

        }  

        setFilteredLaptops(filtered); // 필터링된 결과 저장
    };

    applyFilters();
}, [selectedFilters, laptops]); // laptops 또는 selectedFilters가 변경될 때 동작


    console.log("SelectLaptopPage is rendered");








    return (
        <div className="outer-container">

            <h2>
                filtered by
            </h2>
            <div className="filter-options">
                <div className="specification-box">
                    {Object.entries(selectedFilters).map(([filterType, filterValue]) => (
                        <div
                            key={filterType}
                            className="specification-item"
                            onClick={() => handleFilterClick(filterType, filterValue)}
                        >
                            {filterValue !== "All" ? (
                                <>
                                    <span className="filter-label">{filterType}</span>
                                    <span className="filter-value">{filterValue}</span>
                                </>
                            ) : (
                                "None"
                            )}
                        </div>
                    ))}
                </div>
            </div>
 


            <div className="laptop-list">
                {laptops.map((laptop, index) => (
                    <div
                        key={index}
                        className="laptop-item"
                        onClick={() => goToMarketPrice(laptop.name)}
                    >
                        <h3 className="laptop-name">{laptop.name}</h3>
                        <p className="laptop-specs">
                            {`${laptop.CPU}, SSD ${laptop.DISK}GB, ${laptop.RAM}GB RAM, ${laptop.INCH} inch`}
                        </p>
                    </div>
                ))}
            </div>




        </div>

    )
}

export default SelectLaptopPage