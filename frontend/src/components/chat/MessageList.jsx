'use client'

import { blockUser } from '@/services/api/block'

export default function MessageList({ messages, userId }) {
  const handleBlock = async (blockedId) => {
    try {
      await blockUser(userId, blockedId)
      alert('User blocked')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-2 flex flex-col">
      {messages.map((msg) => {
        const isMe = msg.senderId === userId

        return (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-xs ${
              isMe
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 self-start'
            }`}
          >
            <div className="flex justify-between items-center text-xs opacity-70 mb-1">
              <span>
                {isMe ? 'You' : msg.sender?.username ?? `User ${msg.senderId}`}
              </span>

              {!isMe && (
                <button
                  onClick={() => handleBlock(msg.senderId)}
                  className="text-red-600 hover:underline ml-2"
                >
                  Block
                </button>
              )}
            </div>

            <div>{msg.content}</div>
          </div>
        )
      })}
    </div>
  )
}




