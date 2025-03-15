import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Package,
  Truck,
  DollarSign,
  Clock,
  ArrowUpDown,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface MarketplaceHubProps {
  userType?: "trucker" | "loader";
}

const MarketplaceHub: React.FC<MarketplaceHubProps> = ({
  userType = "trucker",
}) => {
  const [activeTab, setActiveTab] = useState("loads");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("all");

  // Mock data for loads
  const loads = [
    {
      id: "LD-1234",
      title: "Furniture Shipment",
      origin: "New York, NY",
      destination: "Boston, MA",
      distance: "215 miles",
      weight: "1,200 lbs",
      dimensions: "8×6×5 ft",
      price: "$850",
      date: "2023-06-15",
      type: "furniture",
      urgency: "normal",
    },
    {
      id: "LD-5678",
      title: "Electronics Delivery",
      origin: "Chicago, IL",
      destination: "Indianapolis, IN",
      distance: "180 miles",
      weight: "800 lbs",
      dimensions: "6×4×4 ft",
      price: "$650",
      date: "2023-06-16",
      type: "electronics",
      urgency: "urgent",
    },
    {
      id: "LD-9012",
      title: "Construction Materials",
      origin: "Denver, CO",
      destination: "Salt Lake City, UT",
      distance: "520 miles",
      weight: "3,500 lbs",
      dimensions: "12×8×6 ft",
      price: "$1,200",
      date: "2023-06-18",
      type: "construction",
      urgency: "express",
    },
  ];

  // Mock data for truckers
  const truckers = [
    {
      id: "TR-1234",
      name: "Michael Johnson",
      location: "Chicago, IL",
      truckType: "Semi-Trailer",
      capacity: "45,000 lbs",
      availability: "Available Now",
      rating: 4.8,
      price: "$1.25/mile",
    },
    {
      id: "TR-5678",
      name: "Sarah Williams",
      location: "Dallas, TX",
      truckType: "Flatbed",
      capacity: "48,000 lbs",
      availability: "Available in 2 days",
      rating: 4.6,
      price: "$1.35/mile",
    },
    {
      id: "TR-9012",
      name: "David Martinez",
      location: "Phoenix, AZ",
      truckType: "Box Truck",
      capacity: "26,000 lbs",
      availability: "Available Now",
      rating: 4.9,
      price: "$1.15/mile",
    },
  ];

  // Filter loads based on search term and filter type
  const filteredLoads = loads.filter((load) => {
    const matchesSearch =
      load.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || load.type === filterType;

    return matchesSearch && matchesType;
  });

  // Filter truckers based on search term
  const filteredTruckers = truckers.filter((trucker) => {
    return (
      trucker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trucker.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trucker.truckType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Logistics Marketplace</h2>
            <p className="text-gray-500">
              {userType === "trucker"
                ? "Find available loads that match your truck and route preferences"
                : "Connect with reliable truckers to transport your goods"}
            </p>
          </div>

          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
            {userType === "trucker" ? "Find Loads" : "Post New Load"}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                userType === "trucker"
                  ? "Search loads by location or type..."
                  : "Search truckers by name or location..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortBy(sortBy === "date" ? "price" : "date")}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort: {sortBy === "date" ? "Date" : "Price"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="loads">Available Loads</TabsTrigger>
            <TabsTrigger value="truckers">Available Truckers</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="loads" className="space-y-4">
            {filteredLoads.length > 0 ? (
              filteredLoads.map((load) => (
                <motion.div
                  key={load.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="cursor-pointer hover:border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {load.title}
                          </h3>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>
                              {load.origin} to {load.destination}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {load.distance}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {load.weight}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {load.dimensions}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {load.price}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {new Date(load.date).toLocaleDateString()}
                          </div>
                          <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">
                  No loads found
                </h3>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="truckers" className="space-y-4">
            {filteredTruckers.length > 0 ? (
              filteredTruckers.map((trucker) => (
                <motion.div
                  key={trucker.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="cursor-pointer hover:border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {trucker.name}
                          </h3>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{trucker.location}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {trucker.truckType}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {trucker.capacity}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {trucker.availability}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {trucker.price}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Rating: {trucker.rating}/5
                          </div>
                          <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                            Contact Trucker
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Truck className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">
                  No truckers found
                </h3>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                No favorites yet
              </h3>
              <p className="text-gray-500 mt-1">
                Save your favorite loads or truckers for quick access
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplaceHub;
