import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: "in-transit" | "delivered" | "delayed" | "loading";
  estimatedDelivery: string;
  currentLocation?: string;
  loadType: string;
  weight: string;
  distance: string;
  lastUpdated: string;
}

interface ShipmentTrackerProps {
  shipments?: Shipment[];
}

const defaultShipments: Shipment[] = [
  {
    id: "SHP-1234",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    status: "in-transit",
    estimatedDelivery: "2023-06-15",
    currentLocation: "Toledo, OH",
    loadType: "Machinery",
    weight: "12,500 lbs",
    distance: "281 miles",
    lastUpdated: "2 hours ago",
  },
  {
    id: "SHP-5678",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    status: "delivered",
    estimatedDelivery: "2023-06-10",
    loadType: "Electronics",
    weight: "5,200 lbs",
    distance: "239 miles",
    lastUpdated: "1 day ago",
  },
  {
    id: "SHP-9012",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    status: "delayed",
    estimatedDelivery: "2023-06-18",
    currentLocation: "Tacoma, WA",
    loadType: "Furniture",
    weight: "8,700 lbs",
    distance: "174 miles",
    lastUpdated: "5 hours ago",
  },
];

const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({
  shipments = defaultShipments,
}) => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment>(
    shipments[0],
  );
  const [mapView, setMapView] = useState<"satellite" | "standard">("standard");

  const getStatusColor = (status: Shipment["status"]) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "delayed":
        return "bg-orange-500";
      case "loading":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: Shipment["status"]) => {
    switch (status) {
      case "in-transit":
        return <Badge className="bg-blue-500">In Transit</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "delayed":
        return <Badge className="bg-orange-500">Delayed</Badge>;
      case "loading":
        return <Badge className="bg-purple-500">Loading</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: Shipment["status"]) => {
    switch (status) {
      case "in-transit":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "delayed":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "loading":
        return <Clock className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Shipment Tracker</h2>
          <p className="text-sm text-gray-500">
            Track your current shipments in real-time
          </p>
        </div>

        <div className="flex flex-col md:flex-row h-full">
          {/* Shipment List */}
          <div className="w-full md:w-1/3 border-r overflow-y-auto">
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Active Shipments
              </h3>
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  onClick={() => setSelectedShipment(shipment)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${selectedShipment.id === shipment.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-gray-100"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{shipment.id}</p>
                      <p className="text-sm text-gray-600">
                        {shipment.origin} → {shipment.destination}
                      </p>
                    </div>
                    <div>{getStatusBadge(shipment.status)}</div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Last updated: {shipment.lastUpdated}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map and Details */}
          <div className="flex-1 flex flex-col">
            {/* Map View */}
            <div className="relative h-64 md:h-72 bg-gray-100">
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-white rounded-md shadow-md p-1">
                  <Tabs
                    value={mapView}
                    onValueChange={(value) =>
                      setMapView(value as "satellite" | "standard")
                    }
                  >
                    <TabsList className="grid grid-cols-2 w-48">
                      <TabsTrigger value="standard">Standard</TabsTrigger>
                      <TabsTrigger value="satellite">Satellite</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Map Placeholder with animated truck */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={
                    mapView === "satellite"
                      ? "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80"
                      : "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  }
                  alt="Map view"
                  className="w-full h-full object-cover"
                />

                {selectedShipment.status === "in-transit" && (
                  <motion.div
                    className="absolute z-10"
                    initial={{ left: "30%", top: "50%" }}
                    animate={{
                      left: ["30%", "70%"],
                      top: ["50%", "50%"],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  >
                    <div className="bg-blue-500 p-1 rounded-full">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Origin and Destination Markers */}
                <div className="absolute left-[30%] top-[50%] z-10">
                  <div className="bg-green-500 p-1 rounded-full">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute left-[70%] top-[50%] z-10">
                  <div className="bg-red-500 p-1 rounded-full">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="flex-1 p-4 overflow-y-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Shipment {selectedShipment.id}</CardTitle>
                    {getStatusBadge(selectedShipment.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Route
                      </h4>
                      <div className="mt-1 flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="h-full flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="w-0.5 h-10 bg-gray-300"></div>
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">
                            {selectedShipment.origin}
                          </p>
                          <p className="text-xs text-gray-500 my-2">
                            Distance: {selectedShipment.distance}
                          </p>
                          <p className="font-medium">
                            {selectedShipment.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Details
                      </h4>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            Est. Delivery: {selectedShipment.estimatedDelivery}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            Load Type: {selectedShipment.loadType}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            Weight: {selectedShipment.weight}
                          </span>
                        </div>
                        {selectedShipment.currentLocation && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">
                              Current Location:{" "}
                              {selectedShipment.currentLocation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Full Details
                  </Button>
                  <Button size="sm">Update Status</Button>
                </CardFooter>
              </Card>

              {/* Shipment Timeline */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Shipment Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-3 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-medium">Shipment Picked Up</p>
                      <p className="text-sm text-gray-500">
                        June 10, 2023 - 9:30 AM
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Driver confirmed pickup from origin location
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-3 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Truck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-medium">In Transit</p>
                      <p className="text-sm text-gray-500">
                        June 10, 2023 - 10:15 AM
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Shipment is on the way to destination
                      </p>
                    </div>
                  </div>

                  {selectedShipment.status === "delayed" && (
                    <div className="flex">
                      <div className="mr-3 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200"></div>
                      </div>
                      <div>
                        <p className="font-medium">Delay Reported</p>
                        <p className="text-sm text-gray-500">
                          June 11, 2023 - 2:45 PM
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Shipment delayed due to traffic conditions
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedShipment.status === "delivered" && (
                    <div className="flex">
                      <div className="mr-3 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-gray-500">
                          June 12, 2023 - 11:20 AM
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Shipment successfully delivered to destination
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracker;
