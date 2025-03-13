'use client';

/* eslint-disable @next/next/no-img-element */
import { RefObject, useState } from 'react';
import { Goods, Additionally as IAdditionally } from '@/interfaces';
import { IoCloseOutline } from 'react-icons/io5';
import Additionally from './additionally';
import { cn } from '@/lib/utils';

type Props = {
  good: Goods;
  additionallyItems: IAdditionally[] | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export default function CardDialog({
  dialogRef,
  good,
  additionallyItems,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<string>('Средняя');

  return (
    <dialog
      ref={dialogRef}
      className="m-auto outline-none rounded-2xl border-2 border-primary sm:w-[600px] w-[310px]"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <img src={good.img_url} alt={good.name} className="w-max h-auto" />
        </div>
        <div className="bg-[rgb(244,241,238)] p-4">
          <div>
            <h1 className="text-2xl font-bold">{good.name}</h1>
            <p className="text-sm opacity-50">{good.description}</p>
          </div>
          {
            <div className="mt-4 flex gap-[1%] bg-gray-200 rounded-4xl sm:w-[78%] w-[100%] justify-between p-1">
              {['Маленькая', 'Средняя', 'Большая'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'sm:px-6 px-2 py-2 w-[32%] rounded-full transition-all duration-300 cursor-pointer sm:text-base text-[12px]',
                    selectedSize === size && 'bg-white',
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          }
          <div>
            <Additionally additionallyItems={additionallyItems} />
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
