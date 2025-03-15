'use client';

/* eslint-disable @next/next/no-img-element */
import { RefObject, useState } from 'react';
import { Good, Additionally as IAdditionally } from '@/interfaces';
import { IoCloseOutline } from 'react-icons/io5';
import Additionally from './additionally';
import { cn } from '@/lib/utils';
import AddGoodButton from './addGoodButton';

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
  const [selectedSize, setSelectedSize] = useState<string>('');
  return (
    <dialog
      ref={dialogRef}
      className="m-auto outline-none rounded-2xl border-2 border-primary w-max"
    >
      <div className="flex xl:flex-row flex-col">
        <div className="flex items-center justify-center xl:w-[50%]">
          <img
            src={good.img_url}
            alt={good.name}
            className="h-[100%] w-[100%] max-w-[1000px]"
          />
        </div>
        <div className="bg-[rgb(244,241,238)] xl:px-12 xl:py-4 p-4 xl:w-[50%] flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{good.name}</h1>
            <p className="text-sm opacity-50 mt-2">{good.description}</p>
          </div>
          {good.sizes && good.sizes.length > 1 ? (
            <div className="mt-4 flex gap-1 bg-gray-200 rounded-4xl p-1 w-max">
              {good.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'sm:px-16 px-6 py-2 rounded-4xl transition-all duration-300 cursor-pointer sm:text-base text-[12px] outline-none',
                    selectedSize === size && 'bg-white',
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          ) : null}
          {good.sizes && good.sizes.length === 1 ? (
            <div>
              <p className="text-sm opacity-50">Размер: {good.sizes[0]}</p>
            </div>
          ) : null}
          <div>
            <Additionally additionallyItems={additionallyItems} good={good} />
          </div>
          <div className="mt-4">
            <AddGoodButton good={good} classes="w-[100%]" />
          </div>
        </div>
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
