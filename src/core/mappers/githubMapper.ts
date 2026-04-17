import type { GitHubRepoDto, GitHubUserStatsDto } from '@/core/dtos/githubDto';
import type {
  GitHubRepoDomain,
  GitHubActivityData,
  GitHubContributionDay,
  GitHubActivityMetrics,
  GitHubLanguageStat,
} from '@/core/models/github';

export function mapRepoToDomain(dto: GitHubRepoDto): GitHubRepoDomain {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description ?? 'No description',
    url: dto.html_url,
    stars: dto.stargazers_count,
    language: dto.language ?? 'Unknown',
    topics: dto.topics ?? [],
    updatedAt: new Date(dto.updated_at),
  };
}

function computeMetrics(contributions: GitHubContributionDay[], total: number): GitHubActivityMetrics {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let bestDay = contributions[0] ?? { date: '', count: 0, color: '' };

  for (const day of contributions) {
    if (day.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      if (day.count > bestDay.count) bestDay = day;
    } else {
      tempStreak = 0;
    }
  }

  // Current streak: walk backwards from today
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) currentStreak++;
    else break;
  }

  return { currentStreak, longestStreak, totalContributions: total, bestDay };
}

function computeLanguageStats(
  nodes: GitHubUserStatsDto['repositories']['nodes'],
): GitHubLanguageStat[] {
  const counts: Record<string, { color: string; count: number }> = {};

  for (const repo of nodes) {
    if (!repo.primaryLanguage) continue;
    const { name, color } = repo.primaryLanguage;
    if (!counts[name]) counts[name] = { color, count: 0 };
    counts[name].count++;
  }

  const total = Object.values(counts).reduce((sum, v) => sum + v.count, 0);
  return Object.entries(counts)
    .map(([name, { color, count }]) => ({
      name,
      color,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function mapUserStatsToDomain(dto: GitHubUserStatsDto): GitHubActivityData {
  const calendar = dto.contributionsCollection.contributionCalendar;

  const contributions: GitHubContributionDay[] = calendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount, color: d.color }));

  const totalStars = dto.repositories.nodes.reduce(
    (sum, r) => sum + r.stargazerCount,
    0,
  );

  return {
    login: dto.login,
    name: dto.name ?? dto.login,
    avatarUrl: dto.avatarUrl,
    followers: dto.followers.totalCount,
    following: dto.following.totalCount,
    totalRepos: dto.repositories.totalCount,
    totalStars,
    topLanguages: computeLanguageStats(dto.repositories.nodes),
    contributions,
    metrics: computeMetrics(contributions, calendar.totalContributions),
  };
}
