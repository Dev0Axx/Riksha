'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { RiShoppingBasketFill } from 'react-icons/ri';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';

import Pizza from '../../../../app/assets/categories/pizza.svg';
import Sushi from '../../../../app/assets/categories/sushi.svg';
import Rolle from '../../../../app/assets/categories/rolle.svg';
import Set from '../../../../app/assets/categories/set.svg';
import Wok from '../../../../app/assets/categories/wok.svg';
import Soup from '../../../../app/assets/categories/soup.svg';
import Salad from '../../../../app/assets/categories/salad.svg';
import Dessert from '../../../../app/assets/categories/dessert.svg';
import Drink from '../../../../app/assets/categories/drink.svg';
import Sale from '../../../../app/assets/categories/sale.svg';
import { Container } from '../../container';
import { useCategoryStore } from '@/store/category';
import Link from 'next/link';
import { useBasket } from '@/store/basket';

const categories = [
  { name: 'Пицца', image: Pizza },
  { name: 'Суши', image: Sushi },
  { name: 'Роллы', image: Rolle },
  { name: 'Наборы', image: Set },
  { name: 'Wok', image: Wok },
  { name: 'Супы', image: Soup },
  { name: 'Салаты', image: Salad },
  { name: 'Десерты', image: Dessert },
  { name: 'Напитки', image: Drink },
  { name: 'Акции', image: Sale },
];

export default function Categories() {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const totalItems = useBasket((state) => state.totalItems());
  const totalPrice = useBasket((state) => state.totalPrice());

  return (
    <Container className="sticky top-5 z-1 px-4">
      <div className="flex items-center justify-between gap-1 bg-[#F5F5F5] rounded-lg p-4 overflow-auto">
        {categories.map((category, index) => (
          <Link href={`/#${index + 1}`} key={index}>
            <div
              className={cn(
                'flex flex-col items-center justify-center rounded-lg p-4  gap-1 bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer h-16 w-24 shadow-md',
                Number(categoryActiveId) == index + 1 &&
                  'bg-gray-200 text-primary',
              )}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={0}
                height={0}
                priority
                className="w-[32px] h-auto"
              />
              <p className="text-sm font-medium">{category.name}</p>
            </div>
          </Link>
        ))}
        <Button className="group relative hidden xl:flex">
          <b>{totalPrice} ₽</b>
          <span className="h-full w-[1px] bg-white/30 mx-3" />
          <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
            <RiShoppingBasketFill size={15} />
            <b>{totalItems}</b>
          </div>
          <LiaLongArrowAltRightSolid
            className="group-hover:opacity-100 transition duration-300 absolute right-4 opacity-0 "
            size={25}
          />
        </Button>
      </div>
    </Container>
  );
}
