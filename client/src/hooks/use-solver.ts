import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

type SolveInput = z.infer<typeof api.solver.solve.input>;

export function useSolver() {
  return useMutation({
    mutationFn: async (data: SolveInput) => {
      const res = await fetch(api.solver.solve.path, {
        method: api.solver.solve.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to solve problem");
      }
      
      return await res.json(); // Returns { solution: string }
    },
  });
}
