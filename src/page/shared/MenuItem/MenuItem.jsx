import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';

const MenuItem = ({ items }) => {
  const { names } = useContext(AuthContext)

  
  const { name, recipe, image, category, price } = items;
  return (
    <div className="flex space-x-4">
      <img
        style={{ borderRadius: '0 200px 200px ' }}
        className="w-[100px]"
        src={image}
        alt=""
      />
      <div>
        <h3 className="uppercase">{name} -------</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-500">${price}</p>
    </div>
  );
};

export default MenuItem;
