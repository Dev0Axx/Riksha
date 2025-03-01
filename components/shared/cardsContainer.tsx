'use client';

import { Container } from './container';
import Card from './card';
import { useIntersectionObserver } from '@reactuses/core';
import { useRef } from 'react';
import { useCategoryStore } from '@/store/category';

type Product = {
  photo: string;
  name: string;
  ingredients: string;
  price: string;
};

type Props = {
  title: string;
  products: Product[];
  id: string;
};

export default function CardsContainer({ title, products, id }: Props) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);

  useIntersectionObserver(
    intersectionRef,
    (entry) => {
      if (entry[0].isIntersecting) {
        setActiveCategoryId(id);
      }
    },
    { threshold: 0.4, root: null, rootMargin: '100px' },
  );

  return (
    <Container className="sm:px-4">
      <section className="mt-20 py-4" id={id} ref={intersectionRef}>
        <p className="text-4xl font-bold py-8">{title}</p>
        <div className="flex flex-wrap sm:gap-[2%] max-[640px]:justify-between">
          {products.map((product) => (
            <Card key={product.name} product={product}></Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
