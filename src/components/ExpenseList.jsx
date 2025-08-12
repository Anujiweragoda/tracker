import React, { useState } from 'react';

export default function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Expense List</h2>
        <p className="text-gray-500 text-center py-8">No expenses added yet.</p>
      </div>
    );
  }

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      category: expense.category
    });
  };

  const handleSaveEdit = () => {
    if (editForm.description.trim() && editForm.amount && !isNaN(editForm.amount)) {
      onEditExpense(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Expense List ({expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'})
      </h2>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            {editingId === expense.id ? (
              // Edit Mode
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="border rounded px-2 py-1 text-sm"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    className="border rounded px-2 py-1 text-sm"
                    placeholder="Amount"
                  />
                </div>
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{expense.description}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {expense.category}
                    </span>
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900">
                    Rs.{typeof expense.amount === 'number' ? expense.amount.toFixed(2) : expense.amount}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="text-blue-500 hover:text-blue-700 p-1 text-sm"
                      title="Edit expense"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this expense?')) {
                          onDeleteExpense(expense.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 p-1 text-sm"
                      title="Delete expense"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}