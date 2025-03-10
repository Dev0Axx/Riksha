'use client';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { loginUser } from '@/dataBase/auth';
import { RefObject, useState } from 'react';
import { useUserState } from '@/store/user';
import { toast } from 'react-toastify';

interface ILogin {
  email: string;
  password: string;
}

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export default function Login({ dialogRef }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    mode: 'onBlur',
  });

  const [error, setError] = useState(false);
  const setUser = useUserState((state) => state.setUser);

  async function request(data: ILogin) {
    try {
      const res = await loginUser(data.email, data.password);
      if (res) {
        setError(false);
        setUser(res, data.email);
        toast.success('Успешно!');
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      }
    } catch {
      setError(true);
    }
  }

  return (
    <div className="w-[100%] flex flex-col items-center">
      <p className="text-2xl font-bold">Вход</p>
      <form
        className="flex flex-col gap-4 w-[70%] mt-4"
        onSubmit={handleSubmit(request)}
      >
        <label>
          <input
            type="email"
            placeholder="Почта"
            className={cn(
              'h-8 px-2 py-5 font-bold border-gray border-2 w-[100%]',
              errors?.email && ' border-red-600 rounded',
            )}
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
            })}
          />
          {errors?.email &&
            (errors.email.message ? (
              <p className="text-sm text-red-600 font-bold">
                {errors.email.message}
              </p>
            ) : (
              <p className="text-sm text-red-600 font-bold">
                Некорректный адрес почты
              </p>
            ))}
        </label>

        <label>
          <input
            type="password"
            placeholder="Пароль"
            className={cn(
              'h-8 px-2 py-5 font-bold border-gray border-2 w-[100%]',
              errors?.password && ' border-red-600 rounded',
            )}
            {...register('password', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors?.password && errors.password.message && (
            <p className="text-sm text-red-600 font-bold">
              {errors.password.message}
            </p>
          )}
        </label>
        <Button
          disabled={!isValid}
          type="submit"
          className="border-1 py-2 border-primary"
        >
          Войти
        </Button>
      </form>
      <div>
        {error && (
          <p className="text-sm text-red-600 font-bold text-center">
            Произошла ошибка, повторите попытку позже
          </p>
        )}
      </div>
    </div>
  );
}
