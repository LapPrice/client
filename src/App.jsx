// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectLaptopPage from "./SelectLaptopPage/SelectLaptopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectLaptopPage />} />
      </Routes>
    </Router>
  );
}

export default App;
