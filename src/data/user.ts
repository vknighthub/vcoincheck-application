import useAuth from '@/components/auth/use-auth';
import type { ListUserRoleResponse, SettingsQueryOptions, UserInput, UserProfileResult, UserViewDetailResponse } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import client from './client';
import { API_ENDPOINTS } from './client/endpoints';

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
  const router = useRouter();
  const { unauthorize, isAuthorized } = useAuth();
  return useMutation(client.users.logout, {
    onSuccess: (data) => {
      if (data) {
        unauthorize();
        if (isAuthorized) {
          router.push('/page-login')
        }
      }
    }
  });
}

export const useUserDetailQuery = (input: UserInput, language: SettingsQueryOptions) => {
  const { data, isLoading, refetch } = useQuery<UserViewDetailResponse, Error>(
    ['user-detail'],
    () => client.users.getviewdetail(input, language),
  )
  return {
    userdetail: data?.result,
    isLoading,
    refetch
  }
}

export const useRoleQuery = () => {
  const { data, isLoading } = useQuery<ListUserRoleResponse, Error>(
    ['user-role'],
    () => client.users.getroleofuser(),
  )
  return {
    userrole: data?.result.data,
    isLoading
  }
}

export const useSetUserMutation = () => {
  return useMutation(client.users.setroleuser, {
    onSuccess: () => {
    }
  });
};

export const useApproveUserMutation = () => {
  return useMutation(client.users.approveuser, {
    onSuccess: () => {
    }
  });
};

export const useUpdateAvatarMutation = () => {
  return useMutation(client.users.updateavatar, {
    onSuccess: () => {
    }
  });
};

export const useLoginByFaceMutation = () => {
  const { authorize } = useAuth();
  return useMutation(client.users.loginbyface, {
    onSuccess: (data) => {
      if (data.result.token) {
        authorize(data.result.token, data.result.permission)
      }
    }
  });
};
