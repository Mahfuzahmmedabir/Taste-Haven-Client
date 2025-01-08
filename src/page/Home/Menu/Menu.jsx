import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Navbar/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const Menu = () => {
  const [menu] = useMenu();

  const dessert = menu.filter(item => item.category === 'dessert');
  const pizza = menu.filter(item => item.category === 'pizza');
  const offered = menu.filter(item => item.category === 'offered');
  const salad = menu.filter(item => item.category === 'salad');
  const soup = menu.filter(item => item.category === 'soup');

  console.log(pizza);
  console.log(dessert);
  console.log(offered);
  // const dessert = menu.filter(item => item.dessert === 'dessert')

  return (
    <div className="py-16">
      <Helmet>
        <title>Bisto Boos || Menu</title>
      </Helmet>
      <Cover img={menuImg} title={'Our Menu'}></Cover>
      {/* main section */}
      <SectionTitle
        subHeading={"Don't Miss "}
        heading={"Today'Offer"}
      ></SectionTitle>
      {/* Offerd section */}

      <MenuCategory items={offered}></MenuCategory>

      {/* Offerd section */}
      <MenuCategory
        items={dessert}
        title={'Dessert'}
        coverImg={dessertImg}
      ></MenuCategory>

      <MenuCategory
        items={salad}
        title={'Salad'}
        coverImg={saladImg}
      ></MenuCategory>
      <MenuCategory
        items={pizza}
        title={'pizza'}
        coverImg={pizzaImg}
      ></MenuCategory>
      <MenuCategory
        items={soup}
        title={'Soup'}
        coverImg={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
