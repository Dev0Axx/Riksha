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
        price,
        sizes,
        likes,
        dislikes
      )
    `,
    )
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error();
  }
  console.log(data);
  const filteredCategories = data
    ? data.filter((category) => category.goods && category.goods.length > 0)
    : [];

  const categoriesWithGoods = filteredCategories.map((category) => ({
    ...category,
    goods: category.goods.map((good) => ({
      ...good,
      categoryName: category.name,
    })),
  }));

  return categoriesWithGoods as Categories[];
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

export const likeProduct = async (productId: number): Promise<void> => {
  // Получаем текущее количество лайков
  const { data: productData, error: fetchError } = await supabase
    .from('goods')
    .select('likes')
    .eq('id', productId)
    .single();

  if (fetchError) throw new Error(fetchError.message);
  // Обновляем количество лайков
  const { error } = await supabase
    .from('goods')
    .update({ likes: productData.likes + 1 })
    .eq('id', productId);

  if (error) throw new Error(error.message);
};

// Эндпоинт для добавления дизлайка
export const dislikeProduct = async (productId: number): Promise<void> => {
  // Получаем текущее количество дизлайков
  const { data: productData, error: fetchError } = await supabase
    .from('goods')
    .select('dislikes')
    .eq('id', productId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Обновляем количество дизлайков
  const { error } = await supabase
    .from('goods')
    .update({ dislikes: (productData.dislikes || 0) + 1 })
    .eq('id', productId);

  if (error) throw new Error(error.message);
};
