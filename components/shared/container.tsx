import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  className?: string;
};

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <>
      <div className={cn('mx-auto xl:max-w-[1280px]', className)}>
        {children}
      </div>
    </>
  );
};
