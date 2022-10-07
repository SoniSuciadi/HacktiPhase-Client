import { gql } from "@apollo/client";

export const GET_SCHEDULE = gql`
  query Query($week: ID!) {
    getSchedule(week: $week) {
      Materials {
        id
        title
        description
        session
        references
        day
        week
        PhaseId
      }
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
        AssignmentDetail {
          id
          UserId
          AssignmentId
          score
          User {
            id
            fullName
            email
            PhaseBatchId
            status
            expo_token
          }
        }
      }
    }
  }
`;

export const GET_ASSIGNMENTS = gql`
  query Query {
    getAssignments {
      id
      title
      description
      link
      day
      week
      deadline
      scorePercentage
      PhaseId
      AssignmentDetail {
        id
        UserId
        AssignmentId
        score
      }
    }
  }
`;

export const GET_SINGLE_ASSIGNMENT = gql`
  query Query($getSingleAssignmentId: ID!) {
    getSingleAssignment(id: $getSingleAssignmentId) {
      id
      title
      description
      link
      day
      week
      deadline
      scorePercentage
      PhaseId
      AssignmentDetails {
        id
        UserId
        AssignmentId
        score
        User {
          id
          fullName
          email
          PhaseBatchId
          status
          expo_token
        }
      }
    }
  }
`;

export const GET_PHASE_BATCH = gql`
  query Query {
    getPhaseBatch {
      id
      BatchId
      PhaseId
      Phase {
        id
        phase
      }
      Batch {
        id
        batchName
      }
      Users {
        id
        fullName
        email
        PhaseBatchId
        status
        expo_token
      }
    }
  }
`;
