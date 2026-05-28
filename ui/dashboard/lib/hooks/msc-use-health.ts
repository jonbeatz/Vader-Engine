'use client';

import { useQuery } from '@tanstack/react-query';
import {
  type MscGradeResponse,
  type MscHealthResponse,
  msc_fetchGrade,
  msc_fetchHealth,
} from '@/lib/msc-api';

export const MSC_QUERY_KEYS = {
  health: ['msc', 'health'] as const,
  grade: ['msc', 'grade'] as const,
};

export function msc_useHealth() {
  return useQuery<MscHealthResponse>({
    queryKey: MSC_QUERY_KEYS.health,
    queryFn: msc_fetchHealth,
    refetchInterval: 5_000,
    staleTime: 2_000,
  });
}

export function msc_useGrade() {
  return useQuery<MscGradeResponse>({
    queryKey: MSC_QUERY_KEYS.grade,
    queryFn: msc_fetchGrade,
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
}
