'use client';

import { Container } from '@/components/shared/container';
import { useBasket } from '@/store/basket';
import BasketItem from './basketItem';
import Order from './makingAnOrder';

export default function Basket() {
  const { goods } = useBasket();

  return (
    <Container className="p-4 flex justify-between xl:flex-row flex-col mt-18 gap-8">
      <div>
        <h2 className="text-4xl font-bold mb-8">Оформление заказа</h2>
        {goods.length === 0 ? (
          <p className="text-2xl">Корзина пуста</p>
        ) : (
          <div>
            {goods.map((item) => (
              <BasketItem key={item.good.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <div>
        <Order />
      </div>
    </Container>
  );
}
