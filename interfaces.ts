export interface Good {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
  sizes?: string[];
}

export interface Categories {
  goods: Good[];
  id: number;
  name: string;
  sort_order: number;
}

export interface Additionally {
  id: number;
  name: string;
  price: number;
  img_url: string;
}

export interface BasketGood extends Good {
  quantity: number;
  additionally: Additionally[];
}
