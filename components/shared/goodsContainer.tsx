'use client';

import { useState, useMemo, useCallback } from 'react'; // Добавляем useMemo и useCallback
import 'rc-slider/assets/index.css';
import CardsContainer from './goodsComponents/cardsContainer';
import { Categories } from '@/interfaces';

import Filters from './goodsComponents/filters';

interface Props {
  categories: Categories[];
}

export default function GoodsContainer({ categories }: Props) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchText, setSearchText] = useState('');
  const filteredCategories = useMemo(() => {
    const [minPrice, maxPrice] = priceRange;

    return categories
      .map((category) => ({
        ...category,
        goods: category.goods.filter(
          (product) =>
            product.price >= minPrice &&
            product.price <= maxPrice &&
            product.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      }))
      .filter((category) => category.goods.length > 0);
  }, [categories, priceRange, searchText]);

  const applyFilter = useCallback((range: number[]) => {
    setPriceRange(range);
  }, []);

  const filterSetsByName = useCallback((searchString: string) => {
    setSearchText(searchString);
  }, []);

  return (
    <div className="bg-[rgb(251,251,251)] px-4 mt-12">
      <Filters
        priceRange={priceRange}
        searchText={searchText}
        applyFilter={applyFilter}
        filterSetsByName={filterSetsByName}
      />
      {filteredCategories.map((category) => (
        <CardsContainer key={category.id} category={category} />
      ))}
    </div>
  );
}
