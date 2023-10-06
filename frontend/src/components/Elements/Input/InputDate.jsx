import React from 'react';

const InputDate = ({ label, name, colSpan }) => {
  return (
    <div className={`flex flex-col w-48 gap-1 ${colSpan}`}>
      <label htmlFor={name}>{label}</label>
      <input type="date" className="input input-bordered border-slate-600 w-full max-w-xs" />
    </div>
  );
};

export default InputDate;
