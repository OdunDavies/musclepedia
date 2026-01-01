import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExerciseLibrary } from '@/components/ExerciseLibrary';
import { WorkoutGenerator } from '@/components/WorkoutGenerator';
import { Dumbbell, Library, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('library');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-foreground text-background">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Musclepedia</h1>
              <p className="text-xs text-muted-foreground">Your complete exercise encyclopedia</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              Exercise Library
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Plan Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Exercise Library</h2>
              <p className="text-muted-foreground">
                Browse our collection of exercises with video demonstrations and muscle targeting info.
              </p>
            </div>
            <ExerciseLibrary />
          </TabsContent>

          <TabsContent value="generator" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Workout Generator</h2>
              <p className="text-muted-foreground">
                Get a personalized workout split based on your goals and target muscles.
              </p>
            </div>
            <WorkoutGenerator />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Click on any exercise to see video demonstrations and detailed instructions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
