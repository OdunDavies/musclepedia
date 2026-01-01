import { useState, useMemo } from 'react';
import { exercises, muscleGroups, MuscleGroup } from '@/data/exercises';
import { ExerciseCard } from './ExerciseCard';
import { InteractiveMuscleSelector } from './InteractiveMuscleSelector';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

export function ExerciseLibrary() {
  const [search, setSearch] = useState('');
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(search.toLowerCase());
      const matchesMuscle =
        selectedMuscles.length === 0 ||
        selectedMuscles.some(
          (muscle) =>
            exercise.primaryMuscles.includes(muscle) ||
            exercise.secondaryMuscles.includes(muscle)
        );
      const matchesDifficulty =
        !selectedDifficulty || exercise.difficulty === selectedDifficulty;
      const matchesCategory =
        !selectedCategory || exercise.category === selectedCategory;

      return matchesSearch && matchesMuscle && matchesDifficulty && matchesCategory;
    });
  }, [search, selectedMuscles, selectedDifficulty, selectedCategory]);

  const toggleMuscle = (muscle: MuscleGroup) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    );
  };

  const clearMuscleSelection = () => {
    setSelectedMuscles([]);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedMuscles([]);
    setSelectedDifficulty(null);
    setSelectedCategory(null);
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

  const hasActiveFilters = search || selectedMuscles.length > 0 || selectedDifficulty || selectedCategory;

  const categories = [
    { id: 'push', label: 'Push' },
    { id: 'pull', label: 'Pull' },
    { id: 'legs', label: 'Legs' },
    { id: 'core', label: 'Core' },
    { id: 'compound', label: 'Compound' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'stretching', label: 'Stretching' },
  ];

  return (
    <div className="space-y-6">
      {/* Interactive Muscle Map */}
      <InteractiveMuscleSelector
        selectedMuscles={selectedMuscles}
        onMuscleToggle={toggleMuscle}
        onClear={clearMuscleSelection}
      />

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div>
          <p className="text-sm font-medium mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                }
              >
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <p className="text-sm font-medium mb-2">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {['beginner', 'intermediate', 'advanced'].map((diff) => (
              <Badge
                key={diff}
                variant={selectedDifficulty === diff ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() =>
                  setSelectedDifficulty(selectedDifficulty === diff ? null : diff)
                }
              >
                {diff}
              </Badge>
            ))}
          </div>
        </div>

        {/* Muscle Group Filters */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Muscle Groups</p>
          {Object.entries(groupedMuscles).map(([category, muscles]) => (
            <div key={category}>
              <p className="text-xs text-muted-foreground mb-1.5">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {muscles.map((muscle) => (
                  <Badge
                    key={muscle.id}
                    variant={selectedMuscles.includes(muscle.id) ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleMuscle(muscle.id)}
                  >
                    {muscle.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between border-b pb-3">
        <p className="text-sm text-muted-foreground">
          {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No exercises match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
