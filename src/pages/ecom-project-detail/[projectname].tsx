import useAuth from '@/components/auth/use-auth';
import routes from '@/config/routes';
import ProjectDetail from '@/dashboards/ProjectDetail';
import client from '@/data/client';
import Layout from '@/layouts/_layout';
import Seo from '@/layouts/_seo';
import PageTitle from '@/layouts/_title';
import { NextPageWithLayout } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';

const ProjectDetailPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ projectname, projectdetail, lang }) => {
    const { isAuthorized } = useAuth()
    const { t } = useTranslation()

    const { data, refetch } = useQuery({
        queryKey: ['project-detail'],
        queryFn: () => client.project.getdetail(
            {
                proname: projectname,
            },
            {
                language: lang
            }
        ),
        initialData: projectdetail,
    })



    const projectdata = data.result.data

    useEffect(() => {
        refetch()
    }, [lang])


    return (
        <>
            <Seo title="vCoincheck"
                description={projectdata.project_info.prodescr}
                url={routes.project_detail(projectname)}
                image_url={projectdata.project_info.proicon} />

            <PageTitle motherMenu={t('project')} activeMenu={t('projectdetail')} path="project" activeDisplay={projectname} pageHeading={''} />

            <div className="row">
                {projectdata && <ProjectDetail project={projectdata} isAuthorized={isAuthorized} lang={lang} />}
            </div>
        </>
    )
}
ProjectDetailPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

    try {
        const { projectname } = params!; //* we know it's required because of getStaticPaths
        const lang = locale!

        const projectdetail = await client.project.getdetail(
            {
                proname: projectname,
            },
            {
                language: locale
            }
        )

        return {
            props: {
                projectdetail,
                projectname,
                lang,
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


export const getStaticPaths: GetStaticPaths = async (
    {
        locales,
    }
) => {
    invariant(locales, 'locales is not defined');
    return { paths: [], fallback: 'blocking' };
};

export default ProjectDetailPage
