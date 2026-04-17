import { apiService } from '@/core/services/apiService';
import type { GitHubRepoDto, GitHubGraphQLResponse } from '@/core/dtos/githubDto';
import { mapRepoToDomain, mapUserStatsToDomain } from '@/core/mappers/githubMapper';
import type { GitHubRepoDomain, GitHubActivityData, GitHubContributionDay } from '@/core/models/github';
import { PROFILE } from '@/constants/profile';

const GITHUB_REST = `https://api.github.com/users/${PROFILE.github.username}/repos?sort=updated&per_page=6`;
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const ACTIVITY_QUERY = `
query GetUserActivity($login: String!) {
  user(login: $login) {
    login
    name
    avatarUrl
    followers { totalCount }
    following { totalCount }
    repositories(first: 100, privacy: PUBLIC, isFork: false) {
      totalCount
      nodes {
        stargazerCount
        primaryLanguage { name color }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

const CONTRIBUTIONS_QUERY = `
query GetContributions($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

function getAuthHeaders() {
  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchGitHubRepos(): Promise<GitHubRepoDomain[]> {
  const result = await apiService.get<GitHubRepoDto[]>(GITHUB_REST);
  if (result.error || !result.data) return [];
  return result.data.map(mapRepoToDomain);
}

export async function fetchGitHubActivity(): Promise<GitHubActivityData | null> {
  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;
  if (!token || token === 'your_github_pat_here') {
    console.warn('[githubService] PUBLIC_GITHUB_TOKEN not set');
    return null;
  }

  const result = await apiService.post<GitHubGraphQLResponse>(
    GITHUB_GRAPHQL,
    { query: ACTIVITY_QUERY, variables: { login: PROFILE.github.username } },
    getAuthHeaders(),
  );

  if (result.error || !result.data?.data?.user) return null;
  return mapUserStatsToDomain(result.data.data.user);
}

export async function fetchContributionsForYear(year: number): Promise<GitHubContributionDay[]> {
  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;
  if (!token || token === 'your_github_pat_here') {
    console.warn('[githubService] PUBLIC_GITHUB_TOKEN not set');
    return [];
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const result = await apiService.post<{ data: { user: { contributionsCollection: { contributionCalendar: { weeks: { contributionDays: { date: string; contributionCount: number; color: string }[] }[] } } } } }>(
    GITHUB_GRAPHQL,
    {
      query: CONTRIBUTIONS_QUERY,
      variables: { login: PROFILE.github.username, from, to },
    },
    getAuthHeaders(),
  );

  if (result.error || !result.data?.data?.user) return [];

  const weeks = result.data.data.user.contributionsCollection.contributionCalendar.weeks;
  return weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      color: d.color,
    }))
  );
}
