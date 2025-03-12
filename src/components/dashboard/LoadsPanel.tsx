import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Truck,
  Package,
  ArrowUpDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoadItem {
  id: string;
  title: string;
  origin: string;
  destination: string;
  distance: string;
  weight: string;
  dimensions: string;
  price: string;
  date: string;
  status: "available" | "pending" | "booked";
  urgency: "normal" | "urgent" | "express";
}

interface LoadsPanelProps {
  loads?: LoadItem[];
  onLoadSelect?: (load: LoadItem) => void;
  onFilterChange?: (filters: any) => void;
}

const LoadsPanel = ({
  loads = [
    {
      id: "1",
      title: "Furniture Shipment",
      origin: "New York, NY",
      destination: "Boston, MA",
      distance: "215 miles",
      weight: "1,200 lbs",
      dimensions: "8×6×5 ft",
      price: "$850",
      date: "2023-06-15",
      status: "available",
      urgency: "normal",
    },
    {
      id: "2",
      title: "Electronics Delivery",
      origin: "Chicago, IL",
      destination: "Indianapolis, IN",
      distance: "180 miles",
      weight: "800 lbs",
      dimensions: "6×4×4 ft",
      price: "$650",
      date: "2023-06-16",
      status: "available",
      urgency: "urgent",
    },
    {
      id: "3",
      title: "Construction Materials",
      origin: "Denver, CO",
      destination: "Salt Lake City, UT",
      distance: "520 miles",
      weight: "3,500 lbs",
      dimensions: "12×8×6 ft",
      price: "$1,200",
      date: "2023-06-18",
      status: "available",
      urgency: "express",
    },
    {
      id: "4",
      title: "Retail Goods Shipment",
      origin: "Seattle, WA",
      destination: "Portland, OR",
      distance: "175 miles",
      weight: "1,800 lbs",
      dimensions: "10×6×6 ft",
      price: "$750",
      date: "2023-06-20",
      status: "pending",
      urgency: "normal",
    },
  ],
  onLoadSelect = () => {},
  onFilterChange = () => {},
}: LoadsPanelProps) => {
  const [selectedLoad, setSelectedLoad] = useState<LoadItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleLoadSelect = (load: LoadItem) => {
    setSelectedLoad(load);
    onLoadSelect(load);
  };

  const filteredLoads = loads.filter(
    (load) =>
      load.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "express":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Available Loads</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === "date" ? "price" : "date")}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort: {sortBy === "date" ? "Date" : "Price"}
            </Button>
          </div>
        </div>
        <CardDescription>
          Find and filter available loads for your truck
        </CardDescription>
        <div className="mt-2 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location or load type..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All Loads</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="booked">Booked</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="divide-y">
              {filteredLoads.map((load) => (
                <motion.div
                  key={load.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="p-4 cursor-pointer"
                  onClick={() => handleLoadSelect(load)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{load.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {load.origin} to {load.destination}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{new Date(load.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{load.price}</div>
                      <div className="flex space-x-2 mt-1">
                        <Badge
                          variant="outline"
                          className={getUrgencyColor(load.urgency)}
                        >
                          {load.urgency.charAt(0).toUpperCase() +
                            load.urgency.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Truck className="h-3.5 w-3.5 mr-1" />
                      <span>{load.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {load.weight} • {load.dimensions}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredLoads.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="text-lg font-medium">No loads found</h3>
                  <p className="mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="available" className="mt-0">
            <div className="divide-y">
              {filteredLoads
                .filter((load) => load.status === "available")
                .map((load) => (
                  <motion.div
                    key={load.id}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="p-4 cursor-pointer"
                    onClick={() => handleLoadSelect(load)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{load.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {load.origin} to {load.destination}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {new Date(load.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {load.price}
                        </div>
                        <div className="flex space-x-2 mt-1">
                          <Badge
                            variant="outline"
                            className={getUrgencyColor(load.urgency)}
                          >
                            {load.urgency.charAt(0).toUpperCase() +
                              load.urgency.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Truck className="h-3.5 w-3.5 mr-1" />
                        <span>{load.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {load.weight} • {load.dimensions}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <div className="divide-y">
              {filteredLoads
                .filter((load) => load.status === "pending")
                .map((load) => (
                  <motion.div
                    key={load.id}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="p-4 cursor-pointer"
                    onClick={() => handleLoadSelect(load)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{load.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {load.origin} to {load.destination}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {new Date(load.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {load.price}
                        </div>
                        <div className="flex space-x-2 mt-1">
                          <Badge
                            variant="outline"
                            className={getUrgencyColor(load.urgency)}
                          >
                            {load.urgency.charAt(0).toUpperCase() +
                              load.urgency.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Truck className="h-3.5 w-3.5 mr-1" />
                        <span>{load.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {load.weight} • {load.dimensions}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="booked" className="mt-0">
            <div className="divide-y">
              {filteredLoads
                .filter((load) => load.status === "booked")
                .map((load) => (
                  <motion.div
                    key={load.id}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="p-4 cursor-pointer"
                    onClick={() => handleLoadSelect(load)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{load.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {load.origin} to {load.destination}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {new Date(load.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {load.price}
                        </div>
                        <div className="flex space-x-2 mt-1">
                          <Badge
                            variant="outline"
                            className={getUrgencyColor(load.urgency)}
                          >
                            {load.urgency.charAt(0).toUpperCase() +
                              load.urgency.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Truck className="h-3.5 w-3.5 mr-1" />
                        <span>{load.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {load.weight} • {load.dimensions}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-gray-500">
          Showing {filteredLoads.length} of {loads.length} loads
        </div>
        <Button size="sm">View More</Button>
      </CardFooter>
    </Card>
  );
};

export default LoadsPanel;
