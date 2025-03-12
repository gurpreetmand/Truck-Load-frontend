import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Maximize2,
  Minimize2,
  Bot,
  User,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMessage?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark" | "blue" | "orange" | "green";
}

const AIChatbot = ({
  isOpen = true,
  onClose = () => {},
  initialMessage = "Hi there! I'm your logistics assistant. How can I help you today?",
  position = "bottom-right",
  theme = "blue",
}: AIChatbotProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content: initialMessage,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined responses for demo purposes
  const predefinedResponses: Record<string, string> = {
    hello: "Hello! How can I assist with your logistics needs today?",
    pricing:
      "Our pricing is based on distance, weight, and dimensions. Would you like me to help calculate a quote for you?",
    tracking:
      "You can track your shipment by entering your tracking number. Would you like me to look up a shipment for you?",
    help: "I can help with pricing estimates, shipment tracking, finding available truckers, and answering questions about our services. What do you need assistance with?",
    thanks: "You're welcome! Is there anything else I can help you with?",
    bye: "Thank you for using our service. Have a great day!",
  };

  // Suggested questions
  const suggestedQuestions = [
    "How do I calculate shipping costs?",
    "Where can I track my shipment?",
    "What truck types are available?",
    "How do I post a new load?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateResponse(inputValue.toLowerCase());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    // Check for keywords in predefined responses
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (input.includes(keyword)) {
        return response;
      }
    }

    // Default response if no keywords match
    return "I understand you're asking about logistics. Could you provide more details so I can better assist you?";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setIsMinimized(false);
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    // Focus the textarea
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "orange":
        return "bg-orange-600 hover:bg-orange-700 text-white";
      case "green":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "dark":
        return "bg-gray-800 hover:bg-gray-900 text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  // If using Dialog for expanded view
  if (isExpanded) {
    return (
      <Dialog open={isExpanded} onOpenChange={toggleExpanded}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-blue-500" />
              Logistics AI Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar
                    className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}
                  >
                    {message.sender === "user" ? (
                      <>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                        <AvatarFallback>U</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
                        <AvatarFallback>AI</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] flex-row">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                    <div className="flex items-center space-x-1">
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                      <div
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "600ms" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <DialogFooter className="flex-shrink-0 p-4 pt-0">
            <div className="w-full space-y-2">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
              <div className="flex w-full">
                <Textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="min-h-[60px] flex-1 resize-none rounded-r-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-l-none"
                  disabled={inputValue.trim() === ""}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Floating chatbot UI
  return isOpen ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed ${getPositionClasses()} z-50`}
    >
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2"
          >
            <Card className="w-80 shadow-lg border-blue-200 bg-white">
              <CardContent className="p-0">
                <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-xl">
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-blue-700 rounded-full"
                      onClick={toggleExpanded}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-blue-700 rounded-full"
                      onClick={toggleMinimized}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-blue-700 rounded-full"
                      onClick={onClose}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="h-64 overflow-y-auto p-3 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <Avatar
                          className={`h-6 w-6 ${message.sender === "user" ? "ml-1.5" : "mr-1.5"}`}
                        >
                          {message.sender === "user" ? (
                            <>
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                              <AvatarFallback>U</AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
                              <AvatarFallback>AI</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-2 text-sm ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] flex-row">
                        <Avatar className="h-6 w-6 mr-1.5">
                          <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-2 bg-gray-100 text-gray-800">
                          <div className="flex items-center space-x-1">
                            <div
                              className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <div
                              className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                            <div
                              className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "600ms" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t">
                  <div className="flex">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 rounded-r-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="rounded-l-none"
                      disabled={inputValue.trim() === ""}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMinimized}
        className={`rounded-full p-3 shadow-lg ${getThemeClasses()}`}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </motion.div>
  ) : null;
};

export default AIChatbot;
