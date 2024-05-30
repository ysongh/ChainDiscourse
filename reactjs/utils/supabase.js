import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '../keys';

const supabaseUrl = 'https://rixrgcbjsmlibcffbkht.supabase.co';
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const connect = () => {
  console.log(supabase);
}