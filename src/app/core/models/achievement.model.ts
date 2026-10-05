export type AchievementRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'SECRET';

export interface Achievement {
  id: string;
  title: string;
  code: string;
  description: string;
  rarity: AchievementRarity;
  xp: number;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  hint?: string;
  isSecret?: boolean;
}
