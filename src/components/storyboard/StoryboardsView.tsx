import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Package,
  User,
  Settings,
  Home,
  BarChart3,
  MessageSquare,
  Calculator,
} from "lucide-react";

interface StoryboardsViewProps {
  onSelectStoryboard?: (id: string) => void;
}

const StoryboardsView: React.FC<StoryboardsViewProps> = ({
  onSelectStoryboard = () => {},
}) => {
  const storyboards = [
    {
      id: "home",
      title: "Home",
      description: "Main application view with user type selection",
      category: "application",
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: "trucker-dashboard",
      title: "Trucker Dashboard",
      description: "Dashboard for truckers to find and manage loads",
      category: "application",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "loader-dashboard",
      title: "Loader Dashboard",
      description: "Dashboard for loaders to post and track shipments",
      category: "application",
      icon: <Package className="h-5 w-5" />,
    },
    {
      id: "user-type-selector",
      title: "User Type Selector",
      description: "Component to switch between trucker and loader views",
      category: "component",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: "loads-panel",
      title: "Loads Panel",
      description: "Component to display available loads",
      category: "component",
      icon: <Package className="h-5 w-5" />,
    },
    {
      id: "shipment-tracker",
      title: "Shipment Tracker",
      description: "Component to track shipments in real-time",
      category: "component",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot",
      description: "Interactive AI assistant for logistics help",
      category: "ai",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "load-calculator",
      title: "Load Calculator",
      description: "AI-powered tool to calculate shipping costs",
      category: "ai",
      icon: <Calculator className="h-5 w-5" />,
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description: "Performance metrics and data visualization",
      category: "feature",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "settings",
      title: "User Settings",
      description: "Profile and account management",
      category: "feature",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Storyboards</h2>
        <p className="text-gray-500">
          Explore the different views and components of the application
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
          <TabsTrigger value="component">Components</TabsTrigger>
          <TabsTrigger value="ai">AI Features</TabsTrigger>
          <TabsTrigger value="feature">Other Features</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyboards.map((storyboard) => (
              <StoryboardCard
                key={storyboard.id}
                storyboard={storyboard}
                onClick={() => onSelectStoryboard(storyboard.id)}
              />
            ))}
          </div>
        </TabsContent>

        {["application", "component", "ai", "feature"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {storyboards
                .filter((s) => s.category === category)
                .map((storyboard) => (
                  <StoryboardCard
                    key={storyboard.id}
                    storyboard={storyboard}
                    onClick={() => onSelectStoryboard(storyboard.id)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface StoryboardCardProps {
  storyboard: {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: React.ReactNode;
  };
  onClick: () => void;
}

const StoryboardCard: React.FC<StoryboardCardProps> = ({
  storyboard,
  onClick,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "application":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "component":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ai":
        return "bg-green-100 text-green-800 border-green-200";
      case "feature":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="cursor-pointer hover:border-blue-200 h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-50 mr-3">
                {storyboard.icon}
              </div>
              <CardTitle>{storyboard.title}</CardTitle>
            </div>
            <Badge
              variant="outline"
              className={getCategoryColor(storyboard.category)}
            >
              {storyboard.category.charAt(0).toUpperCase() +
                storyboard.category.slice(1)}
            </Badge>
          </div>
          <CardDescription className="mt-2">
            {storyboard.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onClick} className="w-full">
            View Storyboard
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default StoryboardsView;
