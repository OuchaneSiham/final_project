'use client';

import React from 'react';

export default function MessageList({
  messages,
  userId,
}: {
  messages: any[];
  userId: number;
}) {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded max-w-xs ${
            msg.userId === userId ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
          }`}
        >
          <strong>{msg.userId === userId ? 'You' : `User ${msg.userId}`}: </strong>
          {msg.text}
        </div>
      ))}
    </div>
  );
}



