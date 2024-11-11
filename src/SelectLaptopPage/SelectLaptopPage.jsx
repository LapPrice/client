import React from "react";
import './SelectLaptopText'
import './SelectLaptopPage'
import './SpecificationBox'
import {useNavigate} from "react-router-dom";


const SelectLaptopPage = () => {

    const LaptopList = ({ laptops }) => {
        const navigate = useNavigate();

        //marketPrice 이동하는 page 
        const goToMarketPrice = (laptopName) => {
            //특정 laptopName을 parameter로 이용
            navigate('/marketPrice?name=$(laptopName')
        }
    }


    const selectedFilters ={};


    document.querySelectorAll('.speicification-item').forEach(item => {
        item.addEventListener( 'click', ()=> {
            const filterType = item.getAttribute('data-type'); // filtering type (ex : cpu, gpu)
            const filterValue = item.getAttribute('data-value'); // filtering value ( ex : i3, gtx..)

            if(selectedFilters[filterType] === filterValue) { // 이미 선택된 필터면 선택 해제
                delete selectedFilters[filterType];
                item.classList.remove('selected');
            } else { // 새로운 필터링이면 새 선택  추가
                selectedFilters[filterType] = filterValue;
                document.querySelectorALL('.specification-item[data-type = "${filterType}"]')
                    .forEach(btn => btn.classList.remove('selected'));
                item.classList.add('selected');
            }
            // updateLaptopList(); 필터 조건으로 노트북 update    
       });
    });


    // DB 필터링된 노트북 목록을 가져옴 그래서 psudo code로 씀.. 안돌아갈수도 있어 ㅠㅠ 
    // async function updateLaptopList() {
    //     try {
    //         const response = await fetch(' 서버 엔드포인트 ( ex) /api/laptops)', { 이부분이랑 const laptops 가 get요청을 하여 데이터를 가져옴.
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(selectedFilters)
    //         }); 여기까지 데이터를 가져오는 부분 



    // const response = await fetch('https://example.com', { 
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(selectedFilters)
    // });  여기는 만약 서버가 관리하면 URL이용 
    


    //         const laptops = await response.json();
                
    //         const laptopList = document.querySelector('.laptop-list');
    //         laptopList.innerHTML = '';
    
    //         laptops.forEach(laptop => {
    //             const item = document.createElement('div');
    //             item.className = 'laptop-item';
    //             item.textContent = `${laptop.name}, ${laptop.specifications}`;
    //             laptopList.appendChild(item);
    //         });
    //     } catch (error) {
    //         console.error('Error fetching laptops:', error);
    //     }
    // }








    return (
        <div className="specification-box">
            <div class="specification-box">
                <div class="specification-item" data-type="brand" data-value="Samsung">Samsung</div>
                <div class="specification-item" data-type="cpu" data-value="i3">i3</div>
                <div class="specification-item" data-type="gpu" data-value="GTX 1650">GTX 1650</div>
                <div class="specification-item" data-type="ram" data-value="16GB">16GB</div>
                <div class="specification-item" data-type="storage" data-value="128GB">128GB</div>
                <div class="specification-item" data-type="os" data-value="Free DOS">Free DOS</div>
                <div class="specification-item" data-type="screen" data-value="17">17</div>
            </div>

            <div className="laptop-list">
                {laptops.map((laptop, index) => (
                    <div
                        key={index}
                        className="laptop-item"
                        onClick={() => goToMarketPrice(laptop.name)}
                    >
                        <h3>{laptop.name}</h3>
                        <p>{laptop.specifications}</p>
                        <p>{laptop.price}</p>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default SelectLaptopPage