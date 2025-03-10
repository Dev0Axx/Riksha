import { Container } from '@/components/shared/container';
import Image from 'next/image';

// Константы для текста
const BANNER_TITLE = 'Калифорния';
const BANNER_TITLE_HIGHLIGHT = 'в подарок';
const BANNER_SUBTITLE = 'при первом заказе';
const BANNER_DESCRIPTION = 'от 1500 ₽';
const BANNER_BADGE_TEXT = 'Выгодно';

// Компонент для текстового блока
const BannerText = () => (
  <div className="text-left">
    <h2 className="text-2xl font-bold min-[500px]:text-3xl md:text-4xl">
      {BANNER_TITLE}{' '}
      <span className="text-primary">{BANNER_TITLE_HIGHLIGHT}</span>
    </h2>
    <p className="mt-2">{BANNER_SUBTITLE}</p>
    <p className="font-normal text-base mt-2">{BANNER_DESCRIPTION}</p>
  </div>
);

// Компонент для изображения
const BannerImage = () => (
  <div>
    <Image
      priority
      src="/banner.svg"
      alt="Баннер с изображением Калифорнии"
      width={448}
      height={424}
      className="w-full h-auto object-cover"
    />
  </div>
);

// Компонент для бейджа
const BannerBadge = () => (
  <div className="absolute bg-primary rounded-full flex justify-center items-center font-bold text-amber-50 md:text-2xl md:w-42 md:h-42 w-28 h-28 md:-bottom-20 -bottom-12 left-10">
    {BANNER_BADGE_TEXT}
  </div>
);

// Основной компонент
export default function Banner() {
  return (
    <Container>
      <section className="bg-[#F5F9FA] mt-12 flex justify-around items-center relative mx-4 px-4">
        <BannerText />
        <BannerImage />
        <BannerBadge />
      </section>
    </Container>
  );
}
