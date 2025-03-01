import { Container } from '@/components/shared/container';
import img1 from '@/app/assets/AboutUs/img_1.png';
import img2 from '@/app/assets/AboutUs/img_2.png';
import img from '@/app/assets/AboutUs/img.svg';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="mt-40 max-[830px]:mt-20">
      <Container className="flex min-[1850px]:justify-between px-4 gap-20 max-[1280px]:justify-center max-[830px]:flex-col max-[830px]:items-center max-[830px]:gap-10">
        <div className="min-[1280px]:max-w-[553px] max-w-[400px]">
          <div className="flex gap-4 items-center max-[830px]:justify-center">
            <b className="sm:text-4xl text-2xl">О Компании</b>
            <Image src={img} alt="" width={64} height={64}></Image>
          </div>
          <p className="mt-8 mb-4">
            Вкусная доставка Рикша подарит Вам незабываемые вкусовые
            впечатления, украсит любой ваш стол и не заставит себя долго ждать.
            С нами вы сможете забыть о готовке, легко сделать приятное родным и
            близким, устроить вкусный праздник или расслабится в кругу друзей.
            Все блюда готовятся исключительно из свежих продуктов и по
            оригинальным рецептам Нашего шеф-повара.
          </p>
          <p>
            Любая позиция из Нашего Меню может оказаться у Вас на столе максимум
            через 60 минут! У вас есть возможность сделать предварительный заказ
            на определенный день и время.
          </p>
        </div>
        <div className="relative">
          <Image
            src={img1}
            alt=""
            width={514}
            height={0}
            className="max-[1850px]:w-[414px] max-[1280px]:w-[314px] h-auto"
          ></Image>
          <Image
            src={img2}
            alt=""
            width={336}
            height={0}
            className="absolute top-[30%] -right-[55%] -z-1 max-[1850px]:w-[226px]  max-[1850px]:top-[38%] max-[1850px]:-right-[47%]  max-[1280px]:hidden h-auto"
          ></Image>
        </div>
      </Container>
    </div>
  );
}
