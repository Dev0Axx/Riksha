/* eslint-disable @next/next/no-img-element */
import { Additionally as IAdditionally } from '@/interfaces';

type Props = {
  additionallyItems: IAdditionally[] | null;
};

export default function Additionally({ additionallyItems }: Props) {
  console.log(additionallyItems);
  return (
    <div className="mt-8">
      {additionallyItems?.length ? (
        <h1 className="text-2xl font-bold mb-6">Добавить по вкусу</h1>
      ) : null}
      <div className="flex gap-[1%] justify-between flex-wrap">
        {additionallyItems?.map((item) => (
          <div
            key={item.id}
            className="w-[32%] p-2 bg-white rounded-4xl flex flex-col items-center text-center gap-2 cursor-pointer"
          >
            <img src={item.img_url} alt={item.name} />
            <div className="flex justify-between h-[100%] gap-1 flex-col p-2">
              <p className="sm:text-base text-sm">{item.name}</p>
              <p className="font-medium">{item.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
