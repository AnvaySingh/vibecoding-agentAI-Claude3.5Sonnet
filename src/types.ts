// Types for TaskFlow Pro dashboard data
export interface User {
  user_id: string;
  name: string;
  email: string;
  last_login: string;
  total_sessions: number;
  avg_session_duration: number;
  features_used: {
    task_creation: number;
    calendar_view: number;
    report_export: number;
    team_chat: number;
  };
  errors_logged: number;
}

export interface ApplicationData {
  name: string;
  version: string;
  usage_data: User[];
}
