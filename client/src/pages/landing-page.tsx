import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Zap, BookOpen, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const features = [
    { icon: Lightbulb, label: "Smart Explanations", description: "AI-powered step-by-step solutions" },
    { icon: Zap, label: "Step-by-Step", description: "Learn the concepts behind each step" },
    { icon: CheckCircle2, label: "Instant Results", description: "Get answers in seconds" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">SnapSolve AI</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
              >
                Homework just got easier.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                SnapSolve AI helps you understand homework step by step. Get instant explanations, work through problems like your teacher would, and master any subject.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-xl font-semibold group"
                onClick={() => setLocation("/auth")}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={idx} variants={itemVariants} className="space-y-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{feature.label}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Section - Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Floating Background Elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>

            <Card className="relative z-10 p-8 shadow-xl border-0 bg-card">
              <div className="space-y-6">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Example Problem</p>
                  <p className="text-lg font-semibold text-foreground">
                    If 2x + 5 = 17, what is x?
                  </p>
                </div>

                <div className="space-y-4 border-t border-border pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">Isolate the variable term</p>
                        <p className="text-sm text-muted-foreground mt-1">Subtract 5 from both sides: 2x = 17 - 5</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">Simplify</p>
                        <p className="text-sm text-muted-foreground mt-1">2x = 12</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">Solve for x</p>
                        <p className="text-sm text-muted-foreground mt-1">Divide both sides by 2: x = 6</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6 bg-primary/5 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Final Answer</p>
                  <p className="text-2xl font-bold text-primary">x = 6</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <div className="border-t border-border mt-20">
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>SnapSolve AI • Making homework easier for students everywhere</p>
        </footer>
      </div>
    </div>
  );
}
