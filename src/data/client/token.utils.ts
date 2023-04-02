import { ConfigValue } from '@/config';
import {
  PERMISSION,
  TOKEN
} from '@/utils/constants';
import Cookie from 'js-cookie';


export const AUTH_TOKEN_KEY = ConfigValue.AUTH_TOKEN_KEY;

export const getAuthToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  return Cookie.get(AUTH_TOKEN_KEY);

};

export function setAuthToken(token: string, permission: number[]) {
  Cookie.set(AUTH_TOKEN_KEY,  JSON.stringify({ token, permission }));
}

export function removeAuthToken() {
  Cookie.remove(AUTH_TOKEN_KEY);
}
export function checkHasAuthToken() {
  const token = Cookie.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}


export const allowedRoles = [2];


export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSION]) &&
    !!_cookies[PERMISSION].length
  );
}

export function hasAccess(
  _allowedRoles: number[],
  _userPermissions: number[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}

