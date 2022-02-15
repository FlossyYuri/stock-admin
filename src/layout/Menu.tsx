import React from 'react';
import MenuItem from '../components/MenuItem';

function Menu() {
  return (
    <header className='w-48 bg-gray-100 flex flex-col'>
      <MenuItem to='/abc' title='Método ABC' />
      <MenuItem to='/economic' title='Lote Econômico' />
      <MenuItem to='/table' title='Tabela de Classificação' />
      <div className='flex-1 flex flex-col justify-end pb-4 px-4 text-left text-sm'>
        <p className='font-semibold text-gray-400'>Desenvolvido por:</p>
        <p className='font-semibold text-pink-500'>Émerson Cuambe</p>
        <p className='font-semibold text-pink-500'>20190749</p>
        <p className='font-semibold text-gray-400'>Docentes:</p>
        <p className='font-semibold text-pink-500'>
          Orbay Nallá & Orlando Klironomos
        </p>
      </div>
    </header>
  );
}
export default Menu;
