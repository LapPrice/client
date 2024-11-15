import React, {useState, useEffect} from "react";
import './SpecificationBox.css'
import {useNavigate} from "react-router-dom";



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
  
        const navigate = useNavigate();
        const [selectedFilters, setSelectedFilters] = useState({});
        const[laptops, setlaptops] = useState<Laptop[]>([]);


        //marketPrice 이동하는 page 
        const goToMarketPrice = (laptopName) => {
            //특정 laptopName을 parameter로 이용
            navigate('/marketPrice?name=$(laptopName)') //'/marketPrice?name=$(laptopName)'는 url => ex) SAMSUNG ion2 면 /marketPrice?name=SAMSUNG ion2 가 url이 됌.
        }
    
        const handleFilterClick = (filterType: string, filterValue: string) => {
            setSelectedFilters((prevFilters) => {
              const newFilters = { ...prevFilters };
              if (newFilters[filterType] === filterValue) {
                delete newFilters[filterType];  // 이미 선택된 필터는 삭제
              } else {
                newFilters[filterType] = filterValue;  // 새 필터를 추가
              }
              return newFilters;
            });
          };
    //필터 선택 filterType = ex) CPU, GPU... filterValue = ex) i3, GTX 
    //LaptopFilterList object => 동적 필터링?  


   
   
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




    console.log("SelectLaptopPage is rendered");

    return (
        <div className="outer-container">
           
            <h2>
                filtered by 
            </h2>
          

        


            <div className="filter-options">
                <div className="specification-box">
                    <div className="specification-item" onClick={() => handleFilterClick("brand", "Samsung")}>Samsung</div>
                    <div className="specification-item" onClick={() => handleFilterClick("cpu", "i3")}>i3</div>
                    <div className="specification-item" onClick={() => handleFilterClick("ram", "16GB")}>16GB</div>
                    <div className="specification-item" onClick={() => handleFilterClick("storage", "128GB")}>128GB</div>
                    <div className="specification-item" onClick={() => handleFilterClick("screen", "17")}>17</div>
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
