import React from 'react';

const InputFile = ({ label, name, onChange, value, required, accept }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input type="file" id={name} name={name} onChange={onChange} value={value} required={required} accept={accept} className="file-input file-input-bordered border-slate-600 w-full" />
    </div>
  );
};

export default InputFile;
