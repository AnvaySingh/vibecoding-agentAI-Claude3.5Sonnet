import { ApplicationData } from './types';

export const sampleData: ApplicationData = {
  name: 'TaskFlow Pro',
  version: '3.5.2',
  usage_data: [
    {
      user_id: 'U001',
      name: 'Alice Meyer',
      email: 'alice.meyer@example.com',
      last_login: '2025-05-20T14:23:00Z',
      total_sessions: 134,
      avg_session_duration: 18.7,
      features_used: {
        task_creation: 87,
        calendar_view: 45,
        report_export: 10,
        team_chat: 34,
      },
      errors_logged: 2,
    },
    {
      user_id: 'U002',
      name: 'Ben Zhang',
      email: 'ben.zhang@example.com',
      last_login: '2025-05-21T09:41:00Z',
      total_sessions: 92,
      avg_session_duration: 22.4,
      features_used: {
        task_creation: 55,
        calendar_view: 62,
        report_export: 8,
        team_chat: 48,
      },
      errors_logged: 0,
    },
    {
      user_id: 'U003',
      name: 'Clara Davis',
      email: 'clara.davis@example.com',
      last_login: '2025-05-19T20:10:00Z',
      total_sessions: 204,
      avg_session_duration: 15.2,
      features_used: {
        task_creation: 122,
        calendar_view: 37,
        report_export: 16,
        team_chat: 59,
      },
      errors_logged: 5,
    },
  ],
};
