import React from 'react';

const ButtonIcon = ({ children, bgColor, hoverBgColor, textColor = 'text-black', onClick }) => {
  return (
    <button onClick={onClick} type="submit" className={`py-2 px-2 rounded-lg font-semibold flex items-center gap-2 ${bgColor} ${hoverBgColor} ${textColor}`}>
      {children}
    </button>
  );
};

export default ButtonIcon;
