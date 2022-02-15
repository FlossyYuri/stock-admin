import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import CustomTable from '../../components/inputs/CustomTable';
import TextInput from '../../components/inputs/TextInput';
import Title from '../../components/Title';
import { calcPercentage, formatMoney } from '../../utils';

type Inputs = {
  id: string;
  cost: number;
  cmm: number;
};

const ABCTable = {
  a: 70,
  b: 20,
  c: 10,
};
export const headersABCClass = [
  {
    key: 'class',
    label: 'Classe',
  },
  {
    key: 'value',
    label: '% em Valor ',
  },
  {
    key: 'quantity',
    label: '% em Quantidade',
  },
];
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
    id: 'P1',
    cost: 4,
    cmm: 167,
  },
  {
    id: 'P2',
    cost: 3,
    cmm: 1167,
  },
  {
    id: 'P3',
    cost: 5,
    cmm: 83,
  },
  {
    id: 'P4',
    cost: 10,
    cmm: 34,
  },
  {
    id: 'P5',
    cost: 6,
    cmm: 58,
  },
  {
    id: 'P6',
    cost: 8,
    cmm: 13,
  },
  {
    id: 'P7',
    cost: 20,
    cmm: 142,
  },
  {
    id: 'P8',
    cost: 15,
    cmm: 33,
  },
  {
    id: 'P9',
    cost: 20,
    cmm: 15,
  },
  {
    id: 'P10',
    cost: 3,
    cmm: 23,
  },
];

const getClass = (acc: number, acc1: number) => {
  if (acc <= ABCTable.a) return 'A';
  else if (acc > ABCTable.a && acc < ABCTable.a + ABCTable.b) return 'B';
  if (
    Math.abs(acc - (ABCTable.b + ABCTable.a)) <
    Math.abs(acc1 - (ABCTable.b + ABCTable.a))
  ) {
    return 'B';
  }
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
      sums[current.id].acc1 = prev;
      sums[current.id].acc = prev + current.class;
      return prev + current.class;
    }, 0);
  const data = {
    id,
    cost,
    cmm,
    value: sums[id].value,
    class: sums[id].class + '%',
    class2: sums[id].class2,
    classABC: getClass(sums[id].acc, sums[id].acc1),
  };
  return data;
};

function ABCMethod() {
  const [total, setTotal] = useState(0);
  const [table, setTable] = useState<any>([
    { class: 'A', value: '-', quantity: 1 },
    { class: 'B', value: '-', quantity: '-' },
    { class: 'C', value: '-', quantity: '-' },
  ]);
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
  }, [produtos]);

  useEffect(() => {
    const apps = produtos.map((item) => generateRow(item, produtos, total));
    const a = {
      count: 0,
      acc: 0,
    };
    const b = {
      count: 0,
      acc: 0,
    };
    const c = {
      count: 0,
      acc: 0,
    };
    apps.forEach((item) => {
      switch (item.classABC) {
        case 'A':
          a.count++;
          a.acc += item.value;
          break;
        case 'B':
          b.count++;
          b.acc += item.value;
          break;
        case 'C':
          c.count++;
          c.acc += item.value;
          break;

        default:
          break;
      }
    });
    setTable([
      {
        class: 'A',
        value: calcPercentage(a.acc, total),
        quantity: calcPercentage(a.count, produtos.length),
      },
      {
        class: 'B',
        value: calcPercentage(b.acc, total),
        quantity: calcPercentage(b.count, produtos.length),
      },
      {
        class: 'C',
        value: calcPercentage(c.acc, total),
        quantity: calcPercentage(c.count, produtos.length),
      },
    ]);
  }, [produtos, total]);

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
      <CustomTable className='w-1/2' header={headersABCClass} items={table} />
    </div>
  );
}
export default ABCMethod;
