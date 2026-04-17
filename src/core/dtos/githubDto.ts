export interface GitHubRepoDto {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

// GraphQL contribution day
export interface GitHubContributionDayDto {
  date: string;
  contributionCount: number;
  color: string;
}

export interface GitHubContributionWeekDto {
  contributionDays: GitHubContributionDayDto[];
}

export interface GitHubContributionCalendarDto {
  totalContributions: number;
  weeks: GitHubContributionWeekDto[];
}

export interface GitHubContributionsCollectionDto {
  contributionCalendar: GitHubContributionCalendarDto;
}

export interface GitHubUserStatsDto {
  login: string;
  name: string | null;
  avatarUrl: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: Array<{
      stargazerCount: number;
      primaryLanguage: { name: string; color: string } | null;
    }>;
  };
  contributionsCollection: GitHubContributionsCollectionDto;
}

export interface GitHubGraphQLResponse {
  data: {
    user: GitHubUserStatsDto;
  };
}
