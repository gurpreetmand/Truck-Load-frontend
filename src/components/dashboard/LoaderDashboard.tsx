import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TruckIcon, BarChart3, Clock } from "lucide-react";

import NewLoadForm from "./NewLoadForm";
import ShipmentTracker from "./ShipmentTracker";

// Import the TruckersList component types
interface TruckerInfo {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  experience: string;
  truckType: string;
  availability: string;
  contactPhone: string;
  contactEmail: string;
  specialties: string[];
}

interface TruckersListProps {
  truckers?: TruckerInfo[];
  onSelect?: (trucker: TruckerInfo) => void;
}

// Create a placeholder component that matches the expected interface
const TruckersList: React.FC<TruckersListProps> = ({
  truckers = [],
  onSelect = () => {},
}) => {
  return (
    <div className="w-full h-full bg-background p-4 rounded-lg border">
      <div className="text-center p-4">
        <TruckIcon className="h-12 w-12 mx-auto text-blue-500 mb-2" />
        <h3 className="text-lg font-medium">Available Truckers</h3>
        <p className="text-sm text-muted-foreground">
          Connect with truckers for your shipments
        </p>
        <Button
          className="mt-4"
          onClick={() =>
            onSelect(
              truckers[0] ||
                ({
                  id: "placeholder",
                  name: "John Doe",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
                  location: "Chicago, IL",
                  rating: 4.8,
                  experience: "5 years",
                  truckType: "Semi-Trailer",
                  availability: "Available Now",
                  contactPhone: "(555) 123-4567",
                  contactEmail: "john.doe@example.com",
                  specialties: ["Long Haul", "Refrigerated"],
                } as TruckerInfo),
            )
          }
        >
          Find Truckers
        </Button>
      </div>
    </div>
  );
};

interface LoaderDashboardProps {
  userName?: string;
  activeLoads?: number;
  pendingLoads?: number;
  completedLoads?: number;
  onCreateLoad?: (data: any) => void;
  onSelectTrucker?: (trucker: TruckerInfo) => void;
}

const LoaderDashboard: React.FC<LoaderDashboardProps> = ({
  userName = "John Doe",
  activeLoads = 3,
  pendingLoads = 2,
  completedLoads = 12,
  onCreateLoad = () => {},
  onSelectTrucker = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreatingLoad, setIsCreatingLoad] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateLoad = (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onCreateLoad(data);
      setIsSubmitting(false);
      setIsCreatingLoad(false);
      setActiveTab("shipments");
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Loader Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userName}</p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setIsCreatingLoad(true);
              setActiveTab("create");
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Load
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardDescription className="text-blue-700">
                    Active Loads
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-blue-800">
                    {activeLoads}
                  </CardTitle>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <TruckIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardDescription className="text-orange-700">
                    Pending Loads
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-orange-800">
                    {pendingLoads}
                  </CardTitle>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardDescription className="text-green-700">
                    Completed Loads
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-green-800">
                    {completedLoads}
                  </CardTitle>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[400px] mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="truckers">Truckers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Recent Shipments</CardTitle>
                    <CardDescription>
                      Track your active and recent shipments
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <ShipmentTracker />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Available Truckers</CardTitle>
                    <CardDescription>
                      Find and connect with truckers for your loads
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <TruckersList onSelect={onSelectTrucker} />
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="shipments">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Tracking</CardTitle>
                  <CardDescription>
                    Monitor all your shipments in real-time
                  </CardDescription>
                </CardHeader>
                <div className="p-6">
                  <ShipmentTracker />
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="truckers">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Trucker Directory</CardTitle>
                  <CardDescription>
                    Browse and connect with available truckers
                  </CardDescription>
                </CardHeader>
                <div className="p-6">
                  <TruckersList onSelect={onSelectTrucker} />
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="create">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NewLoadForm
                onSubmit={handleCreateLoad}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoaderDashboard;
