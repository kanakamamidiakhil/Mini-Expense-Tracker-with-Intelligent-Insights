// src/pages/ExpenseList.js
import React, { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/api';
import ExpenseItem from '../components/ExpenseItem';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getExpenses = async () => {
      const response = await fetchExpenses(pageNo, pageSize);
      setExpenses(response.data);
    };
    getExpenses();
  }, [pageNo, pageSize]);

  const handleDelete = async (id) => {
    // Handle deleting expense
  };

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map(exp => (
        <ExpenseItem key={exp.id} expense={exp} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ExpenseList;
