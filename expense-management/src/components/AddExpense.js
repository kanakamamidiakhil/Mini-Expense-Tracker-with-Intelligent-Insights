import React, { useState } from "react";
import API from "../utils/api";
import { TextField, Button, MenuItem, Box, Typography, Alert } from "@mui/material";

const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

const AddExpense = () => {
  const [expense, setExpense] = useState({ amount: "", category: "", date: "", description: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.category || !expense.date) {
      setMessage({ type: "error", text: "Fill required fields!" });
      return;
    }

    try {
      await API.post("/expenses/", expense);
      setMessage({ type: "success", text: "Expense added!" });
      setExpense({ amount: "", category: "", date: "", description: "" });
    } catch {
      setMessage({ type: "error", text: "Error adding expense!" });
    }
  };

  return (
    <Box maxWidth={400} mx="auto" p={3} border={1} borderRadius={2}>
      <Typography variant="h5">Add Expense</Typography>
      {message.text && <Alert severity={message.type}>{message.text}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Amount" name="amount" type="number" value={expense.amount} onChange={handleChange} fullWidth required margin="normal" />
        <TextField label="Category" name="category" select value={expense.category} onChange={handleChange} fullWidth required margin="normal">
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        <TextField label="Date" name="date" type="date" value={expense.date} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Description" name="description" value={expense.description} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
      </form>
    </Box>
  );
};

export default AddExpense;
