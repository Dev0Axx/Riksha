/* eslint-disable @next/next/no-img-element */
'use client';
import { useBasket } from '@/store/basket';
import { BasketGood } from '@/interfaces';
import Edit from './edit';
import { useState } from 'react';

type BasketItemProps = {
  item: BasketGood;
};

export default function BasketItem({ item }: BasketItemProps) {
  const increaseQuantity = useBasket((state) => state.increaseQuantity);
  const decreaseQuantity = useBasket((state) => state.decreaseQuantity);
  const [isEdit, setIsEdit] = useState(false);

  const basePrice = item.price;
  const additionsPrice =
    item.additionally?.reduce((sum, a) => sum + a.price, 0) || 0;
  const totalPrice = (basePrice + additionsPrice) * item.quantity;

  const handleIncrease = () => increaseQuantity(item.basketItemId);
  const handleDecrease = () => decreaseQuantity(item.basketItemId);
  const changeIsEdit = (b: boolean) => setIsEdit(b);

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        {/* Информация о товаре */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {item.img_url && (
            <img
              src={item.img_url}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md object-cover w-20 h-20"
              loading="lazy"
            />
          )}
          <div className="truncate">
            <h3 className="text-lg font-medium text-wrap">{item.name}</h3>
            {/* Дополнительные опции */}
            {item.additionally && item.additionally.length > 0 && (
              <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-2 text-wrap">
                {item.additionally.map((add) => (
                  <span key={add.id} className="bg-gray-100 px-2 py-1 rounded">
                    {add.name} (+{add.price}₽)
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Управление количеством и цена */}
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 cursor-pointer transition-colors"
              aria-label="Уменьшить количество"
            >
              -
            </button>
            <span className="px-3">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 cursor-pointer transition-colors"
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>

          <span className="font-medium whitespace-nowrap">{totalPrice}₽</span>
        </div>
      </div>
      {item.size && <p className="opacity-50">Размер: {item.size}</p>}
      <div className="mt-2 flex">
        <span
          className="text-primary font-medium cursor-pointer"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          Изменить
        </span>
      </div>
      {isEdit && <Edit item={item} changeIsEdit={changeIsEdit} />}
    </div>
  );
}
