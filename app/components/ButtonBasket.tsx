'use client';

import { Button } from '@/components/ui/button';
import { useBasket } from '@/store/basket';
import { RiShoppingBasketFill } from 'react-icons/ri';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

type Props = {
  classes: string;
};

const ButtonBasket = ({ classes }: Props) => {
  const totalItems = useBasket((state) => state.totalItems());
  const totalPrice = useBasket((state) => state.totalPrice());
  const router = useRouter();
  return (
    <div className={cn(classes)}>
      <Button className="group relative" onClick={() => router.push('/basket')}>
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
};

export default dynamic(() => Promise.resolve(ButtonBasket), { ssr: false });
