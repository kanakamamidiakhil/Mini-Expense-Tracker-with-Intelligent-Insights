// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList';
import ExpenseStats from './pages/ExpenseStats';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/stats" element={<ExpenseStats />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
