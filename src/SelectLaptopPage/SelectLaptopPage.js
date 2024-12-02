import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./SpecificationBox.css";
import { useNavigate } from "react-router-dom";
import { useOption } from "../selectOptionPage/OptionContext";
const SelectLaptopPage = () => {
    const { options } = useOption(); // OptionContext에서 필터링 데이터 가져오기
    const [laptops, setLaptops] = useState([]); // 전체 노트북 목록
    const [filteredLaptops, setFilteredLaptops] = useState([]); // 필터링된 목록
    const navigate = useNavigate();
    // 노트북 목록을 가져오는 useEffect
    useEffect(() => {
        const fetchLaptopList = async () => {
            try {
                const response = await fetch("/api/laptopList.json"); // public 폴더의 laptopList.json
                const data = await response.json();
                setLaptops(data);
            }
            catch (error) {
                console.error("Error loading laptop list:", error);
            }
        };
        fetchLaptopList();
    }, []);
    // 필터링 로직을 적용하는 useEffect
    useEffect(() => {
        const applyFilters = () => {
            const filtered = laptops.filter((laptop) => {
                // "ALL"인 경우 필터를 무시
                if (options.Brand !== "ALL" && laptop.brand !== options.Brand)
                    return false;
                if (options.CPU !== "ALL" && laptop.CPU !== options.CPU)
                    return false;
                if (options.RAM !== "ALL" && laptop.RAM !== parseInt(options.RAM))
                    return false;
                if (options.GPU !== "ALL" && laptop.GPU !== options.GPU)
                    return false;
                if (options.SSD !== "ALL" && laptop.DISK !== parseInt(options.SSD))
                    return false;
                if (options.Inch !== "ALL" && laptop.INCH !== parseInt(options.Inch))
                    return false;
                return true;
            });
            setFilteredLaptops(filtered);
        };
        applyFilters();
    }, [options, laptops]);
    // 특정 노트북의 마켓 페이지로 이동 수정필요
    const goToMarketPrice = (laptopName) => {
        navigate(`/marketPrice`);
    };
    // 필터 옵션 재설정 페이지로 이동
    const handleFilterClick = () => {
        navigate("/select-option");
    };
    return (_jsxs("div", { className: "outer-container", children: [_jsx("h2", { children: _jsx("span", { children: "Filtered by:" }) }), _jsx("div", { className: "filter-options", children: _jsx("div", { className: "specification-box", children: Object.entries(options).map(([key, value]) => (_jsx("div", { className: "specification-item", onClick: handleFilterClick, children: _jsx("span", { className: "filter-value", children: value }) }, key))) }) }), _jsx("div", { className: "laptop-list", children: filteredLaptops.length > 0 ? (filteredLaptops.map((laptop, index) => (_jsxs("div", { className: "laptop-item", onClick: () => goToMarketPrice(laptop.name), children: [_jsx("h3", { className: "laptop-name", children: laptop.name }), _jsx("p", { className: "laptop-specs", children: `CPU :${laptop.CPU}, RAM :${laptop.RAM}GB, GPU :${laptop.GPU} , SSD :${laptop.DISK}GB, ${laptop.INCH} inch` })] }, index)))) : (_jsx("p", { children: "No laptops match the selected filters." })) })] }));
};
export default SelectLaptopPage;
