/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      name
      imageUri
      status
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          updatedAt
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      name
      imageUri
      status
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          updatedAt
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      name
      imageUri
      status
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          updatedAt
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      userID
      chatRoomID
      updatedAt
      user {
        id
        username
        name
        imageUri
        status
        chatRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUser {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        updatedAt
        createdAt
      }
      createdAt
    }
  }
`;
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
      id
      userID
      chatRoomID
      updatedAt
      user {
        id
        username
        name
        imageUri
        status
        chatRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUser {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        updatedAt
        createdAt
      }
      createdAt
    }
  }
`;
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
      id
      userID
      chatRoomID
      updatedAt
      user {
        id
        username
        name
        imageUri
        status
        chatRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUser {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        updatedAt
        createdAt
      }
      createdAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          updatedAt
          createdAt
        }
        nextToken
      }
      messages {
        items {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        message
        createdAt
        userID
        chatRoomID
        imageUri
        user {
          id
          username
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          updatedAt
          createdAt
        }
        updatedAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          updatedAt
          createdAt
        }
        nextToken
      }
      messages {
        items {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        message
        createdAt
        userID
        chatRoomID
        imageUri
        user {
          id
          username
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          updatedAt
          createdAt
        }
        updatedAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          updatedAt
          createdAt
        }
        nextToken
      }
      messages {
        items {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        message
        createdAt
        userID
        chatRoomID
        imageUri
        user {
          id
          username
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          updatedAt
          createdAt
        }
        updatedAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      message
      createdAt
      userID
      chatRoomID
      imageUri
      user {
        id
        username
        name
        imageUri
        status
        chatRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUser {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        updatedAt
        createdAt
      }
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      message
      createdAt
      userID
      chatRoomID
      imageUri
      user {
        id
        username
        name
        imageUri
        status
        chatRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUser {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        updatedAt
        createdAt
      }
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      message
      createdAt
      userID
      chatRoomID
      imageUri
      user {
        id
        username
        name
        imageUri
        status
        chatRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUser {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          message
          createdAt
          userID
          chatRoomID
          imageUri
          updatedAt
        }
        updatedAt
        createdAt
      }
      updatedAt
    }
  }
`;
