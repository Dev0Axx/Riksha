'use client';

import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CardsContainer from './goodsComponents/cardsContainer';
import { Categories } from '@/interfaces';
import { Container } from './container';

interface Props {
  categories: Categories[];
}

export default function GoodsContainer({ categories }: Props) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filteredCategories, setFilteredCategories] =
    useState<Categories[]>(categories);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
    }
  };

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPriceRange = [...priceRange];
      newPriceRange[index] = Number(event.target.value);
      setPriceRange(newPriceRange);
      const filtered = applyFilter(newPriceRange, categories);
      setFilteredCategories(filtered);
    };

  const handleSliderAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
      const filtered = applyFilter(value, categories);
      setFilteredCategories(filtered);
      console.log(filtered);
    }
  };

  const applyFilter = (
    range: number[],
    categories: Categories[],
  ): Categories[] => {
    const [minPrice, maxPrice] = range;
    return categories.map((category) => ({
      ...category,
      goods: category.goods.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice,
      ),
    }));
  };

  return (
    <div className="bg-[rgb(251,251,251)] px-4 mt-12">
      <Container className="p-4 flex flex-col gap-4 items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="ml-2 mb-1">От:</p>
              <input
                type="number"
                value={priceRange[0]}
                onChange={handleInputChange(0)}
                className="border-2 border-primary p-2 sm:w-max w-24"
              />
            </div>
            <div>
              <p className="ml-2 mb-1">До:</p>
              <input
                type="number"
                value={priceRange[1]}
                onChange={handleInputChange(1)}
                className="border-2 border-primary p-2 sm:w-max w-24"
              />
            </div>
          </div>
          <Slider
            range
            min={0}
            max={5000}
            value={priceRange}
            onChangeComplete={handleSliderAfterChange}
            onChange={handleSliderChange}
            className="max-w-[100%]"
          />
        </div>
      </Container>
      {filteredCategories.map((category) => (
        <CardsContainer key={category.id} category={category} />
      ))}
    </div>
  );
}
