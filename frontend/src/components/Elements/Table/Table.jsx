import React from 'react';

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto rounded-t-xl mt-5">
      <table className="table text-base">{children}</table>
    </div>
  );
};

export default Table;
