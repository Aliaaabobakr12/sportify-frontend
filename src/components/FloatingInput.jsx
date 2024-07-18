import React, { useState } from "react";

const FloatingInput = ({ placeholder, label, name, onChange, value }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        name={name}
        type="text"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(!!value)}
        onChange={onChange}
        className="border border-[#6c6c6c] p-2 rounded-md w-full bg-[#171717] text-white focus:border-[#27c6a9] focus:outline-none placeholder-transparent"
        placeholder={placeholder}
      />
      <label
        className={`absolute left-2 transition-all duration-300 pointer-events-none ${
          focused || value
            ? "text-xs -top-4 text-[#27c6a9]"
            : "text-[#6c6c6c] text-sm top-2.5"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
