import { useState, useEffect } from 'react';
import { fetchGitHubActivity } from '@/core/services/githubService';
import type { GitHubActivityData } from '@/core/models/github';

const CACHE_KEY = 'gh_activity_cache';
const CACHE_TTL = 60 * 60 * 1000; // 1h

interface CacheEntry {
  data: GitHubActivityData;
  timestamp: number;
}

function readCache(): GitHubActivityData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubActivityData): void {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage unavailable — skip
  }
}

export function useGithubActivity() {
  const [data, setData] = useState<GitHubActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = readCache();
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        const result = await fetchGitHubActivity();
        if (cancelled) return;
        if (!result) {
          setError('Failed to load GitHub activity');
        } else {
          writeCache(result);
          setData(result);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
