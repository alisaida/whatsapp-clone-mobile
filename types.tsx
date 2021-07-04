export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ChatRoomScreen: undefined;
};

export type MainTabParamList = {
  CameraTab: undefined;
  CallsTab: undefined;
  ChatsTab: undefined;
  ContactsTab: undefined;
  Chats: undefined;
  Camera: undefined;
  Calls: undefined;
};

export type CameraTabParamList = {
  CameraTab: undefined;
};

export type CallsTabParamList = {
  CallsTab: undefined;
};

export type ChatsTabParamList = {
  ChatsTab: undefined;
};

export type ContactsTabParamList = {
  ContactsTab: undefined;
};

export type User = {
  id: string;
  name: string;
  imageUri: string;
  status: string;
}

export type Message = {
  id: string;
  message: string;
  createdAt: string;
  userID: string;
  chatRoomID: string;
  imageUri: string;
  user: User;
  chatRoom: ChatRoom;
}

export type ChatRoom = {
  id: string;
  chatRoomUser: ChatRoomUser[];
  messages: Message[];
  lastMessageID: string;
  lastMessage: Message;
  updatedAt: string;
}

export type ChatRoomUser = {
  id: string;
  userID: string;
  chatRoomID: string;
  updatedAt: string;
  user: User;
  chatRoom: ChatRoom;
}