// src/components/ExpenseItem.js
import React from 'react';
import Button from './Button';

const ExpenseItem = ({ expense, onDelete, onEdit }) => {
  return (
    <div style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h3>{expense.category}</h3>
      <p>{expense.description}</p>
      <p>${expense.amount}</p>
      <Button onClick={() => onEdit(expense.id)}>Edit</Button>
      <Button onClick={() => onDelete(expense.id)} style={{ marginLeft: '8px' }}>Delete</Button>
    </div>
  );
};

export default ExpenseItem;
