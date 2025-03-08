import { supabase } from './supabaseClient';

export const getGoods = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select(
      `
      id,
      name,
      sort_order,
      goods (
        id,
        name,
        img_url,
        description,
        price
      )
    `,
    )
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories with goods:', error.message);
    return [];
  }

  const filteredCategories = data
    ? data.filter((category) => category.goods && category.goods.length > 0)
    : [];

  return filteredCategories;
};
