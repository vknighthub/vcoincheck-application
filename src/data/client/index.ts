import { AuthResponse, LoginUserInput, NewsQueryArrray, NewsQueryObject, ProjectResponse, TopInput, UserProfileResult } from "@/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./endpoints";

class Client {
    users = {
        me: () => HttpClient.get<UserProfileResult>(API_ENDPOINTS.USERS_ME),
        login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
        logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {}),
    }
    project = {
        top: (input: TopInput) => HttpClient.post<ProjectResponse>(API_ENDPOINTS.TOP_PROJECT, input),
        all: () => HttpClient.get<ProjectResponse>(API_ENDPOINTS.ALL_PROJECT)
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();