import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

// Enums for Achievement Type and Category
enum AchievementType {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  SPECIAL = "SPECIAL"
}

enum AchievementCategory {
  MODULE_COMPLETION = "MODULE_COMPLETION",
  SPEED_LEARNING = "SPEED_LEARNING",
  PERFECT_SCORE = "PERFECT_SCORE",
  STREAK = "STREAK"
}

@Entity()
class Achievement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: AchievementType })
  type: AchievementType;

  @Column({ type: "enum", enum: AchievementCategory })
  category: AchievementCategory;

  @Column("int")
  points: number;

  @Column()
  icon: string;

  @Column("jsonb")
  criteria: AchievementCriteria[];

  @Column("jsonb")
  rewards: Reward[];

  @Column("jsonb", { nullable: true })
  metadata: AchievementMetadata;
}

@Entity()
class UserAchievement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Achievement)
  achievement: Achievement;

  @Column("timestamp")
  earnedAt: Date;

  @Column("int")
  progress: number;

  @Column()
  status: string;

  @Column("jsonb", { nullable: true })
  metadata: {
    moduleId?: string;
    completionDetails?: CompletionDetails;
    attempts?: number;
  };
}

// Interfaces for criteria and rewards
interface AchievementCriteria {
  condition: string;
  targetValue: number;
}

interface CompletionDetails {
  score?: number;
  timeSpent?: number;
  attempts?: number;
  perfectScore?: boolean;
  streakDays?: number;
}

interface AchievementMetadata {
  moduleId?: string;
  completionDetails?: CompletionDetails;
  attempts?: number;
}

interface Reward {
  type: string;
  value: string | number | boolean | Record<string, unknown>;
}

export { Achievement, UserAchievement, AchievementType, AchievementCategory, AchievementCriteria, Reward };

