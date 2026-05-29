export interface ChatRoom {
  id: string;
  targetUserId: string;
  targetUserName: string;
  targetUserRole: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  fileUrl?: string;
  isRead: boolean;
  isDeleted: boolean;
  sentAt: string;
  editedAt?: string;
}
