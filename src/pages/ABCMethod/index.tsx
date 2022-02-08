import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import CustomTable from '../../components/inputs/CustomTable';
import TextInput from '../../components/inputs/TextInput';
import Title from '../../components/Title';
import { formatMoney } from '../../utils';

type Inputs = {
  id: string;
  cost: number;
  cmm: number;
};

const ABCTable = {
  a: 80,
  b: 15,
  c: 5,
};

export const headersABC = [
  {
    key: 'id',
    label: 'Código do produto',
  },
  {
    key: 'cost',
    label: 'Custo Unit.',
  },
  {
    key: 'cmm',
    label: 'CMM',
  },
  {
    key: 'value',
    label: 'Custo Total x CMM',
  },
  {
    key: 'class',
    label: 'Classificação %',
  },
  {
    key: 'class2',
    label: 'Class. crescente',
  },
  {
    key: 'classABC',
    label: 'Class. ABC',
  },
];

const items: { id: string; cost: number; cmm: number }[] = [
  {
    id: 'A001',
    cost: 100,
    cmm: 1000,
  },
  {
    id: 'A002',
    cost: 200,
    cmm: 300,
  },
  {
    id: 'A003',
    cost: 60,
    cmm: 500,
  },
  {
    id: 'A004',
    cost: 100,
    cmm: 1400,
  },
];

const getClass = (acc: number) => {
  if (acc <= ABCTable.a) return 'A';
  else if (acc > ABCTable.a && acc < ABCTable.a + ABCTable.b) return 'B';
  return 'C';
};

const generateRow = (
  {
    id,
    cost,
    cmm,
  }: {
    id: string;
    cost: number;
    cmm: number;
  },
  produtos: Inputs[],
  total: number
) => {
  const sums = [...produtos]
    .sort((a, b) => b.cmm * b.cost - a.cmm * a.cost)
    .reduce((prev, { id, cost, cmm }, index) => {
      prev[id] = {
        id,
        class2: index + 1,
        value: cost * cmm,
        class: Number((((cost * cmm) / total) * 100).toFixed(2)),
      };
      return prev;
    }, {} as any);
  Object.values(sums)
    .sort((a: any, b: any) => b.value - a.value)
    .reduce((prev, current: any) => {
      sums[current.id].acc = prev + current.class;
      return prev + current.class;
    }, 0);
  return {
    id,
    cost,
    cmm,
    value: sums[id].value,
    class: sums[id].class + '%',
    class2: sums[id].class2,
    classABC: getClass(sums[id].acc),
  };
};

function ABCMethod() {
  const [total, setTotal] = useState(0);
  const [produtos, setProduto] = useState<Inputs[]>(items);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    produtos.push(data);
    setProduto(produtos);
  };

  useEffect(() => {
    const total = produtos.reduce(
      (prev, current) => prev + current.cost * current.cmm,
      0
    );
    setTotal(total);
  }, []);

  return (
    <div className='w-full p-8 text-left'>
      <Title>Método ABC</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastre um produto</h2>
        <TextInput
          name='id'
          type='text'
          label='Código do Produto'
          placeholder='Ex: A0001'
          error={errors.id?.message}
          register={register}
        />
        <TextInput
          name='cost'
          type='number'
          label='Custo unitário'
          placeholder=''
          error={errors.cost?.message}
          register={register}
          validation={{ min: 0 }}
          rest={{ min: 0 }}
        />
        <TextInput
          name='cmm'
          type='number'
          label='Custo Médio Mensal'
          placeholder=''
          error={errors.cmm?.message}
          register={register}
          validation={{ min: 0 }}
          rest={{ min: 0 }}
        />
        <Button>Adicionar</Button>
      </form>
      <CustomTable
        header={headersABC}
        items={produtos.map((item) => generateRow(item, produtos, total))}
        lastItem={{
          id: items.length,
          value: formatMoney(total),
          class: '100%',
        }}
      />
    </div>
  );
}
export default ABCMethod;
