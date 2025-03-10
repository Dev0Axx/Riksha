import { Container } from '@/components/shared/container';
import img1 from '@/app/assets/AboutUs/img_1.png';
import img2 from '@/app/assets/AboutUs/img_2.png';
import img from '@/app/assets/AboutUs/img.svg';
import Image from 'next/image';
import styles from './AboutUs.module.scss';

// Константы для текста
const ABOUT_US_TITLE = 'О Компании';
const ABOUT_US_DESCRIPTION_1 =
  'Вкусная доставка Рикша подарит Вам незабываемые вкусовые впечатления, украсит любой ваш стол и не заставит себя долго ждать. С нами вы сможете забыть о готовке, легко сделать приятное родным и близким, устроить вкусный праздник или расслабиться в кругу друзей. Все блюда готовятся исключительно из свежих продуктов и по оригинальным рецептам Нашего шеф-повара.';
const ABOUT_US_DESCRIPTION_2 =
  'Любая позиция из Нашего Меню может оказаться у Вас на столе максимум через 60 минут! У вас есть возможность сделать предварительный заказ на определенный день и время.';

// Компонент для текстового блока
const AboutUsText = () => (
  <div className={styles.textBlock}>
    <div className="flex gap-4 items-center max-[830px]:justify-center">
      <h2 className={styles.title}>{ABOUT_US_TITLE}</h2>
      <Image src={img} alt="Логотип компании" width={64} height={64} />
    </div>
    <p className={styles.description}>{ABOUT_US_DESCRIPTION_1}</p>
    <p>{ABOUT_US_DESCRIPTION_2}</p>
  </div>
);

// Компонент для блока с изображениями
const AboutUsImages = () => (
  <div className={styles.imageContainer}>
    <Image
      src={img1}
      alt="Изображение блюда"
      width={514}
      height={0}
      className={styles.responsiveImage}
    />
    <Image
      src={img2}
      alt="Дополнительное изображение"
      width={336}
      height={0}
      className={styles.hiddenImage}
    />
  </div>
);

// Основной компонент
export default function AboutUs() {
  return (
    <section className="mt-40 max-[830px]:mt-20">
      <Container className={styles.container}>
        <AboutUsText />
        <AboutUsImages />
      </Container>
    </section>
  );
}
