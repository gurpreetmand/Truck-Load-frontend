import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface TruckerInfo {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  experience: string;
  truckType: string;
  availability: string;
  contactPhone: string;
  contactEmail: string;
  specialties: string[];
}

interface TruckersListProps {
  truckers?: TruckerInfo[];
  onSelect?: (trucker: TruckerInfo) => void;
}

const defaultTruckers: TruckerInfo[] = [
  {
    id: "1",
    name: "Michael Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    location: "Chicago, IL",
    rating: 4.8,
    experience: "8 years",
    truckType: "Semi-Trailer",
    availability: "Available Now",
    contactPhone: "(312) 555-1234",
    contactEmail: "michael.j@truckmail.com",
    specialties: ["Refrigerated", "Long Haul"],
  },
  {
    id: "2",
    name: "Sarah Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    location: "Dallas, TX",
    rating: 4.6,
    experience: "5 years",
    truckType: "Flatbed",
    availability: "Available in 2 days",
    contactPhone: "(214) 555-6789",
    contactEmail: "sarah.w@truckmail.com",
    specialties: ["Heavy Equipment", "Oversized Loads"],
  },
  {
    id: "3",
    name: "David Martinez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    location: "Phoenix, AZ",
    rating: 4.9,
    experience: "12 years",
    truckType: "Box Truck",
    availability: "Available Now",
    contactPhone: "(602) 555-4321",
    contactEmail: "david.m@truckmail.com",
    specialties: ["Local Delivery", "Furniture"],
  },
  {
    id: "4",
    name: "Jennifer Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
    location: "Seattle, WA",
    rating: 4.7,
    experience: "7 years",
    truckType: "Tanker",
    availability: "Available in 1 week",
    contactPhone: "(206) 555-8765",
    contactEmail: "jennifer.l@truckmail.com",
    specialties: ["Liquid Transport", "Hazardous Materials"],
  },
];

const TruckersList: React.FC<TruckersListProps> = ({
  truckers = defaultTruckers,
  onSelect = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [truckTypeFilter, setTruckTypeFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("any");

  // Filter truckers based on search and filters
  const filteredTruckers = truckers.filter((trucker) => {
    const matchesSearch =
      trucker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trucker.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTruckType =
      truckTypeFilter === "all" || trucker.truckType === truckTypeFilter;
    const matchesAvailability =
      availabilityFilter === "any" ||
      trucker.availability.includes(availabilityFilter);

    return matchesSearch && matchesTruckType && matchesAvailability;
  });

  return (
    <div className="w-full h-full bg-background p-4 rounded-lg border">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Truckers</h2>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Advanced Filters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={truckTypeFilter} onValueChange={setTruckTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Truck Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Semi-Trailer">Semi-Trailer</SelectItem>
              <SelectItem value="Flatbed">Flatbed</SelectItem>
              <SelectItem value="Box Truck">Box Truck</SelectItem>
              <SelectItem value="Tanker">Tanker</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={availabilityFilter}
            onValueChange={setAvailabilityFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Availability</SelectItem>
              <SelectItem value="Available Now">Available Now</SelectItem>
              <SelectItem value="Available in">Available Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredTruckers.length > 0 ? (
            filteredTruckers.map((trucker) => (
              <motion.div
                key={trucker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarImage
                            src={trucker.avatar}
                            alt={trucker.name}
                          />
                          <AvatarFallback>
                            {trucker.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {trucker.name}
                          </CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {trucker.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {trucker.rating}
                          </span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(`tel:${trucker.contactPhone}`)
                              }
                            >
                              <Phone className="h-4 w-4 mr-2" /> Call
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(`mailto:${trucker.contactEmail}`)
                              }
                            >
                              <Mail className="h-4 w-4 mr-2" /> Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Experience:
                        </span>
                        <p className="font-medium">{trucker.experience}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Truck Type:
                        </span>
                        <p className="font-medium">{trucker.truckType}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">
                          Availability:
                        </span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <p className="font-medium">{trucker.availability}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {trucker.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => onSelect(trucker)}
                    >
                      Select Trucker
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 flex justify-center items-center h-40 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">
                No truckers match your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TruckersList;
