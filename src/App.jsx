import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Summary from "./components/Summary.jsx";
import { categories } from "./constants/categories.js";

const STORAGE_KEY = "expense-tracker-data";

export default function App() {
  // Load expenses from localStorage on initial load
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem(STORAGE_KEY);
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    } catch (error) {
      console.error("Error loading expenses from localStorage:", error);
      return [];
    }
  });

  const [filterCategory, setFilterCategory] = useState("All");
  const [timePeriod, setTimePeriod] = useState("Week");

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving expenses to localStorage:", error);
    }
  }, [expenses]);

  const handleAddExpense = (expense) => {
    const newExpense = {
      id: Date.now(),
      ...expense,
      amount: parseFloat(expense.amount) // Ensure amount is a number
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id
          ? { ...expense, ...updatedExpense, amount: parseFloat(updatedExpense.amount) }
          : expense
      )
    );
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  const handleClearAllExpenses = () => {
    if (window.confirm("Are you sure you want to delete all expenses? This cannot be undone.")) {
      setExpenses([]);
    }
  };

  // Filter by category
  const filteredByCategory =
    filterCategory === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory);

  // Filter by time period
  const today = new Date();
  const filteredExpenses = filteredByCategory.filter((exp) => {
    const expenseDate = new Date(exp.date);

    if (timePeriod === "Day") {
      return expenseDate.toDateString() === today.toDateString();
    } else if (timePeriod === "Week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      return expenseDate >= oneWeekAgo;
    } else if (timePeriod === "Month") {
      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Track your daily expenses</p>
        </div>

        <ExpenseForm onAddExpense={handleAddExpense} />

        <FilterBar
          categories={["All", ...categories]}
          selectedCategory={filterCategory}
          onCategoryChange={handleCategoryChange}
          selectedTimePeriod={timePeriod}
          onTimePeriodChange={handleTimePeriodChange}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />

        <Summary expenses={filteredExpenses} />

        {expenses.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleClearAllExpenses}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Clear All Expenses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
