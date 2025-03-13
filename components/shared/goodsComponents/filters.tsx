import { Container } from '../container';
import Slider from 'rc-slider';
import { IoIosSearch } from 'react-icons/io';

type Props = {
  priceRange: number[];
  searchText: string;
  applyFilter: (range: number[]) => void;
  filterSetsByName: (searchString: string) => void;
};

export default function Filters({
  priceRange,
  searchText,
  applyFilter,
  filterSetsByName,
}: Props) {
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      applyFilter(value);
    }
  };

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPriceRange = [...priceRange];
      newPriceRange[index] = Number(event.target.value);
      applyFilter(newPriceRange);
    };

  const handleSliderAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      applyFilter(value);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterSetsByName(e.target.value);
  };

  return (
    <Container className="p-4 flex sm:flex-row flex-col gap-4 justify-between">
      <div className="flex sm:flex-col flex-row items-center gap-4">
        <div className="flex sm:gap-4 gap-1">
          <input
            type="number"
            placeholder="0"
            value={priceRange[0] == 0 ? '' : priceRange[0]}
            onChange={handleInputChange(0)}
            className="border-2 border-primary p-2 sm:w-max w-24 rounded-2xl"
          />

          <input
            type="number"
            placeholder="5000"
            value={
              priceRange[1] == 5000 || priceRange[1] == 0 ? '' : priceRange[1]
            }
            onChange={handleInputChange(1)}
            className="border-2 border-primary p-2 sm:w-max w-24 rounded-2xl"
          />
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
      <div className="w-[100%] relative">
        <input
          type="text"
          placeholder={'Поиск...'}
          value={searchText}
          onChange={handleSearchChange}
          className="border-2 rounded-2xl border-primary py-2 px-6 w-[100%]"
        />
        <IoIosSearch size={20} className="absolute top-3 left-1" />
      </div>
    </Container>
  );
}
