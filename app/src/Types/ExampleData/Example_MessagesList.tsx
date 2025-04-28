import { MessageType } from "../MessageTypes";

export const Empty: MessageType[] = [];

export const NonEmpty: MessageType[] = [
  {
    title: "System Update",
    message: "Your system has been updated successfully.",
    ago: 5,
    read: true,
  },
  {
    title: "New Message",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis minus aperiam repudiandae consequuntur ut quaerat soluta impedit nihil, sed ullam necessitatibus veritatis eaque, unde sit nesciunt dicta corporis, dolorem voluptates.",
    ago: 10,
    read: false,
  },
  {
    title: "Payment Received",
    message: "Your payment of $50 has been received.",
    ago: 30,
    read: true,
  },
  {
    title: "Reminder",
    message: "Don't forget your meeting at 3 PM.",
    ago: 60,
    read: false,
  },
  {
    title: "Friend Request",
    message: "Anna has sent you a friend request.",
    ago: 120,
    read: false,
  },
  {
    title: "Password Changed",
    message: "Your password was changed successfully.",
    ago: 180,
    read: true,
  },
  {
    title: "New Comment",
    message: "Someone commented on your post.",
    ago: 240,
    read: false,
  },
  {
    title: "Subscription Expiring",
    message: "Your subscription will expire in 3 days.",
    ago: 360,
    read: true,
  },
  {
    title: "Event Invitation",
    message: "You are invited to the annual gala.",
    ago: 480,
    read: false,
  },
  {
    title: "Security Alert",
    message: "A login attempt was detected from a new device.",
    ago: 600,
    read: true,
  },
  {
    title: "Delivery Update",
    message: "Your package is out for delivery.",
    ago: 720,
    read: false,
  },
  {
    title: "Achievement Unlocked",
    message: "You reached a new milestone!",
    ago: 1440,
    read: true,
  },
  {
    title: "System Maintenance",
    message: "Scheduled maintenance will occur at midnight.",
    ago: 2880,
    read: true,
  },
  {
    title: "New Follower",
    message: "You have a new follower on your profile.",
    ago: 4320,
    read: false,
  },
  {
    title: "Weekly Summary",
    message: "Here’s your activity summary for the week.",
    ago: 5760,
    read: true,
  },
  {
    title: "Promotion Alert",
    message: "Get 20% off on your next purchase!",
    ago: 7200,
    read: false,
  },
  {
    title: "Bug Report",
    message: "A bug you reported has been resolved.",
    ago: 8640,
    read: true,
  },
  {
    title: "Account Verification",
    message: "Your account has been successfully verified.",
    ago: 10080,
    read: true,
  },
  {
    title: "Survey Request",
    message: "We’d love your feedback on our service.",
    ago: 20160,
    read: false,
  },
  {
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