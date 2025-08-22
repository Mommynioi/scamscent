import { supabase } from '@/lib/supabase/client';

// SinkSync invite request interface
export interface SinkSyncInviteRequest {
  id?: number;
  email: string;
  name: string;
  techdom_experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  spending_willingness: '0' | '20-50' | '60-100' | '100-200' | 'unlimited';
  beta_reason: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

// Click game stats interface
export interface ClickStats {
  id?: number;
  total_clicks: number;
  total_wins: number;
  win_rate: number;
  last_played?: string;
}

// Database operations
export const database = {
  // SinkSync invite request operations
  async submitInviteRequest(
    request: Omit<SinkSyncInviteRequest, 'id' | 'created_at' | 'status'>
  ) {
    const { data, error } = await supabase
      .from('sinksync_invite_requests')
      .insert([{ ...request, status: 'pending' }])
      .select();

    if (error) throw error;
    return data;
  },

  async getInviteRequests(status?: string) {
    let query = supabase
      .from('sinksync_invite_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async updateInviteRequestStatus(id: number, status: 'approved' | 'rejected') {
    const { data, error } = await supabase
      .from('sinksync_invite_requests')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  },

  // Click game stats operations
  async updateClickStats(stats: Omit<ClickStats, 'id'>) {
    const { data, error } = await supabase
      .from('click_stats')
      .upsert([{ id: 1, ...stats }])
      .select();

    if (error) throw error;
    return data;
  },

  async getClickStats() {
    const { data, error } = await supabase
      .from('click_stats')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
    return data;
  },

  // General utility functions
  async testConnection() {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);

    if (error) throw error;
    return { connected: true, data };
  }
};

// SQL to create the tables (you can run this in your Supabase SQL editor):
export const createTablesSQL = `
-- SinkSync invite requests table
CREATE TABLE IF NOT EXISTS sinksync_invite_requests (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  techdom_experience TEXT NOT NULL CHECK (techdom_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
  spending_willingness TEXT NOT NULL CHECK (spending_willingness IN ('0', '20-50', '60-100', '100-200', 'unlimited')),
  beta_reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Click game statistics table
CREATE TABLE IF NOT EXISTS click_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_clicks INTEGER DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0.00,
  last_played TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sinksync_requests_status ON sinksync_invite_requests(status);
CREATE INDEX IF NOT EXISTS idx_sinksync_requests_created_at ON sinksync_invite_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sinksync_requests_email ON sinksync_invite_requests(email);

-- Insert initial click stats record
INSERT INTO click_stats (id, total_clicks, total_wins, win_rate) 
VALUES (1, 0, 0, 0.00) 
ON CONFLICT (id) DO NOTHING;
`;
