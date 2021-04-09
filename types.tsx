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
  id: String;
  name: String;
  imageUri: String;
  status: String;
}

export type Message = {
  id: String;
  content: String;
  createdAt: String;
  user: User;
}

export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
}