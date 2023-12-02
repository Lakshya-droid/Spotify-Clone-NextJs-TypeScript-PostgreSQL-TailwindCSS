// components/GroupDetails.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Groups } from '@/types';

const GroupDetails = ({ group }: { group: Groups }) => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl font-semibold mb-4">{group.group_name} Details</h2>
      <p>ID: {group.id}</p>
      <p>Project: {group.project}</p>
      <p>Members: {group.members}</p>
      <p>Last Active: {group.last_active}</p>
      <p>Disappearing Message: {group.disappearing_message.toString()}</p>
      <p>Send Message Permission: {group.send_message_permission}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GroupDetails;
