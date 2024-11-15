import React, { useState } from 'react';
import { ChatWindow } from '../components/chat/ChatWindow';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isOnline: boolean;
}

export const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      recipientId: 'user1',
      recipientName: 'Alice Johnson',
      recipientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
      lastMessage: 'Hey, would you like to collaborate on the AI project?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      isOnline: true,
    },
    {
      id: '2',
      recipientId: 'user2',
      recipientName: 'Bob Smith',
      recipientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
      lastMessage: 'The presentation went great!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      unread: 0,
      isOnline: false,
    },
    {
      id: '3',
      recipientId: 'user3',
      recipientName: 'Carol White',
      recipientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
      lastMessage: 'Thanks for your help with the research paper',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 1,
      isOnline: true,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] -mt-8">
      {/* Conversations List */}
      <div className="w-80 border-r bg-white dark:bg-gray-800">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-12rem)]">
          <AnimatePresence>
            {filteredConversations.map((conversation) => (
              <motion.button
                key={conversation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conversation.recipientAvatar}
                    alt={conversation.recipientName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {conversation.recipientName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {conversation.unread}
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        {selectedConversation ? (
          <ChatWindow
            recipientId={selectedConversation.recipientId}
            recipientName={selectedConversation.recipientName}
            recipientAvatar={selectedConversation.recipientAvatar}
            isOnline={selectedConversation.isOnline}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};