// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/expenses">
        <Button>View Expenses</Button>
      </Link>
    </div>
  );
};

export default Dashboard;
