import React from "react";

const Button = ({type ="submit", children}) => {
    return (
        <button type={type} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            {children}
        </button>
    );
};
export default Button;