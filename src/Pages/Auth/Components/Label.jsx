import React from "react";

const Label = ({htmlFor, text, children}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{text}
        {children}
      </label>
    </>
  );
}
export default Label;