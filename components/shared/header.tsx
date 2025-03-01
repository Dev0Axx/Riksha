import Image from 'next/image';
import { Container } from './container';
import Navigation from './headerComponents/Navigation/Navigation';

export default function Header() {
  return (
    <>
      <header>
        <Container className="flex items-center justify-between pt-4 px-4">
          <div>
            <Image
              src={'/logo.svg'}
              alt={'Logo'}
              width={0}
              height={0}
              className="xl:w-[134px] w-[98px] h-auto "
              priority
            ></Image>
          </div>
          <div className="flex flex-col gap-5">
            <Navigation></Navigation>
          </div>
        </Container>
      </header>
    </>
  );
}
