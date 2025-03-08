// store/basket.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Good {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
}

interface BasketItem {
  good: Good;
  quantity: number;
}

interface StateCategory {
  goods: BasketItem[];
  addGood: (good: Good) => void;
  delGood: (good: Good) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useBasket = create<StateCategory>()(
  persist(
    (set, get) => ({
      goods: [],
      addGood: (good: Good) =>
        set((state) => {
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
            return { goods: [...state.goods, { good: good, quantity: 1 }] };
          }
        }),
      delGood: (good: Good) =>
        set((state) => {
          const existingItemIndex = state.goods.findIndex(
            (item) => item.good.id === good.id,
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
              return {
                goods: state.goods.filter((item) => item.good.id !== good.id),
              };
            }
          }
          return { goods: state.goods };
        }),
      totalItems: () =>
        get().goods.reduce((total, item) => total + item.quantity, 0),
      totalPrice: () =>
        get().goods.reduce(
          (total, item) => total + item.good.price * item.quantity,
          0,
        ),
    }),
    {
      name: 'basket-storage',
    },
  ),
);
