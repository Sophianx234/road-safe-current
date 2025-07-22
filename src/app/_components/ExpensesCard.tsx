import React from 'react';
import { FaGasPump, FaOilCan, FaCarCrash, FaRoad } from 'react-icons/fa';

interface ExpenseCardProps {
  title?: string;
  amount?: number;
  icon?: 'gas' | 'oil' | 'wash' | 'toll';
  color?: string;
}

const ExpenseCard  = ({ title='damian', amount=1433, icon='oil', color }:ExpenseCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'gas':
        return <FaGasPump size={24} color="#007BFF" />;
      case 'oil':
        return <FaOilCan size={24} color="#28A745" />;
      case 'wash':
        return <FaCarCrash size={24} color="#6F42C1" />;
      case 'toll':
        return <FaRoad size={24} color="#FFC107" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-${color}  p-6 border-gray-200 shadow rounded-lg text-center  flex  justify-center items-center`}>
      {getIcon()}
      <div >

      <h3 className='mt-2 text-lg text-gray-800'>{title}</h3>
      <p className='text-2xl font-bold text-gray-800' >${amount}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;