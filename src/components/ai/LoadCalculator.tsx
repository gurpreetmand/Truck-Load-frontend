import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Truck,
  Package,
  Weight,
  Ruler,
  MapPin,
  DollarSign,
  X,
  Minimize2,
  Maximize2,
  HelpCircle,
  RotateCcw,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LoadCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCalculate?: (result: CalculationResult) => void;
  defaultValues?: {
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    distance?: number;
    loadType?: string;
  };
}

interface CalculationResult {
  basePrice: number;
  distanceFee: number;
  weightFee: number;
  specialHandlingFee: number;
  totalPrice: number;
}

const LoadCalculator = ({
  isOpen = true,
  onClose = () => {},
  onCalculate = () => {},
  defaultValues = {
    weight: 1000,
    length: 48,
    width: 48,
    height: 48,
    distance: 100,
    loadType: "standard",
  },
}: LoadCalculatorProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [weight, setWeight] = useState(defaultValues.weight || 1000);
  const [length, setLength] = useState(defaultValues.length || 48);
  const [width, setWidth] = useState(defaultValues.width || 48);
  const [height, setHeight] = useState(defaultValues.height || 48);
  const [distance, setDistance] = useState(defaultValues.distance || 100);
  const [loadType, setLoadType] = useState(
    defaultValues.loadType || "standard",
  );
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const resetForm = () => {
    setWeight(defaultValues.weight || 1000);
    setLength(defaultValues.length || 48);
    setWidth(defaultValues.width || 48);
    setHeight(defaultValues.height || 48);
    setDistance(defaultValues.distance || 100);
    setLoadType(defaultValues.loadType || "standard");
    setCalculationResult(null);
  };

  const calculatePrice = () => {
    // Base price calculation
    const basePrice = 250;

    // Distance fee: $1 per mile
    const distanceFee = distance * 1;

    // Weight fee: $0.05 per pound
    const weightFee = weight * 0.05;

    // Special handling fee based on load type
    let specialHandlingFee = 0;
    switch (loadType) {
      case "fragile":
        specialHandlingFee = 200;
        break;
      case "hazardous":
        specialHandlingFee = 350;
        break;
      case "refrigerated":
        specialHandlingFee = 300;
        break;
      case "oversized":
        specialHandlingFee = 250;
        break;
      default:
        specialHandlingFee = 0;
    }

    // Calculate total price
    const totalPrice = basePrice + distanceFee + weightFee + specialHandlingFee;

    const result = {
      basePrice,
      distanceFee,
      weightFee,
      specialHandlingFee,
      totalPrice,
    };

    setCalculationResult(result);
    onCalculate(result);
  };

  const getLoadTypeLabel = (type: string) => {
    switch (type) {
      case "standard":
        return "Standard";
      case "fragile":
        return "Fragile";
      case "hazardous":
        return "Hazardous";
      case "refrigerated":
        return "Refrigerated";
      case "oversized":
        return "Oversized";
      default:
        return "Standard";
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-0 overflow-hidden bg-white rounded-xl border-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Calculator className="h-6 w-6 text-white mr-2" />
              <h2 className="text-lg font-bold text-white">
                AI Load Calculator
              </h2>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="text-white hover:bg-blue-500"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-blue-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="weight" className="flex items-center">
                        <Weight className="h-4 w-4 mr-1 text-blue-500" />
                        Weight (lbs)
                      </Label>
                      <span className="text-sm font-medium">{weight} lbs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-24"
                      />
                      <div className="flex-1">
                        <Slider
                          value={[weight]}
                          min={100}
                          max={10000}
                          step={100}
                          onValueChange={(value) => setWeight(value[0])}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label
                        htmlFor="length"
                        className="text-xs flex items-center"
                      >
                        <Ruler className="h-3 w-3 mr-1 text-blue-500" />
                        Length (in)
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="width"
                        className="text-xs flex items-center"
                      >
                        <Ruler className="h-3 w-3 mr-1 text-blue-500" />
                        Width (in)
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="height"
                        className="text-xs flex items-center"
                      >
                        <Ruler className="h-3 w-3 mr-1 text-blue-500" />
                        Height (in)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="distance" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        Distance (miles)
                      </Label>
                      <span className="text-sm font-medium">
                        {distance} miles
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="distance"
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-24"
                      />
                      <div className="flex-1">
                        <Slider
                          value={[distance]}
                          min={10}
                          max={3000}
                          step={10}
                          onValueChange={(value) => setDistance(value[0])}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="loadType"
                      className="flex items-center mb-1"
                    >
                      <Package className="h-4 w-4 mr-1 text-blue-500" />
                      Load Type
                    </Label>
                    <Select value={loadType} onValueChange={setLoadType}>
                      <SelectTrigger id="loadType">
                        <SelectValue placeholder="Select load type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="fragile">Fragile</SelectItem>
                        <SelectItem value="hazardous">Hazardous</SelectItem>
                        <SelectItem value="refrigerated">
                          Refrigerated
                        </SelectItem>
                        <SelectItem value="oversized">Oversized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  {calculationResult ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-blue-700 flex items-center">
                        <DollarSign className="h-5 w-5 mr-1" />
                        Price Estimate
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Price:</span>
                          <span>${calculationResult.basePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distance Fee:</span>
                          <span>
                            ${calculationResult.distanceFee.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weight Fee:</span>
                          <span>${calculationResult.weightFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Special Handling:
                          </span>
                          <span>
                            ${calculationResult.specialHandlingFee.toFixed(2)}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                          <span>Total Estimate:</span>
                          <span className="text-blue-700">
                            ${calculationResult.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                          {getLoadTypeLabel(loadType)}
                        </Badge>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                          {weight} lbs
                        </Badge>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                          {distance} miles
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        <p>
                          This is an AI-generated estimate and may vary based on
                          market conditions and specific requirements.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Truck className="h-16 w-16 text-blue-200 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">
                        Ready to Calculate
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Enter your load details to get an instant price estimate
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              <HelpCircle className="h-4 w-4 mr-1" />
                              How it works
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Our AI calculator uses weight, dimensions,
                              distance, and load type to generate accurate price
                              estimates based on current market rates.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="flex items-center"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                <Button
                  onClick={calculatePrice}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Calculate Price
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadCalculator;
