import React from "react";
import { motion } from "framer-motion";
import { Truck, Users, Award, Globe, TrendingUp, Clock } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const AboutUs = () => {
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
                  Revolutionizing Logistics Together
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl text-blue-100"
                >
                  Connecting truckers and loaders with innovative technology for
                  a more efficient logistics ecosystem.
                </motion.p>
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
                      x: [0, 30, 0],
                      y: [0, -15, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "easeInOut",
                    }}
                    className="absolute"
                  >
                    <Truck className="w-24 h-24 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{
                      x: [0, -30, 0],
                      y: [0, 15, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute bottom-0 right-0"
                  >
                    <Package className="w-16 h-16 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To create a seamless connection between truckers and loaders,
                optimizing the logistics industry through technology and
                innovation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
                <p className="text-gray-600">
                  Streamlining logistics operations to reduce empty miles and
                  optimize resource utilization.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  Building a trusted network of professionals dedicated to
                  moving goods safely and reliably.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  Reducing the environmental impact of logistics through smarter
                  routing and load matching.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80"
                    alt="Logistics team"
                    className="rounded-lg shadow-md"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold">Founded in 2020</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 md:pl-12"
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Truck&Load was born from a simple observation: the logistics
                  industry was fragmented, inefficient, and ripe for innovation.
                  Our founders, with backgrounds in both technology and
                  transportation, saw an opportunity to bridge the gap between
                  truckers and businesses needing shipping services.
                </p>
                <p className="text-gray-600 mb-4">
                  Starting with a small team in 2020, we built a platform that
                  made it easy for truckers to find loads and for shippers to
                  find reliable transportation. What began as a simple matching
                  service has evolved into a comprehensive logistics ecosystem
                  with real-time tracking, AI-powered suggestions, and a vibrant
                  community of professionals.
                </p>
                <p className="text-gray-600">
                  Today, Truck&Load connects thousands of truckers and
                  businesses across the country, moving everything from retail
                  goods to construction materials, while continuously innovating
                  to make logistics more efficient, transparent, and
                  sustainable.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <div className="w-20 h-1 bg-white mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <p className="text-blue-200">Active Truckers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <p className="text-blue-200">Businesses Served</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">1M+</div>
                <p className="text-blue-200">Loads Delivered</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">30%</div>
                <p className="text-blue-200">Reduction in Empty Miles</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the passionate individuals driving our mission forward.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  alt="CEO"
                  className="w-full h-64 object-cover object-center bg-gray-100"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Alex Johnson</h3>
                  <p className="text-blue-600 mb-3">Chief Executive Officer</p>
                  <p className="text-gray-600">
                    Former logistics executive with 15+ years of experience in
                    the transportation industry.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="CTO"
                  className="w-full h-64 object-cover object-center bg-gray-100"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Sarah Chen</h3>
                  <p className="text-blue-600 mb-3">Chief Technology Officer</p>
                  <p className="text-gray-600">
                    Tech innovator with a background in AI and platform
                    development at leading tech companies.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
                  alt="COO"
                  className="w-full h-64 object-cover object-center bg-gray-100"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Marcus Rodriguez</h3>
                  <p className="text-blue-600 mb-3">Chief Operations Officer</p>
                  <p className="text-gray-600">
                    Operations expert who has scaled multiple logistics startups
                    from the ground up.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Package = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export default AboutUs;
