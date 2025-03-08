import { supabase } from './supabaseClient';

// Функция для регистрации пользователя
export const signupUser = async (
  email: string,
  password: string,
  username: string,
) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  if (user) {
    const { error } = await supabase
      .from('profiles')
      .insert({ user_id: user.id, username });
    if (error) {
      return error.message;
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  const {
    data: { user, session },
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
    return { user, session, data };
  }
};

// Функция для получения данных текущего пользователя
export const getUserData = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      return error.message;
    }

    return [user, data];
  } else {
    return error?.message;
  }
};
