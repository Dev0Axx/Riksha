import Link from 'next/link';
import { BsTelephone } from 'react-icons/bs';
import { Button } from '../../../ui/button';
import { CgProfile } from 'react-icons/cg';
import NavigationList from '../NavigationList/NavigationList';

export default function Navigation() {
  return (
    <div className="flex gap-8 flex-col xl:flex-row xl:gap-20 ">
      <nav className="hidden sm:block">
        <ul className="[&>li]:list:none flex justify-between gap-6 ">
          <li>
            <Link href={''}>О нас</Link>
          </li>
          <li>
            <Link href={''}>Доставка и оплата</Link>
          </li>
          <li>
            <Link href={''}>Контакты</Link>
          </li>
          <li>
            <Link href={''}>Бонусы</Link>
          </li>
          <li>
            <Link href={''}>Вакансии</Link>
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
          <Button
            variant="outline"
            className="flex items-center sm:gap-3 gap-1"
          >
            <CgProfile size={15} /> Войти
          </Button>
          <NavigationList className="block sm:hidden"></NavigationList>
        </div>
      </div>
    </div>
  );
}
