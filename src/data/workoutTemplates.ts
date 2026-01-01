export interface TemplateExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface TemplateDay {
  day: string;
  focus: string;
  exercises: TemplateExercise[];
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
  goal: string;
  schedule: TemplateDay[];
}

export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'Perfect for those new to weight training. Hit all major muscle groups 3x per week with compound movements.',
    difficulty: 'beginner',
    daysPerWeek: 3,
    goal: 'Build foundation strength',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Full Body A',
        exercises: [
          { name: 'Barbell Back Squat', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Barbell Bench Press', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Barbell Bent-Over Rows', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Barbell Overhead Press', sets: 3, reps: '8-10', rest: '60s' },
          { name: 'Plank', sets: 3, reps: '30-45s', rest: '45s' },
        ],
      },
      {
        day: 'Day 2',
        focus: 'Full Body B',
        exercises: [
          { name: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Dumbbell Lateral Raises', sets: 3, reps: '12-15', rest: '45s' },
          { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s' },
        ],
      },
      {
        day: 'Day 3',
        focus: 'Full Body C',
        exercises: [
          { name: 'Conventional Deadlift', sets: 3, reps: '5-6', rest: '120s' },
          { name: 'Push-Ups', sets: 3, reps: '10-15', rest: '60s' },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Walking Lunges', sets: 3, reps: '10 each', rest: '60s' },
          { name: 'Russian Twists', sets: 3, reps: '15 each', rest: '45s' },
        ],
      },
    ],
  },
  {
    id: 'ppl-split',
    name: 'Push Pull Legs',
    description: 'Classic 6-day split hitting each muscle group twice per week. Great for intermediate lifters looking to build muscle.',
    difficulty: 'intermediate',
    daysPerWeek: 6,
    goal: 'Muscle hypertrophy',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Push (Chest, Shoulders, Triceps)',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '90s' },
          { name: 'Barbell Overhead Press', sets: 4, reps: '6-8', rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '60s' },
          { name: 'Dumbbell Lateral Raises', sets: 4, reps: '12-15', rest: '45s' },
          { name: 'Tricep Pushdown', sets: 3, reps: '10-12', rest: '45s' },
          { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '45s' },
        ],
      },
      {
        day: 'Day 2',
        focus: 'Pull (Back, Biceps)',
        exercises: [
          { name: 'Conventional Deadlift', sets: 4, reps: '5-6', rest: '120s' },
          { name: 'Pull-Ups', sets: 4, reps: '6-10', rest: '90s' },
          { name: 'Barbell Bent-Over Rows', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Face Pulls', sets: 4, reps: '12-15', rest: '45s' },
          { name: 'Barbell Curl', sets: 3, reps: '10-12', rest: '45s' },
          { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '45s' },
        ],
      },
      {
        day: 'Day 3',
        focus: 'Legs',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '120s' },
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s' },
          { name: 'Lying Leg Curl', sets: 4, reps: '10-12', rest: '60s' },
          { name: 'Standing Calf Raises', sets: 4, reps: '12-15', rest: '45s' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
      {
        day: 'Day 4',
        focus: 'Push (Chest, Shoulders, Triceps)',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Cable Flyes', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Barbell Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Dumbbell Lateral Raises', sets: 4, reps: '12-15', rest: '45s' },
          { name: 'Tricep Pushdown', sets: 4, reps: '12-15', rest: '45s' },
        ],
      },
      {
        day: 'Day 5',
        focus: 'Pull (Back, Biceps)',
        exercises: [
          { name: 'Barbell Bent-Over Rows', sets: 4, reps: '6-8', rest: '90s' },
          { name: 'Lat Pulldown', sets: 4, reps: '10-12', rest: '60s' },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Face Pulls', sets: 4, reps: '15-20', rest: '45s' },
          { name: 'Barbell Curl', sets: 4, reps: '10-12', rest: '45s' },
        ],
      },
      {
        day: 'Day 6',
        focus: 'Legs',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Hip Thrust', sets: 4, reps: '10-12', rest: '90s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s' },
          { name: 'Lying Leg Curl', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Standing Calf Raises', sets: 4, reps: '15-20', rest: '45s' },
        ],
      },
    ],
  },
  {
    id: 'upper-lower',
    name: 'Upper/Lower Split',
    description: 'Balanced 4-day split alternating between upper and lower body. Ideal for building strength and muscle.',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    goal: 'Strength & hypertrophy',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Upper Body (Strength)',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '5-6', rest: '120s' },
          { name: 'Barbell Bent-Over Rows', sets: 4, reps: '5-6', rest: '120s' },
          { name: 'Barbell Overhead Press', sets: 3, reps: '6-8', rest: '90s' },
          { name: 'Pull-Ups', sets: 3, reps: '6-10', rest: '90s' },
          { name: 'Barbell Curl', sets: 3, reps: '8-10', rest: '60s' },
          { name: 'Tricep Pushdown', sets: 3, reps: '10-12', rest: '60s' },
        ],
      },
      {
        day: 'Day 2',
        focus: 'Lower Body (Strength)',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '5-6', rest: '120s' },
          { name: 'Conventional Deadlift', sets: 3, reps: '5-6', rest: '120s' },
          { name: 'Walking Lunges', sets: 3, reps: '8 each', rest: '90s' },
          { name: 'Lying Leg Curl', sets: 3, reps: '8-10', rest: '60s' },
          { name: 'Standing Calf Raises', sets: 4, reps: '10-12', rest: '60s' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '10-15', rest: '45s' },
        ],
      },
      {
        day: 'Day 3',
        focus: 'Upper Body (Hypertrophy)',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: '60s' },
          { name: 'Seated Cable Row', sets: 4, reps: '10-12', rest: '60s' },
          { name: 'Dumbbell Lateral Raises', sets: 4, reps: '12-15', rest: '45s' },
          { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '45s' },
          { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '45s' },
          { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '45s' },
          { name: 'Skull Crushers', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
      {
        day: 'Day 4',
        focus: 'Lower Body (Hypertrophy)',
        exercises: [
          { name: 'Leg Press', sets: 4, reps: '12-15', rest: '90s' },
          { name: 'Romanian Deadlift', sets: 4, reps: '10-12', rest: '90s' },
          { name: 'Hip Thrust', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s' },
          { name: 'Lying Leg Curl', sets: 3, reps: '12-15', rest: '45s' },
          { name: 'Standing Calf Raises', sets: 4, reps: '15-20', rest: '45s' },
        ],
      },
    ],
  },
];
