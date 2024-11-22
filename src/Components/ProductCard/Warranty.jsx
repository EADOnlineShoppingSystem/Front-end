import React, { useState } from 'react';

const Warranty = () => {
  const [selectedWarranty, setSelectedWarranty] = useState('');
  const warranties = ['1 Year Apple Care Warranty'];

  return (
    <div className="flex flex-col items-start">
      <div className="mb-2 text-gray-700 font-semibold">
        STYLE WARRANTY: {selectedWarranty}
      </div>
      <div className="flex gap-2">
        {warranties.map((warranty) => (
          <label
            key={warranty}
            className={`
              w-8 h-8 flex items-center justify-center
              border border-gray-300 cursor-pointer
              ${selectedWarranty === warranty ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
            `}
          >
            <input
              type="radio"
              name="warranty"
              value={warranty}
              checked={selectedWarranty === warranty}
              onChange={() => setSelectedStorage(warranty)}
              className="sr-only"
            />
            <span className="text-sm">{warranty}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Warranty;