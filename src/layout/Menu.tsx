import React from 'react';
import MenuItem from '../components/MenuItem';

function Menu() {
  return (
    <header className='w-48 bg-gray-100 flex flex-col'>
      <MenuItem to='/abc' title='Método ABC' />
      <MenuItem to='/economic' title='Lote Econômico' />
      <MenuItem to='/table' title='Tabela de Classificação' />
    </header>
  );
}
export default Menu;
