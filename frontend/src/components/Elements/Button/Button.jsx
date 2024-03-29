import React from 'react';

const Button = ({ children, bgColor = 'bg-black', border, hoverBgColor, textColor = 'text-white', onClick, type = 'submit' }) => {
  return (
    <button onClick={onClick} type={type} className={`py-2 px-4 text-base rounded-lg font-semibold flex items-center justify-center gap-2 ${bgColor} ${border} ${hoverBgColor} ${textColor} `}>
      {children}
    </button>
  );
};

export default Button;
