import { NextPage, NextPageContext } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    authorization?: boolean;
    getLayout?: (page: ReactElement) => ReactNode;
};

export interface LoginUserInput {
    username: string;
    password: string;
}
export interface FaceInput {
    username: string;
    faceid: string;
}
export interface RegisterUserInput {
    username: string
    firstname: string
    lastname: string
    gender: number
    address: string
    email: string
    birthday: string
    phone: string
}

export interface TopInput {
    top: number;
}

export interface ProjectInput {
    proname: string | string[] | undefined;
}

interface ResultObject<T> {
    errorcode: number
    messagedetail: string
    result: {
        data: T
    }
}
interface ResultArray<T> {
    errorcode: number
    messagedetail: string
    result: {
        data: T[]
    }
}


export interface News {
    id: string
    name: string
    title: string
    type: string
    url: string
    pubdt: string
    image: string
    summary: string
    content: string
    username: string
    createdt: string
    nextnews: any
    prevnews: any
}

export interface NewsQueryArrray extends ResultArray<News> { }
export interface NewsQueryObject extends ResultObject<News> { }



export interface UserInfor {
    username: string
    firstname: string
    lastname: string
    gender: number
    address: string
    email: string
    birthday: string
    phone: string
    status: string
    usercreated: string
    datecreated: string
    expiretime: string
    isshow: boolean
    failnumber: number
    token: string
    token_type: string
    fastmode: any
    scores: number
    avatar: string
    isadmin: boolean
    faceid: string
    routes: string[]
    menu: Menu[]
    project_list: any[]
    list_review: ListReview[]
}

export interface Menu {
    name: string
    path: string
    class: string
    icon: string
    menu_sub: MenuSub[]
}


export interface MenuSub {
    name: string
    path: string
}


export interface ListReview {
    project_info: ProjectInfo
    review_info: ReviewInfo[]
}

export interface ProjectInfo {
    proid: number
    username: string
    fullname: any
    procd: string
    proname: string
    protype: string
    protypecd: string
    Ecosystem: string
    Ecosystemcd: string
    prodescr: string
    teaminfo: string
    proicon: string
    totalreview: number
    prosts: string
    prostscd: string
    proaprsts: string
    proaprstscd: string
    usrid: number
    scores: number
    usermodify?: string
    createdt: string
    modifydate: string
    featured: number
    quality: Quality
    color: string
}

export interface Quality {
    key: string
    text: string
}

export interface ReviewInfo {
    reviewid: string
    username: string
    proid: number
    proname: string
    protype: string
    status: string
    comment: any
    scores: number
    reviewdate: string
    likes: number
}

export interface ProjectInfor {
    proid: number
    username: string
    fullname: any
    procd: string
    proname: string
    protype: string
    protypecd: string
    Ecosystem: string
    Ecosystemcd: string
    prodescr: string
    teaminfo: string
    proicon: string
    totalreview: number
    prosts: string
    prostscd: string
    proaprsts: string
    proaprstscd: string
    usrid: number
    scores: number
    usermodify: any
    createdt: string
    modifydate: string
    featured: number
    quality: Quality
    color: string
}
export interface Auth {
    token: string,
    permission: number[];
}
export interface AuthResponse {
    errorcode: string;
    messagedetail: string;
    result: Auth

}

export interface RegisterUserInfor {
    usrid: number
    username: string
    firstname: string
    lastname: string
    gender: number
    address: string
    email: string
    birthday: string
    phone: string
    lastlogintime: Date
    status: string
    usercreated: string
    datecreated: string
    usermodified: Date
    datemodified: Date
    islogin: boolean
    expiretime: Date
    isshow: boolean
    scores: number
    avatar: string
    failnumber: number
    faceid: string
}
export interface RegisterReponse {
    errorcode: string;
    messagedetail: string;
    result: RegisterUserInfor
}
export interface RegisterFaceReponse {
    errorcode: string;
    messagedetail: string;
    result: { data: string }
}

export interface ProjectResponse {
    errorcode: string;
    messagedetail: string;
    result: {
        data: ProjectInfor[]
    }
}

export interface Social {
    socialId: number
    username: string
    type: string
    name: string
    url: string
}

export interface Wallet {
    walletaddress: string
    username: string
    walletname: any
    wallettype: any
    status: string
}

export interface UserProfile {
    usrid: number
    username: string
    firstname: string
    lastname: string
    gender: number
    country: string
    city: string
    province: string
    district: string
    address: string
    email: string
    birthday: string
    phone: string
    lastlogintime: string
    status: string
    datecreated: string
    datemodified: any
    islogin: boolean
    expiretime: any
    failnumber: any
    avatar: string
    faceid: any
    licensetype: any
    licenseid: any
    aboutme: any
    descriptions: any
    lastdelivery: any
    token: string
    token_type: string
    first_login: boolean
    socials?: Social[]
    wallet?: Wallet[],
    isadmin: boolean,
    scores: number
}

export interface UserProfileResult {
    result: UserProfile
}

export interface SettingsQueryOptions {
    language?: string;
}

