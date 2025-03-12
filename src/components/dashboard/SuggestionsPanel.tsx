import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TruckIcon,
  PackageIcon,
  MapPinIcon,
  DollarSignIcon,
  ThumbsUpIcon,
} from "lucide-react";

interface LoadSuggestion {
  id: string;
  title: string;
  location: string;
  destination: string;
  price: number;
  distance: string;
  weight: string;
  matchScore: number;
  tags: string[];
}

interface SuggestionsPanelProps {
  suggestions?: LoadSuggestion[];
  onViewDetails?: (id: string) => void;
  onAcceptLoad?: (id: string) => void;
}

const SuggestionsPanel = ({
  suggestions = [
    {
      id: "1",
      title: "Furniture Delivery",
      location: "Portland, OR",
      destination: "Seattle, WA",
      price: 850,
      distance: "174 miles",
      weight: "1,200 lbs",
      matchScore: 95,
      tags: ["Furniture", "Residential", "High Pay"],
    },
    {
      id: "2",
      title: "Electronics Shipment",
      location: "San Francisco, CA",
      destination: "Los Angeles, CA",
      price: 1200,
      distance: "382 miles",
      weight: "800 lbs",
      matchScore: 88,
      tags: ["Electronics", "Fragile", "Express"],
    },
    {
      id: "3",
      title: "Construction Materials",
      location: "Denver, CO",
      destination: "Salt Lake City, UT",
      price: 950,
      distance: "371 miles",
      weight: "3,500 lbs",
      matchScore: 82,
      tags: ["Construction", "Heavy", "Commercial"],
    },
  ],
  onViewDetails = () => {},
  onAcceptLoad = () => {},
}: SuggestionsPanelProps) => {
  return (
    <div className="w-full h-full bg-background p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Personalized Suggestions</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered load recommendations based on your preferences
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <ThumbsUpIcon size={12} />
          <span>AI Enhanced</span>
        </Badge>
      </div>

      <div className="grid gap-4">
        {suggestions.map((suggestion) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{suggestion.title}</CardTitle>
                  <Badge
                    variant={
                      suggestion.matchScore > 90 ? "default" : "secondary"
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {suggestion.matchScore}% Match
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPinIcon size={14} />
                  {suggestion.location} to {suggestion.destination}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSignIcon size={14} className="text-green-500" />
                    <span>${suggestion.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TruckIcon size={14} className="text-blue-500" />
                    <span>{suggestion.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PackageIcon size={14} className="text-orange-500" />
                    <span>{suggestion.weight}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {suggestion.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(suggestion.id)}
                >
                  View Details
                </Button>
                <Button size="sm" onClick={() => onAcceptLoad(suggestion.id)}>
                  Accept Load
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPanel;
