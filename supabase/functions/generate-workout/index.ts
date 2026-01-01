import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { splitDays, gender, goal, targetMuscles } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a certified personal trainer and fitness expert. Create personalized workout plans based on user preferences.

Guidelines:
- Create workout splits appropriate for the number of training days
- Adjust exercise selection, rep ranges, and rest periods based on gender:
  - Female: Prioritize glute/leg exercises, slightly higher reps (e.g., 12-15 for hypertrophy), shorter rest
  - Male: Include more heavy compound movements, lower rep ranges (e.g., 8-12 for hypertrophy), longer rest
- Match sets/reps/rest to the training goal:
  - Strength: 4-5 sets, 3-8 reps, 2-4 min rest
  - Hypertrophy: 3-4 sets, 8-15 reps, 60-90 sec rest
  - Endurance: 2-3 sets, 15-25 reps, 30-45 sec rest
- Include 4-6 exercises per day
- Use compound movements as primary exercises
- Balance push/pull/legs appropriately across the week`;

    const userPrompt = `Create a ${splitDays}-day workout program for a ${gender || 'unspecified gender'} trainee.
Training goal: ${goal}
${targetMuscles.length > 0 ? `Focus on these muscle groups: ${targetMuscles.join(', ')}` : 'Full body program - hit all muscle groups'}

Return a complete workout schedule with specific exercises, sets, reps, and rest periods for each day.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_workout_plan",
              description: "Generate a structured workout plan with daily exercises",
              parameters: {
                type: "object",
                properties: {
                  schedule: {
                    type: "array",
                    description: "Array of workout days",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "string", description: "Day label, e.g., 'Day 1'" },
                        focus: { type: "string", description: "Muscle groups or workout focus for this day" },
                        exercises: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: { type: "string", description: "Exercise name" },
                              sets: { type: "number", description: "Number of sets" },
                              reps: { type: "string", description: "Rep range, e.g., '8-12'" },
                              rest: { type: "string", description: "Rest period, e.g., '60-90 sec'" }
                            },
                            required: ["name", "sets", "reps", "rest"],
                            additionalProperties: false
                          }
                        }
                      },
                      required: ["day", "focus", "exercises"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["schedule"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_workout_plan" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data));

    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "generate_workout_plan") {
      throw new Error("Invalid AI response format");
    }

    const workoutPlan = JSON.parse(toolCall.function.arguments);
    
    return new Response(JSON.stringify(workoutPlan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating workout:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
