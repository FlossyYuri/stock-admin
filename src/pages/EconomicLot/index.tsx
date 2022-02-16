import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import TextInput from '../../components/inputs/TextInput';
import Title from '../../components/Title';

type Inputs = {
  price: number;
  annualConsumption: number;
  shippingCost: number;
  cost: number;
};

function EconomicLot() {
  const [result, setResult] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const answer = Math.sqrt(
      (2 * data.annualConsumption * data.shippingCost) / data.cost
    );
    console.log(answer, data);
    setResult(answer);
  };
  return (
    <div className='w-full p-8 text-left'>
      <Title>EconomicLot</Title>
      <div className='grid grid-cols-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name='annualConsumption'
            type='number'
            label='Consumo Anual'
            placeholder='Ex: 2400'
            error={errors.annualConsumption?.message}
            register={register}
            validation={{ min: 0 }}
            rest={{ min: 0 }}
          />
          <TextInput
            name='shippingCost'
            type='number'
            label='Custo de Envio'
            placeholder='Ex: 2000'
            error={errors.shippingCost?.message}
            register={register}
            validation={{ min: 0 }}
            rest={{ min: 0 }}
          />
          <TextInput
            name='cost'
            type='number'
            label='Custo de Posse'
            placeholder='Ex: 60'
            error={errors.cost?.message}
            register={register}
            validation={{ min: 0 }}
            rest={{ min: 0 }}
          />
          <Button>Calcular</Button>
        </form>
        <div className='flex justify-center items-center'>
          {result ? (
            <div className='border-pink-200 border-2 rounded-lg py-4 px-4 w-2/3'>
              <h2 className='text-slate-500'>Resultado:</h2>
              <span className='font-semibold'>{result}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default EconomicLot;
