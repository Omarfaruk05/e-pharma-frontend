const Input = ({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: any) => void;
}) => {
  return (
    <input
      required
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-2 text-gray-800 focus:outline-none rounded-md w-full"
    />
  );
};

export default Input;
