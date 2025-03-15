import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good, Additionally } from '@/interfaces';

interface BasketItem {
  good: Good;
  quantity: number;
}

interface StateCategory {
  goods: BasketItem[];
  addGood: (good: Good) => void;
  delGood: (goodId: number) => void;
  removeGood: (goodId: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
  addAdditionally: (goodId: number, additionally: Additionally) => void;
  removeAdditionally: (goodId: number, additionallyId: number) => void;
}

export const useBasket = create<StateCategory>()(
  persist(
    (set, get) => ({
      goods: [],
      // Добавление товара в корзину
      addGood: (good: Good) =>
        set((state) => {
          // Если товар уже есть в корзине, увеличиваем его количество
          const existingItemIndex = state.goods.findIndex(
            (item) => item.good.id === good.id,
          );

          if (existingItemIndex > -1) {
            const updatedGoods = [...state.goods];
            updatedGoods[existingItemIndex] = {
              ...updatedGoods[existingItemIndex],
              quantity: updatedGoods[existingItemIndex].quantity + 1,
            };
            return { goods: updatedGoods };
          } else {
            // Если товара нет в корзине, добавляем его
            return {
              goods: [...state.goods, { good, quantity: 1 }],
            };
          }
        }),
      // Уменьшение количества товара или удаление, если количество = 1
      delGood: (goodId: number) =>
        set((state) => {
          const existingItemIndex = state.goods.findIndex(
            (item) => item.good.id === goodId,
          );

          if (existingItemIndex > -1) {
            const updatedGoods = [...state.goods];
            if (updatedGoods[existingItemIndex].quantity > 1) {
              updatedGoods[existingItemIndex] = {
                ...updatedGoods[existingItemIndex],
                quantity: updatedGoods[existingItemIndex].quantity - 1,
              };
              return { goods: updatedGoods };
            } else {
              // Если количество = 1, удаляем товар из корзины
              return {
                goods: state.goods.filter((item) => item.good.id !== goodId),
              };
            }
          }
          return { goods: state.goods };
        }),
      // Полное удаление товара из корзины
      removeGood: (goodId: number) =>
        set((state) => ({
          goods: state.goods.filter((item) => item.good.id !== goodId),
        })),
      // Общее количество товаров в корзине
      totalItems: () =>
        get().goods.reduce((total, item) => total + item.quantity, 0),
      // Общая стоимость корзины (с учетом дополнительных опций)
      totalPrice: () =>
        get().goods.reduce(
          (total, item) =>
            total +
            item.good.price * item.quantity +
            (item.good.additionally?.reduce(
              (sum, additional) => sum + additional.price,
              0,
            ) || 0) *
              item.quantity,
          0,
        ),
      // Добавление дополнительной опции к товару
      addAdditionally: (goodId: number, additionally: Additionally) =>
        set((state) => {
          const existingItemIndex = state.goods.findIndex(
            (item) => item.good.id === goodId,
          );
          console.log(state.goods);
          if (existingItemIndex > -1) {
            const updatedGoods = [...state.goods];
            const updatedGood = {
              ...updatedGoods[existingItemIndex].good,
              additionally: [
                ...(updatedGoods[existingItemIndex].good.additionally || []),
                additionally,
              ],
            };
            updatedGoods[existingItemIndex] = {
              ...updatedGoods[existingItemIndex],
              good: updatedGood,
            };
            return { goods: updatedGoods };
          }
          return { goods: state.goods };
        }),
      // Удаление дополнительной опции у товара
      removeAdditionally: (goodId: number, additionallyId: number) =>
        set((state) => {
          const existingItemIndex = state.goods.findIndex(
            (item) => item.good.id === goodId,
          );

          if (existingItemIndex > -1) {
            const updatedGoods = [...state.goods];
            const updatedGood = {
              ...updatedGoods[existingItemIndex].good,
              additionally: updatedGoods[
                existingItemIndex
              ].good.additionally?.filter((item) => item.id !== additionallyId),
            };
            updatedGoods[existingItemIndex] = {
              ...updatedGoods[existingItemIndex],
              good: updatedGood,
            };
            return { goods: updatedGoods };
          }
          return { goods: state.goods };
        }),
    }),
    {
      name: 'basket-storage',
    },
  ),
);
