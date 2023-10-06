import React from 'react';

const InputFile = ({ label, name, onChange, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input type="file" id={name} name={name} onChange={onChange} value={value} className="file-input file-input-bordered border-slate-600 w-full max-w-xs" />
    </div>
  );
};

export default InputFile;
