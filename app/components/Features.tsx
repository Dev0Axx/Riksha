import { Container } from '@/components/shared/container';
import Image from 'next/image';

import DeliverText from '../assets/advantages/deliver/text.svg';
import DeliverImg from '../assets/advantages/deliver/ic.svg';
import FreeText from '../assets/advantages/free/text.svg';
import FreeImg from '../assets/advantages/free/ic.svg';
import GiveText from '../assets/advantages/give/text.svg';
import GiveImg from '../assets/advantages/give/ic.svg';
import NewText from '../assets/advantages/new/text.svg';
import NewImg from '../assets/advantages/new/ic.svg';

const advantagesData = [
  {
    name: 'free',
    text: FreeText,
    img: FreeImg,
    title: 'доставка',
    description: 'при заказе от 600 ₽',
  },
  {
    name: 'deliver',
    text: DeliverText,
    img: DeliverImg,
    title: 'за 60 мин',
    description: 'или проморол за опоздание',
  },
  {
    name: 'give',
    text: GiveText,
    img: GiveImg,
    title: 'бонусы',
    description: 'бонусная система 1 ₽ = 1 бонус',
  },
  {
    name: 'new',
    text: NewText,
    img: NewImg,
    title: 'продукты',
    description: 'Никаких заготовок!',
  },
];

export default function Features() {
  return (
    <div className="relative">
      <Image
        src="/bg_clock.webp"
        alt="Фоновое изображение"
        width={330}
        height={521}
        className="absolute -bottom-10 left-0 -z-10 hidden md:block select-none"
        priority
      />

      <Container className="md:mt-24 mt-12 px-4">
        <div className="flex justify-between flex-wrap sm:gap-[1%] gap-2">
          {advantagesData.map((advantage) => (
            <div
              key={advantage.name}
              className="flex flex-col items-center max-sm:w-[45%] w-[24%]"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={advantage.text}
                  alt={advantage.name}
                  width={138}
                  height={59}
                  className="max-sm:w-[95px] h-auto"
                />
                <Image
                  src={advantage.img}
                  alt={advantage.name}
                  width={0}
                  height={0}
                  className="sm:w-max w-[70px] h-auto"
                />
              </div>

              <div className="text-center">
                <b className="sm:text-lg font-bold">{advantage.title}</b>
                <p className="sm:text-sm text-xs text-gray-600">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
