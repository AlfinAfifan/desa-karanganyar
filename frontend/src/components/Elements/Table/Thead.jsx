import React from 'react';

const Thead = ({ children }) => {
  return (
    <thead className="bg-slate-200 text-xs text-slate-500">
      <tr>{children}</tr>
    </thead>
  );
};

export default Thead;
