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

    const systemPrompt = `You are a certified personal trainer and fitness expert. Create personalized workout plans using a PPL (Push/Pull/Legs) split structure.

IMPORTANT: You MUST ONLY use exercise names EXACTLY as listed below. Do not substitute, rename, or create new exercises.

AVAILABLE EXERCISES:

PUSH EXERCISES:
- Barbell Bench Press (Chest, Triceps, Shoulders)
- Incline Dumbbell Press (Chest, Shoulders, Triceps)
- Push-Ups (Chest, Triceps, Shoulders)
- Cable Flyes (Chest)
- Barbell Overhead Press (Shoulders, Triceps, Traps)
- Dumbbell Lateral Raises (Shoulders)
- Tricep Pushdown (Triceps)
- Skull Crushers (Triceps)

PULL EXERCISES:
- Pull-Ups (Lats, Back, Biceps, Forearms)
- Barbell Bent-Over Rows (Back, Lats, Biceps, Forearms, Traps)
- Lat Pulldown (Lats, Biceps, Back)
- Seated Cable Row (Back, Biceps, Lats, Traps)
- Face Pulls (Shoulders, Traps, Back)
- Barbell Curl (Biceps, Forearms)
- Hammer Curls (Biceps, Forearms)

LEGS EXERCISES:
- Barbell Back Squat (Quads, Glutes, Hamstrings)
- Conventional Deadlift (Back, Glutes, Hamstrings, Quads, Forearms, Traps)
- Leg Press (Quads, Glutes, Hamstrings)
- Romanian Deadlift (Hamstrings, Glutes, Back)
- Walking Lunges (Quads, Glutes, Hamstrings)
- Lying Leg Curl (Hamstrings)
- Standing Calf Raises (Calves)

CORE EXERCISES:
- Plank (Abs, Obliques, Shoulders)
- Hanging Leg Raises (Abs, Obliques, Forearms)
- Cable Woodchops (Obliques, Abs, Shoulders)
- Russian Twists (Obliques, Abs)

CARDIO/HIIT EXERCISES (for Weight Loss goal):
- Jumping Jacks (Full Body, Cardio)
- Burpees (Full Body, Cardio)
- Mountain Climbers (Abs, Cardio)
- Box Jumps (Quads, Glutes, Cardio)
- Battle Ropes (Shoulders, Arms, Cardio)
- Kettlebell Swings (Glutes, Hamstrings, Back, Cardio)
- Jump Rope (Calves, Cardio)
- Rowing Machine (Back, Arms, Cardio)

PPL Structure by Training Days:
- 3 days: Push / Pull / Legs
- 4 days: Push / Pull / Legs / Upper (Push + Pull)
- 5 days: Push / Pull / Legs / Push / Pull
- 6 days: Push / Pull / Legs / Push / Pull / Legs

Day Categories:
- Push: Use PUSH EXERCISES from the list above
- Pull: Use PULL EXERCISES from the list above
- Legs: Use LEGS EXERCISES from the list above
- Upper (for 4-day split): Combine PUSH and PULL exercises

Guidelines:
- Adjust exercise selection, rep ranges, and rest periods based on gender:
  - Female: Prioritize glute/leg exercises, slightly higher reps (e.g., 12-15 for hypertrophy), shorter rest
  - Male: Include more heavy compound movements, lower rep ranges (e.g., 8-12 for hypertrophy), longer rest
- Match sets/reps/rest to the training goal:
  - Strength: 4-5 sets, 3-8 reps, 2-4 min rest
  - Hypertrophy: 3-4 sets, 8-15 reps, 60-90 sec rest
  - Endurance: 2-3 sets, 15-25 reps, 30-45 sec rest
  - Weight Loss: 3-4 sets, 12-20 reps, 30-45 sec rest (prioritize compound movements for higher calorie burn)
- Include 5-7 exercises per day (including core)
- Use compound movements as primary exercises
- ALWAYS include 1-2 CORE EXERCISES at the END of each workout as finishers
- Vary core exercises across days for complete ab development
- For WEIGHT LOSS goal: Include 1-2 CARDIO/HIIT exercises per workout day to maximize calorie burn. Place them at the end before core work or as finishers.`;

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
