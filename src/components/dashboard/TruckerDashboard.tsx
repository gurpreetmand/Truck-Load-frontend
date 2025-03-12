import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Bell, BarChart3, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import LoadsPanel from "./LoadsPanel";
import ShipmentTracker from "./ShipmentTracker";
import SuggestionsPanel from "./SuggestionsPanel";

interface TruckerDashboardProps {
  userName?: string;
  onLoadSelect?: (loadId: string) => void;
  onShipmentSelect?: (shipmentId: string) => void;
}

const TruckerDashboard: React.FC<TruckerDashboardProps> = ({
  userName = "John Doe",
  onLoadSelect = () => {},
  onShipmentSelect = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "New load matches your preferences",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      message: "Shipment SHP-1234 status updated to In Transit",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      message: "Payment for load #5678 has been processed",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const stats = [
    {
      title: "Active Shipments",
      value: "3",
      icon: <Truck className="h-5 w-5 text-blue-500" />,
      change: "+1 from last week",
      trend: "up",
    },
    {
      title: "Completed Deliveries",
      value: "28",
      icon: <BarChart3 className="h-5 w-5 text-green-500" />,
      change: "+5 from last month",
      trend: "up",
    },
    {
      title: "Upcoming Pickups",
      value: "2",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      change: "Next: Tomorrow, 9AM",
      trend: "neutral",
    },
    {
      title: "Average Delivery Time",
      value: "1.8 days",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      change: "-0.2 days from last month",
      trend: "down",
    },
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-4 md:p-6 overflow-auto">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {userName}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your shipments today
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="relative">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </Button>
          </div>
          <Button>Find Loads</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-gray-500"}`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loads">Available Loads</TabsTrigger>
          <TabsTrigger value="shipments">My Shipments</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Shipments */}
            <div className="lg:col-span-1">
              <ShipmentTracker />
            </div>

            {/* Suggested Loads */}
            <div className="lg:col-span-1">
              <SuggestionsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="loads">
          <LoadsPanel />
        </TabsContent>

        <TabsContent value="shipments">
          <ShipmentTracker />
        </TabsContent>

        <TabsContent value="suggestions">
          <SuggestionsPanel />
        </TabsContent>
      </Tabs>

      {/* Notifications Panel - Could be implemented as a dropdown or slide-over */}
      {/* This is just a placeholder for the notifications UI */}
      <div className="hidden">
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
          <h3 className="font-bold text-lg mb-4">Notifications</h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
              >
                <div className="flex justify-between">
                  <p
                    className={`${notification.read ? "text-gray-700" : "text-gray-900 font-medium"}`}
                  >
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 text-xs"
                    >
                      Mark read
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckerDashboard;
