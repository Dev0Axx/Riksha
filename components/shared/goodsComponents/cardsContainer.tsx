'use client';

import { Container } from '../container';
import Card from './card';
import { useIntersectionObserver } from '@reactuses/core';
import { useRef } from 'react';
import { useCategoryStore } from '@/store/category';
import { Categories } from '@/interfaces';

type CardsContainerProps = {
  category: Categories;
};

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
    { threshold: 0.4, root: null, rootMargin: '100px' },
  );

  return (
    <>
      {category.goods.length != 0 && (
        <Container className="sm:px-4">
          <section id={category.id.toString()} ref={intersectionRef}>
            <p className="text-4xl font-bold py-8">{category.name}</p>
            <div className="flex flex-wrap sm:gap-[2%] max-[640px]:justify-between">
              {category.goods.map((good) => (
                <Card
                  key={good.id}
                  good={good}
                  categoryName={category.name}
                ></Card>
              ))}
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
