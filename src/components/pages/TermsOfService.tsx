import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, HelpCircle } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const TermsOfService = () => {
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
              <Scale className="h-8 w-8 mr-3" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
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
                Please read these Terms of Service ("Terms") carefully before
                using the Truck&Load platform. By accessing or using our
                service, you agree to be bound by these Terms.
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4">
                  By accessing or using the Truck&Load platform, website, mobile
                  applications, or any other services provided by Truck&Load
                  (collectively, the "Service"), you agree to be bound by these
                  Terms. If you do not agree to all of these Terms, you may not
                  access or use our Service.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  2. Description of Service
                </h2>
                <p className="mb-4">
                  Truck&Load provides a platform that connects truckers and
                  loaders for the purpose of facilitating logistics services.
                  Our Service allows users to post, search for, and accept loads
                  for transportation, track shipments, and communicate with
                  other users.
                </p>
                <p>
                  We do not provide transportation services directly. We are a
                  technology platform that facilitates connections between
                  independent truckers and businesses or individuals who need
                  shipping services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  3. User Accounts
                </h2>
                <p className="mb-4">
                  To use certain features of our Service, you must register for
                  an account. You agree to provide accurate, current, and
                  complete information during the registration process and to
                  update such information to keep it accurate, current, and
                  complete.
                </p>
                <p className="mb-4">
                  You are responsible for safeguarding your password and for all
                  activities that occur under your account. You agree to notify
                  us immediately of any unauthorized use of your account.
                </p>
                <p>
                  We reserve the right to disable any user account at any time
                  if, in our opinion, you have failed to comply with any
                  provision of these Terms.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  4. User Conduct
                </h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Use the Service for any illegal purpose or in violation of
                    any laws
                  </li>
                  <li>
                    Post false, inaccurate, misleading, defamatory, or libelous
                    content
                  </li>
                  <li>
                    Interfere with or disrupt the Service or servers or networks
                    connected to the Service
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any portion of the
                    Service
                  </li>
                  <li>
                    Collect or store personal data about other users without
                    their express consent
                  </li>
                  <li>
                    Impersonate any person or entity or falsely state or
                    misrepresent your affiliation with a person or entity
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  5. Payments and Fees
                </h2>
                <p className="mb-4">
                  Truck&Load may charge fees for the use of certain features of
                  the Service. You agree to pay all applicable fees as described
                  on the Service at the time you use such features.
                </p>
                <p className="mb-4">
                  All payments are processed through our third-party payment
                  processors. By providing a payment method, you authorize us to
                  charge the applicable fees to that payment method.
                </p>
                <p>
                  All fees are exclusive of taxes, which may be added to the
                  fees charged by Truck&Load. You are responsible for paying all
                  taxes associated with your use of the Service.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  6. Limitation of Liability
                </h2>
                <p className="mb-4">
                  To the maximum extent permitted by law, Truck&Load shall not
                  be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Your access to or use of or inability to access or use the
                    Service
                  </li>
                  <li>
                    Any conduct or content of any third party on the Service
                  </li>
                  <li>Any content obtained from the Service</li>
                  <li>
                    Unauthorized access, use, or alteration of your
                    transmissions or content
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  7. Dispute Resolution
                </h2>
                <p className="mb-4">
                  You agree that any dispute, claim, or controversy arising out
                  of or relating to these Terms or the breach, termination,
                  enforcement, interpretation, or validity thereof or the use of
                  the Service shall be resolved by binding arbitration between
                  you and Truck&Load, except that each party retains the right
                  to bring an individual action in small claims court.
                </p>
                <p>
                  The arbitration shall be conducted in accordance with the
                  American Arbitration Association Commercial Arbitration Rules.
                  The arbitration shall be held in the United States county
                  where you reside or work, or any other location we agree to.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  8. Modifications to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. If we
                  make changes, we will provide notice of such changes, such as
                  by sending an email notification, providing notice through the
                  Service, or updating the "Last Updated" date at the beginning
                  of these Terms. By continuing to access or use the Service
                  after the revisions become effective, you agree to be bound by
                  the revised Terms.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  9. Termination
                </h2>
                <p>
                  We may terminate or suspend your access to the Service
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach the
                  Terms. Upon termination, your right to use the Service will
                  immediately cease.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                  10. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  at legal@truckload.com.
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

export default TermsOfService;
