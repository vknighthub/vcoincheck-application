const routes = {
    home: '',
    project: 'project',
    ecosystem: 'ecosystem',
    projectype: 'project-type',
    userlist: 'user-list',
    login: 'page-login',
    faq: 'faq',
    library: 'library',
    cardanoknowledge: 'cardano-knowledge',
    catalystknowledge: 'catalyst-knowledge',
    blockchainknowledge: 'blockchain-knowledge',
    librarymanagement: 'library-management',
    dictionary: 'dictionary',
    marketinfo: 'market-info',

    project_detail: (slug?: string) => `ecom-project-detail/${slug}`,
    user_detail: (slug?: string) => `user-active-profile/${slug}`,

    catalystknowledge_detail: (slug?: string) => `catalyst-knowledge/${slug}`,
    cardanoknowledge_detail: (slug?: string) => `cardano-knowledge/${slug}`,
    blockchainknowledge_detail: (slug?: string) => `blockchain-knowledge/${slug}`,
    


}
export default routes;