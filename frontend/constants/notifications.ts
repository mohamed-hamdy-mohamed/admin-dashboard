import { NotificationsData } from "@/types/notifications";

export const notificationsData: NotificationsData = {
  notifications: [
    {
      id: "notif-1",
      title: "New sale completed",
      message: "John Doe purchased iPhone 15 Pro for $1,299.",
      time: "5 min ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "Pending order",
      message: "MacBook Air M4 order from Emily Johnson is awaiting review.",
      time: "20 min ago",
      read: false,
    },
    {
      id: "notif-3",
      title: "Low stock alert",
      message: "Sony WH-1000XM6 inventory is below the restock threshold.",
      time: "1 hr ago",
      read: false,
    },
    {
      id: "notif-4",
      title: "New user registered",
      message: "Michael Smith joined the Admin Operations Platform.",
      time: "3 hrs ago",
      read: true,
    },
    {
      id: "notif-5",
      title: "Refund processed",
      message: "Apple Watch Ultra refund for Sarah Wilson has been completed.",
      time: "Yesterday",
      read: true,
    },
  ],
};
