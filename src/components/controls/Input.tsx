import React, { LegacyRef } from 'react';

interface IInputArgs extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputArgs>(function Input(
  { label, placeholder = '', type = 'text', className = '', ...props },
  ref: LegacyRef<HTMLInputElement>
) {
  const id = React.useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
