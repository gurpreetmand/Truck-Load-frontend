import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cookie, Info, CheckCircle, XCircle, Settings } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CookiePolicy = () => {
  const [activeTab, setActiveTab] = useState("policy");
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  const handleCookieToggle = (type: keyof typeof cookiePreferences) => {
    setCookiePreferences({
      ...cookiePreferences,
      [type]: !cookiePreferences[type],
    });
  };

  const savePreferences = () => {
    // In a real app, this would save to localStorage or send to a server
    console.log("Saved preferences:", cookiePreferences);
    alert("Your cookie preferences have been saved.");
  };

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
              <Cookie className="h-8 w-8 mr-3" />
              <h1 className="text-3xl font-bold">Cookie Policy</h1>
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="policy">Cookie Policy</TabsTrigger>
                <TabsTrigger value="preferences">
                  Cookie Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="policy">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="prose max-w-none"
                >
                  <p className="text-lg text-gray-700 mb-6">
                    This Cookie Policy explains how Truck&Load uses cookies and
                    similar technologies to recognize you when you visit our
                    website and use our services. It explains what these
                    technologies are and why we use them, as well as your rights
                    to control our use of them.
                  </p>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-blue-600" />
                      What Are Cookies?
                    </h2>
                    <p className="mb-4">
                      Cookies are small data files that are placed on your
                      computer or mobile device when you visit a website.
                      Cookies are widely used by website owners to make their
                      websites work, or to work more efficiently, as well as to
                      provide reporting information.
                    </p>
                    <p>
                      Cookies set by the website owner (in this case,
                      Truck&Load) are called "first-party cookies". Cookies set
                      by parties other than the website owner are called
                      "third-party cookies". Third-party cookies enable
                      third-party features or functionality to be provided on or
                      through the website (e.g., advertising, interactive
                      content, and analytics).
                    </p>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      Types of Cookies We Use
                    </h2>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">
                        Essential Cookies
                      </h3>
                      <p>
                        These cookies are necessary for the website to function
                        and cannot be switched off in our systems. They are
                        usually only set in response to actions made by you
                        which amount to a request for services, such as setting
                        your privacy preferences, logging in, or filling in
                        forms.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">
                        Functional Cookies
                      </h3>
                      <p>
                        These cookies enable the website to provide enhanced
                        functionality and personalization. They may be set by us
                        or by third-party providers whose services we have added
                        to our pages.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">
                        Analytics Cookies
                      </h3>
                      <p>
                        These cookies allow us to count visits and traffic
                        sources so we can measure and improve the performance of
                        our site. They help us to know which pages are the most
                        and least popular and see how visitors move around the
                        site.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">
                        Marketing Cookies
                      </h3>
                      <p>
                        These cookies may be set through our site by our
                        advertising partners. They may be used by those
                        companies to build a profile of your interests and show
                        you relevant advertisements on other sites.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      How to Control Cookies
                    </h2>
                    <p className="mb-4">
                      You can set or amend your web browser controls to accept
                      or refuse cookies. If you choose to reject cookies, you
                      may still use our website though your access to some
                      functionality and areas of our website may be restricted.
                    </p>
                    <p>
                      You can also control your cookie preferences through the
                      "Cookie Preferences" tab on this page.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      Changes to This Cookie Policy
                    </h2>
                    <p>
                      We may update this Cookie Policy from time to time in
                      order to reflect, for example, changes to the cookies we
                      use or for other operational, legal, or regulatory
                      reasons. Please therefore revisit this Cookie Policy
                      regularly to stay informed about our use of cookies and
                      related technologies.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <p>
                      If you have any questions about our use of cookies or
                      other technologies, please email us at
                      privacy@truckload.com.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="preferences">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-center mb-4">
                      <Settings className="h-5 w-5 mr-2 text-blue-600" />
                      <h2 className="text-xl font-semibold">
                        Cookie Preferences
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Manage your cookie preferences below. Please note that
                      essential cookies cannot be disabled as they are necessary
                      for the website to function properly.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <h3 className="font-medium">Essential Cookies</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 ml-7">
                            Required for the website to function properly.
                            Cannot be disabled.
                          </p>
                        </div>
                        <Switch checked={true} disabled={true} />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <div className="flex items-center">
                            {cookiePreferences.functional ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                            )}
                            <h3 className="font-medium">Functional Cookies</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 ml-7">
                            Enable enhanced functionality and personalization.
                          </p>
                        </div>
                        <Switch
                          checked={cookiePreferences.functional}
                          onCheckedChange={() =>
                            handleCookieToggle("functional")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <div className="flex items-center">
                            {cookiePreferences.analytics ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                            )}
                            <h3 className="font-medium">Analytics Cookies</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 ml-7">
                            Help us improve our website by collecting anonymous
                            usage information.
                          </p>
                        </div>
                        <Switch
                          checked={cookiePreferences.analytics}
                          onCheckedChange={() =>
                            handleCookieToggle("analytics")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <div className="flex items-center">
                            {cookiePreferences.marketing ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                            )}
                            <h3 className="font-medium">Marketing Cookies</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 ml-7">
                            Used to track you across websites for marketing
                            purposes.
                          </p>
                        </div>
                        <Switch
                          checked={cookiePreferences.marketing}
                          onCheckedChange={() =>
                            handleCookieToggle("marketing")
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={savePreferences}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-blue-700">
                          About Browser Settings
                        </h3>
                        <p className="text-sm text-blue-600 mt-1">
                          You can also control cookies through your browser
                          settings. Please note that blocking some types of
                          cookies may impact your experience on our website.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
