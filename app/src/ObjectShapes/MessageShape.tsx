import { UserType } from "./UserShape";

export interface MessageType {
  from: UserType;
  title: string;
  message: string;
  ago: number; // Number of minutes ago
  read: boolean; // New property to indicate if the message has been read
}
