import Categories from './components/Categories';
import { Container } from '@/components/shared/container';
import Banner from './components/Banner';
import Features from './components/Features';
import Promotion from './components/Promotion';
import AboutUs from './components/AboutUs';
import { getGoods } from '@/dataBase/goods';
import ButtonBasket from './components/ButtonBasket';
import GoodsContainer from '@/components/shared/goodsContainer';

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
      {/* Кнопка корзины для устройств с меньшим экраном */}
      <ButtonBasket />
      <Container>
        <h1 className="xl:text-4xl font-medium mb-6 mt-16 ml-4 text-2xl">
          Категории
        </h1>
      </Container>
      <Categories />
      <Banner />
      <Features />

      {/* Категории товаров */}
      <GoodsContainer categories={res} />

      <Promotion />
      <AboutUs />
    </>
  );
}
