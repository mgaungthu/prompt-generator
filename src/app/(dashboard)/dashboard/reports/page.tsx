"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function ReportsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPrompts() {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setPrompts(data);
      }
    }
    fetchPrompts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Prompts</h1>
      {prompts.length === 0 ? (
        <p className="text-black">No prompts found.</p>
      ) : (
        <ul className="space-y-4">
          {prompts.map((prompt) => (
            <li key={prompt.id} className="border-b pb-2">
              <div className="text-black">
                <span className="font-semibold">Type:</span> {prompt.type}
              </div>
              <div className="text-black">
                <span className="font-semibold">Input:</span>{" "}
                {prompt.input_image_url ? (
                  <img
                    src={prompt.input_image_url}
                    alt="Prompt input"
                    className="w-32 h-32 object-cover mt-2"
                  />
                ) : (
                  prompt.input_text
                )}
              </div>
              <div className="text-black">
                <span className="font-semibold">Generated Prompt:</span> {prompt.generated_prompt}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}