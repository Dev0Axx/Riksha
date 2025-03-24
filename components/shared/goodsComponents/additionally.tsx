'use client';

import { RefObject, useState } from 'react';

/* eslint-disable @next/next/no-img-element */
import { Good, Additionally as IAdditionally } from '@/interfaces';
import { cn } from '@/lib/utils';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';

type Props = {
  additionallyItems: IAdditionally[] | null;
  good: Good;
  dialogRef: RefObject<HTMLDialogElement | null>;
  addGoodToBasket: (good: Good, additionally: IAdditionally[]) => void;
};

export default function Additionally({
  additionallyItems,
  good,
  dialogRef,
  addGoodToBasket,
}: Props) {
  const [selectedItems, setSelectedItems] = useState<IAdditionally[]>([]);

  const handleItemClick = (item: IAdditionally) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selected) => selected.id !== item.id),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleOrderClick = () => {
    addGoodToBasket(good, selectedItems);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setSelectedItems([]);
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
              selectedItems.some((selected) => selected.id === item.id)
                ? 'border-1 border-primary'
                : '',
            )}
            onClick={() => handleItemClick(item)}
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
            {selectedItems.some((selected) => selected.id === item.id) ? (
              <IoMdCheckmarkCircleOutline
                size={30}
                color="red"
                className="absolute right-2 top-2"
              />
            ) : null}
          </div>
        ))}
      </div>

      <Button
        className="w-[100%] bg-[url('/bt_bg.svg')] rounded mt-4"
        onClick={handleOrderClick}
      >
        Заказать
      </Button>
    </div>
  );
}
