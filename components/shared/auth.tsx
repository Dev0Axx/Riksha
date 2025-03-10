'use client';

import { RefObject } from 'react';
import { useStateAuth } from '@/store/auth';
import Login from './authComponents/login';
import Register from './authComponents/register';

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export default function Auth({ dialogRef }: Props) {
  const auth = useStateAuth((state) => state.active);
  const changeAuth = useStateAuth((state) => state.setStateAuth);

  return (
    <dialog ref={dialogRef} className="w-[500px] rounded-2xl m-auto p-4">
      <div className="flex flex-col items-center">
        {auth ? (
          <Login dialogRef={dialogRef} />
        ) : (
          <Register dialogRef={dialogRef} />
        )}
        <p
          className="text-blue-600 transition duration-200 hover:scale-105 cursor-pointer mt-2"
          onClick={() => changeAuth(!auth)}
        >
          {auth ? 'Зарегистрироваться' : 'Войти'}
        </p>
      </div>
    </dialog>
  );
}
