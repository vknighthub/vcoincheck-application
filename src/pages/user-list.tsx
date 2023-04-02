import routes from '@/config/routes'
import UserList from '@/dashboards/UserList'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const UserListPage: NextPageWithLayout = () => {
    const { t } = useTranslation()

    return (
        <>
            <Seo title="vCoincheck"
                description="User list management"
                url={routes.userlist}
                image_url="" />

            <PageTitle activeMenu={t('userlist')} motherMenu={t('usermanagement')} path={"user-list"} pageHeading={''} activeDisplay={''} />

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                    <div className="card">
                        <UserList />
                    </div>
                </div>
            </div>
        </>
    )
}

UserListPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const formattedparams = {
            language: locale,
        };
        return {
            props: {
                ...(await serverSideTranslations(locale!, ['common'])),
            },
            revalidate: 60, // In seconds
        };
    } catch (error) {
        console.log(error)
        //* if we get here, the product doesn't exist or something else went wrong
        return {
            notFound: true,
        };
    }
};

export default UserListPage