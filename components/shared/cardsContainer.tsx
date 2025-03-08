'use client';

import { Container } from './container';
import Card from './card';
import { useIntersectionObserver } from '@reactuses/core';
import { useRef } from 'react';
import { useCategoryStore } from '@/store/category';

interface Goods {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
}

interface Categories {
  goods: Goods[];
  id: number;
  name: string;
  sort_order: number;
}

interface CardsContainerProps {
  category: Categories;
}

export default function CardsContainer({ category }: CardsContainerProps) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);

  useIntersectionObserver(
    intersectionRef,
    (entry) => {
      if (entry[0].isIntersecting) {
        setActiveCategoryId(category.id.toString());
      }
    },
    { threshold: 1, root: null, rootMargin: '100px' },
  );

  return (
    <Container className="sm:px-4">
      <section
        className="py-4"
        id={category.id.toString()}
        ref={intersectionRef}
      >
        <p className="text-4xl font-bold py-8">{category.name}</p>
        <div className="flex flex-wrap sm:gap-[2%] max-[640px]:justify-between">
          {category.goods.map((good) => (
            <Card key={good.id} good={good}></Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
