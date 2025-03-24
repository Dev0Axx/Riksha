'use client';

import { Container } from '@/components/shared/container';
import { useBasket } from '@/store/basket';
import BasketItem from './basketItem';
import Order from './makingAnOrder';
import dynamic from 'next/dynamic';
import FinalPrice from './finalPrice';
import { GoArrowLeft } from 'react-icons/go';
import { useRouter } from 'next/navigation';

const Basket = () => {
  const { goods } = useBasket();
  const router = useRouter();

  return (
    <Container className="p-4 mt-18">
      <h2 className="text-4xl font-bold mb-4">Оформление заказа</h2>
      <div
        className="flex items-center gap-2 mb-4 cursor-pointer"
        onClick={() => {
          router.push('/');
        }}
      >
        <GoArrowLeft /> <p>Каталог</p>
      </div>
      <div className="flex justify-between xl:flex-row flex-col gap-4">
        <div className="xl:w-[49%]">
          <div>
            {goods.length === 0 ? (
              <p className="text-2xl">Корзина пуста</p>
            ) : (
              <div>
                {goods.map((item, index) => (
                  <BasketItem key={index} item={item} />
                ))}
              </div>
            )}
          </div>
          <div>
            <Order />
          </div>
        </div>
        <FinalPrice classes="xl:w-[42%]" />
      </div>
    </Container>
  );
};

export default dynamic(() => Promise.resolve(Basket), { ssr: false });
