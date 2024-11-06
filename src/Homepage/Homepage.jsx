import React from 'react';
import {useNavigate} from'react-router-dom';
import HomepageImage from './HompageBackground/HomepageBackground';
import './Homepage.css'
import './SpecificationByText.css';
import './SpecificationBox.css';
import './GoButton.css'

const Homepage = () => {
    const navigate = useNavigate;

    const goToSpecificationSelect = () => {
        navigate('/select-specification');
    };

    return (
        <div className = "Home">
            <HomepageImage />
            <div>
                <h1 className = "specification-text">
                    specification by
                </h1>
            </div>
            <div onClick = {goToSpecificationSelect} style = {{cursor : 'pointer'}}>
                <div className = "specification-box">
                    <span className = "specification-item">Brand</span>
                    <span className = "specification-item">CPU</span>
                    <span className = "specification-item">GPU</span>
                    <span className = "specification-item">SSD</span>
                    <span className = "specification-item">RAM</span>
                    <span className = "specification-item">OS</span>
                    <span className = "specification-item">INCH</span>
                    <span className = "specification-item"></span>
                </div>
            </div>
            <button className = "send-button">GO!</button>
        </div>
    );
}

export default Homepage;