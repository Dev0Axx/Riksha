import Categories from '@/components/shared/headerComponents/Categories/Categories';
import { Container } from '@/components/shared/container';
import Banner from './components/Banner';
import Features from './components/Features';
import Promotion from './components/Promotion';
import AboutUs from './components/AboutUs';
import CardsContainer from '@/components/shared/cardsContainer';
import { getGoods } from '@/dataBase/goods';

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

export default async function Home() {
  const res: Categories[] = await getGoods();

  return (
    <>
      <Container>
        <h1 className="xl:text-4xl font-medium mb-6 mt-16 ml-4 text-2xl">
          Категории
        </h1>
      </Container>
      <Categories />
      <Banner />
      <Features />

      <div className="bg-[rgb(251,251,251)] px-4 mt-8">
        {res.map((category) => (
          <CardsContainer key={category.id} category={category} />
        ))}
      </div>

      <Promotion />
      <AboutUs />
    </>
  );
}
