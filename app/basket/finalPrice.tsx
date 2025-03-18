import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useBasket } from '@/store/basket';

type Props = {
  classes: string;
};

export default function FinalPrice({ classes }: Props) {
  const totalPrice = useBasket((state) => state.totalPrice());
  const totalItems = useBasket((state) => state.totalItems());

  return (
    <div className={cn(classes, 'bg-accent h-max p-8 rounded-2xl')}>
      <div className="text-start">
        <h1 className="text-2xl">Итого:</h1>
        <p className="text-4xl font-bold mt-2">
          {totalPrice > 600 ? totalPrice : totalPrice + 600} ₽
        </p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="flex-1 flex gap-1">
            <span>Количество товаров</span>
            <span className="flex-1 border-b-2 border-dotted"></span>
          </p>
          <p className="font-bold">{totalItems}</p>
        </div>
        <div className="flex justify-between">
          <p className="flex-1 flex gap-1">
            <span>Стоимость товаров</span>
            <span className="flex-1 border-b-2 border-dotted"></span>
          </p>
          <p className="font-bold">{totalPrice} ₽</p>
        </div>
        <div className="flex justify-between">
          <p className="flex-1 flex gap-1">
            <span>Стоимость доставки</span>
            <span className="flex-1 border-b-2 border-dotted"></span>
          </p>
          <p className="font-bold">{totalPrice > 600 ? 0 : 600} ₽</p>
        </div>
      </div>
      <hr className="my-6" />
      <p className=" opacity-50 cursor-pointer">У меня есть промокод</p>
      <Button className="w-[100%] mt-6">Перейти к оплате</Button>
    </div>
  );
}
