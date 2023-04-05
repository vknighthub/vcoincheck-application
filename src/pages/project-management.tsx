import { getAuthCredentials } from '@/components/auth/use-auth'
import { Config } from '@/config'
import routes from '@/config/routes'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { GetServerSideProps, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

type Props = {}

const ProjectManagement: NextPageWithLayout = (props: Props) => {
    return (
        <div>ProjectManagement</div>
    )
}
ProjectManagement.getLayout = function getLayout(page) {
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
export default ProjectManagement