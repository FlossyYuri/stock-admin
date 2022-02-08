import React from 'react';

interface Props {
  children: any;
}
function Title({ children }: Props) {
  return <h1 className='font-semibold text-pink-500 text-lg'>{children}</h1>;
}
export default Title;
