import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Snowflake, Droplet, Wind, Package, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TruckTypeSelectorProps {
  onSelect?: (truckType: string) => void;
  className?: string;
}

const TruckTypeSelector: React.FC<TruckTypeSelectorProps> = ({
  onSelect = () => {},
  className = "",
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const truckTypes = [
    {
      id: "flatbed",
      name: "Flatbed",
      icon: <Truck />,
      description: "Open trailer with no sides or roof",
      capacity: "48,000 lbs",
      dimensions: "48' x 8.5'",
    },
    {
      id: "refrigerated",
      name: "Refrigerated",
      icon: <Snowflake />,
      description: "Temperature-controlled trailer for perishable goods",
      capacity: "44,000 lbs",
      dimensions: "53' x 8.5' x 9.5'",
    },
    {
      id: "tanker",
      name: "Tanker",
      icon: <Droplet />,
      description: "For transporting liquids and gases",
      capacity: "42,000 lbs",
      dimensions: "42' x 8'",
    },
    {
      id: "container",
      name: "Container",
      icon: <Package />,
      description: "Standard shipping container transport",
      capacity: "44,000 lbs",
      dimensions: "20' or 40' standard",
    },
    {
      id: "gas",
      name: "Gas Tanker",
      icon: <Wind />,
      description: "Specialized for gas transportation",
      capacity: "40,000 lbs",
      dimensions: "40' x 8'",
    },
    {
      id: "dry-van",
      name: "Dry Van",
      icon: <Truck />,
      description: "Enclosed trailer for general freight",
      capacity: "45,000 lbs",
      dimensions: "53' x 8.5' x 9.5'",
    },
  ];

  const handleSelect = (truckType: string) => {
    setSelectedType(truckType);
    onSelect(truckType);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Select Truck Type</h3>
        <div className="flex items-center space-x-2">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="grid w-[120px] grid-cols-2">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" className="ml-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {truckTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(type.id)}
            >
              <Card
                className={`cursor-pointer h-full transition-colors ${selectedType === type.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"}`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`p-3 rounded-full ${selectedType === type.id ? "bg-blue-100" : "bg-gray-100"} mb-3`}
                    >
                      {React.cloneElement(type.icon, {
                        className: `h-8 w-8 ${selectedType === type.id ? "text-blue-600" : "text-gray-600"}`,
                      })}
                    </div>
                    <h4 className="font-medium mb-1">{type.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                      <Badge variant="outline">{type.capacity}</Badge>
                      <Badge variant="outline">{type.dimensions}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {truckTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelect(type.id)}
            >
              <Card
                className={`cursor-pointer transition-colors ${selectedType === type.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full ${selectedType === type.id ? "bg-blue-100" : "bg-gray-100"} mr-4`}
                    >
                      {React.cloneElement(type.icon, {
                        className: `h-6 w-6 ${selectedType === type.id ? "text-blue-600" : "text-gray-600"}`,
                      })}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-500">
                        {type.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="outline">{type.capacity}</Badge>
                      <Badge variant="outline">{type.dimensions}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {selectedType && (
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => console.log(`Selected truck type: ${selectedType}`)}
          >
            Apply Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default TruckTypeSelector;
