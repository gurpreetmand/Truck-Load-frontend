import React from "react";
import { motion } from "framer-motion";
import { Truck, Package, BarChart3, Clock, Shield, Zap, Search, DollarSign } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        isDarkMode={false}
        unreadNotifications={3}
      />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  Our Logistics Services
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl text-blue-100 mb-6"
                >
                  Comprehensive solutions for truckers and loaders to streamline your logistics operations.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Get Started
                  </Button>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 flex justify-center"
              >
                <div className="relative w-64 h-64">
                  <motion.div
                    animate={{
                      x: [0, 40, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "easeInOut",
                    }}
                    className="absolute"
                  >
                    <Truck className="w-24 h-24 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Core Services</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide a comprehensive suite of logistics services designed to meet the needs of both truckers and loaders.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<Search className="h-10 w-10 text-blue-600" />}
                title="Load Matching"
                description="Our AI-powered platform connects truckers with available loads based on location, equipment type, and preferences."
                delay={0.1}
              />
              
              <ServiceCard 
                icon={<BarChart3 className="h-10 w-10 text-blue-600" />}
                title="Real-time Analytics"
                description="Access detailed insights into your logistics operations, including performance metrics, cost analysis, and efficiency reports."
                delay={0.2}
              />
              
              <ServiceCard 
                icon={<Clock className="h-10 w-10 text-blue-600" />}
                title="Shipment Tracking"
                description="Monitor your shipments in real-time with GPS tracking, status updates, and estimated arrival times."
                delay={0.3}
              />
              
              <ServiceCard 
                icon={<DollarSign className="h-10 w-10 text-blue-600" />}
                title="Pricing Optimization"
                description="Our AI calculator helps you set competitive rates based on market conditions, distance, weight, and other factors."
                delay={0.4}
              />
              
              <ServiceCard 
                icon={<Shield className="h-10 w-10 text-blue-600" />}
                title="Secure Payments"
                description="Fast, secure payment processing with transparent fee structures and quick settlement times."
                delay={0.5}
              />
              
              <ServiceCard 
                icon={<Zap className="h-10 w-10 text-blue-600" />}
                title="Automated Dispatching"
                description="Streamline your operations with automated load assignment, route optimization, and delivery scheduling."
                delay={0.6}
              />
            </div>
          </div>
        </section>
        
        {/* For Truckers Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
              >
                <div className="bg-blue-600 text-white p-2 inline-block rounded-lg mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold mb-6">For Truckers</h2>
                <p className="text-gray-600 mb-6">
                  As a trucker on our platform, you'll have access to a wide range of tools and services designed to help you maximize your earnings, reduce empty miles, and streamline your operations.
                </p>
                
                <div className="space-y-4">
                  <FeatureItem 
                    title="Find Loads Easily"
                    description="Access thousands of available loads matching your equipment type and preferred routes."
                  />
                  
                  <FeatureItem 
                    title="Reduce Empty Miles"
                    description="Our intelligent matching system helps you find backhauls and minimize deadhead driving."
                  />
                  
                  <FeatureItem 
                    title="Get Paid Faster"
                    description="Receive payments quickly and securely through our integrated payment system."
                  />
                  
                  <FeatureItem 
                    title="Manage Your Business"
                    description="Track expenses, generate reports, and manage your documentation all in one place."
                  />
                </div>
                
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                  Sign Up as a Trucker
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80" 
                    alt="Trucker using app" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="text-lg font-semibold">"I've increased my revenue by 30% since joining Truck&Load."</p>
                      <p className="text-sm">- Michael J., Independent Trucker</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* For Loaders Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 mb-8 lg:mb-0 lg:pl-12"
              >
                <div className="bg-orange-500 text-white p-2 inline-block rounded-lg mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold mb-6">For Loaders</h2>
                <p className="text-gray-600 mb-6">
                  Whether you're a business shipping products or an individual moving goods, our platform provides you with the tools to find reliable transportation quickly and at competitive rates.
                </p>
                
                <div className="space-y-4">
                  <FeatureItem 
                    title="Post Loads in Minutes"
                    description="Our intuitive interface makes it easy to post loads and receive quotes from qualified carriers."
                  />
                  
                  <FeatureItem 
                    title="Verify Carrier Credentials"
                    description="All carriers on our platform are pre-screened and their credentials are verified for your peace of mind."
                  />
                  
                  <FeatureItem 
                    title="Track Your Shipments"
                    description="Monitor your shipments in real-time with GPS tracking and receive automated status updates."
                  />
                  
                  <FeatureItem 
                    title="Optimize Your Logistics"
                    description="Use our analytics tools to identify cost-saving opportunities and improve your supply chain."
                  />
                </div>
                
                <Button className="mt-8 bg-orange-500 hover:bg-orange-600">
                  Sign Up as a Loader
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80" 
                    alt="Loader using app" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="text-lg font-semibold">"We've cut our shipping costs by 25% while improving delivery times."</p>
                      <p className="text-sm">- Sarah T., Logistics Manager</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your business needs.
              </p>
            </motion.div>
            
