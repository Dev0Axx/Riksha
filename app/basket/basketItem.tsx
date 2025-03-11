/* eslint-disable @next/next/no-img-element */
'use client';
import { useBasket } from '@/store/basket';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Goods } from '@/interfaces';

type BasketItemProps = {
  item: {
    good: Goods;
    quantity: number;
  };
};

export default function BasketItem({ item }: BasketItemProps) {
  const addGood = useBasket((state) => state.addGood);
  const delGood = useBasket((state) => state.delGood);
  const removeGood = useBasket((state) => state.removeGood);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        {item.good.img_url && (
          <img
            src={item.good.img_url}
            alt={item.good.name}
            width={80}
            height={80}
            className="rounded-md max-[768px]:w-[120px] max-[768px]:h-[120px]"
          />
        )}
        <div>
          <h3 className="text-lg font-medium">{item.good.name}</h3>
        </div>
      </div>

      <div className="flex items-center max-[768px]:justify-between max-[768px]:w-[100%] space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => {
              delGood(item.good);
            }}
            className="px-3 py-2 cursor-pointer"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={() => {
              addGood(item.good);
            }}
            className="px-3 py-2 cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">
            {item.good.price * item.quantity} ₽
          </span>
          <button
            onClick={() => {
              removeGood(item.good);
            }}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Remove item"
          >
            <FaRegTrashCan className="cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}
