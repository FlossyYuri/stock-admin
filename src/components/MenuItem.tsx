import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  title: string;
}
function MenuItem({ to, title }: Props) {
  return (
    <NavLink
      className='transition-all h-20 px-8 hover:border-l-4 hover:border-pink-500 flex items-center justify-center uppercase text-gray-400 font-semibold hover:bg-white '
      to={to}
    >
      {title}
    </NavLink>
  );
}
export default MenuItem;
