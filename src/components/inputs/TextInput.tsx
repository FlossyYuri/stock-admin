import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  inputEvent?: (event: any) => any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  error?: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  rest?: InputHTMLAttributes<HTMLInputElement>;
}
const TextInput = ({
  name,
  label,
  type,
  placeholder,
  onChange,
  inputEvent,
  className,
  disabled,
  error,
  register,
  validation,
  rest,
}: Props) => {
  return (
    <div
      className={`text-input decoration flex flex-col items-start ${className}`}
    >
      <label htmlFor={name} className='font-semibold text-gray-400 mb-1'>
        {label}
      </label>
      <input
        className='transition-all bg-gray-100 px-4 py-2 rounded text-gray-500 font-semibold focus:ring-2 focus:ring-pink-300 focus:outline-none'
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
        {...rest}
      />
      {error ? <span>{error}</span> : null}
    </div>
  );
};
export default TextInput;
