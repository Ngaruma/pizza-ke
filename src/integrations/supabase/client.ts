
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://zvqrgcodojkifpaivdqf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2cXJnY29kb2praWZwYWl2ZHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTQ2MDksImV4cCI6MjA2NDk5MDYwOX0.4QiY3xJdf5DQtM2ZXGwy4Qhv2bCdemPfBwkzTmu2dic'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
