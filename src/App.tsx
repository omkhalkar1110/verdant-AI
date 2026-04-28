/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import AIAssistant from "./pages/AIAssistant";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans selection:bg-accent/30">
        <AnimatePresence mode="wait">
          {isAuthenticated ? (
            <div className="flex flex-col min-h-screen">
              <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
              <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/ai-coach" element={<AIAssistant />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
              <footer className="py-8 border-t border-forest/10 dark:border-white/10 text-center opacity-50 text-sm">
                <p>© 2026 Verdant Luxury Eco-Tech. Data Verified by BEE India & CarbonTrust.</p>
              </footer>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
