import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Users,
  Truck,
  Package,
  BarChart3,
  Bell,
  MessageSquare,
  Layout,
  Eye,
  EyeOff,
  Edit,
  Save,
  Plus,
  Trash,
  ToggleLeft,
  ToggleRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AdminDashboardProps {
  onSaveSettings?: (settings: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSaveSettings = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for feature toggles
  const [featureToggles, setFeatureToggles] = useState({
    aiChatbot: true,
    loadCalculator: true,
    contractGenerator: true,
    marketplaceHub: true,
    performanceMetrics: true,
    truckTypeSelector: true,
    promotions: false,
    advertisements: true,
    notifications: true,
  });

  // Mock data for users
  const users = [
    {
      id: "U-1234",
      name: "John Doe",
      email: "john@example.com",
      role: "Trucker",
      status: "Active",
      lastActive: "2 hours ago",
    },
    {
      id: "U-2345",
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Loader",
      status: "Active",
      lastActive: "5 minutes ago",
    },
    {
      id: "U-3456",
      name: "Michael Johnson",
      email: "michael@example.com",
      role: "Trucker",
      status: "Inactive",
      lastActive: "3 days ago",
    },
    {
      id: "U-4567",
      name: "Emily Wilson",
      email: "emily@example.com",
      role: "Loader",
      status: "Active",
      lastActive: "1 day ago",
    },
    {
      id: "U-5678",
      name: "David Martinez",
      email: "david@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "Just now",
    },
  ];

  // Mock data for loads
  const loads = [
    {
      id: "LD-1234",
      title: "Furniture Shipment",
      status: "In Transit",
      trucker: "John Doe",
      loader: "ABC Furniture",
    },
    {
      id: "LD-2345",
      title: "Electronics Delivery",
      status: "Pending",
      trucker: "Unassigned",
      loader: "Tech Solutions Inc",
    },
    {
      id: "LD-3456",
      title: "Construction Materials",
      status: "Delivered",
      trucker: "Michael Johnson",
      loader: "BuildRight Construction",
    },
    {
      id: "LD-4567",
      title: "Medical Supplies",
      status: "In Transit",
      trucker: "Sarah Chen",
      loader: "MediCare Hospital",
    },
  ];

  // Mock data for system settings
  const [systemSettings, setSystemSettings] = useState({
    theme: "blue",
    notificationFrequency: "realtime",
    defaultUserType: "trucker",
    maintenanceMode: false,
    analyticsEnabled: true,
    autoAssignLoads: false,
    requireVerification: true,
    maxFileUploadSize: "10",
  });

  const handleFeatureToggle = (feature: keyof typeof featureToggles) => {
    setFeatureToggles((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleSystemSettingChange = (setting: string, value: any) => {
    setSystemSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSaveSettings = () => {
    onSaveSettings({
      featureToggles,
      systemSettings,
    });
    setIsEditing(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredLoads = loads.filter(
    (load) =>
      load.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.trucker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.loader.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex border-b">
        <div className="w-64 border-r h-screen overflow-y-auto bg-gray-50 p-4">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>

          <nav className="space-y-1">
            <NavItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="Users"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <NavItem
              icon={<Package className="h-5 w-5" />}
              label="Loads"
              active={activeTab === "loads"}
              onClick={() => setActiveTab("loads")}
            />
            <NavItem
              icon={<Truck className="h-5 w-5" />}
              label="Truckers"
              active={activeTab === "truckers"}
              onClick={() => setActiveTab("truckers")}
            />
            <NavItem
              icon={<Layout className="h-5 w-5" />}
              label="Features"
              active={activeTab === "features"}
              onClick={() => setActiveTab("features")}
            />
            <NavItem
              icon={<Bell className="h-5 w-5" />}
              label="Notifications"
              active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            />
            <NavItem
              icon={<MessageSquare className="h-5 w-5" />}
              label="Messages"
              active={activeTab === "messages"}
              onClick={() => setActiveTab("messages")}
            />
            <NavItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">System Status: Online</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">Version 1.0.0</div>
          </div>
        </div>

        <div className="flex-1 h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {activeTab === "dashboard" && "Admin Dashboard"}
                {activeTab === "users" && "User Management"}
                {activeTab === "loads" && "Load Management"}
                {activeTab === "truckers" && "Trucker Management"}
                {activeTab === "features" && "Feature Management"}
                {activeTab === "notifications" && "Notification Center"}
                {activeTab === "messages" && "Message Center"}
                {activeTab === "settings" && "System Settings"}
              </h1>

              <div className="flex items-center space-x-2">
                {(activeTab === "users" ||
                  activeTab === "loads" ||
                  activeTab === "truckers") && (
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={`Search ${activeTab}...`}
                      className="pl-9 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                )}

                {activeTab === "settings" && !isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Settings
                  </Button>
                )}

                {activeTab === "settings" && isEditing && (
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                )}

                {(activeTab === "users" ||
                  activeTab === "loads" ||
                  activeTab === "truckers") && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                )}
              </div>
            </div>

            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Users"
                    value="1,234"
                    change="+12% from last month"
                    trend="up"
                    icon={<Users className="h-5 w-5 text-blue-500" />}
                  />
                  <StatCard
                    title="Active Loads"
                    value="567"
                    change="+8% from last month"
                    trend="up"
                    icon={<Package className="h-5 w-5 text-green-500" />}
                  />
                  <StatCard
                    title="Active Truckers"
                    value="328"
                    change="+5% from last month"
                    trend="up"
                    icon={<Truck className="h-5 w-5 text-orange-500" />}
                  />
                  <StatCard
                    title="System Uptime"
                    value="99.9%"
                    change="Same as last month"
                    trend="neutral"
                    icon={<Settings className="h-5 w-5 text-purple-500" />}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ActivityItem
                          icon={<Users className="h-4 w-4 text-blue-500" />}
                          title="New user registered"
                          description="Sarah Chen joined as a Loader"
                          time="5 minutes ago"
                        />
                        <ActivityItem
                          icon={<Package className="h-4 w-4 text-green-500" />}
                          title="New load posted"
                          description="Electronics Delivery from Chicago to Indianapolis"
                          time="1 hour ago"
                        />
                        <ActivityItem
                          icon={<Truck className="h-4 w-4 text-orange-500" />}
                          title="Load accepted"
                          description="John Doe accepted Furniture Shipment load"
                          time="2 hours ago"
                        />
                        <ActivityItem
                          icon={
                            <Settings className="h-4 w-4 text-purple-500" />
                          }
                          title="System update"
                          description="New feature: Contract Generator deployed"
                          time="1 day ago"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Server Load
                            </span>
                            <span className="text-sm text-gray-500">28%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "28%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Database Usage
                            </span>
                            <span className="text-sm text-gray-500">45%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Storage</span>
                            <span className="text-sm text-gray-500">72%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: "72%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              API Requests
                            </span>
                            <span className="text-sm text-gray-500">
                              1.2k/min
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-medium mb-2">Active Services</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Web Server</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Database</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">API Gateway</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Authentication</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">ID</th>
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Email</th>
                          <th className="text-left p-4">Role</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Last Active</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-4">{user.id}</td>
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                              <Badge
                                variant="outline"
                                className={
                                  user.role === "Admin"
                                    ? "bg-purple-100 text-purple-800 border-purple-200"
                                    : user.role === "Trucker"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : "bg-green-100 text-green-800 border-green-200"
                                }
                              >
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge
                                variant="outline"
                                className={
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-4">{user.lastActive}</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  {user.status === "Active" ? (
                                    <EyeOff className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-green-500" />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loads Tab */}
            {activeTab === "loads" && (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">ID</th>
                          <th className="text-left p-4">Title</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Trucker</th>
                          <th className="text-left p-4">Loader</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLoads.map((load) => (
                          <tr
                            key={load.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-4">{load.id}</td>
                            <td className="p-4">{load.title}</td>
                            <td className="p-4">
                              <Badge
                                variant="outline"
                                className={
                                  load.status === "Delivered"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : load.status === "In Transit"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }
                              >
                                {load.status}
                              </Badge>
                            </td>
                            <td className="p-4">{load.trucker}</td>
                            <td className="p-4">{load.loader}</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Management</CardTitle>
                    <CardDescription>
                      Enable or disable features in the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FeatureToggle
                        title="AI Chatbot"
                        description="Interactive AI assistant for logistics help"
                        enabled={featureToggles.aiChatbot}
                        onChange={() => handleFeatureToggle("aiChatbot")}
                      />
                      <FeatureToggle
                        title="Load Calculator"
                        description="AI-powered tool to calculate shipping costs"
                        enabled={featureToggles.loadCalculator}
                        onChange={() => handleFeatureToggle("loadCalculator")}
                      />
                      <FeatureToggle
                        title="Contract Generator"
                        description="Create and manage transportation contracts"
                        enabled={featureToggles.contractGenerator}
                        onChange={() =>
                          handleFeatureToggle("contractGenerator")
                        }
                      />
                      <FeatureToggle
                        title="Marketplace Hub"
                        description="Connect truckers and loaders in a marketplace"
                        enabled={featureToggles.marketplaceHub}
                        onChange={() => handleFeatureToggle("marketplaceHub")}
                      />
                      <FeatureToggle
                        title="Performance Metrics"
                        description="Analytics dashboard for users"
                        enabled={featureToggles.performanceMetrics}
                        onChange={() =>
                          handleFeatureToggle("performanceMetrics")
                        }
                      />
                      <FeatureToggle
                        title="Truck Type Selector"
                        description="Filter loads by truck type"
                        enabled={featureToggles.truckTypeSelector}
                        onChange={() =>
                          handleFeatureToggle("truckTypeSelector")
                        }
                      />
                      <FeatureToggle
                        title="Promotions"
                        description="Special offers and promotions for users"
                        enabled={featureToggles.promotions}
                        onChange={() => handleFeatureToggle("promotions")}
                      />
                      <FeatureToggle
                        title="Advertisements"
                        description="Display ads and sponsored content"
                        enabled={featureToggles.advertisements}
                        onChange={() => handleFeatureToggle("advertisements")}
                      />
                      <FeatureToggle
                        title="Notifications"
                        description="Real-time notifications for users"
                        enabled={featureToggles.notifications}
                        onChange={() => handleFeatureToggle("notifications")}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() =>
                        console.log("Features saved:", featureToggles)
                      }
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Feature</CardTitle>
                    <CardDescription>
                      Create a custom feature for the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="feature-name">Feature Name</Label>
                        <Input
                          id="feature-name"
                          placeholder="Enter feature name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feature-description">Description</Label>
                        <Input
                          id="feature-description"
                          placeholder="Enter feature description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feature-type">Feature Type</Label>
                        <Select defaultValue="ui">
                          <SelectTrigger>
                            <SelectValue placeholder="Select feature type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ui">UI Component</SelectItem>
                            <SelectItem value="api">API Integration</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="feature-enabled" defaultChecked />
                        <Label htmlFor="feature-enabled">
                          Enable feature immediately
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>
                      Configure global settings for the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="theme">Default Theme</Label>
                          <Select
                            value={systemSettings.theme}
                            onValueChange={(value) =>
                              handleSystemSettingChange("theme", value)
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="orange">Orange</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notification-frequency">
                            Notification Frequency
                          </Label>
                          <Select
                            value={systemSettings.notificationFrequency}
                            onValueChange={(value) =>
                              handleSystemSettingChange(
                                "notificationFrequency",
                                value,
                              )
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">
                                Real-time
                              </SelectItem>
                              <SelectItem value="hourly">
                                Hourly Digest
                              </SelectItem>
                              <SelectItem value="daily">
                                Daily Digest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="default-user-type">
                            Default User Type
                          </Label>
                          <Select
                            value={systemSettings.defaultUserType}
                            onValueChange={(value) =>
                              handleSystemSettingChange(
                                "defaultUserType",
                                value,
                              )
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trucker">Trucker</SelectItem>
                              <SelectItem value="loader">Loader</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="max-file-upload">
                            Max File Upload Size (MB)
                          </Label>
                          <Input
                            id="max-file-upload"
                            type="number"
                            value={systemSettings.maxFileUploadSize}
                            onChange={(e) =>
                              handleSystemSettingChange(
                                "maxFileUploadSize",
                                e.target.value,
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="maintenance-mode"
                              className="text-base"
                            >
                              Maintenance Mode
                            </Label>
                            <p className="text-sm text-gray-500">
                              Put the application in maintenance mode
                            </p>
                          </div>
                          <Switch
                            id="maintenance-mode"
                            checked={systemSettings.maintenanceMode}
                            onCheckedChange={(checked) =>
                              handleSystemSettingChange(
                                "maintenanceMode",
                                checked,
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="analytics-enabled"
                              className="text-base"
                            >
                              Analytics
                            </Label>
                            <p className="text-sm text-gray-500">
                              Enable usage analytics collection
                            </p>
                          </div>
                          <Switch
                            id="analytics-enabled"
                            checked={systemSettings.analyticsEnabled}
                            onCheckedChange={(checked) =>
                              handleSystemSettingChange(
                                "analyticsEnabled",
                                checked,
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="auto-assign-loads"
                              className="text-base"
                            >
                              Auto-Assign Loads
                            </Label>
                            <p className="text-sm text-gray-500">
                              Automatically assign loads to available truckers
                            </p>
                          </div>
                          <Switch
                            id="auto-assign-loads"
                            checked={systemSettings.autoAssignLoads}
                            onCheckedChange={(checked) =>
                              handleSystemSettingChange(
                                "autoAssignLoads",
                                checked,
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="require-verification"
                              className="text-base"
                            >
                              Require Verification
                            </Label>
                            <p className="text-sm text-gray-500">
                              Require identity verification for new users
                            </p>
                          </div>
                          <Switch
                            id="require-verification"
                            checked={systemSettings.requireVerification}
                            onCheckedChange={(checked) =>
                              handleSystemSettingChange(
                                "requireVerification",
                                checked,
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSaveSettings}>
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Settings
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Backup & Restore</CardTitle>
                    <CardDescription>
                      Manage system backups and restore points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Last Backup</h3>
                          <p className="text-sm text-gray-500">
                            June 15, 2023 - 03:45 AM
                          </p>
                        </div>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline">Create Backup</Button>
                        <Button variant="outline">Restore System</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center w-full p-2 rounded-md transition-colors ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
      onClick={onClick}
    >
      <div className={`mr-3 ${active ? "text-blue-600" : "text-gray-500"}`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div
          className={`text-xs mt-1 flex items-center ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}`}
        >
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : trend === "down" ? (
            <TrendingDown className="h-3 w-3 mr-1" />
          ) : null}
          {change}
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  time,
}) => {
  return (
    <div className="flex">
      <div className="mr-4">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );
};

interface FeatureToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center">
        <span className="text-sm mr-2">{enabled ? "Enabled" : "Disabled"}</span>
        <button
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${enabled ? "bg-blue-600 focus:ring-blue-500" : "bg-gray-200 focus:ring-gray-500"}`}
          onClick={onChange}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
      </div>
    </div>
  );
};

const TrendingUp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendingDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

export default AdminDashboard;
