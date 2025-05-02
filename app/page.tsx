import Categories from './components/Categories';
import { Container } from '@/components/shared/container';
import Banner from './components/Banner';
import Features from './components/Features';
import Promotion from './components/Promotion';
import AboutUs from './components/AboutUs';
import { getGoods } from '@/dataBase/goods';
import ButtonBasket from './components/ButtonBasket';
import GoodsContainer from '@/components/shared/goodsContainer';
import { Categories as ICategories } from '@/interfaces';

export default async function Home() {
  const res: ICategories[] = await getGoods();
  console.log(res);
  return (
    <>
      {/* Кнопка корзины для устройств с меньшим экраном */}
      <ButtonBasket
        classes={'xl:hidden sticky top-[90%] z-10 flex justify-end mr-4'}
      />
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
