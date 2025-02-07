// src/pages/ExpenseStats.js
import React, { useEffect, useState } from 'react';
import { fetchExpenseStats } from '../services/api';

const ExpenseStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const response = await fetchExpenseStats();
      setStats(response.data);
    };
    getStats();
  }, []);

  return (
    <div>
      <h2>Expense Stats</h2>
      {stats ? (
        <div>
          <p>Total Expenses: ${stats.total}</p>
          <p>Category Breakdown:</p>
          {/* Render your stats here, such as a pie chart */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpenseStats;
