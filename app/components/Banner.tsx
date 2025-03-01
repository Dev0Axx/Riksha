import { Container } from '@/components/shared/container';
import Image from 'next/image';

export default function Banner() {
  return (
    <Container>
      <div className="bg-[#F5F9FA] mt-12 flex justify-around items-center relative mx-4 px-4">
        <div className=" md:text-4xl font-bold min-[500px]:text-2xl">
          <p>
            Калифорния <span className="text-primary">в подарок</span>
          </p>
          <p>при первом заказе</p>
          <p className="font-normal text-normal">от 1500 ₽</p>
        </div>
        <div className="absolute bg-primary border-r-2 md:size-42 size-28 rounded-full md:flex justify-center items-center font-bold md:text-2xl text-amber-50 md:-bottom-20 left-10 -bottom-12 hidden">
          Выгодно
        </div>
        <div>
          <Image
            priority
            src="/banner.svg"
            alt="IMG"
            width={448}
            height={424}
            className="w-max h-max object-cover"
          ></Image>
        </div>
      </div>
      <div></div>
    </Container>
  );
}
