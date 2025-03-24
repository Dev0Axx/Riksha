'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { RefObject } from 'react';

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  classes?: string;
  additionally: () => void;
};

function AddGoodButton({ classes, dialogRef, additionally }: Props) {
  return (
    <>
      {/* {totalItemsById > 0 ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              removeLastGoodById(good.id);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            -
          </button>
          <span>{totalItemsById}</span>
          <button
            onClick={() => {
              additionally();
              if (dialogRef.current) {
                dialogRef.current.showModal();
              }
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            +
          </button>
        </div>
      ) : ( */}
      <Button
        className={cn("bg-[url('/bt_bg.svg')] rounded", classes)}
        onClick={async () => {
          await additionally();
          if (dialogRef.current) {
            dialogRef.current.showModal();
          }
        }}
      >
        Заказать
      </Button>
      {/* )} */}
    </>
  );
}

export default dynamic(() => Promise.resolve(AddGoodButton), { ssr: false });
