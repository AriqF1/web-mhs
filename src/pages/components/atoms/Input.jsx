const Input = ({ type, name, placeholder, value, onChange, className }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={
          "w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${className}"
        }
      />
    </>
  );
};
export default Input;
