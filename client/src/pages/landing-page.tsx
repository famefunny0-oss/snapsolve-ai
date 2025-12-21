import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Zap, BookOpen, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";
import logoPath from "@assets/9569bd71-d15d-4c6e-9718-c912f5bc9e2d_1766322178971.png";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const features = [
    { icon: Lightbulb, label: "Smart Explanations" },
    { icon: Zap, label: "Step-by-Step" },
    { icon: CheckCircle2, label: "Instant Results" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <img src={logoPath} alt="SnapSolve AI" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-gray-900">SnapSolve AI</h1>
          </motion.div>
        </div>
      </header>

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center pt-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-green-700">AI-Powered Homework Helper</span>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Homework just got{" "}
                <span className="text-blue-600">easier.</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                SnapSolve understands your questions and explains the solution step-by-step, just like a tutor. Perfect for Class 3 to 12.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 group"
                onClick={() => setLocation("/auth")}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 text-center">
                    <div className="text-gray-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="font-medium text-sm text-gray-700">{feature.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Section - Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative flex justify-center lg:justify-end"
          >
            <Card className="w-full max-w-sm bg-white shadow-2xl border-0 p-6">
              <div className="space-y-6">
                {/* Problem Header */}
                <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1.5 flex-shrink-0 pt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Math Problem</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">Class 8 • Algebra</p>
                  </div>
                </div>

                {/* Problem Statement */}
                <div>
                  <p className="text-gray-700 font-medium">Solve for x: 2x + 5 = 15</p>
                </div>

                {/* Solution Steps */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Subtract 5 from both sides</p>
                      <p className="text-sm text-gray-600 mt-1">2x = 15 - 5</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Simplify the right side</p>
                      <p className="text-sm text-gray-600 mt-1">2x = 10</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Divide both sides by 2</p>
                      <p className="text-sm text-gray-600 mt-1">x = 5</p>
                    </div>
                  </div>
                </div>

                {/* Final Answer */}
                <div className="border-t border-gray-200 pt-4 bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Final Answer</p>
                  <p className="text-2xl font-bold text-blue-600">x = 5</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
