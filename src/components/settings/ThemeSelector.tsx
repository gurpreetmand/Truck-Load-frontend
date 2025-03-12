import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeOption {
  id: string;
  name: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  preview: string;
}

interface ThemeSelectorProps {
  currentTheme?: string;
  onThemeChange?: (themeId: string) => void;
}

const ThemeSelector = ({
  currentTheme = "blue",
  onThemeChange = () => {},
}: ThemeSelectorProps) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const themeOptions: ThemeOption[] = [
    {
      id: "blue",
      name: "Ocean Blue",
      color: "bg-blue-600",
      primaryColor: "#2563eb",
      secondaryColor: "#93c5fd",
      accentColor: "#1e40af",
      preview:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    },
    {
      id: "orange",
      name: "Sunset Orange",
      color: "bg-orange-600",
      primaryColor: "#ea580c",
      secondaryColor: "#fdba74",
      accentColor: "#9a3412",
      preview:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
    },
    {
      id: "green",
      name: "Forest Green",
      color: "bg-green-600",
      primaryColor: "#16a34a",
      secondaryColor: "#86efac",
      accentColor: "#166534",
      preview:
        "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=400&q=80",
    },
  ];

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    onThemeChange(themeId);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Theme Settings</CardTitle>
            <CardDescription>
              Customize the appearance of your dashboard
            </CardDescription>
          </div>
          <div className="p-2 rounded-full bg-gray-100">
            <Palette className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Select Theme</h3>
            <RadioGroup
              value={selectedTheme}
              onValueChange={handleThemeChange}
              className="grid grid-cols-1 gap-4"
            >
              {themeOptions.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer ${selectedTheme === theme.id ? `border-${theme.color.split("-")[1]}-600` : "border-gray-200"}`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <RadioGroupItem
                        value={theme.id}
                        id={theme.id}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${theme.color} mr-2`}
                        />
                        <label
                          htmlFor={theme.id}
                          className="text-base font-medium"
                        >
                          {theme.name}
                        </label>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Professional yet vibrant color scheme
                      </div>
                    </div>
                    {selectedTheme === theme.id && (
                      <div
                        className={`h-5 w-5 rounded-full ${theme.color} flex items-center justify-center`}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="relative h-20 w-full rounded-md overflow-hidden">
                      <img
                        src={theme.preview}
                        alt={`${theme.name} preview`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-6 h-6 rounded-full ${theme.color}`}
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Primary Color</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Secondary Color</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Accent Color</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline">Reset to Default</Button>
        <Button
          className={`${selectedTheme === "blue" ? "bg-blue-600 hover:bg-blue-700" : selectedTheme === "orange" ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"}`}
        >
          Apply Theme
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThemeSelector;
