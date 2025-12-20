import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { NavBar } from "@/components/nav-bar";
import { useSolver } from "@/hooks/use-solver";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SolverPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const solveMutation = useSolver();
  
  // Parse query params manually since wouter's useSearch is minimal
  const searchParams = new URLSearchParams(window.location.search);
  const subject = searchParams.get("subject") || "General";
  const classLevel = searchParams.get("class") || "10";

  const [question, setQuestion] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "File too large", description: "Please upload an image under 5MB.", variant: "destructive" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = () => {
    if (!question.trim() && !image) {
      toast({ title: "Empty Input", description: "Please enter a question or upload an image.", variant: "destructive" });
      return;
    }

    setSolution(null); // Clear previous solution
    solveMutation.mutate(
      { 
        content: question, 
        image: image || undefined, 
        subject, 
        classLevel 
      },
      {
        onSuccess: (data) => {
          setSolution(data.solution);
        },
        onError: (error) => {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 lg:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/home")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold">Problem Solver</h1>
            <p className="text-muted-foreground text-sm">
              {subject} • Class {classLevel}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-6 flex-1 min-h-0">
          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1 p-4 border-none shadow-lg shadow-black/5 flex flex-col gap-4 bg-white/80 backdrop-blur-sm">
              <Textarea 
                placeholder={`Type your ${subject} question here...`}
                className="flex-1 min-h-[200px] resize-none border-0 focus-visible:ring-0 bg-transparent text-lg p-4 placeholder:text-muted-foreground/50"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              
              {/* Image Preview */}
              <AnimatePresence>
                {image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative rounded-xl overflow-hidden bg-slate-100 border border-border h-48 w-full group"
                  >
                    <img src={image} alt="Upload preview" className="w-full h-full object-contain" />
                    <button 
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-xl shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </Button>
                
                <div className="flex-1" />
                
                <Button 
                  onClick={handleSolve} 
                  disabled={solveMutation.isPending}
                  className="rounded-xl px-6 gap-2"
                >
                  {solveMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      Solve Step-by-Step
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Solution Section */}
          <Card className="flex-1 border-none shadow-lg shadow-black/5 bg-white overflow-hidden flex flex-col h-[500px] lg:h-auto">
            <ScrollArea className="h-full w-full p-6">
              {!solution && !solveMutation.isPending && (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4 p-8 text-center opacity-50">
                  <div className="bg-secondary p-6 rounded-full">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-lg font-medium">Ready to solve!</p>
                  <p className="max-w-xs text-sm">Type your question or upload an image of your homework.</p>
                </div>
              )}

              {solveMutation.isPending && (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-muted-foreground animate-pulse">Analyzing problem...</p>
                </div>
              )}

              {solution && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-blue max-w-none prose-headings:font-display prose-p:text-slate-600 prose-li:text-slate-600"
                >
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Solution Generated
                  </div>
                  
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {solution}
                  </ReactMarkdown>
                </motion.div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </main>
    </div>
  );
}
