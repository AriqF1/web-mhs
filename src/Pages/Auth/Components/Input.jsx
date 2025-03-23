import React from 'react';
const Input = ({type, name, placeholder}) => {
  return <>                        
    <input type={type} name={name} placeholder={placeholder} 
    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"/>
  </>
}
export default Input;