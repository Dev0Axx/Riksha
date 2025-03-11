'use client';

import Image from 'next/image';
import { Container } from './container';
import Navigation from './headerComponents/Navigation/Navigation';
import { useRouter } from 'next/navigation';

function Logo() {
  return (
    <Image
      src={'/logo.svg'}
      alt={'Logo'}
      width={134}
      height={50}
      className="xl:w-[134px] w-[98px] h-auto cursor-pointer"
      priority
    />
  );
}

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <>
      <header>
        <Container className="flex items-center justify-between pt-4 px-4">
          <div onClick={handleLogoClick}>
            <Logo />
          </div>
          <div className="flex flex-col gap-5">
            <Navigation></Navigation>
          </div>
        </Container>
      </header>
    </>
  );
}
