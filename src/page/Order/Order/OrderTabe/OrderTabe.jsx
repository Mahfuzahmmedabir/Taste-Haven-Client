import React from 'react';
import FoodCard from '../../../../components/FoodCard/FoodCard';

const OrderTabe = ({ items }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(items => (
          <FoodCard key={items._id} items={items}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default OrderTabe;
