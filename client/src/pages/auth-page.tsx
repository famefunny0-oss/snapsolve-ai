import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BookOpen, Calculator, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import logoPath from "@assets/9569bd71-d15d-4c6e-9718-c912f5bc9e2d_1766322178971.png";

export default function AuthPage() {
  const { login, register, isPending } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  const formSchema = insertUserSchema;

  const loginForm = useForm<InsertUser>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary via-primary/90 to-accent text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        {/* Floating Icons Animation */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-20 bg-white/20 p-4 rounded-2xl backdrop-blur-sm"
        >
          <Calculator className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-20 bg-white/20 p-4 rounded-2xl backdrop-blur-sm"
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>

        <div className="max-w-md text-center z-10">
          <div className="mb-6 flex justify-center">
            <img src={logoPath} alt="SnapSolve AI" className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-6">SnapSolve AI</h1>
          <p className="text-xl text-blue-50 leading-relaxed font-light">
            Your personal AI homework assistant. Get step-by-step solutions for Math, Science, and more.
          </p>
        </div>
      </div>

      {/* Right Panel - Forms */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between lg:hidden mb-8">
             <h1 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
               <img src={logoPath} alt="SnapSolve AI" className="w-6 h-6" /> SnapSolve AI
             </h1>
             <button
               onClick={() => setLocation("/")}
               className="text-muted-foreground hover:text-foreground transition-colors"
               aria-label="Back to home"
             >
               <ArrowLeft className="w-5 h-5" />
             </button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg text-base">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg text-base">Sign Up</TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="login">
                <Card className="border-none shadow-xl shadow-black/5 rounded-3xl">
                  <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit((d) => login(d))} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="student123" {...field} className="h-11 rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} className="h-11 rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full h-11" disabled={isPending}>
                          {isPending ? "Logging in..." : "Login"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card className="border-none shadow-xl shadow-black/5 rounded-3xl">
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Start your learning journey today.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit((d) => register(d))} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Choose Username</FormLabel>
                              <FormControl>
                                <Input placeholder="cool_student" {...field} className="h-11 rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Choose Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} className="h-11 rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full h-11" disabled={isPending}>
                          {isPending ? "Creating Account..." : "Sign Up"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>

          <button
            onClick={() => setLocation("/")}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
