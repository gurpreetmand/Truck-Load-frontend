import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  Calendar,
  Tag,
  Clock,
  ArrowRight,
  Bell,
  X,
  ExternalLink,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: "discount" | "offer" | "announcement" | "update";
  startDate: string;
  endDate: string;
  image?: string;
  link?: string;
  code?: string;
  isNew?: boolean;
}

interface PromotionsHubProps {
  userType?: "trucker" | "loader";
  onDismiss?: (id: string) => void;
  onClaim?: (id: string) => void;
}

const PromotionsHub: React.FC<PromotionsHubProps> = ({
  userType = "trucker",
  onDismiss = () => {},
  onClaim = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock promotions data
  const promotions: Promotion[] = [
    {
      id: "promo-1",
      title: "Summer Discount: 15% Off",
      description:
        "Get 15% off on all loads booked between June 1 and August 31. Use code SUMMER15 at checkout.",
      type: "discount",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      code: "SUMMER15",
      isNew: true,
    },
    {
      id: "promo-2",
      title: "Refer a Friend Program",
      description:
        "Refer a friend to Truck&Load and both of you will receive $50 credit when they complete their first shipment.",
      type: "offer",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      image:
        "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80",
      link: "/referral",
    },
    {
      id: "promo-3",
      title: "New Route Discounts",
      description:
        "Special pricing for loads on newly added routes between Chicago and Denver. Limited time offer.",
      type: "discount",
      startDate: "2023-05-15",
      endDate: "2023-07-15",
      image:
        "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=800&q=80",
      code: "NEWROUTE25",
    },
    {
      id: "promo-4",
      title: "App Update: Version 2.0",
      description:
        "We've updated our platform with new features including contract generation, truck type filtering, and improved load matching.",
      type: "update",
      startDate: "2023-06-10",
      endDate: "2023-07-10",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      link: "/whats-new",
      isNew: true,
    },
    {
      id: "promo-5",
      title: "Logistics Conference 2023",
      description:
        "Join us at the annual Logistics Conference in Atlanta on September 15-17. Use code CONF2023 for discounted registration.",
      type: "announcement",
      startDate: "2023-06-01",
      endDate: "2023-09-15",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      link: "https://logisticsconference2023.com",
      code: "CONF2023",
    },
  ];

  const getFilteredPromotions = () => {
    if (activeTab === "all") return promotions;
    return promotions.filter((promo) => promo.type === activeTab);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Tag className="h-5 w-5 text-green-500" />;
      case "offer":
        return <Tag className="h-5 w-5 text-blue-500" />;
      case "announcement":
        return <Megaphone className="h-5 w-5 text-purple-500" />;
      case "update":
        return <Bell className="h-5 w-5 text-orange-500" />;
      default:
        return <Megaphone className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "discount":
        return "bg-green-100 text-green-800 border-green-200";
      case "offer":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "announcement":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "update":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Megaphone className="h-6 w-6 mr-2 text-blue-600" />
              Promotions & Updates
            </h2>
            <p className="text-gray-500">
              Discover special offers, discounts, and the latest platform
              updates
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="discount">Discounts</TabsTrigger>
            <TabsTrigger value="offer">Offers</TabsTrigger>
            <TabsTrigger value="announcement">Announcements</TabsTrigger>
            <TabsTrigger value="update">Updates</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFilteredPromotions().map((promotion) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  {promotion.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={promotion.image}
                        alt={promotion.title}
                        className="w-full h-full object-cover"
                      />
                      {promotion.isNew && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-blue-600">New</Badge>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant="outline"
                          className={getTypeColor(promotion.type)}
                        >
                          {promotion.type.charAt(0).toUpperCase() +
                            promotion.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {getTypeIcon(promotion.type)}
                          <span className="ml-2">{promotion.title}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(promotion.startDate)} -{" "}
                          {formatDate(promotion.endDate)}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDismiss(promotion.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700">{promotion.description}</p>
                    {promotion.code && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-md flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">
                            Promo Code:
                          </span>
                          <span className="ml-2 font-mono font-bold">
                            {promotion.code}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigator.clipboard.writeText(promotion.code || "")
                          }
                        >
                          Copy
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    {promotion.link ? (
                      <Button
                        className="w-full"
                        onClick={() => window.open(promotion.link, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {promotion.type === "update"
                          ? "Learn More"
                          : "View Details"}
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => onClaim(promotion.id)}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {promotion.type === "discount"
                          ? "Apply Discount"
                          : "Claim Offer"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {getFilteredPromotions().length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                No promotions found
              </h3>
              <p className="text-gray-500 mt-1">
                Check back later for new offers and updates
              </p>
            </div>
          )}
        </Tabs>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-4">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Stay Updated</h3>
              <p className="text-blue-600 mt-1">
                Subscribe to our newsletter to receive the latest promotions and
                updates directly in your inbox.
              </p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsHub;
