export interface Good {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
  sizes?: string[];
  categoryName: string;
  likes: number;
  dislikes: number;
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
  basketItemId: string;
  quantity: number;
  additionally?: Additionally[];
  size?: string;
}
