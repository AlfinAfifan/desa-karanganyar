import React from 'react';

const Card = ({ children }) => {
  return <div className="bg-cyan-600 shadow-lg text-white py-4 px-3 w-full h-32 rounded-xl flex justify-center items-center cursor-pointer">{children}</div>;
};

export default Card;
