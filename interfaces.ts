export interface Good {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
  sizes?: string[];
  additionally?: Additionally[];
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
