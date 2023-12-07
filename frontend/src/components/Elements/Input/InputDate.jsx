import React from 'react';

const InputDate = ({ label, name, colSpan, onChange, value }) => {
  return (
    <div className={`flex flex-col gap-1 ${colSpan}`}>
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} value={value} required type="date" className="input input-bordered border-slate-600 w-full " />
    </div>
  );
};

export default InputDate;
