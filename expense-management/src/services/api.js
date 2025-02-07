// src/services/api.js
import axiosInstance from './axios';

export const registerUser = (data) => {
  return axiosInstance.post('register/', data);
};

export const loginUser = (data) => {
  return axiosInstance.post('login/', data);
};

export const fetchExpenses = (pageNo, pageSize) => {
  return axiosInstance.get('expenses/', {
    headers: {
      'page-no': pageNo,
      'page-size': pageSize,
    }
  });
};

export const createExpense = (data) => {
  return axiosInstance.post('expenses/create/', data);
};

export const updateExpense = (id, data) => {
  return axiosInstance.put(`expenses/update/${id}/`, data);
};

export const deleteExpense = (id) => {
  return axiosInstance.delete(`expenses/delete/${id}/`);
};

export const fetchExpenseStats = () => {
  return axiosInstance.get('expenses/stats/');
};
