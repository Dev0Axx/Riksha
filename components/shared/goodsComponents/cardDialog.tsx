'use client';

/* eslint-disable @next/next/no-img-element */
import { RefObject } from 'react';
import { Good, Additionally as IAdditionally } from '@/interfaces';
import { IoCloseOutline } from 'react-icons/io5';
import Additionally from './additionally';
import GoodSize from './goodSize';
import { useBasket } from '@/store/basket';

type Props = {
  good: Good;
  additionallyItems: IAdditionally[] | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export default function CardDialog({
  dialogRef,
  good,
  additionallyItems,
}: Props) {
  const { addGood } = useBasket();

  function addGoodToBasket(good: Good, additionally: IAdditionally[]) {
    addGood(good, additionally);
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-auto outline-none rounded border-2 border-primary"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center ">
          <img
            src={good.img_url}
            alt={good.name}
            className="h-[100%] w-[100%] max-w-[1000px]"
          />
        </div>
        <div className="bg-[rgb(244,241,238)] xl:px-12 xl:py-4 p-4  flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{good.name}</h1>
            <p className="text-sm opacity-50 mt-2">{good.description}</p>
          </div>
          <GoodSize good={good} />
          <Additionally
            additionallyItems={additionallyItems}
            good={good}
            addGoodToBasket={addGoodToBasket}
            dialogRef={dialogRef}
          />
        </div>

        {/*Крестик выхода*/}
        <IoCloseOutline
          size={30}
          className="absolute right-1 top-1 cursor-pointer"
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
          }}
        />
      </div>
    </dialog>
  );
}
