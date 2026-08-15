export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface NotificationsData {
  notifications: Notification[];
}
