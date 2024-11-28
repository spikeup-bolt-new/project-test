import React from "react";
import FinancialReport from "../components/financial-report/FinancialReport";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <FinancialReport />
    </div>
  );
};

export default DashboardPage;
