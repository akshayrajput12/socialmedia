import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  university: string;
  department: string;
  bio: string;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  category: string;
  tags: string[];
  deadline: string;
  user_id: string;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
};