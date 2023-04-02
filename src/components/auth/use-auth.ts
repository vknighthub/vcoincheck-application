import { ConfigValue } from '@/config';
import {
  checkHasAuthToken,
  getAuthToken,
  removeAuthToken,
  setAuthToken
} from '@/data/client/token.utils';
import SSRCookie from 'cookie';
import { atom, useAtom } from 'jotai';
import Cookie from 'js-cookie';

export const AUTH_TOKEN_KEY = ConfigValue.AUTH_TOKEN_KEY;

const authorizationAtom = atom(checkHasAuthToken());
export default function useAuth() {
  const [isAuthorized, setAuthorized] = useAtom(authorizationAtom);
  return {
    setToken: setAuthToken,
    getToken: getAuthToken,
    isAuthorized,
    authorize(token: string, permission: number[]) {
      setAuthToken(token,permission);
      setAuthorized(true);
    },
    unauthorize() {
      setAuthorized(false);
      removeAuthToken();
    },
  };
}


export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permission: number[] | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_TOKEN_KEY];
  } else {
    authCred = Cookie.get(AUTH_TOKEN_KEY);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permission: null };
}