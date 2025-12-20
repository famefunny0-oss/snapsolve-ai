import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { NavBar } from "@/components/nav-bar";
import { SubjectCard } from "@/components/subject-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  Calculator, 
  FlaskConical, 
  Atom, 
  Dna, 
  Globe2, 
  BookType, 
  ArrowRight,
  School
} from "lucide-react";

const subjects = [
  { id: "math", name: "Mathematics", icon: Calculator, color: "blue-500", code: "#3b82f6" },
  { id: "physics", name: "Physics", icon: Atom, color: "purple-500", code: "#a855f7" },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, color: "emerald-500", code: "#10b981" },
  { id: "biology", name: "Biology", icon: Dna, color: "rose-500", code: "#f43f5e" },
  { id: "english", name: "English", icon: BookType, color: "amber-500", code: "#f59e0b" },
  { id: "social", name: "Social Science", icon: Globe2, color: "cyan-500", code: "#06b6d4" },
];

const classes = Array.from({ length: 10 }, (_, i) => (i + 3).toString());

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("10");

  if (isLoading) return null;

  const handleStart = () => {
    if (selectedSubject && selectedClass) {
      setLocation(`/solve?subject=${selectedSubject}&class=${selectedClass}`);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            What do you want to learn today?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Select a subject and your class to get started.
          </motion.p>
        </div>

        {/* Class Selection */}
        <div className="max-w-xs mx-auto mb-12 bg-white p-4 rounded-2xl shadow-sm border border-border">
          <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">
            <School className="inline w-4 h-4 mr-1" /> Class Level
          </label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full h-12 text-lg rounded-xl border-2">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c} value={c}>Class {c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subjects Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-12"
        >
          {subjects.map((subject) => (
            <motion.div variants={item} key={subject.id}>
              <SubjectCard
                {...subject}
                color={subject.code}
                isSelected={selectedSubject === subject.id}
                onClick={() => setSelectedSubject(subject.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button 
            size="lg" 
            className="text-lg px-12 py-8 rounded-full shadow-2xl shadow-primary/30 transition-all hover:scale-105"
            disabled={!selectedSubject}
            onClick={handleStart}
          >
            Start Solving
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
