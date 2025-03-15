'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { useCategoryStore } from '@/store/category';
import Link from 'next/link';
import ButtonBasket from './ButtonBasket';

import Pizza from '@/app/assets/categories/pizza.svg';
import Sushi from '@/app/assets/categories/sushi.svg';
import Rolle from '@/app/assets/categories/rolle.svg';
import Set from '@/app/assets/categories/set.svg';
import Wok from '@/app/assets/categories/wok.svg';
import Soup from '@/app/assets/categories/soup.svg';
import Salad from '@/app/assets/categories/salad.svg';
import Dessert from '@/app/assets/categories/dessert.svg';
import Drink from '@/app/assets/categories/drink.svg';

// Константы для категорий
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
];

export default function Categories() {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <Container className="sticky top-5 z-10 px-4">
      <div className="flex items-center justify-between gap-1 bg-[#F5F5F5] rounded-lg p-4 overflow-auto">
        {/* Карточки категорий */}
        {categories.map((category, index) => (
          <Link href={`/#${index + 1}`} key={index}>
            <div
              className={cn(
                'flex flex-col items-center justify-center rounded-lg p-4 gap-1 bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer h-16 w-24 shadow-md',
                Number(categoryActiveId) === index + 1 &&
                  'bg-gray-200 text-primary',
              )}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={32}
                height={32}
                priority
                className="w-8 h-auto"
              />
              <p className="text-sm font-medium">{category.name}</p>
            </div>
          </Link>
        ))}
        <ButtonBasket classes="xl:flex hidden" />
      </div>
    </Container>
  );
}
