import { io } from 'socket.io-client';
import React from 'react';


const socket = io('http://localhost:3000/')

export const SocketContext = React.createContext<typeof socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};