import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good, Additionally, BasketGood } from '@/interfaces';

interface StateCategory {
  goods: BasketGood[];
  addGood: (good: Good, additionally?: Additionally[]) => void;
  delGood: (goodId: number, additionally?: Additionally[]) => void;
  totalItems: () => number;
  totalPrice: () => number;
  removeAdditionally: (goodId: number, additionallyId: number) => void;
  totalItemsById: (goodId: number) => number;
  removeLastGoodById: (goodId: number) => void;
}

export const useBasket = create<StateCategory>()(
  persist(
    (set, get) => ({
      goods: [],
      // Добавление товара в корзину
      addGood: (good: Good, additionally: Additionally[] = []) =>
        set((state) => {
          const existingGoodIndex = state.goods.findIndex(
            (item) =>
              item.id === good.id &&
              JSON.stringify(item.additionally || []) ===
                JSON.stringify(additionally),
          );

          if (existingGoodIndex > -1) {
            const updatedGoods = [...state.goods];
            updatedGoods[existingGoodIndex] = {
              ...updatedGoods[existingGoodIndex],
              quantity: updatedGoods[existingGoodIndex].quantity + 1,
            };
            return { goods: updatedGoods };
          } else {
            return {
              goods: [
                ...state.goods,
                {
                  ...good,
                  quantity: 1,
                  additionally,
                },
              ],
            };
          }
        }),
      removeLastGoodById: (goodId: number) =>
        set((state) => {
          const existingGoodIndex = state.goods
            .slice()
            .reverse()
            .findIndex((item) => item.id === goodId);
          if (existingGoodIndex !== -1) {
            return {
              goods: state.goods.filter(
                (_, index) =>
                  index !== state.goods.length - 1 - existingGoodIndex,
              ),
            };
          }
          return { goods: state.goods };
        }),

      // Уменьшение количества товара (удаление последнего добавленного с учетом опций)
      delGood: (goodId: number, additionally: Additionally[] = []) =>
        set((state) => {
          // Ищем товар с конца массива с учетом опций
          const existingGoodIndex = state.goods
            .slice()
            .reverse()
            .findIndex(
              (item) =>
                item.id === goodId &&
                JSON.stringify(item.additionally || []) ===
                  JSON.stringify(additionally),
            );

          if (existingGoodIndex !== -1) {
            const updatedGoods = [...state.goods];
            const actualIndex = state.goods.length - 1 - existingGoodIndex; // Получаем реальный индекс
            if (updatedGoods[actualIndex].quantity > 1) {
              updatedGoods[actualIndex] = {
                ...updatedGoods[actualIndex],
                quantity: updatedGoods[actualIndex].quantity - 1,
              };
              return { goods: updatedGoods };
            } else {
              // Если количество = 1, удаляем товар из корзины
              return {
                goods: state.goods.filter((_, index) => index !== actualIndex),
              };
            }
          }
          return { goods: state.goods };
        }),
      // Общее количество товаров в корзине
      totalItems: () =>
        get().goods.reduce((total, item) => total + item.quantity, 0),
      // Общая стоимость корзины (с учетом дополнительных опций)
      totalPrice: () =>
        get().goods.reduce(
          (total, item) =>
            total +
            item.price * item.quantity +
            (item.additionally || []).reduce(
              (sum, additional) => sum + additional.price,
              0,
            ) *
              item.quantity,
          0,
        ),
      // Удаление дополнительной опции у товара
      removeAdditionally: (goodId: number, additionallyId: number) =>
        set((state) => {
          const existingGoodIndex = state.goods.findIndex(
            (item) => item.id === goodId,
          );

          if (existingGoodIndex > -1) {
            const updatedGoods = [...state.goods];
            const updatedGood = {
              ...updatedGoods[existingGoodIndex],
              additionally: (
                updatedGoods[existingGoodIndex].additionally || []
              ).filter((item) => item.id !== additionallyId),
            };
            updatedGoods[existingGoodIndex] = updatedGood;
            return { goods: updatedGoods };
          }
          return { goods: state.goods };
        }),
      // Общее количество товаров с одинаковым id
      totalItemsById: (goodId: number) =>
        get().goods.reduce((total, item) => {
          if (item.id === goodId) {
            return total + item.quantity;
          }
          return total;
        }, 0),
    }),
    {
      name: 'basket-storage',
    },
  ),
);
