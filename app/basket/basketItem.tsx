/* eslint-disable @next/next/no-img-element */
'use client';
import { useBasket } from '@/store/basket';
import { BasketGood } from '@/interfaces';
import { IoCloseOutline } from 'react-icons/io5';

type BasketItemProps = {
  item: BasketGood;
};

export default function BasketItem({ item }: BasketItemProps) {
  const addGood = useBasket((state) => state.addGood);
  const delGood = useBasket((state) => state.delGood);
  const removeAdditionally = useBasket((state) => state.removeAdditionally);
  const basketItems = useBasket((state) => state.goods);
  // Находим все товары с таким же id
  const sameIdItems = basketItems.filter((i) => i.id === item.id);

  // Проверяем, есть ли товары с одинаковыми параметрами (включая опции)
  const hasSameParameters = sameIdItems.every(
    (i) =>
      JSON.stringify(i.additionally || []) ===
      JSON.stringify(item.additionally || []),
  );

  // Если все товары с одинаковым id имеют одинаковые параметры, объединяем их
  const totalQuantity = hasSameParameters
    ? sameIdItems.reduce((total, i) => total + i.quantity, 0)
    : item.quantity;

  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between py-4">
        <div className="flex items-center gap-4 max-w-[65%]">
          {item.img_url && (
            <img
              src={item.img_url}
              alt={item.name}
              width={200}
              height={80}
              className="rounded-md max-[768px]:w-[120px] h-auto"
            />
          )}
          <div>
            <h3 className="text-lg font-medium">{item.name}</h3>
          </div>
        </div>

        <div className="flex items-center max-[768px]:justify-between max-[768px]:w-[100%] space-x-4">
          {/* Если товары с одинаковым id имеют одинаковые параметры, отображаем общее количество */}
          {hasSameParameters ? (
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => {
                  delGood(item.id, item.additionally);
                }}
                className="px-3 py-2 cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4">{totalQuantity}</span>
              <button
                onClick={() => {
                  addGood(item, item.additionally);
                }}
                className="px-3 py-2 cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            // Если параметры различаются, отображаем количество для текущего товара
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => {
                  delGood(item.id, item.additionally);
                }}
                className="px-3 py-2 cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => {
                  addGood(item, item.additionally);
                }}
                className="px-3 py-2 cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <span className="font-medium text-nowrap">
              {(item.price +
                (item.additionally?.reduce((sum, a) => sum + a.price, 0) ||
                  0)) *
                item.quantity}{' '}
              ₽
            </span>
          </div>
        </div>
      </div>
      {/* Отображаем дополнительные опции, если они есть */}
      {item.additionally && item.additionally.length > 0 && (
        <div className="text-sm text-gray-500 break-words flex gap-4 flex-wrap mb-2">
          {item.additionally.map((additional) => (
            <div key={additional.id} className="flex items-center gap-2">
              <IoCloseOutline
                size={20}
                className="cursor-pointer"
                onClick={() => {
                  removeAdditionally(item.id, additional.id);
                }}
              />
              <span>
                {additional.name} (+{additional.price} ₽)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
