import React from 'react';

interface TripEntry {
  time: string;
  location: string;
}

interface ExpenseEntry {
  vehicle: string;
  mileage: string;
  expenses: {
    left?: string;
    right?: string;
  };
}

export default function TripTracker(){
  // Sample data - in a real app, this would come from props or API
  const tripData: TripEntry[] = [
    { time: '10:24', location: 'Plot 46!, Boshiru Shittu St tu' },
    { time: '11:34', location: 'Industrial St tu SIB Ashiru' },
    { time: '10:24', location: 'Plot 46!, Boshiru Shittu St tu' },
    { time: '11:34', location: 'Industrial St tu SIB Ashiru' },
    { time: '10:24', location: 'Plot 46!, Boshiru Shittu St tu' },
    { time: '11:34', location: 'Industrial St tu SIB Ashiru' },
    { time: '10:24', location: 'Plot 46!, Boshiru Shittu St tu' },
    { time: '11:34', location: 'Industrial St tu SIB Ashiru' },
  ];

  const expenseData: ExpenseEntry[] = [
    { vehicle: 'Polestor 520', mileage: '486 KM', expenses: { left: 'Gas Station $500', right: 'Oil $250' } },
    { vehicle: 'Polestor 520', mileage: '486 KM', expenses: { left: 'Wash $400', right: 'Toll $300' } },
    { vehicle: 'Polestor 520', mileage: '486 KM', expenses: {} },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      {/* Last Trip Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Last Trip</h2>
        <div className="space-y-4">
          {tripData.map((trip, index) => (
            <div key={index} className="flex items-start">
              <span className="font-medium text-gray-700 w-14">{trip.time}</span>
              <span className="text-gray-600">{trip.location}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* See All Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">See All</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-2">All Expenses</th>
              <th className="text-right pb-2">+ Add New</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense, index) => (
              <div key={index}>
                <tr>
                  <td colSpan={2} className="pt-3 font-medium">
                    {expense.vehicle}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="pb-2 text-sm text-gray-600">
                    {expense.mileage}
                  </td>
                </tr>
                <tr>
                  <td className="pb-4">
                    {expense.expenses.left && (
                      <span className="inline-block bg-gray-100 rounded px-2 py-1 text-sm">
                        {expense.expenses.left}
                      </span>
                    )}
                  </td>
                  <td className="text-right pb-4">
                    {expense.expenses.right && (
                      <span className="inline-block bg-gray-100 rounded px-2 py-1 text-sm">
                        {expense.expenses.right}
                      </span>
                    )}
                  </td>
                </tr>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

