import React from 'react';
import { resolveNestedAtribute } from '../../utils';

interface Props {
  header: any;
  items: any[];
}
const CustomTable = ({ header, items = [] }: Props) => {
  return (
    <div className='w-full overflow-x-auto'>
      <table className='mt-8 border-collapse w-full rounded overflow-x-scroll text-left shadow'>
        <thead className='text-pink-500'>
          <tr className='shadow-sm'>
            {header.map((head: any) => (
              <th className='font-semibold p-4' key={head.key}>
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, index: number) => (
            <tr
              className='transition-all hover:shadow-pink odd:bg-pink-50'
              key={item.id}
            >
              {header.map((head: any) => (
                <td className='p-4' key={head.key}>
                  {head.component
                    ? head.component(item)
                    : resolveNestedAtribute(item, head.key)}
                </td>
              ))}
            </tr>
          ))}
          {items?.length === 0 ? (
            <tr>
              <td colSpan={header.length}>
                <p className='text-center mb-4'>Nenhum registo encontrado!</p>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
export default CustomTable;
