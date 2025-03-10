import { supabase } from './supabaseClient';

// Функция для регистрации пользователя
export const signupUser = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (user) {
      await supabase.from('profiles').insert({ user_id: user.id, username });
    }
  } catch {
    throw new Error();
  }
};

export const loginUser = async (email: string, password: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .single();
    if (error) {
      return error.message;
    }
    return data.username;
  }
};

// Функция для получения данных текущего пользователя
export const getUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw new Error();
    }

    return [user, data];
  } else {
    throw new Error();
  }
};
