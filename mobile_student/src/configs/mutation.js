import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation Login($content: inputLogin) {
    login(content: $content) {
      id
      access_token
    }
  }
`;
export const POST_CHAT = gql`
  mutation PostChats($newChat: Chat) {
    postChats(newChat: $newChat) {
      message
    }
  }
`;
export const UPDATE_EXPO_TOKEN = gql`
  mutation EditExpo($expoToken: String) {
    editExpo(expo_token: $expoToken) {
      id
      fullName
      email
      PhaseBatchId
      status
      expo_token
      password
      role
      _id
      name
    }
  }
`;
export const ADD_THREAD = gql`
  mutation CreateThread($input: threadInput) {
    createThread(input: $input) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation CreateComment($input: commentInput) {
    createComment(input: $input) {
      id
      comment
    }
  }
`;

export const CHANGE_STATUS_JOURNEY = gql`
  mutation ChangeJourneyStatus($journeyId: ID) {
    changeJourneyStatus(JourneyId: $journeyId) {
      id
      UserId
      JourneyId
      status
    }
  }
`;
