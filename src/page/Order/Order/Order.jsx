import React, { useState } from 'react';
import Cover from '../../shared/Navbar/Cover/Cover';
import orderImg from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';

import OrderTabe from './OrderTabe/OrderTabe';
import { useParams } from 'react-router-dom';

const Order = () => {
  const [menu] = useMenu();
  const { category } = useParams()
  console.log(category)
  const dessert = menu.filter(item => item.category === 'dessert');
  const pizza = menu.filter(item => item.category === 'pizza');
  const offered = menu.filter(item => item.category === 'offered');
  const salad = menu.filter(item => item.category === 'salad');
  console.log(salad)
  const soup = menu.filter(item => item.category === 'soup');
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="py-16">
      <Cover img={orderImg} title={'Order Now'}></Cover>
      <div className="py-10">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={index => setTabIndex(index)}
        ></Tabs>
        <Tabs>
          <TabList>
            <Tab>Dessert</Tab>
            <Tab>Pizza</Tab>
            <Tab>Salad</Tab>
            <Tab>Soup</Tab>
          </TabList>
          <TabPanel>
            <OrderTabe items={dessert}></OrderTabe>
          </TabPanel>
          <TabPanel>
            <OrderTabe items={pizza}></OrderTabe>
          </TabPanel>
          <TabPanel>
            <OrderTabe items={salad}></OrderTabe>
          </TabPanel>
          <TabPanel>
            <OrderTabe items={soup}></OrderTabe>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
