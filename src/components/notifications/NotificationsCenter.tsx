import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Check,
  Clock,
  Truck,
  Package,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  category: "system" | "load" | "payment" | "trucker";
}

interface NotificationsCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  onClearAll?: () => void;
}

const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  notifications = [
    {
      id: "1",
      title: "New Load Match",
      message: "A new load matching your preferences is available in Seattle.",
      time: "5 minutes ago",
      type: "info",
      read: false,
      category: "load",
    },
    {
      id: "2",
      title: "Shipment Delivered",
      message: "Your shipment #SHP-1234 has been delivered successfully.",
      time: "2 hours ago",
      type: "success",
      read: false,
      category: "load",
    },
    {
      id: "3",
      title: "Payment Received",
      message: "You received a payment of $750 for load #LD-5678.",
      time: "Yesterday",
      type: "success",
      read: true,
      category: "payment",
    },
    {
      id: "4",
      title: "Trucker Assigned",
      message: "Michael Johnson has been assigned to your load #LD-9012.",
      time: "2 days ago",
      type: "info",
      read: true,
      category: "trucker",
    },
    {
      id: "5",
      title: "Shipment Delayed",
      message:
        "Your shipment #SHP-5678 has been delayed due to weather conditions.",
      time: "3 days ago",
      type: "warning",
      read: true,
      category: "load",
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onDelete = () => {},
  onClearAll = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    onMarkAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
    onMarkAllAsRead();
  };

  const handleDelete = (id: string) => {
    setLocalNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
    onDelete(id);
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
    onClearAll();
  };

  const getFilteredNotifications = () => {
    if (activeTab === "all") return localNotifications;
    return localNotifications.filter(
      (notification) => notification.category === activeTab,
    );
  };

  const getNotificationIcon = (type: string, category: string) => {
    if (category === "load") return <Package className="h-5 w-5" />;
    if (category === "trucker") return <Truck className="h-5 w-5" />;
    if (category === "payment") return <DollarSign className="h-5 w-5" />;

    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "error":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-orange-50 border-orange-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-600" />
            Notifications
            <Badge className="ml-2 bg-blue-600">
              {localNotifications.filter((n) => !n.read).length}
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Clear all
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="px-6 pt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="load">Loads</TabsTrigger>
            <TabsTrigger value="trucker">Truckers</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="max-h-[400px] overflow-y-auto p-4">
        <AnimatePresence>
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-3 p-3 rounded-lg border ${notification.read ? "bg-gray-50" : getNotificationColor(notification.type)}`}
              >
                <div className="flex">
                  <div
                    className={`p-2 rounded-full ${notification.read ? "bg-gray-100" : `bg-${notification.type === "info" ? "blue" : notification.type === "success" ? "green" : notification.type === "warning" ? "orange" : "red"}-100`} mr-3`}
                  >
                    {getNotificationIcon(
                      notification.type,
                      notification.category,
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3
                        className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}
                      >
                        {notification.title}
                      </h3>
                      <div className="flex space-x-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p
                      className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-700"} mt-1`}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="h-10 w-10 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No notifications to display</p>
            </div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" size="sm">
          View All Notifications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsCenter;
