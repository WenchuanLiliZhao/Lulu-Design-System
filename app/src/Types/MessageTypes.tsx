
export interface MessageType {
  title: string;
  message: string;
  ago: number; // Number of minutes ago
  read: boolean; // New property to indicate if the message has been read
}
