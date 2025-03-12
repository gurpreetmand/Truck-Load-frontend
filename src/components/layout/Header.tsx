import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  User,
  Bell,
  MessageSquare,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onThemeToggle?: () => void;
  onChatbotToggle?: () => void;
  isDarkMode?: boolean;
  unreadNotifications?: number;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  onThemeToggle = () => {},
  onChatbotToggle = () => {},
  isDarkMode = false,
  unreadNotifications = 3,
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: 0 }}
            className="mr-2"
          >
            <Truck className="h-8 w-8 text-blue-600" />
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-blue-700">Truck&Load</h1>
            <p className="text-xs text-gray-500">Multi-Vendor Logistics</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Shipments
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Marketplace
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Analytics
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <Sun className="h-4 w-4 text-gray-500" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={onThemeToggle}
              aria-label="Toggle theme"
            />
            <Moon className="h-4 w-4 text-gray-500" />
          </div>

          {/* AI Chatbot Button */}
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex relative"
            onClick={onChatbotToggle}
          >
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span className="sr-only">Open AI Assistant</span>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative hidden md:flex"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white"
                    variant="destructive"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 hover:bg-gray-100 cursor-pointer">
                  <div className="font-medium">New load available</div>
                  <div className="text-sm text-gray-500">
                    A new load matching your preferences is available in
                    Seattle.
                  </div>
                  <div className="text-xs text-gray-400 mt-1">5 mins ago</div>
                </div>
                <div className="p-3 hover:bg-gray-100 cursor-pointer">
                  <div className="font-medium">Shipment status update</div>
                  <div className="text-sm text-gray-500">
                    Your shipment #SHP-1234 has been delivered successfully.
                  </div>
                  <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                </div>
                <div className="p-3 hover:bg-gray-100 cursor-pointer">
                  <div className="font-medium">Payment received</div>
                  <div className="text-sm text-gray-500">
                    You received a payment of $750 for load #LD-5678.
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Yesterday</div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Button variant="link" size="sm" className="text-blue-600">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-gray-500">
                    {userName.toLowerCase().replace(" ", ".")}@truckload.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-gray-200 shadow-md"
        >
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Shipments
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Analytics
              </a>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Dark Mode</span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onThemeToggle}
                  aria-label="Toggle theme"
                />
              </div>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 w-full"
                onClick={onChatbotToggle}
              >
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>AI Assistant</span>
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