export interface MenuResponse {
    errorcode: string;
    messagedetail: string;
    result: {
        data: Menu[]
    }
}
export interface Label {
    en: string
    vn: string
    jp: string
}
export interface Key {
    en: string
    vn: string
    jp: string
}
export interface Answer {
    value: string
    key: Key
}
export interface Content {
    name: string
    label: Label
    control: string
    type?: string
    styles: string
    rows: number
    required: string
    answer: Answer[]
}
export interface Advancequestion {
    group: any
    content: Content[]
}
export interface Basicquestion {
    group: string
    content: Content[]
}

export interface Expertquestion {
    group: string
    content: Content[]
}
export interface Overquestion {
    group: any
    content: Content[]
}
export interface QuestionInfo {
    advancequestion: Advancequestion[]
    basicquestion: Basicquestion[]
    expertquestion: Expertquestion[]
    overquestion: Overquestion[]
}
export interface ProjectDetail {
    project_info: ProjectInfo
    review_info: ReviewInfo[]
    question_info: QuestionInfo
}
export interface ProjectDetailResponse {
    errorcode: string;
    messagedetail: string;
    result: {
        data: ProjectDetail
    }
}

export interface ProjectReviewInput {
    reviewid: string;
}
export interface LikeProjectReviewInput {
    reviewid: string;
}

export interface Content {
    name: string
    labels: string
    control: string
    types: string | undefined
    styles: string
    rows: number
    answers: string
    choose: string
}
export interface MainContent {
    group: string
    content: Content[]
}
export interface Reviewdata {
    reviewid: string;
    main_content: MainContent[]
}
export interface Lastcomment { }

export interface Scores {
    overreview: number
    basicreview: number
    advancereview: number
    expertreview: number
}
export interface ProjectReview {
    main_data: Reviewdata[]
    status: string
    likes: number
    islike: boolean
    userinfor: UserInfor
    lastcomment: Lastcomment
    comment: any[]
    scores: Scores
    activereviewed: string
}
export interface ProjectReviewResponse {
    errorcode: number
    messagedetail: string
    result: {
        data: ProjectReview
    }
}
export interface ReviewProjectInput {
    projectid: number
    reviewid: string
    reviewtype: string
    reviewdata: {
        answerdata: []
    }
}

export interface ReviewProject {
    project_score: number
    review_score: number
}
export interface ReviewProjectResponse {
    errorcode: number
    messagedetail: string
    result: {
        data: ReviewProject
    }
}

export interface Ecosystem {
    ecoid: number
    shortname: string
    econame: string
    description: string
}
export interface EcosystemResponse {
    errorcode: number
    messagedetail: string
    result: {
        data: Ecosystem[]
    }
}

export interface ProjectTypeList {
    typeid: number
    typecd: string
    name: string
    description?: string
}

export interface ProjectTypeListResponse {
    errorcode: number
    messagedetail: string
    result: {
        data: ProjectTypeList[]
    }
}

export interface UserInput {
    username: string | string[] | undefined;
}
export interface RoleUserInput {
    username: string
    roleid: string[]
    description?: string
}
export interface ApproveUserInput {
    username: string | undefined,
    status: string | undefined
}
export interface UserDeleteResponse {
    errorcode: number
    messagedetail: string
    result: JSON
}

export interface UserListResponse {
    errorcode: number
    messagedetail: string
    result: {
        data: UserProfile[]
    }
}

export interface RoleList {
    roleid: number
    rolename: string
}

export interface UserViewDetail {
    username: string
    firstname: string
    lastname: string
    gender: number
    address: string
    email: string
    birthday: string
    phone: string
    status: string
    usercreated: string
    datecreated: string
    expiretime: string
    isshow: any
    failnumber: any
    token: string
    token_type: string
    fastmode: any
    scores: number
    avatar: string
    isadmin: boolean
    faceid: any
    routes: any
    menu: any
    role_list: RoleList[]
    project_list: any[]
    list_review: ListReview[]
}
export interface UserViewDetailResponse {
    errorcode: number
    messagedetail: string
    result: UserViewDetail
}

export interface ListUserRole {
    roleid: number
    rolename: string
    roledescription: string
    usertype: any
    contractno: any
    usercreated: string
    datecreated: string
    usermodified: string
    datemodified: string
    serviceid: any
    status: string
    isshow: string
}

export enum SortOrder {
    Asc = 'asc',
    Desc = 'desc',
}
export interface QueryOptions {
    language: string;
    limit?: number;
    page?: number;
    orderBy?: string;
    sortedBy?: SortOrder;
}

export interface ListUserRoleResponse extends ResultArray<ListUserRole> { }

export interface SetRoleUserResponse extends ResultObject<RoleUserInput> { }

export interface ApproveUserResponse {
    errorcode: number
    messagedetail: string
    result: {
        data: string
    }
}
export interface GetParams {
    slug: string;
    language: string;
}

export interface PaginatorInfo<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface FAQ {
    faqid: string
    question: string
    answers: string
    createdt: string
    username: string
}

export interface FAQsResponse extends ResultArray<FAQ> { }

export type GetInitialProps = (ctx: NextPageContext) => Promise<any>;