import { AuthResponse, FaceInput, LikeProjectReviewInput, LoginUserInput, MenuResponse, ProjectDetailResponse, ProjectInput, ProjectResponse, ProjectReviewInput, ProjectReviewResponse, RegisterFaceReponse, RegisterReponse, RegisterUserInput, ReviewProjectInput, ReviewProjectResponse, SettingsQueryOptions, TopInput, UserProfileResult } from "@/types";
import { API_ENDPOINTS } from "./endpoints";
import { HttpClient } from "./http-client";

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
        all: () => HttpClient.get<ProjectResponse>(API_ENDPOINTS.ALL_PROJECT),
        getdetail: (proname: ProjectInput, language: SettingsQueryOptions) => HttpClient.post<ProjectDetailResponse>(API_ENDPOINTS.PROJECT_DETAIL, proname, { params: language }),
        getprojectreview: (projectreview: ProjectReviewInput, language: SettingsQueryOptions) => HttpClient.post<ProjectReviewResponse>(API_ENDPOINTS.PROJECT_REVIEWID, projectreview, { params: language }),
        likeprojectreview: (likeprojectreview: LikeProjectReviewInput) => HttpClient.post<ProjectReviewResponse>(API_ENDPOINTS.LIKE_REVIEW_PROJECT, likeprojectreview)
    }
    review = {
        add: (reviewinput: ReviewProjectInput) => HttpClient.post<ReviewProjectResponse>(API_ENDPOINTS.ADD_REVIEW,reviewinput)
    }
    system = {
        menu: ({ language }: SettingsQueryOptions) => HttpClient.get<MenuResponse>(API_ENDPOINTS.SYSTEM_MENU, { language })
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();