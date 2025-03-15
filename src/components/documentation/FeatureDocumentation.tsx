import React from "react";
import { motion } from "framer-motion";
import { FileText, Code, ExternalLink, Copy, Check, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface FeatureDocumentationProps {
  feature?: string;
}

const FeatureDocumentation: React.FC<FeatureDocumentationProps> = ({
  feature = "all",
}) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Feature Documentation</h2>
          <p className="text-gray-500">Comprehensive guides for using the Truck&Load platform</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Truck&Load Platform Overview</CardTitle>
                <CardDescription>
                  A comprehensive multi-vendor logistics platform connecting truckers and loaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    Truck&Load is a state-of-the-art logistics platform designed to streamline the connection between truckers and businesses needing shipping services. Our platform offers a range of features to make logistics operations more efficient, transparent, and cost-effective.
                  </p>
                  
                  <h3>Key Features</h3>
                  <ul>
                    <li><strong>Interactive Dashboard</strong> - Personalized views for both truckers and loaders</li>
                    <li><strong>AI-Powered Tools</strong> - Chatbot assistance and load price calculator</li>
                    <li><strong>Real-time Tracking</strong> - Monitor shipments with live updates</li>
                    <li><strong>Marketplace</strong> - Find loads or truckers based on your needs</li>
                    <li><strong>Analytics</strong> - Comprehensive performance metrics and reporting</li>
                  </ul>
                  
                  <h3>Getting Started</h3>
                  <p>
                    To begin using the platform, select your user type (Trucker or Loader) and explore the features available to you. Each user type has a customized dashboard with relevant tools and information.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF Guide
                </Button>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Demo
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>For Truckers</CardTitle>
                  <CardDescription>
                    Find loads and manage your shipments efficiently
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">1</div>
                      <span>Browse available loads in the marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">2</div>
                      <span>Accept loads that match your preferences</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">3</div>
                      <span>Track your shipments in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">4</div>
                      <span>Get paid quickly and securely</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button>
                    View Trucker Guide
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>For Loaders</CardTitle>
                  <CardDescription>
                    Post loads and find reliable transportation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-2 mt-0.5">1</div>
                      <span>Create and post new loads with detailed information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-2 mt-0.5">2</div>
                      <span>Browse available truckers and their credentials</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-2 mt-0.5">3</div>
                      <span>Track your shipments from pickup to delivery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-2 mt-0.5">4</div>
                      <span>Manage payments and documentation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button>
                    View Loader Guide
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Basic introduction to the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Learn how to set up your account, complete your profile, and navigate the platform.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Finding Loads</CardTitle>
                <CardDescription>
                  For truckers seeking shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Discover how to search, filter, and accept loads that match your preferences and equipment.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Posting Loads</CardTitle>
                <CardDescription>
                  For loaders needing transportation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Learn how to create detailed load listings that attract the right truckers for your shipments.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shipment Tracking</CardTitle>
                <CardDescription>
                  Real-time monitoring features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray