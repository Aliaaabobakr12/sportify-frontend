import React, { useState } from "react";

const DropdownMenu = ({ items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(""); // State to manage selected item

  return (
    <div>
      <label htmlFor="governorate">Select a Governorate:</label>
      <select
        id="governorate"
        value={selectedItem}
        onChange={(e) => handleSelectItem(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="">Select...</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {selectedItem && <p className="mt-2">You selected: {selectedItem}</p>}
    </div>
  );
};

export default DropdownMenu;
