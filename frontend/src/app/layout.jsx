"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { ChatProvider } from "@/context/ChatContext.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChatProvider>{children}</ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
