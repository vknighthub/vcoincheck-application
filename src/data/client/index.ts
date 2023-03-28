import { AuthResponse, FaceInput, LoginUserInput, MenuResponse, NewsQueryArrray, NewsQueryObject, ProjectResponse, RegisterFaceReponse, RegisterReponse, RegisterUserInput, SettingsQueryOptions, TopInput, UserProfileResult } from "@/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./endpoints";

class Client {
    users = {
        me: () => HttpClient.get<UserProfileResult>(API_ENDPOINTS.USERS_ME),
        login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
        logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {}),
        register: (inputRegister: RegisterUserInput) => HttpClient.post<RegisterReponse>(API_ENDPOINTS.USERS_REGISTER, inputRegister),
        registerface: (inputface: FaceInput) => HttpClient.post<RegisterFaceReponse>(API_ENDPOINTS.USER_REGISTER_FACE, inputface)
    }
    project = {
        top: (input: TopInput) => HttpClient.post<ProjectResponse>(API_ENDPOINTS.TOP_PROJECT, input),
        all: () => HttpClient.get<ProjectResponse>(API_ENDPOINTS.ALL_PROJECT)
    }
    system = {
        menu: ({ language }: SettingsQueryOptions) => HttpClient.get<MenuResponse>(API_ENDPOINTS.SYSTEM_MENU, { language })
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();