export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: number;
          group_name: string;
          project: '#Demo' | '#client';
          members: number;
          last_active: string;
          disappearing_message: boolean;
          send_message_permission: 'All' | 'None';
          dp_url?: string;  // Add dp_url to the Row interface
          members_array?: string[];  // Add members_array to the Row interface
        };
        Insert: {
          id?: number;
          group_name: string;
          project: '#Demo' | '#client';
          members: number;
          last_active: string;
          disappearing_message: boolean;
          send_message_permission: 'All' | 'None';
          dp_url?: string;  // Add dp_url to the Insert interface
          members_array?: string[];  // Add members_array to the Insert interface
        };
        Update: {
          id?: number;
          group_name?: string;
          project?: '#Demo' | '#client';
          members?: number;
          last_active?: string;
          disappearing_message?: boolean;
          send_message_permission?: 'All' | 'None';
          dp_url?: string;  // Add dp_url to the Update interface
          members_array?: string[];  // Add members_array to the Update interface
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
      pricing_type: 'one_time' | 'recurring';
      subscription_status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
