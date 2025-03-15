'use client';

import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
import { Good, Additionally as IAdditionally } from '@/interfaces';
import { cn } from '@/lib/utils';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useBasket } from '@/store/basket';

type Props = {
  additionallyItems: IAdditionally[] | null;
  good: Good;
};

export default function Additionally({ additionallyItems, good }: Props) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { addAdditionally, removeAdditionally } = useBasket();

  const handleItemClick = (id: number) => {
    //если элемент уже добавлен, то удаляем его
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      return true;
    }
    // иначе добавляем
    else {
      setSelectedItems([...selectedItems, id]);
      return false;
    }
  };

  return (
    <div className="mt-8">
      {additionallyItems?.length ? (
        <h1 className="text-2xl font-medium mb-6">Добавить по вкусу</h1>
      ) : null}
      <div className="flex sm:gap-[calc(4%/2)] sm:flex-row flex-col gap-2">
        {additionallyItems?.map((item) => (
          <div
            key={item.id}
            className={cn(
              'sm:w-[32%] px-2 py-4 bg-white rounded-4xl flex sm:flex-col justify-between items-center text-center gap-2 cursor-pointer relative',
              selectedItems.includes(item.id) ? 'border-2 border-primary' : '',
            )}
            onClick={() => {
              const res = handleItemClick(item.id);
              if (res) {
                removeAdditionally(good.id, item.id);
              } else {
                addAdditionally(good.id, item);
              }
            }}
          >
            <img
              src={item.img_url}
              alt={item.name}
              className="sm:h-50 sm:w-auto w-[30%] h-auto rounded-4xl"
            />
            <div className="flex justify-between gap-1 flex-col p-2 sm:h-[50%] sm:w-auto w-[50%]">
              <p className="sm:text-base text-sm">{item.name}</p>
              <p className="font-medium">{item.price} ₽</p>
            </div>
            {selectedItems.includes(item.id) ? (
              <IoMdCheckmarkCircleOutline
                size={30}
                color="red"
                className="absolute right-2 top-2"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
