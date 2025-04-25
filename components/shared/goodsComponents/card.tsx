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

  const [additionallyItems, setAdditionallyItems] = useState<
    Additionally[] | null
  >(null);

  const additionally = async () => {
    const res = await getAdditionally(categoryName);
    setAdditionallyItems(res);
  };
  return (
    <article className="lg:w-[32%] p-4 bg-[#ffff] w-[49%] mb-4 flex flex-col">
      <div className="flex sm:justify-between flex-col  ">
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
          <p className="sm:block hidden text-overflow cursor-default">
            {good.description}
          </p>
        </div>
      </div>
      <div className="flex justify-end flex-col h-[100%] gap-2 mt-2 ">
        {showDescription && (
          <p className="descriptionList text-sm h-max">{good.description}</p>
        )}
        {good.sizes && (
          <div className="flex justify-end w-[100%]">
            <div className="flex gap-2">
              {good.sizes.map((size) => (
                <div
                  key={size}
                  className="bg-primary sm:p-1 text-white cursor-default sm:text-sm text-xs p-0.5 rounded"
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between max-sm:flex-col">
          <div className="text-sm sm:hidden block w-[100%]">
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
          <b className="sm:text-2xl cursor-default flex gap-1 items-center">
            {good.sizes && good.sizes.length > 1 && <p>от </p>}
            {good.price} ₽
          </b>
          <AddGoodButton
            classes="sm:w-[60%] w-[100%]"
            dialogRef={dialogRef}
            additionally={additionally}
          />
        </div>
      </div>
      <CardDialog
        dialogRef={dialogRef}
        good={good}
        additionallyItems={additionallyItems}
      />
    </article>
  );
}
