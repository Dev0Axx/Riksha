/* eslint-disable @next/next/no-img-element */
'use client';
import { useBasket } from '@/store/basket';
import { FaRegTrashCan } from 'react-icons/fa6';

interface BasketItemProps {
  item: {
    good: {
      id: number;
      name: string;
      price: number;
      img_url: string;
      description: string;
    };
    quantity: number;
  };
}

export default function BasketItem({ item }: BasketItemProps) {
  const addGood = useBasket((state) => state.addGood);
  const delGood = useBasket((state) => state.delGood);
  const removeGood = useBasket((state) => state.removeGood);

  const handleIncrement = () => {
    addGood(item.good);
  };

  const handleDecrement = () => {
    delGood(item.good);
  };

  const handleRemove = () => {
    removeGood(item.good);
  };

  return (
    <div className="flex items-center gap-12 justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        {item.good.img_url && (
          <img
            src={item.good.img_url}
            alt={item.good.name}
            width={80}
            height={80}
            className="rounded-md"
          />
        )}
        <div>
          <h3 className="text-lg font-medium">{item.good.name}</h3>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={handleDecrement}
            className="px-3 py-2 cursor-pointer"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-2 cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="font-medium">{item.good.price * item.quantity} ₽</span>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Remove item"
        >
          <FaRegTrashCan className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
