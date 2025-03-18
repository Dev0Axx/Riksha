import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Good } from '@/interfaces';

type Props = {
  good: Good;
};

export default function GoodSize({ good }: Props) {
  const [selectedSize, setSelectedSize] = useState('');
  return (
    <>
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
    </>
  );
}
