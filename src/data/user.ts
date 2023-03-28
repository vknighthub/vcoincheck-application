import useAuth from '@/components/auth/use-auth';
import type { UserProfileResult } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import client from './client';
import { API_ENDPOINTS } from './client/endpoints';
import { useRouter } from 'next/router';

export const useMe = () => {
  const { isAuthorized } = useAuth();
  const { data, isLoading, error } = useQuery<UserProfileResult, Error>(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
    }
  );

  return {
    me: data?.result,
    isLoading,
    error,
    isAuthorized,
  };
}

export function useLogout() {
  const { unauthorize } = useAuth();
  const router = useRouter();
  return useMutation(client.users.logout, {
    onSuccess: () => {
      unauthorize();
    },
    onError: (err: Error) => {
      console.error(err)
    }
  });
  
}
