export interface GitHubRepoDomain {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  topics: string[];
  updatedAt: Date;
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  color: string;
}

export interface GitHubLanguageStat {
  name: string;
  color: string;
  count: number;
  percentage: number;
}

export interface GitHubActivityMetrics {
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
  bestDay: GitHubContributionDay;
}

export interface GitHubActivityData {
  login: string;
  name: string;
  avatarUrl: string;
  followers: number;
  following: number;
  totalRepos: number;
  totalStars: number;
  topLanguages: GitHubLanguageStat[];
  contributions: GitHubContributionDay[];
  metrics: GitHubActivityMetrics;
}
