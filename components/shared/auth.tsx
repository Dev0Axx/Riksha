'use client';

import { Ref } from 'react';
import { useStateAuth } from '@/store/auth';

type Props = {
  dialogRef: Ref<HTMLDialogElement>;
};

export default function Auth({ dialogRef }: Props) {
  const auth = useStateAuth((state) => state.active);

  return (
    <dialog
      ref={dialogRef}
      className="w-[500px] h-[300px] rounded-2xl m-auto p-4 border-primary"
    >
      <div className="flex items-center flex-col gap-4">
        {auth ? (
          <div>
            <p className="text-2xl font-bold text-center">Вход</p>
            <form>
              <label className="block mb-2">Email:</label>
            </form>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-bold text-center">Регистрация</p>
            <form className="[&>label]:border-black">
              <label className="block mb-2">
                Имя
                <input type="text" className="border-black" />
              </label>
              <label className="block mb-2">
                Почта
                <input type="text" />
              </label>
              <label className="block mb-2">
                Пароль
                <input type="text" />
              </label>
            </form>
          </div>
        )}
        <p className="text-[#0000FF] cursor-pointer transition duration-300 hover:scale-110">
          {auth ? 'Зарегистрироваться' : 'Войти'}
        </p>
      </div>
    </dialog>
  );
}
