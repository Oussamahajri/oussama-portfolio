export interface JourneyStage {
  id: string;
  levelIndex: number;
  stageName: string;
  theme: string;
  bugOrObstacle: string;
  technicalContext: string;
  debuggingStrategy: string[];
  breakthroughInsight: string;
  lessonLearned: string;
  skillsIncreased: {
    skill: string;
    gain: string;
  }[];
  resilienceRating: string; // e.g. "+25% Architectural Robustness"
}
