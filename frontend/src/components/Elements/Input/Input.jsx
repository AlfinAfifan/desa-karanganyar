import React from 'react';

const Input = ({ name, label, placeholder, type, colSpan, colStart, onChange, value }) => {
  return (
    <div className={`flex flex-col gap-1 ${colSpan} ${colStart}`}>
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} type={type} placeholder={placeholder} id={name} value={value} required className="input input-bordered border-slate-600 w-full" />
    </div>
  );
};

export default Input;
