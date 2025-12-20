import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import OpenAI from "openai";
import passport from "passport";

// Initialize OpenAI with Replit AI Integrations env vars
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "dummy",
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || "https://api.openai.com/v1",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const { hashPassword } = setupAuth(app);

  // Auth Routes
  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Login failed" });
      req.login(user, (err) => {
        if (err) return next(err);
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const { username, password } = req.body;
      if (await storage.getUserByUsername(username)) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({ username, password: hashedPassword, isGuest: false });
      req.login(user, (err) => {
        if (err) throw err;
        res.status(201).json(user);
      });
    } catch (err) {
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post(api.auth.guest.path, async (req, res) => {
    try {
      const username = `guest_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const user = await storage.createUser({ 
        username, 
        password: "", // No password for guest
        isGuest: true 
      });
      req.login(user, (err) => {
        if (err) throw err;
        res.json(user);
      });
    } catch (err) {
      res.status(500).json({ message: "Guest login failed" });
    }
  });

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    res.json(req.user || null);
  });

  // Solver Route
  app.post(api.solver.solve.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const { content, image, subject, classLevel } = req.body;
      
      const prompt = `
      You are SnapSolve AI, a homework helper for students (Class 3-12).
      Subject: ${subject}
      Class: ${classLevel}
      
      Rules:
      - Solve ONLY what is asked.
      - Explain step-by-step in simple words appropriate for Class ${classLevel}.
      - Use relevant rules/formulas.
      - No placeholder answers.
      - No motivational fluff.
      
      Format:
      Your Question: <repeat question>
      Step-by-Step Solution:
      1) ...
      2) ...
      Final Answer: <answer>
      `;

      const messages: any[] = [
        { role: "system", content: prompt },
        { 
          role: "user", 
          content: [
            { type: "text", text: content || "Solve this." },
            ...(image ? [{ type: "image_url", image_url: { url: image } }] : [])
          ]
        }
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-5", // Use gpt-5 as recommended by blueprint
        messages,
      });

      const solution = response.choices[0].message.content || "Could not generate solution.";
      
      // Save to history (optional for now)
      await storage.createQuestion({
        userId: (req.user as any).id,
        content: content || "Image Question",
        imageUrl: image ? "Image uploaded" : null,
        subject,
        classLevel,
        solution,
      });

      res.json({ solution });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to solve" });
    }
  });

  return httpServer;
}
