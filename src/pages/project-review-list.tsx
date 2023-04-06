import { getAuthCredentials } from '@/components/auth/use-auth'
import { Config } from '@/config'
import routes from '@/config/routes'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import Layout from '@/layouts/_layout'
import PageTitle from '@/layouts/_title'
import { ListAllReviewResponse, NextPageWithLayout } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProjectReviewList from '@/dashboards/ProjectReviewList'
import { useQuery } from '@tanstack/react-query'
import client from '@/data/client'

const ProjectReviewListPage: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({language}) => {

    const { t } = useTranslation('common');

    const FetchAllReview = () => {
        const { data, isLoading } = useQuery<ListAllReviewResponse, Error>(
            ['all-review-list'],
            () => client.project.listallreview(),
        )
        return {
            reviewlist: data?.result.data,
            isLoading
        }
    }

    const { reviewlist } = FetchAllReview()
    
    return (
        <>
            <PageTitle motherMenu={t('project')} activeMenu={t('projectreviewlist')} pageHeading={''} path={''} activeDisplay={''} />
            {reviewlist && <ProjectReviewList reviewList={reviewlist} lang={language} /> }
        </>
    )
}

ProjectReviewListPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}


export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    try {

        const { locale } = ctx;
        const generateRedirectUrl =
            locale !== Config.defaultLanguage
                ? `/${locale}${routes.login}`
                : routes.login;

        const { token, permission } = getAuthCredentials(ctx);

        if (
            !isAuthenticated({ token, permission }) ||
            !hasAccess(allowedRoles, permission)
        ) {
            return {
                redirect: {
                    destination: generateRedirectUrl,
                    permanent: false,
                },
            };
        }

        return {
            props: {
                language: locale,
                ...(await serverSideTranslations(locale!, ['common'])),
            }
        };
    } catch (error) {
        console.log(error)
        //* if we get here, the product doesn't exist or something else went wrong
        return {
            notFound: true,
        };
    }
};

export default ProjectReviewListPage