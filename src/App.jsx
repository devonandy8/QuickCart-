import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
