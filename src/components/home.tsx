import React, { useState } from "react";
import { motion } from "framer-motion";

import Header from "./layout/Header";
import UserTypeSelector from "./dashboard/UserTypeSelector";
import TruckerDashboard from "./dashboard/TruckerDashboard";
import LoaderDashboard from "./dashboard/LoaderDashboard";
import AIChatbot from "./ai/AIChatbot";
import LoadCalculator from "./ai/LoadCalculator";
import ThemeSelector from "./settings/ThemeSelector";

const Home: React.FC = () => {
  // State for user type selection
  const [userType, setUserType] = useState<"trucker" | "loader">("trucker");

  // State for theme management
  const [currentTheme, setCurrentTheme] = useState<"blue" | "orange" | "green">(
    "blue",
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State for AI components visibility
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [isThemeSelectorVisible, setIsThemeSelectorVisible] = useState(false);

  // Handle user type change
  const handleUserTypeChange = (type: "trucker" | "loader") => {
    setUserType(type);
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle theme change
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId as "blue" | "orange" | "green");
    setIsThemeSelectorVisible(false);
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  // Toggle calculator visibility
  const toggleCalculator = () => {
    setIsCalculatorVisible(!isCalculatorVisible);
  };

  // Toggle theme selector visibility
  const toggleThemeSelector = () => {
    setIsThemeSelectorVisible(!isThemeSelectorVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        onThemeToggle={toggleThemeSelector}
        onChatbotToggle={toggleChatbot}
        isDarkMode={isDarkMode}
        unreadNotifications={3}
      />

      {/* Main Content */}
      <main className="pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        {/* User Type Selector */}
        <div className="mb-6">
          <UserTypeSelector
            selectedType={userType}
            onTypeChange={handleUserTypeChange}
          />
        </div>

        {/* Dashboard based on user type */}
        <motion.div
          key={userType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {userType === "trucker" ? (
            <TruckerDashboard
              userName="John Doe"
              onLoadSelect={(loadId) => {
                console.log("Selected load:", loadId);
                // Could open load details or trigger other actions
              }}
              onShipmentSelect={(shipmentId) => {
                console.log("Selected shipment:", shipmentId);
                // Could open shipment details or trigger other actions
              }}
            />
          ) : (
            <LoaderDashboard
              userName="John Doe"
              activeLoads={3}
              pendingLoads={2}
              completedLoads={12}
              onCreateLoad={(data) => {
                console.log("Created load:", data);
                // Could handle load creation logic
              }}
              onSelectTrucker={(trucker) => {
                console.log("Selected trucker:", trucker);
                // Could open trucker details or trigger other actions
              }}
            />
          )}
        </motion.div>
      </main>

      {/* AI Chatbot */}
      {isChatbotVisible && (
        <AIChatbot
          isOpen={isChatbotVisible}
          onClose={toggleChatbot}
          position="bottom-right"
          theme={currentTheme}
        />
      )}

      {/* Load Calculator */}
      {isCalculatorVisible && (
        <LoadCalculator
          isOpen={isCalculatorVisible}
          onClose={toggleCalculator}
          onCalculate={(result) => {
            console.log("Calculation result:", result);
            // Could use the calculation result for further actions
          }}
        />
      )}

      {/* Theme Selector Dialog */}
      {isThemeSelectorVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="max-w-md w-full p-4">
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>
      )}

      {/* Floating Action Button for Calculator */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleCalculator}
        className={`fixed bottom-4 left-4 rounded-full p-3 shadow-lg z-40 ${currentTheme === "blue" ? "bg-blue-600 hover:bg-blue-700" : currentTheme === "orange" ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"} text-white`}
      >
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
          className="lucide lucide-calculator"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <line x1="8" x2="16" y1="6" y2="6" />
          <line x1="16" x2="16" y1="14" y2="18" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Home;
