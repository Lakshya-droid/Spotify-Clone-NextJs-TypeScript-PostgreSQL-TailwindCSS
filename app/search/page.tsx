"use client"
// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import ListItem from "@/components/ListItem";
import { Groups } from "@/types";
import Header from "@/components/Header";
import getLikedSongs from "@/actions/getLikedSongs";
import { HiUserGroup } from 'react-icons/hi';
import { FiRefreshCcw } from 'react-icons/fi';
import { HiArrowsUpDown } from 'react-icons/hi2';
// Define the interface for component props
interface SearchProps {
  searchParams: {
    title: string;
  };
}

// Define the Search component
const Search: React.FC<SearchProps> = ({ searchParams }) => {
  // State to manage the selected group and result data
  const [selectedGroup, setSelectedGroup] = useState<Groups | null>(null);
  const [result, setResult] = useState<Groups[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'logs'>('overview');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data: Groups[] = await getLikedSongs();
      setResult(data);
    };

    fetchData();
  }, []);

  // Handle group click to update the selectedGroup state
  const handleGroupClick = (group: Groups) => {
    setSelectedGroup(group);
  };

  // Function to format the last active date
  const formatLastActive = (lastActive: string) => {
    const today = new Date();
    const lastActiveDate = new Date(lastActive);

    // If the group was active yesterday, show "Yesterday"
    if (
      today.getDate() - lastActiveDate.getDate() === 1 &&
      today.getMonth() === lastActiveDate.getMonth() &&
      today.getFullYear() === lastActiveDate.getFullYear()
    ) {
      return "Yesterday";
    } else {
      // Otherwise, display the actual last active date
      const options = { day: "numeric", month: "short", year: "numeric" };
      return lastActiveDate.toLocaleDateString(undefined, options);
    }
  };

  // Function to filter the group names based on the search term
  const filterGroups = () => {
    const filteredGroups = result.filter(item =>
      item.group_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResult(filteredGroups);
  };

  // Render the component
  return (
    <div className="flex flex-col bg-white h-full w-full overflow-hidden">
      {/* Header component */}
      <Header>
        <div className="flex justify-between items-center bm-2">
          <div className="flex items-center">
            {/* User icon */}
            <HiUserGroup className="w-8 h-8 text-grey mr-2" />
            <span className="ml-2 text-grey text-lg">Groups</span>
          </div>
          <div className="flex items-center">
            {/* Green dot for active status */}

            {/* Button with phone number */}
            <button className="text-grey mx-2 border border-black rounded px-4 py-1 relative">
              <div className="w-3 h-3 bg-green-500 rounded-full absolute top-1/2 left-1 transform -translate-y-1/2 shadow"></div>
              <span className="ml-2">+91 8878818817</span>
            </button>
            {/* Button with alert icon */}
            <button className="text-grey">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 14H9a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Header>

      {/* Search bar and filter button section */}
      <div className="flex items-center p-2 bg-gray-100 border-t border-b border-neutral-800 ">
        <input
          type="text"
          placeholder="Search"
          className="p-1 border border-neutral-700 rounded mr-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 ml-4 rounded border border-black"
          onClick={filterGroups}
        >
          Filter
        </button>
        <div className="ml-auto flex items-center">
    <button className="bg-blue-500 text-white px-2 py-1 ml-2 rounded border border-black">
      Bulk Message
    </button>
    <button className="bg-white text-gray-500 px-2 py-1 ml-2 rounded border border-black flex items-center">
      Group Actions
      <HiArrowsUpDown className="ml-1" />
    </button>
  </div>
      </div>
      

      {/* Main content area with flex layout */}
      <div className="flex flex-grow overflow-hidden">
        {/* Table section */}
        <div className={`flex-grow ${selectedGroup ? 'w-3/4' : 'w-full'}`} style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>

          <table className="min-w-full border border-neutral-800 rounded-lg overflow-hidden">
            {/* Table headers */}
            <thead className="bg-white text-black">
              <tr>
                <th className="py-2 px-4 text-left"><input type="checkbox" /> Group Name</th>
                <th className="py-2 px-4 text-left">Project</th>
                <th className="py-2 px-4 text-left">Members</th>
                <th className="py-2 px-4 text-left">Last Active</th>

              </tr>
            </thead>
            {/* Table body */}
            <tbody>
  {result.map((item) => (
    <tr
      key={item.id}
      onClick={() => handleGroupClick(item)}
      style={{ cursor: "pointer" }}
      className={`
        ${selectedGroup && selectedGroup.id === item.id ? 'bg-gray-100' : ''}
        hover:bg-gray-200
      `}
    >
      <td className="py-2 px-4 text-left">
        <div className="flex items-center">
          <input type="checkbox" />
          <img
            src={item.dp_url}
            alt="Group Photo"
            className="ml-4 w-10 h-10 rounded-full"
          />
          <span className="ml-4">  {item.group_name}</span>
        </div>
      </td>
      <td className="py-2 px-4 text-left">
        <span
          className={`
            inline-block px-2 py-1 rounded-full border
            ${item.project === "#Demo" ? 'bg-blue-100 text-blue-700 ' : ''}
            ${item.project === "#client" ? 'bg-orange-100 text-orange-700 ' : ''}
          `}
        >
          {item.project}
        </span>
      </td>
      <td className="py-2 px-4 text-left">{item.members}</td>
      {/* Format the last active date */}
      <td className="py-2 px-4 text-left">{formatLastActive(item.last_active)}</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>

        {/* Selected group details section */}
        {selectedGroup && (
  <div className="flex-grow-0 p-4 bg-gray-100 text-black w-1/4 border-l border-neutral-800">
    <div className="flex flex-col items-start mb-4">
      <div className="flex items-center mb-2">
        <img
          src={selectedGroup.dp_url}
          alt="Group Photo"
          className="w-8 h-8 rounded-full"
        />
        <span className="ml-2 text-lg font-bold">{selectedGroup.group_name}</span>
      </div>
      {/* Horizontal navbar for Overview, Members, Logs */}
      <div className="flex">
        <button
          onClick={() => setActiveTab('overview')}
          className={`text-gray-500 hover:text-gray-700 py-2 px-4 ${activeTab === 'overview' ? 'font-bold border-b-2 border-green-500' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`text-gray-500 hover:text-gray-700 py-2 px-4 ${activeTab === 'members' ? 'font-bold border-b-2 border-green-500' : ''}`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`text-gray-500 hover:text-gray-700 py-2 px-4 ${activeTab === 'logs' ? 'font-bold border-b-2 border-green-500' : ''}`}
        >
          Logs
        </button>
      </div>
    </div>
    {/* Display content based on the active tab */}
    {activeTab === 'overview' && (
      <>
        <p>Last Active: {formatLastActive(selectedGroup.last_active)}</p>
        <p>Disappearing Message: {selectedGroup.disappearing_message.toString()}</p>
        <p>Send Message Permission: {selectedGroup.send_message_permission}</p>
        {/* Add more details as needed */}
      </>
    )}
    {activeTab === 'members' && (
      <>
              <p>Members: {selectedGroup.members_array}</p>
        {/* Display list of members */}
        {/* ... */}
      </>
    )}
    {activeTab === 'logs' && (
      <>
        {/* Display logs (e.g., ID) */}
        {/* ... */}
      </>
    )}
  </div>
)}
      </div>
    </div>
  );
};

// Export the Search component
export default Search;
