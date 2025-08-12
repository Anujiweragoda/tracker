import React from 'react';

export default function FilterBar({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  timePeriods = ['Day', 'Week', 'Month'],
  selectedTimePeriod = 'Week',
  onTimePeriodChange
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Time Period Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Filter by Time Period</h3>
        <div className="flex gap-2">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => onTimePeriodChange(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedTimePeriod === period
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}