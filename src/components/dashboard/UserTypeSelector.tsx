import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface UserTypeSelectorProps {
  selectedType?: "trucker" | "loader";
  onTypeChange?: (type: "trucker" | "loader") => void;
}

const UserTypeSelector = ({
  selectedType = "trucker",
  onTypeChange = () => {},
}: UserTypeSelectorProps) => {
  const [userType, setUserType] = useState<"trucker" | "loader">(selectedType);

  const handleTypeChange = (type: "trucker" | "loader") => {
    setUserType(type);
    onTypeChange(type);
  };

  const handleToggleChange = (checked: boolean) => {
    const newType = checked ? "loader" : "trucker";
    setUserType(newType);
    onTypeChange(newType);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white p-6 shadow-md">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-xl font-bold text-center">Select User Type</h2>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center space-x-4 w-full">
          <span
            className={cn(
              "text-sm font-medium",
              userType === "trucker" ? "text-blue-600" : "text-gray-500",
            )}
          >
            Trucker
          </span>
          <Switch
            checked={userType === "loader"}
            onCheckedChange={handleToggleChange}
            className="data-[state=checked]:bg-orange-500"
          />
          <span
            className={cn(
              "text-sm font-medium",
              userType === "loader" ? "text-orange-600" : "text-gray-500",
            )}
          >
            Loader
          </span>
        </div>

        {/* Button Selection */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <motion.div
            whileHover={{ scale: userType === "trucker" ? 1 : 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={userType === "trucker" ? "default" : "outline"}
              className={cn(
                "w-full h-20 flex flex-col items-center justify-center gap-2 rounded-lg",
                userType === "trucker"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:border-blue-300",
              )}
              onClick={() => handleTypeChange("trucker")}
            >
              <Truck
                className={cn(
                  "h-6 w-6",
                  userType === "trucker" ? "text-white" : "text-blue-600",
                )}
              />
              <span>Trucker</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: userType === "loader" ? 1 : 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={userType === "loader" ? "default" : "outline"}
              className={cn(
                "w-full h-20 flex flex-col items-center justify-center gap-2 rounded-lg",
                userType === "loader"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "hover:border-orange-300",
              )}
              onClick={() => handleTypeChange("loader")}
            >
              <Package
                className={cn(
                  "h-6 w-6",
                  userType === "loader" ? "text-white" : "text-orange-500",
                )}
              />
              <span>Loader</span>
            </Button>
          </motion.div>
        </div>

        {/* Animated Indicator */}
        <motion.div
          className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className={cn(
              "h-full rounded-full",
              userType === "trucker" ? "bg-blue-600" : "bg-orange-500",
            )}
            initial={{
              width: userType === "trucker" ? "50%" : "50%",
              x: userType === "trucker" ? "-50%" : "50%",
            }}
            animate={{
              width: "50%",
              x: userType === "trucker" ? 0 : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </motion.div>

        <p className="text-sm text-gray-500 text-center">
          {userType === "trucker"
            ? "Access available loads and track your shipments"
            : "Post new loads and find available truckers"}
        </p>
      </div>
    </Card>
  );
};

export default UserTypeSelector;
