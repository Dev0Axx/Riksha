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
        src="/bg_clock.png"
        alt=""
        width={521}
        height={412}
        className="absolute -bottom-70 left-0 -z-1 hidden md:block select-none"
      ></Image>
      <Container className="md:mt-48 mt-12 px-4">
        <div className="flex justify-between gap-4 flex-col sm:flex-row">
          {advantagesData.map((advantage) => (
            <div key={advantage.name} className="flex flex-col items-center">
              <div className="flex flex-col items-center ml-3 mr-1 h-[130px]">
                <Image
                  src={advantage.text}
                  alt={advantage.name}
                  width={138}
                  height={59}
                ></Image>
                <Image
                  src={advantage.img}
                  alt={advantage.name}
                  width={0}
                  height={0}
                  className="w-max h-auto"
                ></Image>
              </div>
              <div className="text-center">
                <b>{advantage.title}</b>
                <p>{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
