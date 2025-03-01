import { Container } from '@/components/shared/container';
import img1 from '../assets/Promotions/img1.svg';
import img2 from '../assets/Promotions/img2.svg';
import img3 from '../assets/Promotions/img3.svg';
import stic from '../assets/Promotions/stic.svg';
import wave from '../assets/Promotions/wave.svg';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const promotions = [
  {
    title: 'Празднуй день рождения вместе с нами',
    text: 'Ролл в подарок при заказе в день рождения',
    img: img1,
    wave: wave,
    background: 'bg-[#D2F6FF]',
  },
  {
    title: 'Доставим заказ за 60 мин',
    text: 'или проморол за опоздание',
    img: img2,
    wave: wave,
    background: 'bg-[#FFD8DA]',
  },
  {
    title: 'Приведи друга ',
    text: 'и получи 250 ₽ на бонусный счет',
    img: img3,
    wave: wave,
    background: 'bg-[#DBFFCF]',
  },
];

export default function Promotion() {
  return (
    <Container className="ls:mt-40 mt-20 px-4">
      <div className="flex items-center gap-4 max-[1024px]:justify-center">
        <b className="text-4xl">Акции</b>
        <Image src={stic} alt="" width={64} height={64}></Image>
      </div>
      <div className="flex justify-between  mt-8 lg:flex-row flex-col items-center max-[1024px]:gap-8 ">
        {promotions.map((item) => (
          <div
            key={item.title}
            className={cn(
              'flex flex-col justify-between h-[320px] xl:w-[392px]  w-[325px]  max-[1024px]:w-[392px] max-[500px]:w-[300px] p-4 rounded-2xl',
              item.background,
            )}
          >
            <div>
              <b className="text-2xl">{item.title}</b>
              <p>{item.text}</p>
            </div>
            <div className="flex justify-center bg-cover bg-no-repeat">
              <Image
                src={item.img}
                alt=""
                width={0}
                height={0}
                className="w-max h-auto"
              ></Image>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
