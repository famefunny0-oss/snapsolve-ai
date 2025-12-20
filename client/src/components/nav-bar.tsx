import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";

export function NavBar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  if (!user) return null;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-border/40 sticky top-0 z-50 backdrop-blur-md bg-white/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Snap<span className="text-primary">Solve</span> AI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {user.isGuest ? "Guest Student" : user.username}
            </span>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => logout()}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
