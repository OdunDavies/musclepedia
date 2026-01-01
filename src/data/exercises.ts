export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'forearms'
  | 'abs' 
  | 'obliques'
  | 'quads' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves'
  | 'traps'
  | 'lats';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl: string;
  instructions: string[];
  category: 'push' | 'pull' | 'legs' | 'core' | 'compound' | 'cardio';
}

export const exercises: Exercise[] = [
  // CHEST
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'Barbell, Bench',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    instructions: [
      'Lie flat on a bench with feet planted on the floor',
      'Grip the bar slightly wider than shoulder-width',
      'Lower the bar to your mid-chest',
      'Press up until arms are fully extended'
    ],
    category: 'push'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Dumbbells, Incline Bench',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Hold dumbbells at shoulder level',
      'Press up and slightly inward',
      'Lower with control'
    ],
    category: 'push'
  },
  {
    id: 'push-ups',
    name: 'Push-Ups',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches floor',
      'Keep core tight and body in straight line',
      'Push back up to starting position'
    ],
    category: 'push'
  },
  {
    id: 'cable-flyes',
    name: 'Cable Flyes',
    primaryMuscles: ['chest'],
    secondaryMuscles: [],
    equipment: 'Cable Machine',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/Iwe6AmxVf7o',
    instructions: [
      'Set cables at chest height',
      'Step forward with slight lean',
      'Bring handles together in front of chest',
      'Squeeze and return with control'
    ],
    category: 'push'
  },

  // BACK
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    primaryMuscles: ['lats', 'back'],
    secondaryMuscles: ['biceps', 'forearms'],
    equipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
    instructions: [
      'Hang from bar with overhand grip',
      'Pull yourself up until chin clears bar',
      'Lower with control',
      'Avoid swinging'
    ],
    category: 'pull'
  },
  {
    id: 'barbell-rows',
    name: 'Barbell Bent-Over Rows',
    primaryMuscles: ['back', 'lats'],
    secondaryMuscles: ['biceps', 'forearms', 'traps'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/FWJR5Ve8bnQ',
    instructions: [
      'Hinge at hips with slight knee bend',
      'Keep back flat and core tight',
      'Pull bar to lower chest',
      'Squeeze shoulder blades at top'
    ],
    category: 'pull'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'back'],
    equipment: 'Cable Machine',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    instructions: [
      'Sit with thighs secured under pad',
      'Grip bar wider than shoulder-width',
      'Pull bar to upper chest',
      'Control the return'
    ],
    category: 'pull'
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'lats', 'traps'],
    equipment: 'Cable Machine',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74',
    instructions: [
      'Sit with feet on platform, knees slightly bent',
      'Pull handle to lower chest',
      'Keep back straight throughout',
      'Squeeze shoulder blades together'
    ],
    category: 'pull'
  },

  // SHOULDERS
  {
    id: 'overhead-press',
    name: 'Barbell Overhead Press',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'traps'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI',
    instructions: [
      'Stand with bar at shoulder level',
      'Press bar overhead until arms locked',
      'Keep core tight',
      'Lower with control'
    ],
    category: 'push'
  },
  {
    id: 'lateral-raises',
    name: 'Dumbbell Lateral Raises',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: [],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo',
    instructions: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until parallel to floor',
      'Slight bend in elbows',
      'Lower with control'
    ],
    category: 'push'
  },
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    primaryMuscles: ['shoulders', 'traps'],
    secondaryMuscles: ['back'],
    equipment: 'Cable Machine, Rope',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/rep-qVOkqgk',
    instructions: [
      'Set cable at face height',
      'Pull rope towards face',
      'Separate hands at end of movement',
      'Squeeze rear delts'
    ],
    category: 'pull'
  },

  // ARMS
  {
    id: 'barbell-curl',
    name: 'Barbell Curl',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Barbell',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo',
    instructions: [
      'Stand with barbell at arm\'s length',
      'Curl bar up keeping elbows stationary',
      'Squeeze at top',
      'Lower with control'
    ],
    category: 'pull'
  },
  {
    id: 'tricep-pushdown',
    name: 'Tricep Pushdown',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'Cable Machine',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU',
    instructions: [
      'Stand facing cable machine',
      'Keep elbows at sides',
      'Push bar down until arms straight',
      'Control the return'
    ],
    category: 'push'
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    primaryMuscles: ['biceps', 'forearms'],
    secondaryMuscles: [],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4',
    instructions: [
      'Hold dumbbells with neutral grip',
      'Curl up keeping palms facing each other',
      'Squeeze at top',
      'Lower with control'
    ],
    category: 'pull'
  },
  {
    id: 'skull-crushers',
    name: 'Skull Crushers',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'EZ Bar, Bench',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM',
    instructions: [
      'Lie on bench with bar above chest',
      'Lower bar to forehead by bending elbows',
      'Keep upper arms stationary',
      'Extend arms back up'
    ],
    category: 'push'
  },

  // LEGS
  {
    id: 'squats',
    name: 'Barbell Back Squat',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'abs'],
    equipment: 'Barbell, Squat Rack',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/bEv6CCg2BC8',
    instructions: [
      'Bar on upper back, feet shoulder-width',
      'Descend by bending knees and hips',
      'Keep chest up and knees tracking toes',
      'Drive through heels to stand'
    ],
    category: 'legs'
  },
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    primaryMuscles: ['back', 'glutes', 'hamstrings'],
    secondaryMuscles: ['quads', 'forearms', 'traps'],
    equipment: 'Barbell',
    difficulty: 'advanced',
    videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q',
    instructions: [
      'Stand with feet hip-width, bar over mid-foot',
      'Hinge and grip bar just outside legs',
      'Keep back flat, drive through floor',
      'Stand tall, squeeze glutes at top'
    ],
    category: 'compound'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'Leg Press Machine',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    instructions: [
      'Sit with back flat against pad',
      'Feet shoulder-width on platform',
      'Lower weight with control',
      'Press through heels'
    ],
    category: 'legs'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['back'],
    equipment: 'Barbell or Dumbbells',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/7AaaYhMqTws',
    instructions: [
      'Stand with weight at hip level',
      'Push hips back, slight knee bend',
      'Lower until stretch in hamstrings',
      'Drive hips forward to stand'
    ],
    category: 'legs'
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    equipment: 'Bodyweight or Dumbbells',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/L8fvypPrzzs',
    instructions: [
      'Step forward into lunge',
      'Lower until back knee nearly touches ground',
      'Drive through front heel',
      'Step forward with opposite leg'
    ],
    category: 'legs'
  },
  {
    id: 'leg-curl',
    name: 'Lying Leg Curl',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: [],
    equipment: 'Leg Curl Machine',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/1Tq3QdYUuHs',
    instructions: [
      'Lie face down on machine',
      'Pad behind ankles',
      'Curl weight up by bending knees',
      'Lower with control'
    ],
    category: 'legs'
  },
  {
    id: 'calf-raises',
    name: 'Standing Calf Raises',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: 'Calf Raise Machine or Step',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/-M4-G8p8fmc',
    instructions: [
      'Stand on edge of platform',
      'Rise up onto toes',
      'Squeeze at top',
      'Lower heels below platform level'
    ],
    category: 'legs'
  },
  {
    id: 'hip-thrust',
    name: 'Hip Thrust',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'quads'],
    equipment: 'Barbell, Bench',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/SEdqd1n0cvg',
    instructions: [
      'Sit on floor with upper back against bench',
      'Roll barbell over hips (use pad for comfort)',
      'Drive through heels, squeeze glutes to lift hips',
      'Pause at top with hips fully extended',
      'Lower with control, keeping core engaged'
    ],
    category: 'legs'
  },

  // CORE
  {
    id: 'plank',
    name: 'Plank',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['obliques', 'shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c',
    instructions: [
      'Forearms and toes on ground',
      'Body in straight line',
      'Engage core throughout',
      'Hold for time'
    ],
    category: 'core'
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raises',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['obliques', 'forearms'],
    equipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/Pr1ieGZ5atk',
    instructions: [
      'Hang from bar with arms extended',
      'Raise legs until parallel or higher',
      'Control the descent',
      'Avoid swinging'
    ],
    category: 'core'
  },
  {
    id: 'cable-woodchop',
    name: 'Cable Woodchops',
    primaryMuscles: ['obliques', 'abs'],
    secondaryMuscles: ['shoulders'],
    equipment: 'Cable Machine',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/pAplQXk3dkU',
    instructions: [
      'Set cable high or low',
      'Rotate torso pulling cable across body',
      'Keep arms relatively straight',
      'Control the return'
    ],
    category: 'core'
  },
  {
    id: 'russian-twist',
    name: 'Russian Twists',
    primaryMuscles: ['obliques'],
    secondaryMuscles: ['abs'],
    equipment: 'Bodyweight or Medicine Ball',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/wkD8rjkodUI',
    instructions: [
      'Sit with knees bent, lean back slightly',
      'Hold weight at chest',
      'Rotate side to side',
      'Keep core engaged'
    ],
    category: 'core'
  },

  // CARDIO / HIIT
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    primaryMuscles: ['quads', 'calves'],
    secondaryMuscles: ['shoulders', 'glutes'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8',
    instructions: [
      'Stand with feet together, arms at sides',
      'Jump feet out while raising arms overhead',
      'Jump back to starting position',
      'Maintain a steady rhythm'
    ],
    category: 'cardio'
  },
  {
    id: 'burpees',
    name: 'Burpees',
    primaryMuscles: ['quads', 'chest'],
    secondaryMuscles: ['shoulders', 'triceps', 'abs', 'glutes'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/dZgVxmf6jkA',
    instructions: [
      'Start standing, drop into squat with hands on floor',
      'Jump feet back into plank position',
      'Perform a push-up (optional)',
      'Jump feet forward and explode up with arms overhead'
    ],
    category: 'cardio'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['shoulders', 'quads', 'glutes'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM',
    instructions: [
      'Start in plank position',
      'Drive one knee toward chest',
      'Quickly switch legs in a running motion',
      'Keep hips low and core engaged'
    ],
    category: 'cardio'
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['calves', 'hamstrings'],
    equipment: 'Plyo Box',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/NBY9-kTuHEk',
    instructions: [
      'Stand facing the box with feet shoulder-width apart',
      'Bend knees and swing arms back',
      'Explode up and land softly on box',
      'Step down and repeat'
    ],
    category: 'cardio'
  },
  {
    id: 'battle-ropes',
    name: 'Battle Ropes',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['biceps', 'triceps', 'abs', 'back'],
    equipment: 'Battle Ropes',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/a5YtGf6Q3Rs',
    instructions: [
      'Hold rope ends with firm grip',
      'Slight squat stance with core braced',
      'Create alternating waves with arms',
      'Maintain intensity for timed intervals'
    ],
    category: 'cardio'
  },
  {
    id: 'kettlebell-swings',
    name: 'Kettlebell Swings',
    primaryMuscles: ['glutes', 'hamstrings'],
    secondaryMuscles: ['back', 'shoulders', 'abs'],
    equipment: 'Kettlebell',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/YSxHifyI6s8',
    instructions: [
      'Stand with feet wider than shoulder-width',
      'Hinge at hips, grip kettlebell with both hands',
      'Drive hips forward explosively to swing weight',
      'Let weight swing to chest height, control descent'
    ],
    category: 'cardio'
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    primaryMuscles: ['calves'],
    secondaryMuscles: ['quads', 'shoulders', 'forearms'],
    equipment: 'Jump Rope',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/u3zgHI8QnqE',
    instructions: [
      'Hold handles at hip height',
      'Rotate rope with wrists, not arms',
      'Jump just high enough to clear rope',
      'Land softly on balls of feet'
    ],
    category: 'cardio'
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    primaryMuscles: ['back', 'lats'],
    secondaryMuscles: ['biceps', 'quads', 'glutes', 'abs'],
    equipment: 'Rowing Machine',
    difficulty: 'beginner',
    videoUrl: 'https://www.youtube.com/embed/H0r_ZPXJLtg',
    instructions: [
      'Sit with feet strapped in, grab handle',
      'Push with legs first, then pull with arms',
      'Lean back slightly at the finish',
      'Return by extending arms, then bending knees'
    ],
    category: 'cardio'
  }
];
export const muscleGroups: { id: MuscleGroup; name: string; category: string }[] = [
  { id: 'chest', name: 'Chest', category: 'Upper Body' },
  { id: 'back', name: 'Back', category: 'Upper Body' },
  { id: 'lats', name: 'Latissimus Dorsi', category: 'Upper Body' },
  { id: 'traps', name: 'Trapezius', category: 'Upper Body' },
  { id: 'shoulders', name: 'Shoulders', category: 'Upper Body' },
  { id: 'biceps', name: 'Biceps', category: 'Arms' },
  { id: 'triceps', name: 'Triceps', category: 'Arms' },
  { id: 'forearms', name: 'Forearms', category: 'Arms' },
  { id: 'abs', name: 'Abdominals', category: 'Core' },
  { id: 'obliques', name: 'Obliques', category: 'Core' },
  { id: 'quads', name: 'Quadriceps', category: 'Lower Body' },
  { id: 'hamstrings', name: 'Hamstrings', category: 'Lower Body' },
  { id: 'glutes', name: 'Glutes', category: 'Lower Body' },
  { id: 'calves', name: 'Calves', category: 'Lower Body' },
];
