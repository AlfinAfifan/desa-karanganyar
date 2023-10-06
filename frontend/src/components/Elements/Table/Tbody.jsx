import React from 'react';

const Tbody = ({ children }) => {
  return (
    <tbody>
      {/* row 1 */}
      <tr className="capitalize hover:bg-zinc-100">{children}</tr>
    </tbody>
  );
};

export default Tbody;
