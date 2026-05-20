"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Bot, User, Sparkles,
  Droplets, Truck, CreditCard, Package, Clock, MapPin
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickReplies = [
  { icon: <Droplets className="w-4 h-4" />, text: "Water prices" },
  { icon: <Truck className="w-4 h-4" />, text: "Delivery areas" },
  { icon: <Clock className="w-4 h-4" />, text: "Delivery hours" },
  { icon: <CreditCard className="w-4 h-4" />, text: "Payment methods" },
  { icon: <Package className="w-4 h-4" />, text: "Track my order" },
  { icon: <MapPin className="w-4 h-4" />, text: "My address" },
];

const botResponses: Record<string, string> = {
  "water prices": `Our water prices are:
• 20L Bottled Water: KSh 350 (KSh 500 deposit)
• 10L Bottled Water: KSh 200 (KSh 300 deposit)
• Water Refill (20L): KSh 150
• Water Refill (10L): KSh 100
• Bulk Tanker (5000L): KSh 8,000
• Bulk Tanker (10000L): KSh 15,000
• Dispenser Rental: KSh 1,500/month (KSh 3,000 deposit)

Subscribe and save up to 20%!`,
  "delivery areas": `We currently deliver to these areas in Nairobi and Kiambu:
• Nairobi CBD, Ngara, Eastleigh
• Westlands, Parklands, Riverside
• Karen, Langata, South C
• Buruburu, Umoja, Kayole, Embakasi
• Industrial Area, Mombasa Road, Syokimau
• Ridgeways, Runda, Kiambu Town, Thika Road

Delivery fees range from KSh 50 to KSh 120 depending on your zone.`,
  "delivery hours": `Our delivery hours are:
• Monday - Saturday: 7:00 AM - 8:00 PM
• Sunday: 9:00 AM - 5:00 PM (subscription customers only)

Emergency same-day delivery: Available until 6:00 PM
Standard delivery: Same day (2-5 hours)
Scheduled delivery: Choose your preferred date and time slot`,
  "payment methods": `We accept the following payment methods:
• M-Pesa (STK Push to your phone)
• Airtel Money
• Credit/Debit Cards (Visa, Mastercard)
• Cash on Delivery

All payments are secure with 256-bit SSL encryption.`,
  "track my order": `To track your order, please go to the Orders section and click "Track Order" on your active delivery.

You can also track by:
• Order number (e.g., PA-24-7891)
• Phone number used for ordering

Would you like me to help you find your order number?`,
  "my address": `You can manage your addresses in the "My Addresses" section of your profile.

To add a new address:
1. Go to Profile → My Addresses
2. Click the + button
3. Enter your details
4. Save

You can set one address as default for faster checkout.`,
};

const defaultResponses = [
  "I'm here to help! You can ask me about water prices, delivery areas, delivery hours, payment methods, or tracking your order.",
  "I can help you with that. Could you please provide more details about your question?",
  "For the most accurate information, I recommend checking the app or contacting our support team at support@priorityaqua.co.ke",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm AquaBot, your virtual assistant. How can I help you today? 💧",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMsg.includes(key) || key.includes(lowerMsg)) {
        return response;
      }
    }

    // Check for keywords
    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
      return botResponses["water prices"];
    }
    if (lowerMsg.includes("deliver") || lowerMsg.includes("area") || lowerMsg.includes("location")) {
      return botResponses["delivery areas"];
    }
    if (lowerMsg.includes("hour") || lowerMsg.includes("time") || lowerMsg.includes("when")) {
      return botResponses["delivery hours"];
    }
    if (lowerMsg.includes("pay") || lowerMsg.includes("mpesa") || lowerMsg.includes("money")) {
      return botResponses["payment methods"];
    }
    if (lowerMsg.includes("track") || lowerMsg.includes("where") || lowerMsg.includes("status")) {
      return botResponses["track my order"];
    }
    if (lowerMsg.includes("address") || lowerMsg.includes("location")) {
      return botResponses["my address"];
    }
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      return "Hello! Welcome to Priority Aqua. I'm here to help with any questions about our water delivery service. What would you like to know?";
    }
    if (lowerMsg.includes("thank")) {
      return "You're welcome! I'm glad I could help. If you need anything else, feel free to ask. Have a refreshing day! 💧";
    }
    if (lowerMsg.includes("bye") || lowerMsg.includes("goodbye")) {
      return "Goodbye! Stay hydrated and have a wonderful day. Remember, we're just a tap away when you need water! 👋";
    }

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        role: "assistant",
        content: getBotResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-aqua-500 to-ocean-600 text-white shadow-lg shadow-aqua-500/30 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-aqua-500 to-ocean-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">AquaBot</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-aqua-100">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-aqua-100 dark:bg-aqua-900/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-aqua-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-aqua-500 text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className="text-[10px] opacity-60 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-ocean-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-aqua-100 dark:bg-aqua-900/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-aqua-600" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply.text)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs whitespace-nowrap hover:bg-aqua-100 dark:hover:bg-aqua-900/20 hover:text-aqua-600 transition-colors"
                  >
                    {reply.icon}
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:ring-2 focus:ring-aqua-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-12 h-12 rounded-xl bg-aqua-500 text-white flex items-center justify-center hover:bg-aqua-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
