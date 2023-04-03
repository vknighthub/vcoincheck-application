const routes = {
    home: '',
    project: '/project',
    ecosystem: '/ecosystem',
    projectype: '/project-type',
    userlist: '/user-list',
    login: '/page-login',
    faq: '/faq',
    cardanoknowledge: '/cardano-knowledge',
    catalystknowledge: '/catalyst-knowledge',
    blockchainknowledge: '/blockchain-knowledge',
    librarymanagement: '/library-management',


    project_detail: (slug?: string) => `ecom-project-detail/${slug}`,
    user_detail: (slug?: string) => `user-active-profile/${slug}`
}
export default routes;