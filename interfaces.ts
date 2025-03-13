export interface Goods {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
}

export interface Categories {
  goods: Goods[];
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
