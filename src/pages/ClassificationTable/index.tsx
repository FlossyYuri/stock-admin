import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import CustomTable from '../../components/inputs/CustomTable';
import TextInput from '../../components/inputs/TextInput';
import Title from '../../components/Title';
import { useABCTable } from '../../context';

type Inputs = {
  a: number;
  b: number;
  c: number;
};
export const headersABC = [
  {
    key: 'class',
    label: 'Classe',
  },
  {
    key: 'value',
    label: '% Valor em Estoque',
  },
];

function ClassificationTable() {
  const { table, setTable } = useABCTable() as any;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    Object.keys(data).forEach((key: any) => {
      setValue(key, data[key]);
    });
    setTable(data);
  };
  useEffect(() => {
    Object.keys(table).forEach((key: any) => {
      setValue(key, table[key]);
    });
  }, []);

  return (
    <div className='w-full p-8 text-left'>
      <Title>Tabela de classificação</Title>
      <div className='grid grid-col-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Porcentagem do valor em stock</h2>
          <TextInput
            name='a'
            type='number'
            label='Classe A (%)'
            placeholder='80%'
            error={errors.a?.message}
            register={register}
          />
          <TextInput
            name='b'
            type='number'
            label='Classe B (%)'
            placeholder='15%'
            error={errors.b?.message}
            register={register}
          />
          <TextInput
            name='c'
            type='number'
            label='Classe C (%)'
            placeholder='5%'
            error={errors.c?.message}
            register={register}
          />
          <Button>Salvar</Button>
        </form>
        <div>
          <CustomTable
            header={headersABC}
            items={[
              { class: 'A', value: table.a },
              { class: 'B', value: table.b },
              { class: 'C', value: table.c },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
export default ClassificationTable;
