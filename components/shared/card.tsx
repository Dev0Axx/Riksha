'use client';

import { Button } from '../ui/button';
import { useBasket } from '@/store/basket';
import { useState } from 'react';

interface Goods {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
}

interface GoodProps {
  good: Goods;
}

export default function Card({ good }: GoodProps) {
  const addGood = useBasket((state) => state.addGood);
  const delGood = useBasket((state) => state.delGood);
  const basketItems = useBasket((state) => state.goods);
  const [showQuantity, setShowQuantity] = useState(false);

  // Проверяем, есть ли товар в корзине
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
      delGood(good);
    } else {
      delGood(good);
      setShowQuantity(false);
    }
  };

  return (
    <article className="lg:w-[32%] p-4 bg-[#ffff] w-[49%] mb-4 flex justify-between flex-col">
      <img src={good.img_url} alt="/" />
      <div className="flex flex-col sm:gap-12 gap-4">
        <div>
          <b className="sm:text-2xl">{good.name}</b>
          <p>{good.description}</p>
        </div>
        <div className="flex justify-between sm:flex-row flex-col sm:gap-0 gap-2 items-center">
          <b className="sm:text-2xl">{good.price} ₽</b>

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
              variant="card"
              size="card"
              className="bg-[url('/bt_bg.svg')]"
              onClick={handleAddClick}
            >
              Заказать
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
