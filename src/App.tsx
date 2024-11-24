import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import SelectOption from "./selectOptionPage/selectOption";
import { OptionProvider } from "./selectOptionPage/OptionContext";

const App = () => {
  return (
    <OptionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/select-option" element={<SelectOption />} />
        </Routes>
      </Router>
    </OptionProvider>
  );
};

export default App;
