/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useState } from 'react';
import { Good } from '@/interfaces';
import CardDialog from './cardDialog';
import { getAdditionally } from '@/dataBase/goods';
import { Additionally } from '@/interfaces';
import AddGoodButton from './addGoodButton';

type GoodProps = {
  good: Good;
  categoryName: string;
};

export default function Card({ good, categoryName }: GoodProps) {
  const [showDescription, setShowDescription] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  //состояние доп опций для товара
  const [additionallyItems, setAdditionallyItems] = useState<
    Additionally[] | null
  >(null);

  const additionally = async () => {
    const res = await getAdditionally(categoryName);
    setAdditionallyItems(res);
  };

  return (
    <article className="lg:w-[32%] p-4 bg-[#ffff] w-[49%] mb-4 flex flex-col justify-between gap-4">
      <div className="flex justify-between flex-col">
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
        <div className="text-sm sm:hidden block mt-2">
          <div
            className="flex justify-between"
            onClick={() => {
              setShowDescription(!showDescription);
            }}
          >
            <p>Состав</p>
            <p className="w-6 h-6 text-center">+</p>
          </div>
          <hr className="mt-1" />
        </div>
        {showDescription && (
          <p className="descriptionList text-sm">{good.description}</p>
        )}
      </div>
      <div className="flex justify-between sm:flex-row flex-col gap-2 sm:items-center items-start">
        <b className="sm:text-2xl">{good.price} ₽</b>
        <AddGoodButton
          classes="sm:w-[60%] w-[100%]"
          dialogRef={dialogRef}
          additionally={additionally}
        />
      </div>
      <CardDialog
        dialogRef={dialogRef}
        good={good}
        additionallyItems={additionallyItems}
      />
    </article>
  );
}
