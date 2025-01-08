import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featured from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
 
  return (
    <div className="featured bg-fixed mt-12">
      <SectionTitle
        subHeading={'check it out'}
        heading={'featured items'}
      ></SectionTitle>
      <div className="md:flex justify-center items-center text-white py-8 gap-9 px-16">
        <div>
          <img src={featured} alt="" />
        </div>
        <div>
          <p>Agu 20 2999</p>
          <p className=" uppercase">Where can i get some?</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus molestias sapiente soluta aliquid aliquam consequuntur,
            veritatis, sunt et adipisci velit vero eaque tempore ipsam
            praesentium recusandae placeat ea laborum sed.
          </p>
          <button className=" text-white border-b-4 btn-outline ">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
