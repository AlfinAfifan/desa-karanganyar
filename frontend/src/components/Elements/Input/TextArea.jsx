import React from 'react';

const TextArea = ({ name, label, placeholder, colSpan }) => {
  return (
    <div className={`flex flex-col gap-1 ${colSpan}`}>
      <label htmlFor={name}>{label}</label>
      <textarea placeholder={placeholder} className="textarea textarea-bordered textarea-sm w-full border-slate-600"></textarea>
    </div>
  );
};

export default TextArea;
