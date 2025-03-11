'use client';

import { Button } from '@/components/ui/button';
import { useBasket } from '@/store/basket';
import { RiShoppingBasketFill } from 'react-icons/ri';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ButtonBasket() {
  const [isClient, setIsClient] = useState(false);
  const totalItems = useBasket((state) => state.totalItems());
  const totalPrice = useBasket((state) => state.totalPrice());
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="xl:hidden sticky top-[90%] z-10 flex justify-end mr-4">
      <Button
        className="group relative flex items-center"
        onClick={() => router.push('/basket')}
      >
        <b>{totalPrice} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <RiShoppingBasketFill size={15} />
          <b>{totalItems}</b>
        </div>
        <LiaLongArrowAltRightSolid
          className="group-hover:opacity-100 transition duration-300 absolute right-4 opacity-0"
          size={25}
        />
      </Button>
    </div>
  );
}
