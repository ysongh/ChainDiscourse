import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '../keys';

const supabaseUrl = 'https://rixrgcbjsmlibcffbkht.supabase.co';
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const connect = () => {
  console.log(supabase);
}

export const getTokenIDByAddress = async (address) => {
  let { data: user, error } = await supabase
    .from('user')
    .select("*")
    .eq('address', address);
    console.log(user, error);
  if (error) return [];
  return user[0].token_ID;
}

export const getSpaces = async () => {
  let { data: space, error } = await supabase
    .from('space')
    .select('*');
  console.log(space);
  if (error) return [];
  return space;
}

export const addSpace = async (from, name) => {
  const { data, error } = await supabase
    .from('space')
    .insert([
      { from: from, name: name },
    ])
    .select()
  console.log(data);
}