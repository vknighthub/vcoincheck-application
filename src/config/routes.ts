const routes = {
    home: '',
    project: '/project',
    ecosystem: '/ecosystem',
    projectype: '/project-type',
    userlist: '/user-list',
    login: '/page-login',
    faq: '/faq',


    project_detail: (slug?: string) => `ecom-project-detail/${slug}`,
    user_detail: (slug?: string) => `user-active-profile/${slug}`
}
export default routes;