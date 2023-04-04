import { ApproveUserInput, ApproveUserResponse, AuthResponse, CommentInput, CommentResponse, EcosystemResponse, FAQsResponse, FaceInput, LanguageOptions, LibraryDetailInput, LibraryDetailResponse, LibraryInput, LibraryManagementResponse, LibraryResponse, LikeProjectReviewInput, ListUserRoleResponse, LoginUserInput, MenuResponse, PostLibraryInput, PostLibraryResponse, ProjectDetailResponse, ProjectInput, ProjectResponse, ProjectReviewInput, ProjectReviewResponse, ProjectTypeListResponse, RegisterFaceReponse, RegisterReponse, RegisterUserInput, RemoveLibraryResponse, ReviewProjectInput, ReviewProjectResponse, RoleUserInput, SetRoleUserResponse, SettingsQueryOptions, SubmitProjectInput, SubmitProjectResponse, TopInput, UserDeleteResponse, UserInput, UserListResponse, UserProfileResult, UserViewDetailResponse } from "@/types";
import { API_ENDPOINTS } from "./endpoints";
import { HttpClient } from "./http-client";

class Client {
    users = {
        me: () => HttpClient.get<UserProfileResult>(API_ENDPOINTS.USERS_ME),
        login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
        logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {}),
        register: (inputRegister: RegisterUserInput) => HttpClient.post<RegisterReponse>(API_ENDPOINTS.USERS_REGISTER, inputRegister),
        registerface: (inputface: FaceInput) => HttpClient.post<RegisterFaceReponse>(API_ENDPOINTS.USER_REGISTER_FACE, inputface),
        delete: (input: UserInput) => HttpClient.post<UserDeleteResponse>(API_ENDPOINTS.DELETE_USER, input),
        getall: () => HttpClient.get<UserListResponse>(API_ENDPOINTS.USER_GET_LIST),
        getviewdetail: (input: UserInput, language: SettingsQueryOptions) => HttpClient.post<UserViewDetailResponse>(API_ENDPOINTS.USER_VIEW_DETAIL, input, { params: language }),
        getroleofuser: () => HttpClient.get<ListUserRoleResponse>(API_ENDPOINTS.ROLE_OF_USER),
        setroleuser: (input: RoleUserInput) => HttpClient.post<SetRoleUserResponse>(API_ENDPOINTS.SET_ROLE_USER, input),
        approveuser: (input: ApproveUserInput) => HttpClient.post<ApproveUserResponse>(API_ENDPOINTS.APPROVE_USER, input)
    }
    project = {
        top: (input: TopInput) => HttpClient.post<ProjectResponse>(API_ENDPOINTS.TOP_PROJECT, input),
        all: () => HttpClient.get<ProjectResponse>(API_ENDPOINTS.ALL_PROJECT),
        getdetail: (proname: ProjectInput, language: SettingsQueryOptions) => HttpClient.post<ProjectDetailResponse>(API_ENDPOINTS.PROJECT_DETAIL, proname, { params: language }),
        getprojectreview: (projectreview: ProjectReviewInput, language: SettingsQueryOptions) => HttpClient.post<ProjectReviewResponse>(API_ENDPOINTS.PROJECT_REVIEWID, projectreview, { params: language }),
        likeprojectreview: (likeprojectreview: LikeProjectReviewInput) => HttpClient.post<ProjectReviewResponse>(API_ENDPOINTS.LIKE_REVIEW_PROJECT, likeprojectreview),
        ecosystem: () => HttpClient.get<EcosystemResponse>(API_ENDPOINTS.ECOSYSTEM),
        projectype: () => HttpClient.get<ProjectTypeListResponse>(API_ENDPOINTS.PROJECTYPELIST),
        submitproject: (input: SubmitProjectInput) => HttpClient.post<SubmitProjectResponse>(API_ENDPOINTS.SUBMIT_PRỌECT,input)
    }
    review = {
        add: (reviewinput: ReviewProjectInput) => HttpClient.post<ReviewProjectResponse>(API_ENDPOINTS.ADD_REVIEW, reviewinput)
    }
    system = {
        menu: ({ language }: SettingsQueryOptions) => HttpClient.get<MenuResponse>(API_ENDPOINTS.SYSTEM_MENU, { language })
    }
    faq = {
        all: () => HttpClient.get<FAQsResponse>(API_ENDPOINTS.FAQS_LIST)
    }
    library = {
        cardanoknowledge: (input: LibraryInput, language: SettingsQueryOptions) => HttpClient.post<LibraryResponse>(API_ENDPOINTS.LIBRARY, input, { params: language }),
        blockchainknowledge: (input: LibraryInput, language: SettingsQueryOptions) => HttpClient.post<LibraryResponse>(API_ENDPOINTS.LIBRARY, input, { params: language }),
        catalystknowledge: (input: LibraryInput, language: SettingsQueryOptions) => HttpClient.post<LibraryResponse>(API_ENDPOINTS.LIBRARY, input, { params: language }),
        cardanoknowledgedetail: (input: LibraryDetailInput, language: SettingsQueryOptions) => HttpClient.post<LibraryDetailResponse>(API_ENDPOINTS.LIBRARY_DETAIL, input, { params: language }),
        blockchainknowledgedetail: (input: LibraryDetailInput, language: SettingsQueryOptions) => HttpClient.post<LibraryDetailResponse>(API_ENDPOINTS.LIBRARY_DETAIL, input, { params: language }),
        catalystknowledgedetail: (input: LibraryDetailInput, language: SettingsQueryOptions) => HttpClient.post<LibraryDetailResponse>(API_ENDPOINTS.LIBRARY_DETAIL, input, { params: language }),
        postcomment: (input: CommentInput) => HttpClient.post<CommentResponse>(API_ENDPOINTS.POST_COMMENT_LIBRARY, input),
        librarymanagement: (language?: string) => HttpClient.post<LibraryManagementResponse>(API_ENDPOINTS.LIBRARY_MANAGEMENT, { lang: language }),
        removelibrary: (id: string) => HttpClient.post<RemoveLibraryResponse>(API_ENDPOINTS.REMOVE_LIBRARY, id),
        postlibrary: (input: PostLibraryInput) => HttpClient.post<PostLibraryResponse>(API_ENDPOINTS.POST_LIBRARY, input),
        postlibrarylanguage: (input: PostLibraryInput) => HttpClient.post<PostLibraryResponse>(API_ENDPOINTS.POST_LIBRARY_LANGUAGE,input),
        getbyid: (input: LibraryDetailInput, language: LanguageOptions) => HttpClient.post<LibraryDetailResponse>(API_ENDPOINTS.LIBRARY_DETAIL, input, { params: language }),
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();