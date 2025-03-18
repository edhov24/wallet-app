import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsList from "./components/TransactionsList";
import TransactionDetail from "./components/TransactionDetail";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<TransactionsList />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </Router>
  );
};

export default App;
