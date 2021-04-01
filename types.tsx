export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  CallsTab: undefined;
  ChatsTab: undefined;
  ContactsTab: undefined;
};

export type CallsTabParamList = {
  CallsTabScreen: undefined;
};

export type ChatsTabParamList = {
  ChatsTabScreen: undefined;
};

export type ContactsTabParamList = {
  ContactsTabScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
}

export type Message = {
  id: String;
  content: String;
  createdAt: number
}

export type ChatRoom = {
  id: String;
  users: [User];
  lastMessage: Message;
}