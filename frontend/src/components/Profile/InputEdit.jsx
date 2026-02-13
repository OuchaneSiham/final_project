const InputEdit = ({ type, value, onChange, name }) => {
    return (
      <div className="flex flex-col gap-2 mb-6">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border-1 rounded-lg w-full px-4 py-1"
        />
      </div>
    );
  };
  
  export default InputEdit;