/* eslint-disable @next/next/no-img-element */
'use client';

import { Additionally, BasketGood } from '@/interfaces';
import { getAdditionally } from '@/dataBase/goods';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/store/basket';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  item: BasketGood;
  changeIsEdit: (b: boolean) => void;
};

export default function Edit({ item, changeIsEdit }: Props) {
  const [additionally, setAdditionally] = useState<Additionally[]>();
  const [selectedItems, setSelectedItems] = useState<Additionally[]>([]);
  const updateGood = useBasket((state) => state.updateGood);
  const [isLoading, setIsLoading] = useState(true);

  async function getAdditionallyFunction(categoryName: string) {
    try {
      const res = await getAdditionally(categoryName);
      setAdditionally(res);
      if (item.additionally) {
        setSelectedItems(item.additionally);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  const handleItemClick = (item: Additionally) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selected) => selected.id !== item.id),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    getAdditionallyFunction(item.categoryName);
  }, [item]);

  return (
    <div className="flex gap-2 flex-col">
      {additionally?.map((item) => (
        <div
          key={item.id}
          className={cn(
            'bg-gray-50 rounded-2xl py-2 flex items-center gap-4 sm:w-[60%] cursor-pointer relative',
            selectedItems.some((selected) => selected.id === item.id)
              ? 'border-1 border-primary'
              : '',
          )}
          onClick={() => handleItemClick(item)}
        >
          <img
            src={item.img_url}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-md object-cover w-20 h-20"
          />
          <div className="flex text-sm justify-between w-[100%] mr-4 gap-1 text-center">
            <p>{item.name}</p>
            <p className="font-medium text-nowrap">{item.price} ₽</p>
          </div>
          {selectedItems.some((selected) => selected.id === item.id) ? (
            <IoMdCheckmarkCircleOutline
              size={15}
              color="red"
              className="absolute right-2 top-2"
            />
          ) : null}
        </div>
      ))}
      {!isLoading && additionally?.length != 0 && (
        <Button
          className="rounded sm:w-[20%] w-[30%]"
          onClick={() => {
            updateGood(item.basketItemId, {
              ...item,
              additionally: selectedItems,
            });
            changeIsEdit(false);
          }}
        >
          Сохранить
        </Button>
      )}
    </div>
  );
}
