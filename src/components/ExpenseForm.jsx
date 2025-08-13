import React, { useState } from "react";
import { categories } from "../constants/categories";

export default function ExpenseForm({ onAddExpense }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    category: categories[0],
    amount: "",
    date: today,
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const amountValue = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else if (new Date(formData.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative input for amount at typing level
    if (name === "amount" && value.startsWith("-")) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddExpense({
        ...formData,
        amount: parseFloat(formData.amount),
      });

      setFormData({
        category: categories[0],
        amount: "",
        date: today,
        description: "",
      });

      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            min="0.1"
            step="0.1"
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.amount ? "border-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            max={today}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
