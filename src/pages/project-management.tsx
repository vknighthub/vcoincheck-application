import { getAuthCredentials } from '@/components/auth/use-auth'
import { Config } from '@/config'
import routes from '@/config/routes'
import ProjectManagement from '@/dashboards/ProjectManagement'
import client from '@/data/client'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import Layout from '@/layouts/_layout'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout, ProjectManagementResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const ProjectManagementPage: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ language }) => {
    const { t } = useTranslation('common');


    const FetchProject = () => {
        const { data, isLoading } = useQuery<ProjectManagementResponse, Error>(
            ['project-management'],
            () => client.project.projectmanagement(),
        )
        return {
            project: data?.result.data,
            isLoading
        }
    }

    const { project } = FetchProject()

    return (
        <>
            <PageTitle motherMenu={t('project')} activeMenu={t('projectmanagement')} pageHeading={''} path={''} activeDisplay={''} />
            {project && <ProjectManagement projects={project} lang={language} />}
        </>
    )
}
ProjectManagementPage.getLayout = function getLayout(page) {
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
export default ProjectManagementPage