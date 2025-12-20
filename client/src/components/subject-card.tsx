import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SubjectCard({ id, name, icon: Icon, color, isSelected, onClick }: SubjectCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300
        flex flex-col items-center justify-center gap-4 min-h-[160px]
        ${isSelected 
          ? `border-${color} bg-${color}/5 shadow-lg shadow-${color}/10 ring-2 ring-${color} ring-offset-2` 
          : "border-border bg-card hover:border-primary/30 hover:shadow-md"
        }
      `}
      style={{
        borderColor: isSelected ? `var(--${color})` : undefined,
      }}
    >
      <div 
        className={`p-4 rounded-full transition-colors duration-300 ${
          isSelected ? `bg-${color} text-white` : `bg-${color}/10 text-${color}`
        }`}
        style={{
          backgroundColor: isSelected ? color : undefined, // Fallback if tailwind class dynamic not working
          color: !isSelected ? color : undefined
        }}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-display font-bold text-lg text-center text-foreground">{name}</h3>
      
      {isSelected && (
        <motion.div 
          layoutId="checkmark"
          className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
