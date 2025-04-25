/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import { BsTelephone } from 'react-icons/bs';
import { Button } from '../../../ui/button';
import { CgProfile } from 'react-icons/cg';
import NavigationList from '../NavigationList/NavigationList';
import { useRef, useState } from 'react';
import Auth from '../../auth';
import { useEffect } from 'react';
import { getUserData } from '@/dataBase/auth';
import { useUserState } from '@/store/user';
import { Skeleton } from '@/components/ui/skeleton';
import { IoMdExit } from 'react-icons/io';
import { singOut } from '@/dataBase/auth';
import { toast } from 'react-toastify';

export default function Navigation() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const username = useUserState((state) => state.username);
  const setUser = useUserState((state) => state.setUser);

  const [isLoading, setIsLoading] = useState(true);

  async function getUser() {
    try {
      const res = await getUserData();
      if (res) {
        setUser(res[1].username, res[0].user_metadata.email);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex gap-8 flex-col xl:flex-row xl:gap-20 ">
      <nav className="hidden sm:block">
        <ul className="[&>li]:list:none flex justify-between gap-6 ">
          <li>
            <Link href={'/'}>Главная</Link>
          </li>
          <li>
            <Link href={'/basket'}>Корзина</Link>
          </li>
        </ul>
      </nav>
      <div className="flex xl:justify-between xl:gap-12 justify-end gap-4">
        <div className="hidden sm:block">
          <div className="flex items-center justify-between gap-4">
            <BsTelephone />
            <p>+7 (495) 617-14-24</p>
          </div>
          <div className="text-right text-[#B7B7B7] text-xs">
            <p>c 10:00 до 23:00</p>
          </div>
        </div>
        <div className="flex items-center sm:gap-3 gap-4">
          {isLoading ? (
            <Skeleton className="w-[113px] h-[40px]" />
          ) : (
            <Button
              variant="outline"
              className="flex items-center sm:gap-3 gap-1"
              onClick={() => {
                if (username === '') {
                  dialogRef.current?.showModal();
                }
              }}
            >
              <CgProfile size={15} />
              <p>{username === '' ? 'Войти' : username}</p>
            </Button>
          )}
          {username != '' && (
            <IoMdExit
              size={25}
              className="cursor-pointer"
              onClick={() => {
                singOut();
                setUser('', '');
                toast.success('Вы вышли из аккаунта!');
              }}
            />
          )}
          <NavigationList className="block sm:hidden"></NavigationList>
        </div>
      </div>
      <Auth dialogRef={dialogRef} />
    </div>
  );
}
