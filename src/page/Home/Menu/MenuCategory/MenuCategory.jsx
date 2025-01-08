import React from 'react';
import MenuItem from '../../../shared/MenuItem/MenuItem';
import Cover from '../../../shared/Navbar/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, coverImg }) => {
  console.log(title);
  return (
    <div>
      {title && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 my-10 gap-4">
        {items.map(item => (
          <MenuItem key={item} items={item}></MenuItem>
        ))}
      </div>
        <Link to={`/order/${title}`}>Order now</Link>
    </div>
  );
};

export default MenuCategory;
