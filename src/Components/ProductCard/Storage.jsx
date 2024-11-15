import React, { useState } from 'react';

const Storage = () => {
  const [selectedStorage, setSelectedStorage] = useState('');
  const storages = ['64GB', '128GB', '256GB', '512GB', '1TB'];

  return (
    <div className="flex flex-col items-start">
      <div className="mb-2 text-gray-700 font-semibold">
        STYLE STORAGE: {selectedStorage}
      </div>
      <div className="flex gap-2">
        {storages.map((storage) => (
          <label
            key={storage}
            className={`
              w-8 h-8 flex items-center justify-center
              border border-gray-300 cursor-pointer
              ${selectedStorage === storage ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
            `}
          >
            <input
              type="radio"
              name="storage"
              value={storage}
              checked={selectedStorage === storage}
              onChange={() => setSelectedStorage(storage)}
              className="sr-only"
            />
            <span className="text-sm">{storage}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Storage;