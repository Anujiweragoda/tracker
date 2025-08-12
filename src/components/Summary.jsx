import React from 'react';

export default function Summary({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-gray-500">No expenses to summarize.</p>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, expense) => {
    const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
    return sum + amount;
  }, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      
      <div className="mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Total Expenses</h3>
          <p className="text-3xl font-bold text-blue-600">Rs.{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">By Category</h3>
        <div className="space-y-2">
          {sortedCategories.map(([category, amount]) => (
            <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{category}</span>
              <div className="text-right">
                <span className="text-lg font-semibold">Rs.{amount.toFixed(2)}</span>
                <div className="text-sm text-gray-600">
                  {((amount / totalAmount) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}