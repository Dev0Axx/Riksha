'use client';

/* eslint-disable @next/next/no-img-element */
import { RefObject, useState } from 'react';
import { Good, Additionally as IAdditionally } from '@/interfaces';
import { IoCloseOutline } from 'react-icons/io5';
import Additionally from './additionally';
import GoodSize from './goodSize';
import { useBasket } from '@/store/basket';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { likeProduct, dislikeProduct } from '@/dataBase/goods';

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
  const [selectedSize, setSelectedSize] = useState(good?.sizes?.[0] || '');

  function setSize(size: string) {
    setSelectedSize(size);
  }

  function addGoodToBasket(good: Good, additionally: IAdditionally[]) {
    addGood(good, additionally, selectedSize);
  }
  return (
    <dialog
      ref={dialogRef}
      className="m-auto outline-none rounded border-2 border-primary "
    >
      <div className="flex flex-col max-w-[700px]">
        <div className="flex items-center justify-center">
          <img
            src={good.img_url}
            alt={good.name}
            className="xl:w-500px h-auto"
          />
        </div>
        <div className="bg-[rgb(244,241,238)] p-4  flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{good.name}</h1>
            <p className="text-sm opacity-50 mt-2">{good.description}</p>
            <div className="flex gap-8 mt-4">
              <p className="flex gap-2 items-center text-primary">
                <AiOutlineLike
                  size={30}
                  className="cursor-pointer"
                  onClick={() => likeProduct(good.id)}
                />
                {good.likes}
              </p>
              <p className="flex gap-2 items-center text-primary">
                <AiOutlineDislike
                  size={30}
                  className="cursor-pointer"
                  onClick={(e) => {
                    dislikeProduct(good.id);
                  }}
                />
                {good.dislikes}
              </p>
            </div>
          </div>
          <GoodSize good={good} setSize={setSize} selectedSize={selectedSize} />
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
