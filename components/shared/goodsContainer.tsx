'use client';

import { useState, useMemo, useCallback } from 'react';
import 'rc-slider/assets/index.css';
import CardsContainer from './goodsComponents/cardsContainer';
import { Categories } from '@/interfaces';

import Filters from './goodsComponents/filters';

interface Props {
  categories: Categories[];
}

type SortDirection = 'asc' | 'desc' | null;

export default function GoodsContainer({ categories }: Props) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchText, setSearchText] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filteredCategories = useMemo(() => {
    const [minPrice, maxPrice] = priceRange;

    return categories
      .map((category) => {
        let filteredGoods = category.goods.filter(
          (product) =>
            product.price >= minPrice &&
            product.price <= maxPrice &&
            product.name.toLowerCase().includes(searchText.toLowerCase()),
        );

        if (sortDirection) {
          filteredGoods = [...filteredGoods].sort((a, b) => {
            return sortDirection === 'asc'
              ? a.price - b.price
              : b.price - a.price;
          });
        }

        return {
          ...category,
          goods: filteredGoods,
        };
      })
      .filter((category) => category.goods.length > 0);
  }, [categories, priceRange, searchText, sortDirection]);

  const applyFilter = useCallback((range: number[]) => {
    setPriceRange(range);
  }, []);

  const filterSetsByName = useCallback((searchString: string) => {
    setSearchText(searchString);
  }, []);

  const handleSort = useCallback((direction: SortDirection) => {
    setSortDirection(direction);
  }, []);

  return (
    <div className="bg-[rgb(251,251,251)] px-4 sm:mt-24 mt-12">
      <Filters
        priceRange={priceRange}
        searchText={searchText}
        applyFilter={applyFilter}
        filterSetsByName={filterSetsByName}
        onSort={handleSort}
        sortDirection={sortDirection}
      />
      {filteredCategories.map((category) => (
        <CardsContainer key={category.id} category={category} />
      ))}
    </div>
  );
}
