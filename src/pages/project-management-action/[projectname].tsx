import { getAuthCredentials } from '@/components/auth/use-auth'
import { Config } from '@/config'
import routes from '@/config/routes'
import ProjectManagementAction from '@/dashboards/ProjectManagementAction'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import { FetchProjectDetail } from '@/data/project'
import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ProjectManagementActionPage: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ language, projectname }) => {

    const { projectdetail } = FetchProjectDetail(projectname, language)

    return (
        <>
            {projectdetail &&
                <ProjectManagementAction
                    projectDetail={projectdetail}/>
            }

        </>
    )
}
ProjectManagementActionPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}


export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    try {

        const { locale, params } = ctx;
        const generateRedirectUrl =
            locale !== Config.defaultLanguage
                ? `/${locale}${routes.login}`
                : routes.login;

        const { projectname } = params!

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
                projectname,
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
export default ProjectManagementActionPage