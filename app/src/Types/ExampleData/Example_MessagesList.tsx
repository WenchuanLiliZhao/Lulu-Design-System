import { MessageType } from "../MessageTypes";
import { Example_Users } from "./Example_Users";

export const Empty: MessageType[] = [];

export const NonEmpty: MessageType[] = [
  {
    from: Example_Users[0],
    title: "System Update",
    message: "Your system has been updated successfully.",
    ago: 5,
    read: true,
  },
  {
    from: Example_Users[1],
    title: "New Message",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis minus aperiam repudiandae consequuntur ut quaerat soluta impedit nihil, sed ullam necessitatibus veritatis eaque, unde sit nesciunt dicta corporis, dolorem voluptates.",
    ago: 10,
    read: false,
  },
  {
    from: Example_Users[2],
    title: "Payment Received",
    message: "Your payment of $50 has been received.",
    ago: 30,
    read: true,
  },
  {
    from: Example_Users[3],
    title: "Reminder",
    message: "Don't forget your meeting at 3 PM.",
    ago: 60,
    read: false,
  },
  {
    from: Example_Users[4],
    title: "Friend Request",
    message: "Anna has sent you a friend request.",
    ago: 120,
    read: false,
  },
  {
    from: Example_Users[5],
    title: "Password Changed",
    message: "Your password was changed successfully.",
    ago: 180,
    read: true,
  },
  {
    from: Example_Users[6],
    title: "New Comment",
    message: "Someone commented on your post.",
    ago: 240,
    read: false,
  },
  {
    from: Example_Users[1],
    title: "Subscription Expiring",
    message: "Your subscription will expire in 3 days.",
    ago: 360,
    read: true,
  },
  {
    from: Example_Users[2],
    title: "Event Invitation",
    message: "You are invited to the annual gala.",
    ago: 480,
    read: false,
  },
  {
    from: Example_Users[3],
    title: "Security Alert",
    message: "A login attempt was detected from a new device.",
    ago: 600,
    read: true,
  },
  {
    from: Example_Users[4],
    title: "Delivery Update",
    message: "Your package is out for delivery.",
    ago: 720,
    read: false,
  },
  {
    from: Example_Users[5],
    title: "Achievement Unlocked",
    message: "You reached a new milestone!",
    ago: 1440,
    read: true,
  },
  {
    from: Example_Users[6],
    title: "System Maintenance",
    message: "Scheduled maintenance will occur at midnight.",
    ago: 2880,
    read: true,
  },
  {
    from: Example_Users[1],
    title: "New Follower",
    message: "You have a new follower on your profile.",
    ago: 4320,
    read: false,
  },
  {
    from: Example_Users[2],
    title: "Weekly Summary",
    message: "Here’s your activity summary for the week.",
    ago: 5760,
    read: true,
  },
  {
    from: Example_Users[3],
    title: "Promotion Alert",
    message: "Get 20% off on your next purchase!",
    ago: 7200,
    read: false,
  },
  {
    from: Example_Users[4],
    title: "Bug Report",
    message: "A bug you reported has been resolved.",
    ago: 8640,
    read: true,
  },
  {
    from: Example_Users[5],
    title: "Account Verification",
    message: "Your account has been successfully verified.",
    ago: 10080,
    read: true,
  },
  {
    from: Example_Users[6],
    title: "Survey Request",
    message: "We’d love your feedback on our service.",
    ago: 20160,
    read: false,
  },
  {
    from: Example_Users[0],
    title: "Welcome!",
    message: "Thank you for joining our platform.",
    ago: 43200,
    read: true,
  },
];

export const Example_MessagesList = {
  Empty,
  NonEmpty,
};