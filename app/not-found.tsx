'use client';

import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container className="px-4">
      <div className="flex flex-col justify-center items-center gap-12">
        <Image
          src="/404.png"
          alt="404"
          width={860}
          height={0}
          className="w-max h-auto"
        ></Image>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="sm:text-4xl text-2xl font-bold">
            Страница не найдена
          </h1>
          <div className="flex items-center flex-col">
            <p>
              Извините, но страницу, которую Вы пытаетесь найти - не существует.
            </p>
            <p>Предлагаем Вам перейти на Главную страницу</p>
          </div>
        </div>
        <Button
          variant="card"
          size="card"
          className="bg-[url('/bt_bg.svg')]"
          onClick={() => {
            router.push('/');
          }}
        >
          На главную
        </Button>
      </div>
    </Container>
  );
}
