import { createClient } from '@supabase/supabase-js'

import type { Database } from '~/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
