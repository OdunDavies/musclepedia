import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { muscleGroups, MuscleGroup, exercises } from '@/data/exercises';
import { Loader2, Download, Dumbbell, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    rest: string;
  }[];
}

interface GeneratedPlan {
  splitDays: number;
  goal: string;
  gender: string;
  targetMuscles: string[];
  schedule: WorkoutDay[];
}

export function WorkoutGenerator() {
  const [splitDays, setSplitDays] = useState<string>('4');
  const [gender, setGender] = useState<string>('');
  const [goal, setGoal] = useState<string>('strength');
  const [targetMuscles, setTargetMuscles] = useState<MuscleGroup[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);

  const toggleMuscle = (muscle: MuscleGroup) => {
    setTargetMuscles((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    );
  };

  const generateWorkoutPlan = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with intelligent workout split creation
    setTimeout(() => {
      const days = parseInt(splitDays);
      const schedule: WorkoutDay[] = [];
      
      // Get exercises based on target muscles or all if none selected
      const relevantExercises = targetMuscles.length > 0 
        ? exercises.filter(e => 
            e.primaryMuscles.some(m => targetMuscles.includes(m)) ||
            e.secondaryMuscles.some(m => targetMuscles.includes(m))
          )
        : exercises;

      // Define workout splits based on days
      const splitTemplates: Record<number, { day: string; focus: string; categories: string[] }[]> = {
        3: [
          { day: 'Day 1', focus: 'Push (Chest, Shoulders, Triceps)', categories: ['push'] },
          { day: 'Day 2', focus: 'Pull (Back, Biceps)', categories: ['pull'] },
          { day: 'Day 3', focus: 'Legs & Core', categories: ['legs', 'core'] },
        ],
        4: [
          { day: 'Day 1', focus: 'Upper Body Push', categories: ['push'] },
          { day: 'Day 2', focus: 'Lower Body', categories: ['legs'] },
          { day: 'Day 3', focus: 'Upper Body Pull', categories: ['pull'] },
          { day: 'Day 4', focus: 'Legs & Core', categories: ['legs', 'core'] },
        ],
        5: [
          { day: 'Day 1', focus: 'Chest & Triceps', categories: ['push'] },
          { day: 'Day 2', focus: 'Back & Biceps', categories: ['pull'] },
          { day: 'Day 3', focus: 'Legs', categories: ['legs'] },
          { day: 'Day 4', focus: 'Shoulders & Arms', categories: ['push', 'pull'] },
          { day: 'Day 5', focus: 'Full Body & Core', categories: ['compound', 'core'] },
        ],
        6: [
          { day: 'Day 1', focus: 'Push (Chest Focus)', categories: ['push'] },
          { day: 'Day 2', focus: 'Pull (Back Focus)', categories: ['pull'] },
          { day: 'Day 3', focus: 'Legs (Quad Focus)', categories: ['legs'] },
          { day: 'Day 4', focus: 'Push (Shoulder Focus)', categories: ['push'] },
          { day: 'Day 5', focus: 'Pull (Lat Focus)', categories: ['pull'] },
          { day: 'Day 6', focus: 'Legs (Posterior) & Core', categories: ['legs', 'core'] },
        ],
      };

      const template = splitTemplates[days] || splitTemplates[4];
      
      // Rep and set schemes based on goal and gender
      // Female workouts typically use slightly higher reps and shorter rest for toning
      // Male workouts focus on heavier loads with lower reps
      const isFemale = gender === 'female';
      
      const schemes = {
        strength: { 
          sets: isFemale ? 4 : 5, 
          reps: isFemale ? '5-8' : '3-5', 
          rest: isFemale ? '2-3 min' : '3-4 min' 
        },
        hypertrophy: { 
          sets: isFemale ? 3 : 4, 
          reps: isFemale ? '12-15' : '8-12', 
          rest: isFemale ? '45-60 sec' : '60-90 sec' 
        },
        endurance: { 
          sets: isFemale ? 3 : 3, 
          reps: isFemale ? '18-25' : '15-20', 
          rest: isFemale ? '20-30 sec' : '30-45 sec' 
        },
      };
      
      const scheme = schemes[goal as keyof typeof schemes] || schemes.hypertrophy;
      
      // Exercise preferences by gender (prioritize certain exercises)
      const femalePreferredExercises = [
        'Hip Thrust', 'Romanian Deadlift', 'Lunges', 'Glute Bridge', 
        'Cable Kickbacks', 'Leg Press', 'Lat Pulldown', 'Dumbbell Row'
      ];
      
      const malePreferredExercises = [
        'Bench Press', 'Barbell Squat', 'Deadlift', 'Overhead Press',
        'Barbell Row', 'Pull-ups', 'Dips', 'Barbell Curl'
      ];

      template.forEach((dayTemplate) => {
        const preferredExercises = isFemale ? femalePreferredExercises : malePreferredExercises;
        
        // Sort exercises to prioritize gender-preferred ones
        const sortedExercises = [...relevantExercises]
          .filter((e) => dayTemplate.categories.includes(e.category))
          .sort((a, b) => {
            const aPreferred = preferredExercises.some(pe => a.name.includes(pe)) ? -1 : 0;
            const bPreferred = preferredExercises.some(pe => b.name.includes(pe)) ? -1 : 0;
            return aPreferred - bPreferred;
          });
        
        const dayExercises = sortedExercises
          .slice(0, 5)
          .map((e) => ({
            name: e.name,
            sets: scheme.sets,
            reps: scheme.reps,
            rest: scheme.rest,
          }));

        // Add at least some exercises if category filter was too restrictive
        if (dayExercises.length < 3) {
          const additionalExercises = exercises
            .filter((e) => dayTemplate.categories.includes(e.category))
            .slice(0, 5 - dayExercises.length)
            .map((e) => ({
              name: e.name,
              sets: scheme.sets,
              reps: scheme.reps,
              rest: scheme.rest,
            }));
          dayExercises.push(...additionalExercises);
        }

        schedule.push({
          day: dayTemplate.day,
          focus: dayTemplate.focus,
          exercises: dayExercises,
        });
      });

      setGeneratedPlan({
        splitDays: days,
        goal,
        gender: gender || 'Not specified',
        targetMuscles: targetMuscles.length > 0 ? targetMuscles : ['All muscle groups'],
        schedule,
      });
      setIsGenerating(false);
    }, 1500);
  };

  const downloadPlan = () => {
    if (!generatedPlan) return;

    let content = `WORKOUT PLAN\n`;
    content += `${'='.repeat(50)}\n\n`;
    content += `Split: ${generatedPlan.splitDays}-Day Program\n`;
    content += `Gender: ${generatedPlan.gender.charAt(0).toUpperCase() + generatedPlan.gender.slice(1)}\n`;
    content += `Goal: ${generatedPlan.goal.charAt(0).toUpperCase() + generatedPlan.goal.slice(1)}\n`;
    content += `Target Muscles: ${generatedPlan.targetMuscles.join(', ')}\n\n`;
    content += `${'='.repeat(50)}\n\n`;

    generatedPlan.schedule.forEach((day) => {
      content += `${day.day}: ${day.focus}\n`;
      content += `${'-'.repeat(40)}\n`;
      day.exercises.forEach((exercise, index) => {
        content += `${index + 1}. ${exercise.name}\n`;
        content += `   Sets: ${exercise.sets} | Reps: ${exercise.reps} | Rest: ${exercise.rest}\n`;
      });
      content += `\n`;
    });

    content += `\n${'='.repeat(50)}\n`;
    content += `Generated by Workout Planner\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workout-plan-${generatedPlan.splitDays}day-${generatedPlan.goal}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const groupedMuscles = muscleGroups.reduce(
    (acc, muscle) => {
      if (!acc[muscle.category]) {
        acc[muscle.category] = [];
      }
      acc[muscle.category].push(muscle);
      return acc;
    },
    {} as Record<string, typeof muscleGroups>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Generate Your Workout Plan
          </CardTitle>
          <CardDescription>
            Customize your preferences and let AI create a personalized workout split
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Split Days Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              How many days per week?
            </Label>
            <RadioGroup
              value={splitDays}
              onValueChange={setSplitDays}
              className="flex flex-wrap gap-3"
            >
              {['3', '4', '5', '6'].map((days) => (
                <div key={days} className="flex items-center space-x-2">
                  <RadioGroupItem value={days} id={`days-${days}`} />
                  <Label htmlFor={`days-${days}`} className="cursor-pointer">
                    {days} Days
                  </Label>
                </div>
              ))}
          </RadioGroup>
          </div>

          {/* Gender Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex flex-wrap gap-3"
            >
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ].map((g) => (
                <div key={g.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={g.value} id={`gender-${g.value}`} />
                  <Label htmlFor={`gender-${g.value}`} className="cursor-pointer">
                    {g.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Goal Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Training Goal</Label>
            <RadioGroup
              value={goal}
              onValueChange={setGoal}
              className="flex flex-wrap gap-3"
            >
              {[
                { value: 'strength', label: 'Strength (Low reps, heavy weight)' },
                { value: 'hypertrophy', label: 'Muscle Growth (Moderate reps)' },
                { value: 'endurance', label: 'Endurance (High reps)' },
              ].map((g) => (
                <div key={g.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={g.value} id={`goal-${g.value}`} />
                  <Label htmlFor={`goal-${g.value}`} className="cursor-pointer">
                    {g.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Target Muscles */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Target Muscles (optional - leave empty for full body)
            </Label>
            {Object.entries(groupedMuscles).map(([category, muscles]) => (
              <div key={category}>
                <p className="text-xs text-muted-foreground mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {muscles.map((muscle) => (
                    <div key={muscle.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={muscle.id}
                        checked={targetMuscles.includes(muscle.id)}
                        onCheckedChange={() => toggleMuscle(muscle.id)}
                      />
                      <Label htmlFor={muscle.id} className="cursor-pointer text-sm">
                        {muscle.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={generateWorkoutPlan}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              'Generate Workout Plan'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Plan Display */}
      {generatedPlan && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{generatedPlan.splitDays}-Day Workout Split</CardTitle>
                <CardDescription className="mt-1">
                  Goal: {generatedPlan.goal.charAt(0).toUpperCase() + generatedPlan.goal.slice(1)}
                </CardDescription>
              </div>
              <Button onClick={downloadPlan} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {generatedPlan.schedule.map((day) => (
                <Card key={day.day} className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="w-fit mb-1">
                      {day.day}
                    </Badge>
                    <CardTitle className="text-base">{day.focus}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {day.exercises.map((exercise, index) => (
                        <li key={index} className="text-sm">
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {exercise.sets} × {exercise.reps} • Rest: {exercise.rest}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
