import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import RegisterPage from '../pages/page-register';

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

interface ResultObject<T> {
    result: {
        data: T
    }
}
interface ResultArray<T> {
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
    en: string
    vn: string
    jp: string
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

export interface AuthResponse {
    errorcode: string;
    messagedetail: string;
    result: UserInfor

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
    isadmin: boolean
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