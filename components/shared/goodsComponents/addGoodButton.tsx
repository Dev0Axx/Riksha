'use client';

import { Button } from '@/components/ui/button';
import { Good } from '@/interfaces';
import { cn } from '@/lib/utils';
import { useBasket } from '@/store/basket';
import { useState } from 'react';

type Props = {
  good: Good;
  classes?: string;
};

export default function AddGoodButton({ good, classes }: Props) {
  const addGood = useBasket((state) => state.addGood);
  const delGood = useBasket((state) => state.delGood);
  const [showQuantity, setShowQuantity] = useState(false);
  const basketItems = useBasket((state) => state.goods);
  const basketItem = basketItems.find((item) => item.good.id === good.id);
  const quantity = basketItem ? basketItem.quantity : 0;

  const handleAddClick = () => {
    addGood(good);
    setShowQuantity(true);
  };

  const handleIncrementClick = () => {
    addGood(good);
  };

  const handleDecrementClick = () => {
    if (quantity > 1) {
      delGood(good.id);
    } else {
      delGood(good.id);
      setShowQuantity(false);
    }
  };

  return (
    <>
      {showQuantity || quantity > 0 ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrementClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleIncrementClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            +
          </button>
        </div>
      ) : (
        <Button
          className={cn("bg-[url('/bt_bg.svg')] rounded", classes)}
          onClick={handleAddClick}
        >
          Заказать
        </Button>
      )}
    </>
  );
}
