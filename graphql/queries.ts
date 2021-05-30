// import { getUser } from "../src/graphql/queries";

export const getUserChatRooms = /* GraphQL */ `
  query GetUserChatRooms($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      imageUri
      status
      chatRoomUsers {
        items {
            chatRoom{
              id
              chatRoomUser{
                  items{
                      user{
                        id
                        username
                        name
                        imageUri
                        status
                      }
                  }
              }
              lastMessage{
                id
                message
                createdAt
                userID
                imageUri
                chatRoomID
                updatedAt
              }
              # messages{
              #   items{
              #     id
              #     message
              #     user{
              #       id
              #     }
              #   }
              # }
            }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

//list user not including id - used to retrieve other contents
export const listUsers = /* GraphQL */ `
  query ListUsers($id: ID!) {
    listUsers(filter: {id: {ne: $id}}) {
      items {
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
      nextToken
    }
  }
`;

//list user not including id - used to retrieve other contents
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers($id: ID!) {
    getChatRoom(id: $id) {
    chatRoomUser {
      items {
        user {
          id
        }
      }
    }
  }
}
`;