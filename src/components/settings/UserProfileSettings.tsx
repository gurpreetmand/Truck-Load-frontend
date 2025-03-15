import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Truck,
  Shield,
  Camera,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface UserProfileSettingsProps {
  userType?: "trucker" | "loader";
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    bio?: string;
    avatar?: string;
    companyName?: string;
    dotNumber?: string;
    mcNumber?: string;
    truckType?: string;
    capacity?: string;
    notifications?: {
      email?: boolean;
      sms?: boolean;
      app?: boolean;
    };
  };
  onSave?: (data: any) => void;
}

const UserProfileSettings: React.FC<UserProfileSettingsProps> = ({
  userType = "trucker",
  initialData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Logistics Way, Truck City, TC 12345",
    bio: "Experienced trucker with over 10 years in the logistics industry. Specialized in long-haul and refrigerated transport.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    companyName: "JD Logistics",
    dotNumber: "12345678",
    mcNumber: "MC-987654",
    truckType: "Semi-Trailer",
    capacity: "45,000 lbs",
    notifications: {
      email: true,
      sms: true,
      app: true,
    },
  },
  onSave = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (
    type: "email" | "sms" | "app",
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked,
      },
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Account Settings</CardTitle>
            <CardDescription>
              Manage your profile and preferences
            </CardDescription>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              "Edit Profile"
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">
              {userType === "trucker" ? "Trucker Info" : "Company Info"}
            </TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-gray-200">
                    <AvatarImage src={formData.avatar} alt={formData.name} />
                    <AvatarFallback>{formData.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-white"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold">{formData.name}</h3>
                  <p className="text-gray-500">
                    {userType === "trucker" ? "Trucker" : "Loader"}
                  </p>
                </div>
              </div>

              <div className="md:w-2/3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                    {userType === "trucker" ? "Company Name" : "Business Name"}
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                {userType === "trucker" ? (
                  <div className="space-y-2">
                    <Label htmlFor="dotNumber" className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" />
                      DOT Number
                    </Label>
                    <Input
                      id="dotNumber"
                      name="dotNumber"
                      value={formData.dotNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" />
                      Tax ID / EIN
                    </Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      value="12-3456789"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                )}
              </div>

              {userType === "trucker" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mcNumber" className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" />
                      MC Number
                    </Label>
                    <Input
                      id="mcNumber"
                      name="mcNumber"
                      value={formData.mcNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="truckType" className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-gray-500" />
                      Truck Type
                    </Label>
                    <Input
                      id="truckType"
                      name="truckType"
                      value={formData.truckType}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              )}

              {userType === "trucker" && (
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-700 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Verification Status
                </h3>
                <p className="text-blue-600 mt-1">
                  Your account is verified and in good standing.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Notification Preferences
                </h3>
                <p className="text-gray-500">
                  Choose how you want to receive notifications about new loads,
                  updates, and messages.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="email-notifications"
                        className="text-base"
                      >
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={formData.notifications?.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications" className="text-base">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via text message
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={formData.notifications?.sms}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("sms", checked)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-notifications" className="text-base">
                        In-App Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications within the application
                      </p>
                    </div>
                    <Switch
                      id="app-notifications"
                      checked={formData.notifications?.app}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("app", checked)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium">Notification Categories</h3>
                <p className="text-sm text-gray-500 mt-1">
                  You will receive notifications for the following categories:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-blue-500" />
                    Load updates and status changes
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    Messages from other users
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                    Payment confirmations and invoices
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    Account security and verification
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end border-t pt-4">
        {isEditing && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const DollarSign = ({ className }: { className?: string }) => (
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
    <line x1="12" x2="12" y1="2" y2="22"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default UserProfileSettings;
