import {
    ListUserRole,
    QueryOptions,
} from '@/types';
import { crudFactory } from './curd-factory';
import { API_ENDPOINTS } from './endpoints';

export const AuthorClient = {
    ...crudFactory<ListUserRole, QueryOptions, null>(
        API_ENDPOINTS.ROLE_OF_USER
    )
};
