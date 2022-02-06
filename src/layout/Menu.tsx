import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuItem from '../components/MenuItem';

function Menu() {
  return (
    <header className='w-48 bg-gray-100 flex flex-col'>
      <MenuItem to='/abc' title='Método ABC' />
      <MenuItem to='/economic' title='Lote Econômico' />
      <NavLink className='' to={`/economic`}>
        Lote Econômico
      </NavLink>
    </header>
  );
}
export default Menu;
