import { gql } from "@apollo/client";

export const MIGRATE_STUDENTS = gql`
  mutation MigrateStudents($phaseBatchId: ID!, $users: [ID]) {
    migrateStudents(phaseBatchId: $phaseBatchId, users: $users) {
      msg
    }
  }
`;

export const GET_PHASE_BATCH = gql`
  query Query {
    getPhaseBatch {
      id
      startedAt
      endAt
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
    }
  }
`;

export const CHANGE_STATUS = gql`
  mutation Mutation($changeStatusId: ID!) {
    changeStatus(id: $changeStatusId) {
      msg
    }
  }
`;

export const GET_LECTURE = gql`
  query Query {
    getLectureToday {
      id
      BatchId
      PhaseId
      startedAt
      endAt
      Phase {
        id
        phase
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
        }
      }
    }
  }
`;

export const GRADING_SCORE = gql`
  mutation Mutation($gradingScoreId: ID!, $input: [ScoreFormat]) {
    gradingScore(id: $gradingScoreId, input: $input) {
      msg
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($content: inputLogin) {
    login(content: $content) {
      id
      access_token
    }
  }
`;

export const GET_JOURNEY = gql`
  query Query($assignmentId: ID!, $userId: ID!) {
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
      fullName
      email
      PhaseBatchId
      status
      expo_token
      AssignmentDetails {
        id
        UserId
        AssignmentId
        score
      }
    }
  }
`;

export const GET_SINGLE_PHASE_BATCH = gql`
  query Query {
    getPhaseBatchByUserId {
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
