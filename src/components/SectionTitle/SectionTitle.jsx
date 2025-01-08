import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center md:w-4/12 mx-auto mb-10">
      <p className="text-yellow-600 mb-3">---{subHeading}---</p>
      <h2 className="text-3xl uppercase border-y-4 py-5 ">{heading}</h2>
    </div>
  );
};

export default SectionTitle;
