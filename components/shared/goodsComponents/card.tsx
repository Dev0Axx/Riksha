/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '../../ui/button';
import { useBasket } from '@/store/basket';
import { useRef, useState } from 'react';
import { Goods } from '@/interfaces';
import CardDialog from './cardDialog';
import { getAdditionally } from '@/dataBase/goods';
import { Additionally } from '@/interfaces';

type GoodProps = {
  good: Goods;
  categoryName: string;
};

export default function Card({ good, categoryName }: GoodProps) {
  const addGood = useBasket((state) => state.addGood);
  const delGood = useBasket((state) => state.delGood);
  const basketItems = useBasket((state) => state.goods);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const basketItem = basketItems.find((item) => item.good.id === good.id);
  const quantity = basketItem ? basketItem.quantity : 0;

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  //состояние доп опций для товара
  const [additionallyItems, setAdditionallyItems] = useState<
    Additionally[] | null
  >(null);

  const additionally = async () => {
    const res = await getAdditionally(categoryName);
    setAdditionallyItems(res);
  };

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
    <article className="lg:w-[32%] p-4 bg-[#ffff] w-[49%] mb-4 flex flex-col justify-between gap-4">
      <div className="flex justify-between flex-col sm:h-auto h-60">
        <img
          src={good.img_url}
          alt={good.name}
          className="select-none cursor-pointer"
          onClick={async () => {
            await additionally();
            if (dialogRef.current) dialogRef.current.showModal();
          }}
        />
        <div className="flex flex-col justify-between gap-2">
          <b className="sm:text-2xl">{good.name}</b>
          <p className="sm:block hidden text-overflow">{good.description}</p>
        </div>
        <div className="text-sm sm:hidden block">
          <div
            className="flex justify-between"
            onClick={() => {
              setShowDescription(!showDescription);
            }}
          >
            <p>Состав</p>
            <p className="border-1 border-black rounded-full w-6 h-6 text-center">
              +
            </p>
          </div>
          <hr className="mt-2" />
        </div>
      </div>
      <div className="flex justify-between sm:flex-row flex-col gap-2 sm:items-center items-start">
        {showDescription && (
          <p className="descriptionList text-sm">{good.description}</p>
        )}
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
            className="bg-[url('/bt_bg.svg')] sm:w-[60%] w-[100%] rounded"
            onClick={handleAddClick}
          >
            Заказать
          </Button>
        )}
      </div>
      <CardDialog
        dialogRef={dialogRef}
        good={good}
        additionallyItems={additionallyItems}
      />
    </article>
  );
}
