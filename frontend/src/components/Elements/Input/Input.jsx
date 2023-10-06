import React from 'react';

const Input = ({ name, label, placeholder, type, colSpan, onChange, value }) => {
  return (
    <div className={`flex flex-col gap-1 ${colSpan}`}>
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} type={type} placeholder={placeholder} name={name} value={value} className="input input-bordered border-slate-600 w-full" />
    </div>
  );
};

export default Input;
