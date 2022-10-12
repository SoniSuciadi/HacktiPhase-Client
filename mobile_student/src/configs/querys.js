import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      fullName
      email
      PhaseBatchId
      status
      expo_token
      password
      role
      name
    }
    getPhaseBatchByUserId {
      startedAt
      endAt
      Phase {
        id
        phase
      }
      Batch {
        id
        batchName
      }
    }
    getUserScore {
      id
      fullName
      AssignmentDetails {
        id
        Assignment {
          id
          title
          day
          week
          scorePercentage
          PhaseId
        }
        AssignmentId
        score
      }
    }
  }
`;

export const GET_CHATS = gql`
  query GetChats {
    getChats {
      _id
      text
      image
      user {
        _id
        name
      }
      createdAt
    }
  }
`;

export const GET_MATERIAL_BY_WEEK = gql`
  query GetMaterial($week: ID!) {
    getMaterial(week: $week) {
      id
      title
      description
      session
      references
      day
      week
      PhaseId
    }
    getSchedule(week: $week) {
      Assignments {
        id
        title
        description
        link
        day
        week
        deadline
        scorePercentage
        PhaseId
      }
    }
    getPhaseBatchByUserId {
      startedAt
      endAt
    }
  }
`;
export const GET_THREAD = gql`
  query FetchThreads {
    fetchThreads {
      id
      title
      content
      UserId
      createdAt
      updatedAt
      Comments {
        comment
        UserId
        createdAt
      }
    }
  }
`;
export const GET_THRED_BY_ID = gql`
  query FetchThreadById($threadId: ID) {
    fetchThreadById(threadId: $threadId) {
      id
      title
      content
      UserId
      createdAt
      updatedAt
      User {
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
      Comments {
        id
        comment
        ThreadId
        UserId
        User {
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
        createdAt
        updatedAt
      }
    }
  }
`;
export const GET_STUDENT_JOURNEY = gql`
  query GetSingleJourney($assignmentId: ID!, $userId: ID!) {
    getSingleJourney(assignmentId: $assignmentId, userId: $userId) {
      id
      title
      description
      AssignmentId
      StudentJourneys {
        id
        JourneyId
        UserId
        status
      }
    }
  }
`;
