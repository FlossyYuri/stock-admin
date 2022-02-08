import React from 'react';

interface Props {
  children: any;
}
function Button({ children }: Props) {
  return (
    <button className='transition-all mt-4 bg-pink-500 px-8 py-2 rounded text-white font-semibold uppercase hover:shadow-lg hover:px-10'>
      {children}
    </button>
  );
}
export default Button;
