import Overviews from '@/dashboards/Overviews'
import UserProfile from '@/dashboards/UserProfile'
import { useMe } from '@/data/user'
import Layout from '@/layouts/_layout'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const AppProfilePage: NextPageWithLayout = () => {
    const { t } = useTranslation('common')

    const { me } = useMe()

    return (
        <>
            <PageTitle activeMenu={t('profile')} motherMenu={t('usermanagement')} path="app-profile" pageHeading={''} activeDisplay={''} />
            {me &&
                <>
                    <Overviews users={me} />
                    <UserProfile users={me} />
                </>
            }
        </>
    )
}
AppProfilePage.getLayout = function getLayout(page) {
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
export default AppProfilePage