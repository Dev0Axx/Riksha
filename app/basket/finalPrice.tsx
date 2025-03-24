'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useBasket } from '@/store/basket';
import { useState } from 'react';

type Props = {
  classes: string;
};

export default function FinalPrice({ classes }: Props) {
  const totalPrice = useBasket((state) => state.totalPrice());
  const totalItems = useBasket((state) => state.totalItems());
  const [isPromoCode, setIsPromoCode] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={cn(classes, 'bg-accent h-max p-8 rounded-2xl')}>
      <div className="text-start">
        <h1 className="text-2xl">Итого:</h1>
        <p className="text-4xl font-bold mt-2">
          {totalPrice > 600 ? totalPrice : totalPrice + 600} ₽
        </p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="flex-1 flex gap-1">
            <span>Количество товаров</span>
            <span className="flex-1 border-b-2 border-dotted"></span>
          </p>
          <p className="font-bold">{totalItems}</p>
        </div>
        <div className="flex justify-between">
          <p className="flex-1 flex gap-1">
            <span>Стоимость товаров</span>
            <span className="flex-1 border-b-2 border-dotted"></span>
          </p>
          <p className="font-bold">{totalPrice} ₽</p>
        </div>
        <div className="flex justify-between">
          <p className="flex-1 flex gap-1">
            <span>Стоимость доставки</span>
            <span className="flex-1 border-b-2 border-dotted"></span>
          </p>
          <p className="font-bold">{totalPrice > 600 ? 0 : 600} ₽</p>
        </div>
      </div>
      <hr className="my-6" />
      {!isPromoCode && (
        <p
          className=" opacity-50 cursor-pointer"
          onClick={() => {
            setIsPromoCode(true);
          }}
        >
          У меня есть промокод
        </p>
      )}
      {isPromoCode && (
        <div>
          <input
            placeholder="Введите промокод"
            className="p-2 bg-white rounded w-[100%]"
          />
          <div className="ml-1 mt-1">
            <p
              className="text-primary cursor-pointer"
              onClick={() => {
                setIsError(true);
              }}
            >
              Применить
            </p>
            {isError && (
              <p className="text-red-600 font-medium">
                Промокод не действителен!
              </p>
            )}
          </div>
        </div>
      )}

      <Button className="w-[100%] mt-6">Перейти к оплате</Button>
    </div>
  );
}
