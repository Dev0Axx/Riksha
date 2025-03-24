import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good, Additionally, BasketGood } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';

interface StateCategory {
  goods: BasketGood[];
  addGood: (good: Good, additionally?: Additionally[]) => string;
  updateGood: (basketItemId: string, updates: Partial<BasketGood>) => void;
  increaseQuantity: (basketItemId: string) => void;
  decreaseQuantity: (basketItemId: string) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useBasket = create<StateCategory>()(
  persist(
    (set, get) => ({
      goods: [],
      // Добавление товара в корзину с генерацией уникального ID
      addGood: (good: Good, additionally: Additionally[] = []) => {
        const basketItemId = uuidv4();
        const newItem: BasketGood = {
          ...good,
          basketItemId,
          quantity: 1,
          additionally,
        };

        set((state) => ({
          goods: [...state.goods, newItem],
        }));
        return basketItemId;
      },

      // Редактирование товара в корзине
      updateGood: (basketItemId: string, updates: Partial<BasketGood>) =>
        set((state) => ({
          goods: state.goods.map((item) =>
            item.basketItemId === basketItemId ? { ...item, ...updates } : item,
          ),
        })),

      // Увеличение количества товара
      increaseQuantity: (basketItemId: string) =>
        set((state) => ({
          goods: state.goods.map((item) =>
            item.basketItemId === basketItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      // Уменьшение количества товара (если quantity > 1) или удаление
      decreaseQuantity: (basketItemId: string) =>
        set((state) => {
          const item = state.goods.find(
            (item) => item.basketItemId === basketItemId,
          );
          if (!item) return { goods: state.goods };

          if (item.quantity > 1) {
            return {
              goods: state.goods.map((i) =>
                i.basketItemId === basketItemId
                  ? { ...i, quantity: i.quantity - 1 }
                  : i,
              ),
            };
          } else {
            return {
              goods: state.goods.filter((i) => i.basketItemId !== basketItemId),
            };
          }
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
    }),
    {
      name: 'basket-storage',
    },
  ),
);
