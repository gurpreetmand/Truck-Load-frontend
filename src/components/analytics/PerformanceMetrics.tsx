import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Truck,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div
          className={`text-xs mt-1 flex items-center ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}`}
        >
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : trend === "down" ? (
            <TrendingDown className="h-3 w-3 mr-1" />
          ) : null}
          {change}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

interface PerformanceMetricsProps {
  userType?: "trucker" | "loader";
  period?: "week" | "month" | "quarter" | "year";
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  userType = "trucker",
  period = "month",
}) => {
  const [activePeriod, setActivePeriod] = React.useState(period);

  // Trucker metrics
  const truckerMetrics = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+8% from last month",
      trend: "up" as const,
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Miles Driven",
      value: "4,280",
      change: "+12% from last month",
      trend: "up" as const,
      icon: <Truck className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Loads Delivered",
      value: "28",
      change: "+5 from last month",
      trend: "up" as const,
      icon: <Package className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Average Delivery Time",
      value: "1.8 days",
      change: "-0.2 days from last month",
      trend: "down" as const,
      icon: <Clock className="h-5 w-5 text-orange-500" />,
    },
  ];

  // Loader metrics
  const loaderMetrics = [
    {
      title: "Shipping Costs",
      value: "$18,320",
      change: "-5% from last month",
      trend: "down" as const,
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Loads Posted",
      value: "42",
      change: "+8 from last month",
      trend: "up" as const,
      icon: <Package className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Average Fill Time",
      value: "6.2 hours",
      change: "-1.5 hours from last month",
      trend: "down" as const,
      icon: <Clock className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Delivery Success Rate",
      value: "98.5%",
      change: "+0.7% from last month",
      trend: "up" as const,
      icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
    },
  ];

  const metrics = userType === "trucker" ? truckerMetrics : loaderMetrics;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Performance Metrics</h2>
          <p className="text-gray-500">
            Track your logistics performance over time
          </p>
        </div>

        <Tabs
          value={activePeriod}
          onValueChange={(value) => setActivePeriod(value as any)}
          className="mt-4 md:mt-0"
        >
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            delay={index * 0.1}
          />
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
        <div className="text-center">
          <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">
            Detailed analytics charts will appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
