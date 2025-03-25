'use client';

import { RefObject, useState } from 'react';

/* eslint-disable @next/next/no-img-element */
import { Good, Additionally as IAdditionally } from '@/interfaces';
import { cn } from '@/lib/utils';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { GoArrowLeft } from 'react-icons/go';

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

      <div className="flex sm:gap-[calc(4%/3)] gap-[2%] sm:max-h-[250px] flex-wrap">
        {additionallyItems?.map((item) => (
          <div
            key={item.id}
            className={cn(
              'sm:w-[24%] w-[32%] p-2 bg-white rounded-4xl flex flex-col justify-between items-center cursor-pointer relative sm:min-h-[200px] h-[170px]',
              selectedItems.some((selected) => selected.id === item.id)
                ? 'border-1 border-primary'
                : '',
            )}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex flex-col gap-1">
              <img
                src={item.img_url}
                alt={item.name}
                className="h-20 w-auto rounded-4xl max-[400px]:h-15"
              />
              <p className="sm:text-base text-xs text-center">{item.name}</p>
            </div>

            <p className="font-medium">{item.price} ₽</p>

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
      <div
        className="flex gap-1 items-center mt-2 cursor-pointer"
        onClick={() => {
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        }}
      >
        <GoArrowLeft />
        <p>Назад</p>
      </div>
      <Button
        className="w-[100%] bg-[url('/bt_bg.svg')] rounded mt-2"
        onClick={handleOrderClick}
      >
        Заказать
      </Button>
    </div>
  );
}
