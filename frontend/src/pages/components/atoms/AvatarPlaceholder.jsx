const AvatarPlaceholder = ({ text }) => (
  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
    {text.charAt(0)}
  </div>
);
export default AvatarPlaceholder;
