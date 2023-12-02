export interface Groups {
  id: string;
  group_name: string;
  project: '#Demo' | '#client';
  members: number;
  last_active: string;
  disappearing_message: boolean;
  send_message_permission: 'All' | 'None';
  dp_url?: string;         // Add dp_url to the interface
  members_array?: string[]; // Add members_array to the interface
}
