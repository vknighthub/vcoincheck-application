import { getAuthCredentials } from '@/components/auth/use-auth'
import { Config } from '@/config'
import routes from '@/config/routes'
import client from '@/data/client'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import Layout from '@/layouts/_layout'
import { NextPageWithLayout, ReviewByUsernamePronameResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReviewDetail from '@/dashboards/ReviewDetail'

const ProjectReviewPage: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ language, projectname, username, reviewid }) => {


    const FetchAllReview = (proname: string, usernames: string) => {
        const { data, isLoading } = useQuery<ReviewByUsernamePronameResponse, Error>(
            ['review-list-username-proname'],
            () => client.project.reviewbyusernameproname({
                proname: proname,
                username: usernames
            }),
        )
        return {
            reviewlist: data?.result.data,
            isLoading
        }
    }


    const { reviewlist } = FetchAllReview(projectname, username)
    return (
        <>
            {reviewlist && <ReviewDetail username={username} reviewid={reviewid} reviewuserlist={reviewlist} language = {language} />}
        </>
    )
}


ProjectReviewPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}


export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    try {

        const { locale, params } = ctx;

        const { projectname, username, reviewid } = params!;

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
                projectname,
                username,
                reviewid,
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

export default ProjectReviewPage