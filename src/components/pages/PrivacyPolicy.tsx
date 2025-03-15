import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        isDarkMode={false}
        unreadNotifications={3}
      />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-blue-600 p-8 text-white">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 mr-3" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-blue-100">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose max-w-none"
            >
              <p className="text-lg text-gray-700 mb-6">
                At Truck&Load, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our logistics platform.
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-blue-600" />
                  Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information that you provide directly to us when
                  you:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Create an account or user profile</li>
                  <li>Post or accept loads on our platform</li>
                  <li>Communicate with other users</li>
                  <li>Contact our customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <p className="mb-4">This information may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Personal identifiers (name, email address, phone number)
                  </li>
                  <li>Business information (company name, EIN, DOT number)</li>
                  <li>Payment information</li>
                  <li>Location data</li>
                  <li>Device and usage information</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  How We Use Your Information
                </h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Connect truckers with loaders</li>
                  <li>
                    Send you technical notices, updates, and support messages
                  </li>
                  <li>Respond to your comments and questions</li>
                  <li>Develop new products and services</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>
                    Detect, investigate, and prevent fraudulent transactions and
                    other illegal activities
                  </li>
                  <li>Personalize your experience</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Information Sharing and Disclosure
                </h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Other users as needed to facilitate transactions</li>
                  <li>Service providers who perform services on our behalf</li>
                  <li>
                    Professional advisors, such as lawyers and accountants
                  </li>
                  <li>
                    Law enforcement or other third parties in response to legal
                    process
                  </li>
                  <li>
                    Other parties in connection with a company transaction
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Your Rights and Choices
                </h2>
                <p className="mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accessing and updating your information</li>
                  <li>Deleting your account</li>
                  <li>Opting out of marketing communications</li>
                  <li>Controlling cookies and tracking technologies</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at
                  privacy@truckload.com.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information. However, no method of
                  transmission over the Internet or electronic storage is 100%
                  secure, so we cannot guarantee absolute security.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to, and processed in,
                  countries other than the country in which you reside. These
                  countries may have data protection laws that are different
                  from the laws of your country.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@truckload.com
                  <br />
                  <strong>Address:</strong> 123 Logistics Way, Truck City, TC
                  12345, United States
                  <br />
                  <strong>Phone:</strong> +1 (123) 456-7890
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
