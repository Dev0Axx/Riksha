import { supabase } from './supabaseClient';
import { Categories, Additionally } from '@/interfaces';

export const getGoods = async (): Promise<Categories[]> => {
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
    throw new Error();
  }

  const filteredCategories = data
    ? data.filter((category) => category.goods && category.goods.length > 0)
    : [];

  return filteredCategories as Categories[];
};

export const getAdditionally = async (
  category: string,
): Promise<Additionally[]> => {
  const { data, error } = await supabase
    .from('additionally')
    .select('id, name, price, img_url')
    .eq(
      'category_id',
      (
        await supabase
          .from('categories')
          .select('id')
          .eq('name', category)
          .single()
      ).data?.id,
    );
  if (error) {
    throw new Error();
  }

  return data;
};
